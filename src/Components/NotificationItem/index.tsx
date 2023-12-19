import React from 'react';
import {
  View,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Text,
} from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

export default function NotificationItem({notification}) {
  if (notification.type !== '1') {
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
            source={{
              uri: notification.target.avatar,
            }}>
            <View style={{...styles.notificationIcon}}>
              {/* <FontAwesome5Icon /> */}
            </View>
          </ImageBackground>
          <View style={styles.contentWrapper}>
            {/* <Description /> */}
            <Text>
              <Text style={{fontWeight: 'bold'}}>
                {notification.target?.username}
              </Text>
              {notification.content}
            </Text>
            <Text style={{color: '#aaa'}}>
              {notification.createdAtConverted}
            </Text>
          </View>
          <TouchableOpacity style={styles.btnOptions}>
            <FontAwesome5Icon name="ellipsis-h" />
          </TouchableOpacity>
        </TouchableOpacity>
      </View>
    );
  } else {
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
            source={{
              uri: notification.target.avatar,
            }}>
            <View style={{...styles.notificationIcon}}>
              {/* <FontAwesome5Icon /> */}
            </View>
          </ImageBackground>
          <View style={styles.contentWrapper}>
            {/* <Description /> */}
            <Text>
              <Text style={{fontWeight: 'bold'}}>
                {notification.target?.username}
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
          <TouchableOpacity style={styles.btnOptions}>
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
});
