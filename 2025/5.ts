import * as utils from "./utils.ts";

const input = await utils.getInput();
const [rangeStr, ingredientsStr] = input.split("\n\n").map(l => l.split('\n'));

const ranges = rangeStr.map(l => l.split('-').map(Number));
const ingredients = ingredientsStr.map(Number);

function isFresh(num: number): boolean {
  for (const [min, max] of ranges) {
    if (num >= min && num <= max) return true;
  }

  return false;
}

function part1(){
  const total = ingredients.reduce((agg, curr) => {
    if (isFresh(curr)) return agg + 1;
    return agg;
  }, 0);

  console.log(total)
}

function part2() {
  ranges.sort((a, b) => a[0] - b[0]);

  const newRanges = [ranges[0]];

  for (const [min, max] of ranges.slice(1)) {
    let modified = false;

    for (let i = 0; i < newRanges.length; i++) {
      const compRange = newRanges[i];
      const nextRange = newRanges[i + 1];

      const [compMin, compMax] = compRange;


      if (min >= compMin && max >= compMax) continue;

      
      if (min < compMin && max <= compMax) {
        compRange[0] = min;
        modified = true;
      }

      if (min >= compMin && max >= compMax) {
        compRange[1] = max;
        modified = true;
      }

      if (modified) break;
    }

    if (!modified) {
      newRanges.push([min, max]);
    }

    let i = 0;
    while (i < newRanges.length - 1) {
      const nextIndex = i + 1;
      const curr = newRanges[i];
      const next = newRanges[nextIndex];

      const [currMin, currMax] = curr;
      const [nextMin, nextMax] = next;

      if (nextMin >= currMin && nextMin <= currMax && nextMax >= currMax) {
        newRanges.splice(nextIndex, 1)
        curr[1] = nextMax;
      }

      if (currMin <= nextMin && currMax >= nextMax) {
        newRanges.splice(nextIndex, 1)
      }

      i++;
    }
  }


  const total = newRanges.reduce((agg, [min, max]) => {
    return agg + max - min + 1;
  }, 0);

  console.log(total);

}

part2();

