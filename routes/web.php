<?php

use App\Http\Controllers\ChatController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ProductController;

Route::get('/', function () {
    // ログインしている場合は `/home` にリダイレクト
    if (auth()->check()) {
        return redirect()->route('home');
    }
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// ログイン・認証済みのルート
Route::middleware(['auth', 'verified'])->group(function () {
    
    // ホーム画面
    Route::get('/home', function () { 
        return Inertia::render('Home'); 
    })->name('home');

    // プロダクト関連ルート
    Route::prefix('products')->name('products.')->group(function () {
        Route::get('/', [ProductController::class, 'index'])->name('index');  // 一覧表示
        Route::get('/create', [ProductController::class, 'create'])->name('create');  // 作成画面
        Route::post('/', [ProductController::class, 'store'])->name('store');  // 新規登録
        Route::get('/{product}', [ProductController::class, 'show'])->name('show');  // 詳細表示
        Route::get('/{product}/edit', [ProductController::class, 'edit'])->name('edit');  // 編集画面
        Route::put('/{product}/status', [ProductController::class, 'updateStatus'])->name('status');  // ステータス更新処理
        Route::patch('/{product}', [ProductController::class, 'update'])->name('update');  // 更新処理
        Route::delete('/{product}', [ProductController::class, 'destroy'])->name('destroy');  // 削除処理
    });

    // チャット関連ルート
    Route::prefix('chat')->name('chat.')->group(function () {
        Route::get('/', [ChatController::class, 'index'])->name('index');  // チャット一覧
        Route::get('/room/{roomId}', [ChatController::class, 'show'])->name('show');  // チャットルーム
        Route::post('/send-link', [ChatController::class, 'sendChatLink'])->name('chat.sendLink');
    });

    // プロファイル関連ルート
    Route::prefix('profile')->name('profile.')->group(function () {
        Route::get('/', [ProfileController::class, 'edit'])->name('edit');
        Route::patch('/', [ProfileController::class, 'update'])->name('update');
        Route::delete('/', [ProfileController::class, 'destroy'])->name('destroy');
    });
});

// 認証ルートを読み込み
require __DIR__.'/auth.php';
