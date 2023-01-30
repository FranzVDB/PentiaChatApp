import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {createContext, FC, PropsWithChildren, useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';

export type UserContextType = {
  user: FirebaseAuthTypes.User | null;
  logout: () => Promise<void>;
};

const logout = async () => {
  await auth().signOut();
};

export const UserContext = createContext<UserContextType>({
  user: null,
  logout,
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

  return (
    <UserContext.Provider value={{user, logout}}>
      {children}
    </UserContext.Provider>
  );
};
