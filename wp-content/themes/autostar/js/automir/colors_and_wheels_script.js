$(document).ready(function(){
	
	// ���������� iPad
	var isiPad = navigator.userAgent.match(/iPad/i) != null;
	
	// ���������� IE
	var IEFlag = false;
	if($.browser.msie && ($.browser.version == "8.0" || $.browser.version == "7.0" || $.browser.version == "6.0"))
		IEFlag = true;
	
	var IE9Flag = false;
	if($.browser.msie && $.browser.version == "9.0")
		IE9Flag = true;
	
	/* ������� ��������� */
	if(IEFlag == true)
		var dockOpts = {
			easingIn: "linear", 
			easingOut: "linear",
			time: 200
		};
	else
		var dockOpts = {
			easingIn: "swing", 
			easingOut: "swing",
			time: 200
		};
	
	/* ������������� ������ ������� */
	$("#slider_container").css("width", $("#slider_container .link").length*75+20+2+5 + "px"); 
	
	/* ������� ��������/������ */
	/*if(IEFlag == false) {
		$("#slider").hover(function(){
			$(".arrow").stop(true, true).fadeOut(dockOpts['time'], function(){
				$(".arrow").css("display", "none");
				$(".arrow").css("opacity", "0");
			});
		},function(){
			$(".arrow").stop(true, true).fadeIn(dockOpts['time'], function(){
				$(".arrow").css("display", "block");
				$(".arrow").css("opacity", "1");
			});
		})
	} else {
		$("#slider").hover(function(){
			$(".arrow").css("display", "none");
		},function(){
			$(".arrow").css("display", "block");
		})
	}*/
	
	/* ���� ��� IE */
	if(IEFlag == true)
		$("#slider_container .ieshadow a").css("behavior", "url('../js/PIE/PIE.htc')");
	
	/* ������� �������� � ����������� �������� */
	var margin = 0;
	var margin_base = 2;
	var SlideNow = false;
	
	setInterval(function(){
		if(SlideNow == true) {
			SlideNow = false;
			$("#slider_container").stop(true, true).animate({
				marginLeft:margin_base + "px"
			}, 200);
		}
	}, 500);
	
	/*$("#slider").hover(function(){
		SlideNow = false;
	},function(){
		SlideNow = true;
	})*/
	
	/* ��������� ����� */
	$("a.left").click(function(){
		var src = $(this).attr("href");
		
		var color_image = $('#colors img').index($('#colors img.active'));
		var wheel_image = $('#wheels img').index($('#wheels img.active'));
		
		color_image_new = color_image - 1;
		wheel_image_new = wheel_image - 1;		
		
		$('#colors img').eq(color_image_new).css("z-index", 0);
		$('#wheels img').eq(color_image_new).css("z-index", 1);
		$('#colors img').eq(color_image_new).addClass('active');
		$('#wheels img').eq(color_image_new).addClass('active');		
		
		$('#colors img').eq(color_image).removeClass('active');
		$('#wheels img').eq(color_image).removeClass('active');

		$('#colors img').eq(color_image_new).removeAttr('z-index');
		$('#wheels img').eq(color_image_new).removeAttr('z-index');	
		
		var carrent_dragger_left_position = parseInt($("div.x-slider-thumb").css("left"));
		if (color_image_new == -1)
		{
			if (left_pos < 0) var left_end = parseInt(slider_container) - parseInt(drag_container) + left_pos
			else var left_end = parseInt(slider_container) - parseInt(drag_container) - left_pos;
			
			$("div.x-slider-thumb").css('left', left_end);
		}
		else
		{
			var carrent_dragger_left_position = parseInt($("div.x-slider-thumb").css("left"));
			var left_pos_new = carrent_dragger_left_position - car_slider_step;
			
			if (left_end < left_pos_new) left_pos_new = left_end;
			
			$("div.x-slider-thumb").css('left', (carrent_dragger_left_position - car_slider_step) + "px");
		};		
		
		return false;	
	});
	
	$("a.right").click(function(){
	
		var src = $(this).attr("href");
		
		var color_image = $('#colors img').index($('#colors img.active'));
		var wheel_image = $('#wheels img').index($('#wheels img.active'));	
		
		var color_count = $('#colors img').length;
		var wheel_count = $('#wheels img').length;
		
		color_image_new = color_image + 1;
		wheel_image_new = wheel_image + 1;
		
		if (color_image_new == color_count) color_image_new = 0;
		if (wheel_image_new == wheel_count) wheel_image_new = 0;
		
		$('#colors img').eq(color_image_new).css("z-index", 0);
		$('#wheels img').eq(color_image_new).css("z-index", 1);
		$('#colors img').eq(color_image_new).addClass('active');
		$('#wheels img').eq(color_image_new).addClass('active');		
		
		$('#colors img').eq(color_image).removeClass('active');
		$('#wheels img').eq(color_image).removeClass('active');

		$('#colors img').eq(color_image_new).removeAttr('z-index');
		$('#wheels img').eq(color_image_new).removeAttr('z-index');

		if (color_image_new == 0)
		{
			$("div.x-slider-thumb").css('left', left_pos);
		}
		else
		{
			var carrent_dragger_left_position = parseInt($("div.x-slider-thumb").css("left"));
			var left_pos_new = carrent_dragger_left_position + car_slider_step;
			
			var left_end = parseInt(slider_container) - parseInt(drag_container) + left_pos;
			
			if (left_end < left_pos_new ) left_pos_new = left_end;
			
			$("div.x-slider-thumb").css('left', left_pos_new + "px");
		};
		
		//$('#colors img').eq(color_image).addClass('active');
		//$('#wheels img').eq(color_image).addClass('active');
		
		//showPopupOnly('reference');
		//AjaxRequest.send(null, '/action/gallery/gallery/' , '', true, {'href': src});		
		return false;
	});
	
	/*** car slider ***/
	$('div.x-slider-thumb').draggable({ 
		axis: "x",  containment: "div#car_slider",
		start: function() {
			updateBigPhoto( );
		},
		drag: function() {
			updateBigPhoto( );
		},
		stop: function() {
			updateBigPhoto( );
		}		
	});
	
	function updateBigPhoto()
	{
	
		var carrent_dragger_left_position = parseInt($("div.x-slider-thumb").css("left"));
		
		if (left_pos < 0) carrent_dragger_left_position += left_pos;
		if (left_pos > 0) carrent_dragger_left_position -= left_pos;
		
		var large_photo_number = parseInt(carrent_dragger_left_position / car_slider_step);
		
		var color_image = $('#colors img').index($('#colors img.active'));
		var wheel_image = $('#wheels img').index($('#wheels img.active'));	
		
		if (color_image != large_photo_number)
		{
		
			//var large_photo_number_change = large_photos_count - large_photo_number;
		
			$('#colors img').eq(large_photo_number).css("z-index", 1).addClass('active');
			$('#wheels img').eq(large_photo_number).css("z-index", 1).addClass('active');	
			
			$('#colors img').eq(color_image).removeClass('active');
			$('#wheels img').eq(color_image).removeClass('active');
			
			$('#colors img').eq(large_photo_number).removeAttr('z-index');
			$('#wheels img').eq(large_photo_number).removeAttr('z-index');
		};
	
	};
	
	function changeBigPhoto()
	{
	
		if (PlayStop == 0) return;
	
		/*var carrent_dragger_left_position = parseInt($("div.x-slider-thumb").css("left"));
		
		if (left_pos < 0) carrent_dragger_left_position += left_pos;
		if (left_pos > 0) carrent_dragger_left_position -= left_pos;
		
		var large_photo_number = parseInt(carrent_dragger_left_position / car_slider_step);
		
		var color_image = $('#colors img').index($('#colors img.active'));*/
		
		$("a.right").trigger("click");
		setTimeout(function(){ changeBigPhoto() },ChangeTime);
	
	};	

	//play/pause
	
	$('a.playPause').click(function(){
		
		//���� ������ �����
		if ($(this).hasClass('isPlaying') == true)
		{
			PlayStop = 0;
			$(this).removeClass('isPlaying');
		}
		else
		{
			PlayStop = 1;
			$(this).addClass('isPlaying');
			changeBigPhoto();
		};
	});
	
	$('div.x-slider-thumb').change(function(){
		alert('slider changed left');
	});

	var slider_container = $("div#car_slider").width();
	var drag_container = $("div.x-slider-thumb").width();
	var left_pos = parseInt($("div.x-slider-thumb").css("left"));
	var dragger_width = parseInt(slider_container) - parseInt(drag_container) - parseInt($("div.x-slider-thumb").css("left"));
	
	var large_photos_count = $('#colors img').length;
	var car_slider_step = parseInt( slider_container / large_photos_count );
	
	//�������
	var PlayStop;
	var ChangeTime = 500;	
	
	/* ����������� ������� �������� �� ����� �� �������� � �������� */
	$("#colors_preview a").click(function(){
		
		var position = 0;
		var count = 0;
		
		if($(this).parent().parent().hasClass("selected") != true) {
		
			var image_number = $('#colors img').index($('#colors img.active'));
			
			$('#colors_preview div.selected').removeClass("selected");
			$(this).parent().parent().addClass("selected");
			$(this).css("width", "84px");
			
			$("#colors").hide();
			$("#wheels").hide();
			$("#colors_preview").hide();
			$("#wheels_preview").hide();
			$("a.left").hide();
			$("a.right").hide();
			$("#preloader").stop(true, true).fadeIn(100);
			
			var src = $(this).attr("href");
			src = src.substring(9);
			
			AjaxRequest.send(null, '/action/colors/change_photos/' , '', true, {'number': src, 'image_number': image_number});
			
			return false;		
		}
		
		return false;
	})
	
	/* ����������� ������� �������� �� ����� �� �������� � �������� */
	$("#wheels_preview a").click(function(){
		
		var position = 0;
		var count = 0;
		
		if($(this).parent().parent().hasClass("selected") != true) {
		
			var image_number = $('#wheels img').index($('#wheels img.active'));
			
			$('#wheels_preview div.selected').removeClass("selected");
			$(this).parent().parent().addClass("selected");
			$(this).css("width", "84px");			
			
			$("#colors").hide();
			$("#wheels").hide();
			$("#colors_preview").hide();
			$("#wheels_preview").hide();
			$("a.left").hide();
			$("a.right").hide();
			$("#preloader").stop(true, true).fadeIn(100);
			
			var src = $(this).attr("href");
			src = src.substring(9);
			
			AjaxRequest.send(null, '/action/wheels/change_photos/' , '', true, {'number': src, 'image_number': image_number});
			
			return false;		
		}
		
		return false;
	})	
	
	/* ����� ���� */
	$("#colors_preview").dockSlider(dockOpts);
	$("#wheels_preview").dockSlider(dockOpts);
	
	/* --- ������� ���� --- */
	var timer = false;
	var width = $("#slider_container").width()-5;
	var window = 770;
	var margin = 0;
	
	var SlTimer = false;
	
	$(".slide").hover(function(){
		if($(this).hasClass("prev")) {
			timer = setInterval(function(){
				margin = parseInt($("#slider_container").css("margin-left").split("px").join(""));
				if(margin < 0) {
					margin = margin+5;
					$("#slider_container").css("margin-left", margin + "px");
				}
				else
					clearTimeout(timer);
			}, 10);
		}
		if($(this).hasClass("next")) {
			timer = setInterval(function(){
				margin = parseInt($("#slider_container").css("margin-left").split("px").join(""));
				if(margin > window-width) {
					margin = margin-5;
					$("#slider_container").css("margin-left", margin + "px");
				}
				else
					clearTimeout(timer);
			}, 10);
		}
	}, function(){
		clearTimeout(timer);
		SlTimer = setTimeout(ReturnPosition, 500);
	})
	
	function ReturnPosition() {
		SlideNow = true;
	}
	
	$("#slider_container a").mouseover(function(){
		clearTimeout(SlTimer);
	})
	
	var blockFlag = false; // ����� ���������� ��������
	
	/* ������� �������� */
	$("a.arrow").click(function(){
		if(blockFlag == false && $(this).hasClass("left_unactive") == false && $(this).hasClass("right_unactive") == false) {
			blockFlag = true;
			var count = 0;
			var position = 0;
			var src = "";
			var title = "";
			var text = "";
			var txtClass = "";
			var col = $("#slider_container .link");
									
			$("#slider_container .link").each(function(){
				if($(this).hasClass("selected") == true)
					position = count;
				count++;
			})
			
			if($(this).hasClass("left")) { // �����
				if(position > 0) {
					
					$(".right_unactive").addClass("right").removeClass("right_unactive");
					
					$("#large_image h1").html("");
					$("#large_image h3").html("");
					$(col[position]).removeClass("selected");
					$(col[position]).stop().animate({
						width:"70px"
					}, dockOpts['time'], dockOpts['easingOut']);
					
					$(col[position]).find("a").clearQueue().animate({
						height:"30px"
					}, dockOpts['time'], dockOpts['easingOut']);
					
					$(col[position]).find(".label").clearQueue().animate({
						bottom:"40px"
					}, dockOpts['time']);
					
					$(col[position-1]).addClass("selected");
					
					$(col[position-1]).clearQueue().animate({
						width:"90px"
					}, dockOpts['time'], dockOpts['easingIn']);
					
					$(col[position-1]).find(".label").clearQueue().animate({
						bottom:"50px"
					}, dockOpts['time']);
					
					$(col[position-1]).find("a").clearQueue().animate({
						height:"40px"
					}, dockOpts['time'], dockOpts['easingOut'], function(){
						
						var posLeft = (position-1)*75;
						var margLeft = parseInt($("#slider_container").css("margin-left").split("px").join(""));
						var raz = posLeft + margLeft;
						
						if(raz <= -2) {
							posLeft = (posLeft - 2)*(-1);
							margin_base = posLeft;
							var str = posLeft + "px";
							$("#slider_container").stop(true, true).animate({
								marginLeft:str 
							}, 200);
						}
					});
									
				//	src = "../dummy_img/960x455_BIG.jpg";
					//alert(src);
					src = $(col[position-1]).find("a").attr("href");
					title = $(col[position-1]).find("a").attr("title");
					text = $(col[position-1]).find("a").attr("name");
					
					if($(col[position-1]).find("a").hasClass("white"))
						txtClass = "white";
					$("#preloader").stop(true, false).fadeIn(100);					
					$("#large_image_container").stop().fadeOut(dockOpts['time'], function(){
						
						$.preloadImages(src, function(){
							//alert("ye");
							$("#large_image_container img").attr("src", src);
							$("#preloader").stop(true, false).fadeOut(100);
							$("#large_image_container").stop().fadeIn(dockOpts['time'], function(){
								$("#large_image h1").html(title);
								$("#large_image h3").html(text);
								
								$("#large_image h1").removeClass("white");
								$("#large_image h3").removeClass("white");
								$("#slider_container .label").removeClass("white");
								
								if(txtClass != "") {
									$("#large_image h1").addClass(txtClass);
									$("#large_image h3").addClass(txtClass);
									$("#slider_container .label").addClass(txtClass);
								}
								
								Cufon.replace("#large_image h1, #large_image h3");
								blockFlag = false;
							})
						});
						
					});					
				}
				else
					blockFlag = false;							
			}
			else { // ������
			
				if(position < count-1) {
			
					$("#large_image h1").html("");
					$("#large_image h3").html("");
					$(col[position]).removeClass("selected");
					$(col[position]).clearQueue().animate({
						width:"70px"
					}, dockOpts['time'], dockOpts['easingOut']);
					
					$(col[position]).find("a").clearQueue().animate({
						height:"30px"
					}, dockOpts['time'], dockOpts['easingOut']);
					
					$(col[position]).find(".label").clearQueue().animate({
						bottom:"40px"
					}, dockOpts['time']);
					
					$(col[position+1]).addClass("selected");
					
					$(col[position+1]).clearQueue().animate({
						width:"90px"
					}, dockOpts['time'], dockOpts['easingIn']);
					
					$(col[position+1]).find(".label").clearQueue().animate({
						bottom:"50px"
					}, dockOpts['time']);
					
					$(col[position+1]).find("a").clearQueue().animate({
						height:"40px"
					}, dockOpts['time'], dockOpts['easingOut'], function(){
						
						var posLeft = (position+1)*75 - 2;
						var margLeft = parseInt($("#slider").css("margin-left").split("px").join(""));
						
						if((posLeft + 90) > (margLeft-770)*(-1)) {
							var val = posLeft-(9*75);
							margin_base = 0-val;
							
							$("#slider_container").stop(true, true).animate({
								marginLeft: "-" + val + "px"
							}, 200);
						}
					});
						
					//src = "../dummy_img/960x455_BIG.jpg";
					src = $(col[position+1]).find("a").attr("href");
					title = $(col[position+1]).find("a").attr("title");
					text = $(col[position+1]).find("a").attr("name");
					
					if($(col[position+1]).find("a").hasClass("white"))
						txtClass = "white";
					else
						txtClass = "";
					
					$("#preloader").stop(true, true).fadeIn(100);	
				//alert(position);
					$("#large_image_container").stop().fadeIn(100, function(){//alert(dockOpts['time']);
						//alert(src);
						$.preloadImages(src, function(){
							$("#large_image_container img").attr("src", src);
						//	alert(src);
							$("#preloader").stop(true, true).fadeOut(100);
							$("#large_image_container").stop().fadeIn(dockOpts['time'], function(){
								
								$("#large_image h1").html(title);
								$("#large_image h3").html(text);
								
								$("#large_image h1").removeClass("white");
								$("#large_image h3").removeClass("white");
								$("#slider_container .label").removeClass("white");
								
								if(txtClass != "") {
									$("#large_image h1").addClass(txtClass);
									$("#large_image h3").addClass(txtClass);
									$("#slider_container .label").addClass(txtClass);
								}
								
								Cufon.replace("#large_image h1, #large_image h3");
								blockFlag = false;
							})
						});
					
					});	
				}	
				else
					blockFlag = false;
			}					
		}
		
		if($(this).hasClass("right")) {
			$(".left_unactive").addClass("left").removeClass("left_unactive");
			if(position == count-2) {
				$(".right").addClass("right_unactive").removeClass("right");
			}
		}
		
		if($(this).hasClass("left")) {
			$(".right_unactive").addClass("right").removeClass("right_unactive");
			if(position-1 == 0) {
				$(".left").addClass("left_unactive").removeClass("left");
			}
		}
			
		return false;
	})
	
	
	if(isiPad == true) {

		addSwipeListener(document.getElementById('large_image_container'), function(e){alert(direction)});
		
				
		function addSwipeListener(el, listener) {
			var startX;
			var dx;
			var direction;
			
			function cancelTouch() {
				el.removeEventListener('touchmove', onTouchMove);
				el.removeEventListener('touchend', onTouchEnd);
				startX = null;
				startY = null;
				direction = null;
			}
			
			function onTouchMove(e) {
				if (e.touches.length > 1) {
					//cancelTouch();
				}
				else {
					dx = e.touches[0].pageX - startX;
					var dy = e.touches[0].pageY - startY;
					if (direction == null) {
						direction = dx;
						e.preventDefault();
					}
					else if ((direction < 0 && dx > 0) || (direction > 0 && dx < 0) || Math.abs(dy) > 25) { //allow 25px of vertical deviation
						//cancelTouch();
					}
				}
			}
			
			function onTouchEnd(e) {
				cancelTouch();
				if (Math.abs(dx) > 40) { //touch must be more than 40px long
					if (dx>0) { //right
						prevSlide(); return false;
					} else {
						nextSlide(); return false;
					}
				}
			}
			
			function onTouchStart(e) {
				if (e.touches.length == 1) {
					startX = e.touches[0].pageX;
					startY = e.touches[0].pageY;
					el.addEventListener('touchmove', onTouchMove, false);
					el.addEventListener('touchend', onTouchEnd, false);
				}
			}
			
			el.addEventListener('touchstart', onTouchStart, false);
			
			function prevSlide(){
				
				FingerSlide(false);
			}
			
			function nextSlide(){
				
				FingerSlide(true);
				
			}
		
		}
	}
	
	function FingerSlide(direct) {
		if(blockFlag == false) {
			blockFlag = true;
			var count = 0;
			var position = 0;
			var src = "";
			var title = "";
			var text = "";
			var txtClass = "";
			var col = $("#slider_container .link");
									
			$("#slider_container .link").each(function(){
				if($(this).hasClass("selected") == true)
					position = count;
				count++;
			})
			
			if(direct == true) {
				if(position < count-1) {
					$("#large_image h1").html("");
					$("#large_image h3").html("");
					$(col[position]).removeClass("selected");
					$(col[position]).clearQueue().animate({
						width:"70px"
					}, dockOpts['time'], easingOut);
					
					$(col[position]).find("a").clearQueue().animate({
						height:"30px"
					}, dockOpts['time'], easingOut);
					
					$(col[position+1]).addClass("selected");
					
					$(col[position+1]).clearQueue().animate({
						width:"90px"
					}, dockOpts['time'], easingIn);
					
					$(col[position+1]).find("a").clearQueue().animate({
						height:"40px"
					}, dockOpts['time'], easingOut, function(){
						
						var posLeft = (position+1)*75 - 2;
						var margLeft = parseInt($("#slider").css("margin-left").split("px").join(""));
						
						if((posLeft + 90) > (margLeft-770)*(-1)) {
							var val = posLeft-(9*75);
							margin_base = 0-val;
							
							$("#slider_container").stop(true, true).animate({
								marginLeft: "-" + val + "px"
							}, 200);
						}
					});
					
					//src = "../dummy_img/960x455_BIG.jpg";
					
					src = $(col[position+1]).find("a").attr("href");
					title = $(col[position+1]).find("a").attr("title");
					text = $(col[position+1]).find("a").attr("name");
					
					if($(col[position+1]).hasClass("white"))
						txtClass = "white";
					$("#preloader").stop(true, true).fadeIn(100);					
					$("#large_image_container").stop().fadeOut(dockOpts['time'], function(){
						
						$.preloadImages(src, function(){
							$("#large_image_container img").attr("src", src);
							$("#preloader").stop(true, true).fadeOut(100);
							$("#large_image_container").stop().fadeIn(dockOpts['time'], function(){
								$("#large_image h1").html(title);
								$("#large_image h3").html(text);
								$("#large_image h1").addClass(txtClass);
								$("#large_image h3").addClass(txtClass);
								Cufon.replace("#large_image h1, #large_image h3");
								blockFlag = false;
							})
						});
					
					});	
				}	
				else
					blockFlag = false;
			}
			else {
				if(position > 0) {
						
				$(".right_unactive").addClass("right").removeClass("right_unactive");
				
				$("#large_image h1").html("");
				$("#large_image h3").html("");
				$(col[position]).removeClass("selected");
				$(col[position]).stop().animate({
					width:"70px"
				}, dockOpts['time'], easingOut);
				
				$(col[position]).find("a").clearQueue().animate({
					height:"30px"
				}, dockOpts['time'], easingOut);
				
				$(col[position-1]).addClass("selected");
				
				$(col[position-1]).clearQueue().animate({
					width:"90px"
				}, dockOpts['time'], easingIn);
				
				$(col[position-1]).find("a").clearQueue().animate({
					height:"40px"
				}, dockOpts['time'], easingOut, function(){
					
					var posLeft = (position-1)*75;
					var margLeft = parseInt($("#slider_container").css("margin-left").split("px").join(""));
					var raz = posLeft + margLeft;
					
					if(raz <= -2) {
						posLeft = (posLeft - 2)*(-1);
						margin_base = posLeft;
						var str = posLeft + "px";
						$("#slider_container").stop(true, true).animate({
							marginLeft:str 
						}, 200);
					}
				});
								
				//src = "../dummy_img/960x455_BIG.jpg";
				src = $(col[position-1]).find("a").attr("href");
				title = $(col[position-1]).find("a").attr("title");
				text = $(col[position-1]).find("a").attr("name");
				
				if($(col[position-1]).hasClass("white"))
					txtClass = "white";
				$("#preloader").stop(true, false).fadeIn(100);					
				$("#large_image_container").stop().fadeOut(dockOpts['time'], function(){
					
					$.preloadImages(src, function(){
						$("#large_image_container img").attr("src", src);
						$("#preloader").stop(true, false).fadeOut(100);
						$("#large_image_container").stop().fadeIn(dockOpts['time'], function(){
							$("#large_image h1").html(title);
							$("#large_image h3").html(text);
							$("#large_image h1").addClass(txtClass);
							$("#large_image h3").addClass(txtClass);
							Cufon.replace("#large_image h1, #large_image h3");
							blockFlag = false;
						})
					});
					
				});					
			}
			else
				blockFlag = false;
			}
		}
	}
});
var shown=false;
var biengShown=false;
var hideDelay=500;
var hideDelayTimer=null;
var time=250;
var timer;


$(document).ready(function () {

	if ( $('.trigger').length )
	{
		//$('.popup').css('display','none');
		var distance = 10;
		var time = 250;
		var hideDelay = 500;

		var hideDelayTimer = null;

		var beingShown = false;
		var shown = false;
		var trigger = $('.trigger', this);
		var info = $('.popup', this);


		$([trigger.get(0), info.get(0)]).mouseover(function () {
			if (hideDelayTimer) clearTimeout(hideDelayTimer);
			if (beingShown || shown) {
				return;
			} else {
				beingShown = true;
				$(trigger).addClass("visible");
				$(".popup").fadeIn(200, function() {
					$('.popup_inner').css('behavior','url(/bitrix/templates/vw4d/js/PIE/PIE.htc)');
				});
				beingShown = false;
				shown = true;
					
				
				}
			

			return false;
		}).mouseout(function () {
			if (hideDelayTimer)
				clearTimeout(hideDelayTimer);
			hideDelayTimer = setTimeout(function () {
				hideDelayTimer = null;
				$(trigger).removeClass("visible");	
				//$('.popup_inner').boxShadow('0px 1px 0px #191919');
				$('.popup_inner').css('behavior','');
				$(".popup").fadeOut("slow");
			
				   shown = false;
			}, hideDelay);

			return false;
		});
	}
   
});

