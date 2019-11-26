var imgWidth = 400;

var imgLength = document.getElementsByTagName("img").length;
//console.log("Image Count: ", imgLength);

var container = document.getElementsByClassName("carousel-container")[0];
var wrapper = container.children[0];
//console.log("Wrapper: ", wrapper);

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

	btnNext.addEventListener("click", () => slideNext());

	function slideNext() {
		if (imgCount == imgLength - 1) {
			imgCount = 0;
			shiftPrevious(0, 50);
		} else {
			imgCount++;
			var shiftPosLeft = -(imgWidth * imgCount);
			shiftNext(shiftPosLeft, 20);
		}
	}

	function shiftNext(left, pixel) {
		var nextSlide = setInterval(function() {
			posLeft -= pixel;
			console.log("posLeft: ", posLeft);
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

	function shiftPrevious(left, pixel) {
		var previousSlide = setInterval(function() {
			posLeft += pixel;
			console.log("posLeft -Prev: ", posLeft);
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
}
carousel(5000);
