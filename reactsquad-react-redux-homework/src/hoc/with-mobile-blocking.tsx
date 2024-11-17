import React from "react";
import { useWindowSize } from "react-use";

const MINIMUM_WIDTH = 1000;

function withMobileBlocking<T extends React.JSX.IntrinsicAttributes>(
  PermittedComponent: React.ComponentType<T>
) {
  return function WithMobileBlocking(props: T) {
    const { width } = useWindowSize();

    return width < MINIMUM_WIDTH ? (
      <div>MobileBlocking</div>
    ) : (
      <PermittedComponent {...props} />
    );
  };
}

export default withMobileBlocking;
