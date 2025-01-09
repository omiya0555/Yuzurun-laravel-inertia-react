<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // カテゴリーリスト
        $categories = [
            '家電', '家具', '本', '衣類', 'おもちゃ', '雑貨', 'スポーツ用品', '食品',
            '美容・健康', '自転車', '車・バイク用品', 'アウトドア用品', 'アクセサリー',
            'ゲーム・ホビー', '楽器', 'ペット用品', 'キッチン用品', '文具・オフィス用品'
        ];

        // 商品状態（コンディション）リスト
        $conditions = ['新品', '未使用', '未開封', '美品', '傷あり', '動作不良', 'ジャンク'];

        // 商品のタイトルと説明の組み合わせパターン
        $productPatterns = [
            ['title' => '最新モデルの掃除機', 'description' => '吸引力が抜群で軽量な最新モデルの掃除機です。'],
            ['title' => '大容量の食器棚', 'description' => 'たっぷり収納できる木製の食器棚です。'],
            ['title' => '小説セット（ベストセラー）', 'description' => '話題のベストセラー小説がセットになっています。'],
            ['title' => '冬用ダウンジャケット', 'description' => '保温性に優れた高品質ダウンジャケットです。'],
            ['title' => '木製ブロックのおもちゃ', 'description' => '創造力を育む木製の積み木セットです。'],
            ['title' => 'ヴィンテージ風ランプ', 'description' => 'レトロなデザインのヴィンテージランプです。'],
            ['title' => 'スポーツ用サングラス', 'description' => '屋外活動に最適なUVカット機能付きサングラスです。'],
            ['title' => '健康志向のプロテインバー', 'description' => '美味しくて健康的なプロテインバーです。'],
            ['title' => 'エクササイズバイク', 'description' => '家庭用のエクササイズバイクで快適にトレーニング。'],
            ['title' => '折りたたみ自転車', 'description' => 'コンパクトに収納できる折りたたみ式自転車です。'],
            ['title' => 'カー用シートカバー', 'description' => '耐久性の高いカーシートカバーです。'],
            ['title' => 'キャンプ用テント', 'description' => '耐水性に優れたキャンプ用テントです。'],
            ['title' => 'シルバーリング', 'description' => 'シンプルでおしゃれなシルバーリングです。'],
            ['title' => '家庭用ゲーム機', 'description' => '人気の家庭用ゲーム機とコントローラーのセットです。'],
            ['title' => '電子ピアノ', 'description' => '初心者に最適な電子ピアノです。'],
            ['title' => 'ペット用キャリーバッグ', 'description' => '移動に便利なペット用キャリーバッグです。'],
            ['title' => '圧力鍋', 'description' => '短時間で調理が可能な高性能圧力鍋です。'],
            ['title' => '高級筆記用具セット', 'description' => 'ギフトにも最適な高級ペンセットです。'],
        ];

        // 各seller_idごとに8件ずつ生成
        $counter = 0;
        for ($sellerId = 1; $sellerId <= 5; $sellerId++) {
            for ($i = 0; $i < 8; $i++) {
                $status = $i < 4 ? 0 : ($i < 6 ? 1 : 2); // 0 = 出品中, 1 = 約束中, 2 = 取引完了
                $buyerId = null;
                if ($status > 0) {
                    $buyerId = rand(1, 5);
                    while ($buyerId === $sellerId) {
                        $buyerId = rand(1, 5);
                    }
                }

                // 商品パターンを順番に割り当て
                $pattern = $productPatterns[$counter % count($productPatterns)];
                $category = $categories[$counter % count($categories)];
                $condition = $conditions[$counter % count($conditions)];

                Product::create([
                    'seller_id' => $sellerId,
                    'buyer_id' => $buyerId,
                    'title' => $pattern['title'],
                    'description' => $pattern['description'],
                    'category' => $category,
                    'condition' => $condition,
                    'image_urls' => json_encode([
                        'https://example.com/images/sample1.jpg',
                        'https://example.com/images/sample2.jpg',
                    ]),
                    'transaction_status' => $status,
                    'latitude' => 35.6895 + (rand(-100, 100) / 10000),
                    'longitude' => 139.6917 + (rand(-100, 100) / 10000),
                    'location_name' => "受け渡し場所 - {$sellerId}",
                ]);

                $counter++;
            }
        }
    }
}
