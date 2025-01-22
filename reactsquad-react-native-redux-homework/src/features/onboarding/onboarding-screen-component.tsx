import { OnboardingFormContainer } from './onboarding-form-container';
import { OnboardingScreenReduxProps } from './onboarding-screen-container';

type Props = {
  handleContinue: (name: string) => void;
} & Omit<OnboardingScreenReduxProps, 'userNameAdded'>;

export default function OnboardingScreenComponent({ ...props }: Props) {
  return <OnboardingFormContainer {...props} />;
}
