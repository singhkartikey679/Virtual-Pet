//Creating variable for database
var database;

var dogImg, dog, happyDog, dogHowlImg, foodStockRef, foodStock;

//Creating variables for button
var feed, addFood;

//Creating variables to store time
var fedTimeHour, lastFedHour, fedTimeMin, lastFedMin;
var date1, month1, year1, date2, month2, year2;

//For 'Food' class
var foodObj;

var gameState = "start";

function preload() {
  //load images here
  dogImg = loadImage("dogImg.png");
  happyDog = loadImage("dogImg1.png");
  dogHowlImg = loadImage("dogImgHowl.png");
}

function setup() {
  createCanvas(800, 500);

  //Creating object of 'Food' class
  foodObj = new Food();


  dog = createSprite(610, 280);
  dog.addImage(dogImg);
  dog.scale = 0.4;

  //Connecting our 'database' variable with Firebase database
  database = firebase.database();

  //Connecting 'foodStockRef' variable with the Firebase database index 'Food'
  foodStockRef = database.ref('Food');

  //Reading value of Firebase database index 'Food'
  foodStockRef.on("value", foodObj.getFoodStock);

  //Creating buttons
  feed = createButton("Feed the Dog");
  feed.position(800, 95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(900, 95);
  addFood.mousePressed(addFoods);


  //Connecting 'fedTime' variable with the Firebase database index 'feedTime'
  fedTimeHour = database.ref('feedTimeHour');
  fedTimeMin = database.ref('feedTimeMin');
  date1 = database.ref('date');
  month1 = database.ref('month');
  year1 = database.ref('year');

  //Reading value of Firebase database index 'feedTime'
  fedTimeHour.on("value", function (data) {
    lastFedHour = data.val();
  });
  fedTimeMin.on("value", function (data) {
    lastFedMin = data.val();
  });
  date1.on("value", function (data) {
    date2 = data.val();
  });
  month1.on("value", function (data) {
    month2 = data.val();
  });
  year1.on("value", function (data) {
    year2 = data.val();
  });

}


function draw() {
  background(46, 139, 87);


  fill(255, 255, 254);
  textSize(40);
  if (lastFedHour >= 12) {
    text("Last Fed " + lastFedHour % 12 + ":" + lastFedMin + " PM", 80, 70);
  } else if (lastFedHour == 0) {
    text("Last Fed 12" + ":" + lastFedMin + " AM", 80, 70);
  } else {
    text("Last Fed " + lastFedHour + ":" + lastFedMin + " AM", 80, 70);
  }
  text("Date : " + date2 + "-" + month2 + "-" + year2, 80, 130);

  drawSprites();
  foodObj.display();

  if (gameState == "stop") {

    //Extra emotions of dog
    if (frameCount % 350 == 0) {
      dog.addImage(dogHowlImg);
    }

    //For delaying time after feeding 1 bottle of milk and setting how much of time to be delayed
    if (frameCount % 425 == 0) {
      gameState = "start";
      dog.addImage(dogImg);
    }
  }

}

function feedDog() {
  if (gameState == "start") {
    dog.addImage(happyDog);
    foodObj.updateFoodStock(foodStock - 1);
    gameState = "stop";
  }
}

function addFoods() {
  if (foodStock <= 25)
    foodStock += 5;
  else if (foodStock > 25)
    foodStock += (30 - foodStock);
  database.ref('/').update({
    Food: foodStock
  });
}
