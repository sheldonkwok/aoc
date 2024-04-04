import * as utils from "./utils.ts";

const input = await utils.getInput(Number(import.meta.file.split(".")[0]));

function parse(str: string): number[] {
  const ret = str.match(/\d+/g)?.map(Number);
  if (!ret) throw new Error("Invalid input");
  return ret;
}

const [line1, line2] = input.split("\n");
const times = parse(line1);
const distances = parse(line2);

function waysToWin(time: number, distance: number): number {
  let count = 0;

  for (let hold = 1; hold < time; hold++) {
    const moving = time - hold;
    const travelled = hold * moving;

    if (travelled > distance) {
      count++;
    }
  }

  return count;
}

function part1() {
  const answer = times
    .map((time, i) => {
      const distance = distances[i];
      return waysToWin(time, distance);
    })
    .reduce((agg, curr) => agg * curr, 1);

  console.log(answer);
}

function part2() {
  const time = Number(times.join(""));
  const distance = Number(distances.join(""));

  console.log(waysToWin(time, distance));
}

part2();
