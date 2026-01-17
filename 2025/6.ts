import * as utils from "./utils.ts";

const input = await utils.getInput();

function part1() {
  const data = input.split("\n").map((l) => l.trim().split(/\s+/));

  let total = 0;

  for (let x = 0; x < data[0].length; x++) {
    const operator = data[data.length - 1][x];

    let val = Number(data[0][x]);

    for (let y = 1; y < data.length - 1; y++) {
      const num = Number(data[y][x]);

      if (operator === "+") val += num;
      else if (operator === "*") val *= num;
    }

    total += val;
  }

  console.log(total);
}

function part2() {
  const data = input.split("\n");
  const row0 = data[0];
  const numCols = data.length;

  const problems: number[] = [];
  let memory = [];

  for (let i = row0.length - 1; i >= 0; i--) {
    let num = "";
    let operation = "";

    for (let j = 0; j < numCols; j++) {
      const val = data[j][i];

      if (val === "*" || val === "+") operation = val;
      else if (val && val !== " ") num += val;
    }

    if (num) memory.push(Number(num));

    if (operation) {
      const problem = memory.slice(1).reduce((agg, curr) => {
        if (operation === "*") return agg * curr;
        if (operation === "+") return agg + curr;

        throw new Error("Shouldn't be here");
      }, memory[0]);

      problems.push(problem);

      memory = [];
    }
  }

  console.log(utils.sum(problems));
}

part2();
