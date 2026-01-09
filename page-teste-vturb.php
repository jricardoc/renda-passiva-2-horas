<?php
/**
 * Template Name: Teste Vturb Puro
 */
?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Teste Vturb</title>
    <link rel="preload" href="https://scripts.converteai.net/3f99e868-8a2c-4153-b834-85a358ba11f4/players/694f3a3771611df8184f17a9/v4/player.js" as="script">
</head>
<body style="background:#000; padding:40px;">
    <h1 style="color:white; text-align:center;">Teste Vturb via WordPress (sem React)</h1>
    <div style="max-width:800px; margin:0 auto;">
        <vturb-smartplayer id="vid-694f3a3771611df8184f17a9" style="display: block; margin: 0 auto; width: 100%;"></vturb-smartplayer>
        <script type="text/javascript">
            var s = document.createElement("script");
            s.src = "https://scripts.converteai.net/3f99e868-8a2c-4153-b834-85a358ba11f4/players/694f3a3771611df8184f17a9/v4/player.js";
            s.async = true;
            document.head.appendChild(s);
        </script>
    </div>
</body>
</html>
