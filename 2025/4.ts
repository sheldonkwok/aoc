import * as utils from "./utils.ts";

const input = await utils.getInput(4);
const grid = input.split("\n").map((l) => l.split(""));

const ROLL = "@";

function part1() {
  let count = 0;

  for (const [y, row] of grid.entries()) {
    for (const [x, pos] of row.entries()) {
      if (pos !== ROLL) continue;

      let adjacent = 0;
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          if (i === 0 && j === 0) continue;

          const checkX = x + i;
          const checkY = y + j;

          if (
            checkX < 0 ||
            checkX === row.length ||
            checkY < 0 ||
            checkY === grid.length
          )
            continue;

          const toCheck = grid[checkY][checkX];
          if (toCheck === ROLL) adjacent++;
        }
      }

      if (adjacent < 4) count++;
    }
  }
}

function part2() {
  let count = 0;
  let toRemove = [];

  do {
    toRemove = [];

    for (const [y, row] of grid.entries()) {
      for (const [x, pos] of row.entries()) {
        if (pos !== ROLL) continue;

        let adjacent = 0;
        for (let i = -1; i <= 1; i++) {
          for (let j = -1; j <= 1; j++) {
            if (i === 0 && j === 0) continue;

            const checkX = x + i;
            const checkY = y + j;

            if (
              checkX < 0 ||
              checkX === row.length ||
              checkY < 0 ||
              checkY === grid.length
            )
              continue;

            const toCheck = grid[checkY][checkX];
            if (toCheck === ROLL) adjacent++;
          }
        }

        if (adjacent < 4) {
          count++;
          toRemove.push([y, x]);
        }
      }
    }

    for (const [y, x] of toRemove) {
      grid[y][x] = ".";
    }
  } while (toRemove.length > 0);

  console.log(count);
}

part2();
