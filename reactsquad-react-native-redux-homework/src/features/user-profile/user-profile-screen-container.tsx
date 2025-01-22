import { RootState } from '@/src/redux/root-reducer';
import { compose } from '@reduxjs/toolkit';
import { connect, ConnectedProps } from 'react-redux';
import { UserProfileScreenComponent } from './user-profile-screen-component';

const mapStateToProps = (state: RootState) => ({
  currentUser: state.userProfile.currentUser,
});

const connector = connect(mapStateToProps);

export type UserProfilePropsFromRedux = ConnectedProps<typeof connector>;

export default compose(connector(UserProfileScreenComponent));
