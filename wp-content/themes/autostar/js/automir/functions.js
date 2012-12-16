$(document).ready(function(){
    
    /*****************/
    // переключалка табов
$(".tab_switch a").click(function() {
$(".tab_switch li").removeClass("active");
$(this).parent().addClass("active");
$(".tab").removeClass("visible");
var name = $(this).attr("href").split("#show_").join("");
$(".type_" + name).addClass("visible");
return false;
}) 
$("a.zoom_teaser").fancybox({
'titlePosition' : 'inside'
}); 
    /*****************/
    
    
	//$("a").click(function (){return false;});
	var start=true;
		
	/* Прелоадер картинок */
	jQuery.preloadImages = function () {
	    if (typeof arguments[arguments.length - 1] == 'function') {
	        var callback = arguments[arguments.length - 1];
	    } else {
	        var callback = false;
	    }
	    if (typeof arguments[0] == 'object') {
	        var images = arguments[0];
	        var n = images.length;
	    } else {
	        var images = arguments;
	        var n = images.length - 1;
	    }
	    var not_loaded = n;
	    for (var i = 0; i < n; i++) {
	        jQuery(new Image()).load(function() {
	            if (--not_loaded < 1 && typeof callback == 'function') {
	                callback();
	            }
	        }).attr('src', images[i]);
	    }
	};
	
	
	$('#mainMenu .level1').each(function(){
		
		if ($(this).siblings('.rollover').length==0) {
			// create rollover
			$(this).after('<div class="rollover"><a href="'+this.href+'"><b>'+$(this).text()+'</b></a><i class="left"><!--//--></i><i class="right"><!--//--></i></div>')
		}
				
	});
	
	$('#mainMenu .level1').mouseover(function(){
		
		$('#mainMenu .rollover').removeClass('onTop2');
		
		$(this).siblings('.rollover').addClass('onTop2').show().mouseover();
		
	});
	
	$('#mainMenu .rollover').hover(function(){
		
		var IEFlag = false;
		if($.browser.msie == true && ($.browser.version == "7.0" || $.browser.version == "6.0")) {
			IEFlag = true;
		}
		
		//$(this).clearQueue();
		$(this).parent().addClass('nobg');
		$('#mainMenu .flyout, #mainMenu .flyOut').removeClass('onTop');
		if(IEFlag == false)
			$(this).siblings('.flyout').addClass('onTop').clearQueue().slideDown('fast');
		else
			$(this).siblings('.flyout').addClass('onTop').clearQueue().css({'display':'block'});
		$(this).siblings('.flyOut').addClass('onTop').clearQueue().css({'display':'block'});		
		// меню моделей //// 
		if (start)
		{
		
			//if(IEFlag == false) {
			//	StartModelMenu();
			//}
			start=false;
			
				
				/*setTimeout( function ()
				{var allHeight=0;
					$('.left_model_menu div.body_type').each(function()
					{	
						var trueheight=$(this).find('div.model_list').css('height');
						
						
						trueheight=trueheight.replace('px','');
						if (trueheight<10) 
						{
							trueheight=$(this).find('div.model_string').size();
							trueheight=trueheight*22;
						}
								
						allHeight=allHeight+trueheight*1;
						
						trueheight=(trueheight-21);
					});
					var plus=0;
					if (($.browser.msie) && (($.browser.version == '6.0')||($.browser.version == '7.0')))
						plus=9;
					else 
						plus=9;
						
					//$('.model_picture_list').css({'height':(allHeight+plus)+'px'});			
				}, 2);*/
				
			
			
		}
		
	},function(){
		
		$(this).parent().removeClass('nobg');
		$(this).siblings('.flyout, .flyOut').clearQueue().delay(200).queue(function(){
			$(this).hide();
		});
			
		$(this).clearQueue().delay(200).queue(function(){
			$(this).hide();
		});
			
		
	});

	
	
	$('#mainMenu .flyout, #mainMenu .flyOut').hover(function(){
		
		$(this).clearQueue();
		$(this).siblings('.rollover').clearQueue();
		
	},function(){
		$('div.model_list').css({'display':'block'});
		$('div.model_picture_list').css({'display':'none'});
		$(this).clearQueue().delay(200).queue(function(){
			$(this).hide();
		});
		
		$(this).siblings('.rollover').delay(200).queue(function(){
			$(this).hide();
		});
		
	});

	
});