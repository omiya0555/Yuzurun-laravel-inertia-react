<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>チャットリンク通知</title>
</head>
<body>
    <p>こんにちは！Yuzurunをご利用いただきありがとうございます。</p>
    <p>以下のリンクから{{ $method }}を使って友達追加して連絡を取りましょう！</p>
    <p><a href="{{ $link }}" target="_blank">{{ $link }}</a></p>
</body>
</html>