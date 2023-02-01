import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
  FlatList,
} from 'react-native';
import React, {useContext, useEffect, useRef} from 'react';
import {useChatsHook} from '../hooks/useChatsHook';
import {RootStackParamList} from './authed-shell';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Message} from '../hooks/useChatRoomsHook';
import {UserContextType, UserContext} from '../state/auth-context';

type Props = NativeStackScreenProps<RootStackParamList, 'Chat'>;

export const ChatRoomScreen = ({route, navigation}: Props) => {
  const {user} = useContext<UserContextType>(UserContext);
  const flatlistRef = useRef<FlatList | null>(null);

  const [newMessage, setNewMessage] = React.useState('');
  const {messages, chatRoom, sendMessage, setLimit} = useChatsHook(
    route.params?.roomId ?? '',
  );

  useEffect(() => {
    navigation.setOptions({title: chatRoom?.name});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatRoom]);

  if (!chatRoom || !messages || !user) {
    return <Text>Loading...</Text>;
  }

  const renderItem = (item: Message) => {
    const status = item.from !== user.displayName;
    return (
      <View>
        <View
          style={
            status
              ? styles.messageContainer
              : [styles.messageContainer, {alignItems: 'flex-end'}]
          }>
          <Text style={styles.sender}>{item.from}</Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View
              style={
                status
                  ? styles.message
                  : [
                      styles.message,
                      {
                        backgroundColor:
                          Platform.OS === 'ios' ? '#1982FC' : '#43CC47',
                      },
                    ]
              }>
              <Text
                style={
                  status
                    ? styles.messageText
                    : [
                        styles.messageText,
                        {
                          color: 'white',
                        },
                      ]
                }>
                {item.message}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <FlatList
          data={
            messages.length !== 0
              ? messages
              : [{message: 'No messages', sent: Date.now, from: 'God'}]
          }
          keyExtractor={messsage => messsage.sent}
          renderItem={({item}) => renderItem(item)}
          style={styles.list}
          ref={flatlistRef}
          onRefresh={() => {
            setLimit(prev => prev + 50);
          }}
          refreshing={false}
          onContentSizeChange={() => {
            if (!flatlistRef.current) {
              return;
            }
            flatlistRef.current.scrollToEnd({animated: true});
          }}
        />
      </TouchableWithoutFeedback>
      <TextInput
        style={styles.newInput}
        value={newMessage}
        onSubmitEditing={() => {
          sendMessage(newMessage, user?.displayName ?? 'unknown');
          setNewMessage('');
        }}
        placeholder="Message..."
        returnKeyType="send"
        onChangeText={setNewMessage}
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    flex1: 1,
    width: '100%',
    padding: 10,
  },
  newInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    fontSize: 16,
    padding: 10,
    marginHorizontal: 10,
    marginBottom: 30,
    height: 50,
  },

  messageUser: {
    fontSize: 16,
    color: '#3e5869',
    marginBottom: 6,
  },
  messageContainer: {
    width: '100%',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  message: {
    maxWidth: '60%',
    backgroundColor: 'lightgray',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginBottom: 2,
  },
  messageText: {
    color: 'black',
    fontSize: 16,
  },
  sender: {
    fontSize: 12,
    color: '#3e5869',
    marginBottom: 6,
  },
});
