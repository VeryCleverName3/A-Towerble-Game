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
