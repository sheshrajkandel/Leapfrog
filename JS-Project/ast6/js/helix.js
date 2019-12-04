class Helix {
  constructor() {
    this.ROWS = 5;
    this.COLS = 5;
    this.maxRadius = 10;
    this.radius = 10;
    this.frameCount = 0;
    this.height = 100;
    this.width = 100;
    this.time = 0;
    this.x = 0;
    this.y = 0;


    this.canvas = document.getElementById('canvas');
    this.ctx = canvas.getContext('2d');

  }

  drawCircle = () => {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.beginPath();
    this.ctx.fillStyle = '#dd00ee';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.time += 0.03;
    for (var rows = 0; rows < this.ROWS; rows++) {
      // this.x += 50;
      for (var cols = 0; cols < this.COLS; cols++) {
        this.x = this.canvas.height / 2 + Math.sin(this.time) * this.canvas.height / 4;
        this.y = this.canvas.height / 2 + Math.sin(this.time) * this.canvas.height / 4;
        this.radius = 12 + Math.sin(this.time) * this.maxRadius;
        this.width = Math.sin(this.time) * 50;
        this.height = Math.sin(this.time) * 50;

        this.ctx.fillStyle = '#454545'
        this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
        this.ctx.fill();
      }
    }


    console.log('Hello', this.y);
    requestAnimationFrame(this.drawCircle);

  }

  // this.ctx.beginPath();
  // this.ctx.fillStyle = '#dd00ee';
  // this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  // this.ctx.arc(x, y, this.RADIUS, 0, 2 * Math.PI);
  // this.ctx.stroke();
  //console.log(this.NUM_CIRCLES++);

}

var objHelix = new Helix();
objHelix.drawCircle();