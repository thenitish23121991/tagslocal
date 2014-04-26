$(document).ready(function(){

var brands_arr = new Array();
var retailer_arr = new Array();
var search_arr = "";
var page = 1;
var no = 10;
var search_data = new Array();

$('.search_category_minimise').bind('click',function(){

});


$('.search_field_icon').bind('click',function(){
var search_term = $('.search_field').val();
$.ajax({
url:"/search_page",
type:"POST",
data:{search_term:search_term,page:page,no:10},
success:function(data){
$('.products_container').html('4841.gif');
console.log(data);
add_products(data);
},
error:function(xhr,status,error){
console.log(xhr+'<br/>'+status+'<br/>'+error);
}
});
});


get_product_brands();
get_product_colors();

function get_product_brands(){
var name = $('.search_field').val();

$.ajax({
url:"/get_product_brands",
type:"POST",
data:{name:name},
success:function(data){
add_brands(data);
add_colors(data);
bind_events();
},
error:function(xhr,status,error){
console.log(xhr+'b'+status+'b'+error);
}
});
}

function get_product_colors(){
var name = $('.search_field').val();

$.ajax({
url:"/get_product_colors",
type:"POST",
data:{name:name},
success:function(data){
console.log(data);
add_colors(data);
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

function add_colors(data){
var colors_data = '<ul>';
$.each(data,function(key,value){
colors_data += '<li><label class="search_brand_label"><input type="checkbox" class="search_brand_checkbox" selected="selected" />'+value+'</label></li>';
});
colors_data += '</ul>';
$('.search_category_brands').html(colors_data);
}

function add_products(data){
var products_data = "";
$.each(data,function(key,value){
products_data += '<a href="/product?product='+value['url']+'" class="search_product_new"><div class="product_item"><div class="product_pic"><img src="'+value['pic_path']+'" /></div><div class="product_info" style="color:#333;">'+value['name']+'<div class="product_info_price"><button name="product_more_button" class="product_more_button">More</button></div></div></div></a>';
});
$('.products_container').html(products_data);
$('.search_product_new').fadeIn(1000);
$('.num').html(' ('+data.length+')');
page++;
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
$('.products_container').html('<img src="/images/4841.gif" style="position:absolute;top:80%;left:50%" />');
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


$('.show_more_products_button').bind('click',function(){
console.log(page);
var page_data = "";
var search_term = $('.search_field').val();
$.ajax({
url:"/search_ajax",
type:"POST",
data:{page:page,no:no,search_term:search_term},
success:function(data){
console.log(data);
$.each(data,function(key,value){
page_data += '<a href="/product?product='+value['url']+'"><div class="product_item"><div class="product_pic"><img src="'+value['pic_path']+'" /></div><div class="product_info" style="color:#333;">'+value['name']+'<div class="product_info_price"><button name="product_more_button" class="product_more_button">More</button></div></div></div></a>';
});
$('.products_container').append(page_data);
page++;
},
error:function(xhr,status,error){
console.log(xhr+'<br/>'+status+'<br/>'+error);
}
});
});
}


});