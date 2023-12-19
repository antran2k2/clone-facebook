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
import AddPostScreen from '@/Screens/Post/AddPost';
import SettingTabScreen from '@/Screens/Setting/SettingTab';
import SettingAccountScreen from '@/Screens/Setting/SettingAccount';
import SettingPersonalInfoScreen from '@/Screens/Setting/SettingPersonalInfo';
import ProfileTabScreen from '@/Screens/ProfileTab';
import FullFriendScreen from '@/Screens/FriendTab/FullFriend';
import {TUserFriend} from '@/types/user.type';
import FriendRequestScreen from '@/Screens/FriendTab/FriendRequest';
import SettingNameScreen from '@/Screens/Setting/SettingName';
import SettingSecurityScreen from '@/Screens/Setting/SettingSecurity';
import ChangePasswordScreen from '@/Screens/Setting/ChangePassword';
import SettingNotificationScreen from '@/Screens/Setting/SettingNotification';
import SettingPushScreen from '@/Screens/Setting/SettingPush';
import BlockingScreen from '@/Screens/Setting/Blocking';
import AddUserToBlockListScreen from '@/Screens/Setting/AddUserToBlockList';

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
  AddPost: undefined;
  SettingTab: undefined /* Thực tế cần truyền userId để lấy ảnh và tên người dùng */;
  SettingAccount: undefined;
  SettingPersonalInfo: undefined;
  SettingName: undefined;
  SettingSecurity: undefined;
  ChangePassword: undefined;
  SettingNotification: undefined;
  SettingPush: undefined;
  Blocking: undefined;
  AddUserToBlockList: undefined;
  ProfileTab: undefined;
  FullFriend: {user_id: string};
  FriendRequest: undefined;
  Profile: {userId: string};
};
export type ScreenNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;
const Stack = createNativeStackNavigator<RootStackParamList>();

export type ScreenPolicyProp = RouteProp<RootStackParamList, 'WebViewPolicy'>;
export type ScreenFullFriendProp = RouteProp<RootStackParamList, 'FullFriend'>;

function MyStack() {
  const token = useAppSelector(state => state.auth.token);

  const nav = useNavigation<ScreenNavigationProp>();
  useEffect(() => {
    if (token) {
      nav.navigate('Main');
    }
  }, [nav, token]);
  return (
    <Stack.Navigator
      initialRouteName="SettingTab"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Main" component={MainTab} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="AddPost" component={AddPostScreen} />
      <Stack.Screen name="SettingTab" component={SettingTabScreen} />
      <Stack.Screen name="AddUserToBlockList" component={AddUserToBlockListScreen} />
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
        <Stack.Screen
          name="SettingName"
          component={SettingNameScreen}
          options={{title: 'Tên'}}
        />
        <Stack.Screen
          name="SettingSecurity"
          component={SettingSecurityScreen}
          options={{title: ''}}
        />
        <Stack.Screen
          name="ChangePassword"
          component={ChangePasswordScreen}
          options={{title: 'Đổi mật khẩu'}}
        />
        <Stack.Screen
          name="SettingNotification"
          component={SettingNotificationScreen}
          options={{title: 'Cài đặt thông báo'}}
        />
        <Stack.Screen
          name="SettingPush"
          component={SettingPushScreen}
          options={{title: 'Đẩy'}}
        />
        <Stack.Screen
          name="Blocking"
          component={BlockingScreen}
          options={{title: 'Chặn'}}
        />
      </Stack.Group>
      <Stack.Screen name="ProfileTab" component={ProfileTabScreen} />
      <Stack.Screen name="FullFriend" component={FullFriendScreen} />
      <Stack.Screen name="FriendRequest" component={FriendRequestScreen} />
    </Stack.Navigator>
  );
}

export default MyStack;
