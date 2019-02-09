'use strict'

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
      console.log("point for p1")
    }
    else if(this.x - this.r < 0) {
      this.reset();
      console.log("point for p2")
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

export default Circle;
