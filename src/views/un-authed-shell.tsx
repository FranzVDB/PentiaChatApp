import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {PCAFacebookLogin} from '../components/auth-buttons/facebook-login';
import {PCAGoogleSigninButton} from '../components/auth-buttons/google-login';

export const UnAuthShell = () => {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View>
          <Text style={styles.header}>Welcome!</Text>
          <Text style={styles.subHeader}>To the Pentia Chat App</Text>
        </View>
        <View style={styles.options}>
          <Text style={styles.text}> Sign in using</Text>
          <PCAFacebookLogin />
          <Text>or</Text>
          <PCAGoogleSigninButton />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    gap: 10,
  },
  header: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  subHeader: {
    fontSize: 20,
  },
  options: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  text: {
    fontSize: 18,
  },
});
