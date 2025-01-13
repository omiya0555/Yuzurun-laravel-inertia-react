<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;
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

            return Inertia::render('Chat/Room', [
                'roomId'    => $roomId,
                'user_id'   => $userId,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => $e->getMessage()
            ], 500);
        }
    }
}
