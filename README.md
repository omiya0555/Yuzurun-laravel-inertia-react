# Yuzurun アプリケーション

## 概要
Yuzurun は、物品の譲渡をスムーズに行うための Web アプリケーションです。商品はすべて無料であり、
配送方法も個人間で決定します。本アプリでは、出品者とユーザー間でのチャット機能を備えています。
アプリ内チャット以外の選択肢として、LINE や Signal の連絡リンクを活用してコミュニケーションを円滑に進められるように設計されています。

## 主な機能
- ユーザー認証 (通常ログイン/Google/Slack 認証)
- 商品出品・閲覧・検索・カテゴリフィルタリング
- チャット機能（リアルタイム通信）

## 必要な環境とツール
- PHP 8.2
- Composer
- Laravel 11
- Node.js (npm)
- MySQL 8.0
- Nginx
- php-fpm
- Firebase / FireStore
- Docker

## セットアップ手順

### 1. リポジトリのクローン
```
git clone https://github.com/omiya0555/Yuzurun-laravel-inertia-react.git
cd yuzurun
```

### 2. 環境ファイルの作成
`.env.example` をコピーして `.env` を作成し、必要な設定を記入します。
```
cp .env.example .env
```

### 3. 必要なライブラリのインストール
```
composer install
npm install
npm run dev
```

### 4. アプリケーションキーの生成
```
php artisan key:generate
```

### 5. データベースの設定とマイグレーション
`.env` ファイルにデータベース情報を設定後、以下を実行します。
```
php artisan migrate --seed
```

### 6. OAuth 認証設定
Google、Slack などの認証を使用する場合は `config/services.php` に設定を追加し、`.env` ファイルに以下を記述します。

### 7. Firebase の設定
- `firebaseConfig.js` ファイルに Firebase プロジェクト情報を記入してください。

## 実行方法
### 開発環境サーバー起動
```
php artisan serve
npm run dev
```

## デプロイ
AWS (ECS/Fargate,SES,S3,ALB,Rotue53等)

## 主要な使用技術
- **Laravel Socialite**: Google, Slack 認証用。
- **Inertia.js-React**: リアクティブなページ遷移を実現。
- **Tailwind CSS**: スタイリング用。
- **Firebase Firestore**: チャット機能に使用。

## その他
- **推奨ブラウザ**: 最新版の Google Chrome、Firefox。

## 貢献
1. フォークして修正後、プルリクエストを送信してください。
2. Issue やバグ報告は GitHub 上でお知らせください。

## ライセンス
このプロジェクトは MIT ライセンスのもとで公開されています。

## 著者
- 開発者: Omiya Yujin
- お問い合わせ: otoharadak@gmail.com

