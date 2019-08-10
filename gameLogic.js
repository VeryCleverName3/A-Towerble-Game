var c = document.getElementById("gameCanvas");
var ctx = c.getContext("2d");

c.height = window.innerHeight * (0.95);
var s = c.height;
c.width = s;

var p = {x: .5 * s, y: s, isDead: false};
var deadDudes = [];
var keyDown = [];
var keyJustPressed = [];

var ground = [];

function makeGround(x1, x2, y1, y2){
  this.x1 = x1;
  this.x2 = x2;
  this.y1 = y1;
  this.y2 = y2;
}

onkeydown = function(e){
  console.log(e.which);
  keyDown[e.which] = true;
  keyJustPressed[e.which] = true;
}

onkeyup = function(e){
  keyDown[e.which] = false;
}

setInterval(update, 1000 / 60);

/*function spawn(p){
  ctx.fillRect(p.x, p.y, 50, 50);
}
*/
function update(){
  //Draw some stuff
  ctx.clearRect(0, 0, s, s);
  ctx.fillRect(p.x - (((0.05 * s) / 2)), p.y - (((0.05 * s))), 0.05 * s, 0.05 * s);
  movePlayer();
  lazerUpdate();


  if(p.isDead){
    deadDudes.push(p);
    p.isDead = false;
  }
  keyJustPressed = [];
}

var velocityY = 0;
var onGround = false;
var numJumps = 0;

function movePlayer(){
  var speed = 0.01 * s;
  velocityY += 0.0005 * s;
  var jumpSpeed = .015 * s;

  if(p.y < s){
    p.y += velocityY;
    onGround = false;
  }
  else {
    p.y = s;
    velocityY = 0;
    onGround = true;
    numJumps = 1
  }
  if(!p.isDead){
    if(keyDown[65]){
      p.x -= speed;
    }
    if(keyDown[68]){
      p.x += speed;
    }
    if((keyJustPressed[32] || keyJustPressed[87]) && onGround){
      velocityY = -jumpSpeed;
      p.y -= 0.005 * s;
    } else if((keyJustPressed[32] || keyJustPressed[87]) && numJumps > 0){
      numJumps--;
      velocityY = -jumpSpeed;
      p.y -= 0.005 * s;
    }
  }
}

function die(){
  p.isDead = true;
}
var lazerList = [];
function createLazer(){
    var lazer = {x: 0, y: -0 * s, isDead: false};
    lazerList.push(lazer);
}
  function lazerUpdate(){
    lazerSpeed = 0.005 * s;
    for(var i = 0; i < lazerList.length; i++){
      ctx.fillStyle = "#FF0000";
      ctx.fillRect(lazerList[i].x, lazerList[i].y, s, 20);
      lazerList[i].y += lazerSpeed;
      ctx.fillStyle = "#000000";
    }
}
