var imgWidth = 400;

var imgLength = document.getElementsByTagName("img").length;

var container = document.getElementsByClassName("carousel-container")[0];
var wrapper = container.children[0];

var wrapperWidth = imgWidth * imgLength;
wrapper.style.width = wrapperWidth + "px";

function carousel(timer) {
	var posLeft = 0;
	var imgCount = 0;

	var slideTimer = setInterval(() => slideNext(), timer);
	slideTimer;

	var btnPrev = document.createElement("button");
	function styleToBtnPrev() {
		btnPrev.innerHTML = "&lt;";
		container.append(btnPrev);
		btnPrev.setAttribute("id", "btn-prev");
		btnPrev.style.position = "absolute";
		btnPrev.style.top = "45%";
		btnPrev.style.left = "0px";
		btnPrev.style.padding = "10px";
		btnPrev.style.opacity = "0.7";
	}
	styleToBtnPrev();

	var btnNext = document.createElement("button");
	function styleToBtnNext() {
		btnNext.innerHTML = "&gt;";
		container.append(btnNext);
		btnNext.setAttribute("id", "btn-next");
		btnNext.style.position = "absolute";
		btnNext.style.top = "45%";
		btnNext.style.right = "0px";
		btnNext.style.padding = "10px";
		btnNext.style.opacity = "0.7";
	}
	styleToBtnNext();

	btnPrev.addEventListener("click", () => slidePrevious());
	btnNext.addEventListener("click", () => slideNext());

	function createIndicators(imageLength) {
		var indicators = document.createElement("ul");
		indicators.setAttribute("id", "indicators");

		for (var i = 0; i < imageLength; i++) {
			let idx = i;
			var listItem = document.createElement("li");
			styleToIndicators();
			indicators.appendChild(listItem);
			listItem.addEventListener("click", () => changeSlider(idx));
		}
		container.append(indicators);

		function styleToIndicators() {
			indicators.style.position = "absolute";
			indicators.style.bottom = "0px";
			indicators.style.textAlign = "center";
			indicators.style.width = "100%";

			listItem.style.display = "inline-table";
			listItem.style.listStyle = "none";
			listItem.style.width = "10px";
			listItem.style.height = "10px";
			listItem.style.borderRadius = "50%";
			listItem.style.border = "1px solid white";
			listItem.style.padding = "3px";
			listItem.style.marginRight = "5px";
			listItem.setAttribute("class", "active");
		}
	}

	createIndicators(imgLength);

	function slideNext() {
		if (imgCount == imgLength - 1) {
			imgCount = 0;
			shiftPrevious(0, 50);
		} else {
			imgCount++;
			var posLeftShift = -(imgWidth * imgCount);
			shiftNext(posLeftShift, 20);
		}
		handleIndicators(imgCount);
	}

	function shiftNext(left, pixel) {
		var nextSlide = setInterval(function() {
			posLeft -= pixel;
			wrapper.style.left = posLeft + "px";
		}, 15);

		setInterval(function() {
			if (posLeft > left) {
				nextSlide;
			} else {
				clearInterval(nextSlide);
			}
		}, 15);
	}

	function slidePrevious() {
		if (imgCount !== 0) {
			var posLeftShift = posLeft + imgWidth;
			shiftPrevious(posLeftShift, 20);
			imgCount--;
		} else {
			imgCount = imgLength - 1;
			var posLeftShift = -(imgCount * imgWidth);
			shiftPrevious(posLeftShift, 50);
		}
		handleIndicators(imgCount);
	}

	function shiftPrevious(left, pixel) {
		var previousSlide = setInterval(function() {
			posLeft += pixel;
			wrapper.style.left = posLeft + "px";
		}, 15);

		setInterval(function() {
			if (posLeft < left) {
				previousSlide;
			} else {
				clearInterval(previousSlide);
			}
		}, 15);
	}

	function handleIndicators(index) {
		for (var j = 0; j < imgLength; j++) {
			indicators.children[j].classList.remove("active");
		}
		indicators.children[index].setAttribute("class", "active");
		clearInterval(slideTimer);
		slideTimer = setInterval(() => slideNext(), timer);
	}

	function changeSlider(index) {
		handleIndicators(index);
		imgCount = index;
		posLeft = -(imgWidth * imgCount);
		wrapper.style.left = posLeft + "px";
	}
}
carousel(2000);
