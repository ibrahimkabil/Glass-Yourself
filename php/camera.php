<?php session_start(); ?>

<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml"  dir="ltr">
    <head>

        <title>Camera and Video Control with HTML5 Example</title>

        <meta name="description" content="Access the desktop camera and video using HTML, JavaScript, and Canvas.  The camera may be controlled using HTML5 and getUserMedia." />

        <!--[if lt IE 9]>
        <script src="/wp-content/themes/jack/js/lib/html5shiv/src/html5shiv.js?{{ themeVersion }}"></script>
        <![endif]-->

        <script src="http://code.jquery.com/jquery-1.10.1.min.js"></script>

        <script src="http://code.jquery.com/jquery-migrate-1.2.1.min.js"></script>

        <style>
            
            #video, #canvas{ -webkit-transform: scale(-1, 1); }
            
        </style>
        
    </head>

    <body>
        <script>
            // Put event listeners into place
            window.addEventListener("DOMContentLoaded", function() {
                // Grab elements, create settings, etc.
                var canvas = document.getElementById("canvas"),
                        context = canvas.getContext("2d"),
                        video = document.getElementById("video"),
                        videoObj = {"video": true},
                errBack = function(error) {
                    console.log("Video capture error: ", error.code);
                };

                // Put video listeners into place
                if (navigator.getUserMedia) { // Standard
                    navigator.getUserMedia(videoObj, function(stream) {
                        video.src = stream;
                        video.play();
                    }, errBack);
                } else if (navigator.webkitGetUserMedia) { // WebKit-prefixed
                    navigator.webkitGetUserMedia(videoObj, function(stream) {
                        video.src = window.webkitURL.createObjectURL(stream);
                        video.play();
                    }, errBack);
                } else if (navigator.mozGetUserMedia) { // WebKit-prefixed
                    navigator.mozGetUserMedia(videoObj, function(stream) {
                        video.src = window.URL.createObjectURL(stream);
                        video.play();
                    }, errBack);
                }

                // Trigger photo take
                document.getElementById("snap").addEventListener("click", function() {
                    context.drawImage(video, 0, 0, 640, 480);
                    $('#canvas').show();
                    $('#snap').hide();
                    $('#try-again').show();
                    $('#good').show();
                });
            }, false);

            function hideCanvas() {
                $('#canvas').hide();
            }

            function prepareCanvas() {
                
                $('#img').val(document.getElementById('canvas').toDataURL());
                
                document.forms.photo_upload.submit();
                
                //parent.document.getElementById('glass-yourself').loadingImage();
            
                //parent.document.getElementById('glass-yourself').sendImage(document.getElementById('canvas').toDataURL())
                
                //console.log(document.getElementById('canvas').toDataURL())
                
                //parent.$.fancybox.close();
            
            }

            function try_again() {
                $('#canvas').hide();
                $('#snap').show();
                $('#try-again').hide();
                $('#good').hide();
            }

        </script>
		<img src='logo.png' style='position:absolute; left:15%; top:5%; z-index:10000;'>

        <form action='upload.php' method='POST' name='photo_upload' enctype="multipart/form-data" target='uploader'>
    <input type="hidden" name="MAX_FILE_SIZE" value="2097152" /> 

            <div id="page">


                <!-- holds content, will be frequently changed -->
                <div id="contentHolder">
                    <video id="video" width="640" height="480" autoplay style='position:absolute; left:0px; top: 0px;' onclick="take_photo();"></video>
                    <input type='hidden' name='img' id='img'>
                        <canvas id="canvas" width="640" height="480" style='position:absolute; left:0px; top: 0px;'></canvas>

                        <a id='snap' style='position:absolute; left:0px; top: 540px;'>Take Photo</a>     

                        <button type='button' id="good" style='position:absolute; left:100px; top: 540px; display:none;' onclick='prepareCanvas();
                return false;'>Looks Good!</button>

                        <a id='try-again' style='position:absolute; left:200px; top: 540px; display:none; ' href='javascript:try_again()'>Take Another</a>     
                </div>
            </div>   
        </form>
                    
                    <iframe name="uploader" id="uploader" height="480" width="640" style='position:absolute; right:0px; top:0px;' src='upload.php'></iframe>
    </body>
</html>




