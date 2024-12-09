// create factory function with default parameters for actions

const incrementBy = (amount = 1) => ({
  type: "INCREMENT_BY",
  payload: amount,
});
