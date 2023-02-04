import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {TouchableOpacity, Image, Text, StyleSheet} from 'react-native';
import React from 'react';

export const PCAGoogleSigninButton = () => {
  async function onGoogleButtonPress() {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
    // Get the users ID token
    const {idToken} = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  }

  return (
    <TouchableOpacity
      style={[styles.card, styles.shadowProp]}
      onPress={() =>
        onGoogleButtonPress().then(() =>
          console.log('Signed in with Facebook!'),
        )
      }>
      <Image
        style={styles.img}
        resizeMode="cover"
        source={{
          uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/2048px-Google_%22G%22_Logo.svg.png',
        }}
      />
      <Text style={styles.text}>Google</Text>
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
    backgroundColor: 'white',
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
  },
});
