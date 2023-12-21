import React, {useState, useCallback, useEffect} from 'react';
import {
  View,
  TextInput,
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  Alert,
} from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import {useAddPostMutation} from '@/Redux/api/post';
import {AddPostDTO} from '@/types/post.type';
import {useAppSelector} from '@/Redux/store';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import axios from 'axios';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const screenWidth = Dimensions.get('window').width;
import Modal from 'react-native-modal';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {ScreenNavigationProp} from '@/Routes/Stack';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useFocusEffect} from '@react-navigation/native';
import {useGetUserInfoQuery} from '@/Redux/api/profile';

const AddPostScreen = () => {
  const {avatar, id: userId, username} = useAppSelector(state => state.info);

  const [user, setUser] = useState();
  const {
    data,
    isLoading: isGetinfo,
    isSuccess,
    refetch,
  } = useGetUserInfoQuery({
    user_id: userId || '-1',
  });
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (isSuccess) {
      setUser(data.data);
    }
  }, [isSuccess, data]);
  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch]),
  );

  const [postText, setPostText] = useState('');
  const [response, setResponse] = React.useState<any>(null);
  const [addPost, {isLoading}] = useAddPostMutation();
  const [textValue, setTextValue] = useState('');
  const navigation = useNavigation<ScreenNavigationProp>();
  const handlePost = () => {
    const formData = new FormData();

    response.assets.forEach(asset => {
      const uri = asset.uri;
      const name = asset.fileName;
      const type = asset.type;
      // Thêm thông tin vào mảng arr
      if (type == 'video/mp4') {
        formData.append('video', {uri, name, type});
      } else {
        formData.append('image', {uri, name, type});
      }
    });

    formData.append('described', postText);
    formData.append('status', 'happy');
    formData.append('auto_accept', '1');

    addPost(formData)
      .unwrap()
      .then(res => navigation.goBack())
      .catch(err => Alert.alert('Lỗi', err.message));
  };

  const onButtonPress = React.useCallback((type, options) => {
    if (type === 'capture') {
      ImagePicker.launchCamera(options, setResponse);
    } else {
      ImagePicker.launchImageLibrary(options, setResponse);
    }
  }, []);

  const [isModalVisible1, setModalVisible1] = useState(false);
  const toggleModal1 = () => {
    setModalVisible1(!isModalVisible1);
  };

  const handleBack = () => {};

  return (
    <View style={styles.container}>
      <View style={styles.navigationBar}>
        <View style={styles.navigationBarLeft}>
          <TouchableOpacity onPress={toggleModal1} style={styles.btnBack}>
            <FontAwesome5Icon name="arrow-left" color="#000" size={20} />
          </TouchableOpacity>
          <Text style={styles.textNavigationBar}>Tạo bài viết</Text>
        </View>
        <TouchableOpacity
          disabled={postText.length === 0}
          style={postText.length === 0 ? styles.btnPost1 : styles.btnPost}
          onPress={handlePost}>
          <Text style={styles.btnText}>Đăng</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.imageRow}>
        <Image
          source={
            user?.avatar
              ? {uri: user.avatar}
              : require('@/Assets/Images/Avatar.png')
          }
          resizeMode="contain"
          style={styles.imageAvt}
        />
        <View>
          <Text style={styles.name}>{user?.username}</Text>
          <View style={{flexDirection: 'row', gap: 2}}>
            <TouchableOpacity
              style={{
                borderRadius: 8,
                borderWidth: 1,
                borderColor: '#ddd',
                paddingHorizontal: 6,
                paddingVertical: 2,
                width: 70,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <MaterialCommunityIcons
                name="account-multiple-outline"
                size={12}
                color="#000"></MaterialCommunityIcons>
              <Text
                style={{
                  color: '#000',
                  fontWeight: '400',
                  fontSize: 12,
                  marginLeft: 2,
                }}>
                Bạn bè
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                borderRadius: 8,
                borderWidth: 1,
                borderColor: '#ddd',
                paddingHorizontal: 6,
                paddingVertical: 2,
                width: 70,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <MaterialCommunityIcons
                name="image-album"
                size={12}
                color="#000"></MaterialCommunityIcons>
              <Text
                style={{
                  color: '#000',
                  fontWeight: '400',
                  fontSize: 12,
                  marginLeft: 2,
                }}>
                Album
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <TextInput
        placeholder="Bạn đang nghĩ gì?"
        editable
        multiline
        value={postText}
        onChange={e => setPostText(e.nativeEvent.text)}
        numberOfLines={4}
        style={styles.inputPost}
      />
      <View style={styles.containerImg}>
        {response?.assets &&
          response?.assets.map(({uri}: {uri: string}) => (
            <View key={uri} style={styles.imageContainer}>
              <Image
                resizeMode="cover"
                resizeMethod="scale"
                style={styles.image}
                source={{uri: uri}}
              />
            </View>
          ))}
      </View>
      {/* <View style={styles.group3Row}>
        <View style={styles.group3}>
          <TouchableOpacity
            style={styles.button2}
            onPress={() =>
              onButtonPress('library', {
                selectionLimit: 4,
                mediaType: 'photo',
                includeBase64: false,
                includeExtra: true,
              })
            }>
            <View style={styles.iconRow}>
              <EntypoIcon name="images" style={styles.icon} />
              <Text style={styles.images}>Images</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.group4}>
          <TouchableOpacity
            style={styles.button3}
            onPress={() =>
              onButtonPress('capture', {
                selectionLimit: 1,
                mediaType: 'video',
                formatAsMp4: true,
                includeBase64: false,
                includeExtra: true,
              })
            }>
            <View style={styles.icon2Row}>
              <EntypoIcon name="video" style={styles.icon2} />
              <Text style={styles.video}>Video</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View> */}
      <View>
        <TouchableOpacity
          style={styles.postOptionItemWrapper}
          onPress={() =>
            onButtonPress('library', {
              selectionLimit: 4,
              mediaType: 'photo',
              includeBase64: false,
              includeExtra: true,
            })
          }>
          <View style={styles.postOptionItem}>
            <View style={styles.optionIcon}>
              <MaterialCommunityIcons
                name="image"
                size={26}
                color="#000"></MaterialCommunityIcons>
            </View>
            <View>
              <Text
                style={{
                  fontSize: 17,
                  fontWeight: '600',
                  color: '#000',
                }}>
                Ảnh
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.postOptionItemWrapper}
          onPress={() =>
            onButtonPress('capture', {
              selectionLimit: 1,
              mediaType: 'photo',
              includeBase64: false,
              includeExtra: true,
            })
          }>
          <View style={styles.postOptionItem}>
            <View style={styles.optionIcon}>
              <MaterialCommunityIcons
                name="camera-image"
                size={26}
                color="#000"></MaterialCommunityIcons>
            </View>
            <View>
              <Text
                style={{
                  fontSize: 17,
                  fontWeight: '600',
                  color: '#000',
                }}>
                Camera
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.postOptionItemWrapper}
          onPress={() =>
            onButtonPress('capture', {
              selectionLimit: 1,
              mediaType: 'video',
              formatAsMp4: true,
              includeBase64: false,
              includeExtra: true,
            })
          }>
          <View style={styles.postOptionItem}>
            <View style={styles.optionIcon}>
              <MaterialCommunityIcons
                name="video-box"
                size={26}
                color="#000"></MaterialCommunityIcons>
            </View>
            <View>
              <Text
                style={{
                  fontSize: 17,
                  fontWeight: '600',
                  color: '#000',
                }}>
                Video
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.postOptionItemWrapper}
          // onPress={() => { navigation.navigate("EditPublicInfo") }}
        >
          <View style={styles.postOptionItem}>
            <View style={styles.optionIcon}>
              <MaterialCommunityIcons
                name="account-multiple-plus"
                size={26}
                color="#000"></MaterialCommunityIcons>
            </View>
            <View>
              <Text
                style={{
                  fontSize: 17,
                  fontWeight: '600',
                  color: '#000',
                }}>
                Gắn thẻ bạn bè
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.postOptionItemWrapper}
          // onPress={() => { navigation.navigate("EditPublicInfo") }}
        >
          <View style={styles.postOptionItem}>
            <View style={styles.optionIcon}>
              <MaterialCommunityIcons
                name="emoticon-outline"
                size={26}
                color="#000"></MaterialCommunityIcons>
            </View>
            <View>
              <Text
                style={{
                  fontSize: 17,
                  fontWeight: '600',
                  color: '#000',
                }}>
                Cảm xúc/Hoạt động
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
      {/* Model Report */}
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
        <View
          style={{
            paddingTop: 16,
            paddingBottom: 10,
            backgroundColor: '#fff',
          }}>
          <TouchableOpacity
            style={styles.postOptionItemWrapper}
            onPress={() => navigation.goBack()}>
            <View style={styles.postOptionItem}>
              <View style={styles.optionIcon}>
                <MaterialCommunityIcons
                  name="content-save"
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
                  Lưu bản nháp
                </Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.postOptionItemWrapper}
            onPress={() => navigation.goBack()}>
            <View style={styles.postOptionItem}>
              <View style={styles.optionIcon}>
                <MaterialCommunityIcons
                  name="delete"
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
                  Bỏ bài viết
                </Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.postOptionItemWrapper}
            onPress={toggleModal1}>
            <View style={styles.postOptionItem}>
              <View style={styles.optionIcon}>
                <MaterialCommunityIcons
                  name="check"
                  size={26}
                  color="#318bfb"></MaterialCommunityIcons>
              </View>
              <View>
                <Text
                  style={{
                    fontSize: 17,
                    fontWeight: '400',
                    color: '#318bfb',
                  }}>
                  Tiếp tục chỉnh sửa
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  containerImg: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    // justifyContent: 'space-between',
    padding: 8,
  },
  imageContainer: {
    width: screenWidth / 4 - 12, // Đảm bảo mỗi ảnh chiếm 1/4 chiều rộng màn hình và có khoảng cách 12 giữa chúng
    marginBottom: 12,
    padding: 4,
  },
  image: {
    width: '100%',
    height: 100, // Điều chỉnh chiều cao theo nhu cầu của bạn
    borderRadius: 8,
  },
  container: {
    flex: 1,
  },
  imageAvt: {
    width: 48,
    height: 48,
    borderWidth: 1,
    borderRadius: 100,
    marginRight: 2,
  },
  name: {
    fontFamily: 'roboto-regular',
    color: '#121212',
    marginLeft: 15,
    marginTop: 11,
  },
  group: {
    width: 62,
    height: 28,
    marginLeft: 104,
    marginTop: 5,
  },
  button: {
    width: 62,
    height: 40,
    backgroundColor: '#318bfb',
    // backgroundColor: '#385898',
    borderWidth: 0,
    borderColor: '#000000',
    borderRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dang: {
    color: '#fff',
  },
  imageRow: {
    height: 40,
    flexDirection: 'row',
    marginTop: 10,
    marginLeft: 16,
    marginRight: 27,
  },
  inputPost: {
    backgroundColor: '#E6E6E6',
    color: '#121212',
    // height: 150,
    marginTop: 27,
    margin: 16,
  },
  loremIpsum: {
    color: '#121212',
    marginTop: 109,
    marginLeft: 109,
  },
  group3: {
    width: 137,
    height: 35,
  },
  button2: {
    width: 137,
    height: 35,
    backgroundColor: '#E6E6E6',
    flexDirection: 'row',
  },
  icon: {
    color: 'rgba(128,128,128,1)',
    fontSize: 22,
    height: 23,
    width: 22,
  },
  images: {
    color: '#121212',
    height: 13,
    width: 63,
    marginLeft: 18,
    marginTop: 5,
  },
  iconRow: {
    height: 23,
    flexDirection: 'row',
    flex: 1,
    marginRight: 24,
    marginLeft: 10,
    marginTop: 6,
  },
  group4: {
    width: 137,
    height: 35,
    marginLeft: 56,
  },
  button3: {
    width: 137,
    height: 35,
    backgroundColor: '#E6E6E6',
    flexDirection: 'row',
  },
  icon2: {
    color: 'rgba(128,128,128,1)',
    fontSize: 26,
    height: 28,
    width: 26,
  },
  video: {
    color: '#121212',
    height: 15,
    width: 73,

    marginLeft: 12,
    marginTop: 6,
  },
  icon2Row: {
    height: 28,
    flexDirection: 'row',
    flex: 1,
    marginRight: 16,
    marginLeft: 10,
    marginTop: 4,
  },
  group3Row: {
    height: 35,
    flexDirection: 'row',
    marginTop: 51,
    marginLeft: 10,
    marginRight: 20,
  },
  postOptionItemWrapper: {
    paddingBottom: 14,
    paddingTop: 12,
    paddingLeft: 20,
    paddingRight: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  postOptionItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionIcon: {
    width: 35,
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
    backgroundColor: '#fff',
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
  btnPost: {
    backgroundColor: '#1877F2',
    borderRadius: 8,
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 5,
    marginRight: 12,
  },
  btnPost1: {
    backgroundColor: '#ddd',
    borderRadius: 8,
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 5,
    marginRight: 12,
  },
  btnText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default AddPostScreen;
