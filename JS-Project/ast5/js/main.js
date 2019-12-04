var newGame = new Game('canvas',' ');
var newGame2 = new Game('canvas2',' ');
document.onkeydown = function(event){
    var pressedKey = event.key;
    newGame.keyDetect(pressedKey);
    newGame2.keyDetect(pressedKey);

};