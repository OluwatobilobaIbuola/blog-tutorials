import { Button } from '@rneui/base';
import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import ViewComponent from '@/src/components/ui/wrapper/view-component';
import { h } from '@/src/utils/responsive';
import { TextInputComponent } from '@/src/components/ui/input/text-input-component';

type Props = {
  name: string;
  handleContinue: (name: string) => void;
  onChangeText: (name: string) => void;
};

const noop = () => {};
const noopWithArgument = (arg: string) => {};

export default function OnboardingFormComponent({
  handleContinue = noopWithArgument,
  onChangeText = noop,
  name = 'Guest',
}: Props) {
  return (
    <SafeAreaProvider>
      <ViewComponent style={styles.container}>
        <SafeAreaView style={styles.container}>
          <ViewComponent style={styles.Wrapper}>
            <ViewComponent>
              <TextInputComponent
                placeholder="Enter your name"
                onChangeText={onChangeText}
                value={name}
              />
            </ViewComponent>
            <Button
              title="Continue"
              disabled={!name.trim()}
              onPress={() => handleContinue(name?.trim())}
            />
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
