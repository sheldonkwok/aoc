import * as utils from "./utils.ts";

const input = await utils.getInput(Number(import.meta.file.split(".")[0]));
const lines = input.split("\n");

const seeds = lines[0].split(" ").slice(1).map(Number);

const mapLines = lines.slice(2);

let srcCat = "";
let dstCat = "";

export interface CategoryMap {
  src: number;
  dst: number;
  rng: number;
}

const MAPS = new Map<string, CategoryMap[]>();

function getMiniMap(src: string): CategoryMap[] {
  const map = MAPS.get(src);
  if (map) return map;

  const newMap: CategoryMap[] = [];
  MAPS.set(src, newMap);

  return newMap;
}

for (const line of mapLines) {
  if (line.includes("map:")) {
    const lineArr = line.split(" ")[0].split("-");
    srcCat = lineArr[0];
    dstCat = lineArr[2];
  } else if (/^\d/.test(line)) {
    const [dst, src, rng] = line.split(" ").map(Number);

    const mini = getMiniMap(srcCat);
    mini.push({ src, dst, rng });
  }
}

const seedCache = new Map<number, number>();

function getSeedLoc(seed: number): number {
  const cached = seedCache.get(seed);
  if (cached) return cached;

  let loc = seed;

  for (const [name, catMaps] of MAPS) {
    for (const { src, dst, rng } of catMaps) {
      if (loc >= src && loc <= src + rng) {
        const diff = loc - src;
        loc = dst + diff;

        break;
      }
    }
  }

  seedCache.set(seed, loc);

  return loc;
}

function part1() {
  let lowestLoc = Infinity;

  for (const seed of seeds) {
    const loc = getSeedLoc(seed);
    if (loc < lowestLoc) lowestLoc = loc;
  }

  console.log(lowestLoc);
}

function cutSeedRanges(start: number, range: number): number {
  let lowestLoc = Infinity;
  const increment = Math.floor(range / 8);

  if (increment === 1 || increment === 0) {
    for (let i = -range * 100000; i < range * 100000; i++) {
      const loc = getSeedLoc(start + i);
      if (loc < lowestLoc) lowestLoc = loc;
    }

    return lowestLoc;
  }

  let closestRange = 0;

  for (let i = 0; i < range; i += increment) {
    const loc = getSeedLoc(start + i);

    if (loc < lowestLoc) closestRange = i;
  }

  return cutSeedRanges(start + Math.floor(closestRange / 2), increment);
}

function part2() {
  let lowestLoc = Infinity;

  for (let i = 0; i < seeds.length; i += 2) {
    const start = seeds[i];
    const range = seeds[i + 1];

    const loc = cutSeedRanges(start, range);
    if (loc < lowestLoc) lowestLoc = loc;
  }

  console.log(lowestLoc);
}

part2();
