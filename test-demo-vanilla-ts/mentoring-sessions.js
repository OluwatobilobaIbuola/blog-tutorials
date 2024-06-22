// string

let str = "hello world";

// number

let fig = 2;

// undefined

let notSeen = undefined;

// null

let food = null;

// boolean

let isEmpty = true;
let isFilled = false;

// symbol

let Secret = Symbol("My Secret");

// bigIn

let myLargeNumber = BigInt(123455934737483483); // 1000n;

// List the 4 differences between an arrow function and the function
// keyword.

//// syntax

//function keyword
function add(x, y) {
  return x + y;
}
//arrow function
const addArrowType = (x, y) => x + y;

//// this context

let a = {
  name: "Tobi",
  getName: () => {
    return this.name;
  },
  getNameWithActualThisContext: function () {
    return this.name;
  },
};
console.log(a.getName()); // undefined
console.log(a.getNameWithActualThisContext());

//// declaration

// console.log(substract(3,2)) // 1

function substract(a, b) {
  return a - b;
}
console.log(substractSecond(3, 2)); // referenceError
const substractSecond = (x, y) => {
  return a - b;
};

//// implicit return

function addTwo(x, y) {
  return x + y;
}
//arrow function
const addArrowTypeTwo = (x, y) => x + y;

// What is a pure function?

// 1. pure functions return same output for a given input
// 2. lacks side-effects: pure functions does not mutate data or state
// pure function is deterministic

// Create a function `sum` that takes in two numbers and adds them.

// const sum = (a, b) => a + b;

// Refactor `sum` to be curried.

const curriedSum = (a) => (b) => a + b;

// Create a function called `multiply` that takes in two numbers and
// multiplies them and is curried.
const curriedMultiply = (a) => (b) => a * b;

// Now write down the definition of currying. What is currying?

const curry = () => {};
const add3 = (a, b, c) => a + b + c;
const add3Curried = curry(add3); // add3Curried(1)(2)(3); add3Curried(1, 2)(3); add3Curried(1)(2, 3);

// Currying is when a function can take in its arguments one at a time and
// return a new function until it finally returns its final result.

// Use your curried sum and multiply functions with partial applications and
// point-free style to create two new functions:
// - inc, which should take in a number and increase it by 1,
// - double, which should take in a number and double it.

let inc = curriedSum(1); // point-free ✅
let increamentee = inc(40);
console.log(increamentee); // 41

let double = curriedMultiply(2);
let doubledNum = double(18);
console.log(doubledNum); // 36

// Homework: Define the functions double and inc again, but in a pointed style, but
// still using your curried sum and multiply functions in their respective
// definitions.

let incSecond = curriedSum(1);

// Using the native implementations of `map` and `filter`, create curried
// functions `map` and `filter`.
// 1. `map` should take in a function and then an array and then map the
// function over the array.
// 2. `filter` should take in a predicate and then an array and then filter the
// array based on the predicate.

const map = (fn) => (arr) => arr.map(fn);
const filter = (fn) => (arr) => arr.filter(fn);

// Review: Explain to me point-free style by creating a point-free function
// and the same function again but pointed (non point-free).

const addx = (a) => (b) => a + b;
const add4 = addx(4); // add4 is taking in number and returning number ✅
// Create add4NonPointFree using `add` again in a pointed way.

// const addSomething = (b) => add4(b)
const add4NonPointFree = (a) => addx(4)(a); // add4NonPointFree is taking in number but returning function 🚫

// Create a function called `isEven` which takes in a number and then returns
// true if the number is even, otherwise false.

const isEven = (a) => a % 2 === 0;

// Using your custom `map` and custom `filter` functions, as well as your custom
// `double` and `isEven` functions, create two new functions called `doubleMap`,
// and `filterEvens`.
// - doubleMap: takes in an array of numbers and returns every number in that
// array doubled.
// - filterEvens: takes in an array of numbers and returns a new array with
// only the even numbers.

const doubleMap = map(double);
const filterEvens = filter(isEven);

// What is a closure? Closure is a function that has some of its argument fixed
// in its lexical scope. A closure is created an runtime from other functions.

// How is closure related to currying? If a d function is unary then it can be a closure
// Does closure always imply currying? Not all closure are curried function because a curried
// function must take multiply argument one at a time but closure can take more
// than an argmeent at a time to completes its application. Closure can also have
// no arguments.
// Does currying always imply closure? Yes. currried functions can have fixed
// variable in its lexical scope which makes it a closure. return functions
// functions from a curried function are always a closure.

// Create a custom `reduce` function. Reduce should also be curried, similar
// to how your custom `map` and `filter` functions worked.
// Hint: think about how many arguments a custom reduce needs.

const customReduce = (fns) => (x) => (arr) => arr.reduce(fns, x);

// Using your custom `reduce` function, create a function `sumArr` that takes in
// an array of numbers and returns the sum of all the numbers in the array.
// And define `sumArr` point-free.

const arrSum = [1, 2, 3];
const sumArr = customReduce(add)(0);

sumArr(arrSum);

// Composition

// Create a function `compose2` that takes in two functions and composes them
// in mathematical order.

const compose2 = (x, y) => (z) => x(y(z));

// const doubleInc = compose2(double, inc);
// doubleInc(4); // 10

// Create a function `compose` that takes in ANY number of functions and
// composes them in mathematical order.

const compose =
  (...fns) =>
  (x) =>
    fns.reduceRight((y, fn) => fn(y), x);

// Create a function `pipe` that takes in ANY number of functions and composes
// them in REVERSE mathematical order.
// We're going to get to this later.
const pipe =
  (...fns) =>
  (x) =>
    fns.reduce((y, fn) => fn(y), x);

// Create a function called `wait` that takes in a value and a time in milli-
// seconds. And then after the time has passed, the function should resolve with
// the value if the value is truthy, otherwise it should reject after the time
// has passed also with the value.

const wait = (value, time) =>
  new Promise((resolve, reject) =>
    !!value
      ? setTimeout(() => resolve(value), time)
      : setTimeout(() => reject(value), time)
  );
wait(null, 1000).then(console.log).catch(console.log); 

// Create two functions:
// asyncInc should take in a number and increment that number by 1 and resolve
// with a promise of that result.
// asyncDouble should take in a number and double that number and resolve with
// a promise of that result.

// const asyncInc = (num) => Promise.resolve(
//   num + 1
// )
// asyncInc(2).then(console.log) // 3

// const asyncDouble = (num) => Promise.resolve(
//   num * 2
// )
// asyncDouble(4) // 8

// Do it again! But use a different syntax.

const asyncInc = async (num) => num + 1
const res = asyncInc(3) // 4
res.then(console.log) // 4
const asyncDouble = async (num) => num * 2
asyncDouble(4).then(console.log)

// Create a function called `asyncPipe` which can compose normal functions and
// promise returning functions in reverse mathematical order.

const asyncPipe = (...fns) => (x) => fns.reduce(async (y, fn) => fn(await y), x);

// First increment, then double a number.
const asyncDoubleInc = asyncPipe(asyncInc, asyncDouble)

// TypeScript Tax
// Code review: 80%
// TDD: 40% - 80%
// TypeScript: up to 20%

// 1000 bugs
// After code review: 200 bugs left, 800 bugs caught
// After TDD: 120 bugs left, 80 bugs caught
// After TypeScript: 96 bugs left, 24 caught

// The Missing Introduction to React
// Why React?
// Before React, race conditions in DOM updates because non-deterministic.
// non-determinism = mutatable state + parallel processing
// React has deterministic view renders.
// 1. Component state is immutable and every new state change triggers a new
// render.
// 2. Unidirectional dataflow: parent to child.

// Why JSX?
// - mixing JavaScript with easy, declarative markup
// - separated by concern (UI vs. side-effects) vs. by technology (HTML, CSS,
// JavaScript)
// - abstracts away browser differences
// - abstracts away platform differences (mobile apps, videos, VRs,
// native desktop apps)