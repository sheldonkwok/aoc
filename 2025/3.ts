import * as utils from "./utils.ts";

const input = await utils.getInput(3);
const lines = input.split("\n").map((l) => l.split("").map(Number));
const len = lines[0].length;

function part1() {
  const total = lines.reduce((agg, batteries) => {
    let bigTen = 0;
    let bigOne = 0;

    for (let [i, bat] of batteries.entries()) {
      if (i === len - 1) break;
      if (bat < bigTen) continue;

      if (bat > bigTen) {
        bigTen = bat;
        bigOne = 0;
      }

      const ones = batteries.slice(i + 1);
      for (const [j, check] of ones.entries()) {
        if (check > bigOne) {
          bigOne = check;
        }
      }
    }

    const joltage = Number(`${bigTen}${bigOne}`);
    return agg + joltage;
  }, 0);

  console.log(total);
}

function part2() {
  const total = lines.reduce((agg, batteries) => {
    const joltage = biggest(batteries);
    return agg + joltage;
  }, 0);

  console.log(total);
}

function biggest(batteries: number[], left = 12): number {
  const len = batteries.length;

  for (let i = 9; i > 0; i--) {
    const foundIndex = batteries.findIndex((ele) => ele === i);
    if (foundIndex === -1) continue;

    if (len - foundIndex >= left) {
      if (left === 1) return i;

      const next = batteries.slice(foundIndex + 1);
      return Number(`${i}${biggest(next, left - 1)}`);
    }
  }

  throw new Error("Not found");
}

part2();
