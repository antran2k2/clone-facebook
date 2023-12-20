import React from 'react';
import {View, FlatList, SectionList} from 'react-native';
import NotificationItem from '@/Components/NotificationItem';
import dayjs from 'dayjs';

export function NotificationListNew({notifications}) {
  const renderNotificationItem = ({item, index}) => {
    return <NotificationItem key={index} notification={item} />;
  };
  return (
    <SectionList
      sections={[
        {
          data: notifications,
          keyExtractor: (item, index) => index.toString(),
          renderItem: renderNotificationItem,
        },
      ]}
    />
  );
}

export default function NotificationList({notifications}) {
  const renderNotificationItem = ({item, index}) => {
    return <NotificationItem key={index} notification={item} />;
  };
  return (
    <SectionList
      sections={[
        {
          data: notifications,
          keyExtractor: (item, index) => index.toString(),
          renderItem: renderNotificationItem,
        },
      ]}
    />
  );
}
