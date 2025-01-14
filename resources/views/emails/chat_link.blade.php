<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>チャットリンク通知</title>
</head>
<body>

    <h1 styles="display:flex; justify-content:center;">Yuzurun</h1>
    <hr styles="margin-y:24px;" />
    <h3>{{ $method }}チャットリンクのご案内</h3>
    <p>こんにちは！Yuzurunをご利用いただきありがとうございます。</p>
    <p>以下のリンクから{{ $method }}を使って友達追加して連絡を取りましょう！</p>
    <p><a href="{{ $link }}" target="_blank">{{ $link }}</a></p>
    <hr styles="margin-y:24px;" />
    <p>以下のテンプレートをコピーペーストして活用すると取引がスムーズです。
    <p>【こんにちは。〇〇です。「〇〇」を〇日の〇時に職場で受け取りたいです。】</p>

</body>
</html>