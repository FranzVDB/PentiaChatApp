import {Image} from 'react-native';
import React, {useContext} from 'react';
import {UserContextType, UserContext} from '../../state/auth-context';
import {TouchableOpacity} from 'react-native-gesture-handler';

import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../views/authed-shell';

export const ProfileButton = () => {
  const {user} = useContext<UserContextType>(UserContext);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  return (
    <TouchableOpacity
      style={{paddingHorizontal: 10}}
      onPress={() => navigation.navigate('Profile')}>
      <Image
        source={{uri: user?.photoURL ?? ''}}
        style={{width: 30, height: 30, borderRadius: 15}}
      />
    </TouchableOpacity>
  );
};
