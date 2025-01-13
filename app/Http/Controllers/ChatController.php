<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use App\Mail\SendChatLink;
use Inertia\Inertia;
use Illuminate\Http\Request;

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

            return Inertia::render('Chat/Room', [
                'roomId'    => $roomId,
                'user_id'   => $userId,
                'user_name' => $userName,
            ]);
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
