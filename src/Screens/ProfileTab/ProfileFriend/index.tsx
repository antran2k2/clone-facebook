/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
  Alert,
} from 'react-native';
import {TUserFriend, TUserInfo} from '@/types/user.type';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FriendsShowing from '@/Components/FriendsShowing';
import {SCREEN_WIDTH} from '@/Constants';
import {useNavigation} from '@react-navigation/native';
import {ScreenNavigationProp} from '@/Routes/Stack';
import {useEffect} from 'react';
import {useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {useGetUserInfoQuery} from '@/Redux/api/profile';
import {useGetUserFriendsQuery} from '@/Redux/api/friend';
import {useRoute} from '@react-navigation/native';
import {useLazyGetListPostsQuery, useGetListPostsQuery} from '@/Redux/api/post';
import PostItem from '@/Components/PostItem';
import {useAppSelector} from '@/Redux/store';
import {useGetRequestedFriendsQuery} from '@/Redux/api/friend';
import {
  useSetAcceptFriendMutation,
  useUnFriendMutation,
  useSetRequestFriendMutation,
  useDelRequestFriendMutation,
} from '@/Redux/api/friend';
import Spinner from 'react-native-loading-spinner-overlay';

const ProfileFriendScreen = () => {
  const navigation = useNavigation<ScreenNavigationProp>();
  const {id: myId, username} = useAppSelector(state => state.info);
  const route = useRoute();
  const {id} = route.params as {id: string};
  if (id === myId) {
    navigation.navigate('ProfileTab');
  }

  // type =1 là bạn
  // type = 2 không là bạn
  // type = 3 là chờ xác nhận
  // type = 4 là Trả lời yêu cầu kết bạn
  const [type, setType] = useState<string>();

  const [userFriends, setUserFriendState] = useState();
  const [data, setData] = useState();

  const {
    data: info,
    isLoading,
    isSuccess,
    refetch,
    isError,
  } = useGetUserInfoQuery({user_id: id});

  const initParams = {
    count: '1000',
    index: '0',
    user_id: id,
  };
  const {
    data: dataFriend,
    isLoading: isLoadingFriend,
    isSuccess: isSuccessFriend,
    refetch: refetchFriend,
  } = useGetUserFriendsQuery(initParams);
  const [param, setParam] = useState(initParams);

  useFocusEffect(
    React.useCallback(() => {
      refetch();
      refetchFriend();
    }, [refetch, refetchFriend]),
  );

  useEffect(() => {
    if (isSuccessFriend) {
      setUserFriendState(dataFriend.data);
    }
  }, [isSuccessFriend, dataFriend?.data]);
  useEffect(() => {
    if (isSuccess) {
      setData(info.data);
      setType(info.data.is_friend === '1' ? '1' : '2');
    }
  }, [isSuccess, info?.data]);
  const [listPosts, setListPosts] = useState<TPost[]>([]);
  const [lastId, setLastId] = useState<string>('0');

  const [getPosts, {isLoading: isLoadingPosts, isFetching}] =
    useLazyGetListPostsQuery();

  const {
    data: dataPosts,
    isLoading: isLoadingPosts2,
    isSuccess: isSuccessPosts,
    refetch: refetchPosts,
  } = useGetListPostsQuery(param);

  useEffect(() => {
    if (isSuccessPosts) {
      setListPosts(dataPosts?.data.post);
    }
  }, [isSuccessPosts, dataPosts?.data]);

  useFocusEffect(
    React.useCallback(() => {
      refetchPosts();
    }, [refetchPosts]),
  );

  const [setRequestFriend, {isLoading: isLoading1}] =
    useSetRequestFriendMutation();
  const [setAcceptFriend, {isLoading: isLoading2}] =
    useSetAcceptFriendMutation();
  const [unFriend, {isLoading: isLoading3}] = useUnFriendMutation();
  const [delRequestFriend, {isLoading: isLoading4}] =
    useDelRequestFriendMutation();

  const {
    data: response,
    isLoading: isLoadingGetRequestedFriends,
    isSuccess: isSuccessGetRequestedFriends,
    error,
    refetch: refetchGetRequestedFriends,
  } = useGetRequestedFriendsQuery({
    index: '0',
    count: '200',
  });

  useEffect(() => {
    if (isSuccess) {
      // setFriendRequests(response.data?.requests);
      const idExists: boolean = response?.data?.requests.some(
        item => item.id === data?.id,
      );
      if (idExists) {
        setType('4');
      }
    }
  }, [data?.id, isSuccess, response?.data]);
  useFocusEffect(
    React.useCallback(() => {
      refetch();
    }, [refetch]),
  );

  const renderButton = () => {
    if (type === '1') {
      return (
        <TouchableOpacity
          style={styles.btnAddStory}
          onPress={() => {
            Alert.alert(
              'Huỷ kết bạn',
              'Bạn có chắc chắn muốn huy kết bạn với ' + data?.username + '?',
              [
                {
                  text: 'Đóng',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
                },
                {
                  text: 'Huỷ kết bạn',
                  onPress: () => {
                    console.log('OK Pressed');
                    unFriend({user_id: data?.id})
                      .unwrap()
                      .then(res => {
                        setType('2');
                      })
                      .catch(err => {
                        Alert.alert('Lỗi', JSON.parse(err).message);
                      });
                  },
                },
              ],
              {cancelable: false},
            );
          }}>
          <FontAwesome6 size={16} color="#fff" name="user-check" />
          <Text
            style={{
              fontSize: 16,
              fontWeight: '500',
              color: '#fff',
              marginLeft: 5,
            }}>
            Bạn bè
          </Text>
        </TouchableOpacity>
      );
    } else if (type === '2') {
      return (
        <TouchableOpacity
          style={styles.btnAddStory}
          onPress={() => {
            setRequestFriend({user_id: data?.id})
              .unwrap()
              .then(res => {
                setType('3');
              })
              .catch(err => {
                Alert.alert('Lỗi', JSON.parse(err).message);
                if (JSON.parse(err).code === '4003') {
                  setType('3');
                }
              });
          }}>
          <FontAwesome6 size={16} color="#fff" name="user-plus" />
          <Text
            style={{
              fontSize: 16,
              fontWeight: '500',
              color: '#fff',
              marginLeft: 5,
            }}>
            Thêm bạn
          </Text>
        </TouchableOpacity>
      );
    } else if (type === '3') {
      return (
        <TouchableOpacity
          style={styles.btnAddStory}
          onPress={() => {
            Alert.alert(
              'Huỷ yêu cầu kết bạn',
              'Bạn có chắc chắn muốn huy yêu cầu kết bạn tới ' +
                data?.username +
                '?',
              [
                {
                  text: 'Đóng',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
                },
                {
                  text: 'Huỷ yêu cầu',
                  onPress: () => {
                    console.log('OK Pressed');
                    delRequestFriend({user_id: data?.id})
                      .unwrap()
                      .then(res => {
                        setType('2');
                      })
                      .catch(err => {
                        Alert.alert('Lỗi', JSON.parse(err).message);
                      });
                  },
                },
              ],
              {cancelable: false},
            );
          }}>
          <FontAwesome6 size={16} color="#fff" name="user-clock" />
          <Text
            style={{
              fontSize: 16,
              fontWeight: '500',
              color: '#fff',
              marginLeft: 5,
            }}>
            Đang chờ xác nhận
          </Text>
        </TouchableOpacity>
      );
    } else if (type === '4') {
      return (
        <TouchableOpacity
          style={styles.btnAddStory}
          onPress={() => {
            Alert.alert(
              'Trả lời yêu cầu kết bạn',
              'Bạn có chắc chắn muốn chấp nhận yêu cầu kết bạn từ ' +
                data?.username +
                '?',
              [
                {
                  text: 'Từ chối',
                  onPress: () => {
                    setAcceptFriend({user_id: data?.id, is_accept: '0'})
                      .unwrap()
                      .then(res => {
                        setType('2');
                      })
                      .catch(err => {
                        Alert.alert('Lỗi', JSON.parse(err).message);
                      });
                  },
                  style: 'destructive',
                },
                {
                  text: 'Chấp nhận',
                  onPress: () => {
                    console.log('OK Pressed');
                    setAcceptFriend({user_id: data?.id, is_accept: '1'})
                      .unwrap()
                      .then(res => {
                        setType('1');
                      })
                      .catch(err => {
                        Alert.alert('Lỗi', JSON.parse(err).message);
                      });
                  },
                },
              ],
              {cancelable: true},
            );
          }}>
          <FontAwesome6 size={16} color="#fff" name="user-clock" />
          <Text
            style={{
              fontSize: 16,
              fontWeight: '500',
              color: '#fff',
              marginLeft: 5,
            }}>
            Trả lời yêu cầu kết bạn
          </Text>
        </TouchableOpacity>
      );
    }
  };

  if (isError) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#fff',
          // justifyContent: 'center',
          // alignItems: 'center',
        }}>
        <Image
          // width={SCREEN_WIDTH}
          // height={SCREEN_WIDTH}
          style={{width: SCREEN_WIDTH, height: SCREEN_WIDTH}}
          resizeMode="contain"
          source={require('@/Assets/Images/NotFound.png')}
        />
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            style={{padding: 10, backgroundColor: '#ddd'}}
            onPress={() => {
              navigation.navigate('Home');
            }}>
            <Text>Quay về trang chủ</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  return (
    <>
      <Spinner
        visible={
          isLoading ||
          isLoadingFriend ||
          isLoading1 ||
          isLoading2 ||
          isLoading3 ||
          isLoading4
        }
      />
      <FlatList
        data={listPosts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <PostItem
            item={item}
            handleShowComment={() => {}}
            handleTouchThreeDot={() => {}}
          />
        )}
        onEndReachedThreshold={10}
        maxToRenderPerBatch={10}
        updateCellsBatchingPeriod={100}
        initialNumToRender={5}
        ListHeaderComponent={
          <View style={styles.infoWrapper}>
            <View style={styles.avatarCoverWrapper}>
              <TouchableOpacity activeOpacity={0.8}>
                <Image
                  style={styles.cover}
                  source={
                    data?.cover_image
                      ? {uri: data?.cover_image}
                      : require('@/Assets/Images/cover.png')
                  }
                />
              </TouchableOpacity>
              <View style={styles.avatarWrapper}>
                <TouchableOpacity activeOpacity={0.9}>
                  <Image
                    style={styles.avatar}
                    source={
                      data?.avatar
                        ? {uri: data?.avatar}
                        : require('@/Assets/Images/Avatar.png')
                    }
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.introWrapper}>
              <Text style={styles.name}>{data?.username}</Text>
              <Text style={styles.introTxt}>{data?.description}</Text>
              <View style={styles.introButtonWrapper}>
                {renderButton()}
                <View style={styles.introOptionsWrapper}>
                  <TouchableOpacity
                    // onPress={onPressProfileSettingHandler}
                    style={styles.btnEditProfileScreen}>
                    <MaterialCommunityIcons
                      size={20}
                      color="#000"
                      name="facebook-messenger"
                    />
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: '500',
                        color: '#000',
                        marginLeft: 5,
                      }}>
                      Nhắn tin
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('OtherPeopleSetting', {
                        userId: data?.id,
                        username: data?.username,
                      });
                    }}
                    style={styles.btnOption}>
                    <FontAwesome5Icon
                      size={20}
                      color="#000"
                      name="ellipsis-h"
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={styles.introListWrapper}>
              {data?.city && (
                <View style={styles.introLine}>
                  <FontAwesome5Icon
                    size={20}
                    color="#333"
                    style={styles.introIcon}
                    name="home"
                  />
                  <Text style={styles.introLineText}>
                    Sống tại{' '}
                    <Text style={styles.introHightLight}>{data?.city}</Text>
                  </Text>
                </View>
              )}
              {(data?.address || data?.city) && (
                <View style={styles.introLine}>
                  <FontAwesome5Icon
                    size={20}
                    color="#333"
                    style={styles.introIcon}
                    name="map-marker-alt"
                  />
                  <Text style={styles.introLineText}>
                    Đến từ{' '}
                    <Text style={styles.introHightLight}>
                      {data.address}, {data.city}, {data.country}
                    </Text>
                  </Text>
                </View>
              )}
              <View style={styles.introLine}>
                <FontAwesome5Icon
                  size={20}
                  color="#333"
                  style={styles.introIcon}
                  name="rss"
                />
                <Text style={styles.introLineText}>
                  Có{' '}
                  <Text style={styles.introHightLight}>{data?.listing} </Text>
                  người theo dõi
                </Text>
              </View>

              {data?.link && (
                <View style={styles.introLine}>
                  <FontAwesome5Icon
                    size={20}
                    color="#333"
                    style={styles.introIcon}
                    name="link"
                  />
                  <TouchableOpacity>
                    <Text style={styles.introLineText}>{data?.link}</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
            <FriendsShowing userFriends={userFriends} user_id={data?.id} />
          </View>
        }
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  infoWrapper: {
    padding: 15,
    backgroundColor: '#fff',
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
  avatarCoverWrapper: {
    paddingBottom: 90,
    position: 'relative',
  },
  cover: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  avatarWrapper: {
    backgroundColor: '#000',
    position: 'absolute',
    borderRadius: 2000,
    left: (SCREEN_WIDTH - 30 - 180) / 2, //paddingHorizontal - avatarWidth
    bottom: 0,
  },
  avatar: {
    height: 180,
    width: 180,
    borderRadius: 2000,
    borderColor: '#fff',
    borderWidth: 5,
  },
  btnChangeCover: {
    borderColor: '#fff',
    backgroundColor: '#ddd',
    position: 'absolute',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 50,
    width: 45,
    height: 45,
    borderWidth: 2.5,
    bottom: 90 + 10,
    right: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnChangeAvatar: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    borderRadius: 50,
    width: 45,
    height: 45,
    borderWidth: 2.5,
    borderColor: '#fff',
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgCamera: {
    height: 34,
    width: 34,
  },
  introWrapper: {
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomColor: '#ddd',
    borderBottomWidth: 0.5,
  },
  name: {
    fontSize: 24,
    fontWeight: '500',
    color: '#000',
  },
  introTxt: {
    color: 'rgba(0,0,0,0.7)',
    marginTop: 10,
  },
  introButtonWrapper: {
    marginTop: 15,
  },
  introOptionsWrapper: {
    marginTop: 5,
    flexDirection: 'row',
  },
  btnAddStory: {
    backgroundColor: '#318bfb',
    borderRadius: 5,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: SCREEN_WIDTH - 30, //paddingHorizontal optionBtnWidth, marginLeft
  },
  btnEditProfileScreen: {
    backgroundColor: '#ddd',
    borderRadius: 5,
    height: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: SCREEN_WIDTH - 30 - 50 - 10, //paddingHorizontal optionBtnWidth, marginLeft
  },
  btnOption: {
    marginLeft: 10,
    borderRadius: 5,
    height: 40,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ddd',
  },
  introListWrapper: {
    paddingVertical: 10,
  },
  introLine: {
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
  },
  introIcon: {
    width: 30,
  },
  introLineText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#000',
  },
  introHightLight: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#000',
  },
  btnEditPublicDetail: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e1f0f9',
    width: '100%',
    height: 40,
    borderRadius: 5,
  },
  navigationsWrapper: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginTop: 15,
    borderTopColor: '#ddd',
    borderTopWidth: 1,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    height: 100,
    width: SCREEN_WIDTH,
    paddingHorizontal: 10,
    paddingTop: 24,
  },
  navigation: {
    flexDirection: 'row',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    backgroundColor: '#ddd',
    borderRadius: 48,
    marginHorizontal: 5,
  },
  navigationIcon: {
    width: 30,
    alignItems: 'center',
  },
  navigationBar: {
    paddingTop: 12,
    flexDirection: 'row',
    height: 64,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  navigationBarLeft: {
    flexDirection: 'row',
  },
  textNavigationBar: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginLeft: 5,
  },
  btnBack: {
    width: 50,
    alignItems: 'center',
  },
  navigationTitle: {
    fontSize: 18,
  },
  searchToolWrapper: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
});

export default ProfileFriendScreen;
