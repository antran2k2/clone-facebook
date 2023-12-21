/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';
import notifee from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';

async function onMessageReceived(message) {
    const { title, body } = message.notification;

    await notifee.displayNotification({
        title: title,
        body: body,
        android: {
            channelId: 'default',
        },
    });
}

messaging().onMessage(onMessageReceived);
messaging().setBackgroundMessageHandler(onMessageReceived);
AppRegistry.registerComponent(appName, () => App);
