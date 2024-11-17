import React, { ReactElement, useState } from "react";

export const UncontrolledFlow = ({
  children,
  onDone,
}: {
  children: ReactElement<{ next: (value: {}) => void }>[];
  onDone: (value: {}) => void;
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [data, setData] = useState({});

  const currentChild = React.Children.toArray(children)[currentStepIndex];

  const next = (dataFromStep: {}) => {
    const nextIndex = currentStepIndex + 1;
    const updatedData = { ...data, ...dataFromStep }; 

    if (nextIndex < children.length) {
      setCurrentStepIndex(nextIndex);
    } else {
      onDone(updatedData);
    }

    setData(updatedData);
  };

  if (React.isValidElement(currentChild)) {
    return React.cloneElement(
      currentChild as ReactElement<{ next: (value: {}) => void }>,
      { next }
    );
  }

  return <>{currentChild}</>;
};
