import React, { useState } from 'react';
import {
  Alert,
  Image,
  Keyboard,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ScreenNavigationProp } from '@/Routes/Stack';
import { TextInput } from 'react-native-paper';
import { useAppDispatch } from '@/Redux/store';
import { setToken } from '@/Redux/reducer/auth';

const LoginScreen = () => {
  const navigation = useNavigation<ScreenNavigationProp>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleLogin = () => {
    if (email.trim() === '' || password.trim() === '') {
      Alert.alert('Vui lòng nhập cả email và mật khẩu');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      Alert.alert('Email không hợp lệ');
      return;
    }

    if (password.length < 8) {
      Alert.alert('Mật khẩu phải có ít nhất 8 ký tự');
      return;
    }
    dispatch(setToken(password));
    navigation.navigate('Home');
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <Image
          source={require('@/Assets/Images/Logo.png')}
          style={styles.logo}
        />
        <TextInput
          style={styles.input}
          label="Email"
          value={email}
          onChangeText={text => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          label="Mật khẩu"
          secureTextEntry={!isPasswordVisible}
          value={password}
          onChangeText={text => setPassword(text)}
          right={
            <TextInput.Icon
              icon={isPasswordVisible ? 'eye-off' : 'eye'}
              onPress={togglePasswordVisibility}
            />
          }
        />
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Đăng nhập</Text>
        </TouchableOpacity>
        <Text style={styles.forgotPasswordText}>Quên mật khẩu?</Text>
        <View style={styles.separator} />
        <TouchableOpacity
          style={styles.createAccountButton}
          onPress={() => navigation.navigate('JoinFb')}>
          <Text style={styles.createAccountButtonText}>Tạo tài khoản mới</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 150,
  },
  input: {
    width: '100%',
    height: 60,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  loginButton: {
    width: '100%',
    height: 40,
    backgroundColor: '#1877f2',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  forgotPasswordText: {
    color: '#1877f2',
    marginBottom: 10,
  },
  separator: {
    marginTop: 150,
    width: '100%',
    height: 1,
    backgroundColor: '#ddd',
    marginBottom: 10,
  },
  createAccountButton: {
    width: '100%',
    height: 40,
    backgroundColor: '#42b72a',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  createAccountButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LoginScreen;
