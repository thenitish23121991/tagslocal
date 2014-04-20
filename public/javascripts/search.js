$(document).ready(function(){

var brands_arr = new Array();
var retailer_arr = new Array();

$('.search_category_minimise').bind('click',function(){

});


get_product_brands();

function get_product_brands(){
var name = $('.search_field').val();

$.ajax({
url:"/get_product_brands",
type:"POST",
data:{name:name},
success:function(data){
add_brands(data);
bind_events();
},
error:function(xhr,status,error){
console.log(xhr+'b'+status+'b'+error);
}
});
}


function add_brands(data){
var brands_data = '<ul>';
$.each(data,function(key,value){
brands_data += '<li><label class="search_brand_label"><input type="checkbox" class="search_brand_checkbox" selected="selected" />'+value+'</label></li>';
});
brands_data += '</ul>';
$('.search_category_brands').html(brands_data);
}

function add_products(data){
var products_data = "";
$.each(data,function(key,value){
products_data += '<a href="/product?product='+value['url']+'"><div class="product_item"><div class="product_pic"><img src="'+value['pic_path']+'" /></div><div class="product_info" style="color:#333;">'+value['name']+'<div class="product_info_price"><button name="product_more_button" class="product_more_button">More</button></div></div></div></a>';
});
$('.products_container').html(products_data);
$('.num').html(' ('+data.length+')');
}




function search_filter(brands_arr,retailer_arr){
$('.product_container').html('/images/498.gif');
var term = $('.search_field').val();
var request = $.ajax({
url:"/search_filter",
type:"POST",
data:{brands_arr:brands_arr,retailer_arr:retailer_arr,term:term},
success:function(data){
console.log(data.length);
add_products(data);
/*
$.each(data,function(key,value){
console.log(value.brand);
});
*/
},
error:function(xhr,status,error){
console.log(xhr+'b'+status+'b'+error);
}
});

}


function bind_events(){

$('.search_brand_checkbox').bind('change',function(){
var text = $(this).parent().text();
console.log(text);
if($(this).is(":checked")){
brands_arr.push(text);
}else{
var index = brands_arr.indexOf(text);
if(index != -1){
brands_arr.splice(index,1);

}
}
search_filter(brands_arr,retailer_arr);
console.log(brands_arr);
});

$('.search_retailer_checkbox').change(function(){
var text = $(this).parent().text();
console.log(text);
if($(this).is(":checked")){
retailer_arr.push(text);
}else{
var index = retailer_arr.indexOf(text);
if(index != -1){
retailer_arr.splice(index,1);
}
}
search_filter(brands_arr,retailer_arr);
console.log(retailer_arr);
});

}


});