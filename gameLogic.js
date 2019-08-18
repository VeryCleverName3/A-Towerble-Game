var c = document.getElementById("gameCanvas");
var ctx = c.getContext("2d");
c.height = window.innerHeight * (0.95);
var s = c.height;
c.width = window.innerWidth;
var d = c.width;
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
function onLoad(){
  createParticle(20);
}

onkeyup = function(e){
  keyDown[e.which] = false;
}
setInterval(update, 1000 / 60);
var counter = 0;

function update(){
  //Draw some stuff
  counter++;
  ctx.clearRect(0, 0, d, s);
  try{
    particles();
  }
  catch(e){
    console.error(e);
  }
  deadUpdate();
  movePlayer();
  doGroundStuff();
  lazerUpdate();
  tutorialText();
  keyJustPressed = [];
  collidingLeft = false;
  collidingRight = false;
  if(level == 4){
    text("Thanks for playing", s/4 * 1);
    text("By VeryCleverName", s/4 * 2);
    text("and xHayden", s/4 * 3);
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
  ctx.fillText(text, (d/2), y);
  ctx.fillStyle = "black";
}
