let img, photo;
let debug = false;
let win = false;
let joke = "";
let jokeList = [];

let imgX, imgY;
let activeX;
let activeY;
let w;
let h;
let textBool = false;
let imgS = false;

function preload() {
  img = loadImage("data/Crowd.svg", () => {
    img.resize(0, windowHeight - 200);
  }
  );
  photo = loadImage("data/photo.jpg");
  let json = loadJSON("dataset.json", () => {
    jokeList = json.joke
  }
  );
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  imgX = (width - img.width) / 2;
  imgY = (height - img.height) / 2;

  activeX = 430 / 644 * img.width + imgX;
  activeY = 533 / 644 * img.height + imgY;
  w = 100 / 644 * img.width;
  h = 115 / 644 * img.height;
}

function draw() {
  background(252, 228, 225);

  noStroke();
  if (textBool) {
    fill(255, 25, 0);
  } else {
    fill(0);
  }
  rect(width / 2 - 340, 10, 700, 80, 20);
  textSize(32);
  if (!textBool) {
    fill(255, 25, 0);
  } else {
    fill(0);
  }
  text("Help Me to Survive Another Day in Beijing", width / 2 - 300, 60);
  image(img, imgX, imgY);

  push();
  translate(imgX + img.width, imgY + img.height / 2);
  scale(imgS ? 1 : 1.2);
  image(photo, 0, 0);
  pop();

  push();
  translate(imgX, imgY + 200);
 
  fill(97, 255, 97);
  //noStroke();
  rect(-150, -25, 300, 50, 10);
  fill(0);
  textSize(24);
  text("Click to find where I am", -138, 7);
  fill(0);
  stroke(5);
  pop();

  if (win) {
    fill(252, 255, 105);
    rect(width / 2 - 100, height / 2 - 50, 200, 100, 20);
    fill(255, 45, 25);
    text("You win!", width / 2 - 65, height / 2 + 10);
  }
  if (joke) {
    //joke
    textSize(16);
    fill(0);
    text(joke.q, width / 2 - img.width / 3, height - 60);
    text(joke.a, width / 2 - img.width / 3, height - 30);
  }

  if (frameCount % 30 == 0) {
    textBool = !textBool;
    imgS = !imgS;
  }

  if (debug) {
    fill(0, 200, 0, 50);
    rect(activeX, activeY, w, h);
  }
}

function mousePressed() {
  if (mouseX >= activeX && mouseX <= activeX + w && mouseY >= activeY && mouseY <= activeY + h) {
    // you win
    win = true;
  } else if (mouseX >= imgX && mouseX <= imgX + img.width && mouseY >= imgY && mouseY <= imgY + img.height) {
    joke = jokeList[int(random(jokeList.length))];
  }
}
