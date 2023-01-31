import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useEffect} from 'react';
import {useChatsHook} from '../hooks/useChatsHook';
import {RootStackParamList} from './authed-shell';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {FlatList} from 'react-native-gesture-handler';
import {Message} from '../hooks/useChatRoomsHook';

type Props = NativeStackScreenProps<RootStackParamList, 'Chat'>;

export const ChatRoomScreen = ({route, navigation}: Props) => {
  const [newMessage, setNewMessage] = React.useState('');
  const {messages, chatRoom, sendMessage} = useChatsHook(
    route.params?.roomId ?? '',
  );

  useEffect(() => {
    console.log(chatRoom?.id);
    navigation.setOptions({title: chatRoom?.name});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatRoom]);

  if (!chatRoom || !messages) {
    return <Text>Loading...</Text>;
  }

  const renderItem = (item: Message) => {
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>{item.from}</Text>
          <Text style={styles.subTitle}>{item.message}</Text>
          <Text style={styles.subTitle}>{item.id}</Text>
        </View>
      </View>
    );
  };

  return (
    <View>
      <FlatList
        data={messages}
        keyExtractor={messsage => messsage.id}
        renderItem={({item}) => renderItem(item)}
        style={styles.list}
      />
      <TextInput
        style={styles.input}
        onChangeText={setNewMessage}
        value={newMessage}
      />
      <Button
        title="Send message"
        onPress={() => {
          sendMessage(newMessage);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    height: '80%',
  },
  input: {
    height: '10%',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
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
