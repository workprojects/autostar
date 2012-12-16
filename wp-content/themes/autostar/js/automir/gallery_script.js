$(document).ready(function(){
	
	// определяем iPad
	var isiPad = navigator.userAgent.match(/iPad/i) != null;
	
	// Определяем IE
	var IEFlag = false;
	if($.browser.msie && ($.browser.version == "8.0" || $.browser.version == "7.0" || $.browser.version == "6.0"))
		IEFlag = true;
	
	var IE9Flag = false;
	if($.browser.msie && $.browser.version == "9.0")
		IE9Flag = true;
	
	/* Базовые настройки */
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
	
	/* устанавливаем ширину сладеру */
	$("#slider_container").css("width", $("#slider_container .link").length*75+20+2+5 + "px"); 
	
	/* стрелки показать/убрать */
	if(IEFlag == false) {
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
	}
	
	/* тени для IE */
	if(IEFlag == true)
		$("#slider_container .ieshadow a").css("behavior", "url('../js/PIE/PIE.htc')");
	
	/* возврат слайдера к выделенному элементу */
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
	
	/* открываем видео */
	$(".video_slide a").click(function(){
		var src = $(this).attr("href");
		var video_name = $(this).find('div').text();
		showPopupOnly('reference');
		AjaxRequest.send(null, '/action/gallery/gallery/' , '', true, {'href': src, 'video_name': video_name});		
		return false;
	});
	
	/* переключаем большую картинку по клику на превьюху в слайдере */
	$("#slider_container a").click(function(){
		
		var position = 0;
		var count = 0;
		
		if($(this).parent().parent().hasClass("selected") != true) {
			
			margin_base = parseInt($("#slider_container").css("margin-left").split("px").join(""));
			SlideNow = false;	
			
			/*$("#large_image h1").html("");
			$("#large_image h3").html("");
			
			$("#large_image h1").removeClass("white");
			$("#large_image h3").removeClass("white");*/
			
			$("#slider .link").removeClass("selected");
			
			$("#slider_container .label").removeClass("white");
			
			$(this).parent().parent().addClass("selected");
			
			var src = $(this).attr("href");
			//alert(src);
			var title = $(this).attr("title");
			var text = $(this).attr("name");
			var txtClass = "";
			
			if($(this).hasClass("white"))
				txtClass = "white";
			
			$("#preloader").stop(true, true).fadeIn(100);
			$("#large_image_container").stop().fadeOut(dockOpts['time'], function(){
				$.preloadImages(src, function(){
					$("#large_image_container img").attr("src", src);					
					$("#large_image_container").fadeIn(dockOpts['time'], function(){
						$("#large_image h1").html(title);
						$("#large_image h3").html(text);
						if(txtClass != "") {
							$("#large_image h1").addClass(txtClass);
							$("#large_image h3").addClass(txtClass);
							$("#slider_container .label").addClass(txtClass);
						}
						Cufon.replace("#large_image h1, #large_image h3");
					});
					$("#preloader").stop(true, true).fadeOut(100);					
				});
			});			
		}
		
		$("#slider .link").each(function(){
			if($(this).hasClass("selected") == true)
				position = count;
			count++;
		})
		
		if(position == $("#slider a").length-1) {
			$(".right").addClass("right_unactive").removeClass("right");
			$(".left_unactive").addClass("left").removeClass("left_unactive");
		}
		
		if(position == 0) {
			$(".left").addClass("left_unactive").removeClass("left");
			$(".right_unactive").addClass("right").removeClass("right_unactive");
		}
		
		if(position > 0 && position < $("#slider a").length-1) {
			$(".right_unactive").addClass("right").removeClass("right_unactive");
			$(".left_unactive").addClass("left").removeClass("left_unactive");
		}
		
		return false;
	})
	
	/* зумер дока */
	$("#slider_container").dockSlider(dockOpts);
	
	/* --- Каталка дока --- */
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
			}, 30);
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
			}, 30);
		}
	}, function(){
		clearTimeout(timer);
		SlTimer = setTimeout(ReturnPosition, 500);
	})
	
	function ReturnPosition() {
		return false;
		SlideNow = true;
	}
	
	$("#slider_container a").mouseover(function(){
		clearTimeout(SlTimer);
	})
	
	var blockFlag = false; // номер выбранного элемента
	
	/* листаем картинки */
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
			
			if($(this).hasClass("left")) { // назад
				if(position > 0) {
					
					$(".right_unactive").addClass("right").removeClass("right_unactive");
					
					$("#large_image h1").html("");
					$("#large_image h3").html("");
					$(col[position]).removeClass("selected");
					$(col[position]).stop().animate({
						width:"70px"
					}, dockOpts['time'], dockOpts['easingOut']);
					
					$(col[position]).find("a").clearQueue().animate({
						height:"30px",
                                                width:"64px"
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
						height:"40px",
                                                width:"84px"
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
			else { // вперед
			
				if(position < count-1) {
			
					$("#large_image h1").html("");
					$("#large_image h3").html("");
					$(col[position]).removeClass("selected");
					$(col[position]).clearQueue().animate({
						width:"70px"
					}, dockOpts['time'], dockOpts['easingOut']);
					
					$(col[position]).find("a").clearQueue().animate({
						height:"30px",
                                                width:"64px"
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
						height:"40px",
                                                width:"84px"
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
	};
   
});

