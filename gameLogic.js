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

var p = {
  x: .5 * s,
  y: s,
  isDead: false,
  top: function(){
    return this.y - (((0.05 * s)));
  },
  bottom: function(){
    return this.y;
  },
  left: function(){
    return this.x - (((0.05 * s) / 2));
  },
  right: function(){
    return this.x + (((0.05 * s) / 2));
  },
  centerY: function(){
    return this.y - (((0.05 * s) / 2));
  },
  centerX: function(){
    return this.x;
  }
};
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
  ctx.fillStyle = "#0000FF";
  ctx.fillRect(p.x - (((0.05 * s) / 2)), p.y - (((0.05 * s))), 0.05 * s, 0.05 * s);
  ctx.fillStyle = "black";
  tutorialText()
  deadUpdate();
  movePlayer();
  lazerUpdate();
  keyJustPressed = [];
  collidingLeft = false;
  collidingRight = false;
  if(level == 4){
    text("Thanks for playing", 400);
    text("By VeryCleverName and xHayden", 600);
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

function movePlayer(){
  var speed = 0.01 * s;
  velocityY += 0.0005 * s;
  var jumpSpeed = .015 * s;

  if(p.y < s){
    p.y += velocityY;
  }
  else {
    p.y = s;
    velocityY = 0;
    onGround = true;
    numJumps = 1;
  }
  if(!p.isDead){
    if(keyDown[65] && !collidingLeft){
      p.x -= speed;
    }
    if(keyDown[68] && !collidingRight){
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
  onGround = false;
}

function die(){
  p.isDead = true;
  if(p.isDead){
    var deadDude = {
      x: p.x,
      y: p.y,
      velocityY: 0,
      top: function(){
        return this.y - (((0.05 * s)));
      },
      bottom: function(){
        return this.y;
      },
      left: function(){
        return this.x - (((0.05 * s) / 2));
      },
      right: function(){
        return this.x + (((0.05 * s) / 2));
      },
      centerY: function(){
        return this.y - (((0.05 * s) / 2));
      },
      centerX: function(){
        return this.x;
      },
      collide: function(){

        if(Math.abs(p.centerY() - this.centerY()) > Math.abs(p.x - this.centerX())){
          //vertical stuff
          if((p.bottom() >= this.top() && p.top() <= this.top()) && ((p.left() <= this.right() && p.left() >= this.left()) || (p.right() <= this.right() && p.right() >= this.left()))){
            p.y = this.top();
            velocityY = 0;
            onGround = true;
            numJumps = 1;
          }
          else if((p.top() <= this.bottom() && p.bottom() >= this.bottom()) && ((p.left() <= this.right() && p.left() >= this.left()) || (p.right() <= this.right() && p.right() >= this.left()))){
            p.y = this.bottom() + (((0.05 * s)));
            velocityY = 0;
          }
        } else {

          //horizontal stuff
          if((p.right() > this.left() && p.left() <= this.left()) && ((p.top() <= this.bottom() && p.top() >= this.top()) || (p.bottom() <= this.bottom() && p.bottom() >= this.top()))){
            p.x = this.left() - (((0.05 * s)) / 2);
          }
          else if((p.left() < this.right() && p.right() >= this.right()) && ((p.top() <= this.bottom() && p.top() >= this.top()) || (p.bottom() <= this.bottom() && p.bottom() >= this.top()))){
            p.x = this.right() + (((0.05 * s)) / 2);
          }
        }
      },
      fall: function(){
        this.velocityY += 0.0005 * s;
        if(this.y < s){
          this.y += this.velocityY;
        } else {
          this.y = s;
          this.velocityY = 0;
        }
        for(var i = 0; i < ground.length; i++){
          if((this.bottom() >= ground[i].top() && this.top() <= ground[i].top()) && ((this.left() <= ground[i].right() && this.left() >= ground[i].left()) || (this.right() <= ground[i].right() && this.right() >= ground[i].left()))){
            this.y = ground[i].top();
            this.velocityY = 0;
          }
        }
        for(var i = 0; i < deadDudes.length; i++){
          if(deadDudes[i] != this){
            if((this.bottom() >= deadDudes[i].top() && this.top() <= deadDudes[i].top()) && ((this.left() <= deadDudes[i].right() && this.left() >= deadDudes[i].left()) || (this.right() <= deadDudes[i].right() && this.right() >= deadDudes[i].left()))){
              this.y = deadDudes[i].top();
              this.velocityY = 0;
            }
          }
        }
      }
  }
  deadDudes.push(deadDude);
  p.isDead = false;
  p.x = spawnX;
  p.y = spawnY;
  }

}
function deadUpdate(){
    for(i = 0; i < deadDudes.length; i++){



        ctx.fillRect((deadDudes[i].x - (0.05 * s) / 2), (deadDudes[i].y - (0.05 * s)), 0.05 * s, 0.05 * s);
        deadDudes[i].collide();
        deadDudes[i].fall();
    }
}
var lazerList = [];
function createLazer(type){
    if(type == "r"){
      var lazer = {x: s, y: 0 * s, h: s, w: 20, type: "r", isDead: false};
      //Starts from right
    }
    else if(type == "l"){
      var lazer = {x: 0, y: 0 * s, h: s, w: 20, type: "l", isDead: false};
      //Starts from left
    }
    else if(type == "d"){
      var lazer = {x: 0, y: s, h: 20, w: s, type: "d", isDead: false};
      //Starts from bottom
    }
    else if(type == "u"){
      //Starts from top
      var lazer = {x: 0, y: 0 * s, h: 20, w: s, type: "u", isDead: false};
    }
    else{
      console.log("Lazer type not specified (r, l, u, or d)");
    }
    lazerList.push(lazer);
  }
  function lazerUpdate(){
    lazerSpeed = 0.005 * s;
    for(var i = 0; i < lazerList.length; i++){
      ctx.fillStyle = "#FF0000";
      ctx.fillRect(lazerList[i].x, lazerList[i].y, lazerList[i].w, lazerList[i].h);
      if(lazerList[i].type == "r"){
          lazerList[i].x -= lazerSpeed;
          horizontal();
      }
      else if(lazerList[i].type == "l"){
          lazerList[i].x += lazerSpeed;
          horizontal();
      }
      else if(lazerList[i].type == "d"){
          lazerList[i].y -= lazerSpeed;
          vertical();
      }
      else if(lazerList[i].type == "u"){
          lazerList[i].y += lazerSpeed;
          vertical();
      }
      ctx.fillStyle = "#0000FF";
    }
    function vertical(){
      if(lazerList[i].y >= p.top() && lazerList[i].y <= p.bottom()){
        die();
        lazerList.pop(lazerList[i]);
      }
    }
    function horizontal(){
      if(lazerList[i].x >= p.left() && lazerList[i].x <= p.right()){
        die();
        lazerList.pop(lazerList[i]);
      }
    }
}

function Ground(x, y, w, l){
  this.x = x;
  this.y = y;
  this.w = w;
  this.l = l;
  this.draw = function(){
    ctx.fillStyle = "black";
    ctx.fillRect(this.x, this.y, this.w, this.l);
  }
  this.top = function(){
    return this.y;
  }
  this.bottom = function(){
    return this.y + this.l;
  }
  this.left = function(){
    return this.x;
  }
  this.right = function(){
    return this.x + this.w;
  }
  this.centerY = function(){
    return this.y + (l / 2);
  }
  this.centerX = function(){
    return this.x + (w / 2);
  }
  this.collide = function(){

    if(Math.abs(p.centerY() - this.centerY()) > Math.abs(p.x - this.centerX())){
      //vertical stuff
      if((p.bottom() >= this.top() && p.top() <= this.top()) && ((p.left() < this.right() && p.left() > this.left()) || (p.right() < this.right() && p.right() > this.left()))){
        p.y = this.top();
        velocityY = 0;
        onGround = true;
        numJumps = 1;
      }
      else if((p.top() <= this.bottom() && p.bottom() >= this.bottom()) && ((p.left() < this.right() && p.left() > this.left()) || (p.right() < this.right() && p.right() > this.left()))){
        p.y = this.bottom() + (((0.05 * s)));
        velocityY = 0;
      }
    } else {

      //horizontal stuff
      if((p.right() > this.left() && p.left() <= this.left()) && ((p.top() < this.bottom() && p.top() > this.top()) || (p.bottom() < this.bottom() && p.bottom() > this.top()))){
        p.x = this.left() - (((0.05 * s)) / 2);
      }
      else if((p.left() < this.right() && p.right() >= this.right()) && ((p.top() < this.bottom() && p.top() > this.top()) || (p.bottom() < this.bottom() && p.bottom() > this.top()))){
        p.x = this.right() + (((0.05 * s)) / 2);
      }
    }
  }
}

function doGroundStuff(){
  for(var i = 0; i < ground.length; i++){
    ground[i].draw();
    ground[i].collide();
  }
}
var lazerLoop;
function makeLevel(n){
  clearInterval(lazerLoop);
  p.x = 0.5 * s;
  p.y = s;
  ground = [];
  deadDudes = [];
  if(n == 1){
    lazerLoop = setInterval(function(){createLazer("u");}, 6000);
    ground.push(new Ground(0.5 * s, 0.5 * s, 0.1 * s, 0.1 * s));
    ground.push(new Ground(0.6 * s, 0.5 * s, 0.1 * s, 0.1 * s));
    ground.push(new Ground(0.7 * s, 0.5 * s, 0.1 * s, 0.1 * s));
    ground.push(new Ground(0.8 * s, 0.5 * s, 0.1 * s, 0.1 * s));
    ground.push(new Ground(0.9 * s, 0.5 * s, 0.1 * s, 0.1 * s));
    ground.push(new Portal(0, 0, 0.1 * s, 0.1 * s));
  }
  else if(n == 2){
    p.x = 0.9 * s;
    spawnX = 0.9 * s;
    p.y = s;
    lazerLoop = setInterval(function(){createLazer("r");}, 6000);
    ground.push(new Portal(0, 0, 0.1 * s, 0.1 * s));
    ground.push(new Ground(0.5 * s, 0.3 * s, 0.1 * s, 0.1 * s));
    ground.push(new Ground(0.6 * s, 0.3 * s, 0.1 * s, 0.1 * s));
    ground.push(new Ground(0.7 * s, 0.3 * s, 0.1 * s, 0.1 * s));
    ground.push(new Ground(0.8 * s, 0.3 * s, 0.1 * s, 0.1 * s));
    ground.push(new Ground(0.9 * s, 0.3 * s, 0.1 * s, 0.1 * s));
    ground.push(new Ground(0.7 * s, 0.9 * s, 0.1 * s, 0.1 * s));
    ground.push(new Ground(0.7 * s, 0.8 * s, 0.1 * s, 0.1 * s));
    ground.push(new Ground(0.7 * s, 0.7 * s, 0.1 * s, 0.1 * s));
    ground.push(new Ground(0.7 * s, 0.6 * s, 0.1 * s, 0.1 * s));
    ground.push(new Ground(0.7 * s, 0.5 * s, 0.1 * s, 0.1 * s));

    ground.push(new Ground(0.5 * s, 0.5 * s, 0.1 * s, 0.1 * s));
    ground.push(new Ground(0.6 * s, 0.5 * s, 0.1 * s, 0.1 * s));
    ground.push(new Ground(0.7 * s, 0.5 * s, 0.1 * s, 0.1 * s));
    ground.push(new Ground(0.8 * s, 0.5 * s, 0.1 * s, 0.1 * s));
    ground.push(new Ground(0.3 * s, 0.5 * s, 0.1 * s, 0.1 * s));
    ground.push(new Ground(0.4 * s, 0.5 * s, 0.1 * s, 0.1 * s));
    ground.push(new Ground(0.2 * s, 0.3 * s, 0.1 * s, 0.1 * s));
    ground.push(new Ground(0.3 * s, 0.3 * s, 0.1 * s, 0.1 * s));
    ground.push(new Ground(0.4 * s, 0.3 * s, 0.1 * s, 0.1 * s));
  }
  else if(n == 3){
    lazerLoop = setInterval(function(){createLazer("l");}, 10000);
    lazerLoop = setInterval(function(){createLazer("r");}, 6000);
    lazerLoop = setInterval(function(){createLazer("u");}, 4000);
    p.x = 0.9 * s;
    p.y = s;
    ground.push(new Portal(100, 100, 0.1 * s, 0.1 * s));
    ground.push(new Ground(0.5 * s, 0.5 * s, 0.1 * s, 0.1 * s));
    ground.push(new Ground(0.6 * s, 0.5 * s, 0.1 * s, 0.1 * s));
    ground.push(new Ground(0.7 * s, 0.5 * s, 0.1 * s, 0.1 * s));
    ground.push(new Ground(0.8 * s, 0.5 * s, 0.1 * s, 0.1 * s));
    ground.push(new Ground(0.9 * s, 0.5 * s, 0.1 * s, 0.1 * s));
  }
  else if(n == 4){
    lazerLoop = setInterval(function(){createLazer("l");}, 10000);
    lazerLoop = setInterval(function(){createLazer("r");}, 6000);
    lazerLoop = setInterval(function(){createLazer("u");}, 4000);
    p.x = 0.9 * s;
    p.y = s;
  }
}

function Portal(x, y, w, l){
  this.x = x;
  this.y = y;
  this.w = w;
  this.l = l;
  this.draw = function(){
    ctx.fillStyle = "green";
    ctx.fillRect(this.x, this.y, this.w, this.l);
  }
  this.top = function(){
    return this.y;
  }
  this.bottom = function(){
    return this.y + this.l;
  }
  this.left = function(){
    return this.x;
  }
  this.right = function(){
    return this.x + this.w;
  }
  this.centerY = function(){
    return this.y + (l / 2);
  }
  this.centerX = function(){
    return this.x + (w / 2);
  }
  this.collide = function(){

    if(Math.abs(p.centerY() - this.centerY()) > Math.abs(p.x - this.centerX())){
      //vertical stuff
      if((p.bottom() >= this.top() && p.top() <= this.top()) && ((p.left() < this.right() && p.left() > this.left()) || (p.right() < this.right() && p.right() > this.left()))){
        nextLevel();
      }
      else if((p.top() <= this.bottom() && p.bottom() >= this.bottom()) && ((p.left() < this.right() && p.left() > this.left()) || (p.right() < this.right() && p.right() > this.left()))){
        nextLevel();
      }
    } else {

      //horizontal stuff
      if((p.right() > this.left() && p.left() <= this.left()) && ((p.top() < this.bottom() && p.top() > this.top()) || (p.bottom() < this.bottom() && p.bottom() > this.top()))){
        nextLevel();
      }
      else if((p.left() < this.right() && p.right() >= this.right()) && ((p.top() < this.bottom() && p.top() > this.top()) || (p.bottom() < this.bottom() && p.bottom() > this.top()))){
        nextLevel();
      }
    }
  }
}
function nextLevel(){
  makeLevel(++level);
}
makeLevel(1);
