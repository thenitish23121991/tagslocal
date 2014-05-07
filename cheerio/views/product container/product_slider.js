
function mycarousel_initCallback(carousel) {
	
	// Pause autoscrolling if the user moves with the cursor over the clip.
	carousel.clip.hover(function() {
		carousel.stopAuto();
	}, function() {
		carousel.startAuto();
	});
}



$(document).ready(function(){

$('#gallery').jcarousel({
scroll:1,horizontal:true,auto:3,wrap: 'last',
initCallback: mycarousel_initCallback
});
$('#left_icon').bind('click',function(event){
$('.jcarousel-prev-horizontal').click();
return false;

});
$('#right_icon').bind('click',function(event){
$('.jcarousel-next-horizontal').click();
return false;

});


});



