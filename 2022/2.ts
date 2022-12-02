type LeftIn = "A" | "B" | "C";
type RightIn = "X" | "Y" | "Z";

const SHAPES = {
  A: "R",
  X: "R",
  B: "P",
  Y: "P",
  C: "S",
  Z: "S",
} as const;

const SHAPE_SCORE = { R: 1, P: 2, S: 3 } as const;
const WIN_CON = { R: "S", P: "R", S: "P" } as const;
const LOSS_ORDER = ["R", "P", "S"] as const;
const NUM_SHAPES = LOSS_ORDER.length;

const WIN = 6;
const DRAW = 3;
const LOSS = 0;
const RESULT_SCORE = { X: LOSS, Y: DRAW, Z: WIN };

const input = await Deno.readTextFile("./2.input");
const strategy = input
  .trimEnd()
  .split("\n")
  .map((line) => line.split(" ") as [LeftIn, RightIn]);

const winEngine = (oIn: LeftIn, pIn: RightIn): number => {
  const opponent = SHAPES[oIn];
  const player = SHAPES[pIn];
  const score = SHAPE_SCORE[player];

  if (opponent === player) return DRAW + score;

  const won = WIN_CON[player] === opponent;
  if (won) return WIN + score;

  return LOSS + score;
};

const targetEngine = (opponentIn: LeftIn, desiredIn: RightIn): number => {
  const oShape = SHAPES[opponentIn];
  const oIndex = LOSS_ORDER.indexOf(oShape);

  let pIndex = oIndex;

  if (desiredIn === "X") {
    pIndex = oIndex - 1;
    if (pIndex < 0) pIndex += NUM_SHAPES;
  } else if (desiredIn === "Z") {
    pIndex = oIndex + 1;
    if (pIndex === NUM_SHAPES) pIndex -= NUM_SHAPES;
  }

  const pShape = LOSS_ORDER[pIndex];
  const pScore = SHAPE_SCORE[pShape];
  return RESULT_SCORE[desiredIn] + pScore;
};

let total1 = 0;
let total2 = 0;

for (const [left, right] of strategy) {
  total1 += winEngine(left, right);
  total2 += targetEngine(left, right);
}

console.log(total1);
console.log(total2);
