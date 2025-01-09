<?php

namespace App\Http\Controllers\Product;

use App\Http\Controllers\Controller;
use App\Enums\TransactionStatus;
use Illuminate\Http\Request;
use App\Models\Product;
use Inertia\Inertia;

class IndexController extends Controller
{
    public function __invoke(Request $request)
    {
        try{
            // 出品中、予約中の商品一覧を新しい順で取得
            // 出品者により予約中ステータスが出品中に変更される可能性もあるので、予約中の商品も表示
            $products = Product::where('transaction_status',
            TransactionStatus::PENDING->value, TransactionStatus::BOOKING->value)
            ->with('seller', 'buyer')
            ->orderBy('created_at', 'desc')
            ->paginate(20);

            return inertia::render('Product/Index', [
                'products' => $products,
            ]);
        }catch(\Exception $e){
            return back()->withError($e->getMessage());
        }
    }
}
