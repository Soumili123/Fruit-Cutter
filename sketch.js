var PLAY = 1;
var END = 0;
var gameState = 1;


var monster,monsterImage, grpMonster;

var fruit1,fruit2,fruit3,fruit4,fruitsGroup,fruit;

var sword,swordImage;
var gameover,gameOverImage;

var gameOverSound,knifeSwooshSound;

var score;

var position;

function preload(){
 
 swordImage = loadImage("sword.png");
  monster_moving = loadAnimation("alien1.png","alien2.png"); 
  
    fruit1=loadImage("fruit1.png");
    fruit2=loadImage("fruit2.png");
    fruit3=loadImage("fruit3.png");
    fruit4=loadImage("fruit4.png");
  
  gameOverImage=loadImage("gameover.png");
  
  gameOverSound=loadSound("gameover.mp3");
 knifeSwooshSound=loadSound("knifeSwooshSound.mp3");
    
}

function setup(){
 createCanvas(600, 600);

  
 //creating sword
  sword=createSprite(40,160,400,400);
 sword.addImage(swordImage);
  sword.scale=0.7;
  
  
  
  //set collider for sword
  sword.setCollider("rectangle",0,0,40,40);
  
gameOver=createSprite(200,200,50,50);
  gameOver.addImage("gameOver",gameOverImage);
  gameOver.scale=0.7;
  
  score=0;
  
  fruitsGroup=createGroup();
  grpMonster =createGroup();
  
}

function draw(){
  
  background("lightGreen")
  
  text("Score: "+ score, 300,50);
  
     sword.y=World.mouseY;
    sword.x=World.mouseX;
  
  if(gameState === PLAY){

  
     spawnFruit();
  spawnMonster();
    
 
    
      gameOver.visible = false;
    
    
    
    if(fruitsGroup.isTouching( sword)){
      fruit.destroy();
      knifeSwooshSound.play();
      score=score+2;
    }
    
    if(grpMonster.isTouching(sword)){
      gameState=END;
      gameOverSound.play();
    }
    
    
  }
  
 else if(gameState ===END ){
    
    gameOver.visible = true;
   
    fruitsGroup.destroyEach();
      grpMonster.destroyEach();
      fruitsGroup.setVelocityXEach();
      
      grpMonster.setVelocityXEach(0);
      
      //Change the animation of sword to gameover and reset its position
      
      gameOver.addImage(gameOverImage);
      sword.x=200;
      sword.y=200;
 
  }
 
  
  drawSprites();
  
}
    
    function spawnFruit(){
      
      if (frameCount % 60 === 0){
        position=Math.round(random(1,2));
   fruit = createSprite(600,165,10,40);
        if(position===1){
      fruit.x=600
      fruit.velocityX=-(7+(score/4));
    }
    else
      if(position===2){
        fruit.x=0;
        fruit.velocityX=(7+(score/4));
      }
  // fruit.velocityX = -(6+score/4);
   fruit.scale = 0.5;
        
        
    
    var rand = Math.round(random(1,4));
    switch(rand) {
      case 1: fruit.addImage(fruit1);
              break;
      case 2: fruit.addImage(fruit2);
              break;
      case 3: fruit.addImage(fruit3);
              break;
      case 4: fruit.addImage(fruit4);
              break;  
     
     // default: break;
  
    }
       fruit.y=Math.round(random(50,340))
              
    fruit.scale = 0.3;
    fruit.lifetime = 300;
   
    fruitsGroup.add(fruit);
 }
    }


function spawnMonster(){
  
  if (frameCount % 100 === 0) {
    monster = createSprite(600,220,40,10);
    if(position===1){
      monster.x=400
      monster.velocityX=-(7+(score/10));
    }
    else
      if(position===2){
        monster.x=20;
        monster.velocityX=(7+(score/10));
      }
    monster.addAnimation("moving",monster_moving);
     //monster.y = Math.round(random(60,100));
    monster.y = Math.round(random(100,300));
   // monster.velocityX = -(3+score/10);
    
     //assign lifetime to the variable
    monster.lifetime = 200;
    grpMonster.add(monster);
  }
}

