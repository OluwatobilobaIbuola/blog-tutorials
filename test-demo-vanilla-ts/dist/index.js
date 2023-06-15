"use strict";
// //casting in typescript
// let input = document.querySelector("#inputTag") as HTMLInputElement;
// // console.log(input.value);
// // flatten array
let flatten = [];
let arr = [1, 2, 3, [4, 5, 6, [7, 8, 9]]];
const result = flatten.concat(...arr);
// // console.log("result from flatten", result);
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
console.log(person.hello.bind(this));
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
const promiseAcc = (...promises) => {
    let result = [];
    promises.forEach((promise) => {
        promise
            .then((res) => {
            console.log(res);
            // result.push(res);
        })
            .catch((err) => {
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
console.log("promise", promiseAcc(Promise.reject(30), Promise.reject(30), Promise.resolve(10), Promise.resolve(20), Promise.resolve(30)));
// promiseAll([
//   showName("Tobi"),
//   showLove("Jesus"),
//   showClass("New Generation Light Movement"),
// ]).then((res) => console.log(res));
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
function getProperty(obj, key) {
    return obj[key];
}
getProperty({ a: "hello", b: "world" }, "a"); // "hello"
const getUsersProperty = (users, key) => {
    return users.map((user) => user[key]);
};
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
    name: "mike",
    age: 23,
    classes: ["math", "english"],
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
console.log("newCustomer", newCustomer);
//# sourceMappingURL=index.js.map