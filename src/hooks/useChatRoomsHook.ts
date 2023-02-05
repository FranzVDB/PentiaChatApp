import {useState, useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';
import {ChatRoomType} from '../types/ChatRoomType';

export const useChatRoomsHook = () => {
  const [chatRooms, setChatRooms] = useState<ChatRoomType[]>([]);
  const [shouldFetchAgain, setShouldFetchAgain] = useState(false);
  const [loading, setLoading] = useState(false);
  const ref = firestore()
    .collection<ChatRoomType>('ChatRooms')
    .orderBy('lastUpdated', 'desc');

  useEffect(() => {
    setLoading(true);
    ref.get().then(res => {
      const rooms: ChatRoomType[] = [];
      res.forEach(doc => {
        const {description, iconUrl, name, lastUpdated} = doc.data();

        rooms.push({
          id: doc.id,
          description,
          iconUrl,
          name,
          lastUpdated,
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
