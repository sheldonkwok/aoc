const input = (await Deno.readTextFile("./10.input"))
  .trimEnd()
  .split("\n")
  .map((line) => {
    const [instruction, value] = line.split(" ");
    return { instruction, value: Number(value) };
  });

const CYCLES = new Set([20, 60, 100, 140, 180, 220]);

const ENCODER = new TextEncoder();
const LIT = ENCODER.encode("#");
const DARK = ENCODER.encode(".");
const NEWLINE = ENCODER.encode("\n");

let x = 1;
let cycle = 0;
let total = 0;

const runCycle = () => {
  cycle++;

  // p1
  if (CYCLES.has(cycle)) total += cycle * x;

  // p2
  const rowIndex = cycle % 40;
  const pixel = rowIndex >= x && rowIndex <= x + 2 ? LIT : DARK;

  Deno.stdout.write(pixel);
  if (rowIndex === 0) Deno.stdout.write(NEWLINE);
};

for (const { instruction, value } of input) {
  runCycle();
  if (instruction === "noop") continue;

  if (instruction === "addx") {
    runCycle();
    x += value;
  }
}

Deno.stdout.write(ENCODER.encode(`${total}\n`));
