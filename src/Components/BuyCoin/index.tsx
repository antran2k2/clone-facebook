import {TFriend, TUserFriend} from '@/types/user.type';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Alert,
  TextInput,
} from 'react-native';
import {SCREEN_WIDTH} from '@/Constants';
import {ScreenNavigationProp} from '@/Routes/Stack';
import {useNavigation} from '@react-navigation/native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useState} from 'react';
import {useBuyCoinsMutation} from '@/Redux/api/setting';
import Spinner from 'react-native-loading-spinner-overlay';
interface IMyProps {
  toggleModal: () => void;
  refetch: () => void;
}

const BuyCoinScreen: React.FC<IMyProps> = props => {
  const navigation = useNavigation<ScreenNavigationProp>();
  const [buyCoins, {isLoading}] = useBuyCoinsMutation();
  const [coin, setCoin] = useState('3000');
  const handleBuyCoin = () => {
    buyCoins({code: '123', coins: coin})
      .unwrap()
      .then(res => {
        props.toggleModal();
        props.refetch();
      })
      .catch(err => {
        Alert.alert('Lỗi', JSON.parse(err).message);
      });
  };
  return (
    <View style={styles.postOptionsWrapper}>
      <View style={styles.postOptionItemWrapper}>
        <Text
          style={{
            fontSize: 17,
            fontWeight: '700',
            color: '#318bfb',
            textAlign: 'center',
          }}>
          Nạp Coin
        </Text>
      </View>
      <View
        style={{
          paddingTop: 10,
          paddingLeft: 20,
          paddingRight: 10,
        }}>
        <Text
          style={{
            fontSize: 17,
            fontWeight: '700',
            color: '#000',
          }}>
          Số Coin muốn nạp
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <FontAwesome5Icon size={36} color="#000" name="bitcoin" />
        <TextInput
          placeholder="Nhập số Coin bạn muốn mua"
          defaultValue={coin}
          multiline={true}
          textAlignVertical="top"
          onChangeText={newText => setCoin(newText)}
          style={{
            height: 40,
            margin: 10,
            padding: 10,
            borderColor: 'gray',
            borderWidth: 1,
            borderRadius: 5,
          }}></TextInput>
      </View>

      <View style={styles.postOptionWrapperEnd}>
        <TouchableOpacity onPress={handleBuyCoin}>
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

export default BuyCoinScreen;
