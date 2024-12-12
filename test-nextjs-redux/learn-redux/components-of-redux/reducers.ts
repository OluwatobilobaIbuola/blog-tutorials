// create custom combineReducers function

const combineReducers = (reducers: any) => {
  return function reducer(state: any, action: any) {
    return Object.keys(reducers).reduce((nextState, slice) => {
      nextState[slice] = reducers[slice](state[slice], action);
      return nextState;
    }, {} as Record<string, any>);
  };
};

