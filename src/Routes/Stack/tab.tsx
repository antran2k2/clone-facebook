import React from 'react';

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import FriendScreen from '@/Screens/Friend';
import HomeScreen from '@/Screens/Home';
import NotificationScreen from '@/Screens/Notification';
import VideoScreen from '@/Screens/Video';
import {Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const numberOfTabs = 6; // your number of tabs

const windowWidth = Dimensions.get('window').width;
let tabWidth = windowWidth / numberOfTabs;
const Tab = createMaterialTopTabNavigator();

function MainTab() {
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
          component={FriendScreen}
          listeners={({}) => ({
            focus: () => {
              console.log('focus friend');
            },
          })}
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
                <Icon
                  style={{right: tabWidth / 3, top: 10}}
                  name="circle"
                  solid
                  size={7}
                  color="red"
                />
              );
            },
          }}
        />
        <Tab.Screen
          name="Profile"
          component={NotificationScreen}
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
          component={NotificationScreen}
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
