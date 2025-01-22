import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { UserProfilePropsFromRedux } from './user-profile-screen-container';
import ViewComponent from '@/src/components/ui/wrapper/view-component';
import { StyleSheet, Text } from 'react-native';
import { h } from '@/src/utils/responsive';

export function UserProfileScreenComponent({
  currentUser,
}: Partial<UserProfilePropsFromRedux>) {
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
