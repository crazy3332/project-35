var balloon;
var database, position;
var balloonPosition;

function setup() {
  database = firebase.database();
  createCanvas(500,500);
  balloon = createSprite(400, 200, 50, 50);
  balloonPosition = database.ref('balloon/position');
  balloonPosition.on("value",readHeight,showError);

}

function draw() {
  background(0,0,100);  
  if(keyDown("up")){
    balloon.y = balloon.y-10;
  } else if(keyDown("down")){
    balloon.y = balloon.y+10; 
  } else if(keyDown("left")){
    balloon.x = balloon.x-10; 
  } else if(keyDown("right")){
    balloon.x = balloon.x+10; 
  }
  balloon.width = balloon.y/4;
  balloon.height = balloon.y/4;

  updateHeight(balloon.x, balloon.y, balloon.width, balloon.height);
  drawSprites();
}

function updateHeight(x,y,width,height){
  database.ref('balloon/position').set({
    'x': x,
    'y': y,
    'width': width,
    'height': height
  })
} 
function readHeight(data){
  position = data.val()
  balloon.x = position.x
  balloon.y = position.y
} 

function showError(){
  console.log("oof")
}