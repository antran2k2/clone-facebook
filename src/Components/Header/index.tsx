/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react-native/no-inline-styles */
import {useEffect, useRef} from 'react';
import {
  Animated,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome6Icon from 'react-native-vector-icons/FontAwesome6';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '@/Routes/Stack';
const Header = ({translateY}: any) => {
  const navigation = useNavigation<ScreenNavigationProp>();
  const handleOpenSearchScreen = () => {
    navigation.navigate('Search');
  };
  return (
    <Animated.View
      style={{
        // flexDirection: 'row',
        // justifyContent: 'space-around',
        width: '100%',

        //for animation
        height: 64,
        transform: [{translateY: translateY}],
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        elevation: 4,
        zIndex: 100,
      }}>
      <View style={styles.container}>
        <View style={styles.wrapperHeaderbar}>
          <Image
            style={styles.facebookLogo}
            source={require('@/Assets/Images/logoHeader.png')}
          />
          <View style={styles.icon}>
            {/* <TouchableOpacity style={styles.iconItem}>
              <FontAwesomeIcon icon={faPlus} size={18} />
            </TouchableOpacity> */}
            <TouchableOpacity
              style={styles.iconItem}
              onPress={handleOpenSearchScreen}>
              <FontAwesome6Icon name="magnifying-glass" size={18} />
            </TouchableOpacity>
            <TouchableOpacity
              // style={styles.messengerIconWrapper}
              //   onPress={handleOpenChatScreen}
              style={styles.iconItem}>
              <MaterialCommunityIcons name="facebook-messenger" size={18} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Animated.View>
  );
};
export default Header;
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    // width: windowWidth,
  },
  wrapperHeaderbar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 15,
  },
  icon: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: 'auto',
  },
  facebookLogo: {
    width: 150,
    height: 60,
  },
  iconItem: {
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ddd',
    borderRadius: 40,
    marginLeft: 8,
  },
});
