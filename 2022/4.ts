const input = (await Deno.readTextFile("./4.input")).trimEnd().split("\n");

let totalContain = 0;
let totalOverlap = 0;

for (const line of input) {
  const pair = line.split(",");

  let first = pair[0].split("-").map(Number);
  let second = pair[1].split("-").map(Number);

  if (first[0] > second[0]) {
    const temp = first;
    first = second;
    second = temp;
  }

  const sameStart = first[0] === second[0];
  const within = first[0] < second[0] && first[1] >= second[1];
  if (sameStart || within) totalContain++;

  const leftOverlap = second[0] >= first[0] && second[0] <= first[1];
  const rightOverlap = first[1] >= second[0] && first[1] <= second[1];
  if (leftOverlap || rightOverlap) totalOverlap++;
}

console.log(totalContain);
console.log(totalOverlap);
