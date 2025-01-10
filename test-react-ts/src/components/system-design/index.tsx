import { useState } from "react";
import { StepOne, StepThree, StepTwo } from "./Step";
import { CurrentUserLoader } from "./current-user-loader";
import {
  DataSourceWithComponentInjection,
  DataSourceWithRenderProps,
} from "./data-source-with-render-props-or-component-injection";
import { Typeahead } from "./type-ahead";
import { UncontrolledFlow } from "./uncontrolled-flow";
import { UserInfo } from "./user-info";
import { ControlledFlow } from "./controlled-flow";

// export const DataSourceWithRenderPropsPattern = () => {
//   return (
//     <DataSourceWithRenderProps
//       getData={() => fetchData("/users/2")}
//       render={(resource) => <UserInfo user={resource} />}
//     />
//   );
// };
// export const DataSourceWithComponentInjectionPattern = () => {
//   return (
//     <DataSourceWithComponentInjection<UserTest>
//       getData={() => fetchData("/users/2")}
//       render={({ resource }) => <UserInfo user={resource} />}
//     />
//   );
// };

export const CurrentUserLoaderComp = () => {
  return (
    <CurrentUserLoader numbers={[1, 2, 3, 4, 5]}>
      <UserInfo />
    </CurrentUserLoader>
  );
};
export const UncontrolledFlowComp = () => {
  return (
    <UncontrolledFlow
      onDone={(data) => {
        console.log(data);
        alert("Onboarding Flow Done!");
      }}
    >
      <StepOne />
      <StepTwo />
      <StepThree />
    </UncontrolledFlow>
  );
};
export const ControlledFlowComp = () => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [data, setData] = useState({});

  const setDataHandler = (dataFromStep: {}, childrenLength: number) => {
    const nextIndex = currentStepIndex + 1;
    const updatedData = { ...data, ...dataFromStep };
    if (nextIndex < childrenLength) {
      setCurrentStepIndex(nextIndex);
    } else {
      console.log(data);
      alert("Onboarding Flow Done!");
    }
    setData(updatedData);
  };

  return (
    <ControlledFlow
      setDataHandler={setDataHandler}
      currentStepIndex={currentStepIndex}
    >
      <StepOne />
      <StepTwo />
      <StepThree />
    </ControlledFlow>
  );
};

const suggestions = ["apple", "banana", "orange", "grape", "kiwi"];
export const TypeaheadComp: React.FC = () => {
  return (
    <div>
      <h1>Typeahead Example</h1>
      <Typeahead suggestions={suggestions} />
    </div>
  );
};
