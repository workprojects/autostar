/*
 *	dockSlider - jQuery Plugin
 * 
 *	Copyright (c) 2011 Kodix
 *
 *	Version: 0.0.1 (17.05.2011)
 *	Requires: jQuery v1.3+, jQuery UI
 *	
 *	На самом деле это просто заготовка - чтобы потом переписать нормально под IE.
 *	Видимо придется отказаться от удобных селекторов и анимейтов в пользу кастомных функция для ресайза,
 * 	иначе скорость анимации в IE оставляет желать лучшего. 
 */
 
(function($){
	$.fn.dockSlider = function(options){
		
		var defaults = {
			time: '100',
			easingIn: 'linear',
			easingOut: 'linear'
		}
	 
		var opts = $.extend(defaults, options);
		
		var time = parseInt(opts.time);
		
		var id = this.attr('id');
		this.children(".link").hover(function(){
			if($(this).hasClass("selected") == false) {
			
				$("#" +  id + " .link").each(function(){
					$(this).clearQueue();
				})
				
				$("#" +  id + " .link").not(this).clearQueue().animate({
					width:"55px"
				}, time, opts['easingIn']);
				
				/*$("#" +  id + " .link a").not(this).clearQueue().animate({
					width:"64px"
				}, time, opts['easingIn']);	*/	
				
				$("#" +  id + " .link").not(this).find(".label").clearQueue().animate({
					bottom:"40px"
				}, time, opts['easingIn']);
				
				$("#" +  id + " .selected").not(this).find("a").clearQueue().animate({
					height:"25px",
                                        width:"49px"
				}, time, opts['easingIn']);
				
				$(this).find("a").clearQueue().animate({
					height:"32px",
                                        width:"64px"
				}, time, opts['easingIn'])
				
				/*$(this).find("a").clearQueue().animate({
					height:"84px"
				}, time, opts['easingIn'])*/				
				
				$(this).find(".label").clearQueue().animate({
					bottom:"50px"
				}, time);
				
				$(this).animate({
					width:"70px"
				}, time, opts['easingIn']);	

				if ($(this).find('.border_down').find('.in_text').html() != '')
					$(this).find('.border_down').show();				
				
			}
			else
			{
				if ($(this).find('.border_down').find('.in_text').html() != '')
					$(this).find('.border_down').show();			
			};
			
		},function(){
			if($(this).hasClass("selected") == false) {
				
				$(this).clearQueue().animate({
					width:"55px"
				}, time, opts['easingOut']);
			
				$(this).find("a").clearQueue().animate({
					height:"25px",
                                        width:"49px"
				}, time, opts['easingOut']);				
				
				$(this).find(".label").clearQueue().animate({
					bottom:"40px"
				}, time);
				
				
				$("#" +  id + " .selected").find("a").clearQueue().animate({
					height:"32px",
                                        width:"64px"
				}, time, opts['easingIn']);
				
				$("#" +  id + " .selected").find(".label").clearQueue().animate({
					bottom:"50px"
				}, time, opts['easingIn']);
				
				$("#" +  id + " .selected").clearQueue().animate({
					width:"70px"
				}, time, opts['easingIn']);

				/*$("#" +  id + " .selected a").not(this).clearQueue().animate({
					width:"84px"
				}, time, opts['easingIn']);*/
				
				$(this).find('.border_down').hide();
				
			}
			else
			{
				$(this).find('.border_down').hide();
			};
		})
		
	}
})(jQuery);