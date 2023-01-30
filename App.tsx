/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useContext} from 'react';

import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {
  UserContext,
  UserContextProvider,
  UserContextType,
} from './src/state/auth-context';
import {AuthedShell} from './src/views/authed-shell';
import {UnAuthShell} from './src/views/un-authed-shell';

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

  if (!user) {
    return <UnAuthShell />;
  }

  return <AuthedShell />;
}

export default Shell;
