import {TFriend, TUserFriend} from '@/types/user.type';
import {Text, StyleSheet, View, TouchableOpacity, Image} from 'react-native';
import {SCREEN_WIDTH} from '@/Constants';
import {ScreenNavigationProp} from '@/Routes/Stack';
import {useNavigation} from '@react-navigation/native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface IMyProps {
  friend: TFriend | undefined;
  toggleModal: () => void;
  toggleModalBlock: () => void;
  toggleModalUnFriend: () => void;
}

const FriendOption: React.FC<IMyProps> = props => {
  const friend = props.friend;
  const lastNameFriend =
    friend?.username.split(' ')[friend.username.split(' ').length - 1];

  const onPressUnFriendHandler = () => {
    props.toggleModal();
    props.toggleModalUnFriend();
  };

  const onPressBlockHandler = () => {
    props.toggleModal();
    props.toggleModalBlock();
  };
  const onPressProfileHandler = () => {
    //Handle sang trang cá nhân Friend
  };

  return (
    // <View style={styles.container}>
    //     <View style={styles.backdrop}>
    //         <TouchableOpacity onPress={this.onPressBackdropHandler.bind(this)} style={{ width: '100%', height: '100%' }}>

    //         </TouchableOpacity>
    //     </View>
    <View style={styles.postOptionsWrapper}>
      <TouchableOpacity
        onPress={onPressProfileHandler.bind(this)}
        style={styles.postOptionHeaderWrapper}>
        <View style={styles.postOptionItem}>
          <Image
            source={
              friend?.avatar
                ? {uri: friend?.avatar}
                : require('@/Assets/Images/Avatar.png')
            }
            style={styles.friendAvatar}
          />
          <View>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
              }}>
              {friend?.username}
            </Text>
            <Text style={styles.postOptionTitle}>
              Là bạn bè từ tháng 1 năm 2020
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.postOptionItemWrapper}>
        <View style={styles.postOptionItem}>
          <View style={styles.optionIcon}>
            <MaterialCommunityIcons
              name="facebook-messenger"
              size={24}></MaterialCommunityIcons>
          </View>
          <View>
            <Text
              style={{
                fontSize: 17,
                fontWeight: '700',
              }}>
              Nhắn tin cho {lastNameFriend}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.postOptionItemWrapper}>
        <View style={styles.postOptionItem}>
          <View style={styles.optionIcon}>
            <MaterialCommunityIcons
              name="bookmark-remove-outline"
              size={24}></MaterialCommunityIcons>
          </View>
          <View>
            <Text
              style={{
                fontSize: 17,
                fontWeight: '700',
              }}>
              Bỏ theo dõi {lastNameFriend}
            </Text>
            <Text style={styles.postOptionTitle}>
              Không nhìn thấy bài viết của nhau nữa nhưng vẫn là bạn bè
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={onPressBlockHandler}
        style={styles.postOptionItemWrapper}>
        <View style={styles.postOptionItem}>
          <View style={styles.optionIcon}>
            <MaterialCommunityIcons
              name="account-cancel-outline"
              size={24}></MaterialCommunityIcons>
          </View>
          <View>
            <Text
              style={{
                fontSize: 17,
                fontWeight: '700',
              }}>
              Chặn {lastNameFriend}
            </Text>
            <Text style={styles.postOptionTitle}>
              {lastNameFriend} sẽ không nhìn thấy bạn hoặc liên hệ với bạn trên
              Facebook
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={onPressUnFriendHandler.bind(this)}
        style={styles.postOptionItemWrapper}>
        <View style={styles.postOptionItem}>
          <View style={styles.optionIcon}>
            <MaterialCommunityIcons
              name="account-remove-outline"
              size={24}
              color={'red'}></MaterialCommunityIcons>
          </View>
          <View>
            <Text
              style={{
                fontSize: 17,
                fontWeight: '600',
                color: 'red',
              }}>
              Huỷ kết bạn với {lastNameFriend}
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: 'red',
              }}>
              Xoá {lastNameFriend} khỏi danh sách bạn bè
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
    // </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    position: 'relative',
  },
  backdrop: {
    height: '100%',
    width: '100%',
    zIndex: 1,
  },
  postOptionsWrapper: {
    // position: 'absolute',
    // bottom: 0,
    // left: 0,
    // width: '100%',
    // flex: 1,
    paddingTop: 16,
    paddingBottom: 10,
    backgroundColor: '#fff',
  },
  postOptionHeaderWrapper: {
    paddingLeft: 20,
    paddingBottom: 10,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
  friendAvatar: {
    height: 40,
    width: 40,
    borderRadius: 40,
    borderColor: '#333',
    borderWidth: 0.2,
    marginRight: 14,
  },
  postOptionItemWrapper: {
    paddingBottom: 10,
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 50,
  },
  // postOptionItemWrapperLast: {
  //     paddingBottom: 10,
  //     paddingTop: 10,
  //     paddingLeft: 20,
  //     paddingRight: 50,
  //     color: 'red'
  // },
  postOptionItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionIcon: {
    width: 35,
    alignItems: 'center',
  },
  postOptionTitle: {
    fontSize: 16,
  },
  postOptionSubtitle: {
    fontSize: 12,
  },
});

export default FriendOption;
