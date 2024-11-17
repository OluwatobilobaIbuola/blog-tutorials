"use client";
import React, { ReactNode, useMemo } from "react";
import { Provider as ReduxProvider } from "react-redux";
import { RootState, makeStore, rootState } from "./store";

type Props = { children: ReactNode };

export default function Provider({ children }: Props) {
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
  const reduxStore = useStore();

  return <ReduxProvider store={reduxStore}>{children}</ReduxProvider>;
}
