import { Stack } from 'expo-router';
import { ComponentType } from 'react';

export const withHeader =
  (options = {}) =>
  <P extends object>(Component: ComponentType<P>): ComponentType<P> => {
    return function WithHeader(props: P) {
      return (
        <>
          <Stack.Screen
            options={{
              headerTintColor: '#fff',
              ...options,
            }}
          />
          <Component {...props} />
        </>
      );
    };
  };
