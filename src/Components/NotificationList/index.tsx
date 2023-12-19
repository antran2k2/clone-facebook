import React from 'react';
import {View} from 'react-native';
import dayjs from 'dayjs';
import NotificationItem from '@/Components/NotificationItem';

export default function NotificationList({notifications}) {
  return (
    <View>
      {notifications.map((notification, index) => {
        return <NotificationItem key={index} notification={notification} />;
      })}
    </View>
  );
}
