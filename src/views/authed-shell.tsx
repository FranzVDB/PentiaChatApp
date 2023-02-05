import React from 'react';
import {ChatRoomsScreen} from './chat-rooms';
import {createStackNavigator} from '@react-navigation/stack';
import {ChatRoomScreen} from './chat-room';
import {PCALogoutButton} from '../components/auth-buttons/logout';
import {Profile} from './profile';

export type RootStackParamList = {
  ChatRooms: undefined;
  Chat: {roomId: string} | undefined;
  Profile: undefined;
};

export const AuthedShell = () => {
  const RootStack = createStackNavigator<RootStackParamList>();

  return (
    <RootStack.Navigator
      initialRouteName="ChatRooms"
      screenOptions={{
        headerRight: () => <PCALogoutButton />,
        headerStyle: {backgroundColor: '#271a2d', shadowOpacity: 0},
        headerTintColor: '#fff',
      }}>
      <RootStack.Screen
        name="ChatRooms"
        component={ChatRoomsScreen}
        options={{title: 'Rooms'}}
      />
      <RootStack.Screen name="Chat" component={ChatRoomScreen} />
      <RootStack.Screen
        name="Profile"
        component={Profile}
        options={{headerRight: () => null}}
      />
    </RootStack.Navigator>
  );
};
