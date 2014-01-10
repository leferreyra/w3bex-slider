W3BEX Slider
============
W3BEX Slider is a simple and flexible html slider.

Transitions
-----------
It hasn't a all kinds of fancy transitions, just one for now. It first fades out the content of the slide, then it makes a color transition from the background color of the current template to the background color of the next template, and then it fades in the new slides' html content. All this stuff happens in a half a second.

The play class
--------------
A cool feature of the slider is that when a slide is active, a **play** class it's added to it. This allowes you to make cool stuff like transition-in objects to the slide, or animate elements in the slide whenever the slide is active. Here's an example.

```css
/* We define some transitions and attributes */
.my-first-slide h1 {
  transition: all 1s ease-in-out;
  margin-top: -100px;
  opacity: 0;
}
/* 
  Now we make the object visible and remove the margin
  so the title inside the slide will fade-in from above when
  the slide is active
*/
.my-first-slide.play h1 {
  margin-top: 0px;
  opacity: 1;
}
```
This class it's called **play** by default, but you can change it passing in the classname you want to use in the options object. More on that later.

Slider options
--------------
There are some options you could configure for now, but there will be many more. The slider initializes with this default options.
```javascript
defaults = {
	// Default number of seconds to wait for each slide
	// this could be overriden with the data-time slide option
	interval: 8,

	// This is not used yet
	sliderId: "#w3bex-slider",

	// This class is added to the slider object when initialized
	sliderClass: "w3bex-slider",

	// This is the clas it's added to the currently active slide
	activeSlideClass: "play",

	// This is the default slide color
	// this could be overriden by the data-color slide option
	slideBackgroundColor: "black"
}

// You could initialize the slider with your own options like this
myoptions = {
	slideBackgroundColor: "red",
	interval: 5
}
var myslider = new w3bexSlider(myoptions);
```

Slide options
-------------
You could set some slide specific options using data attributes right into the slide's div element. Currently there are two options:

- **data-time** - The number of seconds this particular slide will be active.
- **data-color** - The background color the slide will have.


The API
-------
There is a fairly simple list of self explanatory methods to control the slider.

```javascript
// Go to a specific slide using a 0-based index number
changeSlide(slide_n) 

// Start playing the slideshow
play()

// Stop the slideshow
stop()

// Go to the next slide
next()

// Go back to prev slide
prev()
```


ToDo
----
This is still pretty green yet, so there's lots to do.

- [ ] Add some kind of bullet slide control to allow the user to jump to a specific slide.
- [ ] Add resource preloading control.
- [ ] Add more options, and configurations.
- [ ] Add more creative examples to the demo slider.
- [ ] Dispatch some events

