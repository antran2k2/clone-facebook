/* eslint-disable react/no-unstable-nested-components */
import React, {useEffect} from 'react';

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import FriendScreen from '@/Screens/Friend';
import HomeScreen from '@/Screens/Home';
import NotificationScreen from '@/Screens/Notification';
import VideoScreen from '@/Screens/Video';
import {Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import SettingTabScreen from '@/Screens/Setting/SettingTab';
import ProfileTabScreen from '@/Screens/ProfileTab';
import FullFriendScreen from '@/Screens/FriendTab/FullFriend';
import FriendRequestScreen from '@/Screens/FriendTab/FriendRequest';
import {useSetDevtokenMutation} from '@/Redux/api/setting';
import messaging from '@react-native-firebase/messaging';
import {Alert} from 'react-native';
import notifee from '@notifee/react-native';
const numberOfTabs = 6; // your number of tabs

const windowWidth = Dimensions.get('window').width;
let tabWidth = windowWidth / numberOfTabs;
const Tab = createMaterialTopTabNavigator();
async function onMessageReceived(data: any) {
  // Request permissions (required for iOS)
  await notifee.requestPermission();

  // Create a channel (required for Android)
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
  });

  // Display a notification
  await notifee.displayNotification({
    title: data.notification.title || 'Notification Title',
    body: data.notification.body || 'Main body content of the notification',
    android: {
      channelId,
      smallIcon: 'ic_launcher', // optional, defaults to 'ic_launcher'.
      // pressAction is needed if you want the notification to open the app when pressed
      pressAction: {
        id: 'default',
      },
    },
  });
}

function MainTab() {
  const [isHasNoti, setIsHasNoti] = React.useState(false);

  async function onMessageReceived(data: any) {
    setIsHasNoti(true);
    // Request permissions (required for iOS)
    // await notifee.requestPermission();

    // // Create a channel (required for Android)
    // const channelId = await notifee.createChannel({
    //   id: 'default',
    //   name: 'Default Channel',
    // });

    // // Display a notification
    // await notifee.displayNotification({
    //   title: data.notification.title || 'Notification Title',
    //   body: data.notification.body || 'Main body content of the notification',
    //   android: {
    //     channelId,
    //     smallIcon: 'ic_launcher', // optional, defaults to 'ic_launcher'.
    //     // pressAction is needed if you want the notification to open the app when pressed
    //     pressAction: {
    //       id: 'default',
    //     },
    //   },
    // });
  }

  const [setDevtokenMutation] = useSetDevtokenMutation();
  useEffect(() => {
    const registerDeviceForRemoteMessages = async () => {
      try {
        await messaging().registerDeviceForRemoteMessages();
        const token = await messaging().getToken();
        // const token = '1';
        setDevtokenMutation({devtoken: token, devtype: '1'});
      } catch (error) {
        console.error('Error registering device for remote messages:', error);
      }
    };

    // Initial registration
    registerDeviceForRemoteMessages();

    // Listen to token changes
    const unsubscribeTokenRefresh = messaging().onTokenRefresh(token => {
      setDevtokenMutation({devtoken: token, devtype: '1'});
    });

    // Clean up the subscription when the component unmounts
    return () => unsubscribeTokenRefresh();
  }, [setDevtokenMutation]);
  useEffect(() => {
    const unsubscribe = messaging().onMessage(onMessageReceived);

    return unsubscribe;
  }, []);
  return (
    <>
      <Tab.Navigator
        tabBarPosition="bottom"
        screenOptions={{
          tabBarShowLabel: false,
          tabBarStyle: {
            // position: 'absolute',
          },
          tabBarIndicatorStyle: {
            bottom: 45,
          },
        }}>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({focused}) => (
              <Icon
                name="home"
                size={20}
                color={focused ? '#007AFF' : '#222'}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Friend"
          component={FriendRequestScreen}
          options={{
            tabBarIcon: ({focused}) => (
              <Icon
                name="users"
                size={20}
                color={focused ? '#007AFF' : '#222'}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Video"
          component={VideoScreen}
          options={{
            tabBarIcon: ({focused}) => (
              <Icon
                name="video"
                size={20}
                color={focused ? '#007AFF' : '#222'}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Notification"
          component={NotificationScreen}
          listeners={({}) => ({
            focus: () => {
              setIsHasNoti(false);
            },
          })}
          options={{
            tabBarIcon: ({focused}) => (
              <Icon
                name="bell"
                solid
                size={20}
                color={focused ? '#007AFF' : '#222'}
              />
            ),

            tabBarBadge() {
              return (
                isHasNoti && (
                  <Icon
                    style={{right: tabWidth / 3, top: 10}}
                    name="circle"
                    solid
                    size={7}
                    color="red"
                  />
                )
              );
            },
          }}
        />
        <Tab.Screen
          name="ProfileTab"
          component={ProfileTabScreen}
          options={{
            tabBarIcon: ({focused}) => (
              <Icon
                name="user-circle"
                size={20}
                color={focused ? '#007AFF' : '#222'}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Menu"
          component={SettingTabScreen}
          options={{
            tabBarIcon: ({focused}) => (
              <Icon
                name="bars"
                size={20}
                color={focused ? '#007AFF' : '#222'}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
}

export default MainTab;
