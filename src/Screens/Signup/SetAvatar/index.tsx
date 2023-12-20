import React, {MutableRefObject, useRef, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Dimensions,
  Image,
  Button,
  SafeAreaView,
  StatusBar,
  ImageBackground,
  Platform,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  ScreenNavigationProp,
  ScreenFullFriendProp,
  ScreenPreViewImageProp,
} from '@/Routes/Stack';
import {TFriend, TUserFriend, TUserInfo} from '@/types/user.type';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {SCREEN_WIDTH, SCREEN_HEIGHT, STATUSBAR_HEIGHT} from '@/Constants';
import Modal from 'react-native-modal';
import * as ImagePicker from 'react-native-image-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useChangeInfoAfterSignupMutation} from '@/Redux/api/profile';
import {useAppSelector} from '@/Redux/store';
/* toggle includeExtra */
const includeExtra = true;

const SetAvatarScreen = () => {
  const navigation = useNavigation<ScreenNavigationProp>();
  const {ho, ten} = useAppSelector(state => state.signUpInfo.data);
  const [changeInfoAfterSignup] = useChangeInfoAfterSignupMutation();
  const [image, setImage] = useState<any>();
  const [link, setLink] = useState(
    'https://inkythuatso.com/uploads/thumbnails/800/2023/03/6-anh-dai-dien-trang-inkythuatso-03-15-26-36.jpg',
  );

  const handleCamera = () => {
    ImagePicker.launchCamera(actions[0].options, response => {
      if (response.assets && response.assets[0].uri) {
        setLink(response.assets[0].uri);
        setImage(response.assets[0]);
      }
    });
  };

  const handleLibrary = () => {
    ImagePicker.launchImageLibrary(actions[1].options, response => {
      if (response.assets && response.assets[0].uri) {
        setLink(response.assets[0].uri);
        setImage(response.assets[0]);
      }
    });
  };

  const handlePost = () => {
    const formData = new FormData();
    const {uri, type, fileName: name} = image;

    formData.append('avatar', {uri, name, type});
    formData.append('username', `${ho} ${ten}`);
    // Gọi API change_profile_after_signup
    // Giá trị UserName lưu trong Redux (Gộp First Name và last Name)
    //Convert File ảnh rồi update

    changeInfoAfterSignup(formData)
      .unwrap()
      .then(res =>
        navigation.reset({
          index: 0,
          routes: [{name: 'Main'}],
        }),
      );
    // navigation.navigate("Home")
  };

  return (
    <View style={styles.parentContainer}>
      <View style={styles.navigationBar}>
        <View style={styles.navigationBarLeft}>
          <Text style={styles.textNavigationBar}>
            Cập nhật ảnh đại diện của bạn
          </Text>
        </View>
      </View>
      <View style={styles.container}>
        <View
          style={{
            backgroundColor: '#ddd',
            marginBottom: 20,
            marginTop: 20,
          }}>
          <Image
            style={styles.avatar}
            source={{
              uri: link,
            }}></Image>
        </View>
        <View
          style={{
            marginTop: 15,
            flexDirection: 'row',
            marginHorizontal: 15,
          }}>
          <TouchableOpacity style={styles.btnTemporary} onPress={handleCamera}>
            <MaterialCommunityIcons
              name="camera"
              size={20}></MaterialCommunityIcons>
            <Text
              style={{
                fontSize: 16,
                fontWeight: '500',
                color: 'black',
                marginLeft: 5,
              }}>
              Chụp ảnh
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btnAddFrame} onPress={handleLibrary}>
            <MaterialCommunityIcons
              name="upload"
              size={20}></MaterialCommunityIcons>
            <Text
              style={{
                fontSize: 16,
                fontWeight: '500',
                color: 'black',
                marginLeft: 5,
              }}>
              Tải ảnh lên từ thư viện
            </Text>
          </TouchableOpacity>
        </View>
        {link !==
        'https://inkythuatso.com/uploads/thumbnails/800/2023/03/6-anh-dai-dien-trang-inkythuatso-03-15-26-36.jpg' ? (
          <TouchableOpacity
            style={{...styles.btn, backgroundColor: '#1877F2'}}
            onPress={handlePost}>
            <Text style={{color: '#000', fontSize: 18}}>Hoàn thành</Text>
          </TouchableOpacity>
        ) : (
          <View></View>
        )}
      </View>
    </View>
  );
};

const windowHeight = Math.round(Dimensions.get('window').height);
const windowWidth = Math.round(Dimensions.get('window').width);

const styles = StyleSheet.create({
  parentContainer: {
    backgroundColor: 'white',
    flex: 1,
  },
  container: {},
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
    marginLeft: 20,
  },
  btn: {
    height: 50,
    width: 200,
    marginLeft: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    backgroundColor: '#1877f2',
    marginTop: 30,
  },
  btnPost: {
    backgroundColor: '#1877F2',
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
  avatar: {
    height: 180,
    width: 180,
    borderRadius: 2000,
    borderColor: '#fff',
    borderWidth: 5,
    marginLeft: '28%',
    marginBottom: 8,
    marginTop: 8,
  },
  btnTemporary: {
    backgroundColor: '#E4E4E4',
    borderRadius: 5,
    height: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 150,
    marginRight: 13,
  },
  btnAddFrame: {
    backgroundColor: '#E4E4E4',
    borderRadius: 5,
    height: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 200,
    marginRight: 13,
  },
});

interface Action {
  title: string;
  type: 'capture' | 'library';
  options: ImagePicker.CameraOptions | ImagePicker.ImageLibraryOptions;
}

const actions: Action[] = [
  {
    title: 'Chụp Ảnh',
    type: 'capture',
    options: {
      saveToPhotos: true,
      mediaType: 'photo',
      includeBase64: false,
      includeExtra,
    },
  },
  {
    title: 'Chọn Ảnh từ thư viện',
    type: 'library',
    options: {
      selectionLimit: 0,
      mediaType: 'photo',
      includeBase64: false,
      includeExtra,
    },
  },
  {
    title: 'Quay Video',
    type: 'capture',
    options: {
      saveToPhotos: true,
      formatAsMp4: true,
      mediaType: 'video',
      includeExtra,
    },
  },
  {
    title: 'Chọn Video từ thư viện',
    type: 'library',
    options: {
      selectionLimit: 0,
      mediaType: 'video',
      formatAsMp4: true,
      includeExtra,
    },
  },
  {
    title: 'Chọn ảnh hoặc video',
    type: 'library',
    options: {
      selectionLimit: 0,
      mediaType: 'mixed',
      includeExtra,
    },
  },
];

if (Platform.OS === 'ios') {
  actions.push({
    title: 'Take Image or Video\n(mixed)',
    type: 'capture',
    options: {
      saveToPhotos: true,
      mediaType: 'mixed',
      includeExtra,
      presentationStyle: 'fullScreen',
    },
  });
}

export default SetAvatarScreen;
