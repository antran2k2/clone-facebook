import React, {
  MutableRefObject,
  useRef,
  useState,
  useEffect,
  useCallback,
} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Dimensions,
  Alert,
  Image,
  Button,
  SafeAreaView,
  StatusBar,
  ImageBackground,
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

const EditDetailScreen = () => {
  const {id} = useAppSelector(state => state.info);
  const [user, setUser] = useState();
  const {data, isLoading, isSuccess, refetch} = useGetUserInfoQuery({
    user_id: id || '-1',
  });
  const [setUserInfo] = useSetUserInfoMutation();
  const navigation = useNavigation<ScreenNavigationProp>();
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [checked, setChecked] = useState(false);

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
    // Kiểm tra xem address, city, và country có giá trị không trống không

    // Tạo đối tượng FormData và thêm các giá trị
    const formData = new FormData();
    formData.append('address', address);
    formData.append('city', city);
    formData.append('country', country);

    // Gọi API setUserInfo với giá trị mới
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
          <Text style={styles.textNavigationBar}>Chỉnh sửa chi tiết</Text>
        </View>
        <TouchableOpacity style={styles.btnPost} onPress={handleBack}>
          <Text style={styles.btnText}>Hủy</Text>
        </TouchableOpacity>
      </View>

      <ScrollView>
        <View style={styles.detail}>
          <View style={styles.detailTitleWrapper}>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>
              Chỉnh sửa phần giới thiệu
            </Text>
          </View>

          <View style={{marginVertical: 5}}>
            <Text style={styles.featuredTxt}>
              Chi tiết bạn chọn sẽ hiển thị công khai.
            </Text>
          </View>
        </View>
        <View style={styles.detail}>
          <View style={styles.detailTitleWrapper}>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>Danh xưng</Text>
          </View>

          <TouchableOpacity style={styles.btnTryIt}>
            <Text style={{color: 'black', fontSize: 16, fontWeight: '500'}}>
              Thêm danh xưng vào trang cá nhân
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.detail}>
          <View style={styles.detailTitleWrapper}>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>Quê quán</Text>
          </View>
          <TextInput
            placeholder="Thêm địa chỉ hiện tại của bạn"
            defaultValue={user?.address ? user.address : undefined}
            multiline={true}
            textAlignVertical="top"
            onChangeText={newText => setAddress(newText)}
            style={{
              height: 40,
              margin: 15,
              padding: 10,
              borderColor: 'gray',
              borderWidth: 1,
              borderRadius: 5,
            }}></TextInput>
          <TextInput
            placeholder="Thêm tỉnh/Thành Phố hiện tại"
            defaultValue={user?.city ? user.city : undefined}
            multiline={true}
            textAlignVertical="top"
            onChangeText={newText => setCity(newText)}
            style={{
              height: 40,
              margin: 15,
              padding: 10,
              borderColor: 'gray',
              borderWidth: 1,
              borderRadius: 5,
            }}></TextInput>
          <TextInput
            placeholder="Thêm thông tin đất nước"
            defaultValue={user?.country ? user.country : undefined}
            multiline={true}
            textAlignVertical="top"
            onChangeText={newText => setCountry(newText)}
            style={{
              height: 40,
              margin: 15,
              padding: 10,
              borderColor: 'gray',
              borderWidth: 1,
              borderRadius: 5,
            }}></TextInput>
        </View>
        <View style={styles.detail}>
          <View style={styles.detailTitleWrapper}>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>Học vấn</Text>
          </View>

          <TouchableOpacity style={styles.btnTryIt}>
            <Text style={{color: 'black', fontSize: 16, fontWeight: '500'}}>
              Thêm trường trung học
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnTryIt}>
            <Text style={{color: 'black', fontSize: 16, fontWeight: '500'}}>
              Thêm trường cao đẳng/đại học
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.detail}>
          <View style={styles.detailTitleWrapper}>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>Công việc</Text>
          </View>

          <TouchableOpacity style={styles.btnTryIt}>
            <Text style={{color: 'black', fontSize: 16, fontWeight: '500'}}>
              Thêm nghề nghiệp
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.detail}>
          <View style={styles.detailTitleWrapper}>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>Mối quan hệ</Text>
          </View>

          <TouchableOpacity style={styles.btnTryIt}>
            <Text style={{color: 'black', fontSize: 16, fontWeight: '500'}}>
              Thêm tình trạng mối quan hệ
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{paddingVertical: 15, paddingHorizontal: 15}}>
          <TouchableOpacity style={styles.btnSave} onPress={handlePost}>
            <Text style={{color: 'white', fontSize: 16, fontWeight: '500'}}>
              Lưu
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{...styles.detail, ...styles.lastDetail, marginBottom: 60}}
        />
      </ScrollView>
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
  detailsWrapper: {
    paddingHorizontal: 15,
  },
  detail: {
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    paddingVertical: 15,
    marginHorizontal: 15,
  },
  detailTitleWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  wrapperEle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  detailTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  featuredTxt: {
    color: 'grey',
    fontSize: 17,
  },
  btnOption: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 55,
    marginBottom: 20,
  },
  btnTryIt: {
    height: 35,
    width: '100%',
    backgroundColor: '#ddd',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 5,
    marginVertical: 5,
  },
  btnSave: {
    height: 35,
    width: '100%',
    backgroundColor: '#318bfb',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 5,
  },
  lastDetail: {
    marginBottom: 30,
    borderBottomWidth: 0,
  },
});

export default EditDetailScreen;
