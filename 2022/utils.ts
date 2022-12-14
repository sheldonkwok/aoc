const decoder = new TextDecoder();

let rawInput = "";
for await (const chunk of Deno.stdin.readable) {
  rawInput += decoder.decode(chunk);
}

rawInput.trimEnd();

const griddy = <T>(size: number, fill: T): T[][] => {
  return Array.from(Array(size), () => Array(size).fill(fill));
};

const utils = {
  rawInput,
  griddy,
};

export default utils;
