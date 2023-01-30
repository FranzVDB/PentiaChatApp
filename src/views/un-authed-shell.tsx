import {SafeAreaView, Text} from 'react-native';
import {PCAGoogleSigninButton} from '../components/auth-buttons/google-login';

export const UnAuthShell = () => {
  return (
    <SafeAreaView>
      <Text> You can login in here!</Text>
      <PCAGoogleSigninButton />
    </SafeAreaView>
  );
};
