import React, { ReactNode, useMemo } from "react";
import { Provider as ReduxProvider } from "react-redux";
import { RootState, makeStore, rootState } from "./store";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import Spinner from "@/components/spinner";

type Props = { children: ReactNode };

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

  if (typeof window === "undefined") return _store;

  if (!store) store = _store;

  return _store;
};

const useStore = (initialState: RootState = rootState) => {
  const store = useMemo(() => initializeStore(initialState), [initialState]);

  return { store };
};

export const reduxStore = initializeStore(rootState);

export default function Provider({ children }: Props) {
  const { store: reduxStore } = useStore();

  let persistor = persistStore(reduxStore);

  return (
    <ReduxProvider store={reduxStore}>
      <PersistGate
        loading={
          <div className="flex justify-center items-center min-h-screen">
            <Spinner />
          </div>
        }
        persistor={persistor}
      >
        {children}
      </PersistGate>
    </ReduxProvider>
  );
}
