import utils from "./utils.ts";

const input = utils.rawInput
  .split("\n")
  .map((line) =>
    Array.from(line.matchAll(/x=(-?\d+), y=(-?\d+)/g)).map((m) => [
      Number(m[1]),
      Number(m[2]),
    ])
  );

const p1 = (row: number) => {
  const rowMap = new Map<number, string>();

  const setNone = (x: number) => {
    if (rowMap.has(x)) return;
    rowMap.set(x, "#");
  };

  for (const [[sX, sY], [bX, bY]] of input) {
    const distance = Math.abs(sX - bX) + Math.abs(sY - bY);

    if (bY === row) rowMap.set(bX, "B");
    if (sY === row) rowMap.set(sX, "S");

    const yTarget = Math.abs(row - sY);
    if (yTarget > distance) continue;

    const remaining = distance - yTarget;

    for (let i = 0; i <= remaining; i++) {
      setNone(sX - i);
      setNone(sX + i);
    }
  }

  const size = Array.from(rowMap.values()).filter((v) => v === "#").length;
  return size;
};

const p2 = (maxGrid: number) => {
  for (let row = 0; row < maxGrid; row++) {
    const ranges = [];

    for (const [[sX, sY], [bX, bY]] of input) {
      const distance = Math.abs(sX - bX) + Math.abs(sY - bY);

      const yTarget = Math.abs(row - sY);
      if (yTarget > distance) continue;

      const remaining = distance - yTarget;
      const min = sX - remaining;
      const max = sX + remaining;
      ranges.push([min, max]);
    }

    ranges.sort((a, b) => a[0] - b[0]);

    let [min, max] = ranges.shift()!;
    if (min < 0) min = 0;
    if (max > maxGrid) max = 0;

    for (let [l, r] of ranges) {
      if (l < 0) l = 0;
      if (r > maxGrid) r = maxGrid;

      if (l >= min && r <= max) continue;

      if (l <= max && r > max) max = r;
      else if (r >= min && l < min) min = l;
      else return (max + 1) * 4000000 + row;
    }
  }
};

console.log(p1(2000000));
console.log(p2(4000000));
