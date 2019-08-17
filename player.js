var p = {
  x: .5 * s,
  y: s,
  isDead: false,
  color: "rgba(3, 157, 252, 0.5)",
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

function lightSpread(x, y){
  x -= 170;
  y -= 220;
  ctx.translate(x, y);
  ctx.fillStyle = "#2e2e2e";
  ctx.fillRect(50, 150, 250, 150);
  ctx.fillRect(100, 100, 150, 250);
  ctx.fillRect(75, 125, 25, 25);
  ctx.fillRect(250, 125, 25, 25);
  ctx.fillRect(250, 300, 25, 25);
  ctx.fillRect(75, 300, 25, 25);
  ctx.fillStyle = "rgba(242, 255, 0, 0.1)";
  ctx.fillRect(50, 150, 50, 150);
  ctx.fillRect(250, 150, 50, 150);
  ctx.fillRect(100, 100, 150, 250);
  ctx.fillRect(75, 125, 25, 25);
  ctx.fillRect(250, 125, 25, 25);
  ctx.fillRect(250, 300, 25, 25);
  ctx.fillRect(75, 300, 25, 25);
  ctx.fillStyle = "#2e2e2e";
  ctx.translate(-x, -y);
}

function movePlayer(){
  ctx.fillStyle = p.color;
  ctx.fillRect(p.x - (((0.05 * s) / 2)), p.y - (((0.05 * s))), 0.05 * s, 0.05 * s);
  ctx.fillStyle = "black";
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
    if(keyJustPressed[87] || keyJustPressed[68] || keyJustPressed[65]){
      createParticle(20);
    }
    particles();
  for(i = 0; i < deadDudes.length; i++){
      ctx.fillRect((deadDudes[i].x - (0.05 * s) / 2), (deadDudes[i].y - (0.05 * s)), 0.05 * s, 0.05 * s);
      deadDudes[i].collide();
      deadDudes[i].fall();
    }
}
var particlesList = [];
function createParticle(count){
  for(i=0; i<count; i++){
    var particle = {
      x: p.x,
      y: p.y,
    }
    particlesList.push(particle);
  }
}
function particles(){
  lightSpread(particlesList[0].x, particlesList[0].y);
  for(i=0; i<particlesList.length; i++){
    var lightRange = 3;
    hypot = Math.floor(Math.sqrt(((particlesList[0].y - p.y)^2)+((particlesList[0].x - p.x)^2)));
    if(!isNaN(hypot)){
        console.log(hypot);
        if(hypot > lightRange){
          str = "rgba(3, 157, 252, ";
          str += 1/(hypot/4);
          str += ")";
          p.color = str;
        }
        else if(hypot < lightRange){
          //p.color = "rgba(3, 157, 252, 1)";
        }
    }
    //Can add: Loop through array of lights every halfsecond. Take closest light and use it for this.
    //console.log(particlesList[0]);
    ctx.fillStyle = "rgba(246, 255, 0, 0.5)";
    ctx.fillRect((particlesList[i].x), (particlesList[i].y), 0.01*s, 0.01*s);
    particlesList[i].x += 0.005*s*Math.random();
    particlesList[i].x -= (particlesList[i].x - p.x)*.05;
    particlesList[i].y += -0.005*s*Math.random();
    particlesList[i].y -= (particlesList[i].y - p.y)*.05;

    if(particlesList.length >= 20){
      particlesList.pop();
    }
  }
  ctx.fillStyle = "#000000";
}
