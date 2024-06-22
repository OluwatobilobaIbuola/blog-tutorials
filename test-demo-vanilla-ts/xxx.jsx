// Create a function called `wait` that takes in a value and a number of milli-
// seconds and after the given time, it should resolve with the promise if
// the value is truthy, and otherwise it should reject.
const wait = (value, seconds) =>
  new Promise((resolve, reject) =>
    setTimeout(
      () => (value ? resolve(value) : reject("Value isn't truthy")),
      seconds
    )
  );

// Create two functions called `asyncInc` and `asyncDouble`.
// `asyncInc` takes in a number and resolves with the number increment by one.
// `asyncDouble` takes in a number and resolves with the number doubled.
const asyncInc = (value) => new Promise((resolve) => resolve(inc(value)));
const asyncDouble = (value) => new Promise((resolve) => resolve(double(value)));

// Do it again! But use a different syntax.
const asyncInc1 = (value) => Promise.resolve(inc(value));
const asyncDouble1 = (value) => Promise.resolve(double(value));

// Do it one last time! But use a different syntax.
const asyncInc2 = async (value) => inc(value);
asyncInc2(4).then(console.log);
const asyncDouble2 = async (value) => double(value);
asyncDouble2(4).then(console.log);

// Create a function called `asyncPipe` that can take in any
// functions (promise-returning or not) and compose them in
// reverse mathematical order.
const asyncPipe =
  (...fns) =>
  (x) =>
    fns.reduce(async (y, fn) => fn(await y), x);

// Create a higher order component that is curried and takes in a title and
// then injects that title as a `title` prop into the wrapped component.

const MyComponent = ({ title }) => <p>{title}</p>;
const withTitle = (Component) => (props) =>
  <Component title="Hello" {...props} />;
const TitleComponent = withTitle();
<TitleComponent title="Goodbye" />
