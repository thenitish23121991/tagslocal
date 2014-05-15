
window.onload = function(){

function Tab(el){
this.el = el;
this.tab_options = el.children('ul li.option_tab');
this.tab_content = el.children('.tab_content');
this.init();
}


Tab.prototype = {

init : function(){
var self = this;

self.tab_options.bind('click',function(){
var data_content = $(this).attr('data-content');
this.show_content(data_content);
});

},

show_content : function(data_content){
console.log(data_content);
var self = this;
var content = $("#"+data_content).html();
self.tab_content.html(content);
}

}


new Tab($('.product_options_container'));


}