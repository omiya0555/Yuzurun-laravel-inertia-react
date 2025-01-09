<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->foreignId('seller_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('buyer_id')->nullable()->constrained('users')->nullOnDelete();
            $table->string('title');
            $table->string('description', 300)->nullable();
            $table->string('category');     // モデル内ENUM定義予定
            $table->string('condition');    // モデル内ENUM定義予定
            $table->json('image_urls');
            $table->tinyInteger('transaction_status');      // ENUM対応クラスで状態を管理
            $table->decimal('latitude', 10, 7)->nullable();     // 緯度
            $table->decimal('longitude', 10, 7)->nullable();    // 経度
            $table->string('location_name')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
