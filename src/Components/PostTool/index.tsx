import React from 'react';
import {View, TouchableOpacity, Image, Text, StyleSheet} from 'react-native';
import FontAweSome5 from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/native';
import {ScreenNavigationProp} from '@/Routes/Stack';
import {useAppSelector} from '@/Redux/store';

const PostTool = () => {
  const {avatar, id: userId, username} = useAppSelector(state => state.info);

  const navigation = useNavigation<ScreenNavigationProp>();

  const onPress = () => {
    navigation.navigate('AddPost');
  };
  return (
    <View style={styles.container}>
      <View style={styles.postToolWrapper}>
        <TouchableOpacity activeOpacity={0.5}>
          <Image
            // source={require('@/Assets/Images/Avatar.png')}
            source={{uri: avatar || 'https://i.imgur.com/An9lt4E.png'}}
            defaultSource={require('@/Assets/Images/Avatar.png')}
            style={styles.avatarImg}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.postInputWrapper} onPress={onPress}>
          <View
            style={{
              ...styles.postInput,
            }}>
            <Text>What are u thinking?</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.5}>
          <FontAweSome5
            style={styles.postOptionIcon}
            name="image"
            color="green"
            size={16}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 64,
    borderTopColor: '#ddd',
    borderTopWidth: 1,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    marginTop: 10,
    backgroundColor: '#fff',
  },
  postToolWrapper: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  postOptionItemMiddle: {
    borderRightColor: '#ddd',
    borderRightWidth: 1,
    borderLeftColor: '#ddd',
    borderLeftWidth: 1,
  },
  postOptionIcon: {
    marginRight: 5,
  },
  postInputWrapper: {
    borderRadius: 48,
    flex: 1,
    marginLeft: 5,
  },
  postInput: {
    justifyContent: 'center',
    borderRadius: 48,
    height: 40,
    width: '100%',
    borderColor: '#ddd',
    paddingHorizontal: 10,
    borderWidth: 1,
  },
  avatarImg: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderColor: '#1777f2',
  },
});

export default PostTool;
