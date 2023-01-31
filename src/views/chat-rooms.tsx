import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {ChatRoom, useChatRoomsHook} from '../hooks/useChatRoomsHook';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from './authed-shell';
// import {Link} from '@react-navigation/native';

type Props = NativeStackScreenProps<RootStackParamList, 'ChatRooms'>;

export const ChatRoomsScreen = ({navigation}: Props) => {
  const {chatRooms} = useChatRoomsHook();

  const renderItem = (item: ChatRoom) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('Chat', {roomId: item.id})}>
        <View style={styles.container}>
          <Image source={{uri: item.icon}} style={styles.icon} />
          <View>
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.subTitle}>{item.decsription}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={chatRooms}
      keyExtractor={room => room.id}
      renderItem={({item}) => renderItem(item)}
      style={styles.list}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    height: '100%',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 10,
    padding: 10,
  },
  title: {
    fontSize: 18,
    textAlign: 'left',
  },
  subTitle: {
    fontSize: 12,
    textAlign: 'left',
  },
  icon: {
    borderRadius: 25,
    width: 50,
    height: 50,
  },
});
