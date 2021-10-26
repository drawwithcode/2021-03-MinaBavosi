let myImage;
let mySong;
let proportion;

function preload() {
  myImage = loadImage("./assets/ragazzi80.png");
  mySong = loadSound("./assets/sound.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background("black");

  analyzer = new p5.Amplitude();
  analyzer.setInput(mySong);
  mySong.loop();
  // loaded image, x, y, [width, height]
  image(myImage, 20, 20, myImage.width / 2, myImage.height / 2);
  myImage.filter(INVERT, 2);

  //text
  let t = createP("-> CLICK");
  t.position(50, 0);
  t.style("font-family", "Papyrus");
  t.style("font-size", "80px");
  t.style("color", "Red");
  let y = createP("TO");
  y.position(50, 150);
  y.style("font-family", "Papyrus");
  y.style("font-size", "80px");
  y.style("color", "red");
  let x = createP("RELIVE");
  x.position(50, 300);
  x.style("font-family", "Papyrus");
  x.style("font-size", "80px");
  x.style("color", "red");
  let k = createP("THESE");
  k.position(50, 450);
  k.style("font-family", "Papyrus");
  k.style("font-size", "80px");
  k.style("color", "red");
  let z = createP("MOMENTS...");
  z.position(50, 600);
  z.style("font-family", "Papyrus");
  z.style("font-size", "80px");
  z.style("color", "red");
}

class Pixel {
  //initial function
  constructor(temp_x, temp_y, temp_r, temp_color) {
    this.x = temp_x;
    this.y = temp_y;
    this.r = temp_r;
    this.color = temp_color;
  }
  //action that Pixel can perform
  display() {
    push();
    stroke("black");
    fill(this.color);
    rect(this.x, this.y, this.r);
    pop();
  }
}

function draw() {
  for (let i = 0; i < 100; i++) {
    myPixels();
  }
}

function myPixels() {
  let ampl = 0;
  ampl = analyzer.getLevel();
  ampl = map(ampl, 0, 1, 0, 50);

  var thisX = random(0, width);
  var thisY = random(0, height);
  var col = get(thisX, thisY);
  const aNewPixel = new Pixel(thisX, thisY, ampl, col);
  fill(col);
  stroke("black");
  rect(thisX, thisY, ampl);
}

function mouseClicked() {
  createCanvas(windowWidth, windowHeight);
  background("black");
  // loaded image, x, y, [width, height]
  image(myImage, 20, 20, myImage.width / 2, myImage.height / 2);
  myImage.filter(INVERT, 2);

  if (mySong.isPlaying() == true) {
    mySong.stop();
    myImage.filter(INVERT, 2);
  } else if (mySong.isPlaying() == false) {
    mySong.play();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  proportion = max(width / myImage.width, height / myImage.height);
  myImage.resize(myImage.width * proportion, myImage.height * proportion);
}
