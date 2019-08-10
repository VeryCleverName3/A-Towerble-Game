var lazerList = [];
function createLazer(type){
    if(type == "r"){
      var lazer = {x: s, y: 0 * s, h: s, w: s*0.02, type: "r", isDead: false};
      //Starts from right
    }
    else if(type == "l"){
      var lazer = {x: 0, y: 0 * s, h: s, w: s*0.02, type: "l", isDead: false};
      //Starts from left
    }
    else if(type == "d"){
      var lazer = {x: 0, y: s, h: s*0.02, w: s, type: "d", isDead: false};
      //Starts from bottom
    }
    else if(type == "u"){
      //Starts from top
      var lazer = {x: 0, y: 0 * s, h: s*0.02, w: s, type: "u", isDead: false};
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
