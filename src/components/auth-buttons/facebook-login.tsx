import {Image, StyleSheet, Text} from 'react-native';
import React from 'react';

import auth from '@react-native-firebase/auth';
import {LoginManager, AccessToken} from 'react-native-fbsdk-next';
import {TouchableOpacity} from 'react-native-gesture-handler';

export const PCAFacebookLogin = () => {
  async function onFacebookButtonPress() {
    // Attempt login with permissions
    const result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ]);

    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }

    // Once signed in, get the users AccesToken
    const data = await AccessToken.getCurrentAccessToken();

    if (!data) {
      throw 'Something went wrong obtaining access token';
    }

    // Create a Firebase credential with the AccessToken
    const facebookCredential = auth.FacebookAuthProvider.credential(
      data.accessToken,
    );

    // Sign-in the user with the credential
    return auth().signInWithCredential(facebookCredential);
  }

  return (
    <TouchableOpacity
      style={[styles.card, styles.shadowProp]}
      onPress={() =>
        onFacebookButtonPress().then(() =>
          console.log('Signed in with Facebook!'),
        )
      }>
      <Image
        style={styles.img}
        resizeMode="cover"
        source={{
          uri: 'https://www.freepnglogos.com/uploads/facebook-logo-icon/facebook-logo-icon-file-facebook-icon-svg-wikimedia-commons-4.png',
        }}
      />
      <Text style={styles.text}>Facebook</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  img: {width: 30, height: 30},
  card: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#32273c',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 25,
    width: 200,
    marginVertical: 5,
  },
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
});
