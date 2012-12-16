$(document).ready(function(){
    
    /* для IE понадобится чуть ли не весь код переписывать */
    var IEFlag = false;
    if($.browser.msie && ($.browser.version == "8.0" || $.browser.version == "7.0" || $.browser.version == "6.0"))
        IEFlag = true;
    
    var IE9Flag = false;
    if($.browser.msie && $.browser.version == "9.0")
        IE9Flag = true;
    
    /* тени в слайдере */
    if(IEFlag == true)
        $("#slider_container .ieshadow a").css("behavior", "url('/bitrix/templates/vw4d/js/PIE/PIE.htc')");
        
    /* настройки анимации для дока */
    if(IEFlag == true) {    //настройки анимации для дока в IE
        var dockOpts = {
            easingIn: 'linear',
            easingOut: 'linear',
            time: '200'
        };
    }
    else {
        var dockOpts = {
            easingIn: 'swing',
            easingOut: 'swing',
            time: '200'
        };
    }
    
    var Int = false;    // таймер для появляющихся постепенно хайлайтсов
    var HighlightsCount = 0;    // счетчик хайлайтсов
    
    /* появление хайлайтсов при загрухке страницы */
    clearInterval(Int);
    Int = setInterval(ShowHighlights, 100);
    
    function ShowHighlights() {    // появление хайлайтсов
        var HLCol = $(".highlight");
        $(HLCol[HighlightsCount]).fadeIn(100, function(){
            if(IEFlag == true)    // тени для IE при загрузке страницы
                $(this).css("behavior", "url('/bitrix/templates/vw4d/js/PIE/PIE.htc')");
                
            if(IE9Flag == true) // для IE9 тоже нужно немного хаков (все из-зи куфонов)
                $(this).children("a").css("width", $(this).children("a").width() + "px");
        });
        
        if(HighlightsCount == $(".highlight").length-1)
            clearInterval(Int);
        HighlightsCount++;
    }
    
    /* установка ширины дока */
    $("#slider_container").css("width", $("#slider_container .link").length*75+20+2+5 + "px");
    $("#slider_container").css("margin-left", (960-$("#slider_container .link").length*75+20+2+5)/2 + "px");
    
    /* функция расставляет z-index'ы для IE */
    function SetZIndex() {
        var HlCol = $(".highlight");
        var HcCol = $(".highlight_container");
        var IEShad = $(".ieshad");
        var j = 1000;
        for(var i = 0; i < HlCol.length; i++) {
            $(HlCol[i]).css("z-index", i+10);
            $(HcCol[i]).css("z-index", j);
            $(IEShad[i]).css("z-index", i+2);
            j++;
        }
        $("#slider").css("z-index", i + 5);
    }
    
    //if(IEFlag == true || IE9Flag == true)    // тут же применяем
    SetZIndex();
    
    /* зумер дока (плагин) */
    $("#slider_container").dockSlider(dockOpts);
    
    /* подгрузка аяксом инфоэлементов хайлайта */
    $("#slider a").click(function() {
        if($(this).parent().parent().hasClass("selected") == false) {
            
            if(IEFlag == true)
                $(".highlight").css("behavior", "none");
            
            $(".highlight").remove();
            $(".ieshad").remove();
            $(".highlight_container").remove();
            
            clearInterval(Int); // а то вдруг у нас старые хайлайтся еще не подгрузились?
            
            $("#slider .link").removeClass("selected");
            $(this).parent().parent().addClass("selected");
            
            var xmlId = $(this).attr("href").split("#").join("");
            
            $("#image_container").stop(true, true).fadeOut(200, function() {
            
                $("#preloader").stop(true, true).fadeIn(100);
            
                $.ajax({
                    url: '/action/review/load/?mode=ajax&clear_cache=Y&highlight=' + xmlId,
                    //async: false,
                    dataType: 'json',
                    success: function(data) {
                        if(data != null) {
                            
                            $("#large_image h1").html("");
                            $("#large_image h3").html("");
                            
                            $("#large_image h1").removeClass("white");
                            $("#large_image h3").removeClass("white");
    
                            
                            var src = data["HIGHLIGHTS_SECTIONS"]["image"];
                            $.preloadImages(src, function(){
                                $("#image_container img").attr("src", src);
            
                                if(IEFlag == true)
                                    $("#image_container").css("display", "block");
                                else
                                    $("#image_container").stop(true, true).fadeIn(200, function(){});
                                    
                                AddHighlights(data);
                                HighlightsCount = 0;
                                Int = setInterval(ShowHighlights, 100);
                                    
                            });    
                        }
                    },
					error: function(jqXHR, textStatus, errorThrown){
						//alert(jqXHR);
						//alert(textStatus);
						alert(errorThrown);
					}
                });
            });
        }
        return false;
    })
    
    /* переключалка табов во всплывающем окне */
    $(".switch a").click(function(){
        $(".switch a").removeClass("forward");
        $(".switch a").removeClass("active");
        
        $(this).addClass("forward");
        $(this).addClass("active");
        
        var tab = $(this).attr("href").split("#").join("");
        $("#hl_details .cnt").css("display", "none");
        $("#hl_details ." + tab + "_cnt").css("display", "block");
        
        return false;
    })
    
    /* --- бинды и функции обработки хайлайтсов --- */
    var WidthXml = new Array;    // массив с ...
    var ShowingXml = false;
    var ShownXml = false;
    
    /* раздвинуть ссылку / показать хайлайт */
    function ShowHighlight(XmlId, height) {
        
        if(ShownXml == false || ShownXml != XmlId) {
        
            ShownXml = XmlId;
            
            $("#hl_" + XmlId).stop(true, true);
            $("#hc_" + XmlId).stop(true, true);
            $("#hc_" + XmlId + " .highlight_description").stop(true, true);
            
            $("#hl_" + XmlId).animate({
                width:"205px"
            }, 200, function(){
                
                //$(this).css("behavior", "none");
                
                $("#hc_" + XmlId + " .highlight_description").css("margin-top", height + "px");
                $("#hl_" + XmlId).addClass("with_side_border");
                $("#hc_" + XmlId).css("display", "block");
                $("#hc_" + XmlId + " .highlight_preview div").css("display", "block");
                $("#hc_" + XmlId + " .highlight_preview div").animate({
                    height:"100px"
                }, 300, function(){
                    $("#hc_" + XmlId).addClass("with_shadow");
                });
                $("#hc_" + XmlId + " .highlight_description").slideDown(300, function(){
                    if(IEFlag == true) {
                        $("#ieshad_" + XmlId).css("height", $("#hc_" + XmlId).height()+5 + "px");
                        $("#ieshad_" + XmlId).css("display", "block");
                        $("#ieshad_" + XmlId).css("behavior", "url('/bitrix/templates/vw4d/js/PIE/PIE.htc')");
                    }
                });
            })
            
        }
    }
    
    /* скрыть хайлайт */
    function HideHighlight(XmlId) {

        $("#hl_" + XmlId).stop(true, true);
        $("#hc_" + XmlId).stop(true, true);
        $("#hc_" + XmlId + " .highlight_description").stop(true, true);
        
        if(IEFlag == true) {
            $("#ieshad_" + XmlId).css("behavior", "none");
            $("#ieshad_" + XmlId).css("display", "none");
        }
        else {
            $("#hc_" + XmlId).removeClass("with_shadow");
        }
        
        //if(IEFlag == true || IE9Flag == true)
            ShownXml = false;
        
        $("#hc_" + XmlId + " .highlight_preview div").animate({
            height:"0px"
        }, 200, function(){
            $(this).css("display", "none");
        });
        $("#hc_" + XmlId + " .highlight_description").animate({
            height: "0px"
        }, 300, function(){
            
            $(this).css("display", "none");
            $(this).css("height", "");
            
            $("#hc_" + XmlId).css("display", "none");
            $("#hl_" + XmlId).removeClass("with_side_border");
            $("#hl_" + XmlId).animate({
                width:WidthXml[XmlId] + "px"
            }, 300, function(){
                
                //$(this).css("behavior", "url('/bitrix/templates/vw4d/js/PIE/PIE.htc')");
                
                //if(IEFlag == false)
                //    ShownXml = false;
            });
        });
        
    }
    
    /* после переключения хайлайта нам надо добавить новые спойлеры на страницу */
    function AddHighlights(data){
        for(i in data["INFOS"]) {
            // контейнер для превью картинки и описания
            var divContainer = $('<div></div>'); 
            $(divContainer).addClass("highlight_container");
            $(divContainer).attr("id", "hc_" + data["INFOS"][i].id);
            $(divContainer).css("top", data["INFOS"][i].top - 100 + "px");
            $(divContainer).css("left", data["INFOS"][i].left + "px");                                
            
			
            // преавью картинка
            if(data["INFOS"][i]["preview"] != null) {
                var divPreview = $('<div></div>');
                $(divPreview).addClass("highlight_preview");
                var divInPreview = $("<div></div>");
                var img = new Image;
                $(img).attr("src", data["INFOS"][i]["preview"]);
                /*$(img).attr("width", data["INFOS"][i]["preview"].WIDTH);
                $(img).attr("height", data["INFOS"][i]["preview"].HEIGHT);*/
				$(img).attr("width", 204);
                $(img).attr("height", 97);				
                $(img).appendTo(divInPreview);
                $(divInPreview).appendTo(divPreview);
                $(divPreview).appendTo(divContainer);
            }
            
            // преаью текст
            if(data["INFOS"][i].description != null) {
                var divDescription = $('<div></div>');
                $(divDescription).addClass("highlight_description");
                $(divDescription).html(data["INFOS"][i].description);
                
                // ссылка "подробнее"                        
                //if(data["INFOS"][i].text !== "") {
                    
                    var p = $("<p></p>");
                    $(p).addClass("details");
                    $(p).appendTo(divDescription);
                    
                    var a = $("<a></a>");
                    $(a).addClass("forward");
                    $(a).attr("href", "#" + data["INFOS"][i].id);
                    $(a).html("Детальніше");
                    $(a).appendTo($(divDescription).find("p.details"));
                    
                    //binderHLaMore(a); // обработчик на ссылку подвесили
                //}
                
                $(divDescription).appendTo(divContainer);
            }
            
            $(divContainer).appendTo("#large_image");
            
            binderHC(divContainer); // подвешиваем обработчик на контейнер
            
            var divLink = $('<div></div>');
            $(divLink).addClass("highlight");
            $(divLink).addClass("with_shadow");
            $(divLink).attr("id", "hl_" + data["INFOS"][i].id);
            $(divLink).css("top", data["INFOS"][i].top + "px");
            $(divLink).css("left", data["INFOS"][i].left + "px");
            $(divLink).css("display", "none");
            
            if(IEFlag == true)
                $(divLink).css("behavior","url('/bitrix/templates/vw4d/js/PIE/PIE.htc')");
            
            var ieshad = $('<div></div>');
            $(ieshad).addClass("ieshad");
            $(ieshad).attr("id", "ieshad_" + data["INFOS"][i].id);
            $(ieshad).css("top", data["INFOS"][i].top - 105 + "px");
            $(ieshad).css("left", data["INFOS"][i].left + "px");    
            $(ieshad).appendTo("#large_image");
            
            $(divLink).html('<a href="#' + data["INFOS"][i].id + '">' + data["INFOS"][i].name + '</a>');
            $(divLink).appendTo("#large_image");
            binderHL(divLink);
        }
		
        /*
        if(data["HIGHLIGHTS_SECTIONS"].PROPERTY_SLOGAN_FIRST_VALUE != "")
            $("#large_image h1").html(data["HIGHLIGHTS_SECTIONS"].PROPERTY_SLOGAN_FIRST_VALUE);
        if(data["HIGHLIGHTS_SECTIONS"].PROPERTY_SLOGAN_SECOND_VALUE != "")
            $("#large_image h3").html(data["HIGHLIGHTS_SECTIONS"].PROPERTY_SLOGAN_SECOND_VALUE);
        
        if(data["HIGHLIGHTS_SECTIONS"].PROPERTY_WHITE_TEXT_VALUE != null) {
            $("#large_image h1").addClass("white");
            $("#large_image h3").addClass("white");
        }*/
        
        //Cufon.replace('.highlight a,#large_image h1, #large_image h3'); // кастомные шрифты заголовков
        $("#preloader").stop(true, true).fadeOut(100);
        
        //if(IEFlag == true || IE9Flag == true)
        SetZIndex(); // fucked up IE
    }
    
        $("#image_container").hover(function(){ // сокрытие, все из-за дурацких тормозов JS'а
        HideHighlight(ShownXml);
    }, function(){})
    
    /* раздвигалка ссылки на хайлайт + появление описания */
    var binderHL = function(divs) {
        $(divs).hover(function(){
            var XmlId = $(this).attr("id").split("hl_").join("");
            if(IEFlag == false) {
                $(".highlight").each(function(){
                    var Id = $(this).attr("id").split("hl_").join("");
                    if(Id != XmlId) {
                        HideHighlight(Id);
                    }
                })
            }
            
            var height = $(this).height() + 20; // + padding
            
            if(WidthXml[XmlId] == undefined) {
                WidthXml[XmlId] = $(this).width();
            }
         
            ShowHighlight(XmlId, height);
            
        }, function(){
            
        })
    }
    
    /* скрытие описания хайлайта */
    var binderHC = function(divs) {
        $(divs).hover(function(){
            
        }, function(){
            var XmlId = $(this).attr("id").split("hc_").join("");
            HideHighlight(XmlId);
        })
    }
    
    /* аякс запрос по ссылке "подробнее" из хайлайта и его обработка */
    var binderHLaMore = function(a) {
        $(a).click(function() {
            var xmlId = $(this).attr("href").split("#").join("");
            $.ajax({
                url: '/review.php?mode=ajax&clear_cache=Y&infoitem=' + xmlId,
                dataType: 'json',
                success: function(data) {
                    if(data != null) {
                        
                        $("#hl_details .overview_cnt").css("display", "none");
                        $("#hl_details .gallery_cnt").css("display", "none");
                        
                        $(".switch a").removeClass("forward");
                        $(".switch a").removeClass("active");
                        
                        $("#hl_details .overview_cnt .text").html("");
                        $("#hl_details .overview_cnt .text").html(data.DETAIL_TEXT);
                        $("#hl_details .overview_cnt").css("display", "block");
                        
                        $("#hl_details .top h6").html(data.NAME);
                        
                        Cufon.replace("#hl_details .top h6");
                        
                        $("#hl_details .overview_cnt .pics img").remove();
                        
                        /*for(i in data["OVERVIEW_IMAGE"]) {
                            var img = new Image();
                            $(img).attr("src", data["OVERVIEW_IMAGE"][i].SRC);
                            $(img).attr("width", data["OVERVIEW_IMAGE"][i].WIDTH);
                            $(img).attr("height", data["OVERVIEW_IMAGE"][i].HEIGHT);
                            
                            $(img).appendTo("#hl_details .overview_cnt .pics");
                        }*/
                        
                        
                        if(data["DETAIL_PICTURE"] != undefined) {
                            var img = new Image();
                            $(img).attr("src", data["DETAIL_PICTURE"].SRC);
                            $(img).attr("width", data["DETAIL_PICTURE"].WIDTH);
                            $(img).attr("height", data["DETAIL_PICTURE"].HEIGHT);
                            
                            $(img).appendTo("#hl_details .overview_cnt .pics");
                        }
                        
                        $("#hl_details .slider img").remove();
                        
                        if(data["GALLERY_IMAGE"] != undefined) {
                            $("#hl_details .slider").css("width", data["GALLERY_IMAGE"].length * 570 + "px");
                        }
                        
                        for(i in data["GALLERY_IMAGE"]) {
                            var img = new Image();
                            $(img).attr("src", data["GALLERY_IMAGE"][i].SRC);
                            $(img).attr("width", data["GALLERY_IMAGE"][i].WIDTH);
                            $(img).attr("height", data["GALLERY_IMAGE"][i].HEIGHT);
                            
                            if(i == 0)
                                $(img).addClass("sel");
                                
                            $(img).appendTo("#hl_details .gallery_cnt .slider");
                        }
                        
                        if(data["GALLERY_IMAGE"] !== undefined && data["OVERVIEW_IMAGE"] !== undefined) {
                            $(".switch").css("height", "30px");
                            $(".switch li").css("line-height", "30px");
                            $(".switch li").css("visibility", "visible");
                            $(".switch li:first a").addClass("active");
                            $(".switch li:first a").addClass("forward");
                        }
                        else {
                            $(".switch").css("height", "10px");
                            $(".switch li").css("line-height", "10px");
                            $(".switch li").css("visibility", "hidden"); 
                        }    
                        $("#hl_details").stop(true, true).fadeIn(200, function(){
                            HlDeatilsVis = true;
                        });
                    }
                }
            });
            return false;
        })
    }
    
    /* Подвесили все обработчики */
    binderHL($(".highlight"));
    binderHC($(".highlight_container"));
    //binderHLaMore($(".highlight_description a.forward"));
    
    /* --- всплывающее окно с детальным описанием хайлайта --- */
    $(".highlight a").click(function(){
        return false;
    })
    
    // Закрыть окно с детальным описанием хайлатса 
    $("#hl_details .close a").click(function(){
        $("#hl_details").stop(true, true).fadeOut(200, function(){
            HlDeatilsVis = false;
        });
        return false;
    })
    
    /* переключалка табов во всплывающем окне */
    $(".switch a").click(function(){
        $(".switch a").removeClass("forward");
        $(".switch a").removeClass("active");
        
        $(this).addClass("forward");
        $(this).addClass("active");
        
        var tab = $(this).attr("href").split("#").join("");
        $("#hl_details .cnt").css("display", "none");
        $("#hl_details ." + tab + "_cnt").css("display", "block");
        
        return false;
    })
    
    /* листалка фоток во всплывающем окне */
    var Count = 0;    // счетчик картинок
    $("a.arrow").click(function(){
        
        var TotalCount = $("#hl_details .slider img").length;
        
        var Margin = parseInt($("#hl_details .slider").css("margin-left").split("px").join(""));
        
        if($(this).hasClass("next")) { // следующая
            if(Count < TotalCount-1) {
                $("#hl_details .slider").stop(true, true).fadeOut(100, function(){
                    $("#hl_details .slider").css("margin-left",Margin-570+"px");
                    $("#hl_details .slider").fadeIn(100, function(){
                        Count++;
                    });
                })
            }    
        }
        
        if($(this).hasClass("prev")) { // предыдущая
            if(Count > 0) {
                $("#hl_details .slider").stop(true, true).fadeOut(100, function(){
                    $("#hl_details .slider").css("margin-left",Margin+570+"px");
                    $("#hl_details .slider").fadeIn(100, function(){
                        Count--;
                    });
                })
            }
        }
        
        return false;
    })
	
	$('.highlight_description a.forward').live("click", function(){
		var XmlId = $(this).parent().parent().parent().attr("id").split("hc_").join("");
        HideHighlight(XmlId);	
		var href = $(this).attr('href');
		href = href.substring(1);
		setTimeout(function(){
			showPopupOnly('reference');
			AjaxRequest.send(null, '/action/review/full_text/' , '', true, {'number': href});		
		}, 200);
		//alert(href);
		return false;
	});
    
})