$(document).ready(function() {
	
	var IE6Flag = false;
	if($.browser.msie == true && $.browser.version == "6.0")
		IE6Flag = true;
	
	var IEFlag = false;
	if($.browser.msie == true && ($.browser.version == "7.0" || $.browser.version == "8.0"))
		IEFlag = true;
	
	var IE9Flag = false;
	if($.browser.msie == true && $.browser.version == "9.0")
		IE9Flag = true;
	
	var src = new Array;
	$(".teasers a").each(function(){
		src.push($(this).attr("rel"));
	})
	
//$.preloadImages(src);
	
	if(IEFlag == true)
		$(".teasers a").css("behavior", "url('PIE/PIE.htc')");
	
	/* переключалка текста на тизере */
	$(".teasers a").hover(function() {
			if($(this).find(".txt").length > 1) {
				$(this).find(".txt:first").stop(true, true).fadeOut(200);
				$(this).find(".txt:last").stop(true, true).fadeIn(200);
			}
		}, function(){
			if($(this).find(".txt").length > 1) {
				$(this).find(".txt:last").stop(true, true).fadeOut(200);
				$(this).find(".txt:first").stop(true, true).fadeIn(200);
			}
	});
	
	/* --- слайдер главной страницы --- */
	
	/*
		Тизеры (с рамкой / без рамки):
			Маленький - 134х72 (126х64)
			Средний - 166х88 (158х80)
			Большой - 214х112 (206х104)
	*/
	var TeasersWidth = 935; // дефолтная ширина блока с тизерами
	
	$(".teasers a").hover(function(){
		
		if(IE6Flag == false) {
			
			$(this).addClass("selected");
			var Count = 0;
			var Position = 0;
			$(".teasers a").each(function(){
				if($(this).hasClass("selected"))
					Position = Count;
				Count++;
			})
			
			var Middle = new Array(); // сюда добавим те, которые должны быть сренего размера
			var Small = [0,1,2,3,4]; // отсюда уберем большой и средние тизеры
			var Collection = $(".teasers a");
			
			if(Position+1 <= 4)
				Middle.push(Position+1);
			if(Position-1 >= 0)
				Middle.push(Position-1);
			
			for(var i in Small) {
				if(Small[i] == Position) {
					Small.splice(i, 1); // убрали большой
					break;
				}
			}
			
			for(var p in Middle)
				for(var j in Small)
					if(Small[j] == Middle[p])
						Small.splice(j, 1); // убрали средние, остануться только маленькие
			
			for(i in Small) {
				$(Collection[Small[i]]).stop(true, false).animate({
					width:"126px",
					height:"64px",
					marginTop:"40px"
				}, 200, function(){
					$(this).addClass("small");
				});
			}
			
			// меняем картинки с маленькой на большую
			var src = $(this).find("img").attr("src");
			var rel = $(this).attr("rel");
			$(this).find("img").attr("src", rel);
			$(this).attr("rel", src);
			
			$(this).stop(true, false).animate({
				width:"206px",
				height:"104px",
				marginTop:"0px"
			}, 200);
			
			for(i in Middle)
				$(Collection[Middle[i]]).addClass("middle");
				
			var width = Middle.length*186 + Small.length*154 + 234;
			var left = (TeasersWidth - width)/2;
			
			$(".teasers").stop(true, false).animate({
				width:width+5+"px", // небольшой запас для отго, чтобы последний див не моргал
				left:left+"px"
			}, 200);
			
		}
		
	},
	function(){
		
		if(IE6Flag == false) {
		
			var src = $(this).find("img").attr("src");
			var rel = $(this).attr("rel");
			$(this).find("img").attr("src", rel);
			$(this).attr("rel", src);
			
			$(".teasers a.selected, .teasers a.small").stop(true, false).animate({
				width:"158px",
				height:"80px",
				marginTop:"24px"
			}, 200);
			
			$(".teasers").stop(true, false).animate({
				width:TeasersWidth+"px",
				left:"5px"
			}, 200);
			
			$(".teasers a").removeClass("selected");
			$(".teasers a").removeClass("small");
			$(".teasers a").removeClass("middle");
		
		}
		
	})
	
	$(".teasers").hover(function(){}, function(){
		
		if(IE6Flag == false) {
		
			$(".teasers a").stop(true, false).animate({
				width:"158px",
				height:"80px",
				marginTop:"24px"
			}, 200);
			
			$(".teasers").stop(true, false).animate({
				width:TeasersWidth+"px",
				left:"5px"
			}, 200);
		
		}
		
	});
	
	
	
})