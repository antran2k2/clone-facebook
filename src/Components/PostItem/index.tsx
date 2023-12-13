import React from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';

import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {TPost} from '@/types/post.type';
// import Avatar from './Avatar';
type Props = {
  item: TPost;
};
const FeedItem = React.memo(({item}: Props) => {
  const {author, described, image, created} = item;
  const time = new Date(created).toLocaleTimeString();
  const imgSrc =
    author.avatar.length > 0
      ? {uri: author.avatar}
      : require('@/Assets/Images/Avatar.png');
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.row}>
          <Image style={styles.avatarImg} source={imgSrc} />
          <View style={{paddingLeft: 10}}>
            <Text style={styles.user}>{author.name}</Text>
            <View style={styles.row}>
              <Text style={styles.time}>{time}</Text>
              <Entypo name="dot-single" size={12} color="#747476" />
              <Entypo name="globe" size={10} color="#747476" />
            </View>
          </View>
        </View>
        <Entypo name="dots-three-horizontal" size={15} color="#222121" />
      </View>
      <Text style={styles.post}>{described}</Text>
      {image.length > 0 &&
        image.map((img, index) => (
          <Image key={index} style={styles.photo} source={{uri: img.url}} />
        ))}
      <View style={styles.footer}>
        <View style={styles.footerCount}>
          <View style={styles.row}>
            <View style={styles.iconCount}>
              <AntDesign name="like1" size={12} color="#FFFFFF" />
            </View>
            <Text style={styles.textCount}>{item.feel}</Text>
          </View>
          {item.comment_mark !== '0' && (
            <Text style={styles.textCount}>{item.comment_mark} comments</Text>
          )}
        </View>
        <View style={styles.separator} />
        <View style={styles.footerMenu}>
          <TouchableOpacity style={styles.button}>
            <View style={styles.icon}>
              <AntDesign name="like2" size={20} color="#424040" />
            </View>
            <Text style={styles.text}>Like</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <View style={styles.icon}>
              <MaterialCommunityIcons
                name="comment-outline"
                size={20}
                color="#424040"
              />
            </View>
            <Text style={styles.text}>Comment</Text>
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
    </View>
  );
});

export default FeedItem;
const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    marginRight: 6,
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
});
