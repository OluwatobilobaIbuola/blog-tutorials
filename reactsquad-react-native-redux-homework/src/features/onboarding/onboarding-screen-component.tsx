import { Button } from '@rneui/base';
import React from 'react';
import { StyleSheet } from 'react-native';
import { OnboardingScreenReduxProps } from './onboarding-screen-container';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import ViewComponent from '@/src/components/ui/wrapper/view-component';
import { h } from '@/src/utils/responsive';
import { TextInputComponent } from '@/src/components/ui/input/text-input-component';

type Props = {
  handleContinue: () => void;
  setName: (name: string) => void;
} & Omit<OnboardingScreenReduxProps, 'userNameAdded' | 'currentUser'>;

export default function OnboardingScreenComponent({
  handleContinue,
  setName,
}: Props) {
  return (
    <SafeAreaProvider>
      <ViewComponent style={styles.container}>
        <SafeAreaView style={styles.container}>
          <ViewComponent style={styles.Wrapper}>
            <ViewComponent>
              <TextInputComponent
                placeholder="Enter your name"
                onChangeText={setName}
              />
            </ViewComponent>
            <Button title="Continue" onPress={handleContinue} />
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
  text: {
    color: 'white',
  },
});
