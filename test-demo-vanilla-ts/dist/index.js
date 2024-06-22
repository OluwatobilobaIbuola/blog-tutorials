"use strict";
// //casting in typescript
// let input = document.querySelector("#inputTag") as HTMLInputElement;
// // console.log(input.value);
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.platform = void 0;
// // flatten array
let flatten = [];
let arr = [1, 2, 3, [4, 5, 6, [7, 8, 9]]];
const result = flatten.concat(...arr);
// console.log("result from flatten", result);
////object with inline interface
let person = {
    name: "John",
    hello: function (param) {
        console.log(this.name + " says hello " + param);
    },
};
let person2 = {
    name: "Edet",
};
// console.log(person.hello.call(person2, "world"));
//console.log(Person.hello.apply(Person2, ["world"]));
// console.log(person.hello.bind(this));
////composition function part of functional programming (declarative programming)
function add(a) {
    return a + 1;
}
function substract(a) {
    return a - 5;
}
function multiply(a) {
    return a * 1;
}
const compose = (...fns) => {
    return (arg) => {
        return fns.reduceRight((acc, fn) => {
            return fn(acc);
        }, arg);
    };
};
const addSubstractMultiply = compose(add, substract, add, add);
// console.log(addSubstractMultiply(5));
//another way of composition
const range = (a, b) => a > b ? [] : [a, ...range(a + 1, b)];
const multiplier = (arr) => arr.reduce((p, a) => p * a);
const factorial = (n) => multiplier(range(1, n));
// console.log(factorial(5));
////end of composition function////
////mimic the behaviour of promise.all
const promiseAll = (promises) => {
    let result = [];
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
// promiseAll([
//   showName("Tobi"),
//   showLove("Jesus"),
//   showClass("New Generation Light Movement"),
// ]).then((res) => console.log(res));
const PromiseArr = (...promises) => __awaiter(void 0, void 0, void 0, function* () {
    for (const promise of promises) {
        try {
            const result = yield promise;
            console.log(result);
        }
        catch (error) {
            console.log(-1);
            break;
        }
    }
});
// console.log(
//   PromiseArr(
//     Promise.reject(3),
//     Promise.resolve(50),
//     Promise.resolve(10),
//     Promise.reject(3),
//     Promise.resolve(20)
//   )
// );
////end of promise.all////
////debounce function////
const debounce = (fn, delay) => {
    let timer;
    return (...arg) => {
        if (timer)
            clearTimeout(timer);
        timer = setTimeout(() => {
            fn(...arg);
        }, delay);
    };
};
const handleChange = debounce((e) => {
    console.log(e.target.value);
}, 1000);
//high level module
class Car {
    constructor(engine) {
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
class Engine {
    push() {
        console.log("Pushes engine");
    }
    stop() {
        console.log("stops engine");
    }
}
// High-level module
class ShoppingCartService {
    constructor(paymentProcessor) {
        this.paymentProcessor = paymentProcessor;
    }
    checkout(cart) {
        return this.paymentProcessor.processPayment(cart);
    }
}
// Low-level module
class PaymentProcessor {
    processPayment(cart) {
        return true;
        // Process the payment for the items in the shopping cart
    }
}
// Implementation of the abstraction
class StripePaymentProcessor {
    processPayment(cart) {
        return true;
        // Use the Stripe API to process the payment for the items in the shopping cart
    }
}
// Now the ShoppingCartService depends on the abstraction, not the implementation
const shoppingCartService = new ShoppingCartService(new StripePaymentProcessor());
function customCurry(fn) {
    return (a) => (b) => fn(a, b);
}
function addTwoNumbers(a, b) {
    return a + b;
}
const addA = customCurry(addTwoNumbers);
const addB = addA(3);
function merge(fn) {
    return fn({});
}
const mergeArgResult = merge((arg) => {
    return {};
});
////how to write object literal type////
function identity(arg) {
    return arg;
}
let myIdentity = identity;
myIdentity("me");
let myIdentityTwo = function (arg) {
    return arg;
};
function identityTwo(arg) {
    console.log(arg.length); // you can call length property
    return arg;
}
//// more on type parameter for generic constrainst ////
function getPropertyValue(obj, key) {
    return obj[key];
}
getPropertyValue({ a: "hello", b: "world" }, "a"); // "hello"
const getUsersSpecificPropertyValue = (users, key) => {
    return users.map((user) => user[key]);
};
getUsersSpecificPropertyValue([{ id: 3, name: "Tobi Ibuola", age: 12 }], "id");
//// generic constrainst with class ////
class BeeKeeper {
    constructor() {
        this.hasMask = true;
    }
}
class ZooKeeper {
    constructor() {
        this.nametag = "Mikle";
    }
}
class Animal {
    constructor() {
        this.numLegs = 4;
    }
}
class Bee extends Animal {
    constructor() {
        super(...arguments);
        this.keeper = new BeeKeeper();
    }
}
class Lion extends Animal {
    constructor() {
        super(...arguments);
        this.keeper = new ZooKeeper();
    }
}
function createInstance(c) {
    return new c();
}
createInstance(Lion).keeper.nametag;
createInstance(Bee).keeper.hasMask;
//// typeof operator ////
let c = "Hello";
let b;
//// capturing the index with number ////
const MyArray = [
    { name: "Alice", age: 15 },
    { name: "Bob", age: 23 },
    { name: "Eve", age: 38 },
];
let mappedTypeExample = {};
let mode = "onTouched";
// console.log(mode);
//// classes ////
class Base {
    constructor() {
        this.x = 1;
    }
}
class Derived1 extends Base {
    constructor() {
        super(...arguments);
        this.x = 5;
    }
}
class Derived2 extends Base {
    f1(other) {
        other.x = 10;
    }
    f2(other) { }
}
const year = new Date().getFullYear();
// console.log("year", year);
class Coder {
    constructor(name, age, lang, music) {
        this.name = name;
        this.age = age;
        this.lang = lang;
        this.music = music;
    }
}
const studentOne = {
    name: "seyi",
    age: 30,
    classes: ["math", "french"],
};
for (const key in studentOne) {
    // console.log(student[key as keyof Student]);
    // console.log(studentOne[key as keyof typeof studentOne]);
}
const studentTwo = {
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
};
////
const ROLES = [];
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
const a = copyStage.forEach((item) => {
    return item;
});
// console.log("a", a);
//// declareation keyword ////
var k = 2;
k = 5;
// console.log("k", k);
var k;
//// hoisting ////
var text = "Hey bruh!";
var text = "Hey peter";
var text = "Hey john!";
var text;
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
const arrInitial = Array.from({ length: 10 }, (_, i) => i + 1);
// console.log("arrInitial", arrInitial);
//// does empty return empty array with map ////
const resultArray = (_a = []) === null || _a === void 0 ? void 0 : _a.map((item) => item * 2);
// console.log("resultArray", resultArray);
//// can u map undefined with an optional chaining ////
let varUndefined = undefined;
// let resultUndefined = varUndefined?.map((item) => item * 2);
//// construct query string ////
const queryResult = Object.entries({
    phoneNumber: "09087654321",
    name: "mike",
})
    .map((params) => {
    return `${params[0]}=${params[1]}`;
})
    .join("&");
// console.log("queryResult", queryResult);
//// replace email address with asterisk ////
const email = "ibuolatobi@gmail.com";
const emailResult = email.replace(/(?<=.{3}).(?=[^@]*?@)|(?:(?<=@.)|(?!^)\G(?=[^@]*$)).(?=.*\.)/g, "*");
// console.log("emailResult", emailResult);
//// restricted selected email suffices ////
function isValidMailAddress(email) {
    let match = /^\w+[-\.\w]*@(\w+[-\.\w]*?\.\w{2,4})$/.exec(email);
    if (!match)
        return false;
    let forbiddenDomains = ["gmail.com", "yahoo.com"];
    if (forbiddenDomains.indexOf(match[1].toLowerCase()) >= 0)
        return false;
    return true;
}
const bool = isValidMailAddress("ibuolatobi@gail.com");
// console.log("bool", bool)
//// union type of literal type ////
exports.platform = {
    brand: "ROLE_BRAND_SELLER",
    localStore: "ROLE_MARKET_SELLER",
    buyer: "ROLE_USER",
};
const user = {
    platforms: ["ROLE_BRAND_SELLER", "ROLE_USER"],
};
// Array.prototype.myMap = function <T, U>(cb: MapCallback<T, U>): U[] {
//   let arr: U[] = [];
//   for (let i = 0; i < this.length; i++) {
//     arr.push(cb(this[i], i, this));
//   }
//   return arr;
// };
// const mapData: number[] = [1, 2, 3, 4, 5];
// const mapLog: number[] = mapData.myMap((el) => el * 2);
// console.log("mapLog", mapLog);
Array.prototype.myMap = function (cb) {
    let arr = [];
    for (let i = 0; i < this.length; i++) {
        arr.push(cb(this[i], i, this));
    }
    return arr;
};
let testMyMapArr = [1, 2, 3, 4.5];
// console.log(
//   "testMyMapArr",
//   testMyMapArr.myMap((el) => el * 2)
// );
//// composition without mutaiton ////
const xObj = {
    val: 2,
};
const x1 = (x) => Object.assign({}, x, { val: x.val + 1 });
const x2 = (x) => Object.assign({}, x, { val: x.val * 2 });
// console.log("xObj", xObj);
// console.log("composition result", x1(x2(xObj)));
//// this and context methods bind, apply and call ////
//// 1 call ////
const thisPerson = {
    name: "John",
    greet: function (greeting) {
        return `${greeting}, ${this.name}!`;
    },
};
const greeting = thisPerson.greet.call({ name: "Jane" }, "Hello", 1, 2, 3);
// console.log("greeting", greeting);
//// 2. bind ////
const obj = {
    x: 42,
    getX: function (y) {
        console.log(this.y);
        return this.x + y;
    },
    y: "i have y",
};
const obj2 = {
    x: 92,
    y: "i have y now",
};
const boundGetX = obj.getX.bind(obj2);
// console.log(boundGetX(6)); // Outputs: 98
//// 3. apply ////
const v = obj.getX.apply(obj2, [4]);
// console.log("apply", v);
//// higher order function ////
//// Example of a higher-order function that works with different data types ////
function map(arr, fn) {
    const result = [];
    for (let i = 0; i < arr.length; i++) {
        result.push(fn(arr[i]));
    }
    return result;
}
const doubled = map([1, 2, 3], (x) => x * 2);
// console.log(doubled); // Outputs: [2, 4, 6]
const uppercased = map(["hello", "world"], (str) => str.toUpperCase());
// console.log(uppercased); // Outputs: ['HELLO', 'WORLD']
//// Example of a higher-order function facilitating partial application ////
function subHOF(x, y) {
    return x - y;
}
// Partial application using bind
const substractHOF = subHOF.bind(null, 2);
// console.log("substractHOF", substractHOF(5));
// type UnaryFunction<T, R> = (arg: T) => R;
// type UnaryFunctionArray<R> = Array<UnaryFunction<any, R>>;
// type PartialApplicationExample = (
//   ...fns: UnaryFunctionArray<any>
// ) => UnaryFunction<any, any>;
// type MapComposition = UnaryFunction<(str: string) => any, string[]>;
// type Join = UnaryFunction<string, string[]>;
// type ToLowerCase = UnaryFunction<string, string>;
// type Split = UnaryFunction<string, string[]>;
// type ToSlug = UnaryFunction<string, string>;
// const curryFn = (fn: Function) => (...args: any[]) => fn.bind(null, ...args);
// const partialApplicationExample: PartialApplicationExample = (
//   ...fns
// ) => (x: any) => fns.reduceRight((v, f) => f(v), x);
// const mapComposition: MapComposition = curryFn(
//   (fn, arr) => arr.map(fn)
// );
// const join: Join = curryFn((str, arr) => arr.join(str));
// const toLowerCase: ToLowerCase = (str) => str.toLowerCase();
// const split: Split = curryFn((splitOn, str) =>
//   str.split(splitOn)
// );
// const toSlug: ToSlug = partialApplicationExample(
//   encodeURIComponent,
//   join("-"),
//   mapComposition(toLowerCase),
//   split(" ")
// );
// console.log(toSlug("JS Cheerleader")); // 'js-cheerleader'
//// Example of a higher-order function that composes multiple functions ////
function composeHOF(...fns) {
    return function (x) {
        return fns.reduceRight((acc, fn) => fn(acc), x);
    };
}
// Example functions
function addOne(x) {
    return x + 1;
}
function square(x) {
    return x * x;
}
function subtractTwo(x) {
    return x - 2;
}
// Compose functions
const composedFunction = composeHOF(subtractTwo, square, addOne);
// Usage
// console.log(composedFunction(3))
// console.log("function expression",subtractTwo)
//// partial application ////
//pointed style
const list = (lastJoin = "and", ...items) => {
    const commaSeparated = items.slice(0, -1).join(", ");
    const lastItem = items.pop();
    return `${commaSeparated} ${lastJoin} ${lastItem}`;
};
// console.log(list("and", "peter", "paul", "sarah", "esther"));
//with partial
const partial = (fn, firstArg) => {
    return (...lastArgs) => {
        return fn(firstArg, ...lastArgs);
    };
};
const listWith = partial(list, "with");
// console.log(listWith("daniel", "sarah"))
const promiseAOne = new Promise((resolve, reject) => resolve(5));
const getUserById = (id) => new Promise((resolve, reject) => id === 1 ? resolve({ id, displayName: "Jan" }) : reject("User not found."));
const getName = ({ displayName }) => displayName;
const countLetters = (str) => str.length;
const asyncIsEven = (n) => Promise.resolve(n % 2 === 0);
function asyncPipe(...fns) {
    return (x) => fns.reduce((y, fn) => __awaiter(this, void 0, void 0, function* () { return fn(yield y); }), x);
}
const userHasEvenName = asyncPipe(getUserById, getName, countLetters);
userHasEvenName(1)
    .then((res) => console.log("response", res))
    .catch((err) => err.message);
//# sourceMappingURL=index.js.map