import { compose } from '@reduxjs/toolkit';
import OnboardingScreenComponent from './onboarding-screen-component';
import { connect, ConnectedProps } from 'react-redux';
import { useState } from 'react';
import { userNameAdded } from '../user-profile/user-profile-reducer';
import { withHeader } from '../navigation/withHeader';
import { RootState } from '@/src/redux/root-reducer';
import LinearGradient from 'react-native-linear-gradient';
import { router } from 'expo-router';
import { useEffectOnce } from '../../hooks/use-effect-once';

const mapStateToProps = (state: RootState) => ({
  currentUser: state.userProfile.currentUser,
});

const mapDispatchToProps = {
  userNameAdded,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export type OnboardingScreenReduxProps = ConnectedProps<typeof connector>;

export default compose(
  withHeader({
    title: 'Welcome',
    headerTintColor: '#fff',
    headerStyle: {
      backgroundColor: 'transparent',
    },
    headerBackground: () => (
      <LinearGradient colors={['#FF7E5F', '#FEB47B']} style={{ flex: 1 }} />
    ),
    headerTitleStyle: {
      fontWeight: 'bold',
      fontSize: 18,
    },
    animation: 'fade',
  }),
  connector,
)(function OnboardingScreenContainer({
  userNameAdded,
  currentUser,
  ...props
}: OnboardingScreenReduxProps) {
  useEffectOnce(() => {
    if (currentUser) {
      setTimeout(() => {
        router.replace('/home');
      }, 100);
    }
  });

  const [name, setName] = useState('');
  const handleContinue = () => {
    userNameAdded(name);
    router.push('/home');
  };

  return (
    <OnboardingScreenComponent
      {...props}
      handleContinue={handleContinue}
      setName={setName}
    />
  );
});
