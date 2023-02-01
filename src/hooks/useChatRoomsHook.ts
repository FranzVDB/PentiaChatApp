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
  description: string;
  icon: string;
  id: string;
  // messages: Message[];
};

export const useChatRoomsHook = () => {
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
  const [shouldFetchAgain, setShouldFetchAgain] = useState(false);
  const [loading, setLoading] = useState(false);
  const ref = firestore().collection<ChatRoom>('ChatRooms');

  useEffect(() => {
    setLoading(true);
    ref.get().then(res => {
      const rooms: ChatRoom[] = [];
      res.forEach(doc => {
        const {description, icon, name} = doc.data();
        rooms.push({
          id: doc.id,
          description,
          icon,
          name,
          // messages,
        });
      });
      setChatRooms(rooms);
      setLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldFetchAgain]);

  const fetchAgian = () => {
    setShouldFetchAgain(!shouldFetchAgain);
  };

  return {chatRooms, fetchAgian, loading};
};
