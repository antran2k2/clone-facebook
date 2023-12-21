import React, {useEffect, useState} from 'react';
import {
  Text,
  StyleSheet,
  Animated,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
  Alert,
} from 'react-native';
import Header from '@/Components/Header';
import PostTool from '@/Components/PostTool';
import {useGetListPostsQuery, useLazyGetListPostsQuery} from '@/Redux/api/post';
import useLogout from '@/Hooks/useLogout';
import {GetListPostsDTO, TPost} from '@/types/post.type';
import PostItem from '@/Components/PostItem';
import {useAppSelector} from '@/Redux/store';
import {useNavigation} from '@react-navigation/native';
import {ScreenNavigationProp} from '@/Routes/Stack';
import {useFeelMutation} from '@/Redux/api/comment';
import Modal from 'react-native-modal';
import messaging from '@react-native-firebase/messaging';
import CommentListScreen from '@/Components/ListComment';
const HomeScreen = () => {
  const token = useAppSelector(state => state.auth.token);
  const [selectPost, setSelectPost] = useState(null);
  const {avatar, id: userId, username} = useAppSelector(state => state.info);
  const navigation = useNavigation<ScreenNavigationProp>();
  const [mutateFeel, {isLoading}] = useFeelMutation();
  const initParams: GetListPostsDTO = {
    // user_id: userId || '12',
    index: '0',
    count: '100',
  };

  const [listPosts, setListPosts] = useState<TPost[]>([]);
  const [param, setParam] = useState<GetListPostsDTO>(initParams);
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

  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const handleShowComment = (item: any) => {
    setSelectPost(item);

    toggleModal();
  };

  const toggleArrageModal = () => {};

  const scrollY = new Animated.Value(0);
  const diffClamp = Animated.diffClamp(scrollY, 0, 64);

  const translateY = diffClamp.interpolate({
    inputRange: [0, 64],
    outputRange: [0, -64],
    extrapolate: 'clamp',
  });

  const onScroll = Animated.event(
    [{nativeEvent: {contentOffset: {y: scrollY}}}],
    {useNativeDriver: false},
  );

  const handleRefresh = () => {
    getPosts(param)
      .unwrap()
      .then(res => {
        // setListPosts(res.data.post);
        setListPosts(res.data.post);
        setLastId(res.data.last_id);
      });
  };

  const loadMorePosts = () => {
    // setParam(({index, count}) => ({
    //   index: (Number(index) + Number(count)).toString(),
    //   count,
    // }));
    console.log('load more');
    setParam({...param, last_id: lastId});
  };
  const handleTouchHeader = (item: any) => {
    navigation.navigate('PostDetail', {postId: item.id});
  };
  // const handleTouchHeader = (item: any) => {
  //   navigation.navigate('PostDetail', { postId: '908' });
  // };
  const handleTouchThreeDot = (item: any) => {
    setModalVisible(!isModalVisible);
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
          renderItem={({item}) => (
            <PostItem
              item={item}
              handleTouchThreeDot={handleTouchThreeDot}
              handleShowComment={() => handleShowComment(item)}
            />
          )}
          onEndReached={loadMorePosts}
          onEndReachedThreshold={10}
          maxToRenderPerBatch={10}
          updateCellsBatchingPeriod={100}
          initialNumToRender={5}
          ListHeaderComponent={PostTool}
          ListFooterComponent={
            isLoadingPosts || isFetching ? (
              <ActivityIndicator size="large" />
            ) : null
          }
          onRefresh={handleRefresh}
          refreshing={isLoadingPosts}
        />

        <Text style={styles.subtitle}>user: {userId}</Text>
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
  container: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    // marginTop: 22,
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
});

export default HomeScreen;
