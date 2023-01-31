import {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {ChatRoom, Message} from './useChatRoomsHook';

export const useChatsHook = (roomId: string) => {
  const [chatRoom, setChatRoom] = useState<ChatRoom | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const roomsRef = firestore().collection<ChatRoom>('ChatRooms');
  const messagesRef = firestore().collection('Messages');

  useEffect(() => {
    console.log('useChatsHook get chat room');

    const data = roomsRef.doc(roomId).get();

    data.then(res => {
      const room = res.data();
      if (!room) {
        return;
      }

      const {decsription, icon, name} = room;
      setChatRoom({decsription, icon, name, id: res.id});
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomId]);

  useEffect(() => {
    if (!roomId) {
      console.log('useChatsHook get messages NO room id');
      return;
    }

    console.log('useChatsHook get messages');

    messagesRef
      .doc(roomId)
      .collection('messages')
      .orderBy('sent')
      .onSnapshot(querySnapshot => {
        const allMessages: Message[] = [];
        if (querySnapshot.empty) {
          return;
        }

        querySnapshot.forEach(doc => {
          const tmp = doc.data();
          if (!tmp) {
            return;
          }
          allMessages.push({
            id: doc.id,
            message: tmp.message,
            sent: tmp.sent,
            from: tmp.from,
          });
        });
        setMessages(allMessages);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomId]);

  const sendMessage = async (newMessage: string) => {
    console.log(newMessage);
    if (newMessage.trim()) {
      const message = {
        message: newMessage,
        sent: new Date(),
        from: 'this.user.uid',
      };
      await messagesRef
        .doc(roomId)
        .collection('messages')
        .add(message)
        .then(() => {
          console.log('added message!');
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  return {chatRoom, sendMessage, messages};
};
