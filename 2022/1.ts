const input = await Deno.readTextFile("./1.input");
const elfBags = input.split("\n\n");

const add = (a: number, b: number) => a + b;
const desc = (a: number, b: number) => b - a;

const elfCalories = elfBags
  .map((bag) => bag.split("\n").map(Number).reduce(add, 0))
  .sort(desc);

const part1 = elfCalories[0];
const part2 = elfCalories.splice(0, 3).reduce(add, 0);

console.log(part1);
console.log(part2);
