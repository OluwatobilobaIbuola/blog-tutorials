import { ThemeProvider } from '@rneui/themed';
import { Slot } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { persistor, store } from '../redux/store';
import { theme } from '../styles/theme';

export default function Layout() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <StatusBar style="light" />
          <Slot />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}
