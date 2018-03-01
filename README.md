# chrome-extension_phpmyadmin_query-list
Chrome Extension. phpMyAdmin - Query List

- phpMyAdmin 4.6.4 で、クエリの履歴の呼び出し方がわからなかったので、クエリ履歴を保存する Chrome Extension を作成。
- phpMyAdmin上で実行したクエリをローカルストレージに保存し、Chrome拡張のアイコンクリックでポップアップにて一覧表示。
- 同じクエリが投げられた場合、過去の同じクエリを除去しています。
- エラーのクエリも保存してしまいます。
- 最大３０個保存します。
- 無理やりハックしているので、ほかのバージョンでは使えないかもしれません。

## 使い方
- ソースをまるごとダウンロード
- `manifest.json` の `content_scripts` -> `matches` に、自分のphpMyAdminのURLを記述
    - 例） `https://xxx.xxx.xx/*`
- Google Chrome の `その他のツール` -> `拡張機能` を起動
- `パッケージ化されていない拡張機能を読み込む` で、ダウンロードしたディレクトリを指定

## その他
- クエリボックスが表示されている状態で、実行ボタンをクリックしたときのみ保存します。
- 最初のクエリ実行時のみ、実行後にページを読み込み直さないと履歴が表示されないかもしれません。
