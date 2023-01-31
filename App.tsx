import 'react-native-gesture-handler';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

import React, {useContext} from 'react';

import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {
  UserContext,
  UserContextProvider,
  UserContextType,
} from './src/state/auth-context';
import {AuthedShell} from './src/views/authed-shell';
import {UnAuthShell} from './src/views/un-authed-shell';
import {NavigationContainer} from '@react-navigation/native';

GoogleSignin.configure();

function Shell() {
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
