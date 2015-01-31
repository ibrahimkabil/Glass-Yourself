<?php
       
    $file = '../images/'. $_GET['file_id'].'.png';
    
    $html_file = '../images/'.$_GET['file_id'].'.html';
    
    $placeholder = '../images/placeholder.png';

    copy($placeholder, $file);
    
    // Open the file to get existing content
    $current = file_get_contents($html_file);

    // Append a new person to the file
    $current = '<!DOCTYPE html><html lang="en"><head><meta name="description" content="Make your own now at Glass-Yourself.com" /><meta property="og:title" content="Glass Yourself:       Test-drive the new Google Glass frames" />
    <meta property="og:description" content="Make your own now at Glass-Yourself.com" /><meta property="og:image" content="http://www.glass-yourself.com/'.$file.'" /><body><center><a href="http://www.glass-yourself.com/"><img src="http://www.glass-yourself.com/'.$file.'" border=0></a></center></body></html>';

    // Write the contents back to the file
    file_put_contents($html_file, $current);
    
    echo "<script> console.log('File Ready: http://www.glass-yourself.com/" . $html_file . "'); </script>";

?>
