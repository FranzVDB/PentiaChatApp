import React, {useContext} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {UserContextType, UserContext} from '../state/auth-context';
import auth from '@react-native-firebase/auth';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {MaterialIcon} from '../components/material-icon';

// type Props = {
//   prop?: any;
// };

export const Profile = () => {
  const {user} = useContext<UserContextType>(UserContext);

  if (!user) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Image source={{uri: user.photoURL ?? ''}} style={styles.profileImg} />
        <Text style={styles.text}>{user.displayName}</Text>
        <Text style={styles.text}>{user.email}</Text>
      </View>
      <TouchableOpacity
        onPress={async () => {
          await auth().signOut();
        }}>
        <View style={styles.signoutBtn}>
          <Text style={styles.btnText}>Sign out</Text>
          <MaterialIcon color="white" name="logout" size="large" />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    gap: 10,
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#271a2d',
    height: '100%',
    width: '100%',
  },
  profileImg: {
    width: 100,
    height: 100,
    borderRadius: 25,
  },
  innerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#32273c',
    gap: 10,
    padding: 20,
    borderRadius: 20,
    width: '100%',
  },
  text: {
    color: 'white',
  },
  signoutBtn: {
    flexDirection: 'row',
    gap: 10,
    backgroundColor: '#32273c',
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    fontSize: 20,
    color: 'white',
  },
});
