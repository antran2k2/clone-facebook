/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import {TextInput} from 'react-native-paper';
import {ScreenNavigationProp} from '@/Routes/Stack';
import {useNavigation} from '@react-navigation/native';
import {useAppDispatch, useAppSelector} from '@/Redux/store';
import {useSetUserInfoMutation} from '@/Redux/api/profile';
import Spinner from 'react-native-loading-spinner-overlay';
import {setUsername} from '@/Redux/reducer/userInfo';

const SettingNameScreen = () => {
  const {username} = useAppSelector(state => state.info);
  const [mutateSetUserInfo, {isLoading}] = useSetUserInfoMutation();
  const dispatch = useAppDispatch();
  const [nameInfo, setNameInfo] = useState({
    lastName: '',
    middleName: '',
    firstName: username || '',
  });

  const navigation = useNavigation<ScreenNavigationProp>();

  const handleInputChange = (key: string, text: string) => {
    setNameInfo(prevNameInfo => ({
      ...prevNameInfo,
      [key]: text,
    }));
  };

  const handleUpdateName = () => {
    if (
      !nameInfo.lastName.trim() &&
      !nameInfo.middleName.trim() &&
      !nameInfo.firstName.trim()
    ) {
      Alert.alert('Lỗi', 'Vui lòng nhập ít nhất một trường tên');
      return;
    }
    const regex =
      /^[a-zA-Z0-9\sÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂẰẮẶẲẴẠẢẤẦẬẨẪĨĐỆỘỔỖẸẺẼỀẾỂỄỈỊỌỎỐỒỔỖỚỜỞỠỢỤỦỨỪỬỮỰỲỴỶỸàáâãèéêếìíòóôõùúăằắặẳẵạảấầậẩẫĩđệộổỗẹẻẽềếểễỷỹòỏốồổỗớờởỡợụủứừửữựỳỵỷỹ]*$/u;
    if (
      !regex.test(nameInfo.lastName) ||
      !regex.test(nameInfo.middleName) ||
      !regex.test(nameInfo.firstName)
    ) {
      Alert.alert('Lỗi', 'Tên không được chứa ký tự đặc biệt hoặc dấu câu');
      return;
    }
    const formData = new FormData();
    formData.append(
      'username',
      `${nameInfo.lastName} ${nameInfo.middleName} ${nameInfo.firstName}`,
    );
    mutateSetUserInfo(formData)
      .unwrap()
      .then(() => {
        dispatch(
          setUsername(
            `${nameInfo.lastName} ${nameInfo.middleName} ${nameInfo.firstName}`,
          ),
        );
        navigation.navigate('SettingTab');
      })
      .catch(() => {
        Alert.alert('Lỗi', 'Cập nhật tên thất bại');
      });
  };

  return (
    <View style={styles.container}>
      <Spinner
        visible={isLoading}
        textContent={'Loading...'}
        // textStyle={styles.spinnerTextStyle}
      />
      <View style={styles.main}>
        <View style={styles.header}>
          <Text style={styles.header_text}>Tên</Text>
        </View>
        <View style={styles.input_container}>
          <View>
            <Text style={styles.label}>Họ</Text>
            <TextInput
              style={styles.input}
              value={nameInfo.lastName}
              onChangeText={text => handleInputChange('lastName', text)}
            />
          </View>
          <View>
            <Text style={styles.label}>Tên đệm</Text>
            <TextInput
              style={styles.input}
              value={nameInfo.middleName}
              onChangeText={text => handleInputChange('middleName', text)}
            />
          </View>
          <View>
            <Text style={styles.label}>Tên</Text>
            <TextInput
              style={styles.input}
              value={nameInfo.firstName}
              onChangeText={text => handleInputChange('firstName', text)}
            />
          </View>
        </View>
        <View style={styles.note_container}>
          <Text style={styles.text_note}>
            <Text style={{fontWeight: 'bold'}}>Xin lưu ý rằng: </Text>
            Nếu đổi tên trên Fakebook, bạn không thể đổi lại tên trong 60 ngày.
            Đừng thêm bất cứ cách viết hoa khác thường, dấu câu, ký tự hoặc các
            từ ngẫu nhiên.{' '}
            <Text style={{color: '#2a5f94'}}>Tìm hiểu thêm.</Text>
          </Text>
        </View>
        <View style={styles.button_container}>
          <TouchableOpacity
            onPress={handleUpdateName}
            style={styles.update_button}>
            <Text style={{color: 'white', fontSize: 19, textAlign: 'center'}}>
              Cập nhật
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('SettingPersonalInfo');
            }}
            style={styles.cancel_button}>
            <Text style={{color: '#5f6061', fontSize: 19, textAlign: 'center'}}>
              Hủy
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  main: {
    backgroundColor: 'white',
    borderRadius: 8,
    paddingVertical: 10,
    marginHorizontal: 15,
    marginTop: 25,
  },
  header: {
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
    borderBottomStyle: 'solid',
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  header_text: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'black',
  },
  input_container: {
    display: 'flex',
    flexDirection: 'column',
    gap: 15,
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  label: {
    fontSize: 17,
    color: 'black',
    marginBottom: 5,
  },
  input: {
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#cccccc',
    borderStyle: 'solid',
    fontSize: 17,
    width: 300,
    borderRadius: 4,
    height: 50,
  },
  note_container: {
    backgroundColor: '#eeeeff',
    marginHorizontal: 10,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#cccccc',
    borderStyle: 'solid',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  text_note: {
    fontSize: 17,
    lineHeight: 22,
  },
  button_container: {
    marginHorizontal: 10,
    display: 'flex',
    flexDirection: 'column',
    marginTop: 15,
    gap: 10,
  },
  update_button: {
    backgroundColor: '#2c78c9',
    paddingVertical: 13,
    borderRadius: 4,
  },
  cancel_button: {
    backgroundColor: 'white',
    paddingVertical: 13,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#929394',
    borderStyle: 'solid',
  },
});

export default SettingNameScreen;
