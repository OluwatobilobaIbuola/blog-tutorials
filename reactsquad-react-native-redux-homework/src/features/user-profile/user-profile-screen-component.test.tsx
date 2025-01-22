import { render, screen } from '@testing-library/react-native';
import { UserProfileScreenComponent } from './user-profile-screen-component';

const createProps = ({ currentUser = 'Guest' } = {}) => ({
  currentUser,
});

describe('UserProfileScreenComponent', () => {
  test('given no props: it does render a default ', () => {
    const props = createProps();
    render(<UserProfileScreenComponent {...props} />);
    expect(screen.getByText(/hello, guest!/i));
  });
  test('given a currentUser: it does renders the currentUser', () => {
    const props = createProps({ currentUser: 'Oluwatobiloba' });
    render(<UserProfileScreenComponent {...props} />);
    expect(screen.getByText(/hello, oluwatobiloba!/i));
  });
});
