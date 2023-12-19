import React from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  Dimensions,
  StyleSheet,
} from 'react-native';
export default function Comment({comment}: any) {
  //   const {comment} = props;
  return (
    <View style={styles.container}>
      <Image style={styles.avatar} source={{uri: comment.avatar_url}}></Image>
      <View style={styles.centerContainer}>
        <View style={styles.contentContainer}>
          <TouchableOpacity>
            <Text style={styles.name}>{comment.name}</Text>
          </TouchableOpacity>
          <Text style={styles.content}>{comment.content}</Text>
        </View>
        <Image
          width={screenWidth * 0.7}
          style={styles.image}
          source={comment.image}></Image>
        <View style={styles.toolContainer}>
          <Text style={styles.createAt}>{comment.create_at}</Text>
          <TouchableOpacity style={styles.likeBtn}>
            <Text>Like</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.replyBtn}>
            <Text>Reply</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
const screenWidth = Math.round(Dimensions.get('window').width);
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 50,
    marginRight: 10,
  },
  centerContainer: {
    width: screenWidth * 0.7,
  },
  contentContainer: {
    marginBottom: 10,
    padding: 10,
    paddingTop: 5,
    backgroundColor: '#e9ebee',
    borderRadius: 10,
  },
  name: {
    fontWeight: 'bold',
  },
  content: {},
  image: {
    borderRadius: 10,
  },
  toolContainer: {
    marginTop: 5,
    flexDirection: 'row',
    width: 0.6 * screenWidth,
  },
  createAt: {
    flex: 1,
  },
  likeBtn: {
    textAlign: 'center',
    flex: 1,
  },
  replyBtn: {
    textAlign: 'center',
    flex: 1,
  },
});
