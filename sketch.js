let mic;
let song;
let fft;
let slider;
let img;
let r = 0;
let r1 = 0;

function preload() {
  song = loadSound("TarmoIcebreakerArrivingHelsinki.mp3");
  img = loadImage("Icebreaker.png");
  img1 = loadImage("pp1.png");
  img2 = loadImage("pp2.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  //mic = new p5.AudioIn();
  //mic.start();
  //slider = createSlider(0,255,100);
  //slider.position(10,10);
  amplitude = new p5.Amplitude();
  fft = new p5.FFT();
  fft.setInput(song);
  amplitude.setInput(song);
  //print(song,sampleRate())
  song.loop();
}

//function playSong(){
  //if (!started){
  // song.play();
  //}
//}

function draw() {
  background(0);

  circle(mouseX, mouseY, 10);

  let d = fft.getEnergy("bass");
  let f = fft.getEnergy("mid");
  push();
  r1 += d/100;
  translate(width / 2, height / 2);
  rotate(r1);
  line(d, d, f, f);
  pop();
  circle(width / 2, height / 2, f);
  circle(width / 2, height / 2, 150);
  for (let row = 0; row < 10; row++) {
    beginShape();
    fill(255, 255, 255);
    stroke(255, 50);

    for (let x = 0; x < width; x += 40) {
      let y = (row * height);
      //circle(x,y,d/10)
      //rect(x, y, d / 10, f / 10);
      //textSize(10);
      color(255,255,255,0.5)
      text("ICE BREAKER",x,y);
    }
    endShape();
  }

  //let level = mic.getLevel();
  //let h=height - amplitude.getLevel()*height;
  //text("ICE BREAKER",h,h);
  //let val=slider.value();
  //background(val);
  noFill();
  stroke(0, 0, 0);
  let spectrum = fft.analyze();
  print(spectrum.length);
  let stepSize = width / spectrum.length;

  beginShape();
  for (let i = 0; i < spectrum.length; i = i + 10) {
    let x = i * stepSize;
    let y = map(spectrum[i], 0, 255, height, 0);

    stroke(255, 255, 255);
    circle(width / 2, height / 2, y / 2);

    //vertex(x,y);
    point(x, y - width / 2);
  }
  endShape();

  push();
  r += 0.02;
  translate(width / 2, height / 2);
  rotate(r);
  var scale = 0.2;
  imageMode(CENTER);
  image(img, 0, 0, scale * width, (scale * img.height * width) / img.width);
  pop();
}
//function mouseClicked(){
//saveCanvas('nameofimage','png')
//}
