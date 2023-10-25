import React from 'react';
import type { RouteProp } from '@react-navigation/native';

import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import HomeScreen from '@/Screens/Home';
import LoginScreen from '@/Screens/Login';
import SignupScreen from '@/Screens/Signup';
import JoinFbScreen from '@/Screens/Signup/JoinFb';
import NameScreen from '@/Screens/Signup/Name';
import BirthDayScreen from '@/Screens/Signup/BirthDay';
import EmailScreen from '@/Screens/Signup/Email';
import PasswordScreen from '@/Screens/Signup/Password';
import ConfirmScreen from '@/Screens/Signup/Confirm';


export type SignUpInfo = {
  ho?: String | undefined,
  ten?: String | undefined,
  birthDay?: Date | undefined,
  email?: String | undefined,
  password?: String | undefined,
}

export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Signup: undefined;
  JoinFb: undefined;
  Name: undefined;
  BirthDay: SignUpInfo;
  Email: SignUpInfo;
  Password: SignUpInfo;
  Confirm: SignUpInfo;
  Profile: { userId: string };
};
export type ScreenNavigationProp =
  NativeStackNavigationProp<RootStackParamList, "BirthDay">;
const Stack = createNativeStackNavigator<RootStackParamList>();
export type ScreenBirthDayProp = RouteProp<RootStackParamList, 'BirthDay'>;
export type ScreenEmailProp = RouteProp<RootStackParamList, 'Email'>;
export type ScreenPasswordProp = RouteProp<RootStackParamList, 'Password'>;
export type ScreenConfirmProp = RouteProp<RootStackParamList, 'Confirm'>;

function MyStack() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Group screenOptions={{
        headerShown: true,
      }}>
        <Stack.Screen name="JoinFb" component={JoinFbScreen} options={{ title: 'Tạo tài khoản' }} />
        <Stack.Screen name="Name" component={NameScreen} options={{ title: 'Tên' }} />
        <Stack.Screen name="BirthDay" component={BirthDayScreen} options={{ title: 'Ngày sinh' }} />
        <Stack.Screen name="Email" component={EmailScreen} options={{ title: 'Địa chỉ Email' }} />
        <Stack.Screen name="Password" component={PasswordScreen} options={{ title: 'Mật khẩu' }} />
        <Stack.Screen name="Confirm" component={ConfirmScreen} options={{ title: 'Xác nhận tài khoản' }} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

export default MyStack;
