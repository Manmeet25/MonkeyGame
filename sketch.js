var PLAY = 1;
var END = 0;
var gameState=PLAY;
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score;
var backGround,groundImage,invisibleGround;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  monkeyy = loadAnimation("sprite_0.png")
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 groundImage = loadImage("cartoon-jungle-background-tropical-landscape-260nw-538339654.webp")
}



function setup() {
  createCanvas(400,400);
   backGround = createSprite(10,100,900,10)
  backGround.addImage("moving",groundImage)
  backGround.scale  =2.9;
  backGround.velocityX = -4;
  backGround.x = backGround.width/2;
  console.log(backGround.x)
  
  monkey = createSprite(50,315,50,50)
  monkey.addAnimation("monkey",monkey_running)
  monkey.addAnimation("monkeyy",monkeyy)
  monkey.scale =0.2
 // monkey.debug = true
  monkey.setCollider("rectangle",0,0,80,500,45)
 invisibleGround = createSprite(400,390,900,10)
  invisibleGround.visible = false;
  
  foodGroup = new Group();
  obstacleGroup = new Group();
  score = 0
}


function draw() {
 // background ("red")
  if (gameState === PLAY){
  if(backGround.x<0){
    backGround.x = backGround.width/2;
  }
  if(keyDown("space")&&monkey.y >= 330) {
        monkey.velocityY = -20;
    }
    
    //add gravity
    monkey.velocityY = monkey.velocityY + 0.6
    if(foodGroup.isTouching(monkey)){
      foodGroup.destroyEach();
      score= score+1;
    }
    spawnBananas();
  spawnObstacles();
    if(obstacleGroup.isTouching(monkey)){
      monkey.velocityY=0;
      gameState = END;
    }
  }
  if(gameState === END){
    backGround.velocityX=0
    foodGroup .setVelocityXEach(0)
    obstacleGroup.setVelocityXEach(0)
    obstacleGroup.setLifetimeEach(-1);
    foodGroup.setLifetimeEach(-1);
    monkey.changeAnimation("monkeyy",monkeyy)
  }
  monkey.collide(invisibleGround)
  
  drawSprites(); 
  stroke ("black")
  textSize (20)
  fill("black")
  survivalTime = Math.ceil(frameRate()/60)
  text("survivalTime:" + score,100,50)
}
function spawnBananas(){
  if (frameCount%80===0){
  var banana = createSprite(400,200,20,20)
  banana.addImage("banana",bananaImage)
  banana.scale=0.2
  banana.velocityX=-(4+score/3)
  banana.lifetime = 100
    banana.y =Math.round(random(0,250))
    foodGroup.add(banana);
    }
}
function spawnObstacles(){
  if(frameCount%300 ===0){
    var obstacle = createSprite(400,380,30,30)
    obstacle.addImage("obs",obstaceImage)
    obstacle.scale = 0.2
    obstacle.velocityX = -(4+score/15)
    obstacle.lifetime = 100
    obstacleGroup.add(obstacle)
  }
}




