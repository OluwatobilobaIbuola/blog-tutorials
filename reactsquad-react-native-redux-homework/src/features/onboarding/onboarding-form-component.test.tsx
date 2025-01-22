import { render, screen } from '@testing-library/react-native';
import OnboardingFormComponent from './onboarding-form-component';

const createProps = ({
  handleContinue = jest.fn(),
  onChangeText = jest.fn(),
  name = 'Guest',
} = {}) => ({
  handleContinue,
  onChangeText,
  name,
});

describe('OnboardingFormComponent', () => {
  test('given props: render continue button and input field', () => {
    const props = createProps();
    render(<OnboardingFormComponent {...props} />);
    expect(screen.getByPlaceholderText(/enter your name/i));
    expect(screen.getByRole('button', { name: /continue/i }));
  });
  test('given an initial name: it does renders it in the input field', () => {
    const props = createProps({
      name: 'Oluwatobiloba',
    });
    render(<OnboardingFormComponent {...props} />);
    expect(screen.getByDisplayValue(/Oluwatobiloba/i)).toBeOnTheScreen();
  });
});
