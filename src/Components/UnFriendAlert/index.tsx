import {TFriend, TUserFriend} from '@/types/user.type';
import {Text, StyleSheet, View, TouchableOpacity, Image} from 'react-native';
import {SCREEN_WIDTH} from '@/Constants';
import {ScreenNavigationProp} from '@/Routes/Stack';
import {useNavigation} from '@react-navigation/native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useUnFriendMutation} from '@/Redux/api/friend';
interface IMyProps {
  friend: TFriend | undefined;
  toggleModal: () => void;
}

const UnFriendAlert: React.FC<IMyProps> = props => {
  const [unFriend] = useUnFriendMutation();
  const handleUnFriend = () => {
    const friendId = props.friend?.id;
    //Gọi API UnFriend--------------
    console.log(friendId);
    unFriend({user_id: friendId || '-1'})
      .unwrap()
      .then(res => {
        props.toggleModal();
      })
      .catch(err => {
        console.log(err);
      });
  };
  return (
    <View style={styles.postOptionsWrapper}>
      <View style={styles.postOptionItemWrapper}>
        <Text
          style={{
            fontSize: 17,
            fontWeight: '700',
            color: '#000',
          }}>
          Hủy kết bạn với {props.friend?.username}
        </Text>
      </View>
      <View style={styles.postOptionItemWrapper}>
        <Text
          style={{
            fontSize: 15,
            fontWeight: '400',
            color: '#000',
          }}>
          Bạn có chắc muốn hủy kết bạn với {props.friend?.username} không?
        </Text>
      </View>
      <View style={styles.postOptionWrapperEnd}>
        <TouchableOpacity onPress={handleUnFriend}>
          <View>
            <Text
              style={{
                fontSize: 17,
                fontWeight: '700',
                color: '#318bfb',
              }}>
              Xác nhận
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={props.toggleModal}>
          <View>
            <Text
              style={{
                fontSize: 17,
                fontWeight: '700',
                color: '#318bfb',
              }}>
              Hủy
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  postOptionsWrapper: {
    paddingTop: 16,
    paddingBottom: 10,
    backgroundColor: '#fff',
    width: SCREEN_WIDTH - 60,
  },
  postOptionItemWrapper: {
    paddingBottom: 10,
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 10,
  },
  postOptionWrapperEnd: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 10,
    paddingTop: 10,
    paddingLeft: 140,
    paddingRight: 50,
  },
});

export default UnFriendAlert;
