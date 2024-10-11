// Redux
// What are the 6 building blocks of Redux?
// store - Application global state
// actions (action creators)
// reducers
// middleware
// selectors
// dispatch

// Create a reducer for a state with a count. And there should two actions:
// increment: which increments the counter by 1
// incrementBy: which takes in a number and then increments the counter
// by that number.
// Write code as clean as you can.

const slice = "count";
const initialState = {
  count: 0,
};

const increment = () => ({ type: "INCREMENT" });
const incrementBy = (payload) => ({ type: "INCREMENT_BY", payload });

const counterReducer = (state = initialState, { type, payload } = {}) => {
  switch (type) {
    case increment().type:
      return { ...state, count: state.count++ };
    case incrementBy().type:
      return { ...state, count: state.count + payload };
    default:
      return state;
  }
};

// Show me how you would use your reducer function. (So we can check
// if it works correctly). And for that you might need `.reduce()` from
// arrays.

const actionArray = [increment(), incrementBy(4)];

const value = actionArray.reduce(counterReducer, counterReducer());
// console.log(value);


function *foo() {
	let x = yield 2;
	z++;
	let y = yield (x * z);
	console.log( x, y, z );
}

let z = 1;

let it1 = foo();
let it2 = foo();

let val1 = it1.next().value;		
let val2 = it2.next().value;		

val1 = it1.next( val2 * 10 ).value;		
val2 = it2.next( val1 * 5 ).value;	

it1.next( val2 / 2 );		
									
it2.next( val1 / 4 );	
