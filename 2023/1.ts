import * as utils from "./utils.ts";

const input = await utils.getInput(1);
const lines = input.split("\n");

function part1() {
  const numbers = lines.map((l) => {
    const match = l.match(/\d/g);
    if (!match) return 0;

    const first = match[0];
    const last = match[match.length - 1];

    const number = Number(`${first}${last}`);
    return number;
  });

  const total = numbers.reduce((agg, curr) => agg + curr, 0);
  console.log(total);
}

function part2() {
  const mapper: Record<string, number> = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
  };

  function strToNum(str: string): number {
    const firstTry = Number(str);
    if (!isNaN(firstTry)) return firstTry;

    return mapper[str] ?? NaN;
  }

  function reverseStr(str: string) {
    var newString = "";
    for (var i = str.length - 1; i >= 0; i--) {
      newString += str[i];
    }
    return newString;
  }

  const firstRe = Object.keys(mapper).reduce(
    (agg, curr) => `${agg}|(${curr})`,
    "(\\d)"
  );

  const lastRe = Object.keys(mapper).reduce(
    (agg, curr) => `${agg}|(${reverseStr(curr)})`,
    "(\\d)"
  );

  const numbers = lines.map((l) => {
    const firstMatch = l.match(firstRe);

    if (!firstMatch) return 0;

    const first = strToNum(firstMatch[0]);
    const lastMatch = reverseStr(l).match(lastRe) ?? firstMatch;
    const last = strToNum(reverseStr(lastMatch[0]));
    const number = Number(`${first}${last}`);

    // console.log(l, firstMatch, number);
    return number;
  });

  const total = numbers.reduce((agg, curr) => agg + curr, 0);
  console.log(total);
}

part2();
