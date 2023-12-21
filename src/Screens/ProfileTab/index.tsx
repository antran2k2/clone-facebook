import {useAppSelector} from '@/Redux/store';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import {TUserFriend, TUserInfo} from '@/types/user.type';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import FriendsShowing from '@/Components/FriendsShowing';
import {SCREEN_WIDTH} from '@/Constants';
import {ScreenNavigationProp} from '@/Routes/Stack';
import {useNavigation, useRoute} from '@react-navigation/native';
import Modal from 'react-native-modal';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import BuyCoinScreen from '@/Components/BuyCoin';
import {useGetUserInfoQuery} from '@/Redux/api/profile';
import {useGetUserFriendsQuery} from '@/Redux/api/friend';
import {useFocusEffect} from '@react-navigation/native';
import {useGetListPostsQuery, useLazyGetListPostsQuery} from '@/Redux/api/post';
import PostItem from '@/Components/PostItem';
import {FlatList} from 'react-native';
import CommentListScreen from '@/Components/ListComment';

const ProfileTabScreen = () => {
  const [selectPost, setSelectPost] = useState(null);
  const handleShowComment = (item: any) => {
    setSelectPost(item);
    toggleModal11();
  };
  const [isModalVisible11, setModalVisible11] = useState(false);
  const toggleModal11 = () => {
    setModalVisible11(!isModalVisible11);
  };

  const [data, setData] = useState();
  const {id, coins} = useAppSelector(state => state.info);
  const {
    data: info,
    isLoading,
    isSuccess,
    refetch,
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
  const [param, setParam] = useState<GetListPostsDTO>(initParams);

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
    }
  }, [isSuccess, info?.data]);
  const [listPosts, setListPosts] = useState<TPost[]>([]);
  const [lastId, setLastId] = useState<string>('0');

  const [getPosts, {isLoading: isLoadingPosts, isFetching}] =
    useLazyGetListPostsQuery();

  useEffect(() => {
    getPosts(param)
      .unwrap()
      .then(res => {
        // setListPosts(res.data.post);
        setListPosts(prev => {
          // Lọc ra những bài viết có ID khác với bài viết hiện tại
          const newPosts = res.data.post.filter(newPost => {
            return !prev.some(prevPost => prevPost.id === newPost.id);
          });

          // Thêm những bài viết mới vào danh sách prev
          return [...prev, ...newPosts];
        });
        setLastId(res.data.last_id);
      });
  }, [param, getPosts]);

  const navigation = useNavigation<ScreenNavigationProp>();

  const [isModalVisible1, setModalVisible1] = useState(false);

  const toggleModal1 = () => {
    setModalVisible1(!isModalVisible1);
  };

  const [isModalVisible2, setModalVisible2] = useState(false);

  const toggleModal2 = () => {
    setModalVisible2(!isModalVisible2);
  };

  const [isModalVisible3, setModalVisible3] = useState(false);

  const toggleModal3 = () => {
    setModalVisible3(!isModalVisible3);
  };

  const [userFriendsState, setUserFriendState] = useState();

  const onPressAvatarOptionsHandler = () => {
    toggleModal1();
  };

  const onPressCoverImageOptionsHandler = () => {
    toggleModal2();
  };

  const onPressProfileSettingHandler = () => {
    navigation.navigate('SettingPersonalPage');
  };

  const onPressEditPublicInfoHandler = () => {
    navigation.navigate('EditPublicInfo');
  };

  const onPressCoinHandler = () => {
    toggleModal3();
  };

  const onPressShowImage = () => {
    setModalVisible1(false);
    setModalVisible2(false);
    navigation.navigate('ShowImage', {
      link: data.cover_image,
    });
  };

  const onPressChangeAvatar = () => {
    setModalVisible1(false);
    setModalVisible2(false);
    navigation.navigate('ChangeAvatar', {
      type: 'avatar',
    });
  };

  const onPressChangeImageCover = () => {
    setModalVisible1(false);
    setModalVisible2(false);
    navigation.navigate('ChangeAvatar', {
      type: 'cover_image',
    });
  };

  const renderHead = () => {
    <View style={styles.infoWrapper}>
      <View style={styles.avatarCoverWrapper}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            navigation.navigate('ShowImage', {
              link: data.cover_image,
            });
          }}>
          <Image
            style={styles.cover}
            source={
              data?.cover_image
                ? {uri: data.cover_image}
                : require('@/Assets/Images/cover.png')
            }
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnChangeCover}
          onPress={onPressCoverImageOptionsHandler}>
          <FontAwesome5Icon size={18} name="camera" />
        </TouchableOpacity>
        <View style={styles.avatarWrapper}>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => {
              navigation.navigate('ShowImage', {
                link: data.avatar,
              });
            }}>
            <Image
              style={styles.avatar}
              source={
                data?.avatar
                  ? {uri: data.avatar}
                  : require('@/Assets/Images/Avatar.png')
              }
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onPressAvatarOptionsHandler}
            style={styles.btnChangeAvatar}>
            <FontAwesome5Icon size={18} name="camera" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.introWrapper}>
        <Text style={styles.name}>{data?.username}</Text>
        <Text style={styles.introTxt}>{data?.description}</Text>
        <View style={styles.introButtonWrapper}>
          <TouchableOpacity activeOpacity={0.8} style={styles.btnCoin}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: '500',
                color: '#fff',
                marginRight: 5,
              }}>
              {data?.coins || 0}
            </Text>
            <FontAwesome5Icon size={16} color="#fff" name="bitcoin" />
          </TouchableOpacity>
          <View style={styles.introOptionsWrapper}>
            <TouchableOpacity
              onPress={onPressCoinHandler}
              activeOpacity={0.8}
              style={styles.btnAddStory}>
              <FontAwesome5Icon size={16} color="#fff" name="plus-circle" />
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '500',
                  color: '#fff',
                  marginLeft: 5,
                }}>
                Nạp thêm Coin
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onPressProfileSettingHandler}
              activeOpacity={0.8}
              style={styles.btnOption}>
              <FontAwesome5Icon size={20} color="#000" name="ellipsis-h" />
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
              Sống tại <Text style={styles.introHightLight}>{data?.city}</Text>
            </Text>
          </View>
        )}
        {data?.address && (
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
                {data?.address}, {data?.city}, {data?.country}
              </Text>
            </Text>
          </View>
        )}
        {data?.listing && (
          <View style={styles.introLine}>
            <FontAwesome5Icon
              size={20}
              color="#333"
              style={styles.introIcon}
              name="rss"
            />
            <Text style={styles.introLineText}>
              Có <Text style={styles.introHightLight}>{data?.listing} </Text>
              người theo dõi
            </Text>
          </View>
        )}
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
        <View style={styles.introLine}>
          <FontAwesome5Icon
            size={20}
            color="#333"
            style={styles.introIcon}
            name="ellipsis-h"
          />
          <TouchableOpacity>
            <Text style={styles.introLineText}>
              Xem thông tin giới thiệu của bạn
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          paddingVertical: 20,
          borderBottomWidth: 0.5,
          borderBottomColor: '#ddd',
        }}>
        <TouchableOpacity
          onPress={onPressEditPublicInfoHandler}
          activeOpacity={0.8}
          style={styles.btnEditPublicDetail}>
          <Text style={{color: '#276fc8', fontSize: 16, fontWeight: '500'}}>
            Chỉnh sửa chi tiết công khai
          </Text>
        </TouchableOpacity>
      </View>
      <FriendsShowing userFriends={userFriendsState} user_id={data?.id || id} />
    </View>;
  };

  return (
    <>
      <FlatList
        data={listPosts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <PostItem
            item={item}
            handleShowComment={() => handleShowComment(item)}
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
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  navigation.navigate('ShowImage', {
                    link: data.cover_image,
                  });
                }}>
                <Image
                  style={styles.cover}
                  source={
                    data?.cover_image
                      ? {uri: data.cover_image}
                      : require('@/Assets/Images/cover.png')
                  }
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.btnChangeCover}
                onPress={onPressCoverImageOptionsHandler}>
                <FontAwesome5Icon size={18} name="camera" />
              </TouchableOpacity>
              <View style={styles.avatarWrapper}>
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => {
                    navigation.navigate('ShowImage', {
                      link: data.avatar,
                    });
                  }}>
                  <Image
                    style={styles.avatar}
                    source={
                      data?.avatar
                        ? {uri: data.avatar}
                        : require('@/Assets/Images/Avatar.png')
                    }
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={onPressAvatarOptionsHandler}
                  style={styles.btnChangeAvatar}>
                  <FontAwesome5Icon size={18} name="camera" />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.introWrapper}>
              <Text style={styles.name}>{data?.username}</Text>
              <Text style={styles.introTxt}>{data?.description}</Text>
              <View style={styles.introButtonWrapper}>
                <TouchableOpacity activeOpacity={0.8} style={styles.btnCoin}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: '500',
                      color: '#fff',
                      marginRight: 5,
                    }}>
                    {data?.coins || 0}
                  </Text>
                  <FontAwesome5Icon size={16} color="#fff" name="bitcoin" />
                </TouchableOpacity>
                <View style={styles.introOptionsWrapper}>
                  <TouchableOpacity
                    onPress={onPressCoinHandler}
                    activeOpacity={0.8}
                    style={styles.btnAddStory}>
                    <FontAwesome5Icon
                      size={16}
                      color="#fff"
                      name="plus-circle"
                    />
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: '500',
                        color: '#fff',
                        marginLeft: 5,
                      }}>
                      Nạp thêm Coin
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={onPressProfileSettingHandler}
                    activeOpacity={0.8}
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
              {data?.address && (
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
                      {data?.address}, {data?.city}, {data?.country}
                    </Text>
                  </Text>
                </View>
              )}
              {data?.listing && (
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
              )}
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
              <View style={styles.introLine}>
                <FontAwesome5Icon
                  size={20}
                  color="#333"
                  style={styles.introIcon}
                  name="ellipsis-h"
                />
                <TouchableOpacity>
                  <Text style={styles.introLineText}>
                    Xem thông tin giới thiệu của bạn
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{
                paddingVertical: 20,
                borderBottomWidth: 0.5,
                borderBottomColor: '#ddd',
              }}>
              <TouchableOpacity
                onPress={onPressEditPublicInfoHandler}
                activeOpacity={0.8}
                style={styles.btnEditPublicDetail}>
                <Text
                  style={{color: '#276fc8', fontSize: 16, fontWeight: '500'}}>
                  Chỉnh sửa chi tiết công khai
                </Text>
              </TouchableOpacity>
            </View>
            <FriendsShowing
              userFriends={userFriendsState}
              user_id={data?.id || id}
            />
          </View>
        }
      />

      {/* Model when Click Avatar*/}
      <Modal
        isVisible={isModalVisible1}
        onBackdropPress={toggleModal1}
        onBackButtonPress={toggleModal1}
        backdropOpacity={0.3}
        onSwipeComplete={() => setModalVisible1(false)}
        useNativeDriverForBackdrop
        swipeDirection={['down']}
        style={{
          margin: 5,
          borderRadius: 50,
          flex: 1,
          justifyContent: 'flex-end',
        }}>
        <View style={styles.modalView}>
          <TouchableOpacity style={{...styles.modalButton, marginTop: 15}}>
            <View style={styles.modalIcon}>
              <MaterialCommunityIcons
                name="image-frame"
                size={20}></MaterialCommunityIcons>
            </View>
            <Text style={styles.modalText}>Thêm khung</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.modalButton}>
            <View style={styles.modalIcon}>
              <MaterialCommunityIcons
                name="video"
                size={20}></MaterialCommunityIcons>
            </View>
            <Text style={styles.modalText}>Quay video đại diện</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.modalButton}>
            <View style={styles.modalIcon}>
              <Entypo name="video" size={20}></Entypo>
            </View>
            <Text style={styles.modalText}>Chọn video đại diện</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.modalButton}
            onPress={() => onPressChangeAvatar()}>
            <View style={styles.modalIcon}>
              <MaterialCommunityIcons
                name="image"
                size={20}></MaterialCommunityIcons>
            </View>
            <Text style={styles.modalText}>Chọn ảnh đại diện</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      {/* Model when Click Cover Image*/}
      <Modal
        isVisible={isModalVisible2}
        onBackdropPress={toggleModal2}
        onBackButtonPress={toggleModal2}
        backdropOpacity={0.3}
        onSwipeComplete={() => setModalVisible2(false)}
        useNativeDriverForBackdrop
        swipeDirection={['down']}
        style={{
          margin: 5,
          borderRadius: 50,
          flex: 1,
          justifyContent: 'flex-end',
        }}>
        <View style={styles.modalView}>
          <TouchableOpacity
            style={{...styles.modalButton, marginTop: 15}}
            onPress={onPressShowImage}>
            <View style={styles.modalIcon}>
              <MaterialCommunityIcons
                name="image"
                size={20}></MaterialCommunityIcons>
            </View>
            <Text style={styles.modalText}>Xem ảnh bìa</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.modalButton}
            onPress={onPressChangeImageCover}>
            <View style={styles.modalIcon}>
              <MaterialCommunityIcons
                name="upload"
                size={20}></MaterialCommunityIcons>
            </View>
            <Text style={styles.modalText}>Tải ảnh lên</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.modalButton}>
            <View style={styles.modalIcon}>
              <MaterialCommunityIcons
                name="facebook"
                size={20}></MaterialCommunityIcons>
            </View>
            <Text style={styles.modalText}>Chọn ảnh trên Facebook</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.modalButton}>
            <View style={styles.modalIcon}>
              <MaterialCommunityIcons
                name="select-group"
                size={20}></MaterialCommunityIcons>
            </View>
            <Text style={styles.modalText}>Tạo nhóm ảnh bìa</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.modalButton}>
            <View style={styles.modalIcon}>
              <FontAwesome5Icon name="paint-brush" size={20}></FontAwesome5Icon>
            </View>
            <Text style={styles.modalText}>Chọn ảnh nghệ thuật</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      {/* Model Buy Coin*/}
      <Modal
        isVisible={isModalVisible3}
        onBackdropPress={toggleModal3}
        onBackButtonPress={toggleModal3}
        backdropOpacity={0.3}
        onSwipeComplete={() => setModalVisible3(false)}
        useNativeDriverForBackdrop
        swipeDirection={['down']}
        style={{
          margin: 5,
          borderRadius: 50,
          alignItems: 'center',
        }}>
        <BuyCoinScreen refetch={refetch} toggleModal={toggleModal3} />
      </Modal>
      <Modal
        isVisible={isModalVisible11}
        onBackdropPress={toggleModal11}
        onBackButtonPress={toggleModal11}
        backdropOpacity={0.3}
        //onSwipeComplete={() => setModalVisible(false)}
        useNativeDriverForBackdrop
        //swipeDirection={['down']}
        style={{
          margin: 5,
          borderRadius: 50,
          flex: 1,
          justifyContent: 'flex-end',
          marginBottom: -90,
        }}>
        <CommentListScreen postItem={selectPost} />
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {},
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
    height: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: SCREEN_WIDTH - 30 - 50 - 10, //paddingHorizontal optionBtnWidth, marginLeft
  },
  btnCoin: {
    backgroundColor: '#318bfb',
    borderRadius: 5,
    height: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: SCREEN_WIDTH - 30, //paddingHorizontal optionBtnWidth, marginLeft
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
    marginBottom: 50,
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
  modalView: {
    paddingBottom: 6,
    backgroundColor: '#fff',
    width: '100%',
    borderRadius: 15,
  },
  modalButton: {
    flexDirection: 'row',
    marginBottom: 15,
    marginLeft: 10,
    alignItems: 'center',
  },
  modalIcon: {
    backgroundColor: '#E4E4E4',
    borderRadius: 50,
    padding: 10,
  },
  modalText: {
    marginLeft: 10,
    fontWeight: 'bold',
    fontSize: 17,
  },
});

export default ProfileTabScreen;
