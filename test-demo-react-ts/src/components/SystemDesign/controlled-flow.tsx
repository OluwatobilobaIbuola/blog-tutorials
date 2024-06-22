import React, { ReactElement } from "react";

export const ControlledFlow = ({
  children,
  setDataHandler,
  currentStepIndex,
}: {
  children: ReactElement<{ next: (value: {}) => void }>[];
  setDataHandler: (value: {}, childrenLength: number) => void;
  currentStepIndex: number;
}) => {
  const currentChild = React.Children.toArray(children)[currentStepIndex];

  const next = (dataFromStep: {}) => {
    setDataHandler(dataFromStep, children.length);
  };

  if (React.isValidElement(currentChild)) {
    return React.cloneElement(
      currentChild as ReactElement<{
        next: (value: {}) => void;
      }>,
      { next }
    );
  }

  return <>{currentChild}</>;
};
