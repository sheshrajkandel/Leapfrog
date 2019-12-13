init = (canvas,ctx) => {
    console.log('hello init');
    //this.bounding = ctx.getBoundingClientRect();
    // this.offSetX = bounding.left;
    // this.offSetY = bounding.top;

    canvas.onmousedown = myDown;
    // canvas.onmouseup = myUp;
    // canvas.onmousemove = myMove;
    
}

myDown = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('hello');
}