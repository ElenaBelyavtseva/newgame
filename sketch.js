let state;

let stateChanged = false; // NEW


let mushrooms;
let headImage;
let mush;
let shipHead;
let acceleration;
let mushroomsScore = 0;
let gameState = 'start';
let currMoment = 0;
let pixFont;
let regFont;

function preload() {
  headImage = loadImage('assets/bleach.png');
 
  mushroomImage = loadImage('assets/bacteria.png');

  pixFont = loadFont('assets/BungeeShade-Regular.ttf'); // BungeeShade-Regular, PressStart2P-Regular, PaytoneOne-Regular, Jost.ttf
  regFont = loadFont('assets/Jost.ttf');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textSize(40);
  textAlign(CENTER, CENTER);
}

function draw() {
  if (gameState == 'start') {
    startGame();
  }
  else if(gameState == 'draw') {
    clear();
    everything();
  }
  else {
    gameOver();
  }
}

function everything() {
  background(12, 12, 30);
  fill(0);

  showScores();
  shipHead.visible = true;
  
  shipHead.position.x = mouseX;
  shipHead.position.y = mouseY;
  
  shipHead.debug = mouseIsPressed;
  
  shipHead.overlap(mushrooms, collect);
     
  drawSprites();

}

function startGame() {
  background(255, 255, 255);

  push();
  noFill();
  strokeWeight(8);
  stroke(12, 12, 75);
  rect(20, 20, width - 40, height - 40);
  pop();

  textFont(pixFont, 56, 33);
  fill(12, 12, 75);
  text( "Press S to start", width/2, height/2 - 100);

  showInstructions();

  if (keyIsPressed && key == 's') {
    gameState = 'draw';

    mushroomsScore = 0;
    shipHead = createSprite(width/2, height/2);
    shipHead.addImage('normal', headImage);
    shipHead.scale = 0.25;
    shipHead.setCollider('rectangle', 0, 0, 550, 200);
    shipHead.visible = false;
    mushrooms = new Group();
    setInterval(generateMushrooms, 2000);
    }
}

function gameOver() {
  mushrooms.removeSprites();
  shipHead.remove();

  background(255, 33, 33);
  fill(255, 171, 171);
  textFont(pixFont, 74, 30);
  text("CONGRATS", width/2, height/2 - 50);


  
  
  
  
  fill(255, 205, 205);
  textFont(regFont, 34, 10);
  text("Press R to restart", width/2, height/2 + 50);
  gameState = 'over';

  
   


  
  
  
  
  
  
  
  if(keyIsPressed && key == 'r') 
  {
    gameState = 'start';
  }
}



function showInstructions() {
  fill(45, 55, 205);
  textFont(regFont, 24, 10);
  text("Fight 10 generations of viruses until laboratories invent vaccine", width/2, height/2);
  text("Note they might grow resistent, but dont surrender", width/2, height/2+50);
}

function generateMushrooms() {
  mush = createSprite(random(40, height-40), random(40, width-40));
  mush.scale = 0.3;
  mush.maxSpeed = 1;
  mush.setCollider('circle', 0, 0, 20);
  mush.addImage(mushroomImage);
  mush.setSpeed(random(-10, 10), random(0, 270));
  mush.life = 520;
  mushrooms.add(mush);
}

function collect(shipHead, mushroom) {
  mushroom.remove();
  mushroomsScore += 1;
}

function showScores() {
  textFont(regFont, 36);
  fill(255, 255, 200);
  image(mushroomImage, 25, 43, 30, 30);
  text(mushroomsScore, 95, 50);
  
  if (mushroomsScore > 9) {
      gameOver();      
      }
}
