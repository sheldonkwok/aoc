import utils from "./utils.ts";

type RArr = number | number[] | RArr[];

const input = utils.rawInput
  .split("\n\n")
  .map((i) => i.split("\n").map(eval) as [RArr, RArr]);

const compare = (left: RArr, right: RArr): number => {
  const leftNum = typeof left === "number";
  const rightNum = typeof right === "number";

  if (leftNum && rightNum) return left - right;
  if (leftNum && !rightNum) return compare([left], right);
  if (!leftNum && rightNum) return compare(left, [right]);

  if (!leftNum && !rightNum) {
    for (let i = 0; i < left.length; i++) {
      const p2 = right[i];
      if (p2 === undefined) return 1;

      const p1 = left[i];
      const comp = compare(p1, p2);
      if (comp !== 0) return comp;
    }

    return left.length - right.length;
  }

  throw new Error("Shouldnt need the last guard");
};

const p1 = () => {
  let total = 0;

  for (const [i, [left, right]] of input.entries()) {
    if (compare(left, right) > 0) continue;
    total += i + 1;
  }

  console.log(total);
};

const p2 = () => {
  const divider1 = [[2]];
  const divider2 = [[6]];

  const flat: RArr[] = [divider1, divider2];
  input.forEach((row) => flat.push(...row));
  flat.sort(compare);

  const dI1 = flat.indexOf(divider1) + 1;
  const dI2 = flat.indexOf(divider2) + 1;
  console.log(dI1 * dI2);
};

p1();
p2();
