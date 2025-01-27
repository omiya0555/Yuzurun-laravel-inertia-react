<?php

namespace App\Http\Controllers;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use App\Mail\SendChatLink;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\Product;

class ChatController extends Controller
{

    /**
     * display chat room
     * @return \Inertia\Response
     */
    public function index()
    {
        try{
            $userId     = Auth::id();
            $userName   = Auth::user()->name;
    
            return Inertia::render('Chat/Index', [
                'user_id'   => $userId,
                'user_name' => $userName,
            ]);

        }catch(\Exception $e){
            return response()->json([
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * display chat room after validation
     * @param int $roomId
     * @return \Inertia\Response
     */
    public function show($roomId)
    {
        try {
            $userId     = Auth::id();
            $userName   = Auth::user()->name;
            
            // roomId のフォーマットを解析（例: 商品ID_購入者ID）
            list($productId, $buyerId) = explode('_', $roomId);

            // 商品情報を取得
            $product = Product::findOrFail($productId);
            
            // 出品者か購入者か確認
            if ($product->seller_id !== $userId && $buyerId !== (string) $userId) {
                // ユーザーが出品者でも購入者でもない場合は403エラー
                return response()->json([
                    'message' => 'ルームを開く権限がありません。'
                ], 403);
            }

            return Inertia::render('Chat/Room', [
                'roomId'    => $roomId,
                'user_id'   => $userId,
                'user_name' => $userName,
            ]);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'message' => 'チャットルームが見つかりませんでした。'
            ], 404);

        } catch (\Exception $e) {
            return response()->json([
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function sendChatLink(Request $request)
    {
        $validated = $request->validate([
            'email' => 'required|email',
            'method' => 'required|string',
        ]);
        try {
            $link = match ($validated['method']) {
                'line'      => env('LINE_ME'),
                'signal'    => env('SIGNAL_ME'),
                default     => '#'
            };
            
            Mail::to($validated['email'])->send(new SendChatLink($link, ucfirst($validated['method'])));
            
            return redirect()->back()->with('success', 'メールを送信しました！');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'メール送信に失敗しました。');
        }
    }
}
