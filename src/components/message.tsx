import React from 'react';
import {View, Text, Image, Platform, StyleSheet} from 'react-native';
import {MessageType} from './../hooks/useChatRoomsHook';

type Props = {
  isMe: boolean;
  message: MessageType;
};

export const Message = ({message, isMe}: Props) => {
  return (
    <View>
      <View
        style={
          isMe
            ? styles.messageContainer
            : [styles.messageContainer, {alignItems: 'flex-end'}]
        }>
        <Text style={styles.sender}>{message.from}</Text>
        <View
          style={
            isMe
              ? {flexDirection: 'row', alignItems: 'center', gap: 10}
              : {flexDirection: 'row-reverse', alignItems: 'center', gap: 10}
          }>
          <Image source={{uri: message.avatarUrl}} style={styles.avatar} />
          <View
            style={
              isMe
                ? styles.message
                : [
                    styles.message,
                    {
                      backgroundColor:
                        Platform.OS === 'ios' ? '#E18366' : '#FCB961',
                    },
                  ]
            }>
            <Text
              style={
                isMe
                  ? styles.messageText
                  : [
                      styles.messageText,
                      {
                        color: 'white',
                      },
                    ]
              }>
              {message.message}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  avatar: {
    borderRadius: 25,
    width: 40,
    height: 40,
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
    backgroundColor: '#32273c',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginBottom: 2,
  },
  messageText: {
    color: 'white',
    fontSize: 16,
  },
  sender: {
    fontSize: 12,
    color: 'white',
    marginBottom: 6,
    paddingHorizontal: 5,
  },
  loading: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 10,
  },
  loadingText: {
    fontSize: 16,
    color: '#3e5869',
    marginBottom: 6,
    paddingHorizontal: 5,
  },
});
