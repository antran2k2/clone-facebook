import React, {
  MutableRefObject,
  useRef,
  useState,
  useCallback,
  useEffect,
} from 'react';
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
  Alert,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  ScreenNavigationProp,
  ScreenFullFriendProp,
  ScreenPreViewImageProp,
} from '@/Routes/Stack';
import {TFriend, TUserFriend, TUserInfo} from '@/types/user.type';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {useSetUserInfoMutation, useGetUserInfoQuery} from '@/Redux/api/profile';
import {useAppSelector} from '@/Redux/store';
import {useFocusEffect} from '@react-navigation/native';
//Giá trị User lấy trong Redux hoặc call API getUserInfo

const EditLinkScreen = () => {
  const {id} = useAppSelector(state => state.info);
  const [user, setUser] = useState();
  const {data, isLoading, isSuccess, refetch} = useGetUserInfoQuery({
    user_id: id || '-1',
  });
  const [setUserInfo] = useSetUserInfoMutation();
  const navigation = useNavigation<ScreenNavigationProp>();
  const [link, setLink] = useState('');

  const handleBack = () => {
    navigation.goBack();
  };
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
  const handlePost = () => {
    const formData = new FormData();
    formData.append('link', link);
    //Gọi API SetUserInfo với giá trị description mới
    setUserInfo(formData)
      .unwrap()
      .then(res => {
        navigation.goBack();
        console.log(res);
      })
      .catch(err => {
        Alert.alert('Lỗi', 'Có lỗi xảy ra, vui lòng thử lại sau');
      });
  };

  return (
    <View style={styles.parentContainer}>
      <View style={styles.navigationBar}>
        <View style={styles.navigationBarLeft}>
          <TouchableOpacity onPress={handleBack} style={styles.btnBack}>
            <FontAwesome5Icon name="arrow-left" color="#000" size={20} />
          </TouchableOpacity>
          <Text style={styles.textNavigationBar}>Chỉnh sửa liên kết</Text>
        </View>
        <TouchableOpacity style={styles.btnPost} onPress={() => handlePost()}>
          <Text style={styles.btnText}>Lưu</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          marginTop: 20,
          marginHorizontal: 16,
        }}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Image
            style={{
              marginRight: 10,
              borderRadius: 50,
              width: 50,
              height: 50,
            }}
            source={{
              uri: user?.avatar,
            }}
          />
          <View>
            <Text
              style={{
                fontSize: 20,
                fontWeight: '600',
              }}>
              {user?.username}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              {/* <FontAwesomeIcon icon={faGlobeAsia} size={16} style={{ marginHorizontal: 5 }} /> */}
              <Text>Public</Text>
            </View>
          </View>
        </View>
      </View>
      <TextInput
        placeholder="Thêm thông tin liên kết của bạn."
        multiline={true}
        textAlignVertical="top"
        onChangeText={newText => setLink(newText)}
        style={{
          height: 80,
          margin: 15,
          padding: 10,
          borderColor: 'gray',
          borderWidth: 1,
          borderRadius: 5,
        }}></TextInput>
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
  btnText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
  },
  avatar: {
    width: windowWidth,
    height: 400,
    marginVertical: 15,
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
    width: 150,
    marginRight: 13,
  },
});

export default EditLinkScreen;
