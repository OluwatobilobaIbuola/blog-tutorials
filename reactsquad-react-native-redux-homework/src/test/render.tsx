import { PropsWithChildren, ReactElement } from 'react';
import { render } from '@testing-library/react-native';
import type { RenderOptions } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { rootState, RootState } from '../redux/root-reducer';
import { AppStore } from '../redux/store';
import { store as appStore } from '../redux/store';

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: Partial<RootState>;
  store?: AppStore;
}

const customRender = (
  ui: ReactElement,
  {
    preloadedState = rootState,
    store = appStore,
    ...renderOptions
  }: ExtendedRenderOptions = {},
) => {
  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return <Provider store={store}>{children}</Provider>;
  }
  return { ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
};

export default customRender;
