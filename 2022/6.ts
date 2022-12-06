const input = await Deno.readTextFile("./6.input");

// const input = "mjqjpqmgbljsphdztnvjfqwrcgsmlb";
// const input = "bvwbjplbgvbhsrlpgdmjqwftvncz";

const START_PACKET_COUNT = 4;
const START_MESSAGE_COUNT = 14;

const findStart = (numUnique: number) => {
  let startIndex = 0;
  let curr = "";

  for (let i = 0; i < input.length; i++) {
    const char = input[i];

    const indexOf = curr.lastIndexOf(char);
    if (indexOf !== -1) {
      const next = indexOf + 1;
      curr = curr.slice(next);
      startIndex += next;
    }

    curr += char;
    if (curr.length === numUnique) {
      console.log(startIndex + numUnique);
      break;
    }
  }
};

findStart(START_PACKET_COUNT);
findStart(START_MESSAGE_COUNT);
