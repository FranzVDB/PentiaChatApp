import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from './authed-shell';
import {MaterialIcon} from '../components/material-icon';
import {useChatRoomsHook} from '../hooks/useChatRoomsHook';
import {ChatRoomType} from '../types/ChatRoomType';

type Props = NativeStackScreenProps<RootStackParamList, 'ChatRooms'>;

export const ChatRoomsScreen = ({navigation}: Props) => {
  const {chatRooms, fetchAgian, loading} = useChatRoomsHook();

  const renderItem = (item: ChatRoomType) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('Chat', {roomId: item.id})}>
        <View style={styles.container}>
          <Image source={{uri: item.iconUrl}} style={styles.icon} />
          <View style={styles.info}>
            <Text style={styles.title}>{item.name}</Text>
            <Text numberOfLines={2} style={styles.subTitle}>
              {item.description}
            </Text>
          </View>
          <View style={styles.imgContainer}>
            <MaterialIcon size="large" color="white" name="chevron-right" />
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
      onRefresh={() => fetchAgian()}
      refreshing={loading}
      ItemSeparatorComponent={() => <View style={{height: 5}} />}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    height: '100%',
    backgroundColor: '#271a2d',
  },
  container: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#32273c',
    margin: 10,
    borderRadius: 10,
  },
  info: {
    flex: 8,
  },

  title: {
    fontSize: 18,
    textAlign: 'left',
    color: 'white',
  },
  subTitle: {
    fontSize: 12,
    textAlign: 'left',
    color: 'white',
  },
  imgContainer: {
    flex: 1,
  },
  icon: {
    borderRadius: 25,
    width: 50,
    height: 50,
  },
});
