import React, {useState} from 'react';
import {View, Text, StyleSheet, Switch, Alert} from 'react-native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useRoute} from '@react-navigation/native';
import {useSetPushSettingMutation} from '@/Redux/api/setting';
import Spinner from 'react-native-loading-spinner-overlay';
const SettingPushScreen = () => {
  const route = useRoute();
  const {switchEnabled} = route.params as any;
  const [mutateSetPushSetting, {isLoading: isLoadingMutate}] =
    useSetPushSettingMutation();
  const [switchEnabledState, setSwitchEnabledState] = useState(switchEnabled);
  const toggleSwitch = (field: string, newState: string) => {
    setSwitchEnabledState(prev => {
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
          Alert.alert('Lỗi', JSON.parse(err).message);
        });

      return updatedState; // Trả về giá trị mới để cập nhật state
    });
  };

  return (
    <View style={styles.container}>
      <Spinner visible={isLoadingMutate} />
      <View style={styles.main}>
        <View style={styles.option_item}>
          <View>
            <FontAwesome6
              style={styles.icon}
              name="bell"
              size={32}
              color={'black'}
            />
          </View>
          <View style={styles.title_description}>
            <Text style={styles.title_option}>Thông báo đẩy</Text>
            <Text style={styles.description_option}>
              Nhận thông báo khi không trong app hoặc không dùng thiết bị
            </Text>
          </View>
          <View>
            <Switch
              style={{transform: [{scaleX: 1.3}, {scaleY: 1.3}]}}
              trackColor={{false: '#767577', true: '#81b0ff'}}
              thumbColor={
                switchEnabledState.notification_on === '1'
                  ? '#1355bf'
                  : '#f4f3f4'
              }
              onValueChange={() =>
                toggleSwitch(
                  'notification_on',
                  switchEnabledState.notification_on === '1' ? '0' : '1',
                )
              }
              value={switchEnabledState.notification_on === '1'}
            />
          </View>
        </View>
        <View style={styles.option_item}>
          <View>
            <MaterialCommunityIcons
              style={styles.icon}
              name="vibrate"
              size={28}
              color={'black'}
            />
          </View>
          <View style={styles.title_description}>
            <Text style={styles.title_option}>Rung</Text>
            <Text style={styles.description_option}>
              Rung khi có thông báo đến
            </Text>
          </View>
          <View>
            <Switch
              style={{transform: [{scaleX: 1.3}, {scaleY: 1.3}]}}
              trackColor={{false: '#767577', true: '#81b0ff'}}
              thumbColor={
                switchEnabledState.vibrant_on === '1' ? '#1355bf' : '#f4f3f4'
              }
              onValueChange={() =>
                toggleSwitch(
                  'vibrant_on',
                  switchEnabledState.vibrant_on === '1' ? '0' : '1',
                )
              }
              value={switchEnabledState.vibrant_on === '1'}
            />
          </View>
        </View>
        <View style={styles.option_item}>
          <View>
            <MaterialCommunityIcons
              style={styles.icon}
              name="lightning-bolt"
              size={32}
              color={'black'}
            />
          </View>
          <View style={styles.title_description}>
            <Text style={styles.title_option}>Đèn LED điện thoại</Text>
            <Text style={styles.description_option}>
              Nhấp nháy đèn LED khi có thông báo đến
            </Text>
          </View>
          <View>
            <Switch
              style={{transform: [{scaleX: 1.3}, {scaleY: 1.3}]}}
              trackColor={{false: '#767577', true: '#81b0ff'}}
              thumbColor={
                switchEnabledState.led_on === '1' ? '#1355bf' : '#f4f3f4'
              }
              onValueChange={() =>
                toggleSwitch(
                  'led_on',
                  switchEnabledState.led_on === '1' ? '0' : '1',
                )
              }
              value={switchEnabledState.led_on === '1'}
            />
          </View>
        </View>
        <View style={styles.option_item}>
          <View>
            <AntDesign
              style={styles.icon}
              name="sound"
              size={28}
              color={'black'}
            />
          </View>
          <View style={styles.title_description}>
            <Text style={styles.title_option}>Âm thanh</Text>
            <Text style={styles.description_option}>
              Phát âm thanh khi có thông báo đến
            </Text>
          </View>
          <View>
            <Switch
              style={{transform: [{scaleX: 1.3}, {scaleY: 1.3}]}}
              trackColor={{false: '#767577', true: '#81b0ff'}}
              thumbColor={
                switchEnabledState.sound_on === '1' ? '#1355bf' : '#f4f3f4'
              }
              onValueChange={() =>
                toggleSwitch(
                  'sound_on',
                  switchEnabledState.sound_on === '1' ? '0' : '1',
                )
              }
              value={switchEnabledState.sound_on === '1'}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  main: {
    paddingHorizontal: 20,
    display: 'flex',
    flexDirection: 'column',
    paddingVertical: 20,
    gap: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
    borderBottomStyle: 'solid',
  },
  option_item: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 60,
  },
  title_description: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    marginRight: 10,
  },
  title_option: {
    color: 'black',
    fontWeight: '500',
    fontSize: 18,
  },
  description_option: {
    fontSize: 16,
    fontWeight: '400',
    width: 250,
  },
});

export default SettingPushScreen;
