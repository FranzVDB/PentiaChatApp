import React from 'react';
import {SafeAreaView, Text} from 'react-native';
import {PCFacebookLogin} from '../components/auth-buttons/facebook-login';
import {PCAGoogleSigninButton} from '../components/auth-buttons/google-login';

export const UnAuthShell = () => {
  return (
    <SafeAreaView>
      <Text> You can login in here!</Text>
      <PCFacebookLogin />
      <PCAGoogleSigninButton />
    </SafeAreaView>
  );
};
