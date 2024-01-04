import * as utils from "./utils.ts";

const input = await utils.getInput(Number(import.meta.file.split(".")[0]));
const lines = input.split("\n");

function part1() {
  const RED_MAX = 12;
  const GREEN_MAX = 13;
  const BLUE_MAX = 14;

  function checkColor(color: string, count: number): boolean {
    if (color === "red") return count <= RED_MAX;
    if (color === "green") return count <= GREEN_MAX;
    if (color === "blue") return count <= BLUE_MAX;

    return false;
  }

  const gameIds = lines.map((l) => {
    const [game, info] = l.split(": ");

    const gameId = Number(game.split(" ")[1]);

    const rounds = info.split(";");
    for (const round of rounds) {
      const marbles = round.trim().split(",");

      for (const shown of marbles) {
        const [count, color] = shown.trim().split(" ");

        if (!checkColor(color, Number(count))) return 0;
      }
    }

    return gameId;
  });

  console.log(utils.sum(gameIds));
}

function part2() {
  const powers = lines.map((l) => {
    const [_, info] = l.split(": ");

    let redMax = 0;
    let greenMax = 0;
    let blueMax = 0;

    const rounds = info.split(";");
    for (const round of rounds) {
      const marbles = round.trim().split(",");

      for (const shown of marbles) {
        const [countStr, color] = shown.trim().split(" ");
        const count = Number(countStr);

        if (color === "red" && count > redMax) redMax = count;
        else if (color === "blue" && count > blueMax) blueMax = count;
        else if (color === "green" && count > greenMax) greenMax = count;
      }
    }

    return redMax * greenMax * blueMax;
  });

  console.log(utils.sum(powers));
}

part2();
