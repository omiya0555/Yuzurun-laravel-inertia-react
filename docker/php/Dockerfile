FROM php:8.2-fpm

# 必要なライブラリをインストール
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    && docker-php-ext-install pdo_mysql gd

# sail ユーザーを追加
RUN groupadd -g 1000 sail && \
    useradd -u 1000 -g sail -m sail && \
    usermod -aG www-data sail

# php-fpm設定をコピー
COPY php-fpm.conf /usr/local/etc/php-fpm.d/www.conf

# Composerをインストール
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# 作業ディレクトリ
WORKDIR /var/www/html

# ユーザー切り替え
USER www-data