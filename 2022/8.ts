const input = (await Deno.readTextFile("./8.input"))
  .trimEnd()
  .split("\n")
  .map((line) => line.split("").map(Number));

const LENGTH = input.length;

interface Check {
  numVisible: number;
  isVisible: boolean;
}

const checkLeft = (x: number, y: number, tree: number): Check => {
  let numVisible = 0;

  for (let scan = x - 1; scan >= 0; scan--) {
    numVisible++;
    const tmpTree = input[y][scan];
    if (tmpTree >= tree) return { numVisible, isVisible: false };
  }

  return { numVisible, isVisible: true };
};

const checkRight = (x: number, y: number, tree: number): Check => {
  let numVisible = 0;

  for (let scan = x + 1; scan < LENGTH; scan++) {
    numVisible++;
    const tmpTree = input[y][scan];
    if (tmpTree >= tree) return { numVisible, isVisible: false };
  }

  return { numVisible, isVisible: true };
};

const checkUp = (x: number, y: number, tree: number): Check => {
  let numVisible = 0;

  for (let scan = y - 1; scan >= 0; scan--) {
    numVisible++;
    const tmpTree = input[scan][x];
    if (tmpTree >= tree) return { numVisible, isVisible: false };
  }

  return { numVisible, isVisible: true };
};

const checkDown = (x: number, y: number, tree: number): Check => {
  let numVisible = 0;

  for (let scan = y + 1; scan < LENGTH; scan++) {
    numVisible++;
    const tmpTree = input[scan][x];
    if (tmpTree >= tree) return { numVisible, isVisible: false };
  }

  return { numVisible, isVisible: true };
};

const checkTree = (
  x: number,
  y: number
): { isVisible: boolean; score: number } => {
  const tree = input[y][x];

  let score = 1;
  let isVisible = false;

  const handleCheck = (check: Check) => {
    score *= check.numVisible;
    if (check.isVisible) isVisible = true;
  };

  handleCheck(checkLeft(x, y, tree));
  handleCheck(checkRight(x, y, tree));
  handleCheck(checkUp(x, y, tree));
  handleCheck(checkDown(x, y, tree));

  return { isVisible, score };
};

let total = 4 * LENGTH - 4;
let maxScore = 0;

for (let y = 1; y < LENGTH - 1; y++) {
  for (let x = 1; x < LENGTH - 1; x++) {
    const { isVisible, score } = checkTree(x, y);

    if (isVisible) total++;
    if (score > maxScore) maxScore = score;
  }
}

console.log(total, maxScore);
