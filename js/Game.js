class Game {
  constructor(){
    this.image = loadImage("images/track.jpg")
  }


  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }
    car1 = createSprite(100,200);
    car2 = createSprite(300,200);
    car3 = createSprite(500,200);
    car4 = createSprite(700,200);
   cars = [car1, car2, car3, car4];

    car1.addImage("car1", car1img);
    car2.addImage("car2" , car2img);
    car3.addImage("car3", car3img);
    car4.addImage("car4" , car4img);


  }

  play(){
    form.hide();
   // textSize(30);
   // text("Game Start", 120, 100)
    Player.getPlayerInfo();
    player.getPlayerRank();

    if(allPlayers !== undefined){
      //var display_position = 130;
      image(trackimg,0, -displayHeight*4, displayWidth, displayHeight*5);
      var x=225;
      var y;
      var index = 0; 

      for(var plr in allPlayers){

        index = index +1;
        x = x + 225;
        y = displayHeight - allPlayers[plr].distance;

        cars[index-1].x = x;
        cars[index-1].y = y;

        if (index === player.index){
          cars[index -1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y =  cars[index-1].y;
        }

       /* if (plr === "player" + player.index)
          fill("red")
        else
          fill("black");

        display_position+=20;
      //  textSize(15);
        text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      */
     }
    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=20
      player.update();
    }


    if (player.distance > 4360){
      gameState = 2;
      player.rank+=1
      //above line means we are increasing rank by 1.
      player.updatePlayerRank(player.rank);
      player.update();
    }
    drawSprites();
  }



  end(){
    console.log("Game Ended");
    console.log(player.rank);
  }

  displayLeaderBoard(){
    background(this.image);

    //displaying leaderBoard heading
    var leaderBoard = createElement("h1");
    leaderBoard.position(displayWidth / 2 - 50, 50);
    leaderBoard.html("Leaderboard");
    leaderBoard.style("color", "white");

    // making an ranks array which contains all players and their ranks
    var ranks = [];

    for (var p in allPlayers) {
      ranks.push({ name: allPlayers[p].name, rank: allPlayers[p].rank });
    }

    var y = 200;
    // for loop over ranks array to display players according to rank
    for (var r in ranks) {
      //creating dom element with little styling to display player's name and rank
      var title = createElement("h2");
      title.position(displayWidth / 2, y);
      title.style("color", "white");

      // keeping a y gap of 100 between each player
      y = y + 100;

      // sorting the ranks array so that the players are shown in ascending order
      ranks.sort(function (a, b) {
        return a.rank - b.rank;
      });

      //displaying the player name and rank
      title.html(ranks[r].name + " : " + ranks[r].rank);
    }
  }
  
}
