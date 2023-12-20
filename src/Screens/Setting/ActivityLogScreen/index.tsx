/* eslint-disable react-native/no-inline-styles */
/* eslint-disable curly */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Entypo from 'react-native-vector-icons/Entypo';
import {TSearch} from '@/types/user.type';
const ActivityLogScreen = () => {
  const data: TSearch[] = [
    {
      id: '6',
      keyword: 'An Trần',
      created: '2023-12-20T03:25:23.550Z',
    },
    {
      id: '5',
      keyword: 'Đinh Duy Anh',
      created: '2023-12-20T10:52:13.550Z',
    },
    {
      id: '4',
      keyword: 'Diệp',
      created: '2023-12-20T10:50:02.828Z',
    },
    {
      id: '3',
      keyword: 'Tùng Lâm',
      created: '2023-12-19T10:48:57.262Z',
    },
    {
      id: '2',
      keyword: 'Ri Đỗ',
      created: '2023-12-19T11:20:34.550Z',
    },
    {
      id: '1',
      keyword: 'Hello',
      created: '2023-12-18T07:25:74.550Z',
    },
  ];
  const [listActivityItem, setListActivityItem] = useState<TSearch[]>(data);

  const deleteAllActivityLog = () => {
    // Xử lý API xóa toàn bộ tìm kiếm ở đây
  };

  const handleDeleteSearch = (_id: string) => {
    // Xử lý API xóa hoạt động tìm kiếm ở đây
    console.log(_id);
  };

  const uniqueDates = [
    ...new Set(
      listActivityItem.map(item => new Date(item.created).toLocaleDateString()),
    ),
  ];

  const formatDate = (date: Date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1; // Tháng bắt đầu từ 0
    const year = date.getFullYear();
    return `${day} tháng ${month} ${year}`;
  };

  const convertToDate = (dateString: string) => {
    const [month, day, year] = dateString.split('/');
    return new Date(`${year}-${month}-${day}`);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={deleteAllActivityLog}
        style={styles.delete_all_search}>
        <Text style={styles.delete_all_search_text}>Xóa các tìm kiếm</Text>
      </TouchableOpacity>
      <View style={styles.activity_log_container}>
        <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
          <View style={styles.list_search}>
            {uniqueDates.map(date => (
              <View
                key={date}
                style={{display: 'flex', flexDirection: 'column', gap: 20}}>
                <Text style={styles.dateText}>
                  {formatDate(convertToDate(date))}
                </Text>
                {listActivityItem
                  .filter(
                    item =>
                      new Date(item.created).toLocaleDateString() === date,
                  )
                  .map((item, index) => (
                    <View key={index} style={styles.search_item}>
                      <View>
                        <FontAwesome5
                          style={styles.icon_search}
                          name="search"
                          size={23}
                          color={'white'}
                        />
                      </View>
                      <View style={styles.content_search_item}>
                        <View>
                          <Text style={styles.title}>
                            Bạn đã tìm kiếm trên Fakebook
                          </Text>
                        </View>
                        <View>
                          <Text style={styles.keyword}>"{item.keyword}"</Text>
                        </View>
                        <View style={styles.status}>
                          <View>
                            <FontAwesome6
                              style={styles.lock_icon}
                              name="lock"
                              size={17}
                            />
                          </View>
                          <View>
                            <Text style={{fontSize: 15}}>Chỉ mình tôi</Text>
                          </View>
                          <View>
                            <Entypo
                              style={styles.dot_icon}
                              name="dot-single"
                              size={28}
                            />
                          </View>
                          <View>
                            <Text style={{fontSize: 15}}>
                              Đã ẩn khỏi dòng thời gian
                            </Text>
                          </View>
                        </View>
                      </View>
                      <View>
                        <TouchableOpacity
                          style={styles.close_btn}
                          onPress={() => handleDeleteSearch(item.id)}>
                          <AntDesign name="close" size={32} />
                        </TouchableOpacity>
                      </View>
                    </View>
                  ))}
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  delete_all_search: {
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#bbbbbb',
    borderBottomStyle: 'solid',
  },
  delete_all_search_text: {
    textAlign: 'center',
    color: '#2477c9',
    fontSize: 19,
  },
  activity_log_container: {
    height: '96%',
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  list_search: {
    display: 'flex',
    flexDirection: 'column',
    gap: 40,
    marginBottom: 30,
  },
  dateText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
  },
  search_item: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  icon_search: {
    backgroundColor: '#2477c9',
    borderRadius: 30,
    padding: 12,
  },
  content_search_item: {
    display: 'flex',
    flexDirection: 'column',
    marginRight: 20,
    gap: 2,
  },
  title: {
    color: 'black',
    fontSize: 18,
    fontWeight: '500',
  },
  keyword: {
    fontSize: 18,
  },
  lock_icon: {
    marginRight: 5,
  },
  dot_icon: {
    marginHorizontal: -5,
  },
  status: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: 180,
  },
  close_btn: {
    marginTop: -35,
  },
});

export default ActivityLogScreen;
