const [stackStr, instructionStr] = (await Deno.readTextFile("./5.input"))
  .trimEnd()
  .split("\n\n");

const SPACE = 4;
const stack = stackStr.split("\n");
const instructions = instructionStr.split("\n");
const lastLine = stack.pop();
const numCols = Number(lastLine?.trimEnd().slice(-1));

const isLetter = (str: string) => str !== "[" && str !== "]" && str !== " ";

const COLS: string[][] = Array.from(Array(numCols), () => Array.from([]));

for (const row of stack.reverse()) {
  let i = 1;

  while (i < row.length) {
    const char = row[i];
    if (isLetter(char)) {
      const colIndex = Math.floor(i / 4);
      COLS[colIndex].push(char);
    }

    i += SPACE;
  }
}

const cm9000 = (cols: string[][]) => {
  for (const line of instructions) {
    const { count, src, dest } = parseInstruction(line);

    for (let i = 0; i < count; i++) {
      const popped = cols[src].pop();
      if (popped === undefined) throw new Error("Popped too many");

      cols[dest].push(popped);
    }
  }

  getTop(cols);
};

const cm9001 = (cols: string[][]) => {
  for (const line of instructions) {
    const { count, src, dest } = parseInstruction(line);

    const srcCol = cols[src];
    const memory: string[] = [];

    for (let i = 0; i < count; i++) {
      const popped = srcCol.pop();
      if (popped === undefined) break;

      memory.unshift(popped);
    }

    cols[dest].push(...memory);
  }

  getTop(cols);
};

const parseInstruction = (line: string) => {
  const match = line.match(/^move (\d+) from (\d+) to (\d+)$/)!;

  const count = Number(match[1]);
  const src = Number(match[2]) - 1;
  const dest = Number(match[3]) - 1;

  return { count, src, dest };
};

const getTop = (cols: string[][]) => {
  let top = "";

  for (const col of cols) {
    top += col[col.length - 1];
  }

  console.log(top);
};

cm9000(structuredClone(COLS));
cm9001(structuredClone(COLS));
