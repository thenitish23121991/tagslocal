$(document).ready(function(){

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
similar_data += '<li class="standard" data-price="160"><a href="/product?product='+value['url']+'" title="'+value['name']+'"><div class="image"><img class="primary" src="'+value['pic_path']+'" alt="Lisette Dress" /><img class="secondary" src="'+value['pic_path']+'" alt="'+value['name']+'" /></div><div class="title"><h3>'+value['name']+'</h3></div></a></li>';
});
similar_data = similar_data.replace("undefined","");
$('ul.product-list.isotope').html(similar_data);
},
error:function(xhr,status,error){
console.log(xhr+'<br/>'+status+'<br/>'+error);
}
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


});