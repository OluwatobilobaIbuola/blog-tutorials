// //casting in typescript
// let input = document.querySelector("#inputTag") as HTMLInputElement;
// // console.log(input.value);

// // flatten array
let flatten: Array<number | (number | number[])[]> = [];
let arr = [1, 2, 3, [4, 5, 6, [7, 8, 9]]];
const result = flatten.concat(...arr);
// // console.log("result from flatten", result);

////object with inline interface
let person: { name: string; hello: (param: string) => void } = {
  name: "John",
  hello: function (param: string) {
    console.log(this.name + " says hello " + param);
  },
};

let person2: { name: string } = {
  name: "Edet",
};
// console.log(person.hello.call(person2, "world"));
//console.log(Person.hello.apply(Person2, ["world"]));
console.log(person.hello.bind(this));

////composition function part of functional programming (declarative programming)
function add(a: number): number {
  return a + 1;
}
function substract(a: number): number {
  return a - 5;
}
function multiply(a: number): number {
  return a * 1;
}
type AddSubstractMultiply = (arg: number) => number;
const compose = (...fns: AddSubstractMultiply[]): AddSubstractMultiply => {
  return (arg: number) => {
    return fns.reduceRight((acc, fn) => {
      return fn(acc);
    }, arg);
  };
};
const addSubstractMultiply = compose(add, substract, add, add);
// console.log(addSubstractMultiply(5));

//another way of composition
const range = (a: number, b: number): number[] =>
  a > b ? [] : [a, ...range(a + 1, b)];
const multiplier = (arr: number[]) =>
  arr.reduce((p: number, a: number) => p * a);
const factorial = (n: number) => multiplier(range(1, n));
// console.log(factorial(5));
////end of composition function////

////mimic the behaviour of promise.all
const promiseAll = (promises: Promise<any>[]): Promise<string[] | Error> => {
  let result: any[] = [];
  return new Promise((resolve, reject) => {
    promises.forEach((promise, index) => {
      promise
        .then((res) => {
          result.push(res);
          if (index === promises.length - 1) {
            resolve(result);
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  });
};

const promiseAcc = (...promises: Promise<any>[]) => {
  let result: any[] = [];
  promises.forEach((promise: any) => {
    promise
      .then((res: any) => {
        console.log(res);
        // result.push(res);
      })
      .catch((err: any) => {
        // result.push(-1);
        console.log(-1);
      });
  });
};

// const showName = (name: string) => {
//   return new Promise((resolve, reject) => {
//     resolve(name);
//   });
// };
// const showLove = (name: string) => {
//   return new Promise((resolve, reject) => {
//     reject(name);
//   });
// };
// const showClass = (name: string) => {
//   return new Promise((resolve, reject) => {
//     reject(name);
//   });
// };

console.log(
  "promise",
  promiseAcc(
    Promise.reject(30),
    Promise.reject(30),
    Promise.resolve(10),
    Promise.resolve(20),
    Promise.resolve(30)
  )
);

// promiseAll([
//   showName("Tobi"),
//   showLove("Jesus"),
//   showClass("New Generation Light Movement"),
// ]).then((res) => console.log(res));

////end of promise.all////

////debounce function////
const debounce = (fn: Function, delay: number) => {
  let timer: ReturnType<typeof setTimeout>;
  return (...arg: any) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...arg);
    }, delay);
  };
};

const handleChange = debounce((e: any) => {
  console.log(e.target.value);
}, 1000);
//// end ////

////dependency injection////
interface EngineInterface {
  push(): void;
  stop(): void;
}

//high level module
class Car {
  private engine: EngineInterface;
  constructor(engine: EngineInterface) {
    this.engine = engine;
  }
  start() {
    this.engine.push();
  }
  stop() {
    this.engine.stop();
  }
}

//low level module
class Engine implements EngineInterface {
  push(): void {
    console.log("Pushes engine");
  }
  stop(): void {
    console.log("stops engine");
  }
}
// const toyota = new Car(new Engine());
// toyota.start();
////end of dependency injection////

////dependency inversion////
interface ShoppingCart {}

// High-level module
class ShoppingCartService {
  constructor(private paymentProcessor: PaymentProcessor) {}

  checkout(cart: ShoppingCart) {
    return this.paymentProcessor.processPayment(cart);
  }
}

// Low-level module
class PaymentProcessor {
  processPayment(cart: ShoppingCart) {
    return true;
    // Process the payment for the items in the shopping cart
  }
}

// Abstraction
interface PaymentProcessor {
  processPayment(cart: ShoppingCart): boolean;
}

// Implementation of the abstraction
class StripePaymentProcessor implements PaymentProcessor {
  processPayment(cart: ShoppingCart): boolean {
    return true;
    // Use the Stripe API to process the payment for the items in the shopping cart
  }
}

// Now the ShoppingCartService depends on the abstraction, not the implementation
const shoppingCartService = new ShoppingCartService(
  new StripePaymentProcessor()
);
////end of dependency inversion////

///// type of a flatten return type
type Flatten<T> = T extends Array<infer A> ? A : T;
type FlattenedNumbers = Flatten<(number | number[])[]>; // number or number[]

///// curry function (functional programming)
type curry<A, B, R> = (a: A) => (b: B) => R;
function customCurry<A, B, R>(fn: (a: A, b: B) => R): curry<A, B, R> {
  return (a: A) => (b: B) => fn(a, b);
}
function addTwoNumbers(a: number, b: number) {
  return a + b;
}
const addA = customCurry(addTwoNumbers);
const addB = addA(3);
// console.log(addB(5));

//example 2: curry function example (Not explained fully)
type UserSettings = { theme: string; language: string };
type UserDetails = { firstName: string; lastName: string };
type Curried<T, U> = (arg: U) => T & U;
function merge<T, U>(fn: Curried<T, U>): T & U {
  return fn({} as U);
}
const mergeArgResult = merge<UserDetails, UserSettings>((arg) => {
  return {} as UserDetails & UserSettings;
});
// console.log(mergeArgResult.hasOwnProperty("theme")); //true
// console.log(mergeArgResult);
///// curry function (functional programming)

///// how to infer a return type of a function
type MyFunction = (x: number, y: number) => { result: number };
type MyFunctionReturnType = ReturnType<MyFunction>; // { result: number }

////how to write object literal type////
function identity<Type>(arg: Type): Type {
  return arg;
}
let myIdentity: { <Type>(arg: Type): Type } = identity;
myIdentity<string>("me");

////how to write object literal type with interface////
interface GenericIdentityFn<Type> {
  (arg: Type): Type;
}
let myIdentityTwo: GenericIdentityFn<number> = function <Type>(
  arg: Type
): Type {
  return arg;
};
//myIdentityTwo("me") // error

//// generic constrainst ////
interface LengthProperty {
  length: number;
}
interface HasID {
  id: number;
}
function identityTwo<Type extends LengthProperty>(arg: Type): Type {
  console.log(arg.length); // you can call length property
  return arg;
}

//// more on type parameter for generic constrainst ////
function getProperty<Type, Key extends keyof Type>(obj: Type, key: Key) {
  return obj[key];
}
getProperty({ a: "hello", b: "world" }, "a"); // "hello"

const getUsersProperty = <T extends HasID, K extends keyof T>(
  users: T[],
  key: K
): T[K][] => {
  return users.map((user) => user[key]);
};

//// generic constrainst with class ////
class BeeKeeper {
  hasMask: boolean = true;
}

class ZooKeeper {
  nametag: string = "Mikle";
}

class Animal {
  numLegs: number = 4;
}

class Bee extends Animal {
  keeper: BeeKeeper = new BeeKeeper();
}

class Lion extends Animal {
  keeper: ZooKeeper = new ZooKeeper();
}

function createInstance<A extends Animal>(c: new () => A): A {
  return new c();
}

createInstance(Lion).keeper.nametag;
createInstance(Bee).keeper.hasMask;

//// keyof operator ////
type array = { [k: string]: unknown };
type a = keyof array;

//// typeof operator ////
let c = "Hello";
let b: typeof c;

//// indexed access type ////
type Person = { age: number; name: string; alive: boolean };
type P1 = Person[keyof Person];

//// capturing the index with number ////
const MyArray = [
  { name: "Alice", age: 15 },
  { name: "Bob", age: 23 },
  { name: "Eve", age: 38 },
];
type Person2 = (typeof MyArray)[number]["name"];

//// mapped type ////
type PersonExample = { name: string; hello: (param: string) => void };
type MappedTypeExample<Type> = {
  [Property in keyof Type]: Type[Property];
};
let mappedTypeExample = {} as MappedTypeExample<Person>;
type MappedTypeExample2<Type> = {
  [Property in keyof Type]: boolean;
};
type PersonMappedType = MappedTypeExample2<PersonExample>;

//// mapped type with template literal type ////
type Getters<Type> = {
  [Property in keyof Type as `get${Capitalize<
    string & Property
  >}`]: () => Type[Property];
};

interface PersonThree {
  name: string;
  age: number;
  location: string;
}
type LazyPerson = Getters<PersonThree>;

//// manipulating keys
type EventConfig<Events extends { kind: string }> = {
  [E in Events as E["kind"]]: (event: E) => void;
};

type SquareEvent = { kind: "square"; x: 2; y: 3 };
type CircleEvent = { kind: "circle"; radius: number };

type Config = EventConfig<SquareEvent | CircleEvent>;

//// string union in type ////
type AddOnMethod<Type> = {
  on<Key extends string & keyof Type>(
    eventName: `${Key}Changed`,
    callback: (arg: Type[Key]) => void
  ): void;
};
declare function makeWatchedObject<Type>(obj: Type): Type & AddOnMethod<Type>;
// const person1 = makeWatchedObject({ personName: "mike", age: 23 });
// person1.on("ageChanged", (arg) => {});

// another example
type ValidationMode = {
  onBlur: "onBlur";
  onChange: "onChange";
  onSubmit: "onSubmit";
  onTouched: "onTouched";
  all: "all";
};
type Mode = keyof ValidationMode;

let mode: Mode = "onTouched";
// console.log(mode);

//// classes ////

class Base {
  protected x: number = 1;
}
class Derived1 extends Base {
  protected x: number = 5;
}
class Derived2 extends Base {
  f1(other: Derived2) {
    other.x = 10;
  }
  f2(other: Base) {}
}

const year = new Date().getFullYear();
// console.log("year", year);

class Coder {
  constructor(
    public readonly name: string,
    private age: number,
    protected lang: string,
    public music: string
  ) {}
}

//// index signature ////
interface Student {
  [i: string]: string | number | string[] | undefined;
  name: string;
  age: number;
  classes?: string[];
}
const studentOne = {
  name: "mike",
  age: 23,
  classes: ["math", "english"],
};
for (const key in studentOne) {
  // console.log(student[key as keyof Student]);
  // console.log(studentOne[key as keyof typeof studentOne]);
}
const studentTwo: Student = {
  name: "mike",
  age: 23,
  classes: ["math", "english"],
};
// Object.keys(studentTwo).map((prop) => console.log(studentTwo[prop]));

//// type manipulation keyof////
// this captures the value of the name property
const ObjectNew = {
  debug: "DEBUG",
  warning: "WARNING",
  error: "ERROR",
} as const;

type LogLevel<T> = T[keyof T];
type LogLevelOne = LogLevel<typeof ObjectNew>;

////
const ROLES: string[] = [];
ROLES[0] = "ADMIN";
ROLES[1] = "USER";
const resultNow = ["ADMIN", "USER"]
  .map((role) => ROLES.includes(role))
  .find((val) => val === true);

// console.log("resultNow", resultNow);

////
const copyStage = [
  { name: "task 1", stage: 0 },
  { name: "task 2", stage: 1 },
  { name: "task 3", stage: 1 },
  { name: "task 4", stage: 2 },
  { name: "task 5", stage: 3 },
];
const [_, index] = "task 1".split(" ");
for (const key in copyStage) {
  if (Number(key) === Number(index)) {
    copyStage[key].stage = 2;
  }
}
// console.log("stageResult", stageResult);

//// javascrript test ////

const a = copyStage.forEach((item: any) => {
  return item;
});
// console.log("a", a);

//// declareation keyword ////
var k = 2;

k = 5;

// console.log("k", k);

var k: number;

//// poylfill ////
let data = [1, 2, 3, 4, 5];
Array.prototype.map = function (cb) {
  let arr = [];
  for (let i = 0; i < this.length; i++) {
    arr.push(cb(this[i], i, this));
  }
  return arr;
};
const mapLog = data.map((el) => el * 2);
// console.log(mapLog);

//// hoisting ////

var text = "Hey bruh!";
var text = "Hey peter";
var text = "Hey john!";
var text: string;
// console.log(text);

let textLet = "Hi Manu!";
// let textLet = "Please redeclare me!"; // error: text has already been declared

const customers = [
  { name: "mike", age: 23 },
  { name: "john", age: 24 },
  { name: "john", age: 35 },
  { name: "peter", age: 25 },
];
const newCustomer = customers.filter((item) => item.name.match("u"));
// console.log("newCustomer", newCustomer);


//// create array from number ////
Array.from({length: 10}, (_, i) => i + 1)
