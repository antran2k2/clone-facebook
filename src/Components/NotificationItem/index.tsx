import React, {useState} from 'react';
import {
  View,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Text,
} from 'react-native';
import Modal from 'react-native-modal';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faSquareXmark} from '@fortawesome/free-solid-svg-icons';
import {faMinus} from '@fortawesome/free-solid-svg-icons';

export default function NotificationItem({notification}) {
  const [showNotiPopup, setShowNotiPopup] = useState<Notification | null>(null);
  const handleCancelPopup = () => {
    setShowNotiPopup(null);
  };
  if (notification.type !== '1') {
    return (
      <View>
        {!!showNotiPopup && (
          <Modal
            // transparent={true}
            style={{
              ...styles.Popup,
              margin: 0,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            }}
            hasBackdrop={true}
            isVisible={!!showNotiPopup}
            onBackdropPress={() => {
              setShowNotiPopup(null);
            }}>
            <View style={{flex: 1}}>
              {/* justifyContent: "flex-end" */}
              <View
                style={{
                  backgroundColor: 'white',
                  padding: 20,
                  width: windowWidth,
                }}>
                <View
                  style={{
                    ...styles.popupIconPull,
                    display: 'flex',
                    flexDirection: 'row',
                    marginTop: -12,
                    transform: 'translateY(-10px)',
                  }}>
                  <FontAwesomeIcon
                    icon={faMinus}
                    size={20}
                    color="#c9c8cd"
                    style={{marginRight: -8}}
                  />
                  <FontAwesomeIcon
                    icon={faMinus}
                    size={20}
                    color="#c9c8cd"
                    style={{marginRight: -8}}
                  />
                  <FontAwesomeIcon
                    icon={faMinus}
                    size={20}
                    color="#c9c8cd"
                    style={{marginRight: -8}}
                  />
                  <FontAwesomeIcon
                    icon={faMinus}
                    size={20}
                    color="#c9c8cd"
                    style={{marginRight: -8}}
                  />
                  <FontAwesomeIcon icon={faMinus} size={20} color="#c9c8cd" />
                </View>
                <ImageBackground
                  imageStyle={{borderRadius: 64}}
                  style={styles.avatarPopup}
                  source={
                    notification.user.avatar
                      ? {
                          uri: notification.user.avatar,
                        }
                      : require('@/Assets/Images/Avatar.png')
                  }>
                  <View style={{...styles.notificationIcon}}>
                    <FontAwesome5Icon />
                  </View>
                </ImageBackground>
                <Text style={{...styles.contentPopup}}>
                  {notification.user.username}
                  {notification.content}
                </Text>
                <View style={styles.containerline}>
                  <View style={styles.line} />
                </View>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <View style={{...styles.popupIcon}}>
                    <FontAwesomeIcon icon={faSquareXmark} size={20} />
                  </View>
                  <Text style={styles.popupOption}>Gỡ thông báo này</Text>
                </View>
              </View>
            </View>
          </Modal>
        )}

        <TouchableOpacity
          style={{
            ...styles.container,
            backgroundColor: notification.read === '0' ? '#ebf1fd' : '#ffffff',
          }}>
          <ImageBackground
            imageStyle={{borderRadius: 64}}
            style={styles.avatar}
            source={
              notification.user.avatar
                ? {
                    uri: notification.user.avatar,
                  }
                : require('@/Assets/Images/Avatar.png')
            }>
            <View style={{...styles.notificationIcon}}>
              <FontAwesome5Icon />
            </View>
          </ImageBackground>
          <View style={styles.contentWrapper}>
            {/* <Description /> */}
            <Text>
              <Text style={{fontWeight: 'bold'}}>
                {notification.user?.username}
              </Text>
              {notification.content}
            </Text>
            <Text style={{color: '#aaa'}}>
              {notification.createdAtConverted}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.btnOptions}
            onPress={e => {
              e.stopPropagation();
              setShowNotiPopup(notification);
            }}>
            <FontAwesome5Icon name="ellipsis-h" />
          </TouchableOpacity>
        </TouchableOpacity>
      </View>
    );
  } else {
    // trường hợp noti là lmkb
    return (
      <View
      //  style={{ backgroundColor: "rgba(0,0,0,0.3)" }}
      >
        <TouchableOpacity
          style={{
            ...styles.container,
            backgroundColor: notification.read === '0' ? '#ebf1fd' : '#ffffff',
          }}>
          <ImageBackground
            imageStyle={{borderRadius: 64}}
            style={styles.avatar}
            source={
              notification.user.avatar
                ? {
                    uri: notification.user.avatar,
                  }
                : require('@/Assets/Images/Avatar.png')
            }>
            <View style={{...styles.notificationIcon}}>
              <FontAwesome5Icon />
            </View>
          </ImageBackground>
          <View style={styles.contentWrapper}>
            {/* <Description /> */}
            <Text>
              <Text style={{fontWeight: 'bold'}}>
                {notification.user?.username}
              </Text>
              {notification.content}
            </Text>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                marginBottom: 5,
                marginTop: 5,
              }}>
              <TouchableOpacity
                style={{
                  backgroundColor: '#1778F2',
                  paddingTop: 8,
                  paddingBottom: 8,
                  paddingLeft: 16,
                  paddingRight: 16,
                  borderRadius: 8,
                  marginRight: 8,
                  flex: 1,
                }}
                // onPress={handleAccept}
              >
                <Text
                  style={{
                    color: '#fff',
                    fontSize: 16,
                    fontWeight: '600',
                    textAlign: 'center',
                  }}>
                  Xác nhận
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor:
                    notification.read === '0' ? '#dee4f0' : '#e4e5ea',
                  paddingTop: 8,
                  paddingBottom: 8,
                  paddingLeft: 16,
                  paddingRight: 16,
                  borderRadius: 8,
                  flex: 1,
                }}
                // onPress={handleReject}
              >
                <Text
                  style={{
                    color: '#000',
                    fontSize: 16,
                    fontWeight: '600',
                    textAlign: 'center',
                  }}>
                  Xoá
                </Text>
              </TouchableOpacity>
            </View>
            <Text style={{color: '#aaa'}}>
              {notification.createdAtConverted}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.btnOptions}
            onPress={e => {
              e.stopPropagation();
              setShowNotiPopup(notification);
            }}>
            <FontAwesome5Icon name="ellipsis-h" />
          </TouchableOpacity>
        </TouchableOpacity>
      </View>
    );
  }
}

const windowHeight = Math.round(Dimensions.get('window').height);
const windowWidth = Math.round(Dimensions.get('window').width);

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    flexDirection: 'row',
    display: 'flex',
    alignItems: 'center',
  },
  avatar: {
    height: 64,
    width: 64,
    position: 'relative',
    borderRadius: 64,
    borderColor: '#ddd',
    borderWidth: 0.5,
  },
  contentWrapper: {
    width: windowWidth - 40 - 30 - 64,
    paddingHorizontal: 10,
  },
  mainContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  btnOptions: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignContent: 'center',
    transform: [{translateX: 12}],
  },
  pureTxt: {
    fontSize: 16,
  },
  hightlightTxt: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  notificationIcon: {
    position: 'absolute',
    bottom: -5,
    right: -5,
    height: 25,
    width: 25,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Popup: {
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
  containerline: {
    marginTop: 6,
    marginBottom: 6,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  line: {
    width: Dimensions.get('window').width * 0.85,
    height: 1,
    backgroundColor: '#dbdbdb',
    marginBottom: 6,
  },
  avatarPopup: {
    height: 68,
    width: 68,
    position: 'relative',
    borderRadius: 64,
    borderColor: '#ddd',
    borderWidth: 0.5,
    marginBottom: 8,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  contentPopup: {
    textAlign: 'center',
    marginBottom: 6,
  },
  popupIcon: {
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e4e5ea',
    borderRadius: 40,
  },
  popupOption: {
    fontWeight: '600',
    paddingLeft: 20,
  },
  popupIconPull: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    fontWeight: '1',
  },
});
