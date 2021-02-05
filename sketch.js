//Create variables here
var dog,happyDog;
var database;
var foodS,foodStock;

function preload()
{
	dogImage= loadImage("dogImg.png");
  happyDogImage= loadImage("dogImg1.png");
}

function setup() {
  database = firebase.database();

  createCanvas(500, 500);
  
  dog=createSprite(250,250,20,20);
  dog.addImage(dogImage);
  dog.scale=0.2;

  foodStock=database.ref('food');
    foodStock.on("value",readStock);
  
}


function draw() {  
  background(46,139,87);

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDogImage);
    dog.scale=0.2;
  }

  drawSprites();
  fill("white");
  textSize(15);
  stroke("black");
  text("Food Remaining: "+foodS,170,200);
  text("Note: Press Up Arrow Key To Feed Him Milk",130,10);
  //add styles here

}

function writeStock(x){
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  }

  database.ref('/').update({
    food:x
  })
}

function readStock(data){
  foodS=data.val();
}