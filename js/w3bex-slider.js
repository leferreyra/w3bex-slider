
// This is the main file for the w3bexSlider
// -----------------------------------------


function w3bexSlider(options){

	// List of default options
	this.defaults = {
		interval: 8, // segs
		sliderId: "#w3bex-slider",
		sliderClass: "w3bex-slider",
		activeSlideClass: "play",
		slideBackgroundColor: "black"
	}

	this.slides = [];
	this.options = this.mergeOptions(options);
	this.currentSlide = 0;
	this.playState = false;

	this.getSlides();
	this.prepareStage();
}


w3bexSlider.prototype.mergeOptions = function(options){

	new_options = {};

	// Copying defaults array
	for (attr in this.defaults) new_options[attr]=this.defaults[attr];

	for (opt in options){
		new_options[opt] = options[opt];
	}

	return new_options;
}


w3bexSlider.prototype.getSlides = function(){

	divs = document.getElementById(this.options.sliderId).children;

	for (idx = 0; idx < divs.length; idx++){
		elem = divs[idx];
		new_slide = {
			time: elem.getAttribute('data-time'),
			color: elem.getAttribute('data-color'),
			el: elem
		}
		this.slides.push(new_slide);
	}
}


w3bexSlider.prototype.prepareStage = function(){

	slider = document.getElementById(this.options.sliderId);
	slider.innerHTML = ""; // Remove inner HTML

	this.stage = document.createElement('div');
	this.stage.setAttribute('class', 'stage');

	inner = document.createElement('div');
	inner.setAttribute('class', 'inner-content');

	slider.appendChild(this.stage);
	this.stage.appendChild(inner);

	if (this.slides.length){
		first_slide = this.slides[0].el.cloneNode();
		inner.appendChild(first_slide);
	}
}


w3bexSlider.prototype.changeSlide = function(slide_n){

	self = this;

	slide = this.slides[slide_n];
	prev_slide = this.stage.querySelector('.inner-content > div');
	inner = this.stage.querySelector('.inner-content');

	inner.style.opacity = '0';

	// Wait for transition to finish
	setTimeout(function(){
		try {
			inner.removeChild(prev_slide);
		} catch(Err){}

		new_slide = slide.el.cloneNode();
		inner.appendChild(new_slide);
		setTimeout(function(){new_slide.className ='play';}, 250);

		inner.style.opacity = '1';

		self.currentSlide = slide_n;
	}, 500);

	if (slide.color != null) {
		this.stage.style.backgroundColor = slide.color;
	}
}


w3bexSlider.prototype.play = function(){

	// Kickstart loop
	this.playState = true;
	this.resetTimeout();
}

w3bexSlider.prototype.loop = function(){

	this.next();
	this.resetTimeout();
}


w3bexSlider.prototype.stop = function(){
	this.playState = false;
	clearTimeout(this.cron);
}


w3bexSlider.prototype.resetTimeout = function(){

	self = this;
	if (this.cron) clearTimeout(this.cron);
	cs = this.slides[this.currentSlide];
	interval = (cs.time != null) ? cs.time : this.options.interval;
	this.cron = setTimeout(function(){self.loop()}, interval * 1000);
}


w3bexSlider.prototype.next = function(){

	this.currentSlide++;
	if (this.currentSlide >= this.slides.length) this.currentSlide = 0;

	this.changeSlide(this.currentSlide);
	if (this.playState) this.resetTimeout();
}


w3bexSlider.prototype.prev = function(){

	this.currentSlide--;
	if (this.currentSlide < 0) this.currentSlide = this.slides.length-1;

	this.changeSlide(this.currentSlide);
	if (this.playState) this.resetTimeout();
}
