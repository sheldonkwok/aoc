import * as utils from "./utils.ts";

const input = await utils.getInput(2);
const lines = input.split(",").map(l => l.split('-').map(Number)); //.slice(1, 2);


function isValid1(input: number): boolean {
  const str = input.toString();
  const len = str.length;
  if (len % 2 !== 0) return true;

  const mid = Math.floor(str.length / 2);
  const h1 = str.substring(0, mid);
  const h2 = str.substring(mid);

  return h1 !== h2;
}

function isValid2(input: number): boolean {
  const str = input.toString();
  const len = str.length;

  for (let i = 0; i < len; i++) {
    const scan = str.substring(0, i + 1);

    let exited = false;
    let matching = false;

    for (let j = i + 1; j < len; j += i +1) {
      const toCheck = str.substring(j, j+i + 1);

      if (scan !== toCheck) {
        exited = true;
        break;
      } else {
        matching = true;
      }
    }

    if (matching && !exited) return false
  }

  return true;
}



let total1 = 0;
let total2 = 0;

for (const [start, end] of lines) {
  for (let i = start; i <= end; i++) {
    if(!isValid1(i)) total1 += i;
    if(!isValid2(i)) total2 += i;
  }
}

console.log(total1, total2);
