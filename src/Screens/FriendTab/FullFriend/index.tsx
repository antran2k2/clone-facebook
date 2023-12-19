import React, { MutableRefObject, useRef, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, TextInput, Dimensions, Image, Button } from "react-native";
import { useNavigation, useRoute } from '@react-navigation/native';
import { ScreenNavigationProp, ScreenFullFriendProp } from '@/Routes/Stack';
import { TFriend, TUserFriend } from '@/types/user.type';
import { useAppSelector } from '@/Redux/store';
import { useAppDispatch } from '@/Redux/store';
import { setSignUpInfo } from '@/Redux/reducer/signUpInfo';
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import { SCREEN_WIDTH, SCREEN_HEIGHT, STATUSBAR_HEIGHT } from '@/Constants'
import Modal from "react-native-modal";
import FriendOption from "@/Components/FriendOption";
import ArrangeWrapper from "@/Components/ArrangeWrapper";
import BlockAlert from "@/Components/BlockAlert";
import UnFriendAlert from "@/Components/UnFriendAlert";



const FullFriendScreen = () => {
    const navigation = useNavigation<ScreenNavigationProp>();
    const route = useRoute<ScreenFullFriendProp>();
    //const horizontalScrollRef = useRef<ScrollView>(null);
    const horizontalScrollRef = useRef() as MutableRefObject<ScrollView>;
    // const horizontalScrollRef =useRef<ScrollView|null>(null);


    const user_id: string = route.params.user_id;
    //--------------------Call APi Get Friend dựa vào giá trị user_id---------------------
    const data = {
        friends: [
            {
                id: '2',
                username: 'Vũ Đức Thịnh',
                avatar: 'https://scontent.fhan15-2.fna.fbcdn.net/v/t1.6435-9/91187383_681877419287479_6192504020834189312_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=be3454&_nc_ohc=wFpXFhbBrBAAX9G0dGg&_nc_ht=scontent.fhan15-2.fna&oh=00_AfC-9okk9HyJUKVNQO_fFE8SIB4QH9L_FBBK0Wj8UX4S5Q&oe=658631E9',
                same_friends: '5',
                created: "2023-6-13T07:37:51.804Z",
            },
            {
                id: '3',
                username: 'Thanh Huy',
                avatar: 'https://thuthuatnhanh.com/wp-content/uploads/2020/10/anh-dai-dien-ca-tinh-dac-biet-ke-bi-an-trum-mu.jpg',
                same_friends: '0',
                created: "2023-6-12T07:37:51.804Z",
            },
            {
                id: '4',
                username: 'Hương Giang',
                avatar: 'https://thuthuatnhanh.com/wp-content/uploads/2021/02/Avatar-cho-con-gai-chat-lu.jpg',
                same_friends: '5',
                created: "2023-6-11T07:37:51.804Z",
            },
            {
                id: '5',
                username: 'Đinh Tuấn Hưng',
                avatar: 'https://thuthuatnhanh.com/wp-content/uploads/2018/07/anh-avatar-dep.jpg',
                same_friends: '5',
                created: "2023-6-14T07:37:51.804Z",
            },
            {
                id: '6',
                username: 'Nguyễn An',
                avatar: 'https://inkythuatso.com/uploads/thumbnails/800/2022/03/anh-dai-dien-facebook-dep-cho-nam-51-28-16-28-03.jpg',
                same_friends: '5',
                created: "2023-6-15T07:37:51.804Z",
            },
            {
                id: '7',
                username: 'Phạm Minh Quân',
                avatar: 'https://dulich3mien.vn/wp-content/uploads/2023/04/Anh-Avatar-doi-13.jpg',
                same_friends: '5',
                created: "2023-6-13T07:39:51.804Z",
            },
            {
                id: '8',
                username: 'Phạm Minh Quân1',
                avatar: 'https://dulich3mien.vn/wp-content/uploads/2023/04/Anh-Avatar-doi-13.jpg',
                same_friends: '5',
                created: "2023-6-17T07:37:51.804Z",
            },
            {
                id: '9',
                username: 'Phạm Minh Quân2',
                avatar: 'https://dulich3mien.vn/wp-content/uploads/2023/04/Anh-Avatar-doi-13.jpg',
                same_friends: '5',
                created: "2023-6-20T07:37:51.804Z",
            },
            {
                id: '10',
                username: 'Phạm Minh Quân3',
                avatar: 'https://dulich3mien.vn/wp-content/uploads/2023/04/Anh-Avatar-doi-13.jpg',
                same_friends: '5',
                created: "2023-6-22T07:37:51.804Z",
            }
        ],
        total: '9'
    }
    const [isModalVisible, setModalVisible] = useState(false);
    const [isModalArrageVisible, setModalArrageVisible] = useState(false);


    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };
    const toggleArrageModal = () => {
        setModalArrageVisible(!isModalArrageVisible);
    };

    const [isModalVisible2, setModalVisible2] = useState(false);

    const toggleModal2 = () => {
        setModalVisible2(!isModalVisible2);
    };

    const [isModalVisible3, setModalVisible3] = useState(false);

    const toggleModal3 = () => {
        setModalVisible3(!isModalVisible3);
    };


    const [userFriends, setUserFriends] = useState<Array<TFriend | undefined>>(data.friends);
    const [total, setTotal] = useState(data.total);
    const [filterType, setFilterType] = useState(1);
    const [keyword, setKeyword] = useState('');
    const [ProfileFriend, setProfileFriend] = useState<TFriend>();

    const onPressGoBackHandler = () => {
        navigation.goBack()
    }

    const onChangeSearchInputHandler = (event: { text: string; }) => {
        const textValue = event.text.toLowerCase();
        setKeyword(textValue);
    }

    const onPressProfileHandler = (id: String | undefined) => {
        console.log(id);
        //Handle to Profile của bạn bè
    }

    const onPressFriendOptionsHandler = (friend: TFriend | undefined) => {
        toggleModal();
        setProfileFriend(friend);

    }

    const onPressArrangeHandler = () => {
        // Hiện ra Component Sắp xếp
        toggleArrageModal()
    }

    const onPressSearchHandler = () => {
        //handle To Screen Search
    }

    return (
        <View style={styles.container}>
            <View style={styles.navigationBar}>
                <View style={styles.navigationBarLeft}>
                    <TouchableOpacity
                        onPress={onPressGoBackHandler}
                        style={styles.btnBack}>
                        <FontAwesome5Icon name="arrow-left" color="#000" size={20} />
                    </TouchableOpacity>
                    <Text style={styles.textNavigationBar}>Tất cả bạn bè</Text>
                </View>
                <TouchableOpacity
                    onPress={onPressSearchHandler}
                    style={styles.btnBack}>
                    <FontAwesome5Icon name="search" color="#000" size={20} />
                </TouchableOpacity>
            </View>
            {total === '0' ? (<View></View>) :
                (<View style={styles.searchToolWrapper}>
                    <View style={styles.searchTool}>
                        <View style={styles.btnSearchIcon}>
                            <FontAwesome5Icon name="search" color="gray" size={16} />
                        </View>
                        <TextInput
                            onChangeText={text => onChangeSearchInputHandler({ text })}
                            style={styles.searchInput} placeholder="Tìm kiếm bạn bè">

                        </TextInput>
                    </View>
                </View>)}
            {total === '0' ? (<View style={{
                paddingHorizontal: 40,
                height: SCREEN_HEIGHT - (STATUSBAR_HEIGHT + 20),
                backgroundColor: '#fff',
                alignItems: 'center'
            }}>
                <Image
                    source={require('@/Assets/Images/SignUpLogo.png')}
                    resizeMode="contain"
                    style={{
                        width: 200,
                        height: 200,
                        marginTop: 100
                    }}
                />
                <View style={{ marginVertical: 15 }}>
                    <Text style={{
                        fontSize: 18,
                        fontWeight: '700',
                        color: '#000'
                    }}>Chưa có bạn bè</Text>
                </View>
                <View>
                    <Text style={{
                        fontSize: 15,
                        fontWeight: '400',
                        color: '#000',
                        textAlign: 'center'
                    }}>Tất cả bạn bè sẽ xuất hiện ở đây</Text>
                </View>
                <TouchableOpacity
                    style={{
                        height: 40,
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingHorizontal: 15,
                        backgroundColor: '#318bfb',
                        borderRadius: 8,
                        marginHorizontal: 5,
                        marginTop: 20
                    }}
                //onPress={onPressSuggestHandler}
                >
                    <Text style={{ fontSize: 16, fontWeight: "500", color: '#fff' }}>Xem gợi ý kết bạn</Text>
                </TouchableOpacity>
            </View>) : (<ScrollView
                style={styles.friendsWrapper}
                bounces={false}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.friendsWrapperHeader}>
                    <Text style={styles.friendsCount}>{total} người bạn</Text>
                    <TouchableOpacity
                        onPress={onPressArrangeHandler}
                        activeOpacity={0.5}>
                        <Text style={{ fontSize: 18, color: '#318bfb' }}>
                            Sắp xếp
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.friends}>
                    {userFriends.map((friend, index) => (
                        <View key={index}>
                            {
                                (friend?.username || '').toLowerCase().indexOf(keyword) > -1 ? (
                                    <TouchableOpacity
                                        onPress={onPressProfileHandler.bind(this, friend?.id)}
                                        key={index}
                                        style={styles.friendItem}>
                                        <Image source={{ uri: friend?.avatar }} style={styles.friendAvatar} />
                                        <View style={styles.friendInfoWrapper}>
                                            <Text style={styles.friendName}>{friend?.username}</Text>
                                            {friend?.same_friends === '0' ? (<View style={{ marginVertical: 5 }}></View>) : (<Text style={styles.friendMutualCount}>{friend?.same_friends} bạn chung</Text>)}
                                        </View>
                                        <TouchableOpacity
                                            onPress={onPressFriendOptionsHandler.bind(this, friend)}
                                            style={styles.btnFriendOptions}>
                                            <FontAwesome5Icon name="ellipsis-h" size={20} />
                                        </TouchableOpacity>
                                    </TouchableOpacity>
                                ) : <View></View>
                            }
                        </View>
                    ))}
                </View>
            </ScrollView>)}
            <Modal
                isVisible={isModalVisible}
                onBackdropPress={toggleModal}
                onBackButtonPress={toggleModal}
                backdropOpacity={0.3}
                onSwipeComplete={() => setModalVisible(false)}
                useNativeDriverForBackdrop
                swipeDirection={['down']}
                style={{
                    margin: 5, borderRadius: 50, flex: 1,
                    justifyContent: 'flex-end',
                }}
            >
                <FriendOption friend={ProfileFriend} toggleModal={toggleModal} toggleModalBlock={toggleModal2} toggleModalUnFriend={toggleModal3} />
            </Modal>
            <Modal
                isVisible={isModalArrageVisible}
                onBackdropPress={toggleArrageModal}
                onBackButtonPress={toggleArrageModal}
                backdropOpacity={0.3}
                onSwipeComplete={() => setModalArrageVisible(false)}
                useNativeDriverForBackdrop
                swipeDirection={['down']}
                style={{
                    margin: 5, borderRadius: 50, flex: 1,
                    justifyContent: 'flex-end',
                }}
            >
                <ArrangeWrapper sortDataByCreateAt={toggleArrageModal} toggleModal={toggleArrageModal} />
            </Modal>
            {/* Model AlertBlock */}
            <Modal
                isVisible={isModalVisible2}
                onBackdropPress={toggleModal2}
                onBackButtonPress={toggleModal2}
                backdropOpacity={0.3}
                onSwipeComplete={() => setModalVisible2(false)}
                useNativeDriverForBackdrop
                swipeDirection={['down']}
                style={{
                    margin: 5, borderRadius: 50, alignItems: 'center'
                }}
            >
                <BlockAlert friend={ProfileFriend} toggleModal={toggleModal2} />
            </Modal>
            {/* Model AlertUnFriend */}
            <Modal
                isVisible={isModalVisible3}
                onBackdropPress={toggleModal3}
                onBackButtonPress={toggleModal3}
                backdropOpacity={0.3}
                onSwipeComplete={() => setModalVisible3(false)}
                useNativeDriverForBackdrop
                swipeDirection={['down']}
                style={{
                    margin: 5, borderRadius: 50, alignItems: 'center'
                }}
            >
                <UnFriendAlert friend={ProfileFriend} toggleModal={toggleModal3} />
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff'
    },
    navigationBar: {
        paddingTop: 12,
        flexDirection: 'row',
        height: 64,
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd'
    },
    navigationBarLeft: {
        flexDirection: 'row',
    },
    textNavigationBar: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
        marginLeft: 5
    },
    btnBack: {
        width: 50,
        alignItems: 'center'
    },
    navigationTitle: {
        fontSize: 18
    },
    searchToolWrapper: {
        paddingVertical: 10,
        paddingHorizontal: 15
    },
    filterWrapper: {
        flexDirection: 'row',
    },
    btnFilter: {
        paddingHorizontal: 15,
        backgroundColor: '#ddd',// '#9dd0eb'
        borderRadius: 50,
        height: 40,
        justifyContent: 'center'
    },
    btnFilterActived: {
        backgroundColor: '#9dd0eb',// 
    },
    searchTool: {
        flexDirection: 'row',
        //marginTop: 10,
        overflow: 'hidden',
        borderRadius: 50
    },
    btnSearchIcon: {
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#ddd",
        width: 40
    },
    searchInput: {
        height: 40,
        width: SCREEN_WIDTH - 30 - 40, //paddingHorizontal btnSearch
        backgroundColor: "#ddd",
        paddingRight: 30
    },
    friendsWrapper: {
        padding: 15,
        paddingTop: 0,
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT - (12 + 40) - 70,//navigation bar searchTool
    },
    friendsWrapperHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    friendsCount: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 5
    },
    friends: {

    },
    friendItem: {
        flexDirection: 'row',
        marginVertical: 5,
        alignItems: 'center'
    },
    friendAvatar: {
        height: 80,
        width: 80,
        borderRadius: 80,
        borderColor: '#333',
        borderWidth: 0.2
    },
    friendInfoWrapper: {
        width: SCREEN_WIDTH - 30 - 80 - 30,//paddingHorizontal avatar optionBtn,
        paddingLeft: 15
    },
    friendName: {
        color: '#000',
        fontSize: 16,
        fontWeight: '700'
    },
    friendMutualCount: {
        color: '#333'
    },
    btnFriendOptions: {
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default FullFriendScreen;
