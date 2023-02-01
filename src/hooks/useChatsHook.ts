import {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {ChatRoom, Message} from './useChatRoomsHook';

export const useChatsHook = (roomId: string) => {
  const [chatRoom, setChatRoom] = useState<ChatRoom | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [limit, setLimit] = useState(50);
  const roomsRef = firestore().collection<ChatRoom>('ChatRooms');

  useEffect(() => {
    const data = roomsRef.doc(roomId).get();

    data.then(res => {
      const room = res.data();
      if (!room) {
        return;
      }

      const {description, icon, name} = room;
      setChatRoom({description, icon, name, id: res.id});
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomId]);

  useEffect(() => {
    if (!roomId) {
      return;
    }

    roomsRef
      .doc(roomId)
      .collection('messages')
      .orderBy('sent', 'desc')
      .limit(limit)
      .onSnapshot(querySnapshot => {
        const messagesTmp: Message[] = [];
        querySnapshot.forEach(doc => {
          const {message, sent, from} = doc.data();
          messagesTmp.push({
            message,
            sent,
            from,
            id: doc.id,
          });
        });

        messagesTmp.reverse();
        setMessages(messagesTmp);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomId, limit]);

  const sendMessage = async (meg: string, from: string) => {
    if (meg.trim()) {
      const message = {
        message: meg,
        sent: new Date(),
        from: from,
      };

      await roomsRef
        .doc(roomId)
        .collection('messages')
        .add(message)
        .then(() => {})
        .catch(err => {
          console.log(err);
        });
    }
  };

  return {chatRoom, sendMessage, messages, setLimit};
};
