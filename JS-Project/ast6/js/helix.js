class Helix {
  constructor(canvas) {
    this.ROWS = 15;
    this.COLS = 15;
    this.maxRadius = 10;
    this.currentX = 0;
    this.time = 0.01;
    this.x = 0;
    this.y = 0;
    this.colors = ['red', 'pink']
    this.colorChange = 0;

    this.canvas = document.getElementById('canvas');
    this.ctx = this.canvas.getContext('2d');
  }

  drawCircle = () => {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.beginPath();
    this.ctx.fillStyle = '#212121';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.closePath();

    this.currentX++;
    this.phase = this.currentX * this.time;

    this.colorChange++;

    for (var count = 0; count < 1; count++) {
      if (count === 0) {
        this.strandPhase = this.phase;
      } else {
        this.strandPhase = this.phase + count * Math.PI;
      }

      this.x = 0;
      this.colOffset = 0;
      this.strandPhase = this.phase + Math.PI;

      for (var rows = 0; rows < this.ROWS; rows++) {
        this.x += 30;
        this.colOffset = (rows * 2 * Math.PI) / 10;

        for (var cols = 0; cols < this.COLS; cols++) {

          this.y = this.canvas.height / 4 + cols * 20 + Math.sin(this.strandPhase + this.colOffset) * 50;
          var radiusOffset = (Math.cos(this.strandPhase - (cols * 0.1) + this.colOffset) + 1) * 0.5;
          var radius = radiusOffset * this.maxRadius;

          this.ctx.beginPath();

          setTimeout(() => {
            this.i = this.colorChange % 2;


          }, 1000);
          // var i = this.colorChange % 2;
          this.ctx.fillStyle = this.colors[this.i];
          this.ctx.arc(this.x, this.y, radius, 0, 2 * Math.PI, false);
          this.ctx.closePath();
          this.ctx.fill();

        }
      }
    }
    this.raf = requestAnimationFrame(this.drawCircle);
    setTimeout(() => {
      cancelAnimationFrame(this.raf);
    }, 10000);

  }
}

var canvas1 = new Helix();
canvas1.drawCircle();

// var canvas2 = new Helix();
// canvas2.drawCircle();