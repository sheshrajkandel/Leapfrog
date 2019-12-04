class ForeGround{
    constructor(bgImage,context){
        this.context = context;
        this.image = bgImage;
        this.sX = 276;
        this.sY = 0;
        this.cropwidth = 224;
        this.cropheight = 112;
        this.x = 0;
        this.y = 400;
        this.width = 224;
        this.height = 112;
        this.dx = 1;
    }

    draw(){
        this.context.drawImage(this.image,this.sX,this.sY,this.cropwidth,this.cropheight,this.x,this.y,this.width,this.height);
        this.context.drawImage(this.image,this.sX,this.sY,this.cropwidth,this.cropheight,this.x + this.cropwidth,this.y,this.width,this.height);
    }

    move(){
        this.x = (this.x - this.dx) % (this.width/2);
    }
}