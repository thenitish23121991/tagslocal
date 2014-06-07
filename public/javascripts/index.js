
$(document).ready(function(){

$('#font_search, .header_search_button').bind('click',function(){
console.log('done');
var term = $('.search_box').val();
location.href = '/search/?search_term='+term+'&no=10';
});


$('.select_city').bind('click',function(e){
e.stopPropagation();
$('.select_city').css({
'height' : '164px'
});
});


$(document).bind('click',function(e){
$('.select_city').css({
'height' : '22px'
});
});


$('.select_city_option').bind('click',function(e){
e.stopPropagation();
e.preventDefault();
var placeholder = $(this).text();
$('span.select_city_placeholder').html(placeholder);
$('.select_city').css({
'height' : '22px'
});
});


});