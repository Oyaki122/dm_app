# coding: utf-8
import hashlib
import sqlite3
import os
from datetime import timedelta
import datetime
from flask import Flask, render_template, request, g, redirect, url_for, session, flash
import json

DATABASE = "db.sqlite3"
app = Flask(__name__, static_folder='./static')
app.config['SECRET_KEY'] = '1234'


@app.before_request
def before_request():
    # リクエストのたびにセッションの寿命を更新する
    session.permanent = True
    app.permanent_session_lifetime = timedelta(minutes=15)
    session.modified = True


"""
データベース接続
"""


def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = sqlite3.connect(DATABASE)
        db.row_factory = sqlite3.Row
    return db


@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()


"""
ビュー
"""


@app.route('/api/get_cars')
def get_cars():
    conn = get_db()
    cur = conn.cursor()
    cars = cur.execute('SELECT * FROM cars').fetchall()
    return json.dumps({'cars': [dict(car) for car in cars]},
                      ensure_ascii=False)


@app.route('/api/get_car/<car_id>')
def get_car(car_id):
    conn = get_db()
    cur = conn.cursor()
    car = cur.execute('SELECT * FROM cars WHERE car_id = ?',
                      (car_id, )).fetchone()
    return json.dumps({'car': dict(car)}, ensure_ascii=False)


@app.route('/api/get_stations')
def get_stations():
    conn = get_db()
    cur = conn.cursor()
    stations = cur.execute('SELECT * FROM stations').fetchall()
    return json.dumps({'stations': [dict(station) for station in stations]},
                      ensure_ascii=False)


@app.route('/api/get_station/<station_id>')
def get_station(station_id):
    conn = get_db()
    cur = conn.cursor()
    station = cur.execute('SELECT * FROM stations WHERE station_id = ?',
                          (station_id, )).fetchone()
    return json.dumps({'station': dict(station) if station else None},
                      ensure_ascii=False)


@app.route('/api/get_drivers')
def get_drivers():
    conn = get_db()
    cur = conn.cursor()
    drivers = cur.execute('SELECT * FROM drivers').fetchall()
    return json.dumps({'drivers': [dict(driver) for driver in drivers]},
                      ensure_ascii=False)


@app.route('/api/get_driver/<driver_id>')
def get_driver(driver_id):
    conn = get_db()
    cur = conn.cursor()
    driver = cur.execute('SELECT * FROM drivers WHERE driver_id = ?',
                         (driver_id, )).fetchone()
    return json.dumps({'driver': dict(driver)}, ensure_ascii=False)


@app.route('/api/get_conductors')
def get_crews():
    conn = get_db()
    cur = conn.cursor()
    crews = cur.execute('SELECT * FROM conductors').fetchall()
    return json.dumps({'crews': [dict(crew) for crew in crews]},
                      ensure_ascii=False)


@app.route('/api/get_conductor/<crew_id>')
def get_crew(crew_id):
    conn = get_db()
    cur = conn.cursor()
    crew = cur.execute('SELECT * FROM conductors WHERE conductor_id = ?',
                       (crew_id, )).fetchone()
    return json.dumps({'crew': dict(crew)}, ensure_ascii=False)


@app.route('/api/get_schedule_by_station/<station_id>')
def get_schedule_by_station(station_id):
    conn = get_db()
    cur = conn.cursor()
    schedules = cur.execute(
        """
          select stops.departure_time, dest.name as destination
          from train, stops, stations dest
          inner join stations here
          where train.train_id = stops.train_id
            and here.station_id = ?
            and stops.station_id = here.station_id
            and train.destinaion = dest.station_id
            and stops.departure_time is not NULL
          order by stops.departure_time
                            """, (station_id, )).fetchall()
    return json.dumps(
        {'schedules': [dict(schedule) for schedule in schedules]},
        ensure_ascii=False)


@app.route('/api/get_car_schedule/<car_id>')
def get_car_schedule(car_id):
    conn = get_db()
    cur = conn.cursor()
    schedules = cur.execute(
        """         
        select crewOnBoard.train_id, stations.station_id, stops.arrival_time, stops.departure_time
        from stops, stations, crewOnBoard, train 
        where crewOnBoard.train_id = stops.train_id
          and crewOnBoard.station_id = stops.station_id
          and train.car = ?
          and train.train_id = crewOnBoard.train_id
          and stations.station_id = crewOnBoard.station_id
        order by crewOnBoard.train_id, stops.departure_time NULLS LAST, stops.arrival_time  
  """, (car_id, )).fetchall()
    return json.dumps(
        {'schedules': [dict(schedule) for schedule in schedules]},
        ensure_ascii=False)


@app.route('/api/get_driver_schedule/<driver_id>')
def get_driver_schedule(driver_id):
    conn = get_db()
    cur = conn.cursor()
    schedules = cur.execute(
        """       
        select * from driver_schedule where driver_id = ?
        """, (driver_id, )).fetchall()
    return json.dumps(
        {'schedules': [dict(schedule) for schedule in schedules]},
        ensure_ascii=False)


@app.route('/api/get_train_schedule/<train_id>')
def get_train_schedule(train_id):
    conn = get_db()
    cur = conn.cursor()
    schedules = cur.execute(
        """       
        select * from stops where train_id = ?
        order by stops.departure_time NULLS LAST, stops.arrival_time  
        """, (train_id, )).fetchall()
    return json.dumps({schedules: [dict(schedule) for schedule in schedules]})


# stops
@app.route('/api/stops/<train_id>/edit', methods=['POST'])
def update_stops(train_id):
    conn = get_db()
    cur = conn.cursor()
    stops = request.get_json()["record"]
    for i in stops:
        station_id = i['station_id']
        arrival_time = i['arrival_time']
        departure_time = i['departure_time']

        recode = cur.execute(
            """
            select * from stops where train_id = ? and station_id = ? 
            """, (train_id, station_id)).fetchall()
        if len(recode) == 0:
            cur.execute(
                """
                insert into stops (train_id, station_id, arrival_time, departure_time)
                values (?, ?, ?, ?)
                """, (train_id, station_id, arrival_time, departure_time))
        else:
            cur.execute(
                """
                update stops
                set arrival_time = ?,
                    departure_time = ?
                where train_id = ?
                  and station_id = ?
                """, (arrival_time, departure_time, train_id, station_id))
    conn.commit()
    return json.dumps({'result': True})


@app.route('/api/stops/<train_id>/delete', methods=['POST'])
def delete_stops(train_id, station_id):
    conn = get_db()
    cur = conn.cursor()
    target = request.get_json()["target"]
    for i in target:
        cur.execute(
            """
            delete from stops
            where trainget_driver_schedule/1_id = ?
              and station_id = ?
            """, (train_id, i))
    conn.commit()
    return json.dumps({'result': True})


# crewrange
@app.route('/api/crewRange/<train_id>')
def get_crewRange(train_id):
    conn = get_db()
    cur = conn.cursor()
    crews = cur.execute(
        """
        select * from crewOnBoard where train_id = ?
        """, (train_id, )).fetchall()
    return json.dumps({'range': [dict(crew) for crew in crews]},
                      ensure_ascii=False)


@app.route('/api/crewRange/<train_id>/edit', methods=['POST'])
def update_crewRange(train_id, station_id):
    conn = get_db()
    cur = conn.cursor()
    data = request.get_json()["data"]

    for crews in data:
        recode = cur.execute(
            """
            select * from crewOnBoard where train_id = ? and station_id = ?
            """, (train_id, station_id)).fetchall()
        if len(recode) == 0:
            cur.execute(
                """
                insert into crewOnBoard (train_id, station_id, driver_id, conductor_id)
                values (?, ?, ?, ?)
                """, (train_id, station_id, crews['driver_id'],
                      crews['conductor_id']))
        else:
            cur.execute(
                """
                update crewOnBoard
                set driver_id = ?,
                    conductor_id = ?
                where train_id = ?
                  and station_id = ?
                """, (crews['driver_id'], crews['conductor_id'], train_id,
                      station_id))
    conn.commit()
    return json.dumps({'result': True})


@app.route('/api/crewRange/<train_id>/delete', methods=['POST'])
def delete_crewRange(train_id):
    conn = get_db()
    cur = conn.cursor()
    data = request.get_json()["target"]
    for i in data:
        cur.execute(
            """
            delete from crewOnBoard
            where train_id = ?
              and station_id = ?
            """, (train_id, i))
    conn.commit()
    return json.dumps({'result': True})


# train
@app.route('/api/train_details')
def get_trains():
    conn = get_db()
    cur = conn.cursor()
    trains = cur.execute('SELECT * FROM train').fetchall()
    return json.dumps({'trains': [dict(train) for train in trains]},
                      ensure_ascii=False)


@app.route('/api/train_detail/<train_id>', methods=['GET'])
def get_train(train_id):
    conn = get_db()
    cur = conn.cursor()
    train = cur.execute(
        """
        select * from train where train_id = ?
        """, (train_id, )).fetchone()
    return json.dumps({'train': dict(train)}, ensure_ascii=False)


@app.route('/api/train_detail/<train_id>/update', methods=['POST'])
def update_train(train_id):
    conn = get_db()
    cur = conn.cursor()
    train = request.get_json()

    cur.execute(
        """
        update train
        set destination = ?,
            origin = ?,
            car = ?
        where train_id = ?
        """, (train['destination'], train['origin'], train['car'], train_id))
    conn.commit()
    return json.dumps({'result': True})


@app.route('/api/train/<train_id>/delete', methods=['POST'])
def delete_train(train_id):
    conn = get_db()
    cur = conn.cursor()
    cur.execute(
        """
        delete from train
        where train_id = ?
        """, (train_id, ))

    cur.execute(
        """
        delete from stops
        where train_id = ?
        """, (train_id, ))

    cur.execute(
        """
        delete from crewOnBoard
        where train_id = ?
        """, (train_id, ))

    conn.commit()
    return json.dumps({'result': True})


# train全般操作
@app.route('/api/add_train', methods=['POST'])
def set_train_schedule():
    conn = get_db()
    cur = conn.cursor()
    train_schedule = request.get_json()["train"]
    for i in train_schedule["schedule"]:
        cur.execute(
            """
            insert into stops (train_id, station_id, arrival_time, departure_time)
            values (?, ?, ?, ?)
            """, (i['train_id'], i['station_id'], i['arrival_time'],
                  i['departure_time']))

        cur.execute(
            """
            insert into crewOnBoard (train_id, station_id, driver_id, conductor_id)
            values (?, ?, ?, ?)
            """, (i['train_id'], i['station_id'], i['driver_id'],
                  i['conductor_id']))

    train = train_schedule["detail"]
    cur.execute(
        """
        insert into train (train_id, car, origin, destinaion)
        values (?, ?, ?, ?)
        """, (train['train_id'], train['car_id'], train['origin_id'],
              train['destination_id']))

    conn.commit()

    return json.dumps({'result': True})


# @app.route('/')
# def home():
#     # セッションにuser_idがない場合、未ログインなのでusernameを渡さずにHTMLをレンダリング
#     if 'user_id' not in session:
#         return render_template('home.html')
#     # ユーザ情報がある場合、データベースに接続しuser_idからユーザ名を検索して渡す
#     conn = get_db()
#     cur = conn.cursor()
#     user = cur.execute('SELECT * FROM LoginUser WHERE username = ?',
#                        (session['user_id'], )).fetchone()
#     return render_template('home.html', username=user['username'])

# @app.route('/login', methods=['GET', 'POST'])
# def login():
#     if 'user_id' in session:
#         return redirect(url_for('home'))
#     error = None
#     # POSTはこの関数の一番下のlogin.htmlから呼ばれ、その中のフォームを送信する。フォームの内容に基づき、ユーザ情報を照合する
#     if request.method == 'POST':
#         # フォームの内容を取得する
#         username = request.form['username']
#         password = request.form['password']
#         # パスワードは平文ではなくハッシュ値で照合する
#         h = hashlib.md5(password.encode())
#         conn = get_db()
#         cur = conn.cursor()
#         user = cur.execute(
#             'SELECT * FROM LoginUser WHERE username = ? AND password = ?',
#             (username, h.hexdigest())).fetchone()
#         if user is None:
#             # ユーザ認証されなかった場合、エラーメッセージをレンダリングする。メッセージはこのように引数で渡すこともできるし、else以下のようにflashを使用することもできる。
#             error = 'Invalid username or password'
#         else:
#             # ユーザ認証された場合、セッションに記録する
#             session['user_id'] = username
#             # flashメッセージを設定する
#             flash("Logged in")
#             return redirect(url_for('home'))
#     return render_template('login.html', error=error)

# @app.route('/signup', methods=['GET', 'POST'])
# def signup():
#     conn = get_db()
#     cur = conn.cursor()
#     request_valid = True
#     if request.method == 'POST':
#         # フォームの内容を取得し、バリデーションを行う。エラーがあればflashメッセージで通知する
#         username = request.form['username']
#         password = request.form['password']
#         confirm = request.form['confirm']
#         if not username:
#             flash('Username is required')
#             request_valid = False
#         if not password:
#             flash('Password is required')
#             request_valid = False
#         if password != confirm:
#             flash('Passwords do not match')
#             request_valid = False
#         if cur.execute('SELECT * FROM LoginUser WHERE username = ?',
#                        (username, )).fetchone():
#             # ユーザーがすでに存在している場合はエラーを表示する
#             flash('This username is already taken')
#             request_valid = False
#         if request_valid:
#             # 新しいユーザーを作成する
#             h = hashlib.md5(password.encode())
#             cur.execute(
#                 'INSERT INTO LoginUser (username, password) VALUES (?, ?)',
#                 (username, h.hexdigest()))
#             conn.commit()
#             # ログインページにリダイレクトする
#             return redirect(url_for('login'))
#     return render_template('signup.html')

# @app.route('/logout')
# def logout():
#     if session.pop('user_id', None):
#         flash("Logged out")
#     return redirect(url_for('home'))

# @app.route("/employee", methods=["GET", "POST"])
# def employee():
#     if 'user_id' not in session:
#         return redirect(url_for('login'))
#     conn = get_db()
#     cur = conn.cursor()
#     # POSTは検索をするとリクエストされる
#     if request.method == "POST":
#         elist = cur.execute(
#             "SELECT e.*, m.name as manager_name FROM employee e, employee m WHERE m.id = e.manager AND e.name LIKE ? ORDER BY e.id",
#             ('%' + request.form["name"] + '%', )).fetchall()
#         return render_template("employee.html",
#                                counts=len(elist),
#                                elist=elist,
#                                query_name=request.form["name"])
#     else:
#         # GETの場合全件のデータベースルックアップをする。返ってくるテーブルの属性名で属性にアクセスするので、SQLで属性名を適切に設定する
#         elist = cur.execute(
#             "SELECT e.*, m.name as manager_name FROM employee e, employee m WHERE m.id = e.manager ORDER BY e.id"
#         ).fetchall(
#         )  ## XXX: managerがいないと表示されない。managerがいない人も表示させるにはouter joinする。
#         return render_template("employee.html", counts=len(elist), elist=elist)

# @app.route("/employee/<id>")
# def emp_master(id):
#     # 各従業員（idは従業員番号）の詳細情報
#     if 'user_id' not in session:
#         return redirect(url_for('login'))
#     conn = get_db()
#     cur = conn.cursor()
#     cur.execute("SELECT * FROM employee e WHERE e.id = ?", (id, ))
#     emp = cur.fetchone()
#     if not emp:
#         flash(f"Error: No employee entry {id}", "error")
#         return redirect(url_for("employee"))
#     return render_template("emp_detail.html", emp=emp)

# @app.route("/onboard", methods=["GET", "POST"])
# def emp_new():
#     if 'user_id' not in session:
#         return redirect(url_for('login'))
#     conn = get_db()
#     cur = conn.cursor()
#     if request.method == "POST":
#         request_valid = True
#         return_data = {
#             "form": request.form
#         }  # エラーメッセージなどを渡すためレンダラに渡すデータが大きくなる。よって辞書として管理する。

#         ## idを確認（数値である＆被りがない）
#         entry = cur.execute('SELECT name FROM employee e WHERE e.id = ?',
#                             (request.form['id'], )).fetchone()
#         if not request.form['id'].isdigit() or entry:
#             request_valid = False
#             return_data["id_invalid"] = "IDが不正です。"
#         else:
#             id = int(request.form['id'])

#         ## managerを確認
#         manager_entry = cur.execute(
#             'SELECT name FROM employee e WHERE e.id = ?',
#             (request.form["manager"], )).fetchone()
#         if request.form["manager"] != "0" and not manager_entry:
#             request_valid = False
#             return_data["manager_invalid"] = "Manager IDが不正です。"

#         ## 名前と誕生年の確認
#         if not (request.form['byear'] and request.form['byear'].isdigit()):
#             request_valid = False
#             return_data['byear_invalid'] = "誕生年を記入してください。"
#         if not request.form['name']:
#             request_valid = False
#             return_data['name_invalid'] = "名前を記入してください。"

#         ## Fileを確認
#         if 'pict' not in request.files:
#             request_valid = False
#             return_data["pict_invalid"] = "画像が添付されていないか、拡張子が不正です。"
#         else:
#             file = request.files["pict"]
#             if file.filename == "" or not file.filename.endswith(
#                 ('jpg', 'jpeg', 'png')):
#                 request_valid = False
#                 return_data["pict_invalid"] = "画像が添付されていないか、拡張子が不正です。"
#             elif request_valid:
#                 # 他の情報も正しい場合、送信されたファイルをidにリネームして保存する。
#                 filename = str(id) + os.path.splitext(file.filename)[1]
#                 file.save(os.path.join('./static/pict', filename))

#         ## Insertを行う
#         if request_valid:
#             try:
#                 cur.execute(
#                     'INSERT INTO employee (id,name,salary,manager,byear,syear,pict) VALUES (?, ?, ?, ?, ?, ?, ?)',
#                     [
#                         id, request.form['name'], 100, request.form['manager'],
#                         request.form['byear'],
#                         datetime.date.today().year, filename
#                     ])
#             except sqlite3.Error as e:
#                 print('sqlite3.Error occurred:', e.args[0])
#                 request_valid = False
#                 return_data['db_error'] = True
#             conn.commit()  ## 更新はcommitが必要

#         if request_valid:
#             flash("Registered. ID:{} NAME:{}（Manager:{}）".format(
#                 id, request.form['name'], manager_entry['name']))
#             return redirect(url_for("employee"))
#         else:
#             return render_template("emp_new.html", **return_data)

#     else:
#         return render_template("emp_new.html", form={})

# @app.route("/employee/<id>/edit", methods=["GET", "POST"])
# def emp_edit(id):
#     if 'user_id' not in session:
#         return redirect(url_for('login'))
#     conn = get_db()
#     cur = conn.cursor()
#     emp = cur.execute('SELECT * FROM employee e WHERE e.id = ?',
#                       [id]).fetchone()
#     if not emp:
#         flash(f"Invalid id {id}", "error")
#         return redirect(url_for("employee"))

#     if request.method == "GET":
#         return render_template('emp_edit.html', emp=emp)

#     if request.method == "POST":
#         request_valid = True
#         return_data = {"emp": {**emp, **request.form}}

#         ## managerを確認
#         manager_entry = cur.execute(
#             'SELECT name FROM employee e WHERE e.id = ?',
#             [request.form["manager"]]).fetchone()
#         if request.form["manager"] != "0" and not manager_entry:
#             request_valid = False
#             return_data["manager_invalid"] = "Manager IDが不正です。"

#         ## Fileを確認
#         file = request.files["pict"] if 'pict' in request.files else None
#         if not file:
#             filename = emp["pict"]
#         elif not file.filename.endswith(('jpg', 'jpeg', 'png')):
#             request_valid = False
#             return_data["pict_invalid"] = "画像の拡張子が不正です。"
#         elif request_valid:
#             filename = str(id) + os.path.splitext(file.filename)[1]
#             file.save(os.path.join('./static/pict', filename))

#         ## Insertを行う
#         if request_valid:
#             try:
#                 cur.execute(
#                     'UPDATE employee SET  name=?, salary=?, manager=? ,pict=? WHERE id=?',
#                     [
#                         request.form['name'], request.form['salary'],
#                         request.form['manager'], filename, id
#                     ])
#             except sqlite3.Error as e:
#                 print('sqlite3.Error occurred:', e.args[0])
#                 request_valid = False
#                 return_data['db_error'] = True
#             conn.commit()  ## 更新はcommitが必要

#         if request_valid:
#             flash(f"Updated {emp['name']} (Id:{id})")
#             return redirect(url_for("employee"))
#         else:
#             return render_template("emp_edit.html", id=id, **return_data)

# @app.route("/employee/<id>/delete", methods=["GET", "POST"])
# def emp_delete(id):
#     if 'user_id' not in session:
#         return redirect(url_for('login'))
#     if request.method == "GET":
#         return emp_master(id)

#     conn = get_db()
#     cur = conn.cursor()
#     request_valid = True

#     ## マネージャかどうか確認
#     is_manager = cur.execute(
#         'SELECT e.name FROM employee e WHERE e.manager = ?',
#         (id, )).fetchone()
#     if not is_manager:
#         emp = cur.execute('SELECT name FROM employee e WHERE e.id = ?',
#                           (id, )).fetchone()
#         ## Deleteを行う
#         try:
#             cur.execute('DELETE FROM employee WHERE id = ?', (id, ))
#         except sqlite3.Error as e:
#             print('sqlite3.Error occurred:', e.args[0])
#             request_valid = False
#         if request_valid:
#             conn.commit()
#             flash(f"Deleted {emp['name']} (ID:{id})")
#             return redirect(url_for("employee"))
#         else:
#             return redirect(url_for("emp_master", id=id))
#     else:
#         flash('Managerとして登録されています', "error")
#         return redirect(url_for('emp_master', id=id))

# pythonを直接実行したときでもflask run --debugと同じ挙動となるようにする
if __name__ == '__main__':
    app.run(debug=True)
