var c = document.getElementById("gameCanvas");
var ctx = c.getContext("2d");
c.height = window.innerHeight * (0.95);
var s = c.height;
c.width = s;
ctx.font = "80px Grenze";
ctx.textAlign = "center";
var level = 1;
var spawnX = 0.5 * s;
var spawnY = s;
var deadDudes = [];
var keyDown = [];
var keyJustPressed = [];
var collidingLeft = false;
var collidingRight = false;
var ground = [];

onkeydown = function(e){
  console.log(e.which);
  keyDown[e.which] = true;
  keyJustPressed[e.which] = true;
}

onkeyup = function(e){
  keyDown[e.which] = false;
}

setInterval(update, 1000 / 60);
var counter = 0;

function update(){
  //Draw some stuff
  counter++;
  ctx.clearRect(0, 0, s, s);
  doGroundStuff();
  tutorialText()
  deadUpdate();
  movePlayer();
  lazerUpdate();
  keyJustPressed = [];
  collidingLeft = false;
  collidingRight = false;
  if(level == 4){
    text("Thanks for playing", 400);
    text("By VeryCleverName", 600);
    text("and xHayden", 670);
  }
}

function tutorialText(){
  if(counter < 250){
    text("Avoid the lazers", 620);
    text("and make it to the portal", 690);
  }
}
var velocityY = 0;
var onGround = false;
var numJumps = 0;

function text(text, y){
  ctx.fillStyle = "grey";
  ctx.fillText(text, (s/2), y);
  ctx.fillStyle = "black";
}
