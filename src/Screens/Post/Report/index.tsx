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
  Clipboard,
  Alert,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {ScreenNavigationProp, ScreenReportProp} from '@/Routes/Stack';
import {TFriend, TUserFriend, TUserInfo} from '@/types/user.type';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useReportPostMutation} from '@/Redux/api/post';
// import Clipboard from '@react-native-clipboard/clipboard';

const ReportScreen = () => {
  const route = useRoute<ScreenReportProp>();
  const navigation = useNavigation<ScreenNavigationProp>();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const [reportPost, {isLoading: isReportLoading}] = useReportPostMutation();

  // -------------------------------------Lấy thông số---------------------
  // console.log(route.params?.authorId);
  // console.log(route.params?.authorName);
  // console.log(route.params?.postId);
  // ------------------------------------------------------------------------

  const handleBack = () => {
    navigation.goBack();
  };
  const handlePost = () => {
    //Call API báo cáo
    reportPost({
      id: route.params?.postId,
      subject: title,
      details: description,
    })
      .unwrap()
      .then(res => {
        console.log(res);

        navigation.goBack();
      })
      .catch(err => {
        Alert.alert('Lỗi', JSON.parse(err).message);
      });
  };

  return (
    <View style={styles.parentContainer}>
      <View style={styles.navigationBar}>
        <View style={styles.navigationBarLeft}>
          <TouchableOpacity onPress={handleBack} style={styles.btnBack}>
            <FontAwesome5Icon name="arrow-left" color="#000" size={20} />
          </TouchableOpacity>
          <Text style={styles.textNavigationBar}>Báo cáo</Text>
        </View>
      </View>
      <ScrollView>
        <View style={{marginLeft: 10, marginBottom: 10}}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: '700',
              color: '#000',
              marginBottom: 8,
              marginTop: 8,
            }}>
            Vui lòng chọn vấn đề để tiếp tục
          </Text>
          <Text style={{fontSize: 15, paddingRight: 30}}>
            Bạn có thể báo cáo bài viết sau khi chọn vấn đề
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            height: 180,
            gap: 12,
            marginLeft: 8,
            marginRight: 22,
          }}>
          <TouchableOpacity
            style={title !== 'Ảnh khỏa thân' ? styles.btnPost : styles.btnPost1}
            onPress={() => {
              setTitle('Ảnh khỏa thân');
            }}>
            <Text style={styles.btnText}>Ảnh khỏa thân</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={title !== 'Bạo lực' ? styles.btnPost : styles.btnPost1}
            onPress={() => {
              setTitle('Bạo lực');
            }}>
            <Text style={styles.btnText}>Bạo lực</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={title !== 'Quấy rối' ? styles.btnPost : styles.btnPost1}
            onPress={() => {
              setTitle('Quấy rối');
            }}>
            <Text style={styles.btnText}>Quấy rối</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={
              title !== 'Tự tử/Tự gây thương tích'
                ? styles.btnPost
                : styles.btnPost1
            }
            onPress={() => {
              setTitle('Tự tử/Tự gây thương tích');
            }}>
            <Text style={styles.btnText}>Tự tự/Tự gây thương tích</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={title !== 'Tin giả' ? styles.btnPost : styles.btnPost1}
            onPress={() => {
              setTitle('Tin giả');
            }}>
            <Text style={styles.btnText}>Tin giả</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={title !== 'Spam' ? styles.btnPost : styles.btnPost1}
            onPress={() => {
              setTitle('Spam');
            }}>
            <Text style={styles.btnText}>Spam</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={
              title !== 'Ngôn từ thù ghét' ? styles.btnPost : styles.btnPost1
            }
            onPress={() => {
              setTitle('Ngôn từ thù ghét');
            }}>
            <Text style={styles.btnText}>Ngôn từ gây thù ghét</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={title !== 'Khủng bố' ? styles.btnPost : styles.btnPost1}
            onPress={() => {
              setTitle('Khủng bố');
            }}>
            <Text style={styles.btnText}>Khủng bố</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={title !== 'Vấn đề khác' ? styles.btnPost : styles.btnPost1}
            onPress={() => {
              setTitle('Vấn đề khác');
            }}>
            <Text style={styles.btnText}>Vấn đề khác</Text>
          </TouchableOpacity>
        </View>
        <View style={{height: 6, backgroundColor: '#ddd'}}></View>
        <View style={{marginLeft: 10}}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: '600',
              color: '#000',
              marginBottom: 8,
              marginTop: 30,
            }}>
            Các bước khác mà bạn có thể thực hiện
          </Text>
        </View>
        <TouchableOpacity style={styles.postOptionItemWrapper}>
          <View style={styles.postOptionItem}>
            <View style={styles.optionIcon}>
              <MaterialCommunityIcons
                name="bookmark-remove-outline"
                size={24}
                color={'#000'}></MaterialCommunityIcons>
            </View>
            <View>
              <Text
                style={{
                  fontSize: 17,
                  fontWeight: '700',
                  color: '#000',
                }}>
                Bỏ theo dõi {route.params?.authorName}
              </Text>
              <Text style={{fontSize: 16}}>
                Không nhìn thấy bài viết của nhau nữa nhưng vẫn là bạn bè
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          //onPress={onPressBlockHandler}
          style={styles.postOptionItemWrapper}>
          <View style={styles.postOptionItem}>
            <View style={styles.optionIcon}>
              <MaterialCommunityIcons
                name="account-cancel-outline"
                size={24}
                color={'#000'}></MaterialCommunityIcons>
            </View>
            <View>
              <Text
                style={{
                  fontSize: 17,
                  fontWeight: '700',
                  color: '#000',
                }}>
                Chặn {route.params?.authorName}
              </Text>
              <Text style={{fontSize: 16}}>
                Các bạn sẽ không thẻ nhìn thấy hay liên hệ với nhau
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <TextInput
          placeholder="Nhập thêm thông tin chi tiết về báo cáo"
          multiline={true}
          textAlignVertical="top"
          onChangeText={newText => setDescription(newText)}
          style={{
            height: 100,
            margin: 15,
            padding: 10,
            borderColor: 'gray',
            borderWidth: 1,
            borderRadius: 5,
          }}></TextInput>
        <TouchableOpacity
          style={title !== '' ? styles.btnSave1 : styles.btnSave}
          onPress={handlePost}>
          <Text style={{color: 'white', fontSize: 16, fontWeight: '500'}}>
            Gửi báo cáo
          </Text>
        </TouchableOpacity>
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
    borderRadius: 8,
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 5,
    backgroundColor: '#ddd',
  },
  btnPost1: {
    borderRadius: 8,
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 5,
    backgroundColor: '#318bfb',
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
  postOptionItemWrapper: {
    paddingBottom: 14,
    paddingTop: 12,
    paddingLeft: 20,
    paddingRight: 30,
  },
  postOptionItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionIcon: {
    width: 35,
    alignItems: 'center',
  },
  btnSave: {
    height: 35,
    width: '100%',
    backgroundColor: '#ddd',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 5,
  },
  btnSave1: {
    height: 35,
    width: '100%',
    backgroundColor: '#318bfb',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 5,
  },
});

export default ReportScreen;
