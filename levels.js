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
    ground.push(new Portal(100, 100, 0.01 * s, 0.01 * s));
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
    level = 4;
  }
}

function Portal(x, y, w, l){
  this.x = x;
  this.y = y;
  this.w = w;
  this.l = l;
  this.draw = function(){
    ctx.fillStyle = "purple";
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
