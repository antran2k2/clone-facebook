import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Animated,
  Easing,
  BackHandler,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {ScreenNavigationProp} from '@/Routes/Stack';
import {useAppSelector} from '@/Redux/store';
import useLogout from '@/Hooks/useLogout';
import RNExitApp from 'react-native-exit-app';

const SettingTabScreen = () => {
  const {avatar, username} = useAppSelector(state => state.info);
  const {handleLogout} = useLogout();
  const navigation = useNavigation<ScreenNavigationProp>();

  const [helpExpanded, setHelpExpanded] = useState(false);
  const [settingsExpanded, setSettingsExpanded] = useState(false);

  const helpArrowRotation = useRef(new Animated.Value(0)).current;
  const settingsArrowRotation = useRef(new Animated.Value(0)).current;

  const toggleHelpDropdown = () => {
    setHelpExpanded(!helpExpanded);
    animateArrowRotation(helpArrowRotation, helpExpanded);
  };

  const toggleSettingsDropdown = () => {
    setSettingsExpanded(!settingsExpanded);
    animateArrowRotation(settingsArrowRotation, settingsExpanded);
  };

  const animateArrowRotation = (
    arrowRotation: Animated.Value,
    isExpanded: boolean,
  ) => {
    Animated.timing(arrowRotation, {
      toValue: isExpanded ? 0 : 1,
      duration: 300,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  };
  const handleCloseApp = () => {
    RNExitApp.exitApp();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.tabName}>Menu</Text>
        </View>
        <TouchableOpacity style={styles.searchView}>
          <Image
            source={require('@/Assets/Images/SearchIcon.png')}
            style={styles.searchIcon}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.accountContainer}
        onPress={() => navigation.navigate('ProfileTab')}>
        <View style={styles.avatarFrame}>
          <Image
            // source={require('@/Assets/Images/avatar.jpg')}
            source={
              avatar ? {uri: avatar} : require('@/Assets/Images/Avatar.png')
            }
            style={styles.avatarImage}
          />
        </View>
        <View style={styles.accountName}>
          <Text style={styles.name}>{username}</Text>
          <Text style={styles.descriptionText}>Xem trang cá nhân của bạn</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.navbar}>
        <View style={styles.navbar_item}>
          <TouchableWithoutFeedback onPress={toggleHelpDropdown}>
            <View style={styles.dropdown_item}>
              <View style={styles.navbar_item_left_container}>
                <View>
                  <Image
                    source={require('@/Assets/Images/HelpIcon.png')}
                    style={styles.icon_item}
                  />
                </View>
                <View>
                  <Text style={styles.name_item}>Trợ giúp & hỗ trợ</Text>
                </View>
              </View>
              <View>
                <Animated.Image
                  source={require('@/Assets/Images/ArrowDown.png')}
                  style={[
                    styles.icon_dropdown,
                    {
                      transform: [
                        {
                          rotate: helpArrowRotation.interpolate({
                            inputRange: [0, 1],
                            outputRange: ['0deg', '180deg'],
                          }),
                        },
                      ],
                    },
                  ]}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
          {helpExpanded && (
            <TouchableOpacity style={styles.item_inside}>
              <View>
                <Image
                  source={require('@/Assets/Images/BookIcon.png')}
                  style={styles.icon_item_inside}
                />
              </View>
              <View>
                <Text style={styles.name_item_inside}>
                  Điều khoản & chính sách
                </Text>
              </View>
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.navbar_item}>
          <TouchableWithoutFeedback onPress={toggleSettingsDropdown}>
            <View style={styles.dropdown_item}>
              <View style={styles.navbar_item_left_container}>
                <View>
                  <Image
                    source={require('@/Assets/Images/SettingIcon.png')}
                    style={styles.icon_item}
                  />
                </View>
                <View>
                  <Text style={styles.name_item}>Cài đặt & quyền riêng tư</Text>
                </View>
              </View>
              <View>
                <Animated.Image
                  source={require('@/Assets/Images/ArrowDown.png')}
                  style={[
                    styles.icon_dropdown,
                    {
                      transform: [
                        {
                          rotate: settingsArrowRotation.interpolate({
                            inputRange: [0, 1],
                            outputRange: ['0deg', '180deg'],
                          }),
                        },
                      ],
                    },
                  ]}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
          {settingsExpanded && (
            <TouchableOpacity
              onPress={() => navigation.navigate('SettingAccount')}
              style={styles.item_inside}>
              <View>
                <Image
                  source={require('@/Assets/Images/UserIcon.png')}
                  style={styles.icon_item_inside}
                />
              </View>
              <View>
                <Text style={styles.name_item_inside}>Cài đặt</Text>
              </View>
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity style={styles.navbar_item} onPress={handleLogout}>
          <View style={styles.navbar_item_left_container}>
            <View>
              <Image
                source={require('@/Assets/Images/LogoutIcon.png')}
                style={styles.icon_item}
              />
            </View>
            <View>
              <Text style={styles.name_item}>Đăng xuất</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.exitButton} onPress={handleCloseApp}>
          <Text style={styles.actionText}>Thoát</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  tabName: {
    fontWeight: 'bold',
    fontSize: 30,
    color: 'black',
  },
  searchView: {
    backgroundColor: '#dddddd',
    padding: 10,
    borderRadius: 50,
  },
  searchIcon: {
    width: 24,
    height: 24,
  },
  accountContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 15,
    marginTop: 20,
    display: 'flex',
    flexDirection: 'row',
    elevation: 3,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 8,
    marginHorizontal: 20,
  },
  avatarFrame: {
    borderRadius: 50,
  },
  avatarImage: {
    width: 45,
    height: 45,
    borderRadius: 50,
  },
  accountName: {
    alignSelf: 'center',
    marginLeft: 15,
    display: 'flex',
    flexDirection: 'column',
  },
  name: {
    color: '#000000',
    fontSize: 18,
    fontWeight: '600',
  },
  descriptionText: {
    fontSize: 15,
    fontWeight: '500',
  },
  navbar: {
    marginTop: 35,
    width: '100%',
  },
  navbar_item: {
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderTopWidth: 1,
    borderTopColor: '#cccccc',
    borderTopStyle: 'solid',
  },
  navbar_item_left_container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  item_inside: {
    backgroundColor: '#ffffff',
    marginTop: 20,
    display: 'flex',
    flexDirection: 'row',
    borderRadius: 8,
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 15,
    elevation: 2,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 8,
  },
  icon_item: {
    width: 35,
    height: 35,
  },
  icon_item_inside: {
    width: 30,
    height: 30,
  },
  name_item: {
    fontWeight: '500',
    marginLeft: 20,
    fontSize: 20,
    color: '#000000',
  },
  name_item_inside: {
    fontWeight: '500',
    marginLeft: 10,
    fontSize: 18,
    color: '#000000',
  },
  icon_dropdown: {
    width: 18,
    height: 18,
  },
  dropdown_item: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  exitButton: {
    marginHorizontal: 20,
    marginTop: 10,
    backgroundColor: 'blue',
    padding: 12,
    borderRadius: 16,
    alignItems: 'center',
  },
  actionText: {
    fontSize: 22,
    color: 'white',
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default SettingTabScreen;
