FROM php:8.2-fpm

# 必要なライブラリをインストール
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    curl \
    && docker-php-ext-install pdo_mysql gd

# sail ユーザーを追加
RUN groupadd -g 1000 sail && \
    useradd -u 1000 -g sail -m sail && \
    usermod -aG www-data sail

# Composerをインストール
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# php-fpm設定をコピー
COPY ./docker/php/php-fpm.conf /usr/local/etc/php-fpm.d/www.conf

# Entrypointスクリプトをコピー
COPY ./docker/php/entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

# 作業ディレクトリの設定
WORKDIR /var/www/html

# Laravelプロジェクトをコピー
COPY ./composer.json ./composer.lock /var/www/html/
COPY . /var/www/html/

# 必要なディレクトリを作成し、権限を設定
RUN mkdir -p /var/www/html/storage /var/www/html/bootstrap/cache && \
    chown -R www-data:www-data /var/www/html && \
    chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache

# Composerで依存関係をインストール
RUN composer install --no-dev --optimize-autoloader

# Laravelのキャッシュ作成
RUN php artisan config:cache && \
    php artisan route:cache

# Entrypointを設定
ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]

# php-fpmの起動
CMD ["php-fpm"]
