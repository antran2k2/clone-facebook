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
import {RootStackParamList, ScreenNavigationProp} from '@/Routes/Stack';
const HeaderVideo = () => {
  const navigation = useNavigation<ScreenNavigationProp>();
  const handleOpenSearchScreen = () => {
    navigation.navigate('Search');
  };
  return (
    <View
      style={{
        // flexDirection: 'row',
        // justifyContent: 'space-around',
        width: '100%',

        //for animation
        height: 64,
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        elevation: 4,
        zIndex: 100,
        // paddingTop: 10,
      }}>
      <View style={styles.container}>
        <View style={styles.wrapperHeaderbar}>
          <Text
            style={{
              fontSize: 30,
              fontWeight: 'bold',
              color: '#222121',
            }}>
            Video
          </Text>
          <View style={styles.icon}>
            {/* <TouchableOpacity style={styles.iconItem}>
              <FontAwesomeIcon icon={faPlus} size={18} />
            </TouchableOpacity> */}
            <TouchableOpacity
              style={styles.iconItem}
              onPress={handleOpenSearchScreen}>
              <FontAwesome6Icon name="magnifying-glass" size={18} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};
export default HeaderVideo;
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
