// Bố cục (tìm theo gạch đàu dòng là đc):
// - fake data
// - xử lý data, xếp theo thời gian, lấy ra top 20
// xử lí chuyển màn, cần bổ sung hàm
// - render giao diện

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
} from 'react-native';
import dayjs from 'dayjs';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
export interface SearchKey {
  id: string;
  keyword: string;
  created: string;
}
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList, ScreenNavigationProp} from '@/Routes/Stack';
import {useFocusEffect} from '@react-navigation/native';

import {useGetSavedSearchQuery} from '@/Redux/api/search';
// fake data

const searchTopHistory: SearchKey[] = [
  {
    id: '1',
    keyword: 'Bánh đa trộn',
    created: '2023-12-20T10:48:57.262Z',
  },
  {
    id: '2',
    keyword: 'Bánh tráng trộn',
    created: '2023-12-16T10:48:57.262Z',
  },
  {
    id: '3',
    keyword: 'Poca hồng',
    created: '2023-12-02T10:48:57.262Z',
  },
  {
    id: '4',
    keyword: 'Mì gà tần',
    created: '2023-12-13T10:48:57.262Z',
  },
  {
    id: '5',
    keyword: 'Gàaaaaa',
    created: '2023-12-14T10:48:57.262Z',
  },
  {
    id: '6',
    keyword: 'Giá nhà tất ống',
    created: '2023-12-15T10:48:57.262Z',
  },
  {
    id: '22',
    keyword: 'Mì gà tần',
    created: '2023-11-28T10:48:57.262Z',
  },
  {
    id: '55',
    keyword: 'Gàaaaaa',
    created: '2023-11-24T10:48:57.262Z',
  },
  {
    id: '63',
    keyword: 'Bánh đa trộn',
    created: '2023-10-13T10:44:57.262Z',
  },
  {
    id: '41',
    keyword: 'Mì gà tần',
    created: '2023-12-19T21:48:57.262Z',
  },
  {
    id: '58',
    keyword: 'Gàaaaaa',
    created: '2023-12-19T23:48:57.262Z',
  },
  {
    id: '65',
    keyword: 'Mì cay hải sản kim cheese',
    created: '2023-12-19T14:48:57.262Z',
  },
  {
    id: '4g',
    keyword: 'Mì gà tần',
    created: '2023-12-20T10:48:57.262Z',
  },
  {
    id: '5e',
    keyword: 'Gàaaaaa',
    created: '2023-12-20T06:48:57.262Z',
  },
  {
    id: '6w',
    keyword: 'Bánh đa trộn',
    created: '2023-12-20T18:42:57.262Z',
  },
  {
    id: '4t',
    keyword: 'Sáng trong vườn thông',
    created: '2023-12-11T10:48:57.262Z',
  },
  {
    id: '5bd',
    keyword: 'Gàaaaaa',
    created: '2023-12-14T10:52:57.262Z',
  },
  {
    id: '6bfd',
    keyword: 'KHoai tây chiên bơ tỏi',
    created: '2023-12-20T09:48:52.262Z',
  },
  {
    id: '7bsdgk',
    keyword: 'A cross-platform',
    created: '2023-12-20T10:48:57.262Z',
  },
  {
    id: '8nrbx',
    keyword: 'Gàaaaaa chiên giòn',
    created: '2023-12-20T10:48:57.262Z',
  },
  {
    id: '9tdsa',
    keyword: 'Bánh đa trộn giáng xink',
    created: '2023-12-20T10:48:57.262Z',
  },
  {
    id: '10ekgmk',
    keyword: 'Mì gà tần',
    created: '2023-12-16T10:48:57.262Z',
  },
  {
    id: '11brexa',
    keyword: 'Gàaaaaa',
    created: '2023-12-11T11:48:57.262Z',
  },
  {
    id: '12bfaee',
    keyword: 'Bánh đa trộn',
    created: '2023-12-20T10:48:57.262Z',
  },
  {
    id: '13',
    keyword: 'Mì gà tần',
    created: '2023-12-20T10:48:57.262Z',
  },
  {
    id: '14',
    keyword: 'Gàaaaaa',
    created: '2023-12-20T10:48:57.262Z',
  },
  {
    id: '15',
    keyword: 'Bánh đa trộn',
    created: '2023-12-20T10:48:57.262Z',
  },
  {
    id: '16',
    keyword: 'Mì gà tần',
    created: '2023-12-20T10:48:57.262Z',
  },
  {
    id: '17',
    keyword: 'Gàaaaaa',
    created: '2023-12-20T10:48:57.262Z',
  },
  {
    id: '18',
    keyword: 'Phở cuốn chấm mắm nêm',
    created: '2023-12-20T10:48:57.262Z',
  },
  {
    id: '19',
    keyword: 'Mì gà tần',
    created: '2023-12-20T10:48:57.262Z',
  },
  {
    id: '20',
    keyword: 'Bún cá Thái Bình',
    created: '2023-12-20T10:48:57.262Z',
  },
  {
    id: '21',
    keyword: 'Lẩu tokkboki ahihi',
    created: '2023-10-01T00:00:00.000Z',
  },
  {
    id: '22',
    keyword: 'Búp phê xiên bửn',
    created: '2023-2-20T10:48:57.262Z',
  },
  {
    id: '23',
    keyword: 'Bún bò Huế không móng nhiều chả cua',
    created: '2023-8-20T10:48:57.262Z',
  },
  {
    id: '24',
    keyword: 'Bánh đa trộn',
    created: '2023-9-20T10:48:57.262Z',
  },
];

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
    // padding: 20,
    paddingLeft: 20,
    borderRadius: 20,
    marginLeft: 5,
    textAlignVertical: 'center',
  },
  containerSearchHistory: {
    margin: 0,
    width: windowWidth,
    paddingHorizontal: 0,
  },
  containerSearchHistoryOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    marginTop: 10,
    marginBottom: 8,
  },
  searchHistoryOption: {},
  searchHistoryItemContainer: {},
  searchHistoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
});

function SearchScreen() {
  const navigation = useNavigation<ScreenNavigationProp>();
  const [searchTopHistory, setSearchTopHistory] = useState([]); // [
  const {data, error, isLoading, isSuccess, refetch} = useGetSavedSearchQuery({
    index: '0',
    count: '20',
  });
  useEffect(() => {
    if (isSuccess) {
      setSearchTopHistory(data?.data || []);
    }
  }, [isSuccess, data?.data]);
  useFocusEffect(
    React.useCallback(() => {
      refetch();
    }, [refetch]),
  );
  const [searchText, setSearchText] = useState('');

  // - xử lý data, xếp theo thời gian, lấy ra top 20
  const sortSearchKeywordByCreated = (searchList: SearchKey[]): SearchKey[] => {
    // Create a shallow copy of the array using the spread operator
    const searchListCopy = [...searchList];

    // Sort the copied array
    return searchListCopy.sort((a, b) => {
      const dateA = dayjs(a.created);
      const dateB = dayjs(b.created);

      return dateA.isAfter(dateB) ? -1 : 1;
    });
    // return searchListCopy;
  };

  const sortedSearchKeywordByCreated =
    sortSearchKeywordByCreated(searchTopHistory);

  const uniqueKeywords: Set<string> = new Set();
  const uniqueKeywordsArray: string[] = [];
  for (const obj of sortedSearchKeywordByCreated) {
    if (uniqueKeywords.size < 20 && !uniqueKeywords.has(obj.keyword)) {
      uniqueKeywords.add(obj.keyword);
      uniqueKeywordsArray.push(obj.keyword);
    }

    if (uniqueKeywords.size >= 20) {
      break;
    }
  }

  const renderSearchHistoryItem = ({item, index}) => {
    return <OptionHistorySearch key={index} option={item} />;
  };

  // xử lí chuyển màn, cần bổ sung hàm

  function handleSearch(text) {
    navigation.navigate('SearchResult', {keyword: text});
    // setSearchText(text);
    // const filtered = users.filter((user) => user.name.toLowerCase().includes(text.toLowerCase()));
    // setFilteredUsers(filtered);
  }

  const handleOpenSearchDiary = () => {
    navigation.navigate('ActivityLog');
  };
  function OptionHistorySearch({option}) {
    return (
      <TouchableOpacity
        style={styles.searchHistoryItem}
        onPress={() => handleSearch(option)}>
        {/* <FontAwesomeIcon
          icon={faMagnifyingGlass}
          size={18}
          color="#c9c8cd"
          style={{padding: 8, marginHorizontal: 6}}
        /> */}
        <FontAwesome6
          name="magnifying-glass"
          size={18}
          color="#c9c8cd"
          style={{padding: 8, marginHorizontal: 6}}
        />
        <Text style={{padding: 6, marginHorizontal: 6}}>{option}</Text>
      </TouchableOpacity>
    );
  }
  // // - render giao diện
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.containerHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome6 style={styles.returnIcon} name="less-than" size={18} />
        </TouchableOpacity>

        {/* <TextInput
          style={styles.input}
          placeholder="Tìm kiếm trên Facebook"
          placeholderTextColor="#000"
          value={searchText}
          onChangeText={text => {
            console.log(text);

            setSearchText(text);
          }}
          returnKeyType="search"
          // selectionColor="#fff"
          autoFocus={true}
          onSubmitEditing={() => handleSearch(searchText)}
        /> */}
        <TextInput
          style={styles.input}
          placeholder="Tìm kiếm"
          onChangeText={text => setSearchText(text)}
          value={searchText}
          returnKeyType="search"
          autoFocus={true}
          onSubmitEditing={() => handleSearch(searchText)}
        />
      </View>
      <View style={styles.containerSearchHistory}>
        <View style={styles.containerSearchHistoryOption}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 20,
              justifyContent: 'center',
            }}>
            Gần đây
          </Text>
          {/* onPress => mở nhật kí hoạt động */}
          <Text
            style={{
              color: '#3b63d1',
              justifyContent: 'center',
              fontSize: 16,
              transform: [{translateY: 3}],
            }}
            onPress={() => handleOpenSearchDiary()}>
            Xem tất cả
          </Text>
        </View>
        <View style={styles.searchHistoryItemContainer}>
          <SectionList
            sections={[
              {
                data: uniqueKeywordsArray,
                keyExtractor: (item, index) => index.toString(),
                renderItem: renderSearchHistoryItem,
              },
            ]}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

export default SearchScreen;
