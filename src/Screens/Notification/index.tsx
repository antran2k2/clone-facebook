import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import NotificationList from '@/Components/NotificationList';
import dayjs from 'dayjs';

export interface Notification {
  id: string;
  type: string;
  read: string;
  content?: string;
  target?: {
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
  createdAt: string;
  createdAtConverted?: string;
}

function NotificationScreen() {
  const dayjs = require('dayjs');
  var duration = require('dayjs/plugin/duration');
  dayjs.extend(duration);

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

  const notiList: Notification[] = [
    {
      id: '123456',
      type: '1',
      read: '0',
      createdAt: '2023-12-17T020:30:51.804Z',
      target: {
        id: '22222',
        username: 'An Trần',
        avatar:
          'https://m.media-amazon.com/images/I/517i1zjTFNL._AC_UF1000,1000_QL80_.jpg',
      },
    },
    {
      id: '123457',
      type: '2',
      read: '0',
      createdAt: '2023-10-22T07:37:51.804Z',
      target: {
        id: '323232',
        username: 'Bich Diep',
        avatar:
          'https://m.media-amazon.com/images/I/517i1zjTFNL._AC_UF1000,1000_QL80_.jpg',
      },
    },
    {
      id: '123458',
      type: '3',
      read: '0',
      createdAt: '2023-10-13T07:37:51.804Z',
      target: {
        id: '323232',
        username: 'Bich Diep',
        avatar: 'https://o.quizlet.com/yZXYpJl37vsaqRmPPH2law_b.png',
      },
      post: {
        id: '11111',
        description: 'Haizaa',
        status: '',
      },
    },
    {
      id: '123459',
      type: '4',
      read: '0',
      createdAt: '2023-12-16T010:37:51.804Z',
      target: {
        id: '323232',
        username: 'Bich Diep',
        avatar:
          'https://i.pinimg.com/736x/a4/33/07/a433074ce20d1323398c51f555f4cdb8.jpg',
      },
      post: {
        id: '11111',
        description: 'Haizaa',
        status: '',
      },
    },
    {
      id: '123458',
      type: '5',
      read: '0',
      createdAt: '2023-12-08T21:37:51.804Z',
      target: {
        id: '323232',
        username: 'Bich Diep',
        avatar:
          'https://i.pinimg.com/736x/a4/33/07/a433074ce20d1323398c51f555f4cdb8.jpg',
      },
      post: {
        id: '11111',
        description: 'Sáng trong vườn thông vườn đầy bóng râm',
        status: '',
      },
      feel: {
        id: 'yyyyyyy',
        type: '1',
      },
    },
    {
      id: '123458',
      type: '6',
      read: '0',
      createdAt: '2023-6-13T07:37:51.804Z',
      target: {
        id: '323232',
        username: 'Bich Diep',
        avatar: 'https://i.redd.it/5kc9gj58g3851.jpg',
      },
      post: {
        id: '11111',
        description: 'Sáng trong vườn thông vườn đầy bóng râm',
        status: '',
      },
      mark: {
        id: 'xxxxxx',
        type: 'trust',
        content: '',
      },
    },
    {
      id: '123458',
      type: '7', // MarkCommented
      read: '0',
      createdAt: '2022-10-03T07:37:51.804Z',
      target: {
        id: '323232',
        username: 'Bich Diep',
        avatar:
          'https://64.media.tumblr.com/7bba3afa293c9d4df2076be3f2fca88e/e134870bed24d737-6e/s500x750/f1c85032bc0814eb0cf45bb666a890b45b9d5b3d.jpg',
      },
      post: {
        id: '11111',
        description: 'Sáng trong vườn thông vườn đầy bóng râm',
        status: '',
      },
      mark: {
        id: 'xxxxxx',
        type: 'trust',
        content: 'Tui cũng tin tưởng bài viết nì ><',
      },
    },
    {
      id: '123458',
      type: '8',
      read: '0',
      createdAt: '2023-11-06T07:37:51.804Z',
      target: {
        id: '323232',
        username: 'Bich Diep',
        avatar: 'https://i.redd.it/5kc9gj58g3851.jpg',
      },
      post: {
        id: 'hehehe',
        description: '',
        status: '',
      },
    },
    {
      id: '123458',
      type: '9',
      read: '0',
      createdAt: '2023-12-3T07:37:51.804Z',
      target: {
        id: '323232',
        username: 'Bich Diep',
        avatar: 'https://pbs.twimg.com/media/EdVgmZ1XYAUY786.jpg',
      },
      post: {
        id: '11111',
        description: 'ahii',
        status: '',
      },
    },
  ];

  const convertStringToDateString = (inputString: string): string => {
    const now = dayjs();
    const createdAtDate = dayjs(inputString);
    const duration = dayjs.duration(now.diff(createdAtDate));

    // Kiểm tra các điều kiện và trả về chuỗi tương ứng
    if (duration.asMinutes() < 1) {
      return 'Vừa xong';
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
          createdAtConverted: convertStringToDateString(noti.createdAt),
          content: ` đã gửi cho bạn lời mời kết bạn.`,
        };
      case '2':
        return {
          ...noti,
          key: `${noti.id}`,
          createdAtConverted: convertStringToDateString(noti.createdAt),
          content: ` đã chấp nhận lời mời kết bạn của bạn.`,
        };
      case '3':
        return {
          ...noti,
          key: `${noti.id}`,
          createdAtConverted: convertStringToDateString(noti.createdAt),
          content: ` gần đây đã thêm một bài viết mới.`,
        };
      case '4':
        return {
          ...noti,
          key: `${noti.id}`,
          createdAtConverted: convertStringToDateString(noti.createdAt),
          content: ` đã chỉnh sửa một bài viết bạn quan tâm.`,
        };
      case '5':
        return {
          ...noti,
          key: `${noti.id}`,
          createdAtConverted: convertStringToDateString(noti.createdAt),
          content: ` đã bày tỏ cảm xúc về một bài viết của bạn.`,
        };
      case '6':
        return {
          ...noti,
          key: `${noti.id}`,
          createdAtConverted: convertStringToDateString(noti.createdAt),
          content: ` đã bình luận về một bài viết của bạn.`,
        };
      case '7':
        return {
          ...noti,
          key: `${noti.id}`,
          createdAtConverted: convertStringToDateString(noti.createdAt),
          content: ` đã bình luận về một bình luận mà bạn quan tâm.`,
        };
      case '8':
        return {
          ...noti,
          key: `${noti.id}`,
          createdAtConverted: convertStringToDateString(noti.createdAt),
          content: ` đã thêm một video mới.`,
        };
      case '9':
        return {
          ...noti,
          key: `${noti.id}`,
          createdAtConverted: convertStringToDateString(noti.createdAt),
          content: ` đã bình luận về một bài viết của bạn.`,
        };
      default:
        return {
          ...noti,
          key: `${noti.id}`,
          createdAtConverted: convertStringToDateString(noti.createdAt),
        };
    }
  });

  const sortNotificationsByCreatedAt = (
    notiToPresent: Notification[],
  ): Notification[] => {
    return notiToPresent.sort((a, b) => {
      const dateA = dayjs(a.createdAt);
      const dateB = dayjs(b.createdAt);

      return dateA.isAfter(dateB) ? -1 : 1;
    });
  };

  let notificationListSorted: Notification[] =
    sortNotificationsByCreatedAt(notiToPresent);

  return (
    <View>
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        style={styles.container}>
        <View style={styles.titleWrapper}>
          <Text style={styles.title}>Thông báo</Text>
          <TouchableOpacity style={styles.btnSearch}>
            <FontAwesome5Icon name="search" size={18} />
          </TouchableOpacity>
        </View>
        <Text style={styles.notiTitle}>Mới</Text>
        <NotificationList notifications={notificationListSorted.splice(0, 2)} />
        {/* <VerticalRecommendFriends /> */}
        <Text style={styles.notiTitle}>Trước đó</Text>
        <NotificationList notifications={notificationListSorted} />
      </ScrollView>
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
