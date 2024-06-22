import { quotesSlice } from "@/features/quotes/quotesApiSlice";
import { combineSlices, configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { rootSaga } from "./saga";
import { useMemo } from "react";

/**
 * Constants
 */

const isClient = typeof window !== "undefined";
const isProduction = process.env.NODE_ENV === "production";
const isDevelopment = process.env.NODE_ENV === "development";

// Combine slices
const rootReducer = combineSlices(quotesSlice);
const rootState = rootReducer(undefined, { type: "" });

// Infer the `RootState` type from the root reducer
export type RootState = ReturnType<typeof rootReducer>;

// Create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// `makeStore` function
export const makeStore = (preloadedState: RootState) => {
  const store = configureStore({
    devTools: !isProduction,
    preloadedState,
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware);
    },
  });

  // Run the root saga
  // Avoid memory leaks, lel.
  if (isClient) {
    sagaMiddleware.run(rootSaga);
  }

  return store;
};

let store: undefined | ReturnType<typeof makeStore>;

const initializeStore = (preloadedState: RootState) => {
  let _store = store ?? makeStore(preloadedState);

  if (preloadedState && store) {
    _store = makeStore({
      ...store.getState(),
      ...preloadedState,
    });
    store = undefined;
  }

  // This check needs to run in the functions scope.
  if (typeof window === "undefined") return _store;

  if (!store) store = _store;

  return _store;
};

function useStore(initialState: RootState = rootState) {
  const store = useMemo(() => initializeStore(initialState), [initialState]);
  return store;
}

export { useStore };

// Infer the return type of `makeStore`
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `AppDispatch` type from the store itself
export type AppDispatch = AppStore["dispatch"];
