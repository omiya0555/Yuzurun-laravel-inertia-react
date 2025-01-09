<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 開発操作用ユーザー
        User::create([
            'name'      => 'testuser',
            'email'     => 'test@gmail.com',
            'password'  => Hash::make('testuser'),
        ]);

        // 取引テスト用のユーザー10人
        for ($i = 1; $i <= 10; $i++) {
            User::create([
                'name' => "testuser$i",
                'email' => "testuser$i@gmail.com",
                'password' => Hash::make('testuser'),
            ]);
        };
    }
}
