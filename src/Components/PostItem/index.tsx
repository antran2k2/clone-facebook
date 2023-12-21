import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';

import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {TPost} from '@/types/post.type';
import {useFeelMutation, useDeleteFeelMutation} from '@/Redux/api/comment';
import {useNavigation} from '@react-navigation/native';
import {ScreenNavigationProp} from '@/Routes/Stack';
import {calculateTimeDifference} from '@/Utils';
import ListImageZoomable from '../ListImageZoomable';
import ImageViewer from 'react-native-image-zoom-viewer';
import VideoPlayer from 'react-native-video-player';
const width = Dimensions.get('window').width;

type Props = {
  item: TPost;
  handleTouchThreeDot: (post: TPost) => void;

  handleShowComment: () => void;
};
const PostItem = React.memo(
  ({item, handleTouchThreeDot, handleShowComment}: Props) => {
    const navigation = useNavigation<ScreenNavigationProp>();

    const handleTouchHeader = (item: any) => {
      navigation.navigate('PostDetail', {postId: item.id});
    };

    const {author, described, image, created, video, state} = item;
    const imgSrc = author.avatar
      ? {uri: author.avatar}
      : require('@/Assets/Images/Avatar.png');

    const [mutateFeel, {isLoading}] = useFeelMutation();
    const [mutateDeleteFeel, {isLoading: isLoadingDelete}] =
      useDeleteFeelMutation();
    const [feel, setFeel] = React.useState<string>(item.feel);
    const [isFelt, setIsFelt] = React.useState<string>(item.is_felt);
    const handleFeelLike = () => {
      if (isFelt === '1') {
        mutateDeleteFeel({id: item.id})
          .unwrap()
          .then(res => {
            setFeel(feel =>
              String(Number(res.data.disappointed) + Number(res.data.kudos)),
            );
            setIsFelt('-1');
            console.log(res);
          })
          .catch(err => {
            console.log(err);
          });
        return;
      }
      mutateFeel({id: item.id, type: String(1)})
        .unwrap()
        .then(res => {
          setFeel(feel =>
            String(Number(res.data.disappointed) + Number(res.data.kudos)),
          );
          setIsFelt('1');
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    };
    const handleFeelDislike = () => {
      if (isFelt === '0') {
        mutateDeleteFeel({id: item.id})
          .unwrap()
          .then(res => {
            setFeel(feel =>
              String(Number(res.data.disappointed) + Number(res.data.kudos)),
            );
            setIsFelt('-1');
            console.log(res);
          })
          .catch(err => {
            console.log(err);
          });
        return;
      }
      mutateFeel({id: item.id, type: String(0)})
        .unwrap()
        .then(res => {
          setFeel(feel =>
            String(Number(res.data.disappointed) + Number(res.data.kudos)),
          );
          setIsFelt('0');
          console.log(res);
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
            <View style={{flex: 1}}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('ProfileFriend', {id: author.id})
                }>
                <Image style={styles.avatarImg} source={imgSrc} />
              </TouchableOpacity>
            </View>
            <View style={{flex: 7}}>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.user}>
                  {author.name}
                  {state && (
                    <Text
                      style={{
                        color: '#999',
                        fontSize: 14,
                        fontWeight: 'normal',
                      }}>
                      {' '}
                      đang cảm thấy {state}
                    </Text>
                  )}
                </Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.time}>
                  {calculateTimeDifference(created)}
                </Text>
                <Entypo name="dot-single" size={12} color="#747476" />
                <Entypo name="globe" size={10} color="#747476" />
              </View>
            </View>
          </View>
          <View style={{flex: 0}}>
            <TouchableOpacity onPress={() => handleTouchThreeDot(item)}>
              <Entypo name="dots-three-horizontal" size={25} color="#222121" />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
        <Text style={styles.post}>{described}</Text>
        {image?.length > 0 && <ListImageZoomable images={image.slice(0, 4)} />}
        {video && (
          <VideoPlayer
            style={{width: width, height: width * 1.5}}
            video={{
              uri: video?.url,
            }}
            showDuration={true}
            pauseOnPress={true}
          />
        )}
        <View style={styles.footer}>
          <View style={styles.separator} />
          <View style={styles.footerMenu}>
            <View style={[styles.row, {flex: 2}]}>
              <TouchableOpacity
                style={{...styles.button, marginRight: 0}}
                onPress={() => handleFeelLike()}>
                <View style={styles.icon}>
                  <AntDesign
                    name={isFelt === '1' ? 'like1' : 'like2'}
                    size={20}
                    color="#424040"
                  />
                </View>
              </TouchableOpacity>
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
              <Text style={{...styles.text, marginLeft: 8}}>{feel}</Text>
            </View>
            <TouchableOpacity
              style={[styles.button, {flex: 1}]}
              onPress={() => handleShowComment()}>
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
    marginRight: 20,
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
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222121',
  },
  time: {
    fontSize: 9,
    color: '#747476',
  },
  post: {
    fontSize: 14,
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
    paddingHorizontal: 5,
    height: 60,
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
    borderColor: '#ddd',
    borderWidth: 1,
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
    fontSize: 14,
    color: '#000',
    fontWeight: '600',
  },
});
