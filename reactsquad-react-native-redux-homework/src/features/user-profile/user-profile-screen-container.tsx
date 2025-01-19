import ViewComponent from '@/src/components/ui/wrapper/view-component';
import { RootState } from '@/src/redux/root-reducer';
import { h } from '@/src/utils/responsive';
import { compose } from '@reduxjs/toolkit';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { connect, ConnectedProps } from 'react-redux';

const mapStateToProps = (state: RootState) => ({
  currentUser: state.userProfile.currentUser,
});

const connector = connect(mapStateToProps);

type UserProfilePropsFromRedux = ConnectedProps<typeof connector>;

export default compose(
  connector(function UserProfileScreenComponent({
    currentUser,
  }: UserProfilePropsFromRedux) {
    return (
      <SafeAreaProvider>
        <ViewComponent style={styles.container}>
          <SafeAreaView style={styles.container}>
            <ViewComponent style={styles.Wrapper}>
              <Text style={[styles.textParagraph, { fontSize: 24 }]}>
                Hello, {currentUser || 'Guest'}!
              </Text>
            </ViewComponent>
          </SafeAreaView>
        </ViewComponent>
      </SafeAreaProvider>
    );
  }),
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#29252e',
    flexDirection: 'row',
    padding: 10,
  },
  Wrapper: {
    marginTop: h(24),
    marginBottom: h(30),
    gap: h(30),
    flex: 1,
  },
  textHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white',
  },
  textParagraph: {
    color: 'white',
  },
});
