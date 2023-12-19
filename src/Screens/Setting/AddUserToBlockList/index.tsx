/* eslint-disable curly */
/* eslint-disable react-hooks/exhaustive-deps */
import {ScreenNavigationProp} from '@/Routes/Stack';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {TBlockUser} from '@/types/user.type';
import unidecode from 'unidecode';
import {useGetUserFriendsQuery} from '@/Redux/api/friend';
import {useSetBlockMutation} from '@/Redux/api/block';
import {useFocusEffect} from '@react-navigation/native';
import {useAppSelector} from '@/Redux/store';
const AddUserToBlockListScreen = () => {
  const navigation = useNavigation<ScreenNavigationProp>();
  const [allFriend, setAllFriend] = useState<TBlockUser[]>([]);
  const userId = useAppSelector(state => state.info.id);
  const initParams = {
    user_id: '1',
    index: '1',
    count: '10',
  };
  const {data, isLoading, isSuccess} = useGetUserFriendsQuery(initParams);
  const [setBlock] = useSetBlockMutation();
  useEffect(() => {
    console.log('1231232e');
    if (isSuccess) {
      setAllFriend(data?.data?.friends);
    }
  }, [data]);

  const [searchQuery, setSearchQuery] = useState('');
  const [listSearchUser, setListSearchUser] = useState<TBlockUser[]>([]);

  const blockUser = (id: string) => {
    setBlock({user_id: '128'})
      .unwrap()
      .then(() => {
        console.log('block thành công');
        navigation.goBack();
      })
      .catch(err => {
        console.log(err);
      });
    console.log(id);
  };

  useEffect(() => {
    if (searchQuery === '') setListSearchUser([]);
    else {
      const normalizedSearchQuery = unidecode(searchQuery.toLowerCase());
      const filteredUsers = allFriend.filter(user => {
        const normalizedUsername = unidecode(user.username.toLowerCase());
        return normalizedUsername.includes(normalizedSearchQuery);
      });
      setListSearchUser(filteredUsers);
    }
  }, [searchQuery]);

  return (
    <View style={styles.container}>
      <View style={styles.search_container}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome6 name="arrow-left" size={24} color={'black'} />
        </TouchableOpacity>
        <View>
          <TextInput
            style={styles.input}
            value={searchQuery}
            onChangeText={text => setSearchQuery(text)}
            placeholder="Nhập tên của người dùng"
          />
        </View>
      </View>
      <View style={styles.search_result_container}>
        <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
          <View style={styles.list_user_search}>
            {listSearchUser.length > 0 &&
              listSearchUser.map((user, index) => (
                <View key={index} style={styles.user_search_item}>
                  <View style={styles.image_name}>
                    <Image
                      source={{uri: user.avatar}}
                      style={styles.userAvatar}
                    />
                    <View>
                      <Text style={styles.username}>{user.username}</Text>
                    </View>
                  </View>
                  <View>
                    <TouchableOpacity
                      style={styles.button_block}
                      onPress={() => blockUser(user.id)}>
                      <Text style={styles.button_block_text}>CHẶN</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  search_container: {
    display: 'flex',
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#cccccc',
    borderBottomStyle: 'solid',
  },
  input: {
    backgroundColor: '#e4e4ed',
    paddingVertical: 6,
    paddingHorizontal: 20,
    fontSize: 18,
    borderRadius: 16,
    alignItems: 'center',
    width: 330,
  },
  search_result_container: {
    height: '93%',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  list_user_search: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },
  user_search_item: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  image_name: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  userAvatar: {
    width: 60,
    height: 60,
    borderColor: '#aaaaaa',
    borderWidth: 1,
    borderRadius: 4,
  },
  username: {
    color: 'black',
    fontSize: 20,
    marginLeft: 15,
  },
  button_block: {
    borderWidth: 1,
    borderColor: '#2477c9',
    borderStyle: 'solid',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  button_block_text: {
    fontWeight: '500',
    fontSize: 17,
    color: '#2477c9',
  },
});

export default AddUserToBlockListScreen;
