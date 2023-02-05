import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {PCAFacebookLogin} from '../components/auth-buttons/facebook-login';
import {PCAGoogleSigninButton} from '../components/auth-buttons/google-login';

export const UnAuthShell = () => {
  return (
    <SafeAreaView style={{backgroundColor: '#271a2d'}}>
      <View style={styles.container}>
        <View>
          <Text style={styles.header}>Welcome!</Text>
          <Text style={styles.subHeader}>To the Pentia Chat App</Text>
        </View>
        <View style={styles.options}>
          <Text style={styles.text}> Sign in using</Text>
          <PCAFacebookLogin />
          <Text style={styles.text}>or</Text>
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
    backgroundColor: '#271a2d',
  },
  header: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white',
  },
  subHeader: {
    fontSize: 20,
    color: 'white',
  },
  options: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
});
