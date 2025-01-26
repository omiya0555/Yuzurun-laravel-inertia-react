FROM nginx:latest

COPY ./docker/nginx/default.conf /etc/nginx/conf.d/default.conf
COPY ./docker/nginx/nginx.conf /etc/nginx/nginx.conf

# 作業ディレクトリの設定
WORKDIR /var/www/html

# アプリケーションの静的ファイルをコピー
COPY ./public /var/www/html/public

# ファイルの権限と所有権を設定
RUN chmod -R 755 /var/www/html/public && \
    chown -R www-data:www-data /var/www/html/public