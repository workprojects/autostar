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
	$.fn.dockSliderW = function(options){
		
		var defaults = {
			time: '100',
			easingIn: 'linear',
			easingOut: 'linear'
		}
	 
		var opts = $.extend(defaults, options);
		
		var time = parseInt(opts.time);
		this.children(".link").hover(function(){
			if($(this).hasClass("selected") == false) {
			
				$("#wheels_preview .link").each(function(){
					$(this).clearQueue();
				})
				
				$("#wheels_preview .link").not(this).clearQueue().animate({
					width:"70px"
				}, time, opts['easingIn']);
				
				$("#wheels_preview .link a").not(this).clearQueue().animate({
					width:"64px"
				}, time, opts['easingIn']);			
				
				$("#wheels_preview .link").not(this).find(".label").clearQueue().animate({
					bottom:"40px"
				}, time, opts['easingIn']);
				
				$("#wheels_preview .selected").not(this).find("a").clearQueue().animate({
					height:"30px"
				}, time, opts['easingIn']);
				
				$(this).find("a").clearQueue().animate({
					height:"40px"
				}, time, opts['easingIn'])
				
				$(this).find(".label").clearQueue().animate({
					bottom:"50px"
				}, time);
				
				$(this).animate({
					width:"90px"
				}, time, opts['easingIn']);
				
			}
			
		},function(){
			if($(this).hasClass("selected") == false) {
				
				$(this).clearQueue().animate({
					width:"70px"
				}, time, opts['easingOut']);
			
				$(this).find("a").clearQueue().animate({
					height:"30px"
				}, time, opts['easingOut']);				
				
				$(this).find(".label").clearQueue().animate({
					bottom:"40px"
				}, time);
				
				
				$("#wheels_preview .selected").find("a").clearQueue().animate({
					height:"40px"
				}, time, opts['easingIn']);
				
				$("#wheels_preview .selected").find(".label").clearQueue().animate({
					bottom:"50px"
				}, time, opts['easingIn']);
				
				$("#wheels_preview .selected").clearQueue().animate({
					width:"90px"
				}, time, opts['easingIn']);

				$("#wheels_preview .selected a").not(this).clearQueue().animate({
					width:"84px"
				}, time, opts['easingIn']);					
				
			}
		})
		
	}
})(jQuery);