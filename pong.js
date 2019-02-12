const canvas = document.querySelector('canvas');

canvas.width  = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext('2d');

let p1_score = 0;
let p2_score = 0;

addEventListener("resize", function() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
  // calling init resizes ojects rather than creating new ones upon window resize
  init();
});

// KEYBOARD CONTROLS START

// event listeners to listen for when keys are pressed and released:
document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);

// store information wether the keys were pressed
var arrowUp = false;
var arrowDown = false;
var keyW = false;
var keyS = false;
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

class Circle {

  constructor(x, y, r, dx, dy) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.dx = dx;
    this.dy = dy;
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
    this.x += this.dx;
    this.y += this.dy;

    // reset ball when it goes beyond the left or right edges of window
    if(this.x + this.r > innerWidth) {
      // set ball x and y coordinates back to center of window
      this.reset();
      p2_score++;
    }
    else if(this.x - this.r < 0) {
      this.reset();
      p1_score++;
    }
    // bounce ball from the top and bottom edges of window
    if(this.y + this.r > innerHeight || this.y - this.r < 0) {
      this.dy = -this.dy;
    }

    this.draw();
  }

  reset() {
    this.x = innerWidth / 2;
    this.y = innerHeight / 2;
  }

  bounce() {this.dx = -this.dx;}

  get_x() {return this.x;}
  get_y() {return this.y;}
  get_r() {return this.r;}
  set_x(val) {this.x = val;}
  set_y(val) {this.y = val;}
  set_r(val) {this.r = val;}
}

class Rectangle {

  constructor(x, y, width, height, dy) {
    this.x = x;
    this.y = y;
    this.dy = dy;
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

  update() {this.draw();}

  up() {this.y -= this.dy;}

  down() {this.y += this.dy;}

  get_x() {return this.x;}
  get_y() {return this.y;}
  get_dy() {return this.dy;}
  get_width() {return this.width;}
  get_height() {return this.height;}
  set_x(val) {this.x = val;}
  set_y(val) {this.y = val;}
  set_width(val) {this.width = val;}
  set_height(val) {this.height = val;}
  set_dy(val) {this.dy = val;}
}

// pong paddles for P1 and P2
let p1;
let p2;
// pong ball
let cir;
// objects speed
let speed;

function init() {

  speed = 4;

  cir = new Circle(innerWidth / 2, innerHeight / 2, 19, speed, speed);
  p1 = new Rectangle(200, 200, 20, innerHeight / speed, speed);
  p2 = new Rectangle(innerWidth - 200, innerHeight - 400, 20, innerHeight / 4, speed);
}

function animate() {
  // recursive call to animate to emulate objects moving
  requestAnimationFrame(animate);
  // erase the entire canvas prior to redrawing objects
  ctx.clearRect(0, 0, innerWidth, innerHeight);
  // redraw objects
  cir.update();
  p2.update();
  p1.update();

  // PLAYER 1 & PLAYER 2 SCORE
  ctx.fillStyle = 'white';
  ctx.font = '62px serif';
  ctx.beginPath();
  // fillText(text, x, y [, maxWidth])
  ctx.fillText(p1_score, innerWidth - 500, innerHeight - 500);
  ctx.closePath();

  ctx.beginPath();
  ctx.fillText(p2_score, innerWidth - 900, innerHeight - 500);
  ctx.closePath();

  // confirm that ball object has collided with paddle
  if(cir.get_x() > p2.get_x() &&
  cir.get_x() < p2.get_x() + p2.get_width() &&
  cir.get_y() > p2.get_y() &&
  cir.get_y() < p2.get_y() + p2.get_height() ) {
    cir.bounce();
  }
  else if (cir.get_x() > p1.get_x() &&
  cir.get_x() < p1.get_x() + p1.get_width() &&
  cir.get_y() > p1.get_y() &&
  cir.get_y() < p1.get_y() + p1.get_height() ) {
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
