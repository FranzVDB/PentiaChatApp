import {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {ChatRoomType, MessageType} from './useChatRoomsHook';
import {FirebaseAuthTypes} from '@react-native-firebase/auth';

export const useChatsHook = (roomId: string) => {
  const [chatRoom, setChatRoom] = useState<ChatRoomType | null>(null);
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [loading, setLoading] = useState(false);

  const [limit, setLimit] = useState(50);
  const roomsRef = firestore().collection<ChatRoomType>('ChatRooms');

  useEffect(() => {
    setLoading(true);
    const data = roomsRef.doc(roomId).get();

    data.then(res => {
      const room = res.data();
      if (!room) {
        return;
      }

      const {description, iconUrl: icon, name, lastUpdated} = room;
      setChatRoom({description, iconUrl: icon, name, id: res.id, lastUpdated});
      setLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomId]);

  useEffect(() => {
    if (!roomId) {
      return;
    }
    setLoading(true);

    return roomsRef
      .doc(roomId)
      .collection('messages')
      .orderBy('sent', 'desc')
      .limit(limit)
      .onSnapshot(querySnapshot => {
        const messagesTmp: MessageType[] = [];
        querySnapshot.forEach(doc => {
          const {message, sent, from, avatarUrl} = doc.data();
          messagesTmp.push({
            message,
            sent,
            from,
            avatarUrl,
            id: doc.id,
          });
        });

        // messagesTmp.reverse();
        setMessages(messagesTmp);
        setLoading(false);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomId, limit]);

  const sendMessage = async (meg: string, user: FirebaseAuthTypes.User) => {
    if (meg.trim()) {
      const message = {
        message: meg,
        sent: new Date(),
        from: user.displayName,
        avatarUrl:
          user.photoURL ??
          'https://static.vecteezy.com/system/resources/thumbnails/009/734/564/small/default-avatar-profile-icon-of-social-media-user-vector.jpg',
      };

      await roomsRef
        .doc(roomId)
        .collection('messages')
        .add(message)
        .then(() => {})
        .catch(err => {
          console.log(err);
        });

      await roomsRef
        .doc(roomId)
        .update({lastUpdated: new Date()})
        .then(() => {})
        .catch(err => {
          console.log(err);
        });
    }
  };

  return {chatRoom, sendMessage, messages, setLimit, loading};
};
