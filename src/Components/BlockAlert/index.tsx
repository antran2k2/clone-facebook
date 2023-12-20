import {TFriend, TUserFriend} from '@/types/user.type';
import {Text, StyleSheet, View, TouchableOpacity, Image} from 'react-native';
import {SCREEN_WIDTH} from '@/Constants';
import {ScreenNavigationProp} from '@/Routes/Stack';
import {useNavigation} from '@react-navigation/native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSetBlockMutation} from '@/Redux/api/block';
interface IMyProps {
  friend: TFriend | undefined;
  toggleModal: () => void;
  refetch: () => void | Promise<void>;
}

const BlockAlert: React.FC<IMyProps> = props => {
  const [setBlock] = useSetBlockMutation();
  const handleBlockFriend = () => {
    const friendId = props.friend?.id;
    //Gọi API Block--------------
    setBlock({user_id: friendId || '-1'})
      .unwrap()
      .then(res => {
        props.toggleModal();
        props.refetch();
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
          Chặn trang cá nhân của {props.friend?.username}
        </Text>
      </View>
      <View style={styles.postOptionItemWrapper}>
        <Text
          style={{
            fontSize: 15,
            fontWeight: '400',
            color: '#000',
          }}>
          Những người bạn chặn sẽ không thể gắn thẻ hay mời bạn tham gia nhóm
          hoặc sự kiện, cũng không thể bắt đầu trò chuyện, thêm bạn vào danh
          sách bạn bè hoặc xem nội dung bạn đăng trên dòng thời gian của mình
          nữa. Nếu bạn chặn ai đó khi hai người đang là bạn bè thì hành động này
          cũng sẽ hủy kết bạn với họ
        </Text>
      </View>
      <View style={styles.postOptionWrapperEnd}>
        <TouchableOpacity onPress={handleBlockFriend}>
          <View>
            <Text
              style={{
                fontSize: 17,
                fontWeight: '700',
                color: '#318bfb',
              }}>
              Chặn
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

export default BlockAlert;
