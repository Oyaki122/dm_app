# coding: utf-8
import hashlib
import sqlite3
import os
from datetime import timedelta
import datetime
from flask import Flask, render_template, request, g, redirect, url_for, session, flash
import json
from flask_cors import CORS

DATABASE = "db.sqlite3"
app = Flask(__name__,
            static_folder='./dm_app/out',
            template_folder='./dm_app/out')
app.config['SECRET_KEY'] = '1234'
app.config["SESSION_COOKIE_SAMESITE"] = "None"
app.config["SESSION_COOKIE_SECURE"] = True
CORS(app, supports_credentials=True, origins=["http://*"])


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
@app.route('/api/stops/<train_id>', methods=['GET'])
def get_stops(train_id):
    conn = get_db()
    cur = conn.cursor()
    stops = cur.execute(
        """
        select * from stops where train_id = ?
        order by stops.departure_time NULLS LAST, stops.arrival_time  
        """, (train_id, )).fetchall()
    return json.dumps({'stops': [dict(stop) for stop in stops]},
                      ensure_ascii=False)


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
def update_crewRange(train_id):
    conn = get_db()
    cur = conn.cursor()
    data = request.get_json()["data"]

    for crews in data:
        recode = cur.execute(
            """
            select * from crewOnBoard where train_id = ? and station_id = ?
            """, (train_id, crews['station_id'])).fetchall()
        if len(recode) == 0:
            cur.execute(
                """
                insert into crewOnBoard (train_id, station_id, driver_id, conductor_id)
                values (?, ?, ?, ?)
                """, (train_id, crews['station_id'], crews['driver_id'],
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
                      crews['station_id']))
    conn.commit()
    return json.dumps({'result': True})


# @app.route('/api/crewRange/<train_id>/delete', methods=['POST'])
# def delete_crewRange(train_id):
#     conn = get_db()
#     cur = conn.cursor()
#     data = request.get_json()["target"]
#     for i in data:
#         cur.execute(
#             """
#             delete from crewOnBoard
#             where train_id = ?
#               and station_id = ?
#             """, (train_id, i))
#     conn.commit()
#     return json.dumps({'result': True})


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
        set destinaion = ?,
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
    train = train_schedule["detail"]
    cur.execute(
        """
        insert into train (train_id, car, origin, destinaion)
        values (?, ?, ?, ?)
        """,
        (train['id'], train['car_id'], train['origin'], train['destinaion']))
    conn.commit()
    id = train['id']

    for i in train_schedule["schedule"]:
        cur.execute(
            """
            insert into stops (train_id, station_id, arrival_time, departure_time)
            values (?, ?, ?, ?)
            """, (id, i['station_id'], i['arrival_time'], i['departure_time']))

        cur.execute(
            """
            insert into crewOnBoard (train_id, station_id, driver_id, conductor_id)
            values (?, ?, ?, ?)
            """, (id, i['station_id'], i['driver_id'], i['conductor_id']))

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


@app.route('/api/user', methods=['GET'])
def user():
    if 'user_id' not in session:
        return json.dumps({'result': False}), 403
    else:
        return json.dumps({'result': True, 'user_id': session['user_id']}), 200


@app.route('/api/login', methods=['POST'])
def login():
    if 'user_id' in session:
        return json.dumps({'result': True}), 200
    error = None
    # POSTはこの関数の一番下のlogin.htmlから呼ばれ、その中のフォームを送信する。フォームの内容に基づき、ユーザ情報を照合する
    # フォームの内容を取得する
    username = request.get_json()['username']
    password = request.get_json()['password']
    # パスワードは平文ではなくハッシュ値で照合する
    h = hashlib.md5(password.encode())
    conn = get_db()
    cur = conn.cursor()
    user = cur.execute(
        'SELECT * FROM LoginUser WHERE username = ? AND password = ?',
        (username, h.hexdigest())).fetchone()
    if user is None:
        # ユーザ認証されなかった場合、エラーメッセージをレンダリングする。メッセージはこのように引数で渡すこともできるし、else以下のようにflashを使用することもできる。
        error = 'Invalid username or password'
    else:
        # ユーザ認証された場合、セッションに記録する
        session['user_id'] = username
        # flashメッセージを設定する
        flash("Logged in")
        return json.dumps({'result': True}), 200
    return json.dumps({'result': False, 'error': error}), 403


@app.route('/api/signup', methods=['POST'])
def signup():
    conn = get_db()
    cur = conn.cursor()
    request_valid = True
    # フォームの内容を取得し、バリデーションを行う。エラーがあればflashメッセージで通知する
    username = request.get_json()['username']
    password = request.get_json()['password']

    error = ""

    if not username:
        error = 'Username is required'
        request_valid = False
    if not password:
        error = 'Password is required'
        request_valid = False
    if cur.execute('SELECT * FROM LoginUser WHERE username = ?',
                   (username, )).fetchone():
        # ユーザーがすでに存在している場合はエラーを表示する
        error = 'This username is already taken'
        request_valid = False
    if request_valid:
        # 新しいユーザーを作成する
        h = hashlib.md5(password.encode())
        cur.execute('INSERT INTO LoginUser (username, password) VALUES (?, ?)',
                    (username, h.hexdigest()))
        conn.commit()
        # ログインページにリダイレクトする
        return json.dumps({'result': True}), 200
    return json.dumps({'result': False, 'error': error}), 403


@app.route('/api/logout')
def logout():
    if session.pop('user_id', None):
        flash("Logged out")
    return json.dumps({'result': True})


@app.route('/', defaults={'path': ''})
def catch_all(path):
    return app.send_static_file("index.html")


@app.route('/<path:path>')
def static_file(path):
    print(path)
    return app.send_static_file(path)


@app.route('/<path:path>/')
def static_html(path):
    print(path)
    query = path.split('?')[1]
    url = path.split('?')[0]
    return app.send_static_file(url + 'index.html' + '?' + query)


# pythonを直接実行したときでもflask run --debugと同じ挙動となるようにする
if __name__ == '__main__':
    app.run(debug=True)
