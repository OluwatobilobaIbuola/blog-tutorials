import { useState } from 'react';
import OnboardingFormComponent from './onboarding-form-component';

type Props = {
  handleContinue: (name: string) => void;
  currentUser: string;
};

export const OnboardingFormContainer = ({ currentUser, ...props }: Props) => {
  const [name, setName] = useState(currentUser);
  return (
    <OnboardingFormComponent {...props} name={name} onChangeText={setName} />
  );
};
