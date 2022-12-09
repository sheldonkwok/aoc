const input = (await Deno.readTextFile("./9.input"))
  .trimEnd()
  .split("\n")
  .map((line) => {
    const [direction, timesStr] = line.split(" ");
    const times = Number(timesStr);
    return { direction, times };
  });

abstract class Knot {
  x: number;
  y: number;
  next?: Body;

  constructor() {
    this.x = 0;
    this.y = 0;
  }

  spawn(count: number): Body {
    this.next = new Body();

    if (count === 1) return this.next;
    return this.next.spawn(count - 1);
  }
}

class Head extends Knot {
  tail: Body;

  constructor(count: number) {
    super();
    this.tail = this.spawn(count);
  }

  start() {
    for (const { direction, times } of input) {
      this.move(direction, times);
    }

    this.countTail();
  }

  move(direction: string, times: number) {
    for (let i = 0; i < times; i++) {
      if (direction === "L") {
        this.x--;
      } else if (direction === "R") {
        this.x++;
      } else if (direction === "U") {
        this.y++;
      } else if (direction === "D") {
        this.y--;
      }

      this.next?.follow(this.x, this.y);
    }
  }

  countTail() {
    let total = 0;
    for (const [_, row] of this.tail.been) {
      total += row.size;
    }

    console.log(total);
  }
}

class Body extends Knot {
  been: Map<number, Set<number>>;

  constructor() {
    super();
    this.been = new Map<number, Set<number>>();
  }

  follow(prevX: number, prevY: number) {
    let xMove = false;
    let yMove = false;

    if (prevX > this.x + 1) {
      this.x++;
      xMove = true;
    } else if (prevX < this.x - 1) {
      this.x--;
      xMove = true;
    }

    if (prevY > this.y + 1) {
      this.y++;
      yMove = true;
    } else if (prevY < this.y - 1) {
      yMove = true;
      this.y--;
    }

    if (xMove && !yMove) this.y = prevY;
    if (!xMove && yMove) this.x = prevX;

    this.markBeen();
    this.next?.follow(this.x, this.y);
  }

  markBeen() {
    let row = this.been.get(this.y);
    if (row === undefined) {
      row = new Set<number>();
      this.been.set(this.y, row);
    }

    row.add(this.x);
  }
}

const p1 = () => {
  const head = new Head(1);
  head.start();
};

const p2 = (parts: number) => {
  const head = new Head(parts - 1);
  head.start();
};

p1();
p2(10);
