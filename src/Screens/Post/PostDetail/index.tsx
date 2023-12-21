/* eslint-disable react/no-unstable-nested-components */
import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ScrollView,
  Image,
  TextInput,
  Dimensions,
  Alert,
} from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useGetPostQuery} from '@/Redux/api/post';
import {useFocusEffect} from '@react-navigation/native';
import PostItem from '@/Components/PostItem';
import mark from './data.json';
import Mark from '@/Components/Mark';

import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {TPost} from '@/types/post.type';
import {useFeelMutation, useDeleteFeelMutation} from '@/Redux/api/comment';
import {ScreenNavigationProp} from '@/Routes/Stack';
import {calculateTimeDifference} from '@/Utils';
import Comment from '@/Components/Comment';
import {FIXED_STATUSBAR_HEIGHT, SCREEN_WIDTH} from '@/Constants';
import {
  useGetMarkCommentQuery,
  useSetMarkCommentMutation,
} from '@/Redux/api/comment';
import VideoPlayer from 'react-native-video-player';
import Spinner from 'react-native-loading-spinner-overlay';

const width = Dimensions.get('window').width;

const PostDetailScreen = () => {
  const navigation = useNavigation<ScreenNavigationProp>();
  const route = useRoute<any>();
  const {postId} = route.params;

  const [data1, setData1] = useState([]);
  const {
    data: getMarkComment,
    isLoading: isLoadingGet,
    isSuccess,
    refetch,
  } = useGetMarkCommentQuery({id: postId, index: '0', count: '100'});
  const [setMarkComment, {isLoading: isLoadingSet}] =
    useSetMarkCommentMutation();

  useEffect(() => {
    if (isSuccess) {
      // console.log('getMarkComment', getMarkComment?.data);
      // setData(getMarkComment?.data);
      setData1(getMarkComment?.data);
    }
  }, [getMarkComment, isSuccess]);

  const onPressSearchHandler = () => {
    navigation.navigate('Search');
  };

  const updateText = (text: string) => {
    // Call API tạo Mark vs Type là giá trị isTrust   content là text

    // Nếu trường markIdSelect === '0'  thì là tạo Mark mới
    // Nếu trường markIdSelect !==  '0'  thì là comment cho Mark với id là markIdSelect

    // Ở đây có case lỗi nhỏ mà lười chưa xử lý dc
    if (markIdSelect === '0') {
      setMarkComment({
        content: text,
        id: postId,
        type: isTrust,
        index: '0',
        count: '100',
      })
        .unwrap()
        .then(res => {
          console.log(res.data);
          setMarkIdSelect('0');
          setData1(res.data);
          ref_input.current?.clear();
        })
        .catch(err => Alert.alert('Lỗi', JSON.parse(err).message));
    } else {
      setMarkComment({
        content: text,
        id: postId,
        index: '0',
        count: '100',
        mark_id: markIdSelect,
      })
        .unwrap()
        .then(res => {
          setData1(res.data);
          ref_input.current?.clear();
          setMarkIdSelect('0');
        })
        .catch(err => Alert.alert('Lỗi', JSON.parse(err).message));
    }
  };

  const {
    data,
    isLoading,
    isSuccess: isSuccessPost,
    refetch: refetchPost,
    isError,
    error,
  } = useGetPostQuery({id: postId});

  // useEffect(() => {
  //   if (isError) {
  //     Alert.alert('Lỗi', JSON.parse(error).message);
  //   }
  // }, [isError, error]);
  // const post = data?.data;
  const [post, setPost] = useState(null);

  useEffect(() => {
    if (isSuccessPost) {
      setPost(data?.data);
      setIsFelt(data?.data.is_felt);
      setFeel(data?.data.feel);
    }
  }, [isSuccessPost, data]);
  useFocusEffect(
    React.useCallback(() => {
      refetchPost();
    }, [refetchPost]),
  );

  const [mutateFeel] = useFeelMutation();
  const [mutateDeleteFeel, {isLoading: isLoadingDelete}] =
    useDeleteFeelMutation();
  const [feel, setFeel] = React.useState<string>(post?.feel);
  const [isFelt, setIsFelt] = React.useState<string>(post?.is_felt);
  const handleFeelLike = () => {
    if (isFelt === '1') {
      mutateDeleteFeel({id: postId})
        .unwrap()
        .then(res => {
          setFeel(feel =>
            String(Number(res.data.disappointed) + Number(res.data.kudos)),
          );
          setIsFelt('-1');
          console.log(res);
        })
        .catch(err => {
          Alert.alert('Lỗi', JSON.parse(err).message);
        });
      return;
    }
    mutateFeel({id: postId, type: String(1)})
      .unwrap()
      .then(res => {
        Alert.alert(
          'Thành công',
          'Bạn đã bỏ cảm xúc thành công và bị trừ 1 coin',
        );
        setFeel(feel =>
          String(Number(res.data.disappointed) + Number(res.data.kudos)),
        );
        setIsFelt('1');
        console.log(res);
      })
      .catch(err => {
        Alert.alert('Lỗi', JSON.parse(err).message);
      });
  };
  const handleFeelDislike = () => {
    if (isFelt === '0') {
      mutateDeleteFeel({id: postId})
        .unwrap()
        .then(res => {
          setFeel(feel =>
            String(Number(res.data.disappointed) + Number(res.data.kudos)),
          );
          setIsFelt('-1');
          console.log(res);
        })
        .catch(err => {
          Alert.alert('Lỗi', JSON.parse(err).message);
        });
      return;
    }
    mutateFeel({id: postId, type: String(0)})
      .unwrap()
      .then(res => {
        Alert.alert(
          'Thành công',
          'Bạn đã bỏ cảm xúc thành công và bị trừ 1 coin',
        );
        setFeel(feel =>
          String(Number(res.data.disappointed) + Number(res.data.kudos)),
        );
        setIsFelt('0');
        console.log(res);
      })
      .catch(err => {
        Alert.alert('Lỗi', JSON.parse(err).message);
      });
  };

  const ref_input = useRef<TextInput | null>(null);
  const [isTrust, setIsTrust] = useState('1');
  const [markIdSelect, setMarkIdSelect] = useState('0');

  const Focus = (id: string) => {
    setMarkIdSelect(id);
    ref_input.current?.focus();
  };
  const onPressGoBackHandler = () => {
    navigation.goBack();
  };
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        navigation.goBack();
        return true;
      };
      return () => {};
    }, []),
  );
  const avatar = post?.author.avatar;

  const imgAvt =
    avatar && avatar.length > 0
      ? {uri: avatar}
      : require('@/Assets/Images/Avatar.png');
  if (isError) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#fff',
          // justifyContent: 'center',
          // alignItems: 'center',
        }}>
        <View style={styles.navigationBar}>
          <View style={styles.navigationBarLeft}>
            <TouchableOpacity
              onPress={onPressGoBackHandler}
              style={styles.btnBack}>
              <FontAwesome5Icon name="arrow-left" color="#000" size={20} />
            </TouchableOpacity>
            <Text style={styles.textNavigationBar}>{post?.author.name}</Text>
          </View>
          <TouchableOpacity
            onPress={onPressSearchHandler}
            style={styles.btnBack}>
            <FontAwesome5Icon name="search" color="#000" size={20} />
          </TouchableOpacity>
        </View>
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
    <View style={styles.container}>
      <Spinner visible={isLoadingGet || isLoadingSet} />
      <View style={styles.navigationBar}>
        <View style={styles.navigationBarLeft}>
          <TouchableOpacity
            onPress={onPressGoBackHandler}
            style={styles.btnBack}>
            <FontAwesome5Icon name="arrow-left" color="#000" size={20} />
          </TouchableOpacity>
          <Text style={styles.textNavigationBar}>{post?.author.name}</Text>
        </View>
        <TouchableOpacity onPress={onPressSearchHandler} style={styles.btnBack}>
          <FontAwesome5Icon name="search" color="#000" size={20} />
        </TouchableOpacity>
      </View>
      <ScrollView
        scrollEventThrottle={40}
        style={{
          backgroundColor: '#ffffff',
        }}>
        <TouchableOpacity style={styles.header}>
          <View style={styles.row}>
            <Image style={styles.avatarImg} source={imgAvt} />
            <View style={{paddingLeft: 10}}>
              <Text style={styles.user}>{data?.data.author.name}</Text>
              <View style={styles.row}>
                <Text style={styles.time}>
                  {calculateTimeDifference(post?.created || '')}
                </Text>
                <Entypo name="dot-single" size={12} color="#747476" />
                <Entypo name="globe" size={10} color="#747476" />
              </View>
            </View>
          </View>
          <Entypo name="dots-three-horizontal" size={15} color="#222121" />
        </TouchableOpacity>
        <Text style={styles.post}>{post?.described}</Text>
        {post?.image &&
          post?.image
            .slice(0, 4)
            .map((img, index) => (
              <Image key={index} style={styles.photo} source={{uri: img.url}} />
            ))}
        {post?.video && (
          <VideoPlayer
            style={{width: width, height: width}}
            video={{
              uri: post?.video?.url,
            }}
          />
        )}
        <View style={styles.footer}>
          <View style={styles.separator} />
          <View style={styles.footerMenu}>
            <View style={[styles.row, {flex: 2}]}>
              <TouchableOpacity style={styles.button} onPress={handleFeelLike}>
                <View style={styles.icon}>
                  <AntDesign
                    name={isFelt === '1' ? 'like1' : 'like2'}
                    size={20}
                    color="#424040"
                  />
                </View>
              </TouchableOpacity>
              <Text style={[styles.text]}>{post?.feel}</Text>
              <TouchableOpacity
                style={styles.button}
                onPress={handleFeelDislike}>
                <View style={styles.icon}>
                  <AntDesign
                    name={isFelt === '0' ? 'dislike1' : 'dislike2'}
                    size={20}
                    color="#424040"
                  />
                </View>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={[styles.button, {flex: 1}]}
              onPress={() => {
                ref_input.current?.focus();
              }}>
              <View style={styles.icon}>
                <MaterialCommunityIcons
                  name="comment-outline"
                  size={20}
                  color="#424040"
                />
              </View>
              <Text style={styles.text}>{post?.trust}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <View style={styles.icon}>
                <MaterialCommunityIcons
                  name="share-outline"
                  size={20}
                  color="#424040"
                />
              </View>
              <Text style={styles.text}>Share</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.bottomDivider} />

        {data1.map((comment, index) => (
          <View key={JSON.stringify(comment)}>
            <Comment comment={comment} focus={Focus}></Comment>
          </View>
        ))}
      </ScrollView>
      <View style={styles.commentInputWrapper}>
        <View style={styles.textInputWrapper}>
          <TextInput
            autoFocus={false}
            placeholder={'Viết bình luận...'}
            style={styles.textInput}
            onSubmitEditing={event => updateText(event.nativeEvent.text)}
            ref={ref_input}></TextInput>
        </View>
        <View style={styles.iconWrapper}>
          <TouchableOpacity
            style={styles.iconItem}
            onPress={() => setIsTrust('1')}>
            <AntDesign
              name={isTrust === '1' ? 'like1' : 'like2'}
              size={20}
              color="#424040"
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconItem}
            onPress={() => setIsTrust('0')}>
            <AntDesign
              name={isTrust === '0' ? 'dislike1' : 'dislike2'}
              size={20}
              color="#424040"
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
export default PostDetailScreen;

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
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
  header: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 6,
    paddingHorizontal: 11,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarImg: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderColor: '#1777f2',
  },
  user: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#222121',
  },
  time: {
    fontSize: 9,
    color: '#747476',
  },
  post: {
    fontSize: 12,
    color: '#222121',
    lineHeight: 16,
    padding: 0,
    paddingHorizontal: 11,
  },
  photo: {
    marginTop: 9,
    width: '100%',
    height: 300,
  },
  footer: {
    padding: 0,
    paddingHorizontal: 11,
  },
  footerCount: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 9,
  },
  iconCount: {
    backgroundColor: '#1878f3',
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 6,
  },
  textCount: {
    fontSize: 11,
    color: '#424040',
  },
  separator: {
    width: '100%',
    height: 1,
    backgroundColor: '#f9f9f9',
  },
  footerMenu: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 9,
  },
  button: {
    flexDirection: 'row',
  },
  icon: {
    marginRight: 10,
    marginLeft: 10,
  },
  bottomDivider: {
    width: '100%',
    height: 9,
    backgroundColor: '#f0f2f5',
  },
  text: {
    fontSize: 12,
    color: '#424040',
  },
  inputPost: {
    backgroundColor: '#E6E6E6',
    color: '#121212',
    // height: 150,
    marginTop: 27,
    margin: 16,
  },

  commentInputWrapper: {
    borderWidth: 1,
    borderBottomWidth: 0,
    borderColor: '#ddd',
    left: 0,
    //paddingHorizontal: 15,
    height: 50,
    backgroundColor: '#fff',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInputWrapper: {
    height: 40,
    borderTopLeftRadius: 48,
    borderBottomLeftRadius: 48,
    backgroundColor: '#ddd',
    marginLeft: 10,
    width: screenWidth - 40 - 60,
    borderRightWidth: 0,
  },
  textInput: {
    width: '100%',
    height: 40,
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  iconWrapper: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    borderTopRightRadius: 48,
    borderBottomRightRadius: 48,
    height: 40,
    backgroundColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
    borderLeftWidth: 0,
  },
  iconItem: {
    width: 30,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navigationBar1: {
    paddingTop: 12,
    flexDirection: 'row',
    height: 54,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
  },
  navigationBarLeft1: {
    flexDirection: 'row',
    paddingLeft: 12,
  },
  textNavigationBar1: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginLeft: 5,
  },
});
