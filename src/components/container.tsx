import {FC, PropsWithChildren} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';

export const PCContainer: FC<PropsWithChildren> = ({children}) => {
  return <SafeAreaView style={styles.container}>{children}</SafeAreaView>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 20,
    margin: 10,
  },
});
