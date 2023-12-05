import React from 'react';
import {View, TouchableOpacity, Image, Text, StyleSheet} from 'react-native';
import FontAweSome5 from 'react-native-vector-icons/FontAwesome5';

const PostTool = () => {
  //   const [post, setPost] = useState({
  //     title: '',
  //     body: '',
  //   });

  //   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //     setPost({
  //       ...post,
  //       [e.target.name]: e.target.value,
  //     });
  //   };

  //   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //     e.preventDefault();
  //     console.log(post);
  //   };

  return (
    <View style={styles.container}>
      <View style={styles.postToolWrapper}>
        <TouchableOpacity activeOpacity={0.5} style={styles.userAvatarWrapper}>
          <Image
            // source={{uri: user.avatar_url}}
            source={require('@/Assets/Images/Avatar.png')}
            style={styles.userAvatar}
          />
        </TouchableOpacity>
        <TouchableOpacity
          //   onPress={
          //     isWriteToAnyOne
          //       ? this.onPressPostToAnyOneHandler.bind(this)
          //       : this.onFullPostToolPressHandler
          //   }
          style={styles.postInputWrapper}>
          <View
            style={{
              ...styles.postInput,
              //   backgroundColor: this.state.inputBgColor,
            }}>
            <Text>What are you thinking?{'\n'}Muốn gì nữa không?</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.postOptionsWrapper}>
        <TouchableOpacity
          //   onPress={this.onLiveStreamPressHandler}
          activeOpacity={0.5}
          style={styles.postOptionItemWrapper}>
          <View style={styles.postOptionItem}>
            <FontAweSome5
              style={styles.postOptionIcon}
              name="video"
              color="red"
              size={16}
            />
            <Text>Live Stream</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          //   onPress={
          //     isWriteToAnyOne || isWriteToPage
          //       ? this.onPressPostToAnyOneHandler.bind(this)
          //       : this.onPhotoUploaderPressHandler
          //   }
          activeOpacity={0.5}
          style={styles.postOptionItemWrapper}>
          <View
            style={{...styles.postOptionItem, ...styles.postOptionItemMiddle}}>
            <FontAweSome5
              style={styles.postOptionIcon}
              name="image"
              //   name={isWriteToAnyOne || isWriteToPage ? 'edit' : 'image'}
              color="green"
              size={16}
            />
            <Text>
              {/* {isWriteToAnyOne || isWriteToPage ? 'Write a post' : 'Photo'} */}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          //   onPress={
          //     isWriteToAnyOne || isWriteToPage
          //       ? this.onPressSharePhotoToAnyOne.bind(this)
          //       : this.onCheckInPressHandler
          //   }
          activeOpacity={0.5}
          style={styles.postOptionItemWrapper}>
          <View style={styles.postOptionItem}>
            <FontAweSome5
              style={styles.postOptionIcon}
              //   name={
              //     isWriteToAnyOne || isWriteToPage ? 'image' : 'map-marker-alt'
              //   }
              name="image"
              color="red"
              size={16}
            />
            <Text>
              {/* {isWriteToAnyOne || isWriteToPage ? 'Share Photos' : 'Check in'} */}
            </Text>
          </View>
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
  },
  postOptionsWrapper: {
    flexDirection: 'row',
    height: 40,
    borderTopColor: '#ddd',
    borderTopWidth: 1,
    alignItems: 'center',
  },
  postOptionItemWrapper: {
    flex: 1,
    height: 40,
    justifyContent: 'center',
  },
  postOptionItem: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
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
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 50,
  },
  userAvatarWrapper: {},
});

export default PostTool;
