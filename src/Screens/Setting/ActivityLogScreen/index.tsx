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
import {useFocusEffect} from '@react-navigation/native';
import {
  useGetSavedSearchQuery,
  useDelSavedSearchMutation,
} from '@/Redux/api/search';
import Spinner from 'react-native-loading-spinner-overlay';
const ActivityLogScreen = () => {
  const {
    data: resSaved,
    isLoading,
    isError,
    isSuccess,
    refetch,
  } = useGetSavedSearchQuery({
    index: '0',
    count: '20',
  });
  const [delSavedSearch, {isLoading: isLoadingDel}] =
    useDelSavedSearchMutation();

  React.useEffect(() => {
    if (isSuccess) {
      setListActivityItem(resSaved?.data || []);
      console.log(resSaved?.data);
    }
  }, [isSuccess]);

  useFocusEffect(
    React.useCallback(() => {
      refetch();
    }, [refetch]),
  );

  const [listActivityItem, setListActivityItem] = useState<TSearch[]>();

  const deleteAllActivityLog = () => {
    delSavedSearch({all: '1'})
      .unwrap()
      .then(res => {
        console.log(res);
      })
      .catch(err => console.log(err));
  };

  const handleDeleteSearch = (_id: string) => {
    delSavedSearch({search_id: _id})
      .unwrap()
      .then(res => {
        console.log(res);
      })
      .catch(err => console.log(err));
  };

  const uniqueDates = [
    ...new Set(
      listActivityItem?.map(item =>
        new Date(item.created).toLocaleDateString(),
      ),
    ),
  ];

  const convertToDate = (dateString: string) => {
    const [day, month, year] = dateString.split('/');

    return `${day} tháng ${month} ${year}`;
  };

  return (
    <View style={styles.container}>
      <Spinner visible={isLoading || isLoadingDel} />
      <TouchableOpacity
        onPress={deleteAllActivityLog}
        style={styles.delete_all_search}>
        <Text style={styles.delete_all_search_text}>Xóa các tìm kiếm</Text>
      </TouchableOpacity>
      <View style={styles.activity_log_container}>
        <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
          <View style={styles.list_search}>
            {uniqueDates?.map(date => (
              <View
                key={date}
                style={{display: 'flex', flexDirection: 'column', gap: 20}}>
                <Text style={styles.dateText}>{convertToDate(date)}</Text>
                {listActivityItem
                  ?.filter(
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
    marginRight: 0,
    width: 250,
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
