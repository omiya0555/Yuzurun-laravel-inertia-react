<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'seller_id',
        'buyer_id',
        'title',
        'description',
        'category',
        'condition',
        'image_urls',
        'transaction_status',
        'latitude',
        'longitude',
        'location_name',
    ];

    // カテゴリーリスト
    const CATEGORIES = [
        '家電',
        '家具',
        '本',
        '衣類',
        'おもちゃ',
        '雑貨',
        'スポーツ用品',
        '食品',
        '美容・健康',
        '自転車',
        '車・バイク用品',
        'アウトドア用品',
        'アクセサリー',
        'ゲーム・ホビー',
        '楽器',
        'ペット用品',
        'キッチン用品',
        '文具・オフィス用品',
    ];

    // 商品状態（コンディション）リスト
    const CONDITIONS = [
        '新品',
        '未使用',
        '未開封',
        '美品',
        '傷あり',
        '動作不良',
        'ジャンク',
    ];


    protected $casts = [
        'image_urls' => 'array',
    ];

    public static function categoryOptions()
    {
        return ['electronics', 'furniture', 'books', 'clothing'];
    }

    public static function conditionOptions()
    {
        return ['new', 'like_new', 'used'];
    }
}