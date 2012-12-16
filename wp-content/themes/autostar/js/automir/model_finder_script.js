$(document).ready(function(){
	$(".mainnav a").mouseover(function(){
		$(".main_sub_container").css("display", "none");
		$("div.sub_nav_container").addClass("active");
		
		var mLeft = 0; // ширина заголовка
		
		var forCss = 0;
		
		var id = $(this).attr("id");
		var subId = 'sub_' + id;
				
		var x = $(this).offset().left-2;
		var subWidth = $("#" + subId).width();
		var mainWidth = $("div.mainnav").width();
		
		var eq = mainWidth - x;
		
		if(eq < subWidth)
			forCss = mainWidth - subWidth;
		else
			forCss = x;
		
		forCss = forCss - mLeft;
		
		if(forCss < 0) {
			forCss = 0;
		}
			
		$("#" + subId).css("display", "block");
		$("#" + subId).css("padding-left", forCss + mLeft + 'px');
		/*$("#" + subId).css("margin-left", mLeft + 'px');*/
		if(eq > subWidth) {
			$("#" + subId).css("width", eq + 'px');
		}
	});
	
	$(".mainnav a, .frame, .row_stage_medium, .logo, .stage").mouseenter(function(){
		if($("div.main_sub_container:visible").length > 0) {
			var id = $("div.main_sub_container:visible").attr("id").substr(4);
			if($(this).attr("id") != id)
				$(".main_sub_container").css("display", "none");	
		}
	});
})
function format_price(price) {
    price = parseInt(price);

    str_price = "";
    while (price >= 1000) {
        cur_price = price % 1000;
        price = parseInt(price / 1000);

        if (cur_price / 10 < 1) cur_price = "0"+cur_price;
        if (cur_price / 100 < 1) cur_price = "0"+cur_price;
        if (!cur_price) cur_price = "000";

        str_price = cur_price+"&nbsp;"+str_price;
    }
    if (price) str_price = price+"&nbsp;"+str_price;
    else str_price = "0&nbsp;"+str_price;
    
    return str_price;
}


$(document).ready(function(){
	
	if (($.browser.msie) && ($.browser.version == '6.0'))
	{
	 var zIndexNumber = 10000; //alert('a');
       // Put your target element(s) in the selector below!
      $("div.model div.link").each(function() {
               $(this).css({'z-index': zIndexNumber});
               zIndexNumber -= 10;
       });	
	}
	else
	{
		/*Cufon.replace('.panel label, .prices span, .panel p, .filter_title');*/
		/*Cufon.replace('#clear, .model a', {
			hover: true
		});*/
	}
	
	var sliderFrom = parseInt($("#f_price_from").val());
	
	//alert(sliderFrom);
	var sliderTo = parseInt($("#f_price_to").val());
	
	var StartFlag = false;
	
	$("#slider-range").slider({
		range: true,
		min: sliderFrom,
		max: sliderTo,
		values: [sliderFrom, sliderTo],
		step: 1000,
		start: function( event, ui ) {StartFlag = false;},
		stop: function( event, ui ) {StartFlag = true;},
		slide: function( event, ui ) {
			$("#f_price_from").val(ui.values[0])
			$("#f_price_to").val(ui.values[1])
			
			$("#price_from").html(format_price(ui.values[0]))
			$("#price_to").html(format_price(ui.values[1]))
			if (($.browser.msie) && ($.browser.version == '6.0'))
			{}
			else
			{
				//Cufon.replace("#price_from, #price_to");
			}
              ajaxUpdater(); 
		}
	});
	
	
	
	$(".ui-slider-handle").mousedown(function(){
		StartFlag = false;
	})
	
	$(".ui-slider-handle").mouseup(function(){
		StartFlag = true;
		 ajaxUpdater();
	})
	
	$(".chck").click(function(){
		 StartFlag = true; 
		var id = $(this).attr("id").split("chck_").join("");
		
		if($(this).hasClass("checked")) {
			$(this).removeClass("checked");
			$("#" + id).attr("checked", false);
		}
		else {
			$(this).addClass("checked");
			$("#" + id).attr("checked", true);
		}
		   ajaxUpdater();
		return false;
		
	})
	
	$(".panel label").click(function(){
		var id = $(this).attr("for").split("chck_").join("");
		//alert(id);
		
		if($("#" + id).attr("checked") == 'checked') {
			$("#chck_" + id).removeClass("checked");
			$("#" + id).attr("checked", false);
		}
		else {
			$("#chck_" + id).addClass("checked");
			$("#" + id).attr("checked", true);
		}
		
		  ajaxUpdater();
		return false;
	})
	
	$("#clear").click(function(){
		$(".panel input").attr("checked", true);
		$(".chck").each(function(){
			if($(this).hasClass("checked") == false)
				$(this).addClass("checked");
		})
		
		
		$("a.ui-slider-handle:first").css("left", "0%");
		$("a.ui-slider-handle:last").css("left", "100%");
		$(".ui-slider-range").css("width", "100%");
		$(".ui-slider-range").css("left", "0%");
		
		
		$("#price_from").html(format_price(sliderFrom));
		$("#f_price_from").val(sliderFrom);
		$("#price_to").html(format_price(sliderTo));
		$("#f_price_to").val(sliderTo);
		if (($.browser.msie) && ($.browser.version == '6.0'))
			{}
		else
			{
				//Cufon.replace("#price_from, #price_to");
			}
	   ajaxUpdater();
		
		return false;
	})	
	
	//setInterval(ajaxUpdater, 1000);
	var oldQString = "";
	 function ajaxUpdater() {
		//return false;
	
        var qString = "/action/auto/models/?";
        $("#filterForm input:checked").each(function(){
            qString += this.name + "=" + this.value + "&";
        })
        
        var PriceFrom = $('input[name="f_price_from"]').val();
        var PriceTo = $('input[name="f_price_to"]').val();
		var type = $('input[name="car_type"]').val();
        
        qString += "f_price_from=" + PriceFrom;
        qString += "&f_price_to=" + PriceTo;
        qString += "&car_type=" + type;
        
        qString += "&mode=ajax";
        //console.log(qString);
		//alert(StartFlag);
        if(qString != oldQString && StartFlag == true) {
            $.ajax({
				type: 'GET',
                url: qString,
				cache: false,
				data: {},
                dataType: 'json',
                success: function(data) {
                    var str = "";
                    for(i in data) {
						//alert(data[i]['uniq_name']);
                        str += "#model_" + data[i]['uniq_name'];
                        if(i != data.length-1)
                            str += ",";
                    }
                    //console.log(str) ;
                    //$(".models_list .model ").fadeOut(2000);
                    
                    $(".models_list .model").stop(true, true).animate({
                        width: "0px"
                    }, 500);
                    $(".models_list .model").css('display','block');
                    $(".models_list .model").not(str).css('display','none');
                    $(str).stop(true, true).animate({
                        width: "125px"
                    }, 500);
                    
                    if (($.browser.msie) && ($.browser.version == '6.0'))
                    {
                        $(".models_list .model").css({'overflow':'hidden'});
                        $(str).css({'overflow':'visible'});
                    }
                    oldQString = qString;
                },
				error: function(jqXHR, textStatus, errorThrown){alert(errorThrown);}
            });
        }
    }
	/*
	$(".model").hover(function(){
		$(this).find(".link").stop(true, true).fadeIn(100);
	}, function(){
		$(this).find(".link").stop(true, true).fadeOut(100);
	});
	$(".model a.comps").hover(function(){
		$(this).find("span").css({'border-bottom':'1px solid #2274ac'});
	}, function(){
		$(this).find("span").css({'border-bottom':'none'});
	})
	*/
	$(".model").hover(function(){
		$(this).find(".link").stop(true, true).fadeIn(100);
		current = $(this).index();

		count=0;
		$(this).prevAll().each(function(){		
			if(current > $(this).index()){
				if($(this).css("display") == 'block'){
					count= count+1;
				}
			}
		});
		
		var index = (count) % 5;
		
        var info = $(this).find('.link');
        var triangle = $(this).find('.triangle');
                
                if(index == 4){
                    info.css('left', '-68px');
					triangle.css('left', '126px');
				}
                else if(index > 0){                    
					info.css('left', '-29px');
					triangle.css('left', '88px');
                }
				else{        
					info.css('left', '0px');
					triangle.css('left', '57px');
				}

	}, function(){
		$(this).find(".link").stop(true, true).fadeOut(100);
	});
})