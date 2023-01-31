import React from 'react';
import {ChatRoomsScreen} from './chat-rooms';
import {createStackNavigator} from '@react-navigation/stack';
import {ChatRoomScreen} from './chat-room';

export type RootStackParamList = {
  ChatRooms: undefined;
  Chat: {roomId: string} | undefined;
};

export const AuthedShell = () => {
  const RootStack = createStackNavigator<RootStackParamList>();

  return (
    <RootStack.Navigator initialRouteName="ChatRooms">
      <RootStack.Screen name="ChatRooms" component={ChatRoomsScreen} />
      <RootStack.Screen name="Chat" component={ChatRoomScreen} />
    </RootStack.Navigator>
  );
};
