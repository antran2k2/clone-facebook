/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react-native/no-inline-styles */
import {useEffect, useRef} from 'react';
import {Animated, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Header = ({translateY}: any) => {
  return (
    <Animated.View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: 'red',
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
      <Text>FACEBOOK</Text>
      <Icon
        name="search"
        size={24}
        color="white"
        onPress={() => {
          console.log('Search icon pressed');
        }}
      />
    </Animated.View>
  );
};
export default Header;
