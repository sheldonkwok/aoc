import * as utils from "./utils.ts";

const input = await utils.getInput(Number(import.meta.file.split(".")[0]));
const grid = input.split("\n").map((l) => l.split(""));

const GEAR = "*";
const SYMBOLS = [GEAR, "#", "+", "$", "/", "@", "%", "&", "-", "="];

function isSymbol(char: string): boolean {
  return SYMBOLS.includes(char);
}

function isNum(str: string): boolean {
  return !isNaN(Number(str));
}

function checkSymbol(
  y: number,
  x: number
): { hasSymbol: boolean; gearLoc?: string } {
  for (let diffY = -1; diffY < 2; diffY++) {
    for (let diffX = -1; diffX < 2; diffX++) {
      const toY = diffY + y;
      const rowToCheck = grid[toY];
      if (!rowToCheck) continue;

      const toX = diffX + x;
      const toCheck = rowToCheck[toX];
      if (!toCheck) continue;

      const hasSymbol = isSymbol(toCheck);

      if (hasSymbol)
        return {
          hasSymbol: true,
          gearLoc: toCheck === GEAR ? `${toY}-${toX}` : undefined,
        };
    }
  }

  return { hasSymbol: false };
}

const xLen = grid[0].length;
const partNums: number[] = [];
const gearRatios: number[] = [];

const HALF_GEARS = new Map<string, number>();

let currNum = "";
let currGear = "";
let isAdjacent = false;

for (let y = 0; y < grid.length; y++) {
  function processPart() {
    if (currNum !== "" && isAdjacent) {
      const num = Number(currNum);
      partNums.push(num);

      if (currGear) {
        const exists = HALF_GEARS.get(currGear);

        if (exists) gearRatios.push(num * exists);
        else HALF_GEARS.set(currGear, num);
      }
    }

    currNum = "";
    currGear = "";
    isAdjacent = false;
  }

  for (let x = 0; x < xLen; x++) {
    const loc = grid[y][x];

    if (loc === "." || isSymbol(loc)) {
      processPart();
    } else if (isNum(loc)) {
      currNum = `${currNum}${loc}`;

      if (!isAdjacent) {
        const { hasSymbol, gearLoc } = checkSymbol(y, x);

        if (hasSymbol) {
          isAdjacent = true;

          if (gearLoc) currGear = gearLoc;
        }
      }
    }
  }

  processPart();
}

console.log(utils.sum(partNums));
console.log(utils.sum(gearRatios));
