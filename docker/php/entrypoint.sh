#!/bin/bash
set -e

# Laravelの初期化コマンド
echo "Running Laravel initialization..."

php artisan key:generate --force
php artisan config:cache
php artisan route:cache
php artisan migrate --force
php artisan storage:link

# PHP-FPMの起動
echo "Starting PHP-FPM..."
exec php-fpm