// Create a generator that yields the numbers 1 to 5.

function* yieldsOneToFive() {
  yield 1;
  yield 2;
  yield 3;
  yield 4;
  yield 5;
}

const iterator = yieldsOneToFive();
// console.log(iterator.next()); // { value: 1 , done: false}
// console.log(iterator.next()); // { value: 2 , done: false}
// console.log(iterator.next()); // { value: 3 , done: false}
// console.log(iterator.next()); // { value: 4 , done: false}
// console.log(iterator.next()); // { value: 5 , done: false}
// console.log(iterator.next()); // { value: undefined , done: true}

// Create a generator that takes in a number and then yields all the numbers
// up to that number. e.g. 4: 0, 1, 2, 3, 4

function* yieldToAGivenValue(value) {
  for (let i = 0; i <= value; i++) {
    yield i;
  }
}

const it = yieldToAGivenValue(4);

// console.log(it.next().value);
// console.log(it.next().value);
// console.log(it.next().value);
// console.log(it.next().value);
// console.log(it.next().value);

function* myGenerator() {
  console.log("running");
  const firstNumber = yield 15;
  console.log("firstNumber", firstNumber);
  const name = yield firstNumber + 27;
  console.log("name", name);
  const result = yield firstNumber + name;
  console.log("result", result);
}

const myGen = myGenerator();
//
console.log(myGen.next(42)); // running, {value: 15, done: false}
//
console.log(myGen.next("John")); //  firstNumber John, {value: John27, done:false}
//
console.log(myGen.next()); // name undefined, {value: Johnundefined, done: false}
//
console.log(myGen.next("Mayer")); // result Mayer, {value: undefined, done; true}
//
console.log(myGen.next()); // {value: undefined, done; true}

// Lazy vs. eager
// Give synchronous examples for lazy.
// Operand selector operators ||, &&

let isNext = false;

const getUserId = () => fetch("some-api-call");

const result = isNext && getUserId();

// console.log(result); // false

// Give an example for something eager. (We already did `.map`.)

console.log("log 1");

const promise = new Promise((resolve) => {
  console.log("log 2");
  resolve("log promise");
});

console.log("log 4");
promise.then((res) => console.log(res));

// What are the three components of Redux Saga?

// 1. Sagas - Generators that manage side-effects.
// 2. Effects - Factory functions for objects that decribe future actions.
// 3. Middleware - Contains effect handlers, and manages the execution of the saga and the effects.

// Play terminal.
import { take } from 'redux-saga/effects';

console.log(take('increment'));

// { type: "TAKE", payload: { pattern: 'increment' }, '@@redux-saga/IO': true, combinator: false  }
// "combinatorial" run in parallel.

// All effects are action creators because they return objects with a type and a
// payload. BUT there are some additional saga specific properties.