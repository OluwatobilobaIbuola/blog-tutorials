import { render, screen } from '@testing-library/react-native';
import { createPopulatedUsers } from '../user-profile/user-factories';
import { HomeScreenComponent } from './home-screen-component';
import { ActionCreatorWithoutPayload } from '@reduxjs/toolkit';

const createProps = ({
  users = { 1: createPopulatedUsers(), 2: createPopulatedUsers() } as {},
  fetchUsersRequest = jest.fn() as unknown as ActionCreatorWithoutPayload<'userProfile/fetchUsersRequest'>,
} = {}) => ({
  users,
  fetchUsersRequest,
});

describe('HomeScreenComponent', () => {
  test('given an empty users map: should render a default message and not crash the app', () => {
    const props = createProps({ users: {} });
    render(<HomeScreenComponent {...props} />);
    expect(screen.queryByRole('list')).not.toBeOnTheScreen();
    expect(screen.getByText(/no users found/i)).toBeOnTheScreen();
  });
  test('given users map: should render a list of users', () => {
    const props = createProps();
    render(<HomeScreenComponent {...props} />);
    expect(screen.queryByRole('list')).toBeDefined();
  });
});
