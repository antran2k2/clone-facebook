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
} from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

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
});

function SearchResultScreen({navigation}) {
  // cần đặt default value thành từ khoá vừa search
  const [searchText, setSearchText] = useState('');
  const [selectedTab, setSelectedTab] = useState('Tất cả');

  const renderContent = () => {
    // Tùy thuộc vào mục được chọn, hiển thị nội dung tương ứng ở đây
    switch (selectedTab) {
      case 'Tất cả':
        return <AllComponent />;
      case 'Bài viết':
        return <AllComponent />;
      case 'Mọi người':
        return <AllComponent />;
      case 'Nhóm':
        return <AllComponent />;
      case 'Sự kiện':
        return <AllComponent />;
      default:
        return <AllComponent />;
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
      <View style={styles.containerHeader}>
        <FontAwesome6 style={styles.returnIcon} name="less-than" size={18} />
        <TextInput
          style={styles.input}
          placeholder="Tìm kiếm trên Facebook"
          placeholderTextColor="#999"
          value={searchText}
          onChangeText={text => {
            console.log(text);
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
            <TouchableOpacity onPress={() => handleTabPress('Tất cả')}>
              <Text
                style={
                  selectedTab === 'Tất cả' ? styles.selectedTab : styles.tab
                }>
                Tất cả
              </Text>
            </TouchableOpacity>
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
            <TouchableOpacity onPress={() => handleTabPress('Nhóm')}>
              <Text
                style={
                  selectedTab === 'Nhóm' ? styles.selectedTab : styles.tab
                }>
                Nhóm
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleTabPress('Ảnh')}>
              <Text
                style={selectedTab === 'Ảnh' ? styles.selectedTab : styles.tab}>
                Ảnh
              </Text>
            </TouchableOpacity>
          </View>
          {/* <View style={styles.contentContainer}>{renderContent()}</View> */}
          <View>
            <AllComponent />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default SearchResultScreen;

export interface UserResult {
  id: string;
  username: string;
  avatar: string;
  mutualFriend: string;
}

function AllComponent() {
  // fake data
  const friendUser: UserResult[] = [
    {
      id: '1111',
      username: 'Hà Vũ',
      avatar:
        'https://m.media-amazon.com/images/I/517i1zjTFNL._AC_UF1000,1000_QL80_.jpg',
      mutualFriend: '46',
    },
    {
      id: '1222',
      username: 'An Trần',
      avatar:
        'https://m.media-amazon.com/images/I/517i1zjTFNL._AC_UF1000,1000_QL80_.jpg',
      mutualFriend: '13',
    },
  ];
  const allUser: UserResult[] = [
    {
      id: '1111',
      username: 'Hà Vũ',
      avatar:
        'https://m.media-amazon.com/images/I/517i1zjTFNL._AC_UF1000,1000_QL80_.jpg',
      mutualFriend: '46',
    },
    {
      id: '1233',
      username: 'Duy Anh',
      avatar:
        'https://m.media-amazon.com/images/I/517i1zjTFNL._AC_UF1000,1000_QL80_.jpg',
      mutualFriend: '12',
    },
    {
      id: '1253',
      username: 'Bích Diệp',
      avatar:
        'https://m.media-amazon.com/images/I/517i1zjTFNL._AC_UF1000,1000_QL80_.jpg',
      mutualFriend: '0',
    },
    {
      id: '15t5',
      username: 'Tùng Lâm',
      avatar:
        'https://m.media-amazon.com/images/I/517i1zjTFNL._AC_UF1000,1000_QL80_.jpg',
      mutualFriend: '99',
    },
  ];

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

  console.log('AllComponent', notFriendUser);
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
              data: friendUser,
              keyExtractor: (item, index) => index.toString(),
              renderItem: renderFriendItem,
            },
          ]}
        />
      </View>
      <View style={styles.NotFriendItemContainer}>
        <SectionList
          sections={[
            {title: 'new', data: notFriendUser},
            // Add more sections if needed
          ]}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderNotFriendItem}
          renderSectionHeader={renderNotFriendHeader}
          stickySectionHeadersEnabled={false}
        />
      </View>
    </View>
  );
}

function FriendItem({user}) {
  const [isPressed, setIsPressed] = useState<boolean>(false);

  const handlePressIn = () => {
    setIsPressed(true);
  };

  const handlePressOut = () => {
    setIsPressed(false);
    // handleChat();
  };
  return (
    <View style={{paddingVertical: 10, paddingHorizontal: 15}}>
      <View style={{display: 'flex', flexDirection: 'row'}}>
        <ImageBackground
          imageStyle={{borderRadius: 64}}
          style={styles.avatarFriend}
          source={{
            uri: user.avatar,
          }}>
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
            {user.mutualFriend} bạn chung
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
    </View>
  );
}
function NotFriendItem({user}) {
  const [isPressed, setIsPressed] = useState<boolean>(false);

  const handlePressIn = () => {
    setIsPressed(true);
  };

  const handlePressOut = () => {
    setIsPressed(false);
    // handleAddFriend();
  };
  return (
    <View style={{paddingVertical: 10, paddingHorizontal: 15}}>
      <View style={{display: 'flex', flexDirection: 'row'}}>
        <ImageBackground
          imageStyle={{borderRadius: 64}}
          style={styles.avatarNotFriend}
          source={{
            uri: user.avatar,
          }}>
          <View style={{...styles.searchAvatarNotFriendIcon}}>
            <FontAwesome5Icon />
          </View>
        </ImageBackground>
        <View style={{paddingHorizontal: 20, width: '100%'}}>
          <Text style={{fontWeight: 'bold', paddingBottom: 1}}>
            {user.username}
          </Text>
          <Text style={{paddingVertical: 1}}>
            {user.mutualFriend !== '0' ? user.mutualFriend : 'Không có'} bạn
            chung
          </Text>
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
        </View>
      </View>
    </View>
  );
}
