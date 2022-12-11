// Just left it at part 2 and didn't feel like parsing

interface MonkeyIn {
  items: number[];
  op: (item: bigint) => bigint;
  mod: number;
  tMonkey: number;
  fMonkey: number;
}

class Monkey {
  items: bigint[];
  op: (item: bigint) => bigint;
  mod: bigint;
  tMonkey: number;
  fMonkey: number;
  inspections: number;

  constructor({ items, op, mod, tMonkey, fMonkey }: MonkeyIn) {
    this.items = items.map(BigInt);
    this.op = op;
    this.mod = BigInt(mod);
    this.tMonkey = tMonkey;
    this.fMonkey = fMonkey;
    this.inspections = 0;
  }

  receive(item: bigint) {
    this.items.push(item);
  }

  takeTurn() {
    for (const i of this.items) {
      const inspected = this.op(i) % MEGA_MOD;
      const target = inspected % this.mod === 0n ? this.tMonkey : this.fMonkey;

      this.inspections++;

      MONKEYS[target].receive(inspected);
    }

    this.items = [];
  }
}

const m0 = new Monkey({
  items: [98, 70, 75, 80, 84, 89, 55, 98],
  op: (item) => item * 2n,
  mod: 11,
  tMonkey: 1,
  fMonkey: 4,
});

const m1 = new Monkey({
  items: [59],
  op: (item) => item * item,
  mod: 19,
  tMonkey: 7,
  fMonkey: 3,
});

const m2 = new Monkey({
  items: [77, 95, 54, 65, 89],
  op: (item) => item + 6n,
  mod: 7,
  tMonkey: 0,
  fMonkey: 5,
});

const m3 = new Monkey({
  items: [71, 64, 75],
  op: (item) => item + 2n,
  mod: 17,
  tMonkey: 6,
  fMonkey: 2,
});

const m4 = new Monkey({
  items: [74, 55, 87, 98],
  op: (item) => item * 11n,
  mod: 3,
  tMonkey: 1,
  fMonkey: 7,
});

const m5 = new Monkey({
  items: [90, 98, 85, 52, 91, 60],
  op: (item) => item + 7n,
  mod: 5,
  tMonkey: 0,
  fMonkey: 4,
});

const m6 = new Monkey({
  items: [99, 51],
  op: (item) => item + 1n,
  mod: 13,
  tMonkey: 5,
  fMonkey: 2,
});

const m7 = new Monkey({
  items: [98, 94, 59, 76, 51, 65, 75],
  op: (item) => item + 5n,
  mod: 2,
  tMonkey: 3,
  fMonkey: 6,
});

const MONKEYS = [m0, m1, m2, m3, m4, m5, m6, m7];
const MEGA_MOD = MONKEYS.reduce((a, c) => a * c.mod, 1n);

const ROUNDS = 10000;
for (let r = 0; r < ROUNDS; r++) {
  for (const m of MONKEYS) {
    m.takeTurn();
  }
}

const mb = MONKEYS.slice().sort((a, b) => b.inspections - a.inspections);
console.log(mb[0].inspections * mb[1].inspections);
