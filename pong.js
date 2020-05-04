const canvas = document.querySelector('canvas');

canvas.width  = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext('2d');

// SOUND Tone.js create synth & connect it to the master audio output (speakers)
const synth = new Tone.Synth().toMaster();

// pong paddles for P1 & P2
let p1;
let p2;
// pong ball
let cir;
// objects speed
let speed;

let p1Score = 0;
let p2Score = 0;

// store information wether the keys were pressed
var arrowUp = false;
var arrowDown = false;
var keyW = false;
var keyS = false;

// Object Classes

// Class for ball
class Circle {

  constructor(x, y, r, vx, vy) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.vx = vx;
    this.vy = vy;
  }

  // Method
  draw() {
    ctx.fillStyle = 'white';
    ctx.beginPath();
    // void ctx.arc(x, y, radius, startAngle, endAngle [, anticlockwise]);
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
  }

  update() {
    // keep ball moving by updating the x and y coordinates
    this.x += this.vx;
    this.y += this.vy;

    // reset ball when it goes beyond the left or right edges of window
    if(this.x + this.r > innerWidth) {
      // play a middle 'E' for the duration of an 8th note
      synth.triggerAttackRelease('E4', '8n')
      // set ball x and y coordinates back to center of window
      this.reset();
      p2Score++;
    }
    else if(this.x - this.r < 0) {
      // play a middle 'E' for the duration of an 8th note
      synth.triggerAttackRelease('E4', '8n')
      this.reset();
      p1Score++;
    }
    // bounce ball from the top and bottom edges of window
    if(this.y + this.r > innerHeight || this.y - this.r < 0) {
      this.vy = -this.vy;
      // play a middle 'D' for the duration of an 8th note
      synth.triggerAttackRelease('D4', '8n')
    }

    this.draw();
  }

  reset() {
    this.x = innerWidth / 2;
    this.y = innerHeight / 2;
  }

  bounce() {
    this.vx = -this.vx;
    // play a middle 'C' for the duration of an 8th note
    synth.triggerAttackRelease('C4', '8n')
  }

  getX() {return this.x;}
  getY() {return this.y;}
}

// Class for paddles
class Rectangle {

  constructor(x, y, width, height, vy) {
    this.x = x;
    this.y = y;
    this.vy = vy;
    this.width = width;
    this.height = height;
  }

  draw() {
    ctx.fillStyle = 'white';
    ctx.beginPath();
    // void ctx.rect(x, y, width, height);
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.fill();
    ctx.closePath();
  }

  update() {
    this.draw();
  }

  up() {
    // confirm paddle is within canvas boundary
    if(this.getY() >= 0) {
      this.y -= this.vy;
    }
  }

  down() {
    // confirm paddle is within canvas boundary
    if(this.getY() <= (innerHeight - this.getHeight()) ) {
      this.y += this.vy;
    }
  }

  getX() {return this.x;}
  getY() {return this.y;}
  getWidth() {return this.width;}
  getHeight() {return this.height;}
}

addEventListener("resize", function() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
  // calling init resizes ojects rather than creating new ones upon window resize
  init();
});

// KEYBOARD CONTROLS START

// prevent the space and arrow keys from scrolling
window.addEventListener("keydown", function(e) {
  if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
    e.preventDefault();
  }
}, false);

// event listeners to listen for when keys are pressed and released:
document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);

// handle the key up and key down events
function keyDownHandler(event) {
  if(event.keyCode === 38) {
    arrowUp = true;
  }
  else if(event.keyCode === 40) {
    arrowDown = true;
  }
  if(event.keyCode === 87) {
    keyW = true;
  }
  else if(event.keyCode === 83) {
    keyS = true;
  }
}
function keyUpHandler(event) {
  if(event.keyCode === 38) {
    arrowUp = false;
  }
  else if(event.keyCode === 40) {
    arrowDown = false;
  }
  if(event.keyCode === 87) {
    keyW = false;
  }
  else if(event.keyCode === 83) {
    keyS = false;
  }
}

// KEYBOARD CONTROLS END

function init() {

  speed = 6;

  cir = new Circle(innerWidth / 2, innerHeight / 2, 12, speed, speed);
  p1 = new Rectangle(200, 200, 12, innerHeight / 8, speed);
  p2 = new Rectangle(innerWidth - 200, innerHeight - 400, 12, innerHeight / 8, speed);
}

// draw score
function display() {
  // PLAYER 1 & PLAYER 2 SCORE
  ctx.fillStyle = 'white';
  ctx.font = '62px ubuntu';
  ctx.beginPath();
  // fillText(text, x, y [, maxWidth])
  ctx.fillText(p1Score, innerWidth - 500, innerHeight - 500);
  ctx.closePath();

  ctx.beginPath();
  ctx.fillText(p2Score, innerWidth - 900, innerHeight - 500);
  ctx.closePath();
}

function animate() {
  // recursive call to animate to emulate objects moving
  requestAnimationFrame(animate);
  // erase the entire canvas prior to redrawing objects
  ctx.clearRect(0, 0, innerWidth, innerHeight);
  // draw score
  display();
  // redraw objects
  cir.update();
  p2.update();
  p1.update();

  // confirm that ball object has collided with paddle
  if(cir.getX() > p2.getX() &&
  cir.getX() < p2.getX() + p2.getWidth() &&
  cir.getY() > p2.getY() &&
  cir.getY() < p2.getY() + p2.getHeight() ) {
    cir.bounce();
  }
  else if (cir.getX() > p1.getX() &&
  cir.getX() < p1.getX() + p1.getWidth() &&
  cir.getY() > p1.getY() &&
  cir.getY() < p1.getY() + p1.getHeight() ) {
    cir.bounce();
  }
  // move paddle
  if(arrowUp) {
    p2.up();
  }
  else if(arrowDown) {
    p2.down();
  }
  if(keyW) {
    p1.up();
  }
  else if(keyS) {
    p1.down();
  }
}

init();
animate();
