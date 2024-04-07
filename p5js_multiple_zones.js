let width = 400;
let particles = [];
let N = 5000;

function setup() {
  createCanvas(width, width);
  for (let i = 0; i < N; i++) {
    particles.push(createVector(random(width), random(height)));
  }
}

function which_constraint_zone(x, y, WIDTH) {
  let CELL_SIZE = WIDTH / 8;
  let row = Math.floor(y / CELL_SIZE);
  let col = Math.floor(x / CELL_SIZE);

  function is_in_zone1() {
    if (row === 2 && col === 2) return true;
    let center_x = 3 * WIDTH / 8, center_y = 3 * WIDTH / 8;
    let distance = Math.sqrt((x - center_x) ** 2 + (y - center_y) ** 2);
    return distance <= WIDTH / 8;
  }

  function is_in_zone2() {
    let center_x = 5 * WIDTH / 8, center_y = 3 * WIDTH / 8;
    let distance = Math.sqrt((x - center_x) ** 2 + (y - center_y) ** 2);
    return distance <= WIDTH / 8;
  }

  function is_in_zone3() {
    let centers = [[3, 5], [5, 5]];
    for (let center of centers) {
      let [center_x, center_y] = center.map(c => c * WIDTH / 8);
      let distance = Math.sqrt((x - center_x) ** 2 + (y - center_y) ** 2);
      if (distance <= WIDTH / 8) return true;
    }
    if (row === 4 && col >= 2 && col <= 5) return true;
    if (row === 5 && col >= 3 && col <= 4) return true;
    return false;
  }

  function is_in_zone4() {
    let centers = [[5, 8], [3, 8]];
    for (let center of centers) {
      let [center_x, center_y] = center.map(c => c * WIDTH / 8);
      let distance = Math.sqrt((x - center_x) ** 2 + (y - center_y) ** 2);
      if (distance <= WIDTH / 8) return true;
    }
    if (row === 7 && col >= 3 && col <= 4) return true;
    return false;
  }

  if (is_in_zone1()) return 1;
  if (is_in_zone2()) return 2;
  if (is_in_zone3()) return 3;
  if (is_in_zone4()) return 4;
  return null;
}

function draw() {
  background(220);
  noStroke();
  for (let p of particles) {
    let zone = which_constraint_zone(p.x, p.y, width);
    switch (zone) {
      case 1: fill(255, 0, 0); break; // Red for Zone 1
      case 2: fill(0, 255, 0); break; // Green for Zone 2
      case 3: fill(0, 0, 255); break; // Blue for Zone 3
      case 4: fill(255, 255, 0); break; // Yellow for Zone 4
      default: continue; // Skip drawing if not in any zone
    }
    ellipse(p.x, p.y, 5, 5);
  }
}
