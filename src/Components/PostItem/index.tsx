import React from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';

import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {TPost} from '@/types/post.type';
import {useFeelMutation} from '@/Redux/api/comment';
import {useNavigation} from '@react-navigation/native';
import {ScreenNavigationProp} from '@/Routes/Stack';
import {calculateTimeDifference} from '@/Utils';
import ListImageZoomable from '../ListImageZoomable';
import ImageViewer from 'react-native-image-zoom-viewer';

type Props = {
  item: TPost;
  handleTouchHeader: (post: any) => void;
  handleTouchThreeDot: (post: any) => void;

  handleShowComment: () => void;
};
const PostItem = React.memo(
  ({item, handleTouchHeader, handleTouchThreeDot}: Props) => {
    const [mutateFeel, {isLoading}] = useFeelMutation();
    const [feel, setFeel] = React.useState<string>(item.feel);
    const [isFelt, setIsFelt] = React.useState<string>(item.is_felt);

    const {author, described, image, created} = item;
    const imgSrc =
      author.avatar.length > 0
        ? {uri: author.avatar}
        : require('@/Assets/Images/Avatar.png');

    const handleFeelLike = () => {
      mutateFeel({id: item.id, type: String(1)})
        .unwrap()
        .then(({message}) => {
          setFeel(feel => String(Number(feel) + 1));
          setIsFelt('1');
        })
        .catch(err => {
          console.log(err);
        });
    };
    const handleFeelDislike = () => {
      mutateFeel({id: item.id, type: String(0)})
        .unwrap()
        .then(({message}) => {
          setFeel(feel => String(Number(feel) + 1));
          setIsFelt('0');
        })
        .catch(err => {
          console.log(err);
        });
    };
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.header}
          onPress={() => handleTouchHeader(item)}>
          <View style={styles.row}>
            <Image style={styles.avatarImg} source={imgSrc} />
            <View style={{paddingLeft: 10}}>
              <Text style={styles.user}>{author.name}</Text>
              <View style={styles.row}>
                <Text style={styles.time}>
                  {calculateTimeDifference(created)}
                </Text>
                <Entypo name="dot-single" size={12} color="#747476" />
                <Entypo name="globe" size={10} color="#747476" />
              </View>
            </View>
          </View>
          <TouchableOpacity onPress={() => handleTouchThreeDot(item)}>
            <Entypo name="dots-three-horizontal" size={25} color="#222121" />
          </TouchableOpacity>
        </TouchableOpacity>
        <Text style={styles.post}>{described}</Text>
        {image.length > 0 && <ListImageZoomable images={image.slice(0, 4)} />}
        <View style={styles.footer}>
          <View style={styles.separator} />
          <View style={styles.footerMenu}>
            <View style={[styles.row, {flex: 2}]}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => handleFeelLike()}>
                <View style={styles.icon}>
                  <AntDesign
                    name={isFelt === '1' ? 'like1' : 'like2'}
                    size={20}
                    color="#424040"
                  />
                </View>
              </TouchableOpacity>
              <Text style={[styles.text]}>{feel}</Text>
              <TouchableOpacity
                style={styles.button}
                onPress={() => handleFeelDislike()}>
                <View style={styles.icon}>
                  <AntDesign
                    name={isFelt === '0' ? 'dislike1' : 'dislike2'}
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
              <Text style={styles.text}>{item.comment_mark}</Text>
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
  },
);

export default PostItem;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // flexDirection: 'row',
    // flexWrap: 'wrap',
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
});
