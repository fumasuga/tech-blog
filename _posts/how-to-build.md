---
title: "自分のブログを作る"
coverImage: "/assets/blog/preview/cover.jpg"
date: "2025-08-08T09:59:00.322Z"
ogImage:
  url: "/assets/blog/preview/cover.jpg"
---

この記事は、Next.js（SSG）で作ったブログを Firebase Hosting へ自動デプロイする手順を整理します。WSL2 と Docker を用いた開発環境を前提に、GitHub Actions で CI/CD を構築したい開発者向けの内容です。
#### 使用技術
|  |  |
| --- | --- |
| ソース管理 | GitHub |
| CI/CD | GitHub Actions |
| ホスティング | Firebase Hosting |
| ブログフレームワーク | Next.js (SSG) |
| 開発環境 | WSL2, Docker |

## WSL2 と開発環境の準備
Windows ユーザーの場合、まず開発環境として WSL2（Windows Subsystem for Linux）を導入します。

1. WSL2 のインストール

管理者権限の PowerShell / コマンドプロンプトで以下を実行し、Ubuntu を導入します。
```Bash
wsl --install
```
インストール完了後に再起動し、Ubuntu のユーザー名とパスワードを設定します。

2. Node.js と npm のインストール

WSL2 上の Ubuntu で Next.js 実行に必要な Node.js と npm を入れます。
```Bash
sudo apt update
sudo apt install nodejs npm
```
インストール後、バージョンを確認して正しく入ったかチェックします。
```Bash
node -v
npm -v
```

## Docker のインストール
[Docker Desktop 公式サイト](https://www.docker.com/products/docker-desktop/) からインストーラを取得して実行します。セットアップ時に WSL2 バックエンドが有効化されるため、WSL2 から Docker を利用できるようになります。

## プロジェクト準備
1. GitHub

まずブログ用のリポジトリを作成します。[GitHub の新規作成ページ](https://github.com/new)で任意の名前で作成してください。ここでは例として blog-example を使います（以降はご自身の名前に置き換えてください）。公開 / 非公開はお好みで構いません。

2. Firebase

[Firebase Console](https://console.firebase.google.com/u/0/) で「Add project」をクリックし、以下を実施します。
 - プロジェクト名を入力（例: blog-example）
 - 一意な Project ID が自動生成されるので必要に応じて変更
 - Google Analytics の有効化は任意（本手順では無効でも可）
 - 「Create project」で作成

## Next.js Blog Starter を Docker でローカル構築
以下は Docker を使って Next.js blog-starter テンプレートをローカルに立ち上げる手順です。

1. Node.js イメージを取得
```bash
$ docker pull node
```
2. テンプレートのダウンロードとプロジェクト作成

任意のディレクトリでブログ用フォルダを作成します。GitHub リポジトリ名が blog-example でない場合は適宜置き換えてください。
```bash
$ docker run --rm -it -v $PWD:/home/app -w /home/app node yarn create next-app --example blog-starter blog-example
$ cd blog-example
```
3. テンプレートの起動
```bash
$ docker run --rm -it -v $PWD:/home/app -w /home/app -p 3000:3000 node yarn dev
```
4. ブラウザで確認

サーバー起動後に http://localhost:3000 を開き、公式デモと同じ表示になればローカル環境は整っています。

## Dockerfile と docker-compose.yml を追加
毎回長い docker run コマンドを打つ手間を減らすため、Docker Compose にまとめます。

1. 必要ファイルを作成

```bash
$ touch Dockerfile
$ touch docker-compose.yml
```
※ sudo を避けたい場合は親ディレクトリの所有権や権限を調整します（共有環境では chmod に注意）。

所有者を変更する例（<your_username>, <your_group> を置換）:
```bash
$ sudo chown <your_username>:<your_group> .
```
書き込み権限を付与する例:
```bash
$ chmod u+w .
```

2. ファイルに中身を追記

Dockerfile
```Dockerfile:Dockerfile
FROM node:latest
```

docker-compose.yml
```yml:docker-compose.yml
version: '3'

services:
  app:
    build: .
    working_dir: /home/app
    ports:
      - "3000:3000"
    volumes:
      - .:/home/app
    tty: true
    stdin_open: true
    command: yarn dev
```

3. イメージをビルド
Dockerfile や依存（package.json / yarn.lock）が変わったらビルドします。--no-cache でキャッシュを無効化。
```bash
$ docker-compose build --no-cache
```

4. 開発環境を起動
```bash
$ docker-compose up
```

5. ブラウザで確認

http://localhost:3000 を開き、正常に表示されれば Docker Compose での開発環境が整いました。

## next.config.js の設定
next.config.js はビルド時・実行時の挙動をカスタマイズする設定ファイルです。画像最適化や環境変数、API ルートの挙動調整などで必要になります。

1. next.config.js を作成
```bash
$ touch next.config.js
```

2. 基本設定を記述
必要に応じてコメントアウトを外したり追記してください。

```javascript:next.config.js
/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },

  // Optional: Change links `/me` -> `/me/` and emit `/me.html` -> `/me/index.html`
  // trailingSlash: true,

  // Optional: Prevent automatic `/me` -> `/me/`, instead preserve `href`
  // skipTrailingSlashRedirect: true,

  // Optional: Change the output directory `out` -> `dist`
  // distDir: 'dist',
}
 
module.exports = nextConfig
```
3. 反映と確認

保存後、Next.js を再起動します。Docker Compose を使う場合はコンテナを再起動してください。
```bash
$ docker-compose down
$ docker-compose up --build # 設定に応じて再ビルドが必要になる場合があります
```
docker-compose up で問題が出る場合やキャッシュ起因の不具合がある場合は、完全にクリーンな状態から再ビルドしてみてください。
```bash
$ docker-compose down --rmi all --volumes --remove-orphans
$ docker-compose up --build
```
その後 http://localhost:3000 を開き、挙動を確認します。

## Firebase Hosting へのデプロイ
Next.js アプリを Firebase Hosting に載せる手順です。

1. 事前準備（ファイル修正）

Dockerfile / docker-compose.yml を次のように編集します。
* Dockerfile の修正: Firebase CLI を追加
```Dockerfile:Dockerfile
FROM node

RUN yarn global add firebase-tools # Add this line
```

* docker-compose.yml の修正: Firebase CLI がローカルで 9005 を使う場合があるのでポートを公開
```yml:docker-compose.yml
version: '3'

services:
  app:
    build: .
    working_dir: /home/app
    ports:
      - "3000:3000"
      - "9005:9005" # Add this line
    volumes:
      - .:/home/app
    tty: true
    stdin_open: true
    command: yarn dev
```

2. ビルドしてバックグラウンド起動
```bash
$ docker-compose build --no-cache
$ docker-compose up -d
```
3. コンテナへ入る

Firebase CLI での設定・デプロイはコンテナ内で行います。
```bash
$ docker-compose exec app bash # 'app' は docker-compose.yml のサービス名
```

## Firebase init
1. Next.js をビルド
package.json で next export を含むビルドを設定している前提です。静的ファイルが out ディレクトリに出力されます。
```bash
$ yarn build
```

2. Firebase へログイン
```bash
$ firebase login
```
実行すると、CLI/Emulator Suite の利用状況送信について Yes/No を求められます。続いてブラウザでの認証用 URL が表示されるので、コピーしてアクセスし、Google アカウントでログイン・許可します。成功するとターミナルに次のようなメッセージが出ます。

> ✔ Success! Logged in as XXXXXXX@gmail.com

これが出ればログイン完了です。

3. Firebase プロジェクト初期化
```bash
$ firebase init
```
対話で次のように選択します。

> Which Firebase features do you want to set up for this directory? Press Space to select features, then Enter to confirm your choices.

Hosting: Configure files for Firebase Hosting and (optionally) set up GitHub Action deploys（スペースで選択し Enter）

> Please select an option

Use an existing project

> Select a default Firebase project for this directory

最初に作成した Firebase プロジェクト名を選択（例: blog-example-XXXXX）

> What do you want to use as your public directory?

out

> Configure as a single-page app (rewrite all urls to /index.html)?

No

> Set up automatic builds and deploys with GitHub?

Yes

> File out/404.html already exists. Overwrite?

No

> File out/index.html already exists. Overwrite?

No

GitHub 認証が必要な場合は「Visit this URL on this device to log in」という URL が表示されます。ブラウザで開いて GitHub を認可してください。

> For which GitHub repository would you like to set up a GitHub workflow?

${YourGithubAccountName}/${RepositoryName} (例: miketako3/blog-example)

> Set up the workflow to run a build script before every deploy?

Yes

> What script should be run before every deploy?

yarn install --immutable --immutable-cache --check-cache && yarn build

> Set up automatic deployment to your site's live channel when a PR is merged?

Yes

> What is the name of the GitHub branch associated with your site's live channel?

master（main を使っている場合は main）

完了すると次が表示されます。

> ✔ Firebase initialization complete!

これで初期化完了です。

7. Firebase へデプロイ
```bash
$ firebase deploy
```
次のような出力が出れば成功です。

> ✔ Deploy complete!
>
> Project Console: https://console.firebase.google.com/project/blog-example-XXXXX/overview
> Hosting URL: https://blog-example-XXXXX.web.app

Hosting URL をブラウザで開き、テンプレートブログが表示されることを確認してください。失敗する場合は out ディレクトリの出力物を確認すると原因が見つかることがあります。

## GitHub Actions で自動デプロイ
firebase init を実行すると、プロジェクト直下に .github/workflows が生成され、firebase-hosting-pull-request.yml / firebase-hosting-merge.yml が自動で用意されます。

* firebase-hosting-pull-request.yml: PR 作成時にプレビュー環境へデプロイするワークフロー
* firebase-hosting-merge.yml: main / master へのマージ時に本番へデプロイするワークフロー

これにより、main / master に push すると自動で Firebase Hosting へのデプロイが走ります。進捗は GitHub リポジトリの「Actions」タブで確認できます。

#### デプロイ手順（GitHub Actions 利用）
1. 変更をコミット
```bash
$ git init
$ git add -A
$ git commit -m "init"
```
* git init: 新規リポジトリを初期化
* git add -A: 変更（追加・更新・削除）をすべてステージ
* git commit -m "init": ステージ済み変更をコミット

2. リモート登録（初回のみ）
ローカルがまだ GitHub と紐付いていない場合に追加します。XXXXXXXXX は実際のリポジトリ URL に置き換えてください。
```bash
$ git remote add origin git@XXXXXXXXX
```
* git remote add origin: origin という名前でリモートを追加
* git@XXXXXXXXX: GitHub リポジトリの SSH URL

3. GitHub へプッシュ
```bash
$ git push -u origin master
```
* git push -u origin master: ローカル master を origin の master にプッシュし、以降の push 先を紐付け

これで GitHub Actions が変更を検知し、設定されたワークフローに従って Firebase Hosting へのデプロイが自動実行されます。手動デプロイから解放され、開発に集中できるようになります。

-----
以上が Next.js ブログを Firebase Hosting へデプロイする手順です。