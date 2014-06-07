$(document).ready(function(){


var product_name = $('title').html();

var product_retailers_data = $.ajax({
url:"/get_product_remote_retailers",
type:"POST",
data:{product_name:product_name},
dataType:"json"
});

product_retailers_data.done(function(data){
var retailers_data = "No retailers found for this product";
$.each(data,function(key,value){
if(typeof(value['products']) !== "undefined"){
console.log(value['products'][0]['product_name']);
if(value['products'][0]['product_name'] == product_name){
retailers_data = '<div class="retailer_container"><div class="retailer_pic"><img src="'+value['logo_url']+'" /></div><div class="retailer_price">'+value['products'][0]['product_price']+'</div><div class="retailer_name">'+value['business_name']+'</div></div>';
}
}
});
console.log(retailers_data);
$('.tab_offline_retailers_data').html(retailers_data);
});

product_retailers_data.fail(function(data){

});

console.log('loaded');
var similar_data;
var brand = $('.brand_name').html();
brand = brand.trim();
$.ajax({
url:"/get_similar_products",
type:"POST",
data:{brand:brand},
success:function(data){
$.each(data,function(key,value){
similar_data += '<li class="standard" data-price="160"><a href="/product?product='+value['url']+'" title="'+value['name']+'"><div class="image"><img class="primary" src="'+value['pic_path']+'" alt="Lisette Dress" /><img class="secondary" src="'+value['pic_path']+'" alt="'+value['name']+'" /></div><div class="title"><h3>'+value['name']+'</h3></div><div class="more_button_div"><a href="/product/?product='+value['url']+'" class="product_more_link">More</a></div></a></li>';
});
similar_data = similar_data.replace("undefined","");
$('ul.product-list.isotope').html(similar_data);
},
error:function(xhr,status,error){
console.log(xhr+'<br/>'+status+'<br/>'+error);
}
});

$('.header_search_button').bind('click',function(e){
e.stopPropagation();
e.preventDefault();
var term = $('.header_search_box').val();
location.href = '/search/?search_term='+term+'&no=10';
});

$('.retailers_tab').bind('click',function(){
var retailer_data = "";
var name = $('.details h1').text();
$.ajax({
url:"/get_product_retailers",
type:"POST",
data:{name:name},
success:function(data){
console.log(data);
$.each(data,function(key,value){
retailer_data = '<a href="/store/'+value['url']+'"><div class="retailer_item"><div class="retailer_image"><img src="'+value['logo']+'" /></div><div class="retailer_info"><div class="retailer_title">'+value['business_name']+'</div><div class="retailer_address">'+value['street_address']+'</div></div></div></a>';
});
$('.retailer_container').html(retailer_data);
},
error:function(xhr,status,error){
console.log(xhr+'<br/>'+status+'<br/>'+error);
}
});
});


function get_remote_retailers(){
var retailer_ajax = $.ajax({
url:"/get_remote_retailers_product",
type:"POST",
dataType:"json",
data:{action:'get_remote_retailers'}
});
var retailers_data = '<div class="offline_retailer_container"><div class="offline_retailer_image"><img src="retailer_image.jpg" /></div><div class="offline_retailer_name"></div></div>';
$('.tab_offline_retailers_tab_container').html(retailers_data);
}

});