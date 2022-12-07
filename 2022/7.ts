const input = (await Deno.readTextFile("./7.input"))
  .split("$")
  .slice(1)
  .map((s) => s.trim());

const SIZES = new Map<string, number>();

const addSize = (pathArr: string[], size: number) => {
  const flatKey = pathArr.join("-");
  const currSize = SIZES.get(flatKey);

  const toSet = currSize === undefined ? size : currSize + size;
  SIZES.set(flatKey, toSet);

  if (pathArr.length === 1) return;

  const parent = pathArr.slice(0, pathArr.length - 1);
  addSize(parent, size);
};

const currPath: string[] = [];
for (const line of input) {
  if (line.startsWith("cd")) {
    const [_, dir] = line.split(" ");

    if (dir === "..") {
      currPath.pop();
    } else {
      currPath.push(dir);
    }
  } else if (line.startsWith("ls")) {
    const list = line.split("\n").slice(1);

    for (const l of list) {
      const [desc] = l.split(" ");
      const num = parseInt(desc, 10);

      if (!isNaN(num)) addSize(currPath, num);
    }
  }
}

const part1 = () => {
  let total = 0;
  for (const [_, size] of SIZES) {
    if (size < 100000) total += size;
  }

  console.log(total);
};

const part2 = () => {
  const max = 70000000;
  const updateSize = 30000000;

  const total = SIZES.get("/")!;
  const remaining = max - total;
  const needed = updateSize - remaining;

  let spaceToDelete = Infinity;
  for (const [_, size] of SIZES) {
    if (size > needed && size < spaceToDelete) {
      spaceToDelete = size;
    }
  }

  console.log(spaceToDelete);
};

part1();
part2();
