<? 
        $dirname="";  
 		$f = '.';
    	$io = popen ( '/usr/bin/du -sk ' . $f, 'r' );
    	$size = fgets ( $io, 4096);
    	$size = substr ( $size, 0, strpos ( $size, "\t" ) );
    	pclose ( $io );
    

    function mtimecmp($b, $a) {
        $mt_a = filemtime($a);
        $mt_b = filemtime($b);

        if ($mt_a == $mt_b)
            return 0;
        else if ($mt_a < $mt_b)
            return -1;
        else
            return 1;
    }
    
    $images = glob($dirname."*.png");

    usort($images, "mtimecmp");
    array_reverse($images);

		$total_imgs = 0;
		$imgs = '';
        foreach($images as $image) {
        	$total_imgs++;
            $imgs .= '<img height=150 style="float:left;" src="'.$image.'" />';
        } 
        
        echo  '<h2 style="font-family:Arial; font-weight:lighter;">'.$total_imgs.' Images ('.number_format($size/1024).'MB)</h2>';
		echo $imgs;
        
        
    ?>