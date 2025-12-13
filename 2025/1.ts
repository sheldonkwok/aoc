import * as utils from "./utils.ts";

const input = await utils.getInput(1);
const lines = input.split("\n");

const MAX = 100;

let pos = 50;
let times = 0;
let clicks = 0;

for (const l of lines) {
  const dir = l[0];
  let dist = Number(l.slice(1));
  const startedZero = pos === 0;

  clicks += Math.floor(dist / MAX);
  dist = dist % MAX;

  pos = dir === "L" ? pos - dist : pos + dist;

  if (pos < 0) {
    pos += MAX;
    if (!startedZero) clicks++;
  } else if (!startedZero && pos === 0) {
    clicks++;
  } else if (pos >= MAX) {
    pos -= MAX;
    if (!startedZero) clicks++;
  }

  if (pos === 0) times++;
}

console.log(times, clicks);
