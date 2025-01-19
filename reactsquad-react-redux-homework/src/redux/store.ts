import {
  persistReducer,
  PersistConfig,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { createLogger } from "redux-logger";
import createSagaMiddleware from "redux-saga";
import { rootSaga } from "./saga";
import {
  reducer as appLoadingReducer,
  slice as appLoadingSlice,
} from "@/features/app-loading/app-loading-reducer";
import {
  reducer as userProfileReducer,
  slice as userProfileSlice,
} from "@/features/user-profile/user-profile-reducer";
import {
  reducer as userAuthenticationReducer,
  slice as userAuthenticationSlice,
} from "@/features/user-authentication/user-authentication-reducer";

const isClient = typeof window !== "undefined";
const isProduction = process.env.NODE_ENV === "production";
const isDevelopment = process.env.NODE_ENV === "development";

const rootReducer = combineReducers({
  [appLoadingSlice]: appLoadingReducer,
  [userProfileSlice]: userProfileReducer,
  [userAuthenticationSlice]: userAuthenticationReducer,
});
export const rootState = rootReducer(undefined, { type: "" });

export type RootState = ReturnType<typeof rootReducer>;

const sagaMiddleware = createSagaMiddleware();

const persistConfig: PersistConfig<ReturnType<typeof rootReducer>> = {
  key: "root",
  storage: storage,
  whitelist: ["userAuthentication", "userProfile"],
  version: 1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);



export const makeStore = (preloadedState: RootState) => {
  const store = configureStore({
    devTools: !isProduction,
    preloadedState: preloadedState as any,
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware({
        thunk: false,
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      })
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
