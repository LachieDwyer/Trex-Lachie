var PLAY=1
var END=0
var gamestate=PLAY
var cloudGroup, obstacleGroup;
var trex, trex_running, edges, trex_collided;
var groundImage;
var invisibleGround
var cloud="", cloudimage;
var obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
var score;
var gameoverimage, gameoversprite, restartimage, restartsprite

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  groundImage = loadImage("ground2.png");
  trex_collided = loadAnimation("trex_collided.png")
  cloudimage = loadImage("cloud.png");
  gameoverimage = loadImage("gameOver.png")
  restartimage = loadImage("restart.png")
obstacle1=loadImage("obstacle1.png");
obstacle2=loadImage("obstacle2.png");
obstacle3=loadImage("obstacle3.png");
obstacle4=loadImage("obstacle4.png");
obstacle5=loadImage("obstacle5.png");
obstacle6=loadImage("obstacle6.png");
}



function setup(){

console.warn("warning")
console.error("error")
console.info("info")

  console.time()
  createCanvas(600,200);
  
  // creating trex
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  edges = createEdgeSprites();

  restartsprite = createSprite(300,140)
  restartsprite.addImage(restartimage)
  restartsprite.scale=0.5
  restartsprite.visible=false

  gameoversprite = createSprite(300,100)
  gameoversprite.addImage(gameoverimage)
  gameoversprite.scale=0.5
  gameoversprite.visible=false

  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage)
  
  //adding scale and position to trex
  trex.scale = 0.5;
  trex.x = 50

  ground.x = ground.width/2

  //creating invisible ground
  invisibleGround=createSprite(200, 190, 400, 10)
  invisibleGround.visible=false
  console.timeEnd()

  obstacleGroup=createGroup()
  cloudGroup=createGroup()

  trex.setCollider("circle", 0, 0, 50)
  trex.debug=true

  score=0;
}




function draw(){
  //console.time()
  //set background color 

  



  background("grey");

  text("Score:"+ score, 500, 20)

  console.log("This is", gamestate)

  if(gamestate===PLAY){
    score=score+Math.round(frameCount/60)
    ground.velocityX=-2
    if (ground.x<0){
      ground.x=ground.width/2
      }
      
      //jump when space key is pressed
  if(keyDown("space") && trex.y>=150){
    trex.velocityY = -10;
  }
  //adding gravity to game
  trex.velocityY = trex.velocityY + 0.5;
    //stop trex from falling down
  //trex.collide(edges[3])
 
  spawncloud()
  spawnObstacles()
  if (obstacleGroup.isTouching(trex)){
    gamestate=END

  }
}
else if(gamestate===END){
ground.velocityX=0;
trex.velocityY=0;
obstacleGroup.setVelocityXEach(0);
cloudGroup.setVelocityXEach(0);
trex.changeAnimation("collided", trex_collided);
cloudGroup.setLifetimeEach(-1);
obstacleGroup.setLifetimeEach(-1);
}


  //logging the y position of the trex
  //console.log(trex.y)
  trex.collide(invisibleGround);  

  
  drawSprites();
  //console.log(edges[0], edges[1], edges[2]);
  //console.timeEnd()
}


function spawncloud(){
if(frameCount % 60 == 0){
cloud=createSprite(600,100,50,10);
cloud.velocityX = -3;
cloud.addImage("cld", cloudimage);
cloud.scale=0.5;

cloud.y=Math.round(random(10,100))

cloud.depth=trex.depth
trex.depth=trex.depth+1
console.log("cloud= " + cloud.depth)
console.log("trex=" + trex.depth)
cloud.lifetime=200;

cloudGroup.add(cloud);
}


}

function spawnObstacles(){
if(frameCount % 60== 0){
cactus=createSprite(400, 165, 10, 40)
cactus.velocityX=-6

var rand = Math.round(random(1,6))

switch(rand){
case 1: cactus.addImage(obstacle1)
break;
case 2: cactus.addImage(obstacle2)
break;
case 3: cactus.addImage(obstacle3)
break;
case 4: cactus.addImage(obstacle4)
break;
case 5: cactus.addImage(obstacle5)
break;
case 6: cactus.addImage(obstacle6)
  break;
  default: break;
}
cactus.lifetime=100;
cactus.scale=0.7;

obstacleGroup.add(obstacle);
}


}