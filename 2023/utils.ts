const EXAMPLE_SEPARATOR = "----";

const IS_REAL = Bun.argv.includes("-r");

export async function getInput(num: number): Promise<string> {
  const file = await Bun.file(`${num}.input`);
  const text = await file.text();

  const [example, real] = text.trim().split(EXAMPLE_SEPARATOR);

  return IS_REAL ? real.trim() : example.trim();
}

export function sum(numbers: number[]): number {
  return numbers.reduce((agg, curr) => agg + curr, 0);
}
