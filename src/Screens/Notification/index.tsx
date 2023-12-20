import React, {useEffect} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  SectionList,
} from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import NotificationList, {
  NotificationListNew,
} from '@/Components/NotificationList';
import dayjs from 'dayjs';

import {useGetNotificationQuery} from '@/Redux/api/notification';
export interface Notification {
  id: string;
  type: string;
  read: string;
  content?: string;
  user?: {
    id: string;
    username?: string;
    avatar?: string;
  };
  post?: {
    id: string;
    description: string;
    status: string;
  };
  mark?: {
    id: string;
    type: string;
    content: string;
  };
  feel?: {
    id: string;
    type: string;
  };
  created: string;
  createdAtConverted?: string;
}

function NotificationScreen() {
  const initParams = {
    index: '0',
    count: '100',
  };
  const {data, isLoading, isSuccess} = useGetNotificationQuery(initParams);
  const dayjs = require('dayjs');
  var duration = require('dayjs/plugin/duration');
  dayjs.extend(duration);
  const [notiList, setNotiList] = React.useState<Notification[]>([]);
  useEffect(() => {
    if (isSuccess) {
      // console.log(data?.data);

      setNotiList(data?.data as Notification[]);
    }
  }, [data, isSuccess]);

  enum NotificationType {
    FriendRequest = 1,
    FriendAccepted = 2,
    PostAdded = 3,
    PostUpdated = 4,
    PostFelt = 5,
    PostMarked = 6,
    MarkCommented = 7,
    VideoAdded = 8,
    PostCommented = 9,
  }
  enum MarkType {
    Trust = 1,
    Fake = 0,
  }
  enum FeelType {
    Kudos = 1,
    Disappointed = 0,
  }

  const convertStringToDateString = (inputString: string): string => {
    const now = dayjs();
    const createdAtDate = dayjs(inputString);
    const duration = dayjs.duration(now.diff(createdAtDate));

    // Kiểm tra các điều kiện và trả về chuỗi tương ứng
    if (duration.asMinutes() < 1) {
      return 'Vừa xong';
    } else if (duration.asMinutes() < 60) {
      return `${Math.floor(duration.asMinutes())} phút trước`;
    } else if (duration.asHours() < 24) {
      return `${Math.floor(duration.asHours())} giờ trước`;
    } else if (duration.asDays() < 7) {
      return `${Math.floor(duration.asDays())} ngày trước`;
    } else if (duration.asDays() < 31) {
      return `${Math.floor(duration.asWeeks())} tuần trước`;
    } else if (duration.asMonths() < 12) {
      return `${Math.floor(duration.asMonths())} tháng trước`;
    } else {
      return `${Math.floor(duration.asYears())} năm trước`;
    }
  };

  const notiToPresent: Notification[] = notiList.map(noti => {
    switch (noti.type) {
      case '1':
        return {
          ...noti,
          key: `${noti.id}`,
          createdAtConverted: convertStringToDateString(noti.created),
          content: ` đã gửi cho bạn lời mời kết bạn.`,
        };
      case '2':
        return {
          ...noti,
          key: `${noti.id}`,
          createdAtConverted: convertStringToDateString(noti.created),
          content: ` đã chấp nhận lời mời kết bạn của bạn.`,
        };
      case '3':
        return {
          ...noti,
          key: `${noti.id}`,
          createdAtConverted: convertStringToDateString(noti.created),
          content: ` gần đây đã thêm một bài viết mới.`,
        };
      case '4':
        return {
          ...noti,
          key: `${noti.id}`,
          createdAtConverted: convertStringToDateString(noti.created),
          content: ` đã chỉnh sửa một bài viết bạn quan tâm.`,
        };
      case '5':
        return {
          ...noti,
          key: `${noti.id}`,
          createdAtConverted: convertStringToDateString(noti.created),
          content: ` đã bày tỏ cảm xúc về một bài viết của bạn.`,
        };
      case '6':
        return {
          ...noti,
          key: `${noti.id}`,
          createdAtConverted: convertStringToDateString(noti.created),
          content: ` đã bình luận về một bài viết của bạn.`,
        };
      case '7':
        return {
          ...noti,
          key: `${noti.id}`,
          createdAtConverted: convertStringToDateString(noti.created),
          content: ` đã bình luận về một bình luận mà bạn quan tâm.`,
        };
      case '8':
        return {
          ...noti,
          key: `${noti.id}`,
          createdAtConverted: convertStringToDateString(noti.created),
          content: ` đã thêm một video mới.`,
        };
      case '9':
        return {
          ...noti,
          key: `${noti.id}`,
          createdAtConverted: convertStringToDateString(noti.created),
          content: ` đã bình luận về một bài viết của bạn.`,
        };
      default:
        return {
          ...noti,
          key: `${noti.id}`,
          createdAtConverted: convertStringToDateString(noti.created),
        };
    }
  });

  const sortNotificationsByCreatedAt = (
    notiToPresent: Notification[],
  ): Notification[] => {
    return notiToPresent.sort((a, b) => {
      const dateA = dayjs(a.created);
      const dateB = dayjs(b.created);

      return dateA.isAfter(dateB) ? -1 : 1;
    });
  };

  let notificationListSorted: Notification[] =
    sortNotificationsByCreatedAt(notiToPresent);

  // const renderItem = ({ item, index, section }) => {
  //   if (section.title === "new") {
  //     return <NotificationListNew notifications={item} />;
  //   } else {
  //     return <NotificationList notifications={item} />;
  //   }
  // };
  const renderItem = ({item, index}) => {
    return <NotificationListNew notifications={item} />;
  };

  const renderSectionHeader = ({section}) => {
    return (
      <Text style={styles.notiTitle}>
        {section.title === 'new' ? 'Mới' : 'Trước đó'}
      </Text>
    );
  };

  const sections = [
    {title: 'new', data: [notificationListSorted.slice(0, 2)]},
    {title: 'old', data: [notificationListSorted.slice(2)]},
  ];
  return (
    <View>
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>Thông báo</Text>
        <TouchableOpacity style={styles.btnSearch}>
          <FontAwesome5Icon name="search" size={18} />
        </TouchableOpacity>
      </View>

      <SectionList
        sections={sections}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        stickySectionHeadersEnabled={false}
      />
    </View>
  );
}

export default NotificationScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  titleWrapper: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 40,
    alignItems: 'center',
    marginHorizontal: 20,
  },
  btnSearch: {
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ddd',
    borderRadius: 40,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  notiTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    margin: 10,
    marginHorizontal: 20,
  },
});
