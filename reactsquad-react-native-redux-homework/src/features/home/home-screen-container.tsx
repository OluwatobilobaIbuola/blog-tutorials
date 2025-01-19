import { Text, StyleSheet } from 'react-native';
import { useEffect } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import ViewComponent from '@/src/components/ui/wrapper/view-component';
import { h } from '@/src/utils/responsive';
import { Button } from '@rneui/base';
import { connect, ConnectedProps } from 'react-redux';
import { fetchUsersRequest } from '../user-profile/user-profile-reducer';
import { RootState } from '@/src/redux/root-reducer';

const mapStateToProps = (state: RootState) => ({
  users: state.userProfile.users,
});

const mapDispatchToProp = {
  fetchUsersRequest,
};

const connnector = connect(mapStateToProps, mapDispatchToProp);

type UserProfilePropsFromRedux = ConnectedProps<typeof connnector>;

export default connnector(function HomeScreenComponent({
  users,
  fetchUsersRequest,
}: UserProfilePropsFromRedux) {
  useEffect(() => {
    fetchUsersRequest();
  }, []);

  return (
    <SafeAreaProvider>
      <ViewComponent style={styles.container}>
        <SafeAreaView style={styles.container}>
          <ViewComponent style={styles.Wrapper}>
            <Text style={styles.textHeading}>Users</Text>
            {Object.values(users).map((user: any) => (
              <Text style={styles.textParagraph} key={user.id}>
                {user.name}
              </Text>
            ))}
            <Button title="Refetch Users" onPress={() => fetchUsersRequest()} />
          </ViewComponent>
        </SafeAreaView>
      </ViewComponent>
    </SafeAreaProvider>
  );
});

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
