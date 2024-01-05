import * as utils from "./utils.ts";

const input = await utils.getInput(Number(import.meta.file.split(".")[0]));

const cards = input.split("\n");

const matched = cards.map((card) => {
  const [winStr, numStr] = card.split("|");

  const winning = winStr
    .split(":")[1]
    .trim()
    .split(" ")
    .filter((n) => n);

  const numbers = numStr
    .trim()
    .split(" ")
    .filter((n) => n);

  let count = 0;

  for (const num of numbers) {
    if (winning.includes(num)) count++;
  }

  return count;
});

function part1() {
  const points = matched.map((m) => {
    if (m === 0) return 0;
    return 2 ** (m - 1);
  });

  console.log(utils.sum(points));
}

function part2() {
  const numCards: number[] = new Array(matched.length).fill(1);

  for (const [index, match] of matched.entries()) {
    const currCards = numCards[index];

    for (let i = 1; i <= match; i++) {
      const newIndex = index + i;
      numCards[newIndex] = numCards[newIndex] + currCards;
    }
  }

  console.log(utils.sum(numCards));
}

part2();
