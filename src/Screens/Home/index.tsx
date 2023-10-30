import {useAppSelector} from '@/Redux/store';
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const HomeScreen = () => {
  const to = useAppSelector(state => state.auth.token);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello!</Text>
      <Text style={styles.subtitle}>Home screen</Text>
      <Text style={styles.subtitle}>{to}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: 'gray',
  },
});

export default HomeScreen;
