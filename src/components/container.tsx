import {FC, PropsWithChildren} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import React from 'react';

export const PCAContainer: FC<PropsWithChildren> = ({children}) => {
  return <SafeAreaView style={styles.container}>{children}</SafeAreaView>;
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#fff',
  },
});
