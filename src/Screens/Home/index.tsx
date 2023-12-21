import React, {useEffect, useState} from 'react';
import {
  Text,
  StyleSheet,
  Animated,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
  Alert,
  TouchableOpacity,
  View,
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
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const HomeScreen = () => {
  const token = useAppSelector(state => state.auth.token);
  const {avatar, id: userId, username} = useAppSelector(state => state.info);
  const navigation = useNavigation<ScreenNavigationProp>();
  const [selectPost, setSelectPost] = useState(null);
  const initParams: GetListPostsDTO = {
    // user_id: userId || '12',
    index: '0',
    count: '100',
  };

  const [param, setParam] = useState<GetListPostsDTO>(initParams);
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

  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const handleShowComment = (item: any) => {
    setSelectPost(item);
    toggleModal();
  };

  const [isModalVisible1, setModalVisible1] = useState(false);
  const toggleModal1 = () => {
    setModalVisible1(!isModalVisible1);
  };

  const handleReport = () => {
    toggleModal1();
    navigation.navigate('Report', {
      authorId: selectPost?.author.id,
      postId: selectPost?.id,
      authorName: selectPost?.author.name,
    });
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
  const handleTouchThreeDot = (item: any) => {
    setSelectPost(item);
    console.log(item);
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
          renderItem={({item}) => (
            <PostItem
              item={item}
              handleShowComment={() => handleShowComment(item)}
              handleTouchThreeDot={() => handleTouchThreeDot(item)}
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
          margin: 5,
          borderRadius: 50,
          flex: 1,
          justifyContent: 'flex-end',
        }}>
        <View
          style={{
            paddingTop: 16,
            paddingBottom: 10,
            backgroundColor: '#fff',
          }}>
          <TouchableOpacity style={styles.postOptionItemWrapper}>
            <View style={styles.postOptionItem}>
              <View style={styles.optionIcon}>
                <MaterialCommunityIcons
                  name="pencil-outline"
                  size={26}
                  color="#000"></MaterialCommunityIcons>
              </View>
              <View>
                <Text
                  style={{
                    fontSize: 17,
                    fontWeight: '400',
                    color: '#000',
                  }}>
                  Lưu bài viết
                </Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.postOptionItemWrapper}>
            <View style={styles.postOptionItem}>
              <View style={styles.optionIcon}>
                <MaterialCommunityIcons
                  name="pencil-outline"
                  size={26}
                  color="#000"></MaterialCommunityIcons>
              </View>
              <View>
                <Text
                  style={{
                    fontSize: 17,
                    fontWeight: '400',
                    color: '#000',
                  }}>
                  Ẩn bài viết
                </Text>
              </View>
            </View>
          </TouchableOpacity>
          <View style={{height: 6, backgroundColor: '#ddd'}}></View>
          <TouchableOpacity style={styles.postOptionItemWrapper}>
            <View style={styles.postOptionItem}>
              <View style={styles.optionIcon}>
                <MaterialCommunityIcons
                  name="pencil-outline"
                  size={26}
                  color="#000"></MaterialCommunityIcons>
              </View>
              <View>
                <Text
                  style={{
                    fontSize: 17,
                    fontWeight: '400',
                    color: '#000',
                  }}>
                  Tại sao tôi nhìn thấy bài viết này
                </Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.postOptionItemWrapper}
            onPress={handleReport}>
            <View style={styles.postOptionItem}>
              <View style={styles.optionIcon}>
                <MaterialCommunityIcons
                  name="pencil-outline"
                  size={26}
                  color="#000"></MaterialCommunityIcons>
              </View>
              <View>
                <Text
                  style={{
                    fontSize: 17,
                    fontWeight: '400',
                    color: '#000',
                  }}>
                  Báo cáo bài viết
                </Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.postOptionItemWrapper}>
            <View style={styles.postOptionItem}>
              <View style={styles.optionIcon}>
                <MaterialCommunityIcons
                  name="pencil-outline"
                  size={26}
                  color="#000"></MaterialCommunityIcons>
              </View>
              <View>
                <Text
                  style={{
                    fontSize: 17,
                    fontWeight: '400',
                    color: '#000',
                  }}>
                  Bật thông báo về bài viết này
                </Text>
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
    alignItems: 'center',
  },
});

export default HomeScreen;
