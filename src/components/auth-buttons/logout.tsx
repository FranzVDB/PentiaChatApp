import auth from '@react-native-firebase/auth';
import {Button, View} from 'react-native';
import React from 'react';

export const PCALogoutButton = () => {
  return (
    <View style={{paddingHorizontal: 10}}>
      <Button
        title="Sign out"
        onPress={async () => {
          await auth().signOut();
        }}
      />
    </View>
  );
};
