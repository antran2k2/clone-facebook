import {useLogoutMutation} from '@/Redux/api/auth';
import {useAppSelector} from '@/Redux/store';
import React, {useCallback, useEffect} from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';
import messaging from '@react-native-firebase/messaging';

const HomeScreen = () => {
  const token = useAppSelector(state => state.auth.token);
  const [mutateLogout, {isLoading}] = useLogoutMutation();

  const handleLogout = useCallback(() => {
    mutateLogout()
      .unwrap()
      .then(({message}) => {
        console.log(message);
      })
      .catch(err => {
        console.log(err);
      });
  }, [mutateLogout]);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async (remoteMessage: any) => {
      // const noti = JSON.parse(remoteMessage);
      // const title = noti.notification.title;
      // const body = noti.notification.body;

      Alert.alert(
        remoteMessage.notification.title,
        remoteMessage.notification.body,
        [{text: 'OK', onPress: handleLogout}],
        {cancelable: false},
      );
    });

    return unsubscribe;
  }, [handleLogout]);
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async (remoteMessage: any) => {
      // const noti = JSON.parse(remoteMessage);
      // const title = noti.notification.title;
      // const body = noti.notification.body;

      Alert.alert(
        remoteMessage.notification.title,
        remoteMessage.notification.body,
        [{text: 'OK', onPress: handleLogout}],
        {cancelable: false},
      );
    });

    return unsubscribe;
  }, [handleLogout]);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello!</Text>
      <Text style={styles.subtitle}>Home screen</Text>
      <Text style={styles.subtitle}>{token}</Text>
      <Text style={styles.subtitle}>{isLoading ? 'Loading...' : ''}</Text>
      <Text onPress={handleLogout} style={styles.subtitle}>
        Logout
      </Text>
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
