import React, {useContext} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {
  CameraOptions,
  launchCamera,
  ImagePickerResponse,
} from 'react-native-image-picker';
import {MaterialIcon} from './material-icon';
import storage from '@react-native-firebase/storage';
import {useChatsHook} from '../hooks/useChatsHook';
import {UserContextType, UserContext} from '../state/auth-context';

type Props = {
  roomId: string;
};

export const CameraImage = ({roomId}: Props) => {
  const {sendMessage} = useChatsHook(roomId);
  const {user} = useContext<UserContextType>(UserContext);

  const options: CameraOptions = {
    mediaType: 'photo',
  };

  const callback = async (response: ImagePickerResponse) => {
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.errorCode) {
      console.log('ImagePicker Error: ', response.errorCode);
    } else if (response.didCancel) {
      console.log('User tapped cancel: ', response.didCancel);
    } else {
      if (!response.assets || !user) {
        return;
      }

      const reference = storage().ref(response.assets[0].fileName);

      // path to existing file on filesystem
      const pathToFile = response.assets[0].uri;
      if (!pathToFile) {
        return;
      }
      // uploads file
      await reference.putFile(pathToFile);
      const url = await storage()
        .ref(response.assets[0].fileName)
        .getDownloadURL();

      sendMessage(url, 'image', user);
    }
  };

  return (
    <TouchableOpacity
      style={styles.inputAction}
      onPress={() => {
        launchCamera(options, callback);
      }}>
      <MaterialIcon size="large" color="white" name="photo-camera" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  inputAction: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
});
