import React, {useEffect, useRef, useState} from 'react';
import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  TextInput,
  SafeAreaView,
  StatusBar,
  Dimensions,
  StyleSheet,
  Animated,
  Alert,
} from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {useNavigation, useRoute} from '@react-navigation/native';
import {ScreenNavigationProp, ScreenFullFriendProp} from '@/Routes/Stack';
import {PanGestureHandler, State} from 'react-native-gesture-handler';
import {FIXED_STATUSBAR_HEIGHT} from '@/Constants';
import Comment from '../Comment';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  useGetMarkCommentQuery,
  useSetMarkCommentMutation,
} from '@/Redux/api/comment';
import Spinner from 'react-native-loading-spinner-overlay';

const CommentListScreen = ({postItem}: {postItem: any}) => {
  const {
    data: getMarkComment,
    isLoading,
    isSuccess,
    refetch,
  } = useGetMarkCommentQuery({id: postItem.id, index: '0', count: '100'});
  const [setMarkComment, {isLoading: isLoadingSet}] =
    useSetMarkCommentMutation();
  const [data, setData] = useState([]);

  useEffect(() => {
    if (isSuccess) {
      // console.log('getMarkComment', getMarkComment?.data);
      // setData(getMarkComment?.data);
      setComments(getMarkComment?.data);
    }
  }, [getMarkComment, isSuccess]);

  const [comment, setComment] = useState();
  const [comments, setComments] = useState();
  const [enable, setEnable] = useState(false);
  const [containerTop, setContainerTop] = useState(0);
  const [ref, setRef] = useState(React.createRef());
  const [scrollRef, setScrollRef] = useState(React.createRef());
  const [_containerTop, set_containerTop] = useState(new Animated.Value(0));
  const [isFelt, setIsFelt] = useState('1');
  const navigation = useNavigation<ScreenNavigationProp>();

  const ref_input = useRef<TextInput | null>(null);

  const [markIdSelect, setMarkIdSelect] = useState('0');

  const Focus = (id: string) => {
    setMarkIdSelect(id);
    ref_input.current?.focus();
  };

  const _onScrollDown = (event: {nativeEvent: {translationY: any}}) => {
    if (!enable) return;
    const {translationY} = event.nativeEvent;
    _containerTop.setValue(translationY);
  };

  // const _onScroll = ({ nativeEvent }) => {
  //   if (nativeEvent.contentOffset.y <= 0 && !enable) {
  //     setEnable(true)
  //   }
  //   if (nativeEvent.contentOffset.y > 0 && enable) {
  //     setEnable(false)
  //   }
  // }
  // const _onHandlerStateChangeHandler = ({ nativeEvent }) => {
  //   if (!enable) return;
  //   const { translationY, state } = nativeEvent;
  //   if (state === State.END) {
  //     if (translationY <= 500) {
  //       Animated.timing(_containerTop, {
  //         toValue: 0,
  //         duration: 200,
  //         useNativeDriver: false
  //       }).start()
  //     } else {
  //       navigation.goBack()
  //     }
  //   }

  // }

  const updateText = (text: string) => {
    // Call API tạo Mark vs Type là giá trị isTrust   content là text

    // Nếu trường markIdSelect === '0'  thì là tạo Mark mới
    // Nếu trường markIdSelect !==  '0'  thì là comment cho Mark với id là markIdSelect

    // Ở đây có case lỗi nhỏ mà lười chưa xử lý dc
    if (markIdSelect === '0') {
      setMarkComment({
        content: text,
        id: postItem.id,
        type: isFelt,
        index: '0',
        count: '100',
      })
        .unwrap()
        .then(res => {
          setMarkIdSelect('0');
          ref_input.current?.clear();

          setComments(res.data);
        })
        .catch(err => Alert.alert('Lỗi', JSON.parse(err).message));
    } else {
      setMarkComment({
        content: text,
        id: postItem.id,
        index: '0',
        count: '100',
        mark_id: markIdSelect,
      })
        .unwrap()
        .then(res => {
          setComments(res.data);
          ref_input.current?.clear();

          setMarkIdSelect('0');
        })
        .catch(err => Alert.alert('Lỗi', JSON.parse(err).message));
    }
  };

  const onPressBtnBackHandler = () => {
    navigation.goBack();
  };

  return (
    <View>
      <Spinner visible={isLoading || isLoadingSet} />
      <View style={styles.backdrop}></View>
      <KeyboardAvoidingView
        behavior="height"
        enabled
        style={{...styles.keyboardAvoidingContainer}}>
        <Animated.View style={{...styles.wrapper, top: containerTop}}>
          <View style={styles.navigationBar}>
            <View style={styles.navigationBarLeft}>
              <TouchableOpacity
                style={{
                  marginRight: 2,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <AntDesign name={'like1'} size={20} color="#318bfb" />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <AntDesign name={'dislike1'} size={20} color="#318bfb" />
              </TouchableOpacity>
              <Text style={styles.textNavigationBar}>{postItem?.feel}</Text>
              <MaterialCommunityIcons
                name="chevron-right"
                size={20}
                color="#000"></MaterialCommunityIcons>
            </View>
          </View>
          <ScrollView
            // ref={ref}
            // waitFor={enable ? ref : scrollRef}
            scrollEventThrottle={40}
            // onScroll={_onScroll.bind(this)}
            style={styles.container}>
            {comments?.map((comment, index) => (
              <View key={comment.mark_content.concat(comment.comments.length)}>
                <Comment comment={comment} focus={Focus}></Comment>
              </View>
            ))}
          </ScrollView>
          <View style={styles.commentInputWrapper}>
            <TouchableOpacity style={styles.cameraIconWrapper}>
              <FontAwesome5Icon name="camera" size={20}></FontAwesome5Icon>
            </TouchableOpacity>
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
                onPress={() => setIsFelt('1')}>
                <AntDesign
                  name={isFelt === '1' ? 'like1' : 'like2'}
                  size={20}
                  color="#424040"
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.iconItem}
                onPress={() => setIsFelt('0')}>
                <AntDesign
                  name={isFelt === '0' ? 'dislike1' : 'dislike2'}
                  size={20}
                  color="#424040"
                />
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
      </KeyboardAvoidingView>
    </View>
  );
};

const STACK_NAVBAR_HEIGHT = 48;
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

const styles = StyleSheet.create({
  keyboardAvoidingContainer: {
    height: screenHeight,
    zIndex: 2,
  },
  wrapper: {
    position: 'absolute',
    left: 0,
    width: '100%',
    height: '100%',
  },
  backdrop: {
    backgroundColor: 'rgba(0,0,0,0)',
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: 1,
  },
  container: {
    padding: 10,
    marginBottom: FIXED_STATUSBAR_HEIGHT + STACK_NAVBAR_HEIGHT + 50,
    backgroundColor: '#ffffff',
  },
  commentInputWrapper: {
    borderWidth: 1,
    borderBottomWidth: 0,
    borderColor: '#ddd',
    position: 'absolute',
    bottom: FIXED_STATUSBAR_HEIGHT + STACK_NAVBAR_HEIGHT,
    left: 0,
    paddingHorizontal: 15,
    height: 50,
    backgroundColor: '#fff',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconItem: {
    width: 30,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraIconWrapper: {
    backgroundColor: '#ddd',
    borderRadius: 50,
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInputWrapper: {
    height: 40,
    borderTopLeftRadius: 48,
    borderBottomLeftRadius: 48,
    backgroundColor: '#ddd',
    marginLeft: 10,
    width: screenWidth - 40 - 80 - 30 - 10,
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
  navigationStackBar: {
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  btnBack: {
    zIndex: 99,
  },
  stackBarTitle: {
    position: 'absolute',
    width: screenWidth,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    height: 40,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
  navigationBar: {
    paddingTop: 12,
    flexDirection: 'row',
    height: 54,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
  },
  navigationBarLeft: {
    flexDirection: 'row',
    paddingLeft: 12,
  },
  textNavigationBar: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginLeft: 5,
  },
});

export default CommentListScreen;
