import {useLogoutMutation} from '@/Redux/api/auth';
import {useAppDispatch, useAppSelector} from '@/Redux/store';
import React, {useEffect, useState} from 'react';
import {
  Text,
  StyleSheet,
  Alert,
  Animated,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import Header from '@/Components/Header';
import {useNavigation} from '@react-navigation/native';
import {ScreenNavigationProp} from '@/Routes/Stack';
import PostTool from '@/Components/PostTool';
import {useGetListPostsQuery} from '@/Redux/api/post';
import useLogout from '@/Hooks/useLogout';
import FeedItem from '@/Components/PostItem';
import {GetListPostsDTO, TPost} from '@/types/post.type';

const HomeScreen = () => {
  const navigation = useNavigation<ScreenNavigationProp>();
  const token = useAppSelector(state => state.auth.token);
  const dispatch = useAppDispatch();
  const [mutateLogout, {isLoading}] = useLogoutMutation();

  const initParams: GetListPostsDTO = {
    user_id: '0',
    index: '1',
    count: '10',
  };

  const [listPosts, setListPosts] = useState<TPost[]>([]);
  const [param, setParam] = useState<GetListPostsDTO>(initParams);
  const [latstId, setLatstId] = useState<string>('0');
  const {
    data,
    isLoading: isLoadingPosts,
    isFetching: isFetchingPosts,
    isSuccess,
    refetch,
  } = useGetListPostsQuery(param, {refetchOnMountOrArgChange: true});

  const {handleLogout} = useLogout();

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
    [{nativeEvent: {contentOffset: {y: scrollY}}}],
    {useNativeDriver: false},
  );

  const handleRefresh = () => {
    setParam({...param, last_id: data?.data.last_id});
    if (isSuccess) {
      setListPosts(data?.data.post);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setListPosts(prevListPosts => [...prevListPosts, ...data?.data.post]);
      setLatstId(data?.data.last_id);
    }
  }, [isSuccess, data?.data]);

  const loadMorePosts = () => {
    setParam(prevParam => ({...prevParam, last_id: data?.data.last_id}));
  };

  return (
    <>
      <Header translateY={translateY} />

      <FlatList
        onScroll={onScroll}
        data={listPosts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => <FeedItem item={item} />}
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
      <Text style={styles.subtitle}>{isLoadingPosts ? 'Loading...' : ''}</Text>
      <Text onPress={handleLogout} style={styles.subtitle}>
        Logout
      </Text>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
