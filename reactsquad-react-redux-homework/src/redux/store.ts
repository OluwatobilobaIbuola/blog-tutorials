import { combineSlices, configureStore } from "@reduxjs/toolkit";
import { createLogger } from "redux-logger";
import createSagaMiddleware from "redux-saga";
import { rootSaga } from "./saga";
import { appSlice } from "@/features/app-loading/app-loading-reducer";
import { userProfileSlice } from "@/features/user-profile/user-profile-reducer";

const isClient = typeof window !== "undefined";
const isProduction = process.env.NODE_ENV === "production";
const isDevelopment = process.env.NODE_ENV === "development";

const rootReducer = combineSlices(appSlice, userProfileSlice);
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
