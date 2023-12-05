/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react-native/no-inline-styles */
import {
  MaterialTopTabBar,
  MaterialTopTabBarProps,
  MaterialTopTabView,
} from '@react-navigation/material-top-tabs';
import React from 'react';
import {
  Animated,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Header from '../Header';
import {SafeAreaView} from 'react-native-safe-area-context';
const sizes = Dimensions.get('window');

const Tabbar = ({state, navigation}: MaterialTopTabBarProps) => {
  const iconNames = [
    'home',
    'user-friends',
    'video',
    'bell',
    'user-circle',
    'bars',
  ];
  const offsetAnimation = React.useRef(new Animated.Value(0)).current;

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          height: 60,
          backgroundColor: '#fff',
          // top: 64,
          // position: 'absolute',
        }}>
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;
          if (isFocused) {
            Animated.spring(offsetAnimation, {
              toValue: index * (sizes.width / state.routes.length),
              useNativeDriver: true,
            }).start();
          }
          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const iconName = iconNames[index] || 'circle'; // Đặt tên icon mặc định nếu không có tên được cung cấp

          return (
            <TouchableOpacity
              key={index}
              onPress={onPress}
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Animated.View>
                <Icon
                  name={iconName}
                  size={24}
                  color={isFocused ? '#007AFF' : '#222'}
                />
              </Animated.View>
            </TouchableOpacity>
          );
        })}
        <Animated.View
          style={[
            styles.indicator,
            {
              transform: [
                {
                  translateX: offsetAnimation,
                },
              ],
            },
          ]}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 0, position: 'relative'},
  indicator: {
    position: 'absolute',
    width: 20,
    height: 3,
    left: sizes.width / 6 / 2 - 10,
    bottom: 0,
    backgroundColor: 'black',
    zIndex: 100,
  },
});
export default Tabbar;
