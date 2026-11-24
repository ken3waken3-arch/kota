# 自立活動 支援ナビ — GitHub Pages版

学校内で共有して使うための静的PWAです。公開URLを知っている人は利用できます。

## 保存とオフライン

- 指導計画・実践記録・作成内容は、使っている端末のブラウザー内だけに保存されます。
- 他の端末・他の先生のアカウントとは同期しません。ブラウザーのデータ消去やアプリ削除で、端末内の記録が消える場合があります。大切な記録はアプリのJSON書き出しでバックアップしてください。
- 最初にオンラインで開いた後、PWAとしてホーム画面に追加すると、アプリ本体とカード検索をオフラインで使えます。
- 児童生徒を特定できる情報は入力しないでください。

## 公開URL

リポジトリ名を `jiritu` に変更して GitHub Pages を有効にすると、URLは `https://ken3waken3-arch.github.io/jiritu/` になります。`ken3waken3-arch` はGitHubアカウント名なので、この形式の無料URLからは取り除けません。

## GitHub側の設定

1. リポジトリを `jiritu` という名前にします。
2. Settings → Pages → Build and deployment → Source で **GitHub Actions** を選びます。
3. `main` にこのフォルダーをアップロードすると、`.github/workflows/deploy.yml` が公開します。
4. Actions の実行が成功した後、Pages欄に表示されるURLを開いて確認します。

この版は既存のアカウント同期APIを使わないため、同期版とは保存内容を共有しません。同期を続ける場合は、既存の `jiritu.ken3-wa-ken3.chatgpt.site` を使ってください。
