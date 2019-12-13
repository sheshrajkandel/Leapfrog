Zombie.prototype.draw = function () {
  var imgZombie = new Image();
  imgZombie.src = './images/zombie.png';

  ctx.drawImage(imgZombie, 0, 0, imgZombie.width, imgZombie.height, this.x - this.w / 2, this.y - this.h, this.w, this.h);
  
  //Display zombie helth
  ctx.font = '16px Arial';
  ctx.fillStyle = '#fff';
  ctx.fillText(this.health, this.x - 10, this.y - 20);
}