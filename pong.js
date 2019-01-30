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

function getDistance(x1, y1, x2, y2) {

  return Math.sqrt( Math.pow( (x2 - x1), 2) + Math.pow( (y2 - y1), 2));

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
    if(this.x + this.r > innerWidth || this.x - this.r < 0)
      this.dx = -this.dx;
    // bounce ball from the top and bottom edges of window
    if(this.y + this.r > innerHeight || this.y - this.r < 0)
      this.dy = -this.dy;

    this.x += this.dx;
    this.y += this.dy;

    this.draw();
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
}

init();
animate();
