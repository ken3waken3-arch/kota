# 自立活動 支援ナビ — Pages公開用

## 保存とオフライン

この版は、指導計画・実践記録・作成内容を使っている端末のブラウザー内に保存します。他の端末や先生のアカウントとは同期しません。ブラウザーのデータ消去・アプリ削除で記録が消える場合があるため、大切な記録はアプリ内のJSON書き出しでバックアップしてください。児童生徒を特定できる情報は入力しないでください。

最初にオンラインで開いた後、ホーム画面に追加すると、アプリ本体とカード検索をオフラインで使えます。

## 無料URL

Cloudflare Pages のプロジェクト名が空いていれば `jiritsukatsudou` に設定し、`https://jiritsukatsudou.pages.dev` の形で公開できます。GitHubアカウント名は公開URLに含まれません。

## 公開設定

1. Cloudflare の Workers & Pages で **Create application → Pages → Connect to Git** を選びます。
2. GitHubのソースリポジトリを選び、Cloudflareによるアクセスを許可します。
3. プロジェクト名を `jiritsukatsudou`、本番ブランチを `main` にします。
4. Build command は空欄、Build output directory は `site` にします。
5. Deploy を実行し、表示された `*.pages.dev` URLを確認します。

この版は既存のアカウント同期APIを使わないため、保存内容は同期版と共有されません。同期を続ける場合は既存の `jiritu.ken3-wa-ken3.chatgpt.site` を使ってください。
