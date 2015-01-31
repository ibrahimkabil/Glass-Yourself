<html>
    <head>

        <script src="http://code.jquery.com/jquery-1.10.1.min.js"></script>
        <script src="http://code.jquery.com/jquery-migrate-1.2.1.min.js"></script>

        <script>

            $(document).ready(function() {



            });

        </script>
        <style>

            body{ font-family: 'Arial'; background-color:#FFFFFF; margin:0px; overflow:hidden; }
            h2,h3{margin:0px;}
            
        </style>
    </head>

    <body>
        
        <?php 
        
        
                function get_tiny_url($url)  {  
                                $ch = curl_init();  
                                $timeout = 5;  
                                curl_setopt($ch,CURLOPT_URL,'http://tinyurl.com/api-create.php?url='.$url);  
                                curl_setopt($ch,CURLOPT_RETURNTRANSFER,1);  
                                curl_setopt($ch,CURLOPT_CONNECTTIMEOUT,$timeout);  
                                $data = curl_exec($ch);  
                                curl_close($ch);  
                                return $data;  
                        }

                        //test it out!
                        $tiny_url = get_tiny_url('http://www.gpop-server.com/glass-yourself/'.$_GET['img']);

                        
                        
                        
        ?><center>
        <img src='<?php echo $tiny_url; ?>' style='margin-left:-15px;'></a><br clear='all'>
        <br><h3>Share this:</h3>
        
           <h2><a href='<?php echo $tiny_url; ?>' target='_blank'><?php echo $tiny_url; ?></a></h2>
    </center>
    </body>

</html>