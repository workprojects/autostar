function cart_invoke(id){
	var height = $(document).height(); 
	var count = $("#shoporder_count_"+id).val();
	
	//cart_product_link_update(id, 'off');     
	//$('#bg_layer').css({"height": height});
	//$('#bg_layer').show();  
	
	AjaxRequest.send(null, '/action/shoporder/cart_advanced_push/', 'Добавление...', true, {'product_id':id, 'count':count});
	return false;
}

function cart_hide() {
	//location.reload();
	$('#bg_layer').html('&nbsp;');  
	$('#cart_layer').html('&nbsp;'); 
	$('#bg_layer').hide();  
	$('#cart_layer').hide(); 
	return false;
} 

function cart_invoke(id){
    var height = $(document).height(); 
    var count = $("#shoporder_count_"+id).val();
    
    cart_product_link_update(id, 'off');     
    $('#bg_layer').css({"height": height});
    $('#bg_layer').show();  
    
    AjaxRequest.send(null, '/action/shoporder/cart_advanced_push/', 'Добавление...', true, {'product_id':id, 'count':count});
    return false;
}
	
function cart_product_link_update(id, switch_status){
	if(switch_status == 'on'){
		$('#cart_link_'+id).replaceWith('<a id="cart_link_'+id+'" href="javascript:void(0);" onclick="cart_invoke('+id+');"><img src="/img/shop/inbasket.gif" alt="Купить"/></a>'); 	
	} else {
		$('#cart_link_'+id).replaceWith('<a id="cart_link_'+id+'" href="javascript:void(0);"><img src="/img/shoporder/checked.png" alt="В корзине"/></a>'); 	 
	}
}
function cart_delete(id){
	AjaxRequest.send(null, '/action/shoporder/cart_advanced_pop/', 'Удаление...', true, {'id':id});
	return false;
} 
function cart_delete_all(){
	AjaxRequest.send(null, '/action/shoporder/cart_advanced_pop_all/', 'Удаление...', true, {});
	return false;
} 
function cartOrderHandler(action){
	AjaxRequest.form('cart_order', 'Подождите...', {'action':action});
}