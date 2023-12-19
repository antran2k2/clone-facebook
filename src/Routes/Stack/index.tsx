/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import React, { useEffect } from 'react';
import type { RouteProp } from '@react-navigation/native';

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
import { useAppSelector } from '@/Redux/store';
import { useNavigation } from '@react-navigation/native';
import MainTab from './tab';
import AddPostScreen from '@/Screens/Post/AddPost';
import SettingTabScreen from '@/Screens/Setting/SettingTab';
import SettingAccountScreen from '@/Screens/Setting/SettingAccount';
import SettingPersonalInfoScreen from '@/Screens/Setting/SettingPersonalInfo';
import ProfileTabScreen from '@/Screens/ProfileTab';
import FullFriendScreen from '@/Screens/FriendTab/FullFriend';
import { TUserFriend } from '@/types/user.type';
import FriendRequestScreen from '@/Screens/FriendTab/FriendRequest';
import SuggestFriendScreen from '@/Screens/FriendTab/SuggestFriend';
import EditPublicInfoScreen from '@/Screens/ProfileTab/EditPublicInfo';
import ShowImageScreen from '@/Screens/ProfileTab/ShowImage';
import VideoScreen from '@/Screens/Video';
import PreViewAvatarScreen from '@/Screens/ProfileTab/PreViewAvatar';
import ChangeAvatarScreen from '@/Screens/ProfileTab/ChangeAvatar';
import EditBioScreen from '@/Screens/ProfileTab/EditBio';
import EditLinkScreen from '@/Screens/ProfileTab/EditLink';
import EditDetailScreen from '@/Screens/ProfileTab/EditDetail';
import SettingPersonalPageScreen from '@/Screens/ProfileTab/SettingPersonalPage';
import SetAvatarScreen from '@/Screens/Signup/SetAvatar';

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
  WebViewPolicy: { url: string };
  Rules: undefined;
  SetAvatar: undefined;
  AddPost: undefined;
  SettingTab: undefined /* Thực tế cần truyền userId để lấy ảnh và tên người dùng */;
  SettingAccount: undefined;
  SettingPersonalInfo: {
    name: string;
  } /* Thực tế nên truyền userId để lấy tên người dùng */;
  ProfileTab: undefined;
  EditPublicInfo: undefined;
  EditBio: undefined;
  EditLink: undefined;
  EditDetail: undefined;
  SettingPersonalPage: undefined;
  ShowImage: { link: string };
  FullFriend: { user_id: string };
  FriendRequest: undefined;
  SuggestFriend: undefined;
  ChangeAvatar: { type: String };
  PreViewAvatar: { link: string | undefined, type: String };
  Profile: { userId: string };
};
export type ScreenNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;
const Stack = createNativeStackNavigator<RootStackParamList>();

export type ScreenPolicyProp = RouteProp<RootStackParamList, 'WebViewPolicy'>;
export type ScreenSettingPersonalInfoProp = RouteProp<
  RootStackParamList,
  'SettingPersonalInfo'
>;
export type ScreenFullFriendProp = RouteProp<RootStackParamList, 'FullFriend'>;
export type ScreenShowImageProp = RouteProp<RootStackParamList, 'ShowImage'>;
export type ScreenPreViewImageProp = RouteProp<RootStackParamList, 'PreViewAvatar'>;
export type ScreenChangeViewImageProp = RouteProp<RootStackParamList, 'ChangeAvatar'>;

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
      initialRouteName="FriendRequest"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Main" component={MainTab} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="AddPost" component={AddPostScreen} />
      <Stack.Screen name="SettingTab" component={SettingTabScreen} />
      <Stack.Group
        screenOptions={{
          headerShown: true,
        }}>
        <Stack.Screen
          name="JoinFb"
          component={JoinFbScreen}
          options={{ title: 'Tạo tài khoản' }}
        />
        <Stack.Screen
          name="Name"
          component={NameScreen}
          options={{ title: 'Tên' }}
        />
        <Stack.Screen
          name="BirthDay"
          component={BirthDayScreen}
          options={{ title: 'Ngày sinh' }}
        />
        <Stack.Screen
          name="Email"
          component={EmailScreen}
          options={{ title: 'Địa chỉ Email' }}
        />
        <Stack.Screen
          name="Password"
          component={PasswordScreen}
          options={{ title: 'Mật khẩu' }}
        />
        <Stack.Screen
          name="Confirm"
          component={ConfirmScreen}
          options={{ title: 'Xác nhận tài khoản' }}
        />
        <Stack.Screen
          name="Rules"
          component={RulesScreen}
          options={{ title: 'Điều khoản & quyền riêng tư' }}
        />
        <Stack.Screen
          name="WebViewPolicy"
          component={WebViewPolicyScreen}
          options={{ title: 'Điều khoản & quyền riêng tư' }}
        />
      </Stack.Group>
      <Stack.Group
        screenOptions={{
          headerShown: true,
        }}>
        <Stack.Screen
          name="SettingAccount"
          component={SettingAccountScreen}
          options={{ title: 'Cài đặt' }}
        />
        <Stack.Screen
          name="SettingPersonalInfo"
          component={SettingPersonalInfoScreen}
          options={{ title: '' }}
        />
      </Stack.Group>
      <Stack.Screen name="SetAvatar" component={SetAvatarScreen} />
      <Stack.Screen name="ProfileTab" component={ProfileTabScreen} />
      <Stack.Screen name="EditPublicInfo" component={EditPublicInfoScreen} />
      <Stack.Screen name="EditBio" component={EditBioScreen} />
      <Stack.Screen name="EditLink" component={EditLinkScreen} />
      <Stack.Screen name="EditDetail" component={EditDetailScreen} />
      <Stack.Screen name="ShowImage" component={ShowImageScreen} />
      <Stack.Screen name="ChangeAvatar" component={ChangeAvatarScreen} />
      <Stack.Screen name="PreViewAvatar" component={PreViewAvatarScreen} />
      <Stack.Screen name="SettingPersonalPage" component={SettingPersonalPageScreen} />
      <Stack.Screen name="FullFriend" component={FullFriendScreen} />
      <Stack.Screen name="FriendRequest" component={FriendRequestScreen} />
      <Stack.Screen name="SuggestFriend" component={SuggestFriendScreen} />
    </Stack.Navigator>
  );
}

export default MyStack;
