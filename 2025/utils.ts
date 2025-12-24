import { basename } from "node:path";

const EXAMPLE_SEPARATOR = "----";

const IS_REAL = Bun.argv.includes("-r");
const entryNum = Number(basename(Bun.main).split(".")[0]);

export async function getInput(num: number = entryNum): Promise<string> {
  if (isNaN(num)) throw new Error(`Invalid input number ${num}`);

  const file = await Bun.file(`${num}.input`);
  const text = await file.text();

  const [example, real] = text.trim().split(EXAMPLE_SEPARATOR);

  return IS_REAL ? real.trim() : example.trim();
}

export function sum(numbers: number[]): number {
  return numbers.reduce((agg, curr) => agg + curr, 0);
}
