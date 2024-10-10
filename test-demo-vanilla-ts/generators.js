function* addNumbers() {
  const a = yield "2";
  console.log("a", a);
  const b = yield "5";
  console.log("b", b);
  yield a + b;
  console.log("c after last yield", a + b);
}

const adder = addNumbers();

// console.log(adder.next()); // {value: "2", done: false}
// console.log(adder.next("70")); // 70,  {value: "5", done: false}
// console.log(adder.next()); // undefined,  {value: 70undefined, done: false}
// console.log(adder.next("What")); // c after last yield 70undefined,  {value: undefined, done: true}
// console.log(adder.next()); // Start the generator
// console.log(adder.next(3)); // Start the generator

const arr = "tobi";
const iterator = arr[Symbol.iterator]();

// console.log(iterator.next()); // { value: 10, done: false }
// console.log(iterator.next()); // { value: 20, done: false }
// console.log(iterator.next()); // { value: 30, done: false }
// console.log(iterator.next()); // { value: undefined, done: true }

const myIterable = {
  from: 1,
  to: 4,
  [Symbol.iterator]() {
    let current = this.from;
    const last = this.to;

    return {
      next() {
        if (current <= last) {
          return { value: current++, done: false };
        } else {
          return { value: undefined, done: true };
        }
      },
    };
  },
};

// for (let value of myIterable) {
//   console.log(value);
//   console.log("log");
// }

function* fetchData() {
  const user = yield fetch("https://api.example.com/user").then((res) =>
    res.json()
  );
  console.log(user);

  const posts = yield fetch(
    `https://api.example.com/user/${user.id}/posts`
  ).then((res) => res.json());
  console.log(posts);
}

function run(generator) {
  const it = generator();

  function handle(result) {
    if (result.done) return;
    result.value.then((data) => handle(it.next(data)));
  }

  handle(it.next());
}

run(fetchData);

function* gameLoop() {
  let score = 0;
  while (true) {
    score += yield `Current score: ${score}`;
  }
}

const game = gameLoop();

// console.log(game.next()); // "Current score: 0"
// console.log(game.next(1)); // "Current score: 10"
// console.log(game.next(2));
// console.log(game.next(7));
// console.log(game.return(20));
