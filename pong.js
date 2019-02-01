const canvas = document.querySelector('canvas');

canvas.width  = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext('2d');

addEventListener("resize", function() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
  // calling init resizes ojects rather than creating new ones
  init();
});

// KEYBOARD CONTROLS START

// event listeners to listen for the pressed keys:
document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);

// store information wether the keys were pressed
var arrowUp = false;
var arrowDown = false;
var keyW = false;
var keyS = false;
// handle the key up and key down events
function keyDownHandler(event) {
  if(event.keyCode == 38) {
    arrowUp = true;
  }
  else if(event.keyCode == 40) {
    arrowDown = true;
  }
  if(event.keyCode == 87) {
    keyW = true;
  }
  else if(event.keyCode == 83) {
    keyS = true;
  }
}
function keyUpHandler(event) {
  if(event.keyCode == 38) {
    arrowUp = false;
  }
  else if(event.keyCode == 40) {
    arrowDown = false;
  }
  if(event.keyCode == 87) {
    keyW = false;
  }
  else if(event.keyCode == 83) {
    keyS = false;
  }
}

// KEYBOARD CONTROLS END

// use pythagoran theorem to calculate distance
function getDistance(x1, y1, x2, y2) {
  return Math.sqrt( Math.pow(x2 - x1, 2 ) + Math.pow(y2 - y1, 2) );
}

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
    // reset ball when it goes beyond the left or right edges of window
    if(this.x + this.r > innerWidth || this.x - this.r < 0) {
      // set ball x and y coordinates back to center of window
      this.x = innerWidth / 2;
      this.y = innerHeight / 2;
    }
    // bounce ball from the top and bottom edges of window
    if(this.y + this.r > innerHeight || this.y - this.r < 0) {
      this.dy = -this.dy;
    }
    // keep ball moving by updating the x and y coordinates
    this.x += this.dx;
    this.y += this.dy;

    this.draw();
  }

  bounce() {
    this.dx = -this.dx;
  }

  get_x() {
    return this.x;
  }
  get_y() {
    return this.y;
  }
  get_r() {
    return this.r;
  }
  set_x(val) {
    this.x = val;
  }
  set_y(val) {
    this.y = val;
  }
  set_r(val) {
    this.r = val;
  }
}

class Rectangle {

  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
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

  get_x() {
    return this.x;
  }
  get_y() {
    return this.y;
  }
  get_width() {
    return this.width;
  }
  get_height() {
    return this.height;
  }
  set_x(val) {
    this.x = val;
  }
  set_y(val) {
    this.y = val;
  }
  set_width(val) {
    this.width = val;
  }
  set_height(val) {
    this.height = val;
  }
  set_dx(val) {
    this.dx = val;
  }
  set_dy(val) {
    this.dy = val;
  }
}

// paddle / rectangle
let rec1;
let rec2;
let cir;

function init() {
  cir = new Circle(innerWidth / 2, innerHeight / 2, 19, 4, 4);
  rec1 = new Rectangle(200, 200, 20, innerHeight / 4);
  rec2 = new Rectangle(innerWidth - 200, innerHeight - 400, 20, innerHeight / 4);
}

function animate() {

  requestAnimationFrame(animate);

  ctx.clearRect(0, 0, innerWidth, innerHeight);

  cir.update();
  rec1.update();
  rec2.update();

  if(cir.get_x() > rec2.get_x() &&
  cir.get_x() < rec2.get_x() + rec2.get_width() &&
  cir.get_y() > rec2.get_y() &&
  cir.get_y() < rec2.get_y() + rec2.get_height()
) {
  cir.bounce();
}
else if (cir.get_x() > rec1.get_x() &&
cir.get_x() < rec1.get_x() + rec1.get_width() &&
cir.get_y() > rec1.get_y() &&
cir.get_y() < rec1.get_y() + rec1.get_height()
) {
  cir.bounce();
}
}

init();
animate();
