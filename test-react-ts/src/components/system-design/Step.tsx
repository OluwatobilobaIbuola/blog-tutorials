export const StepOne = ({ next }: { next?: (value: {}) => void }) => {
  return (
    <>
      <h1>Step #1: Enter your name</h1>
      <br />
      <button
        className="border border-primary"
        onClick={() => next && next({ name: "TestName" })}
      >
        Next
      </button>
    </>
  );
};
export const StepTwo = ({ next }: { next?: (value: {}) => void }) => {
  return (
    <>
      <h1>Step #2: Enter your age</h1>
      <br />
      <button
        className="border border-primary"
        onClick={() => next && next({ age: 23 })}
      >
        Next
      </button>
    </>
  );
};
export const StepThree = ({ next }: { next?: (value: {}) => void }) => {
  return (
    <>
      <h1>Step #3: Enter your country</h1>
      <br />
      <button
        className="border border-primary"
        onClick={() => next && next({ country: "Nigeria" })}
      >
        Next
      </button>
    </>
  );
};
