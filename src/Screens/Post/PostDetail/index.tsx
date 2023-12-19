/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ScrollView,
  Image,
  TextInput,
} from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useGetPostQuery} from '@/Redux/api/post';
import {useFocusEffect} from '@react-navigation/native';
import PostItem from '@/Components/PostItem';
import mark from './data.json';
import Mark from '@/Components/Mark';

import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {TPost} from '@/types/post.type';
import {useFeelMutation} from '@/Redux/api/comment';
import {ScreenNavigationProp} from '@/Routes/Stack';
import {calculateTimeDifference} from '@/Utils';
const PostDetailScreen = () => {
  const navigation = useNavigation<ScreenNavigationProp>();
  const route = useRoute<any>();
  const {postId} = route.params;
  const onPressSearchHandler = () => {
    //handle To Screen Search
  };
  const {data, isLoading} = useGetPostQuery({id: postId});
  const post = data?.data;
  const onPressGoBackHandler = () => {
    navigation.goBack();
  };
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        navigation.goBack();
        return true;
      };
      return () => {};
    }, []),
  );
  const avatar = post?.author.avatar;

  const imgAvt =
    avatar && avatar.length > 0
      ? {uri: avatar}
      : require('@/Assets/Images/Avatar.png');
  return (
    <View style={styles.container}>
      <View style={styles.navigationBar}>
        <View style={styles.navigationBarLeft}>
          <TouchableOpacity
            onPress={onPressGoBackHandler}
            style={styles.btnBack}>
            <FontAwesome5Icon name="arrow-left" color="#000" size={20} />
          </TouchableOpacity>
          <Text style={styles.textNavigationBar}>{post?.author.name}</Text>
        </View>
        <TouchableOpacity onPress={onPressSearchHandler} style={styles.btnBack}>
          <FontAwesome5Icon name="search" color="#000" size={20} />
        </TouchableOpacity>
      </View>
      <ScrollView>
        <TouchableOpacity style={styles.header}>
          <View style={styles.row}>
            <Image style={styles.avatarImg} source={imgAvt} />
            <View style={{paddingLeft: 10}}>
              <Text style={styles.user}>{data?.data.author.name}</Text>
              <View style={styles.row}>
                <Text style={styles.time}>
                  {calculateTimeDifference(post?.created || '')}
                </Text>
                <Entypo name="dot-single" size={12} color="#747476" />
                <Entypo name="globe" size={10} color="#747476" />
              </View>
            </View>
          </View>
          <Entypo name="dots-three-horizontal" size={15} color="#222121" />
        </TouchableOpacity>
        <Text style={styles.post}>{post?.described}</Text>
        {post?.image &&
          post?.image
            .slice(0, 4)
            .map((img, index) => (
              <Image key={index} style={styles.photo} source={{uri: img.url}} />
            ))}
        <View style={styles.footer}>
          <View style={styles.separator} />
          <View style={styles.footerMenu}>
            <View style={[styles.row, {flex: 2}]}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  console.log(1);
                }}>
                <View style={styles.icon}>
                  <AntDesign
                    name={post?.is_felt === '1' ? 'like1' : 'like2'}
                    size={20}
                    color="#424040"
                  />
                </View>
              </TouchableOpacity>
              {/* <Text style={[styles.text]}>{feel}</Text> */}
              <TouchableOpacity style={styles.button}>
                <View style={styles.icon}>
                  <AntDesign
                    name={post?.is_felt === '0' ? 'dislike1' : 'dislike2'}
                    size={20}
                    color="#424040"
                  />
                </View>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={[styles.button, {flex: 1}]}>
              <View style={styles.icon}>
                <MaterialCommunityIcons
                  name="comment-outline"
                  size={20}
                  color="#424040"
                />
              </View>
              <Text style={styles.text}>{post?.trust}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <View style={styles.icon}>
                <MaterialCommunityIcons
                  name="share-outline"
                  size={20}
                  color="#424040"
                />
              </View>
              <Text style={styles.text}>Share</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.bottomDivider} />
        {mark.map((item, index) => (
          <Mark key={index} mark={item} />
        ))}
      </ScrollView>
      <TextInput
        placeholder="Viết bình luận..."
        editable
        multiline
        numberOfLines={4}
        style={styles.inputPost}
      />
    </View>
  );
};
export default PostDetailScreen;
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  navigationBar: {
    paddingTop: 12,
    flexDirection: 'row',
    height: 64,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  navigationBarLeft: {
    flexDirection: 'row',
  },
  textNavigationBar: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginLeft: 5,
  },
  btnBack: {
    width: 50,
    alignItems: 'center',
  },
  navigationTitle: {
    fontSize: 18,
  },
  searchToolWrapper: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  header: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 6,
    paddingHorizontal: 11,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarImg: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderColor: '#1777f2',
  },
  user: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#222121',
  },
  time: {
    fontSize: 9,
    color: '#747476',
  },
  post: {
    fontSize: 12,
    color: '#222121',
    lineHeight: 16,
    padding: 0,
    paddingHorizontal: 11,
  },
  photo: {
    marginTop: 9,
    width: '100%',
    height: 300,
  },
  footer: {
    padding: 0,
    paddingHorizontal: 11,
  },
  footerCount: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 9,
  },
  iconCount: {
    backgroundColor: '#1878f3',
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 6,
  },
  textCount: {
    fontSize: 11,
    color: '#424040',
  },
  separator: {
    width: '100%',
    height: 1,
    backgroundColor: '#f9f9f9',
  },
  footerMenu: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 9,
  },
  button: {
    flexDirection: 'row',
  },
  icon: {
    marginRight: 10,
    marginLeft: 10,
  },
  bottomDivider: {
    width: '100%',
    height: 9,
    backgroundColor: '#f0f2f5',
  },
  text: {
    fontSize: 12,
    color: '#424040',
  },
  inputPost: {
    backgroundColor: '#E6E6E6',
    color: '#121212',
    // height: 150,
    marginTop: 27,
    margin: 16,
  },
});
