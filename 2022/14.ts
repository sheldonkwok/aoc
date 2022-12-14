import utils from "./utils.ts";

const input = utils.rawInput
  .split("\n")
  .map((r) => r.split(" -> ").map((r) => r.split(",").map(Number)));

const START_X = 500;
const START_Y = 0;
const SIZE = START_X * 2;

const grid = utils.griddy(SIZE, "");
let lastRock = 0;

for (const rock of input) {
  for (let i = 0; i < rock.length - 1; i++) {
    const [x1, y1] = rock[i];
    const [x2, y2] = rock[i + 1];
    if (y2 > lastRock) lastRock = y2;

    for (let x = Math.min(x1, x2); x <= Math.max(x1, x2); x++) {
      for (let y = Math.min(y1, y2); y <= Math.max(y1, y2); y++) {
        grid[y][x] = "#";
      }
    }
  }
}

const floor = lastRock + 2;
for (let i = 0; i < SIZE; i++) {
  grid[floor][i] = "#";
}

let x = 1;
let y = 1;
let units = 0;
let first = true;

while (x !== 500 || y !== 0) {
  units++;

  x = START_X;
  y = START_Y;

  while (y < floor) {
    if (!grid[y + 1][x]) {
      y++;
    } else if (!grid[y + 1][x - 1]) {
      y++;
      x--;
    } else if (!grid[y + 1][x + 1]) {
      y++;
      x++;
    } else {
      break;
    }
  }

  grid[y][x] = "o";

  if (first && y >= lastRock) {
    first = false;
    console.log("falling", units - 1);
  }
}

console.log(units);
