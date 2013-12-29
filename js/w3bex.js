
var w3bex = {}

w3bex.init = function(){

	window.slider = new w3bexSlider({
		interval: 3,
		sliderId: "home-slider"
	});

	slider.play();

}

$(document).ready(function(){
	w3bex.init();
});

