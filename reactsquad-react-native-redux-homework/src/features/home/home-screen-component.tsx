import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import ViewComponent from '@/src/components/ui/wrapper/view-component';
import { Button, Text } from '@rneui/base';
import { UserProfilePropsFromRedux } from './home-screen-container';
import { FlatList, StyleSheet } from 'react-native';
import { h } from '@/src/utils/responsive';

export function HomeScreenComponent({
  users,
  fetchUsersRequest,
}: UserProfilePropsFromRedux) {
  const usersArray = Object.values(users);
  return (
    <SafeAreaProvider>
      <ViewComponent style={styles.container}>
        <SafeAreaView style={styles.container}>
          <ViewComponent style={styles.Wrapper}>
            <Text style={styles.textHeading}>Users</Text>
            {usersArray.length > 0 ? (
              <FlatList
                accessibilityRole="list"
                data={usersArray}
                renderItem={(user: any) => (
                  <Text style={styles.textParagraph} key={user.id}>
                    {user.name}
                  </Text>
                )}
              />
            ) : (
              <Text style={styles.textParagraph}>No users found</Text>
            )}
            <Button title="Refetch Users" onPress={() => fetchUsersRequest()} />
          </ViewComponent>
        </SafeAreaView>
      </ViewComponent>
    </SafeAreaProvider>
  );
}

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
