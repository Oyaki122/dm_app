// imTextort styles from './page.module.css';
import {
  Box,
  Text,
  UnorderedList,
  ListItem,
  Heading
} from './common/components';

export default function Home() {
  return (
    <main>
      <Heading as="h1" size="xl">
      データモデリング 最終レポート</Heading>

      <Box p={1} m={1}>
        <Heading as="h2" size="lg">第3課題からの変更点</Heading>
        <Text>データベース上に特に変更はない。しかし実際のアプリでは車掌の勤務状況と
        車両の使用状況については省略した。またログイン機能を実装しようとしたため
        それに関係するテーブルが追加されているが、使用はしていない。
        </Text>
        <Box p={1} m={1}>
          <Heading as="h2" size="lg">作品の説明</Heading>
          <Text>この作品は鉄道運行管理システムである。</Text>
          <Text>これは鉄道の運行管理を各列車、運転手、駅のそれぞれの視点から行い、
          これらを統合して表示するシステムである。</Text>
          <Text>本作品は以下の機能を持つ。</Text>
          <UnorderedList>
            <ListItem>列車一覧の表示</ListItem>
            <ListItem>列車情報の編集(出発元、行き先、停車駅、到着・出発時間、各駅までの担当運転手</ListItem>
            <ListItem>列車情報の追加</ListItem>
            <ListItem>駅時刻表の表示</ListItem>
            <ListItem>運転手勤務表の表示</ListItem>
          </UnorderedList>
        </Box>
        <Box p={1} m={1}>
          <Heading as="h2" size="lg">使用した技術</Heading>
          <Text>フロントエンドにはNext.jsを使用した。バックエンドは授業内の実装例と同様に
            Flaskを使用した。ただしテンプレートエンジンは用いず、APIサーバーとしてのみ
            使用した。
          </Text>
        </Box>
        <Box p={1} m={1}>
          <Heading as="h2" size="lg">各画面</Heading>
          <Heading as="h3" size="md">トップ画面</Heading>
          <Text>この画面。画面右上のハンバーガーメニューから各画面へ移動できる</Text>
          <Heading as="h3" size="md">列車一覧</Heading>
          <Text>列車の一覧を表示する。列車番号、出発元、行き先を表示する。</Text>
          <Text>列車番号をクリックすると列車詳細画面に遷移する。</Text>

          <Heading as="h3" size="md">列車詳細</Heading>
          <Text>列車の詳細を表示する。列車番号、出発元、行き先、停車駅、到着・出発時間、
            各駅までの担当運転手を表示する。
          </Text>

          <Heading as="h3" size="md">列車編集</Heading>
          <Text>列車の詳細を編集する。</Text>

          <Heading as="h3" size="md">列車追加</Heading>
          <Text>列車を追加する。</Text>

          <Heading as="h3" size="md">駅時刻表</Heading>
          <Text>駅の時刻表を表示する。駅を選択すると、列車の行き先と出発時間を表示する。</Text>

          <Heading as="h3" size="md">運転手勤務表</Heading>
          <Text>運転手の勤務表を表示する。運転手を選択すると、その運転手が担当する列車の区間
            が一覧で表示される。</Text>
        </Box>
        <Box p={1} m={1}>
          <Heading as="h2" size="lg">エンドポイント</Heading>
          <Text>エンドポイントは各テーブルについて全件取得とID検索による取得を実装した。
            またこれと別に直接編集するstoTexts, crewOnBoard, trainについては編集
            メソッドを実装した。列車の作成については一度にtrain, creOnBoard, stoTextsに
            同時にレコードを複数追加する必要があったため、専用のエンドポイントを
            作成した。削除用のエンドポイントも同様に作成したが、UI上には実装できなかった。

          </Text>
        </Box>


        <Box p={1} m={1}>
          <Heading as="h2" size="lg">反省点</Heading>
          <Text>今回は鉄道管理システムを再現しようとしたが、現実の鉄道ではより専門的な
            形式で表示される。ここの再現も行いたかったが、時間が足らず実装できなかった。
            またログイン機能はCORSなどの問題によってNext.jsとの連携がうまく行かず実装できず残念だった。
            更に今回は新規作成部分以外で削除を実装できなかった。CRUDのうちCRUのみとなって
            しまったことについては非常に残念である。
          </Text>
          <Text>
            ただNext.jsを用いたモダンな設計手法を実際に試すことができたことについては
            大変良かったと思う。今後もこの手法を用いて開発を行っていきたい。
          </Text>
        </Box>
      </Box>
    </main>
  );
}
