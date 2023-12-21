/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import {TextInput} from 'react-native-paper';
import {ScreenNavigationProp} from '@/Routes/Stack';
import {useNavigation} from '@react-navigation/native';
import {useChangePasswordMutation} from '@/Redux/api/auth';
import Spinner from 'react-native-loading-spinner-overlay';
const ChangePasswordScreen = () => {
  const [mutateChangePassword, {isLoading}] = useChangePasswordMutation();
  const [changePasswordInfo, setChangePasswordInfo] = useState({
    currentPassword: '',
    currentPasswordAgain: '',
    newPassword: '',
    newPasswordAgain: '',
  });

  const [passwordVisible, setPasswordVisible] = useState({
    currentPassword: false,
    currentPasswordAgain: false,
    newPassword: false,
    newPasswordAgain: false,
  });

  const navigation = useNavigation<ScreenNavigationProp>();

  const handleInputChange = (key: string, text: string) => {
    setChangePasswordInfo(prev => ({
      ...prev,
      [key]: text,
    }));
  };

  const handleChangePassword = () => {
    if (
      !changePasswordInfo.currentPassword.trim() ||
      !changePasswordInfo.currentPasswordAgain.trim() ||
      !changePasswordInfo.newPassword.trim() ||
      !changePasswordInfo.newPasswordAgain.trim()
    ) {
      Alert.alert('Lỗi', 'Vui lòng nhập đủ các trường thông tin');
      return;
    }
    if (
      changePasswordInfo.currentPassword.length < 6 ||
      changePasswordInfo.currentPassword.length > 10 ||
      changePasswordInfo.newPassword.length < 6 ||
      changePasswordInfo.newPassword.length > 10
    ) {
      Alert.alert('Lỗi', 'Mật khẩu phải có độ dài 6 đến 10 ký tự');
      return;
    }
    if (changePasswordInfo.newPassword === changePasswordInfo.currentPassword) {
      Alert.alert('Lỗi', 'Mật khẩu mới cần khác với mật khẩu hiện tại');
      return;
    }
    if (
      changePasswordInfo.currentPassword !==
        changePasswordInfo.currentPasswordAgain ||
      changePasswordInfo.newPassword !== changePasswordInfo.newPasswordAgain
    ) {
      Alert.alert('Lỗi', 'Nhập lại mật khẩu chưa đúng');
      return;
    }
    mutateChangePassword({
      password: changePasswordInfo.currentPasswordAgain,
      new_password: changePasswordInfo.newPasswordAgain,
    })
      .unwrap()
      .then(() => {
        Alert.alert('Thành công', 'Đổi mật khẩu thành công');
        navigation.goBack();
      })
      .catch((err: any) => {
        Alert.alert('Lỗi', JSON.parse(err).message);
      });
  };

  const togglePasswordVisibility = (field: string, newState: boolean) => {
    setPasswordVisible(prev => ({
      ...prev,
      [field]: newState,
    }));
  };

  return (
    <View style={styles.container}>
      <Spinner visible={isLoading} />
      <View style={styles.input_container}>
        <View>
          <TextInput
            style={styles.input}
            label="Mật khẩu hiện tại"
            value={changePasswordInfo.currentPassword}
            onChangeText={text => handleInputChange('currentPassword', text)}
            secureTextEntry={!passwordVisible.currentPassword}
            right={
              <TextInput.Icon
                icon={passwordVisible.currentPassword ? 'eye-off' : 'eye'}
                onPress={() =>
                  togglePasswordVisibility(
                    'currentPassword',
                    !passwordVisible.currentPassword,
                  )
                }
              />
            }
          />
        </View>
        <View>
          <TextInput
            style={styles.input}
            label="Gõ lại mật khẩu hiện tại"
            value={changePasswordInfo.currentPasswordAgain}
            onChangeText={text =>
              handleInputChange('currentPasswordAgain', text)
            }
            secureTextEntry={!passwordVisible.currentPasswordAgain}
            right={
              <TextInput.Icon
                icon={passwordVisible.currentPasswordAgain ? 'eye-off' : 'eye'}
                onPress={() =>
                  togglePasswordVisibility(
                    'currentPasswordAgain',
                    !passwordVisible.currentPasswordAgain,
                  )
                }
              />
            }
          />
        </View>
        <View>
          <TextInput
            style={styles.input}
            label="Mật khẩu mới"
            value={changePasswordInfo.newPassword}
            onChangeText={text => handleInputChange('newPassword', text)}
            secureTextEntry={!passwordVisible.newPassword}
            right={
              <TextInput.Icon
                icon={passwordVisible.newPassword ? 'eye-off' : 'eye'}
                onPress={() =>
                  togglePasswordVisibility(
                    'newPassword',
                    !passwordVisible.newPassword,
                  )
                }
              />
            }
          />
        </View>
        <View>
          <TextInput
            style={styles.input}
            label="Gõ lại mật khẩu mới"
            value={changePasswordInfo.newPasswordAgain}
            onChangeText={text => handleInputChange('newPasswordAgain', text)}
            secureTextEntry={!passwordVisible.newPasswordAgain}
            right={
              <TextInput.Icon
                icon={passwordVisible.newPasswordAgain ? 'eye-off' : 'eye'}
                onPress={() =>
                  togglePasswordVisibility(
                    'newPasswordAgain',
                    !passwordVisible.newPasswordAgain,
                  )
                }
              />
            }
          />
        </View>
      </View>
      <View style={styles.button_container}>
        <TouchableOpacity
          onPress={handleChangePassword}
          style={styles.update_button}>
          <Text style={{color: 'white', fontSize: 19, textAlign: 'center'}}>
            Lưu thay đổi
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('SettingSecurity');
          }}
          style={styles.cancel_button}>
          <Text style={{color: '#5f6061', fontSize: 19, textAlign: 'center'}}>
            Hủy
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input_container: {
    paddingHorizontal: 10,
    paddingVertical: 15,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 8,
  },
  input: {
    backgroundColor: 'white',
    fontSize: 18,
    borderRadius: 4,
    height: 60,
    border: 'none',
  },
  button_container: {
    marginHorizontal: 10,
    display: 'flex',
    flexDirection: 'column',
    marginTop: 5,
    gap: 15,
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

export default ChangePasswordScreen;
