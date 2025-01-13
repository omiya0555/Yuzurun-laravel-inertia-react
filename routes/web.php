<?php

use App\Http\Controllers\ChatController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\ProductController;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});


Route::middleware(['auth', 'verified'])->group(function () {
    
    Route::get('/home', function () { return Inertia::render('Home'); })->name('home');
    
    Route::get('/products', [ProductController::class, 'index'])->name('products.index');  // 一覧表示
    Route::get('/products/create', [ProductController::class, 'create'])->name('products.create');  // 作成画面
    Route::post('/products', [ProductController::class, 'store'])->name('products.store');  // 新規登録
    Route::get('/products/{product}', [ProductController::class, 'show'])->name('products.show');  // 詳細表示
    Route::get('/products/{product}/edit', [ProductController::class, 'edit'])->name('products.edit');  // 編集画面
    Route::put('/products/{product}/status', [ProductController::class, 'updateStatus'])->name('products.status');  // ステータス更新処理
    Route::patch('/products/{product}', [ProductController::class, 'update'])->name('products.update');  // 更新処理
    Route::delete('/products/{product}', [ProductController::class, 'destroy'])->name('products.destroy');  // 削除処理

    Route::get('/chat', [ChatController::class, 'index'])->name('chat.index');
    Route::get('/chat/room/{roomId}', [ChatController::class, 'show'])->name('chat.show');
    
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
