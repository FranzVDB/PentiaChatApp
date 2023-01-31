import {useState, useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';

export type Message = {
  message: string;
  sent: Date;
  from: string;
  id: string;
};

export type ChatRoom = {
  name: string;
  decsription: string;
  icon: string;
  id: string;
};

export const useChatRoomsHook = () => {
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
  const ref = firestore().collection<ChatRoom>('ChatRooms');

  useEffect(() => {
    console.log('useChatRoomsHook useEffect');

    ref.get().then(res => {
      const rooms: ChatRoom[] = [];
      res.forEach(doc => {
        const {decsription, icon, name} = doc.data();
        rooms.push({
          id: doc.id,
          decsription,
          icon,
          name,
        });
      });
      setChatRooms(rooms);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {chatRooms};
};
