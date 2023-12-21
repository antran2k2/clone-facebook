import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MyStack from '@/Routes/Stack';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from './Redux/store';

import {PermissionsAndroid, StatusBar} from 'react-native';
import {PaperProvider} from 'react-native-paper';
PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
import SplashScreen from 'react-native-splash-screen';

function App(): JSX.Element {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <PaperProvider>
          <NavigationContainer>
            <StatusBar barStyle="dark-content" backgroundColor={'white'} />
            <MyStack />
          </NavigationContainer>
        </PaperProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
