
window.onload = function(){

function Tab(el){
this.el = el;
this.tab_options = $('ul li a.option_tab');
this.tab_content = $('.nav_list_content_container');
this.init();
}


Tab.prototype = {

init : function(){
var self = this;

self.tab_options.bind('click',function(){
var data_content = $(this).attr('data-tab');
$('button.button_name').removeClass('tab_selected');
$(this).children('button.button_name').addClass('tab_selected');
self.show_content(data_content);
});

},

show_content : function(data_content){
$('.tab_content_container').removeClass('selected');
var self = this;
var id = "#tab_"+data_content+"_content";
$(id).addClass('selected');
}

}


new Tab($('.product_options_container'));


}