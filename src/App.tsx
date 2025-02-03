import 'react-native-gesture-handler';
import 'react-native-get-random-values';
import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/lib/integration/react';
import {persistor, store} from './store';
import ApplicationNavigator from './navigators/Application';
import Toast from 'react-native-toast-message';
import './translations';
import {toastConfig} from './utils/toast';
import {LogBox} from 'react-native';
import {PaperProvider} from 'react-native-paper';

const App = () => {
  LogBox.ignoreAllLogs(true);
  return (
    <Provider store={store}>
      {/**
       * PersistGate delays the rendering of the app's UI until the persisted state has been retrieved
       * and saved to redux.
       * The `loading` prop can be `null` or any react instance to show during loading (e.g. a splash screen),
       * for example `loading={<SplashScreen />}`.
       * @see https://github.com/rt2zz/redux-persist/blob/master/docs/PersistGate.md
       */}
      <PersistGate loading={null} persistor={persistor}>
        <PaperProvider>
          <ApplicationNavigator />
          <Toast config={toastConfig} />
        </PaperProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
