import React, { useEffect, useState } from 'react';
import {
  Text,
  StyleSheet,
  Animated,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
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
const HomeScreen = () => {
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
          renderItem={({ item }) => (
            <PostItem
              item={item}
              handleTouchThreeDot={handleTouchThreeDot}
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
          justifyContent: 'flex-end', marginBottom: -90
        }}
      >
        <CommentListScreen />
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
});

export default HomeScreen;
