class CarRacing {
  constructor() {
      this.FPS = 200;
      this.frameLimit = 1000 / this.FPS;

      this.backgroundWrapper = document.getElementById('background-wrapper');
      this.backgroundPosition = -1038;

      this.canvas = document.getElementById("myCanvas");
      this.ctx = this.canvas.getContext("2d");
      this.cars = [];
      this.yPos = [];
      this.xPos = [];
      this.bulletPosX = [];
      this.bulletPosY = [];
      this.bulletCount = 0;
      this.carCount = 0;

      this.score = 0;
      this.scoreBoard = document.getElementById('score');

      this.carPositionCordinate = {
          laneOne: 30,
          laneTwo:110,
          laneThree:190
      }

      this.playerPosition = this.carPositionCordinate.laneTwo;
      this.bulletPositionX = this.playerPosition + 5;
      this.playerCar;
      this.removeIndex = null;
      this.playerPositionY = this.canvas.height - 70;
      this.bulletPositionY = this.playerPositionY;
      this.collision = false;

      this.thumbImg = document.createElement('img');
      this.thumbImg.src = './images/other-car.png';
      this.thumbImg2 = document.createElement('img');
      this.thumbImg2.src = './images/player-car.png';

      this.bulletImg = document.createElement('img');
      this.bulletImg.src = './images/bullet.png';
      this.bullets = [];
      this.bulletPosX = [];
      this.bulletPosY = [];
      this.bulletCount = 0;
      this.bulletCollision = false;

      this.restartButton = document.getElementById('restart-button');

   }

  movingCarSetup = () =>{
      if (this.collision == false){
          this.moveCar();
          this.checkScore();
          this.checkCollision();
          this.removeCar();
      }
      this.generatePlayerCar();
  }

  startGame = () =>{
      this.moveBackground();
      this.thumbImg.onload = () =>{
          this.thumbImg2.onload = () =>{
              var buttonStart = document.getElementById('start-button')
              buttonStart.addEventListener('click', ()=> {
                  buttonStart.style.display = 'none';
                  this.generateCars();
                  this.generatePlayerCar();
                  this.movePlayerPosition();
                  setInterval(this.generateCars, 1000);
                  setInterval(this.movingCarSetup, this.frameLimit);
              });
          }
      }
  }

  removeCar = ( ) =>{
      if (this.removeIndex !== null){
          this.carCount -= 1;
          this.xPos.splice(this.removeIndex, 1);
          this.yPos.splice(this.removeIndex, 1);
          this.cars.splice(this.removeIndex, 1);
          this.removeIndex = null;
      }
  }

  generateCars = () =>{
      this.xPos[this.carCount] = this.generateCarPosition();
      this.yPos[this.carCount] = -50;
      this.drawCar(this.xPos[this.carCount], this.yPos[this.carCount]);
      this.carCount += 1;
  }

  moveBackground = () => {
      var moveAniCode = () => {
          this.backgroundPosition += 1;
          this.backgroundWrapper.style.backgroundPositionY = `${this.backgroundPosition}px`;
      }
      var moveAni = () => {
          if (this.collision == false) moveAniCode();
      }

      var checkEnd = () => {
          if (this.backgroundPosition < 0 ){
              moveAni
          }else{
              this.backgroundPosition = -1038;
              this.backgroundWrapper.style.backgroundPositionY = `${this.backgroundPosition}px`;
          }
      }
      setInterval(function(){
          checkEnd();
          moveAni();
      }, this.frameLimit) 
  }

  getRandomInt = (min, max) => {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.ceil(Math.random() * (max - min)) + min; 
  }

  generateCarPosition = () =>{
      var rand = this.getRandomInt(0, 3);
      if (rand == 1) return this.carPositionCordinate.laneOne;
      if (rand == 2) return this.carPositionCordinate.laneTwo;
      if (rand == 3) return this.carPositionCordinate.laneThree;
  }

  drawCar = (x, y, i) => {
      this.cars[i] = this.ctx.drawImage(this.thumbImg, x, y, 40, 60);
      this.cars[i];
  }

  moveCar = () =>{
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      for (var i=0; i<this.carCount; i++){
          this.yPos[i] += 1;
          this.drawCar(this.xPos[i], this.yPos[i], 0);
      }
  }

  checkScore = () =>{
      for (var i=0; i<this.carCount; i++){
          if (this.yPos[i] > 400) {
              this.score += 1;
              this.scoreBoard.innerHTML = 'Your Score: ' + this.score;
              this.removeIndex = i;
          }
      }
  }

  generatePlayerCar = () =>{
      this.playerCar = this.ctx.drawImage(this.thumbImg2, this.playerPosition, this.playerPositionY, 40, 60);
      //this.playerCar;
      this.generateBullet();
  }

  movePlayerPosition = () =>{
      document.onkeydown = (e) => {
          if (this.collision == false) {
              switch (e.keyCode) {
                  case 37:
                      if (this.playerPosition == this.carPositionCordinate.laneTwo) {
                        this.playerPosition = this.carPositionCordinate.laneOne;
                        //this.bulletPositionX = this.carPositionCordinate.laneOne + 5;
                        break;
                      }
                      if (this.playerPosition == this.carPositionCordinate.laneThree) {
                        this.playerPosition = this.carPositionCordinate.laneTwo;
                        //this.bulletPositionX = this.carPositionCordinate.laneTwo + 5;
                        break;
                      }

                  case 39:
                      if (this.playerPosition == this.carPositionCordinate.laneTwo) {
                        this.playerPosition = this.carPositionCordinate.laneThree;
                        //this.bulletPositionX = this.carPositionCordinate.laneThree + 5;
                        break;
                    }

                      if (this.playerPosition == this.carPositionCordinate.laneOne) {
                        this.playerPosition = this.carPositionCordinate.laneTwo;
                        //this.bulletPositionX = this.carPositionCordinate.laneTwo + 5;
                        break;
                      }

                  case 38:
                      this.generateBullet();
                      this.moveBullet();
                      this.checkBulletCollision();
                      break; 
                    }
              }
          }
      };

  checkCollision = () =>{
    // console.log('carCount: ', this.xPos[1]);
      for (var i=0; i<this.carCount; i++){
          if (this.xPos[i] < this.playerPosition + 40 &&
              this.xPos[i] + 40 > this.playerPosition &&
              this.yPos[i] < this.playerPositionY + 60 &&
              this.yPos[i] + 60 > this.playerPositionY) {
              this.collision = true;
              var overText = document.getElementById('game-over');
              overText.append(this.scoreBoard);
              overText.style.display = 'block';

              return true;
          }

          return false;
      }
  }

  generateBullet = () => {
    this.bulletPosX[this.bulletCount] = this.playerPosition;
    this.bulletPosY[this.bulletCount] = 330;
    this.drawBullet(this.bulletPosX[this.bulletCount], this.bulletPosY[this.bulletCount]);
    // console.log('bulletY: ', this.bulletPosY[this.bulletCount]);
    this.bulletCount += 1;

  }

  drawBullet = (x,y,i) => {
    this.bullets[i] = this.ctx.drawImage(this.bulletImg, x, y, 30, 40);
    console.log('Bullets: ', this.bulletPositionX[i]);
  }

  moveBullet = () => {
    for(var i=0; i<this.bulletCount; i++) {
      var intervalBullet = setInterval(() => {
        this.bulletPosY[i] -= 2;  
        this.drawBullet(this.bulletPosX[i], this.bulletPosY[i]);
      }, 50);
      
      //console.log('moveBullet: ', this.bulletPosY[i]);
      
    }
  }

  checkBulletCollision = () =>{
    for (var i=0; i<this.bulletCount; i++){
        if (this.yPos[i] < this.bulletPosY[i] + 40 &&
            this.yPos[i] + 60 > this.bulletPosY[i]) {
            this.bulletCollision = true;
            console.log('bulletCollision Test: ', this.bulletCollision);
            return true;
        }
        if(this.bulletPosY <= 0) {
          console.log('Bullet Y: ', this.bulletPosY);
        }
        return false;
    }
  }

}

var game = new CarRacing();
game.startGame();

restartGame = () => {
  document.location.reload();
}




