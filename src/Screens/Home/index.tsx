import React, { useEffect, useState } from 'react';
import {
  Text,
  StyleSheet,
  Animated,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
  TouchableOpacity,
  View,
} from 'react-native';
import Header from '@/Components/Header';
import PostTool from '@/Components/PostTool';
import { useGetListPostsQuery } from '@/Redux/api/post';
import useLogout from '@/Hooks/useLogout';
import { GetListPostsDTO, TPost } from '@/types/post.type';
import PostItem from '@/Components/PostItem';
import { useAppSelector } from '@/Redux/store';
import { useNavigation } from '@react-navigation/native';
import { ScreenNavigationProp } from '@/Routes/Stack';
import { useFeelMutation } from '@/Redux/api/comment';
import Modal from 'react-native-modal';
import CommentListScreen from '@/Components/ListComment';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const HomeScreen = () => {
  const [selectPost, setSelectPost] = useState(null);
  const token = useAppSelector(state => state.auth.token);
  const { avatar, id: userId, username } = useAppSelector(state => state.info);
  const navigation = useNavigation<ScreenNavigationProp>();
  const [mutateFeel, { isLoading }] = useFeelMutation();
  const initParams: GetListPostsDTO = {
    // user_id: userId || '12',
    user_id: '',
    index: '1',
    count: '10',
  };

  const [listPosts, setListPosts] = useState<TPost[]>([]);
  const [param, setParam] = useState<GetListPostsDTO>(initParams);
  const [lastId, setLastId] = useState<string>('0');
  const {
    data,
    isLoading: isLoadingPosts,
    isFetching: isFetchingPosts,
    isSuccess,
    // refetch,
  } = useGetListPostsQuery(param, { refetchOnMountOrArgChange: true });

  const { handleLogout } = useLogout();
  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const [isModalVisible1, setModalVisible1] = useState(false);
  const toggleModal1 = () => {
    setModalVisible1(!isModalVisible1);
  };

  const handleReport = () => {
    toggleModal1();
    navigation.navigate('Report', {
      authorId: selectPost?.author.id, postId: selectPost?.id, authorName: selectPost?.author.name
    })
  }

  const toggleArrageModal = () => { };
  // useEffect(() => {
  //   const unsubscribe = messaging().onMessage(async (remoteMessage: any) => {
  //     Alert.alert(
  //       remoteMessage.notification.title,
  //       remoteMessage.notification.body,
  //       [{text: 'OK', onPress: handleLogout}],
  //       {cancelable: false},
  //     );
  //   });

  //   return unsubscribe;
  // }, [handleLogout]);

  const scrollY = new Animated.Value(0);
  const diffClamp = Animated.diffClamp(scrollY, 0, 64);

  const translateY = diffClamp.interpolate({
    inputRange: [0, 64],
    outputRange: [0, -64],
    extrapolate: 'clamp',
  });

  const onScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    { useNativeDriver: false },
  );

  const handleRefresh = () => {
    setParam({ ...param, last_id: lastId });
    if (isSuccess) {
      setListPosts(data?.data.post);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setListPosts(prevListPosts => [...prevListPosts, ...data?.data.post]);
      setLastId(data?.data.last_id || '0');
    }
  }, [isSuccess, data?.data]);

  const loadMorePosts = () => {
    setParam(prevParam => ({ ...prevParam, last_id: lastId }));
  };
  const handleTouchThreeDot = (item: any) => {
    setSelectPost(item)
    console.log(item)
    toggleModal1();
    console.log('touch 3 dot');
  };
  return (
    <>
      <SafeAreaView style={styles.container}>
        <Header translateY={translateY} />

        <FlatList
          onScroll={onScroll}
          data={listPosts}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <PostItem
              item={item}
              handleTouchThreeDot={() => handleTouchThreeDot(item)}
              handleShowComment={toggleModal}
            />
          )}
          onEndReached={loadMorePosts}
          onEndReachedThreshold={0.1}
          maxToRenderPerBatch={10}
          updateCellsBatchingPeriod={100}
          initialNumToRender={5}
          ListHeaderComponent={PostTool}
          ListFooterComponent={
            isLoadingPosts || isFetchingPosts ? (
              <ActivityIndicator size="large" />
            ) : null
          }
          onRefresh={handleRefresh}
          refreshing={isLoadingPosts || isFetchingPosts}
        />
        <Text style={styles.subtitle}>
          {isLoadingPosts ? 'Loading...' : ''}
        </Text>
        <Text style={styles.subtitle}>user: {userId}</Text>
        <Text onPress={handleLogout} style={styles.subtitle}>
          Logout
        </Text>
      </SafeAreaView>

      {/* Model Comment */}
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={toggleModal}
        onBackButtonPress={toggleModal}
        backdropOpacity={0.3}
        //onSwipeComplete={() => setModalVisible(false)}
        useNativeDriverForBackdrop
        //swipeDirection={['down']}
        style={{
          margin: 5, borderRadius: 50, flex: 1,
          justifyContent: 'flex-end'
        }}
      >
        <CommentListScreen />
      </Modal>

      {/* Model Report */}
      <Modal
        isVisible={isModalVisible1}
        onBackdropPress={toggleModal1}
        onBackButtonPress={toggleModal1}
        backdropOpacity={0.3}
        onSwipeComplete={() => setModalVisible(false)}
        useNativeDriverForBackdrop
        swipeDirection={['down']}
        style={{
          margin: 5, borderRadius: 50, flex: 1,
          justifyContent: 'flex-end',
        }}
      >
        <View style={{
          paddingTop: 16,
          paddingBottom: 10,
          backgroundColor: '#fff',
        }}>
          <TouchableOpacity style={styles.postOptionItemWrapper}>
            <View style={styles.postOptionItem}>
              <View style={styles.optionIcon}><MaterialCommunityIcons name="pencil-outline" size={26} color="#000"></MaterialCommunityIcons></View>
              <View>
                <Text style={{
                  fontSize: 17,
                  fontWeight: '400',
                  color: '#000'
                }}>Lưu bài viết</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.postOptionItemWrapper}>
            <View style={styles.postOptionItem}>
              <View style={styles.optionIcon}><MaterialCommunityIcons name="pencil-outline" size={26} color="#000"></MaterialCommunityIcons></View>
              <View>
                <Text style={{
                  fontSize: 17,
                  fontWeight: '400',
                  color: '#000'
                }}>Ẩn bài viết</Text>
              </View>
            </View>
          </TouchableOpacity>
          <View style={{ height: 6, backgroundColor: '#ddd' }}></View>
          <TouchableOpacity style={styles.postOptionItemWrapper}>
            <View style={styles.postOptionItem}>
              <View style={styles.optionIcon}><MaterialCommunityIcons name="pencil-outline" size={26} color="#000"></MaterialCommunityIcons></View>
              <View>
                <Text style={{
                  fontSize: 17,
                  fontWeight: '400',
                  color: '#000'
                }}>Tại sao tôi nhìn thấy bài viết này</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.postOptionItemWrapper}
            onPress={handleReport}>
            <View style={styles.postOptionItem}>
              <View style={styles.optionIcon}><MaterialCommunityIcons name="pencil-outline" size={26} color="#000"></MaterialCommunityIcons></View>
              <View>
                <Text style={{
                  fontSize: 17,
                  fontWeight: '400',
                  color: '#000'
                }}>Báo cáo bài viết</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.postOptionItemWrapper}>
            <View style={styles.postOptionItem}>
              <View style={styles.optionIcon}><MaterialCommunityIcons name="pencil-outline" size={26} color="#000"></MaterialCommunityIcons></View>
              <View>
                <Text style={{
                  fontSize: 17,
                  fontWeight: '400',
                  color: '#000'
                }}>Bật thông báo về bài viết này</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    marginTop: 22,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: 'gray',
  },
  postOptionItemWrapper: {
    paddingBottom: 14,
    paddingTop: 12,
    paddingLeft: 20,
    paddingRight: 10,
  },
  postOptionItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionIcon: {
    width: 35,
    alignItems: 'center'
  },
});

export default HomeScreen;
