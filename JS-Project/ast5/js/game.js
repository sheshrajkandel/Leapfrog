class Game{
    constructor(idname,character){
        this.idName = idname;
        this.checkCharacter = character;

        this.up = []
        this.up[0] = false;
        this.up[1] = 0;
        this.currentState = [];
        this.currentState[0] = 'menu';
        this.getGameWindow();
        this.bgImage = new Image();
        this.bgImage.src = './images/sprite.png';
        this.loopInterval = null;
        this.FPS = 60;
        this.mainLoop();
        this.scores = [];
        this.scores[0] = 0;
        this.scores[1] = 0;
        this.foreGround = new ForeGround(this.bgImage,this.context);
        this.bird = new Bird(this.bgImage,this.context,this.currentState,this.up);
        this.pipeController = new PipeController(this.bgImage, this.context, this.bird, this.scores);
    }

    
    getGameWindow(){
        this.canvas = document.getElementById(this.idName);
        this.context = this.canvas.getContext('2d');
    }

    drawBackground(){
        this.context.drawImage(this.bgImage,0,0,275,116,0,284,340,116);    
    }

    mainLoop(){
        this.loopInterval = setInterval(function(){
            this.maintainGameState();
        }.bind(this), 1000/60);
        
    }


    maintainGameState(){
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawBackground();
        this.foreGround.draw();
        switch(this.currentState[0]) {
            case 'menu':
                this.drawMenu();
                this.onMenuTap();           
              break;
            case 'play':
                this.foreGround.move();
                this.bird.draw();
                this.pipeController.createRandomPipes();
                this.pipeController.updatePipes();
                this.CheckCollision();
                this.updateScore();
                
              break;
            case 'gameOver':
                this.drawGameOver();
                this.onOverTap();
              break;
          }
    }

    drawMenu(){
        this.context.drawImage(this.bgImage,0,228,174,200,81,156,174,200);
    }

    onMenuTap(){
        if(this.up[0] ==  true){
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.currentState[0] = 'play';
            this.up[0] = false;
        }
        this.canvas.onclick = function(){
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.currentState[0] = 'play';
        }.bind(this);
    }

    keyDetect(pressedKey){
        if (pressedKey == this.checkCharacter) {
            event.preventDefault();
        
        if(this.currentState[0] == 'play'){
            this.up[0] = true;     
        }

    }
    }

    CheckCollision(){
        for(let i=0; i<this.pipeController.pipes.length; i++){
            if(this.bird.checkPipeCollision(this.pipeController.pipes[i]) == true){
                this.currentState[0] = 'gameOver';
                break;
            }
        }
    }

    drawGameOver(){
        this.context.drawImage(this.bgImage,174,228,225,202,71,156,200,202);
        if(this.scores[0]> this.scores[1]){
            this.scores[1] = this.scores[0];
        }
        this.updateHighScore();
    }

    onOverTap(){
        this.canvas.onclick = function(){
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.currentState[0] = 'play';
            this.reset(this.scores[1]);
        }.bind(this);
    }

    reset(score){
        this.up = []
        this.up[0] = false;
        this.up[1] = 0;
        this.currentState = [];
        this.currentState[0] = 'menu';
        this.loopInterval = null;
        this.FPS = 60;
        this.scores = [];
        this.scores[0] = 0;
        this.scores[1] = score;
        this.score
        this.foreGround = new ForeGround(this.bgImage,this.context);
        this.bird = new Bird(this.bgImage,this.context,this.currentState,this.up);
        this.pipeController = new PipeController(this.bgImage, this.context, this.bird, this.scores);   
    }

    updateScore(){
        this.context.font = "30px Teko";
        this.context.strokeText(this.scores[0] , 5, 25);
    }

    updateHighScore(){
        this.context.font = "25px Teko";
        this.context.strokeText(this.scores[0] , 230,250);
        this.context.strokeText(this.scores[1] , 230,290);
    }
}