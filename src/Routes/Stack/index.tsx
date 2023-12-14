/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import React, {useEffect} from 'react';
import type {RouteProp} from '@react-navigation/native';

import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import LoginScreen from '@/Screens/Login';
import SignupScreen from '@/Screens/Signup';
import JoinFbScreen from '@/Screens/Signup/JoinFB';
import NameScreen from '@/Screens/Signup/Name';
import BirthDayScreen from '@/Screens/Signup/BirthDay';
import EmailScreen from '@/Screens/Signup/Email';
import PasswordScreen from '@/Screens/Signup/Password';
import WebViewPolicyScreen from '@/Screens/Signup/WebViewPolicy';
import RulesScreen from '@/Screens/Signup/Rules';
import ConfirmScreen from '@/Screens/Signup/Confirm';
import {useAppSelector} from '@/Redux/store';
import {useNavigation} from '@react-navigation/native';
<<<<<<< HEAD
import MainTab from './tab';
import AddPostScreen from '@/Screens/Post/AddPost';
=======
import SettingTabScreen from '@/Screens/Setting/SettingTab';
import SettingAccountScreen from '@/Screens/Setting/SettingAccount';
import SettingPersonalInfoScreen from '@/Screens/Setting/SettingPersonalInfo';
>>>>>>> origin/tunglam

export type RootStackParamList = {
  Main: undefined;
  Home: undefined;
  Login: undefined;
  Signup: undefined;
  JoinFb: undefined;
  Name: undefined;
  BirthDay: undefined;
  Email: undefined;
  Password: undefined;
  Confirm: undefined;
  WebViewPolicy: {url: string};
  Rules: undefined;
  Profile: {userId: string};
<<<<<<< HEAD
  AddPost: undefined;
=======
  SettingTab: undefined; /* Thực tế cần truyền userId để lấy ảnh và tên người dùng */
  SettingAccount: undefined;
  SettingPersonalInfo: {name: string}; /* Thực tế nên truyền userId để lấy tên người dùng */
>>>>>>> origin/tunglam
};
export type ScreenNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;
const Stack = createNativeStackNavigator<RootStackParamList>();

export type ScreenPolicyProp = RouteProp<RootStackParamList, 'WebViewPolicy'>;
export type ScreenSettingPersonalInfoProp = RouteProp<RootStackParamList, 'SettingPersonalInfo'>;

function MyStack() {
  const token = useAppSelector(state => state.auth.token);

  const nav = useNavigation<ScreenNavigationProp>();
  useEffect(() => {
<<<<<<< HEAD
    if (token) {
      nav.navigate('Main');
=======
    console.log(token);

    if (!token) {
      nav.navigate('SettingTab');
>>>>>>> origin/tunglam
    }
  }, [nav, token]);
  return (
    <Stack.Navigator
<<<<<<< HEAD
      initialRouteName="Login"
=======
      initialRouteName="SettingTab"
>>>>>>> origin/tunglam
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Main" component={MainTab} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
<<<<<<< HEAD
      <Stack.Screen name="AddPost" component={AddPostScreen} />
=======
      <Stack.Screen name="SettingTab" component={SettingTabScreen} />
>>>>>>> origin/tunglam
      <Stack.Group
        screenOptions={{
          headerShown: true,
        }}>
        <Stack.Screen
          name="JoinFb"
          component={JoinFbScreen}
          options={{title: 'Tạo tài khoản'}}
        />
        <Stack.Screen
          name="Name"
          component={NameScreen}
          options={{title: 'Tên'}}
        />
        <Stack.Screen
          name="BirthDay"
          component={BirthDayScreen}
          options={{title: 'Ngày sinh'}}
        />
        <Stack.Screen
          name="Email"
          component={EmailScreen}
          options={{title: 'Địa chỉ Email'}}
        />
        <Stack.Screen
          name="Password"
          component={PasswordScreen}
          options={{title: 'Mật khẩu'}}
        />
        <Stack.Screen
          name="Confirm"
          component={ConfirmScreen}
          options={{title: 'Xác nhận tài khoản'}}
        />
        <Stack.Screen
          name="Rules"
          component={RulesScreen}
          options={{title: 'Điều khoản & quyền riêng tư'}}
        />
        <Stack.Screen
          name="WebViewPolicy"
          component={WebViewPolicyScreen}
          options={{title: 'Điều khoản & quyền riêng tư'}}
        />
      </Stack.Group>
      <Stack.Group
        screenOptions={{
          headerShown: true,
        }}>
        <Stack.Screen
          name="SettingAccount"
          component={SettingAccountScreen}
          options={{title: 'Cài đặt'}}
        />
        <Stack.Screen
          name="SettingPersonalInfo"
          component={SettingPersonalInfoScreen}
          options={{title: ''}}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}

export default MyStack;
