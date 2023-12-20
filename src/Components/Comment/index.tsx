import { calculateTimeDifference } from '@/Utils';
import React, { useState } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  Dimensions,
  StyleSheet,
} from 'react-native';
// const comment = {
//   id: "1",
//   mark_content: "Thông tin trên thật là hứu ích. Đây là thông tin thật",
//   type_of_mark: "1",
//   created: "2023-01-01T12:00:00Z",
//   poster: {
//     id: "101",
//     name: "user1",
//     avatar: "https://thuthuatnhanh.com/wp-content/uploads/2020/10/anh-dai-dien-ca-tinh-dac-biet-ke-bi-an-trum-mu.jpg"
//   },
//   comments: [
//     {
//       content: "Comment 1",
//       created: "2023-01-01T12:05:00Z",
//       poster: {
//         id: "201",
//         name: "commenter1",
//         avatar: "https://thuthuatnhanh.com/wp-content/uploads/2021/02/Avatar-cho-con-gai-chat-lu.jpg"
//       }
//     },
//     {
//       content: "Comment 2",
//       created: "2023-01-01T12:10:00Z",
//       poster: {
//         id: "202",
//         name: "commenter2",
//         avatar: "https://thuthuatnhanh.com/wp-content/uploads/2018/07/anh-avatar-dep.jpg"
//       }
//     }
//   ]
// }

interface IMyProps {
  comment: {
    id: string;
    mark_content: string;
    type_of_mark: string;
    created: string;
    poster: {
      id: string;
      name: string;
      avatar: string;
    };
    comments: {
      content: string;
      created: string;
      poster: {
        id: string;
        name: string;
        avatar: string;
      };
    }[];
  },
  focus: (id: string) => void
}
const Comment: React.FC<IMyProps> = (props) => {
  const COLOR_TRUST = '#03AC13'
  const COLOR_FAKE = '#CA3433'

  const [comment, setComment] = useState(props.comment)

  const handleReply = () => {
    const markId = props.comment.id
    props.focus(markId);
  }
  return (
    <View>
      <View style={styles.container}>
        <Image style={styles.avatar} source={{ uri: comment.poster.avatar }}></Image>
        <View style={styles.centerContainer}>
          <View
            style={comment.type_of_mark === '1' ? {
              ...styles.contentContainer, borderColor: COLOR_TRUST,
              borderWidth: 2
            } : {
              ...styles.contentContainer, borderColor: COLOR_FAKE,
              borderWidth: 2
            }}
          >
            <TouchableOpacity><Text style={styles.name}>{comment.poster.name}</Text></TouchableOpacity>
            <Text style={styles.content}>{comment.mark_content}</Text>
          </View>
          <View style={styles.toolContainer}>
            <Text style={{
              fontSize: 13,
              color: '#747476',
              marginRight: 12
            }}>{calculateTimeDifference(comment.created)}</Text>
            <TouchableOpacity style={styles.likeBtn}>
              <Text style={{
                fontSize: 13,
                color: '#000',
                fontWeight: '600'
              }}>Thích</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.replyBtn}
              onPress={handleReply}>
              <Text style={{
                fontSize: 13,
                color: '#000',
                fontWeight: '600'
              }}>Phản hồi</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {comment.comments.length > 0 && comment.comments.map((reply, index) => (
        <View key={index} style={{
          flexDirection: 'row',
          marginBottom: 10, marginLeft: 20
        }}>
          <Image style={{
            width: 29,
            height: 29,
            borderRadius: 50,
            marginRight: 10,
          }} source={{ uri: reply.poster.avatar }}></Image>
          <View style={styles.centerContainer}>
            <View style={styles.contentContainer}>
              <TouchableOpacity><Text style={styles.name}>{reply.poster.name}</Text></TouchableOpacity>
              <Text style={styles.content}>{reply.content}</Text>
            </View>
            <View style={styles.toolContainer}>
              <Text style={{
                fontSize: 13,
                color: '#747476',
                marginRight: 12
              }}>{calculateTimeDifference(reply.created)}</Text>
              <TouchableOpacity style={styles.likeBtn}>
                <Text style={{
                  fontSize: 13,
                  color: '#000',
                  fontWeight: '600'
                }}>Thích</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.replyBtn}>
                <Text style={{
                  fontSize: 13,
                  color: '#000',
                  fontWeight: '600'
                }}>Phản hồi</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ))}
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
    width: screenWidth * 0.65,
  },
  contentContainer: {
    marginBottom: 6,
    padding: 4,
    paddingLeft: 10,
    // paddingTop: 5,
    backgroundColor: '#e9ebee',
    borderRadius: 20,
  },
  name: {
    fontWeight: 'bold',
    color: '#000'
  },
  content: {},
  image: {
    borderRadius: 10,
  },
  toolContainer: {
    marginTop: 3,
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: 0.6 * screenWidth,
  },
  // createAt: {
  //   flex: 1,
  // },
  likeBtn: {
    textAlign: 'center',
    flex: 1,
  },
  replyBtn: {
    textAlign: 'center',
    flex: 1,
  },
});

export default Comment;
