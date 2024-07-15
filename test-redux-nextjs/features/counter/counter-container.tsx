"use client";

import { RootState } from "@/redux/store";
import { compose } from "ramda";
import { ConnectedProps, connect } from "react-redux";
import { CounterComponent } from "./counter-component";
import { decrementAsync, incrementAsync } from "./counter-reducer";

const mapStateToProps = (state: RootState) => ({
  counter: state.counter.counter,
});

const mapDispatchToProps = () => ({
  incrementAsync: incrementAsync,
  decrementAsync: decrementAsync,
});
const connector = connect(mapStateToProps, mapDispatchToProps);
export type PropsFromRedux = ConnectedProps<typeof connector>;
export const CounterContainer = compose(connector)(function CounterContainer(
  props: PropsFromRedux
) {
  return <CounterComponent {...props} />;
});
