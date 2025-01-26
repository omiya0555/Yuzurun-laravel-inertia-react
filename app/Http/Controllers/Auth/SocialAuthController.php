<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;
use App\Models\User;

class SocialAuthController extends Controller
{
    // Google認証
    public function redirectToGoogle()
    {
        return Socialite::driver('google')->redirect();
    }

    public function handleGoogleCallback()
    {
        $googleUser = Socialite::driver('google')->stateless()->user();

        // ユーザーを検索、または新規作成
        $user = User::firstOrCreate(
            ['email' => $googleUser->getEmail()],
            [
                'name'              => $googleUser->getName(),
                'email'             => $googleUser->getEmail(),
                'email_verified_at' => now(),
                'password'          => bcrypt(uniqid()), // ダミーのパスワード
            ]
        );

        Auth::login($user);

        return redirect('/home'); // ログイン後のリダイレクト
    }

    // Slack認証
    public function redirectToSlack()
    {
        return Socialite::driver('slack')->redirect();
    }

    public function handleSlackCallback()
    {
        $slackUser = Socialite::driver('slack')->stateless()->user();

        $user = User::firstOrCreate(
            ['email' => $slackUser->getEmail()],
            [
                'name'              => $slackUser->getName(),
                'email'             => $slackUser->getEmail(),
                'email_verified_at' => now(),
                'password'          => bcrypt(uniqid()),
            ]
        );

        Auth::login($user);

        return redirect('/home');
    }
}
