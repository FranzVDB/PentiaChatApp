import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  View,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import React, {useContext, useEffect, useRef} from 'react';
import {useChatsHook} from '../hooks/useChatsHook';
import {RootStackParamList} from './authed-shell';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MessageType} from '../hooks/useChatRoomsHook';
import {UserContextType, UserContext} from '../state/auth-context';
import {Message} from '../components/message';
import {MaterialIcon} from '../components/material-icon';
import {TouchableOpacity} from 'react-native-gesture-handler';

type Props = NativeStackScreenProps<RootStackParamList, 'Chat'>;

export const ChatRoomScreen = ({route, navigation}: Props) => {
  const {user} = useContext<UserContextType>(UserContext);
  const flatlistRef = useRef<FlatList | null>(null);

  const [newMessage, setNewMessage] = React.useState('');
  const {messages, chatRoom, sendMessage, setLimit, loading} = useChatsHook(
    route.params?.roomId ?? '',
  );

  useEffect(() => {
    navigation.setOptions({title: chatRoom?.name});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatRoom]);

  if (!chatRoom || !messages || !user) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator color="white" />
      </View>
    );
  }

  const onSendMessageHandler = () => {
    sendMessage(newMessage, user);
    setNewMessage('');
  };

  const renderItem = (item: MessageType) => {
    const isMe = item.from !== user.displayName;
    return <Message message={item} isMe={isMe} />;
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={70}
      style={styles.container}>
      {loading && (
        <View style={styles.loading}>
          <ActivityIndicator />
        </View>
      )}
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
          inverted
          onEndReachedThreshold={0.1}
          onEndReached={() => {
            setLimit(prev => prev + 50);
          }}
        />
      </TouchableWithoutFeedback>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={newMessage}
          onSubmitEditing={() => {
            onSendMessageHandler();
          }}
          placeholder="Message..."
          returnKeyType="send"
          onChangeText={setNewMessage}
          placeholderTextColor={'white'}
        />
        <TouchableOpacity
          style={styles.inputAction}
          onPress={() => {
            onSendMessageHandler();
          }}>
          <MaterialIcon size="large" color="white" name="send" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#271a2d',
  },
  avatar: {
    borderRadius: 25,
    width: 40,
    height: 40,
  },
  list: {
    flex1: 1,
    width: '100%',
    padding: 10,
  },
  inputContainer: {
    backgroundColor: '#32273c',
    flexDirection: 'row',
    alignSelf: 'center',
    width: '90%',
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#ccc',
    marginHorizontal: 5,
    marginBottom: 30,
    height: 50,
  },
  input: {
    flex: 8,
    fontSize: 16,
    padding: 10,
    color: 'white',
  },
  inputAction: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#271a2d',
  },
  loadingText: {
    fontSize: 16,
    color: '#3e5869',
    marginBottom: 6,
    paddingHorizontal: 5,
  },
});
