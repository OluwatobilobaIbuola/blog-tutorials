import { connect, ConnectedProps } from 'react-redux';
import { fetchUsersRequest } from '../user-profile/user-profile-reducer';
import { RootState } from '@/src/redux/root-reducer';
import { useEffect } from 'react';
import { HomeScreenComponent } from './home-screen-component';

const mapStateToProps = (state: RootState) => ({
  users: state.userProfile.users,
});

const mapDispatchToProp = {
  fetchUsersRequest,
};

const connnector = connect(mapStateToProps, mapDispatchToProp);

export type UserProfilePropsFromRedux = ConnectedProps<typeof connnector>;

export default connnector(function HomeScreenContainer({
  users,
  fetchUsersRequest,
}: UserProfilePropsFromRedux) {
  useEffect(() => {
    fetchUsersRequest();
  }, []);

  return (
    <HomeScreenComponent users={users} fetchUsersRequest={fetchUsersRequest} />
  );
});
