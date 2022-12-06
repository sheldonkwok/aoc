const input = (await Deno.readTextFile("./3.input")).trimEnd().split("\n");

const ALPHABET = "abcdefghijklmnopqrstuvwxyz".split("");
const PRIORITIES = new Map<string, number>();
for (const [i, letter] of ALPHABET.entries()) {
  PRIORITIES.set(letter, i + 1);
  PRIORITIES.set(letter.toUpperCase(), i + 1 + ALPHABET.length);
}

const getPrio = (item?: string) => {
  if (!item) throw new Error("Missing item");
  const prio = PRIORITIES.get(item);

  if (!prio) throw new Error(`Missing priority ${item}`);
  return prio;
};

const part1 = (rugsacks: string[]) => {
  let total = 0;

  for (const sack of rugsacks) {
    const half = Math.ceil(sack.length / 2);
    const first = sack.slice(0, half);
    const second = sack.slice(half);

    const firstSet = new Set(first);
    const item = Array.from(second).find((item) => firstSet.has(item));
    total += getPrio(item);
  }

  console.log(total);
};

const part2 = (rugsacks: string[]) => {
  let total = 0;

  for (let i = 0; i < rugsacks.length; i += 3) {
    const elves = rugsacks.slice(i, i + 3).sort((a, b) => b.length - a.length);

    const first = Array.from(elves[0]);
    const set2 = new Set(elves[1]);
    const set3 = new Set(elves[2]);

    const item = first.find((item) => set2.has(item) && set3.has(item));
    total += getPrio(item);
  }

  console.log(total);
};

part1(input);
part2(input);
