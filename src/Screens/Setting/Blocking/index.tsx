/* eslint-disable @typescript-eslint/no-unused-vars */
import {ScreenNavigationProp} from '@/Routes/Stack';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {TBlockUser} from '@/types/user.type';
import {useGetListBlocksQuery, useUnblockMutation} from '@/Redux/api/block';
import Spinner from 'react-native-loading-spinner-overlay';
const BlockingScreen = () => {
  const navigation = useNavigation<ScreenNavigationProp>();

  const [listBlockedUser, setListBlockUser] = useState([]);
  const {
    data,
    isSuccess,
    isLoading: isLoadingQuery,
  } = useGetListBlocksQuery({index: '0', count: '10'});
  const [mutateUnblock, {isLoading: isLoadingMutate}] = useUnblockMutation();
  //   useFocusEffect(
  //     React.useCallback(() => {
  //       // Do something when the screen is focused
  //       return () => {
  //         // Do something when the screen is unfocused
  //         // Useful for cleanup functions
  //       };
  //     }, []),
  //   );
  useEffect(() => {
    if (isSuccess) {
      console.log('data:', data?.data);
      setListBlockUser(data?.data);
    }
  }, [data, isSuccess]);
  const unBlockUser = (id: string) => {
    mutateUnblock({user_id: id})
      .unwrap()
      .then(res => {
        setListBlockUser(prevList => prevList.filter(user => user.id !== id));
      })
      .catch(err => {
        Alert.alert('Lỗi', JSON.parse(err).message);
      });
    console.log(id);
  };

  return (
    <View style={styles.container}>
      <Spinner visible={isLoadingQuery || isLoadingMutate} />
      <View style={styles.main}>
        <Text style={styles.header}>Người bị chặn</Text>
        <Text style={styles.description}>
          Một khi bạn đã chặn ai đó, họ sẽ không xem được nội dung bạn tự đăng
          trên dòng thời gian mình, gắn thẻ bạn, mời bạn tham gia sự kiện hoặc
          nhóm, bắt đầu cuộc trò chuyện với bạn hay thêm bạn làm bạn bè. Điều
          này không bao gồm các ứng dụng, trò chơi hay nhóm mà cả bạn và người
          này đều tham gia.
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('AddUserToBlockList')}
          style={styles.add_block_container}>
          <View>
            <FontAwesome6
              style={styles.icon}
              name="plus"
              size={24}
              color={'white'}
            />
          </View>
          <View>
            <Text style={styles.text_add_block}>THÊM VÀO DANH SÁCH CHẶN</Text>
          </View>
        </TouchableOpacity>
        <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
          <View style={styles.list_blocked_user}>
            {listBlockedUser &&
              listBlockedUser.map((user, index) => (
                <View key={index} style={styles.user_blocked_item}>
                  <View style={styles.image_name}>
                    <Image
                      source={
                        user.avatar
                          ? {uri: user.avatar}
                          : require('@/Assets/Images/Avatar.png')
                      }
                      style={styles.userAvatar}
                    />
                    <View>
                      <Text style={styles.username}>{user.name}</Text>
                    </View>
                  </View>
                  <View>
                    <TouchableOpacity
                      style={styles.button_unblock}
                      onPress={() => unBlockUser(user.id)}>
                      <Text style={styles.button_unblock_text}>BỎ CHẶN</Text>
                    </TouchableOpacity>
                  </View>
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
  main: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    height: '100%',
  },
  header: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'black',
  },
  description: {
    marginTop: 10,
    fontSize: 16,
    lineHeight: 18,
  },
  add_block_container: {
    display: 'flex',
    flexDirection: 'row',
    gap: 15,
    marginVertical: 20,
    alignItems: 'center',
  },
  icon: {
    backgroundColor: '#2477c9',
    paddingVertical: 17,
    paddingHorizontal: 20,
    borderRadius: 4,
  },
  text_add_block: {
    fontWeight: '500',
    color: '#2477c9',
    fontSize: 18,
  },
  list_blocked_user: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },
  user_blocked_item: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  image_name: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  userAvatar: {
    width: 60,
    height: 60,
    borderColor: '#aaaaaa',
    borderWidth: 1,
    borderRadius: 4,
  },
  username: {
    color: 'black',
    fontSize: 20,
    marginLeft: 15,
  },
  button_unblock: {
    borderWidth: 1,
    borderColor: '#bbbbbb',
    borderStyle: 'solid',
    padding: 10,
  },
  button_unblock_text: {
    fontWeight: '500',
    fontSize: 17,
  },
});

export default BlockingScreen;
