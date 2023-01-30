import {useContext} from 'react';
import {Button, Text} from 'react-native';
import {PCContainer} from '../components/container';
import {UserContext} from '../state/auth-context';

export const AuthedShell = () => {
  const {logout} = useContext(UserContext);
  return (
    <PCContainer>
      <Text>Welcome to Pentia Chat APP</Text>
      <Text>Join a Room to start chatting</Text>
      <Button
        title="Sign out"
        onPress={async () => {
          await logout();
        }}
      />
    </PCContainer>
  );
};
