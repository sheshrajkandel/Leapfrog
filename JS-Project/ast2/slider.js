var holdTime = 2000;

var container = document.getElementsByClassName('carousel-container')[0];
var carousel1 = new Carousel(container, holdTime);
carousel1.createCarousel();

var container = document.getElementsByClassName('carousel-container')[1];
var carousel2 = new Carousel(container, holdTime);
carousel2.createCarousel();

function Carousel(parentElement, holdTime) {
	var FPS = 60;
	var frameRate = 1000 / FPS;
	var imgWidth = 400;
	var mainContainer = parentElement;
	var timer = holdTime;
	var wrapper = mainContainer.children[0];
	var imgLength = wrapper.children.length;
	var posLeft = 0;
	var imgCount = 0;
	var posBegin = 0;
	var transitionSmooth = 20;
	var transitionJump = 50;

	this.createCarousel = function() {
		// slideTimer calls slideNext() in a given holdTimer interval
		this.slideTimer = setInterval(() => slideNext(), timer);
		this.slideTimer;
		setWrapperWidth();
		createBtnPrev();
		createBtnNext();
		createIndicators(imgLength);
		slideNext();
	};

	//Functions are defined here...
	function setWrapperWidth() {
		var wrapperWidth = imgWidth * imgLength;
		wrapper.style.width = wrapperWidth + 'px';
	}

	function createBtnPrev() {
		var btnPrev = document.createElement('button');
		btnPrev.innerHTML = '&lt;';
		container.append(btnPrev);
		btnPrev.setAttribute('id', 'btn-prev');
		btnPrev.style.position = 'absolute';
		btnPrev.style.top = '45%';
		btnPrev.style.left = '0px';
		btnPrev.style.padding = '10px';
		btnPrev.style.opacity = '0.7';
		btnPrev.addEventListener('click', () => slidePrevious());
	}

	function createBtnNext() {
		var btnNext = document.createElement('button');
		btnNext.innerHTML = '&gt;';
		container.append(btnNext);
		btnNext.setAttribute('id', 'btn-next');
		btnNext.style.position = 'absolute';
		btnNext.style.top = '45%';
		btnNext.style.right = '0px';
		btnNext.style.padding = '10px';
		btnNext.style.opacity = '0.7';
		btnNext.addEventListener('click', () => slideNext());
	}

	function createIndicators(imageLength) {
		this.indicators = document.createElement('ul');
		indicators.setAttribute('id', 'indicators');

		for (var i = 0; i < imageLength; i++) {
			let idx = i;
			this.listItem = document.createElement('li');
			indicators.appendChild(listItem);
			listItem.addEventListener('click', () => changeSlider(idx));

			// Setting style to indicators by calling setStyleToIndicators()
			setStyleToIndicators();
		}
		mainContainer.append(indicators);
	}

	function setStyleToIndicators() {
		indicators.style.position = 'absolute';
		indicators.style.bottom = '0px';
		indicators.style.textAlign = 'center';
		indicators.style.width = '100%';

		listItem.style.display = 'inline-table';
		listItem.style.listStyle = 'none';
		listItem.style.width = '10px';
		listItem.style.height = '10px';
		listItem.style.borderRadius = '50%';
		listItem.style.border = '1px solid white';
		listItem.style.padding = '3px';
		listItem.style.marginRight = '5px';
		listItem.setAttribute('class', 'active');
	}

	function slideNext() {
		if (imgCount == imgLength - 1) {
			imgCount = 0;
			shiftPrevious(posBegin, transitionJump);
		} else {
			imgCount++;
			var posLeftShift = -(imgWidth * imgCount);
			shiftNext(posLeftShift, transitionSmooth);
		}
		handleIndicators(imgCount);
	}

	function shiftNext(left, pixel) {
		var nextSlide = setInterval(function() {
			posLeft -= pixel;
			wrapper.style.left = posLeft + 'px';
		}, frameRate);

		setInterval(function() {
			if (posLeft > left) {
				nextSlide;
			} else {
				clearInterval(nextSlide);
			}
		}, frameRate);
	}

	function slidePrevious() {
		if (imgCount !== 0) {
			var posLeftShift = posLeft + imgWidth;
			shiftPrevious(posLeftShift, transitionSmooth);
			imgCount--;
		} else {
			imgCount = imgLength - 1;
			var posLeftShift = -(imgCount * imgWidth);
			shiftPrevious(posLeftShift, transitionJump);
		}
		handleIndicators(imgCount);
	}

	function shiftPrevious(left, pixel) {
		var previousSlide = setInterval(function() {
			posLeft += pixel;
			wrapper.style.left = posLeft + 'px';
		}, frameRate);

		setInterval(function() {
			if (posLeft < left) {
				previousSlide;
			} else {
				clearInterval(previousSlide);
			}
		}, frameRate);
	}

	function handleIndicators(index) {
		for (var j = 0; j < imgLength; j++) {
			indicators.children[j].classList.remove('active');
		}
		indicators.children[index].setAttribute('class', 'active');
		clearInterval(this.slideTimer);
		this.slideTimer = setInterval(() => slideNext(), timer);
	}

	function changeSlider(index) {
		handleIndicators(index);
		imgCount = index;
		posLeft = -(imgWidth * imgCount);
		wrapper.style.left = posLeft + 'px';
	}
}
