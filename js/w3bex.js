
var w3bex = {}

w3bex.init = function(){

	window.slider = new w3bexSlider({
		interval: 3,
		sliderId: "home-slider"
	});

	slider.play();

}

window.onload = function(){
	w3bex.init();
}

