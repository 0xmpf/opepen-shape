// Sample implementation of Opepen shape
// on P5.js
// https://editor.p5js.org

// Variables

let width = 400 
let particles = []
let N = 5000

// Setup

function setup() {
  createCanvas(width, width);
  for (let i = 0; i < N; i++) {
    particles.push(createVector(random(width), random(height)));
  }
}


// Opepen Shape aka ConstraintZone

function isConstraintZone(x, y, WIDTH) {
  // Helper function is in square
  function isInSquare(x, y) {
    let CELL_SIZE = WIDTH / 8;
    let row = Math.floor(y / CELL_SIZE);
    let col = Math.floor(x / CELL_SIZE);
    let constraintLinesOne = [5, 7];
    if (constraintLinesOne.includes(row) && col >= 3 && col <= 4) {
      return true;
    }
    if (row === 4 && col >= 2 && col <= 5) {
      return true;
    }
    if (row === 2 && col === 2) {
      return true;
    }
    return false;
  }
  // Helper function isInCircles
  function isInCircles(x, y) {
    let circlesCenter = [[3, 3], [5, 3], [5, 8], [3, 5], [5, 5], [3, 8]];
    for (let i = 0; i < circlesCenter.length; i++) {
      let center = circlesCenter[i];
      let center_x = center[0] * WIDTH / 8;
      let center_y = center[1] * WIDTH / 8;
      let distance = Math.sqrt(Math.pow((x - center_x), 2) + Math.pow((y - center_y), 2));
      if (distance <= WIDTH / 8) {
        return true;
      }
    }
    return false;
  }
  if (isInCircles(x, y) || isInSquare(x, y)) {
    return true;
  }
  return false;
}


function draw() {
  background(220);
  for (let i = 0; i < particles.length; i++) {
    let p = particles[i];
    if (isConstraintZone(p.x, p.y, width)) {
      fill(0); 
      noStroke();
      ellipse(p.x, p.y, 5, 5); 
    }
  }
}
