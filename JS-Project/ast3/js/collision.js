(function() {
	var DIRECTION = [-5, -4, -3, 3, 4, 5];
	var WIDTHS = [50, 50];
	var MASS = [30, 40, 50];
	var MAXWIDTH = 600 - 140;
	var MAXHEIGHT = 500 - 140;
	var COLORS = [
		'red',
		'green',
		'blue',
		'yellow',
		'orange',
		'black',
		'#C0C0C0',
		'purple',
		'olive'
	];

	function randomNumber(min, max) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min)) + min;
	}

	function Box(parentElement, radius) {
		this.parentElement = parentElement;
		this.boxX = 0;
		this.boxY = 0;
		this.index = randomNumber(0, COLORS.length);
		this.mass = MASS[this.index];
		this.dx = 0;
		this.dy = 0;
		this.radius = radius;

		this.create = function() {
			this.boxX = randomNumber(0, MAXWIDTH);
			this.boxY = randomNumber(0, MAXHEIGHT);
			this.boxElement = document.createElement('div');
			this.boxElement.style.height = this.radius + 'px';
			this.boxElement.style.width = this.radius + 'px';
			this.boxElement.classList.add('BoxStyle');

			this.boxElement.style.backgroundColor = COLORS[this.index] + '';
			this.boxElement.style.left = this.boxX + 'px';
			this.boxElement.style.top = this.boxY + 'px';

			this.parentElement.appendChild(this.boxElement);
		};

		this.setDirection = function(a, b) {
			this.dx = DIRECTION[a];
			this.dy = DIRECTION[b];
		};

		this.reverseXDirection = function() {
			this.dx *= -1;
		};

		this.reverseYDirection = function() {
			this.dy *= -1;
		};

		this.changeVelocity = function(box) {
			var change1 = this.dx * (this.radius / box.radius);
			this.dx = box.dx * (box.radius / this.radius);

			box.dx = change1;

			change1 = this.dy * (this.radius / box.radius);
			this.dy = box.dy * (box.radius / this.radius);
			box.dy = change1;

			this.move();
			box.move();
		};

		this.draw = function() {
			this.boxElement.style.left = this.boxX + 'px';
			this.boxElement.style.top = this.boxY + 'px';
		};

		this.move = function() {
			this.boxX += this.dx;
			this.boxY += this.dy;
			this.draw();
		};

		this.isXWallCollision = function() {
			if (this.boxX + 2 * this.radius >= 650 || this.boxX <= 0) {
				return true;
			} else {
				return false;
			}
		};

		this.isYWallCollision = function() {
			if (this.boxY + 2 * this.radius >= 550 || this.boxY <= 0) {
				return true;
			} else {
				return false;
			}
		};
	}

	function Game(parentElement, boxCount) {
		this.parentElement = parentElement;
		this.noOfBoxes = boxCount;
		this.boxes = [];

		this.createBoxes = function() {
			for (var i = 0; i < this.noOfBoxes; i++) {
				var randWidth = randomNumber(0, WIDTHS.length);
				var box = new Box(this.parentElement, WIDTHS[randWidth]);
				box.create();
				var rand1 = randomNumber(2, 5);
				var rand2 = randomNumber(2, 5);
				box.setDirection(rand1, rand2);
				this.boxes.push(box);
			}
			setInterval(this.moveBoxes.bind(this), 50);
		};

		this.detectCollision = function(box1, box2) {
			var radiusSum = box1.radius / 2 + box2.radius / 2;
			var x1 = box1.boxX + box1.radius / 2;
			var x2 = box2.boxX + box2.radius / 2;
			var y1 = box1.boxY + box1.radius / 2;
			var y2 = box2.boxY + box2.radius / 2;
			var distance = (x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2);
			var radiusSquare = radiusSum * radiusSum;

			if (distance <= radiusSquare) {
				console.log(true);
				return true;
			} else {
				return false;
			}
		};

		this.detectAllCollision = function() {
			for (var k = 0; k < this.boxes.length; k++) {
				for (var j = 0; j < this.boxes.length; j++) {
					if (k != j) {
						if (this.detectCollision(this.boxes[k], this.boxes[j])) {
							this.boxes[k].changeVelocity(this.boxes[j]);
						}
					}
				}
			}
		};

		this.moveBoxes = function() {
			for (var i = 0; i < this.noOfBoxes; i++) {
				if (this.boxes[i].isXWallCollision()) {
					this.boxes[i].reverseXDirection();
				}
				if (this.boxes[i].isYWallCollision()) {
					this.boxes[i].reverseYDirection();
				}
				this.boxes[i].move();
			}
			this.detectAllCollision();
		};
	}

	var parentElement = document.getElementById('app');
	new Game(parentElement, 10).createBoxes();
})();
