<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class SendChatLink extends Mailable
{
    use Queueable, SerializesModels;

    public $link;
    public $method;

    /**
     * Create a new message instance.
     */
    public function __construct($link, $method)
    {
        $this->link = $link;
        $this->method = $method;
    }

    /**
     * Build the message.
     */
    public function build()
    {
        return $this->subject("【Yuzurun】{$this->method} チャットリンク")
                    ->view('emails.chat_link')
                    ->with(['link' => $this->link, 'method' => $this->method]);
    }
}