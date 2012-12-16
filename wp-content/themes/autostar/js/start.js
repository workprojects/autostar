var form_close = 1;
var time_li_hover = 250;

// seo-text
function showNextText()
{
	$("div#avt_footer_left_next").toggle('slow');
	if ($("a.hiddenText").hasClass('active') != true) {$("a.hiddenText").text('[-]');$("a.hiddenText").addClass('active')}
	else {$("a.hiddenText").text('[+]');$("a.hiddenText").removeClass('active');};
}

//popup_form
function popup_form_open(form_name, auto_name)
{
        if (auto_name == undefined) auto_name = '';
	showPopupOnly('reference');
	AjaxRequest.send(null, '/action/form/loader/' , '', true, {'form_name': form_name, 'auto_name': auto_name});
	return false;
}

$('#popup').live("click", function(){
	if (form_close == 1)
	{
		$('#popup_inner').html('');
		closePopupOrder();
	};
});

$('#popup div a.modal-close').live("click", function(){
	$('#popup_inner div#form-container').removeClass('active');
	$('#popup_inner').html('');
	closePopupOrder();
});

$('#popup_inner div#form-container, #popup_inner div#videoform-container, #popup_inner div#image-container').live('mouseenter', function(){
	form_close = 0;
});
   
$('#popup_inner div#form-container, #popup_inner div#videoform-container, #popup_inner div#image-container').live('mouseleave', function(){
	form_close = 1;
});
   

//close pop-up box
function closePopupOrder()
{
   $('#opaco_order').toggleClass('popup-hidden').removeAttr('style');
   $('#popup').toggleClass('popup-hidden').removeAttr('style');
   /*$('#popup').toggleClass('popup-hidden');*/
   return false;
}
 
//open pop-up
function showPopupOnly(popup_type)
{
   //when IE - fade immediately
   if($.browser.msie)
   {
     $('#opaco_order').height($(document).height()).toggleClass('popup-hidden');
	 $('#popup').toggleClass('popup-hidden');
   }
   else
   //in all the rest browsers - fade slowly
   {
     $('#opaco_order').height($(document).height()).toggleClass('popup-hidden').fadeTo('slow', 0.7);
	  $('#popup').toggleClass('popup-hidden').fadeTo('slow', 1.0);
   }

   return false;
};

$(document).ready(function() {
 
	//change font
	Cufon.replace("li.avt_main_menu_first a.avt_m51x_level1"/*, {hover: true}*/);
	Cufon.replace("li.avt_main_menu_first div.rollover a"/*, {hover: true}*/);
	Cufon.replace("div.section_menu_bottom h3 a"/*, {hover: true}*/);
	Cufon.replace("div.section_menu_bottom ul li a", {hover: true});
	Cufon.replace(".model .comps", {hover: true});
  
    /*
	 * menu slideUp/slideDown
	 */
	$('li.avt_main_menu_first').hover(
		function() {
			$(this).find('ul.avt_m51x_flyout').stop(true, true);
			$(this).find('ul.avt_m51x_flyout').slideDown('fast');
			$(this).find('div.rollover').css('display', 'block');
        },
        function() {			
			$(this).parent().find('ul.avt_m51x_flyout').slideUp('fast');
			$(this).find('div.rollover').css('display', 'none');
        }
	);
	
	//img instead banner
	if(!FlashDetect.installed){
		$('.no_flash').show();
		//$('.flash').css("height","406px");
		//alert("Flash is required to enjoy this site.");     	
	}else{
		/*$('.no_flash').show();
		$('.flash').css("height","406px");*/
	};
	
	$('ul.avt_main_menu li ul.avt_m51x_flyout li').hover(
		function(){
			$(this).find('a').stop().animate({backgroundColor:"#cfd7d9"},  time_li_hover);
		},
		function(){
			$(this).find('a').stop().animate({backgroundColor:"#fff"},  time_li_hover);
		}
	);	
	
	$('#block-content img').each(function(){
		if($(this).css('float') == 'right'){
			$(this).css('margin', '10px').css('margin-right', '0px');
		}
		else if($(this).css('float') == 'left'){
			$(this).css('margin', '10px').css('margin-left', '0px');
		}
	});
	$('#block-content a').each(function(){
		if($(this).css('float') == 'right'){
			$(this).find('img').css('margin', '10px').css('margin-right', '0px');
		}
		else if($(this).css('float') == 'left'){
			$(this).find('img').css('margin', '10px').css('margin-left', '0px');
		}
	});
        
        /*
        * submit click
        */
        $('div.submit').click(function(){
            if ( $(this).parent().find('input#keyword_serch').val()=='пошук' ) $(this).parent().find('input#keyword_serch').val('');
            $(this).parent().submit();
            return false;
        });        
  
});

/*
 * Функция форматирования строки в число
 */
function formatNumber(nStr)
{
   nStr += '';
   x = nStr.split(' ');
   x1 = x[0];
   x2 = x.length > 1 ? ' ' + x[1] : '';
   var rgx = /(\d+)(\d{3})/;
   while (rgx.test(x1)) {
      x1 = x1.replace(rgx, '$1' + ' ' + '$2');
   }
   return x1+x2 ;
}