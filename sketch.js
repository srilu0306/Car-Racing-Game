var canvas, backgroundImage;

var gameState = 0; //waiting state
var playerCount;
var allPlayers;
var distance = 0;
var database;

var form, player, game;
var car1,car2,car3,car4, cars;
var car1img,car2img,car3img,car4img,trackimg;
var PlayerRank;

function preload(){
  car1img=loadImage("images/car1.png");
  car2img=loadImage("images/car2.png");
  car3img=loadImage("images/car3.png");
  car4img=loadImage("images/car4.png");
  trackimg=loadImage("images/track.jpg");
}

function setup(){
  canvas = createCanvas(displayWidth-20,displayHeight-30);
  database = firebase.database();
 //create object of Game class
  game = new Game();

//calling function from game class
  game.getState();
  game.start();
}

// gamestate = 0 means waiting for 4 players to join game.
// gamestate = 1 means playing game.
// gamestate = 2 means game has ended.
function draw(){
  if(playerCount === 4){
    game.update(1);
  }
  if(gameState === 1){
    clear();
    game.play();
 }

 //calling the function end() of "Game class" using the object "game"
  if(gameState===2){
    game.end();
  }

  if (PlayerRank === 4){
    clear();
    game.displayLeaderBoard();
  }

}
