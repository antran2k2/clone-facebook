import {ScreenNavigationProp} from '@/Routes/Stack';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
  Alert,
  SafeAreaView,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Octicons from 'react-native-vector-icons/Octicons';
import Entypo from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay';
import {
  useGetPushSettingQuery,
  useSetPushSettingMutation,
} from '@/Redux/api/setting';
import {convertBooleanToString, convertStringToBoolean} from '@/Utils';
const SettingNotificationScreen = () => {
  const navigation = useNavigation<ScreenNavigationProp>();
  const {data, isLoading: isLoadingData, isSuccess} = useGetPushSettingQuery();
  const [mutateSetPushSetting, {isLoading: isLoadingMutate}] =
    useSetPushSettingMutation();
  const [switchEnabled, setSwitchEnabled] = useState<any>({
    like_comment: '1',
    from_friends: '1',
    requested_friend: '1',
    suggested_friend: '1',
    birthday: '1',
    video: '1',
    report: '1',
    sound_on: '1',
    notification_on: '1',
    vibrant_on: '1',
    led_on: '1',
  });
  useEffect(() => {
    if (isSuccess) {
      setSwitchEnabled(data?.data || {});
    }
  }, [isSuccess, data]);

  const toggleSwitch = (field: string, newState: string) => {
    setSwitchEnabled(prev => {
      const updatedState = {
        ...prev,
        [field]: newState,
      };
      mutateSetPushSetting(updatedState)
        .unwrap()
        .then(() => {
          console.log('success');
        })
        .catch(err => {
          // console.log(err);
          Alert.alert('Thông báo', 'Có lỗi xảy ra, vui lòng thử lại sau');
        });

      return updatedState; // Trả về giá trị mới để cập nhật state
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Spinner
        visible={isLoadingData || isLoadingMutate}
        textContent={'Loading...'}
        textStyle={{color: '#FFF'}}
      />
      <View style={styles.notification_about}>
        <Text style={styles.title}>Bạn nhận thông báo về</Text>
        <View style={styles.setting_notification_about_container}>
          <View style={styles.option_item}>
            <View>
              <FontAwesome6
                style={styles.icon}
                name="comment"
                size={32}
                color={'black'}
              />
            </View>
            <View style={styles.title_description}>
              <Text style={styles.title_option}>Bình luận</Text>
              <Text style={styles.description_option}>Thông báo đẩy</Text>
            </View>
            <View>
              <Switch
                style={{transform: [{scaleX: 1.3}, {scaleY: 1.3}]}}
                trackColor={{false: '#767577', true: '#81b0ff'}}
                thumbColor={
                  switchEnabled.like_comment === '1' ? '#1355bf' : '#f4f3f4'
                }
                onValueChange={() =>
                  toggleSwitch(
                    'like_comment',
                    switchEnabled.like_comment === '1' ? '0' : '1',
                  )
                }
                value={switchEnabled.like_comment === '1'}
              />
            </View>
          </View>
          <View style={styles.option_item}>
            <View>
              <FontAwesome5
                style={styles.icon}
                name="user-friends"
                size={28}
                color={'black'}
              />
            </View>
            <View style={styles.title_description}>
              <Text style={styles.title_option}>Cập nhật từ bạn bè</Text>
              <Text style={styles.description_option}>Thông báo đẩy</Text>
            </View>
            <View>
              <Switch
                style={{transform: [{scaleX: 1.3}, {scaleY: 1.3}]}}
                trackColor={{false: '#767577', true: '#81b0ff'}}
                thumbColor={
                  switchEnabled.from_friends === '1' ? '#1355bf' : '#f4f3f4'
                }
                onValueChange={() =>
                  toggleSwitch(
                    'from_friends',
                    switchEnabled.from_friends === '1' ? '0' : '1',
                  )
                }
                value={switchEnabled.from_friends === '1'}
              />
            </View>
          </View>
          <View style={styles.option_item}>
            <View>
              <FontAwesome6
                style={styles.icon}
                name="user-plus"
                size={28}
                color={'black'}
              />
            </View>
            <View style={styles.title_description}>
              <Text style={styles.title_option}>Lời mời kết bạn</Text>
              <Text style={styles.description_option}>Thông báo đẩy</Text>
            </View>
            <View>
              <Switch
                style={{transform: [{scaleX: 1.3}, {scaleY: 1.3}]}}
                trackColor={{false: '#767577', true: '#81b0ff'}}
                thumbColor={
                  switchEnabled.requested_friend === '1' ? '#1355bf' : '#f4f3f4'
                }
                onValueChange={() =>
                  toggleSwitch(
                    'requested_friend',
                    switchEnabled.requested_friend === '1' ? '0' : '1',
                  )
                }
                value={switchEnabled.requested_friend === '1'}
              />
            </View>
          </View>
          <View style={styles.option_item}>
            <View>
              <FontAwesome6
                style={styles.icon}
                name="users-rectangle"
                size={28}
                color={'black'}
              />
            </View>
            <View style={styles.title_description}>
              <Text style={styles.title_option}>
                Những người bạn có thể biết
              </Text>
              <Text style={styles.description_option}>Thông báo đẩy</Text>
            </View>
            <View>
              <Switch
                style={{transform: [{scaleX: 1.3}, {scaleY: 1.3}]}}
                trackColor={{false: '#767577', true: '#81b0ff'}}
                thumbColor={
                  switchEnabled.suggested_friend === '1' ? '#1355bf' : '#f4f3f4'
                }
                onValueChange={() =>
                  toggleSwitch(
                    'suggested_friend',
                    switchEnabled.suggested_friend === '1' ? '0' : '1',
                  )
                }
                value={switchEnabled.suggested_friend === '1'}
              />
            </View>
          </View>
          <View style={styles.option_item}>
            <View>
              <FontAwesome5
                style={styles.icon}
                name="birthday-cake"
                size={38}
                color={'black'}
              />
            </View>
            <View style={styles.title_description}>
              <Text style={styles.title_option}>Sinh nhật</Text>
              <Text style={styles.description_option}>Thông báo đẩy</Text>
            </View>
            <View>
              <Switch
                style={{transform: [{scaleX: 1.3}, {scaleY: 1.3}]}}
                trackColor={{false: '#767577', true: '#81b0ff'}}
                thumbColor={
                  switchEnabled.birthday === '1' ? '#1355bf' : '#f4f3f4'
                }
                onValueChange={() =>
                  toggleSwitch(
                    'birthday',
                    switchEnabled.birthday === '1' ? '0' : '1',
                  )
                }
                value={switchEnabled.birthday === '1'}
              />
            </View>
          </View>
          <View style={styles.option_item}>
            <View>
              <Octicons
                style={styles.icon}
                name="video"
                size={35}
                color={'black'}
              />
            </View>
            <View style={styles.title_description}>
              <Text style={styles.title_option}>Video</Text>
              <Text style={styles.description_option}>Thông báo đẩy</Text>
            </View>
            <View>
              <Switch
                style={{transform: [{scaleX: 1.3}, {scaleY: 1.3}]}}
                trackColor={{false: '#767577', true: '#81b0ff'}}
                thumbColor={switchEnabled.video === '1' ? '#1355bf' : '#f4f3f4'}
                onValueChange={() =>
                  toggleSwitch('video', switchEnabled.video === '1' ? '0' : '1')
                }
                value={switchEnabled.video === '1'}
              />
            </View>
          </View>
        </View>
      </View>
      <View style={styles.notification_via}>
        <Text style={styles.title}>Bạn nhận thông báo qua</Text>
        <View style={styles.setting_notification_via_container}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('SettingPush', {
                switchEnabled,
                setSwitchEnabled,
                toggleSwitch,
              })
            }
            style={styles.option_item}>
            <View>
              <Entypo
                style={styles.icon}
                name="notification"
                size={38}
                color={'black'}
              />
            </View>
            <View style={styles.title_description}>
              <Text style={styles.title_option}>Thông báo đẩy</Text>
              <Text style={styles.description_option}>
                {switchEnabled.notification_on === '1' ? 'Bật' : 'Tắt'}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  notification_about: {
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 10,
  },
  notification_via: {
    marginHorizontal: 20,
    marginVertical: 20,
    borderTopWidth: 1,
    borderTopColor: '#cccccc',
    borderTopStyle: 'solid',
    paddingVertical: 20,
  },
  title: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 22,
  },
  setting_notification_about_container: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 20,
    gap: 20,
  },
  setting_notification_via_container: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 20,
    gap: 20,
  },
  option_item: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 50,
  },
  title_description: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    width: 270,
  },
  title_option: {
    color: 'black',
    fontWeight: '500',
    fontSize: 18,
  },
  description_option: {
    fontSize: 16,
    fontWeight: '400',
    width: 315,
  },
});

export default SettingNotificationScreen;
