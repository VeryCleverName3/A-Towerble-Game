var c = document.getElementById("gameCanvas");
var ctx = c.getContext("2d");

c.height = window.innerHeight;
var s = c.height;
c.width = s;

var p = {x: .5 * s, y: .5 * s, isDead: false};
var deadDudes = [];
var keyDown = [];

onkeydown = function(e){
  keyDown[e.which] = true;
}

onkeyup = function(e){
  keyDown[e.which] = false;
}

setInterval(update, 1000 / 60);

function spawn(p){
  ctx.fillRect(p.x, p.y, 50, 50);
}

function update(){
  //Draw some stuff
  ctx.clearRect(0, 0, s, s);
  ctx.fillRect(p.x - 25, p.y - 50, 50, 50);
  movePlayer();


  if(p.isDead){
    deadDudes.push(p);
    p.isDead = false;
  }
}

function movePlayer(){
  var speed = .025 * s;
  if(!p.isDead){
    if(keyDown[65]){
      p.x -= speed;
    }
    if(keyDown[68]){
      p.x += speed;
    }
  }
}

function die(){
  p.isDead = true;
}
