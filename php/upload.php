<?php

if($_SERVER['REQUEST_METHOD'] === 'POST'){
    
    define('UPLOAD_DIR', '../images/');
    
    $file = UPLOAD_DIR . $_POST['file_id'].'.png';
    
    $img = $_POST['img'];

    $img = str_replace('data:image/png;base64,', '', $img);

    $img = str_replace(' ', '+', $img);

    $data = base64_decode($img);

    $im = imagecreatefromstring($data);

    $success = imagejpeg($im, $file, 90);

?>

<script> console.log('uploaded'); parent.document.getElementById('glass').sendReady(<?php echo $_POST['file_id']; ?>); parent.document.getElementById('glass').saveSuccess();</script>

<?php } ?>