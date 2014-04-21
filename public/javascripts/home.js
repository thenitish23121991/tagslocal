$(document).ready(function(){

var search_results_container = $('.search_results_container');

$('.search_box').bind('keyup',function(){
var term = $(this).val();
var search_data;
search_results_container.html('');
$.ajax({
url:"/searching",
type:"POST",
data:{term2:term},
success:function(data){
search_results_container.fadeIn(400);
$.each(data,function(key,value){
search_data += '<a href="/product/?product='+value['url']+'"><div class="results_container"><div class="search_result_item">'+value['name']+'</div></div></a>';
});
console.log(search_data);
search_data = search_data.replace("undefined","");
search_results_container.html(search_data);
},
error:function(xhr,status,error){
console.log(xhr+'<br/>'+status+'<br/>'+error);
}
});
});

$(window).bind('click',function(){
search_results_container.fadeOut(400);
});

var trending_container = $('.main_product');
var trending_data;
$.ajax({
url:"/trending_search",
type:"POST",
data:{},
success:function(data){
data_one = data.slice(0,5);
$.each(data_one,function(key,value){
trending_data += '<a href="/product/?product='+value['url']+'"><div class="one_product"><img src= "'+value['pic_path']+'" width="200" height="200" /><div class="product_name">'+value['name']+'</div><div class="product_desc"><a href="javascript:void(0);">Description &gt;&gt; </a ></div></div></a>';
});
console.log(trending_data);
trending_data = trending_data.replace("undefined","");
trending_container.html(trending_data);
},
error:function(xhr,status,error){
console.log(xhr+'<br/>'+status+'<br/>'+error);
}
});


$('#font_search').bind('click',function(){
var term = $('.search_box').val();
location.href = '/search/?search_term='+term;
});


});