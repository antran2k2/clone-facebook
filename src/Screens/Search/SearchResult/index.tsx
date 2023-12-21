import React, {useState} from 'react';
import {useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  Image,
  Dimensions,
  SectionList,
  ImageBackground,
  Button,
  Alert,
} from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useSearchQuery, useSearchUserQuery} from '@/Redux/api/search';
import {useGetUserFriendsQuery} from '@/Redux/api/friend';
import Spinner from 'react-native-loading-spinner-overlay';
import Modal from 'react-native-modal';
import {useAppSelector} from '@/Redux/store';
import PostItem from '@/Components/PostItem';
import CommentListScreen from '@/Components/ListComment';
import {
  useSetRequestFriendMutation,
  useDelRequestFriendMutation,
} from '@/Redux/api/friend';
import {SCREEN_WIDTH} from '@/Constants';
const windowWidth = Math.round(Dimensions.get('window').width);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  containerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
    padding: 3,
    width: windowWidth,
    zIndex: 1,
  },
  returnIcon: {
    color: '#333',
    marginRight: 8,
    marginLeft: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#ddd',
    paddingLeft: 20,
    borderRadius: 20,
    marginLeft: 5,
    textAlignVertical: 'center',
  },
  containerSearchResult: {
    margin: 0,
    width: windowWidth,
    paddingHorizontal: 0,
  },
  containerSearchResultOption: {},
  menuContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: 'white',
    height: 40,
  },
  tab: {
    color: 'black',
    fontWeight: 'bold',
  },
  selectedTab: {
    color: '#0866ff',
    fontWeight: 'bold',
  },
  FriendItemContainer: {marginBottom: 5},
  NotFriendItemContainer: {marginTop: 5},
  userAvatar: {
    height: 64,
    width: 64,
    position: 'relative',
    borderRadius: 64,
    borderColor: '#ddd',
    borderWidth: 0.5,
  },
  chatFriendButton: {
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  notFriendHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    margin: 10,
    marginHorizontal: 20,
  },
  searchAvatarIcon: {
    height: 64,
    width: 64,
    position: 'relative',
    borderRadius: 64,
    borderColor: '#ddd',
    borderWidth: 0.5,
  },
  avatarFriend: {
    height: 68,
    width: 68,
    position: 'relative',
    borderRadius: 64,
    borderColor: '#ddd',
    borderWidth: 0.5,
    marginBottom: 8,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  searchAvatarNotFriendIcon: {
    height: 64,
    width: 64,
    position: 'relative',
    borderRadius: 64,
    borderColor: '#ddd',
    borderWidth: 0.5,
  },
  avatarNotFriend: {
    height: 68,
    width: 68,
    position: 'relative',
    borderRadius: 64,
    borderColor: '#ddd',
    borderWidth: 0.5,
    marginBottom: 8,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  addFriendButton: {
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    width: '86%',
    marginTop: 3,
  },
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

function SearchResultScreen() {
  const [selectPost, setSelectPost] = useState(null);
  const handleShowComment = (item: any) => {
    setSelectPost(item);
    toggleModal11();
  };
  const [isModalVisible11, setModalVisible11] = useState(false);
  const toggleModal11 = () => {
    setModalVisible11(!isModalVisible11);
  };
  // cần đặt default value thành từ khoá vừa search
  const {id} = useAppSelector(state => state.info);
  const {
    data: resFriend,
    isLoading,
    isSuccess,
  } = useGetUserFriendsQuery({index: '0', count: '1000', user_id: id || '-1'});
  const route = useRoute();
  const {keyword} = route.params;
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState(keyword);
  const [friendUser, setFriendUser] = useState([]); // [UserResult]
  const [allUser, setAllUser] = useState([]); // [UserResult]
  const [listPost, setListPost] = useState([]); // [PostResult
  const initPararms = {
    keyword: searchText,
    index: '0',
    count: '100',
  };
  const {
    data: res,
    isLoading: isLoadingQuery,
    isSuccess: isSuccessQuery,
  } = useSearchQuery(initPararms);

  const [listPosts, setListPosts] = useState<TPost[]>([]);

  useEffect(() => {
    if (isSuccessQuery) {
      setListPosts(res?.data);
    }
  }, [res, isSuccessQuery]);

  const {
    data: resUser,
    isLoading: isLoadingUser,
    isSuccess: isSuccessUser,
  } = useSearchUserQuery(initPararms);

  useEffect(() => {
    if (isSuccess) {
      // console.log(resFriend.data);
      setFriendUser(resFriend?.data?.friends);
    }
  }, [resFriend, isSuccess]);
  useEffect(() => {
    if (isSuccessQuery) {
      setListPost(res?.data);
    }
  }, [res, isSuccessQuery]);

  useEffect(() => {
    if (isSuccessUser) {
      setAllUser(resUser?.data);
    }
  }, [resUser, isSuccessUser]);
  const [selectedTab, setSelectedTab] = useState('Tất cả');

  const renderContent = () => {
    // Tùy thuộc vào mục được chọn, hiển thị nội dung tương ứng ở đây
    switch (selectedTab) {
      case 'Bài viết':
        return (
          <FlatList
            data={listPosts}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => (
              <PostItem
                item={item}
                handleShowComment={() => handleShowComment(item)}
                handleTouchThreeDot={() => {}}
              />
            )}
            onEndReachedThreshold={10}
            maxToRenderPerBatch={10}
            updateCellsBatchingPeriod={100}
            initialNumToRender={5}
          />
        );
      case 'Mọi người':
        return <AllComponent friendUser={friendUser} allUser={allUser} />;

      default:
        return <AllComponent friendUser={friendUser} allUser={allUser} />;
    }
  };
  const handleTabPress = tabName => {
    setSelectedTab(tabName);
  };

  function handleSearch(text) {
    setSearchText(text);
    // const filtered = users.filter((user) => user.name.toLowerCase().includes(text.toLowerCase()));
    // setFilteredUsers(filtered);
  }

  return (
    <SafeAreaView style={styles.container}>
      <Spinner visible={isLoading || isLoadingQuery} />
      <View style={styles.containerHeader}>
        <FontAwesome6
          style={styles.returnIcon}
          name="less-than"
          size={18}
          onPress={() => navigation.goBack()}
        />
        <TextInput
          style={styles.input}
          placeholder="Tìm kiếm trên Facebook"
          placeholderTextColor="#999"
          value={searchText}
          onChangeText={text => {
            setSearchText(text);
          }}
          returnKeyType="search"
          // selectionColor="#fff"
          autoFocus={false}
          onSubmitEditing={() => handleSearch(searchText)}
        />
      </View>
      <View style={styles.containerSearchResult}>
        <View style={styles.containerSearchResultOption}>
          <View style={styles.menuContainer}>
            <TouchableOpacity onPress={() => handleTabPress('Bài viết')}>
              <Text
                style={
                  selectedTab === 'Bài viết' ? styles.selectedTab : styles.tab
                }>
                Bài viết
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleTabPress('Mọi người')}>
              <Text
                style={
                  selectedTab === 'Mọi người' ? styles.selectedTab : styles.tab
                }>
                Mọi người
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{marginBottom: 50}}>{renderContent()}</View>
          {/* <View>
            <AllComponent />
          </View> */}
        </View>
        <Modal
          isVisible={isModalVisible11}
          onBackdropPress={toggleModal11}
          onBackButtonPress={toggleModal11}
          backdropOpacity={0.3}
          //onSwipeComplete={() => setModalVisible(false)}
          useNativeDriverForBackdrop
          //swipeDirection={['down']}
          style={{
            margin: 5,
            borderRadius: 50,
            flex: 1,
            justifyContent: 'flex-end',
            marginBottom: -90,
          }}>
          <CommentListScreen postItem={selectPost} />
        </Modal>
      </View>
    </SafeAreaView>
  );
}

export default SearchResultScreen;

export interface UserResult {
  id: string;
  username: string;
  avatar: string;
  same_friends: string;
}

function AllComponent({friendUser, allUser}: {friendUser: any; allUser: any}) {
  const renderFriendItem = ({
    item,
    index,
  }: {
    item: UserResult;
    index: number;
  }) => {
    return <FriendItem user={item} />;
  };
  const renderNotFriendItem = ({
    item,
    index,
  }: {
    item: UserResult;
    index: number;
  }) => {
    return <NotFriendItem user={item} />;
  };

  const renderNotFriendHeader = ({section}) => {
    return <Text style={styles.notFriendHeader}>Người khác</Text>;
  };

  //filter bạn bè và không bạn bè
  const notFriendUser: UserResult[] = (() => {
    const missingUsers: UserResult[] = [];
    for (const user of allUser) {
      const found = friendUser.find(u => u.id === user.id);
      if (!found) {
        missingUsers.push(user);
      }
    }
    return missingUsers;
  })();
  const isFriendUser: UserResult[] = (() => {
    const missingUsers: UserResult[] = [];
    for (const user of allUser) {
      const found = friendUser.find(u => u.id === user.id);
      if (found) {
        missingUsers.push(user);
      }
    }
    return missingUsers;
  })();

  // console.log('AllComponent', notFriendUser);
  const combinedData = [
    {section: 'friends', data: friendUser},
    {section: 'new', data: notFriendUser},
  ];

  return (
    <View style={{backgroundColor: 'c8ccd0'}}>
      <View style={styles.FriendItemContainer}>
        <SectionList
          sections={[
            {
              title: 'Bạn bè',
              data: isFriendUser,
              keyExtractor: (item, index) => index.toString(),
              renderItem: renderFriendItem,
            },
            {
              title: 'Người khác',
              data: notFriendUser,
              keyExtractor: (item, index) => index.toString(),
              renderItem: renderNotFriendItem,
            },
            // Add more sections if needed
          ]}
          renderSectionHeader={({section: {title}}) => (
            <Text style={styles.notFriendHeader}>{title}</Text>
          )}
          stickySectionHeadersEnabled={false}
        />
      </View>
    </View>
  );
}

function FriendItem({user}) {
  const navigation = useNavigation();
  const [isPressed, setIsPressed] = useState<boolean>(false);

  const handlePressIn = () => {
    setIsPressed(true);
  };

  const handlePressOut = () => {
    setIsPressed(false);
    // handleChat();
  };
  return (
    <TouchableOpacity
      onPress={(() => navigation.navigate('ProfileFriend'), {id: user.id})}
      style={{paddingVertical: 10, paddingHorizontal: 15}}>
      <View style={{display: 'flex', flexDirection: 'row'}}>
        <ImageBackground
          imageStyle={{borderRadius: 64}}
          style={styles.avatarFriend}
          source={
            user?.avatar
              ? {
                  uri: user.avatar,
                }
              : require('@/Assets/Images/Avatar.png')
          }>
          <View style={{...styles.searchAvatarNotFriendIcon}}>
            <FontAwesome5Icon />
          </View>
        </ImageBackground>
        <View style={{paddingHorizontal: 20, justifyContent: 'center'}}>
          <Text style={{fontWeight: 'bold', paddingVertical: 2}}>
            {user.username}
          </Text>
          <Text style={{color: '#65676b'}}>Bạn bè</Text>
        </View>
      </View>
      <View>
        <View
          style={{display: 'flex', flexDirection: 'row', paddingVertical: 10}}>
          <FontAwesome6
            name="user-group"
            size={20}
            style={{color: '#65676b', marginLeft: 3}}
          />
          <Text style={{justifyContent: 'center', paddingHorizontal: 10}}>
            {user.same_friends} bạn chung
          </Text>
        </View>
        <TouchableOpacity
          onPressOut={handlePressOut}
          onPressIn={handlePressIn}
          style={[
            styles.chatFriendButton,
            {backgroundColor: isPressed ? 'gray' : '#ebf4ff'},
          ]}>
          <Text style={{color: '#0064d1', fontWeight: 'bold'}}>Nhắn tin</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}
function NotFriendItem({user}) {
  const navigation = useNavigation();
  const [setRequestFriend] = useSetRequestFriendMutation();
  const [delRequestFriend] = useDelRequestFriendMutation();
  const [isPressed, setIsPressed] = useState<boolean>(false);
  const [isRequest, setIsRequest] = useState(false);

  const [isModalVisible1, setModalVisible1] = useState(false);

  const toggleModal1 = () => {
    setModalVisible1(!isModalVisible1);
  };

  const [isModalVisible2, setModalVisible2] = useState(false);

  const toggleModal2 = () => {
    setModalVisible2(!isModalVisible2);
  };

  const handlePressIn = () => {
    setIsPressed(true);
  };

  const handleAcceptSent = () => {
    setRequestFriend({user_id: user.id || '-1'})
      .unwrap()
      .then(res => {
        toggleModal1();
        setIsRequest(true);
      })
      .catch(err => {
        Alert.alert('Lỗi', JSON.parse(err).message);
      });
  };

  const handleCancelSent = () => {
    delRequestFriend({user_id: user.id || '-1'})
      .unwrap()
      .then(res => {
        toggleModal2();
        setIsRequest(false);
      })
      .catch(err => {
        Alert.alert('Lỗi', JSON.parse(err).message);
      });
  };

  const handlePressOut = () => {
    setIsPressed(false);
    toggleModal1();
    // handleAddFriend();
  };
  const handlePressOut1 = () => {
    setIsPressed(false);
    toggleModal2();
    // handleAddFriend();
  };
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('ProfileFriend', {id: user?.id})}
      style={{paddingVertical: 10, paddingHorizontal: 15}}>
      <View style={{display: 'flex', flexDirection: 'row'}}>
        <ImageBackground
          imageStyle={{borderRadius: 64}}
          style={styles.avatarNotFriend}
          source={
            user?.avatar
              ? {
                  uri: user.avatar,
                }
              : require('@/Assets/Images/Avatar.png')
          }>
          <View style={{...styles.searchAvatarNotFriendIcon}}>
            <FontAwesome5Icon />
          </View>
        </ImageBackground>
        <View style={{paddingHorizontal: 20, width: '100%'}}>
          <Text style={{fontWeight: 'bold', paddingBottom: 1}}>
            {user.username}
          </Text>
          <Text style={{paddingVertical: 1}}>
            {user.same_friends !== '0' ? user.same_friends : 'Không có'} bạn
            chung
          </Text>
          {!isRequest ? (
            <TouchableOpacity
              onPressOut={handlePressOut}
              onPressIn={handlePressIn}
              style={[
                styles.addFriendButton,
                {backgroundColor: isPressed ? 'gray' : '#ebf4ff'},
              ]}>
              <Text style={{color: '#0064d1', fontWeight: 'bold'}}>
                Thêm bạn bè
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPressOut={handlePressOut1}
              onPressIn={handlePressIn}
              style={[
                styles.addFriendButton,
                {backgroundColor: isPressed ? '#ebf4ff' : '#ddd'},
              ]}>
              <Text style={{color: '#fff', fontWeight: 'bold'}}>Hủy</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      {/* Model Chấp nhận */}
      <Modal
        isVisible={isModalVisible1}
        onBackdropPress={toggleModal1}
        onBackButtonPress={toggleModal1}
        backdropOpacity={0.3}
        onSwipeComplete={() => setModalVisible1(false)}
        useNativeDriverForBackdrop
        swipeDirection={['down']}
        style={{margin: 5, borderRadius: 50, alignItems: 'center'}}>
        <View style={styles.postOptionsWrapper}>
          <View style={styles.postOptionItemWrapper}>
            <Text
              style={{
                fontSize: 17,
                fontWeight: '700',
                color: '#000',
              }}>
              Kết bạn với {user?.username}
            </Text>
          </View>
          <View style={styles.postOptionItemWrapper}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: '400',
                color: '#000',
              }}>
              Bạn có chắc chắn muốn gửi lời kết bạn tới {user?.username} không ?{' '}
            </Text>
          </View>
          <View style={styles.postOptionWrapperEnd}>
            <TouchableOpacity onPress={handleAcceptSent}>
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
            <TouchableOpacity onPress={() => setModalVisible1(false)}>
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
      </Modal>
      {/* Model Hủy lời mời kết bạn */}
      <Modal
        isVisible={isModalVisible2}
        onBackdropPress={toggleModal2}
        onBackButtonPress={toggleModal2}
        backdropOpacity={0.3}
        onSwipeComplete={() => setModalVisible2(false)}
        useNativeDriverForBackdrop
        swipeDirection={['down']}
        style={{margin: 5, borderRadius: 50, alignItems: 'center'}}>
        <View style={styles.postOptionsWrapper}>
          <View style={styles.postOptionItemWrapper}>
            <Text
              style={{
                fontSize: 17,
                fontWeight: '700',
                color: '#000',
              }}>
              Hủy lời mời tới {user.username}
            </Text>
          </View>
          <View style={styles.postOptionItemWrapper}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: '400',
                color: '#000',
              }}>
              Bạn có chắc chắn muốn hủy lời kết bạn tới {user.username} không ?{' '}
            </Text>
          </View>
          <View style={styles.postOptionWrapperEnd}>
            <TouchableOpacity onPress={handleCancelSent}>
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
            <TouchableOpacity onPress={() => setModalVisible2(false)}>
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
      </Modal>
    </TouchableOpacity>
  );
}
