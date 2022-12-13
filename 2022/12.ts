type Coord = [number, number];

const HEIGHT_MAP = new Map<string, number>();
"abcdefghijklmnopqrstuvwxyz"
  .split("")
  .forEach((v, i) => HEIGHT_MAP.set(v, i + 1));

const A = HEIGHT_MAP.get("a")!;
const S = 99;
const E = 27;

HEIGHT_MAP.set("S", S);
HEIGHT_MAP.set("E", E);

const grid = (await Deno.readTextFile("./12.input"))
  .trimEnd()
  .split("\n")
  .map((l) =>
    l.split("").map((char) => {
      const score = HEIGHT_MAP.get(char);
      if (score === undefined) throw new Error(`undefined ${char}`);
      return score;
    })
  );

const findStart = (target: number): Coord => {
  for (let y = 0; y < grid.length; y++) {
    const row = grid[y];

    for (let x = 0; x < row.length; x++) {
      const loc = row[x];
      if (loc === target) return [x, y];
    }
  }

  throw new Error(`${target} not found`);
};

const toKey = (x: number, y: number) => `${x}-${y}`;

const lift = (): number[][] => {
  return Array.from(Array(grid.length), () =>
    Array(grid[0].length).fill(Infinity)
  );
};

const gridLen = grid.length;
const rowLen = grid[0].length;
const getDirections = (x: number, y: number) => {
  const d = [
    [x + 1, y],
    [x - 1, y],
    [x, y + 1],
    [x, y - 1],
  ];

  return d.filter(
    ([newX, newY]) => newY >= 0 && newY < gridLen && newX >= 0 && newX < rowLen
  );
};

const p1 = () => {
  const gridWeights = lift();
  let shortestPath = Infinity;

  const search = ([x, y]: Coord, visited = new Set<string>()) => {
    const curr = grid[y][x];
    visited.add(toKey(x, y));

    const numVisited = visited.size;
    if (numVisited < gridWeights[y][x]) gridWeights[y][x] = numVisited;
    else return;

    const directions = getDirections(x, y);

    for (const [newX, newY] of directions) {
      if (visited.has(toKey(newX, newY))) continue;

      const next = grid[newY][newX];

      if (next <= curr + 1) {
        if (next === E) {
          const distance = visited.size;
          if (distance < shortestPath) shortestPath = distance;
          return;
        }

        search([newX, newY], new Set(visited));
      }
    }
  };

  search(findStart(S));
  console.log(shortestPath);
};

const p2 = () => {
  const gridWeights = lift();
  let shortestPath = Infinity;

  const search = ([x, y]: Coord, visited = new Set<string>()) => {
    const curr = grid[y][x];
    visited.add(toKey(x, y));

    const numVisited = visited.size;
    if (numVisited < gridWeights[y][x]) gridWeights[y][x] = numVisited;
    else return;

    const directions = getDirections(x, y);

    for (const [newX, newY] of directions) {
      if (visited.has(toKey(newX, newY))) continue;

      const next = grid[newY][newX];

      if (next >= curr - 1) {
        if (next === A) {
          const distance = visited.size;
          if (distance < shortestPath) shortestPath = distance;
          return;
        }

        search([newX, newY], new Set(visited));
      }
    }
  };

  search(findStart(E));
  console.log(shortestPath);
};

p1();
p2();
