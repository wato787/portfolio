# Ohung(ネイルサロン顧客管理アプリ)
<img width="370" alt="スクリーンショット 2023-04-09 7 57 32" src="https://user-images.githubusercontent.com/112467830/230745903-f0a53f3a-5b0f-47b4-aee5-a3a130336cfa.png">


## アプリ URL
https://ohung-nail.vercel.app/

## アプリ概要
顧客情報の管理が簡単にできるアプリです。携帯から見ることを前提としています。
お客様ごとの情報や過去のネイル履歴画像を簡単に管理することが出来ます。
カレンダーに予定を追加することで当日の予定をトップページに表示します。

## アプリを作成した背景
ネイルサロンを一人で経営している友人から顧客管理で困っているとの相談を受け、作成しました。
Ohungは「とにかく使いやすいように」を重視して、欲しい機能であったり、いつも使っているカレンダーアプリなど普段から使い慣れているアプリをヒアリングして作成しました。


## テスト用アカウント
* メールアドレス：test@test.com
* パスワード　　：testuser

## 利用方法
| ログインページ  | 
| ------------- | 
|<img width="370" alt="スクリーンショット 2023-04-09 7 57 32" src="https://user-images.githubusercontent.com/112467830/230745903-f0a53f3a-5b0f-47b4-aee5-a3a130336cfa.png"> | 
| Ohungのログインページです<br> アカウントをお持ちの方はメールアドレス、パスワードを入力しログインします。<br>お持ちでない方は「新規作成はこちら」をクリックしていただき、<br>メールアドレス、パスワードを入力してアカウントを作成します。|

| トップページ | 詳細ページ  |
| -----------| ----------|
| <img width="369" alt="スクリーンショット 2023-04-09 8 16 32" src="https://user-images.githubusercontent.com/112467830/230746354-4665e5e8-5f3e-4adc-957c-9c5ca079cdde.png">|<img width="350" alt="スクリーンショット 2023-04-09 8 38 47" src="https://user-images.githubusercontent.com/112467830/230746957-62e4f66c-f83c-49f2-828a-af902778e99b.png">|
|  トップページです。 本日の来店予定を昇順で表示します。|詳細ページです。顧客情報を表示します。<br>右下+ボタンクリックで画像追加出来ます。|


| 顧客リスト | 新規追加ページ | 
| -------- | ------------ | 
|<img width="350" alt="スクリーンショット 2023-04-09 8 28 46" src="https://user-images.githubusercontent.com/112467830/230746718-66095075-a695-402a-a12e-aeb19ca6b553.png">| <img width="350" alt="スクリーンショット 2023-04-09 8 31 02" src="https://user-images.githubusercontent.com/112467830/230746785-e7e0940d-5139-4ca3-886a-35cb62cfdd20.png">
| 顧客リスト一覧ページです。<br>画面右下+ボタンクリックで<br>顧客情報追加ページに遷移します。 | 顧客情報の新規追加ページです。<br>必要な情報を入力していただき 追加していただくと<br>顧客リストに追加されます。 | 

| カレンダーページ | 週の予定ページ |  
| ------------- | ------------- | 
|<img width="366" alt="スクリーンショット 2023-04-09 8 34 38" src="https://user-images.githubusercontent.com/112467830/230746869-c498485e-448f-4121-a001-3dda8285b474.png">| <img width="361" alt="スクリーンショット 2023-04-09 8 36 35" src="https://user-images.githubusercontent.com/112467830/230746917-a450a391-85eb-45cf-b660-b3b04f03302b.png">
| カレンダーページです。 | 週の予定ページです<br>カレンダーに追加されているイベントを週単位で表示します。 |

## ページ別機能一覧
* ログインページ （サインアップ/ログイン/ログアウト/パスワードリセット）
* トップページ (本日来店予定の顧客リスト表示/キャンセル/来店済みクリックで非表示）
* 顧客リストページ（全顧客リスト表示/30人以上登録でもっと見るボタン表示/名前検索）
* 顧客情報新規追加ページ (画像プレビュー)
* 詳細ページ (画像クリックで拡大/画像追加/画像プレビュー)
* カレンダー (日付セルクリックで予定追加/日付クリックで日表示/予測変換)

## 実装予定の機能
* 月別、週別来店人数ページ(グラフ)
* 詳細ページの画像削除機能

## 開発環境
### フロントエンド
* React
* Next.js
* Typescript
* Recoil
* fullcalendar
* Chakra UI

### バックエンド
* Firebase 
* Firestore
* Firestorage

### デプロイ
* Vercel

## 工夫した点
* できる限りページ遷移を減らし、モーダルで表示することによりロード時間を短くしました。

* トップページに本日のご来店予定のお客様を表示することで必要な操作を限りなく減らしました。

* 詳細ページをお客様に見せることを予想し、詳細ページのお客様情報を初期状態で非表示にし、画像を見せやすいよう拡大できるようにしました。

* 来店回数がわかりやすいように回数に応じて背景色が変わるようにしました。

* カレンダーに予定追加時、手間を少しでも減らせるよう名前の予測変換を出すようにしました。