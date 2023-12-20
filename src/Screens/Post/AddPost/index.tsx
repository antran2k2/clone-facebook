import React, {useState} from 'react';
import {
  View,
  TextInput,
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import {useAddPostMutation} from '@/Redux/api/post';
import {AddPostDTO} from '@/types/post.type';
import {useAppSelector} from '@/Redux/store';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import axios from 'axios';
const screenWidth = Dimensions.get('window').width;

const AddPostScreen = () => {
  const {avatar, id: userId, username} = useAppSelector(state => state.info);

  const [postText, setPostText] = useState('');
  const [response, setResponse] = React.useState<any>(null);
  const [addPost, {isLoading}] = useAddPostMutation();
  const [textValue, setTextValue] = useState('');
  const handlePost = () => {
    const formData = new FormData();
    // formData.append('image', response.assets);

    // Duyệt qua mảng assets và gán thông tin vào mảng arr
    response.assets.forEach(asset => {
      const uri = asset.uri;
      const name = asset.fileName;
      const type = asset.type;

      // Thêm thông tin vào mảng arr
      formData.append('image', {uri, name, type});
    });
    // console.log('mảng ảnh', response);

    formData.append('described', 'test123 image');
    formData.append('status', 'happy');
    formData.append('auto_accept', '1');
    // addPost(formData)
    //   .unwrap()
    //   .then(res => console.log(res.data));
    console.log('Post:', formData);

    axios
      .post('https://it4788.catan.io.vn/add_post', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(res => console.log(res.data))
      .catch(err => console.log(err.request._response));
  };
  const onButtonPress = React.useCallback((type, options) => {
    if (type === 'capture') {
      ImagePicker.launchCamera(options, setResponse);
    } else {
      ImagePicker.launchImageLibrary(options, setResponse);
    }
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.imageRow}>
        <Image
          source={require('@/Assets/Images/Avatar.png')}
          resizeMode="contain"
          style={styles.imageAvt}
        />
        <Text style={styles.name}>Trần Viết An</Text>
        <View style={styles.group}>
          <TouchableOpacity
            // onPress={() => props.navigation.goBack()}
            onPress={handlePost}
            style={styles.button}>
            <Text style={styles.dang}>Đăng</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TextInput
        placeholder="Bạn đang nghĩ gì?"
        editable
        multiline
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
      <View style={styles.group3Row}>
        <View style={styles.group3}>
          <TouchableOpacity
            style={styles.button2}
            onPress={() =>
              onButtonPress('library', {
                selectionLimit: 0,
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
                selectionLimit: 0,
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
      </View>
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
    width: 40,
    height: 40,
    borderWidth: 1,
    borderRadius: 100,
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
    marginLeft: 124,
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
});

export default AddPostScreen;
