import { combineSlices, configureStore } from "@reduxjs/toolkit";
import { createLogger } from "redux-logger";
import createSagaMiddleware from "redux-saga";
import { rootSaga } from "./saga";
import { counterSlice } from "@/src/features/counter/counter-reducer";
import { userProfileSlice } from "@/src/features/userProfiles/user-profile-reducer";

const isClient = typeof window !== "undefined";
const isProduction = process.env.NODE_ENV === "production";
const isDevelopment = process.env.NODE_ENV === "development";

const rootReducer = combineSlices(counterSlice, userProfileSlice);
export const rootState = rootReducer(undefined, { type: "" });

export type RootState = ReturnType<typeof rootReducer>;

const sagaMiddleware = createSagaMiddleware();

export const makeStore = (preloadedState: RootState) => {
  const store = configureStore({
    devTools: !isProduction,
    preloadedState,
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware({ thunk: false })
        .concat(sagaMiddleware)
        .concat(isDevelopment ? [createLogger()] : []);
    },
  });

  if (isClient) {
    sagaMiddleware.run(rootSaga);
  }

  return store;
};

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore["dispatch"];

// create custom combineReducers function

const combineReducers = (reducers: any) => {
  return function reducer(state: any, action: any) {
    return Object.keys(reducers).reduce((nextState, slice) => {
      nextState[slice] = reducers[slice](state[slice], action);
      return nextState;
    }, {} as Record<string, any>);
  };
};
