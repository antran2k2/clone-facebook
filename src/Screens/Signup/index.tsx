import {ScreenNavigationProp} from '@/Routes/Stack';
import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

const SignupScreen = () => {
  const navigation = useNavigation<ScreenNavigationProp>();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    // Xử lý đăng ký ở đây
  };

  return (
    <View style={styles.container}>
      <Image source={require('@/Assets/Images/Logo.png')} style={styles.logo} />
      <TextInput
        style={styles.input}
        label="Họ tên"
        value={name}
        onChangeText={text => setName(text)}
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
        secureTextEntry
        value={password}
        onChangeText={text => setPassword(text)}
      />
      <Button
        mode="contained"
        style={styles.registerButton}
        onPress={handleRegister}>
        Đăng ký
      </Button>
      <Text style={styles.loginText}>
        Đã có tài khoản?{' '}
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.loginLink}>Đăng nhập</Text>
        </TouchableOpacity>
      </Text>
    </View>
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
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 60,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  registerButton: {
    width: '100%',
    height: 40,
    backgroundColor: '#42b72a',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  loginText: {
    marginTop: 10,
  },
  loginLink: {
    color: '#1877f2',
    fontWeight: 'bold',
  },
});

export default SignupScreen;
