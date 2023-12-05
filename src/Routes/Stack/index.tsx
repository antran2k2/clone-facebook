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
import MainTab from './tab';

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
};
export type ScreenNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;
const Stack = createNativeStackNavigator<RootStackParamList>();

export type ScreenPolicyProp = RouteProp<RootStackParamList, 'WebViewPolicy'>;

function MyStack() {
  const token = useAppSelector(state => state.auth.token);

  const nav = useNavigation<ScreenNavigationProp>();
  useEffect(() => {
    if (!token) {
      nav.navigate('Login');
    }
  }, [nav, token]);
  return (
    <Stack.Navigator
      initialRouteName="Main"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Main" component={MainTab} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
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
    </Stack.Navigator>
  );
}

export default MyStack;
