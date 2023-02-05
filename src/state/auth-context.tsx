import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {createContext, FC, PropsWithChildren, useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import React from 'react';

export type UserContextType = {
  user: FirebaseAuthTypes.User | null;
};

export const UserContext = createContext<UserContextType>({
  user: null,
});

export const UserContextProvider: FC<PropsWithChildren> = ({children}) => {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  const onAuthStateChanged: FirebaseAuthTypes.AuthListenerCallback = user => {
    setUser(user);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  return <UserContext.Provider value={{user}}>{children}</UserContext.Provider>;
};
