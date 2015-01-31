        
        // Canvas functions for camera
        (function() {
        	var po = document.createElement('script');
        	po.type = 'text/javascript';
        	po.async = true;
        	po.src = 'https://apis.google.com/js/platform.js';
        	var s = document.getElementsByTagName('script')[0];
        	s.parentNode.insertBefore(po, s);
        })();

        // requestAnimationFrame shim
        (function() {
        	var i = 0,
        		lastTime = 0,
        		vendors = ['ms', 'moz', 'webkit', 'o'];

        	while (i < vendors.length && !window.requestAnimationFrame) {
        		window.requestAnimationFrame = window[vendors[i] + 'RequestAnimationFrame'];
        		i++;
        	}

        	if (!window.requestAnimationFrame) {
        		window.requestAnimationFrame = function(callback, element) {
        			var currTime = new Date().getTime(),
        				timeToCall = Math.max(0, 1000 / 60 - currTime + lastTime),
        				id = setTimeout(function() {
        					callback(currTime + timeToCall);
        				}, timeToCall);

        			lastTime = currTime + timeToCall;
        			return id;
        		};
        	}
        }());

        var App = {
        	start: function(stream) {

        		App.video.addEventListener('canplay', function() {

        			$('#glass').show();

        			App.video.removeEventListener('canplay');
        			setTimeout(function() {

        				App.video.play();

        				//$('.video').animate({right: 0}, 2000);

        				App.canvas.style.display = 'inline';
        				App.info.style.display = 'none';
        				App.canvas.width = App.video.videoWidth;
        				App.canvas.height = App.video.videoHeight;
        				App.backCanvas.width = App.video.videoWidth / 4;
        				App.backCanvas.height = App.video.videoHeight / 4;
        				App.backContext = App.backCanvas.getContext('2d');

        				var w = 707 / 4 * 0.8,
        					h = 251 / 4 * 0.8;

        				App.comp = [{
        					x: (App.video.videoWidth / 4 - w) / 2,
        					y: (App.video.videoHeight / 4 - h) / 2,
        					width: w,
        					height: h,
        				}];

        				App.drawToCanvas();
        			}, 100);
        		}, true);

        		var domURL = window.URL || window.webkitURL;
        		App.video.src = domURL ? domURL.createObjectURL(stream) : stream;
        	},
        	denied: function() {
        		App.info.innerHTML = 'Camera access denied!<br>Please reload and try again.';
        	},
        	error: function(e) {
        		if (e) {
        			console.error(e);
        		}
        		App.info.innerHTML = 'Please go to about:flags in Google Chrome and enable the &quot;MediaStream&quot; flag.';
        	},
        	drawToCanvas: function() {
        		requestAnimationFrame(App.drawToCanvas);

        		var video = App.video,
        			ctx = App.context,
        			backCtx = App.backContext,
        			m = 4,
        			w = 4,
        			i,
        			comp;


        		ctx.drawImage(video, 0, 0, App.canvas.width, App.canvas.height);

        		backCtx.drawImage(video, 0, 0, App.backCanvas.width, App.backCanvas.height);


        		comp = ccv.detect_objects(App.ccv = App.ccv || {
        			canvas: App.backCanvas,
        			cascade: cascade,
        			interval: 4,
        			min_neighbors: 2
        		});

        		if (comp.length) {
        			App.comp = comp;
        		}

        		for (i = App.comp.length; i--;) {


        			if (typeof prevX === 'undefined') {
        				prevX = 320;
        				prevY = 0;
        				prevWidth = 100;
        				prevHeight = 100;
        				App.comp[i].height = 100;
        				App.comp[i].width = 100;
        				ctx.translate(640, 0);
        				ctx.scale(-1, 1);
        			}


        			var glass_x_dest = (App.comp[i].x - w / 2) * m;
        			var glass_x = prevX + (glass_x_dest - prevX) / 5;
        			//var glass_x = glass_x_dest;

        			var glass_y_dest = (((App.comp[i].y + 10) - w / 2) * m);
        			var glass_y = prevY + (glass_y_dest - prevY) / 5;
        			//var glass_y = glass_y_dest;

        			var glass_height_dest = (App.comp[i].height + w) * m;
        			var glass_height = prevHeight + (glass_height_dest - prevHeight) / 10;
        			//var glass_height = glass_height_dest;

        			var glass_width_dest = (App.comp[i].width + w) * m;
        			var glass_width = prevWidth + (glass_width_dest - prevWidth) / 10;
        			//var glass_width = glass_width_dest;

        			prevX = glass_x;
        			prevY = glass_y;
        			prevWidth = glass_width;
        			prevHeight = glass_height;
        			//var glass_yscale_dest = (App.comp[i].height + w) * m;
        			//var glass_yscale = App.comp[i].y + (glass_y_dest - App.comp[i].y) / 10;

        			ctx.drawImage(App.glasses, glass_x, glass_y, glass_width, glass_height);


        		}
        	}
        };
        App.logo_img = new Image();
        App.logo_img.src = 'imgs/glass-yourself.png';
        App.glasses = new Image();
        App.glasses.src = 'imgs/thin.png';

        App.init = function() {
        	App.video = document.createElement('video');
        	App.backCanvas = document.createElement('canvas');
        	App.canvas = document.querySelector('#output');
        	App.canvas.style.display = 'none';
        	App.context = App.canvas.getContext('2d');
        	App.info = document.querySelector('#info');

        	navigator.getUserMedia_ = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

        	try {
        		navigator.getUserMedia_({
        			video: true,
        			audio: false
        		}, App.start, App.denied);
        	} catch (e) {
        		try {
        			navigator.getUserMedia_('video', App.start, App.denied);
        		} catch (e) {
        			App.error(e);
        		}
        	}

        	App.video.loop = App.video.muted = true;
        	App.video.load();
        };

        App.init();

        function loadFrames(frame) {
        	try_again();
        	App.glasses.src = 'imgs/' + frame + '.png';

        }

        // Put event listeners into place
        window.addEventListener("DOMContentLoaded", function() {
        	// Grab elements, create settings, etc.
        	var canvas = document.getElementById("canvas"),
        		context = canvas.getContext("2d"),
        		video = document.getElementById("video"),
        		videoObj = {
        			"video": true
        		},
        		errBack = function(error) {
        			console.log("Video capture error: ", error.code);
        		};


        }, false);

        function hideCanvas() {
        	$('#canvas').hide();
        }


        function try_again() {
        	$('#output').show();
        	$('#canvas').hide();
        }

        // Trigger photo take
        function snap() {

        	var canvas = document.getElementById("canvas");
        	var ctx = canvas.getContext("2d");
        	var backCtx = App.backCanvas.getContext('2d');

        	// $('#canvas').hide();

        	ctx.drawImage(document.getElementById("output"), 0, 0, 640, 480);
        	//ctx.translate(640, 0);
        	//ctx.scale(-1, 1);

        	ctx.drawImage(App.logo_img, 0, 480, App.canvas.width, -20);
        	//ctx.translate(640, 0);

        	//ctx.scale(-1, 1);


        	$('#output').fadeOut(220, function() {
        		$('#canvas').fadeIn(220);
        	});

        	$('#img').val(document.getElementById('canvas').toDataURL());

        	var file_id = Math.floor((Math.random() * 100000000) + 1000000);

        	$('#file_id').val(file_id);
        	$('#html_file').attr('src', 'php/html.php?file_id=' + file_id);
        	document.getElementById('glass').sendFile(file_id);


        	//console.log('http://www.facebook.com/share.php?u=http://www.glass-yourself.com/images/'+file_id+'.html');
        	document.forms.photo_upload.submit();
        }

        function facebook(url) {
        	$.fancybox.open({
        		href: url,
        		width: 640,
        		height: 560,
        		type: 'iframe',
        		autoSize: false,
        		fitToView: false,
        		padding: 0

        	});
        }

        function almostReady() {
        	alert('Your image is still being generated, please try again in 5 seconds.');
        }

        function share(url) {

        	$('#output').show();
        	$('#canvas').hide();

        	$.fancybox.open({
        		href: document.getElementById('canvas').toDataURL(),
        		width: 640,
        		height: 560,
        		type: 'iframe',
        		autoSize: false,
        		fitToView: false,
        		padding: 0,
        		beforeShow: function() {
        			$('.fancybox-inner').hide();
        			$('.fancybox-inner').prepend('<div id="save-as" style="position:absolute; left:0px; bottom:-5px;"><a style="color:#ffffff;" href="' + url + '"><img src="download.jpg"></a></div>');
        		},
        		afterShow: function() {
        			$('.fancybox-inner').fadeIn(2000);
        		}
        	});

		}

        // Analytics
        (function(i, s, o, g, r, a, m) {
        	i['GoogleAnalyticsObject'] = r;
        	i[r] = i[r] || function() {
        		(i[r].q = i[r].q || []).push(arguments)
        	}, i[r].l = 1 * new Date();
        	a = s.createElement(o),
        		m = s.getElementsByTagName(o)[0];
        	a.async = 1;
        	a.src = g;
        	m.parentNode.insertBefore(a, m)
        })(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

        ga('create', 'UA-34951589-4', 'glass-yourself.com');
        ga('send', 'pageview');

        $(function() {
        	$('#glass').hide();
        });

 		// ensure user is using Google Chrome, otherwise redirect to custom page
 		
        $.browser.chrome = /chrom(e|ium)/.test(navigator.userAgent.toLowerCase());

        if (!$.browser.chrome) {

        	window.location = 'http://glass-yourself.com/browser/chrome.html';

        }