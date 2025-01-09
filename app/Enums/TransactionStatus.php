<?php

namespace App\Enums;

enum TransactionStatus: int
{
    case PENDING    = 0;       // 出品中
    case BOOKING    = 1;       // 予約中
    case COMPLETED  = 2;       // 取引完了

    /**
     * ステータスのラベルを取得
     */
    public function label(): string
    {
        return match ($this) {
            self::PENDING   => '出品中',
            self::BOOKING   => '予約中',
            self::COMPLETED => '取引完了',
        };
    }

    /**
     * ステータス変更に伴うメッセージ
     */
    public function message(): string
    {
        return match ($this) {
            self::PENDING   => '商品を出品しました。',
            self::BOOKING   => '商品が予約されました。チャットルームへ移動して取引を進めましょう！',
            self::COMPLETED => '取引が完了しました。ありがとうございました！',    
       };
    }
}