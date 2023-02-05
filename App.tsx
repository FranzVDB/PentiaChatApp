import 'react-native-gesture-handler';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

import React, {useContext, useEffect} from 'react';

import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {
  UserContext,
  UserContextProvider,
  UserContextType,
} from './src/state/auth-context';
import {AuthedShell} from './src/views/authed-shell';
import {UnAuthShell} from './src/views/un-authed-shell';
import {NavigationContainer} from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';
import {StatusBar} from 'react-native';

GoogleSignin.configure();

function Shell() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <UserContextProvider>
      <App />
    </UserContextProvider>
  );
}

function App(): JSX.Element {
  const {user} = useContext<UserContextType>(UserContext);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <StatusBar barStyle="light-content" />
      {user ? (
        <NavigationContainer>
          <AuthedShell />
        </NavigationContainer>
      ) : (
        <UnAuthShell />
      )}
    </GestureHandlerRootView>
  );
}

export default Shell;
