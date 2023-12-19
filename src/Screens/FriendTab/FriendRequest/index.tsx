import React, { MutableRefObject, useRef, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, TextInput, Dimensions, Image, Button } from "react-native";
import { useNavigation, useRoute } from '@react-navigation/native';
import { ScreenNavigationProp, ScreenFullFriendProp } from '@/Routes/Stack';
import { TFriend, TRequestFriend, TUserFriend } from '@/types/user.type';
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import { SCREEN_WIDTH, SCREEN_HEIGHT, STATUSBAR_HEIGHT } from '@/Constants'
import Modal from "react-native-modal";
import ArrangeWrapper from "@/Components/ArrangeWrapper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import BlockAlert from "@/Components/BlockAlert";
import dayjs from "dayjs";


// const dayjs = require("dayjs");
// var duration = require("dayjs/plugin/duration");
// dayjs.extend(duration);


const FriendRequestScreen = () => {
    const navigation = useNavigation<ScreenNavigationProp>();
    //--------------------Call APi Get Request Friend dựa vào giá trị user_id---------------------
    const data = {
        requests: [
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
                created: "2023-6-17T07:39:51.804Z",
            },
            {
                id: '8',
                username: 'Phạm Minh Quân1',
                avatar: 'https://dulich3mien.vn/wp-content/uploads/2023/04/Anh-Avatar-doi-13.jpg',
                same_friends: '5',
                created: "2023-6-18T07:37:51.804Z",
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

    // const data = {
    //     requests: [],
    //     total: '0'
    // }

    const [isModalVisible1, setModalVisible1] = useState(false);

    const toggleModal1 = () => {
        setModalVisible1(!isModalVisible1);
    };

    const [isModalVisible2, setModalVisible2] = useState(false);

    const toggleModal2 = () => {
        setModalVisible2(!isModalVisible2);
    };

    const [isModalVisible3, setModalVisible3] = useState(false);

    const toggleModal3 = () => {
        setModalVisible3(!isModalVisible3);
    };
    const [isModalVisible4, setModalVisible4] = useState(false);

    const toggleModal4 = () => {
        setModalVisible4(!isModalVisible4);
    };

    const [isModalVisible5, setModalVisible5] = useState(false);

    const toggleModal5 = () => {
        setModalVisible5(!isModalVisible5);
    };
    const [friendRequests, setFriendRequests] = useState<Array<TFriend | undefined>>(data.requests);
    const [friendSelect, setFriendSelect] = useState<TFriend>();
    const [arrayFriendAccept, setArrayFriendAccept] = useState<Array<String | undefined>>([]);
    const [arrayFriendRemove, setArrayFriendRemove] = useState<Array<String | undefined>>([]);

    const onPressGoBackHandler = () => {
        navigation.goBack()
    }
    const onPressRemoveFriendRequest = (friend: TFriend | undefined) => {
        setFriendSelect(friend);
        toggleModal3();
    }
    const onPressAcceptsHandler = (friend: TFriend | undefined) => {
        setFriendSelect(friend);
        toggleModal2();
    }

    const onPressFriendOptionsHandler = (friend: TFriend | undefined) => {
        setFriendSelect(friend);
        toggleModal4();
    }

    const handleAcceptFriend = () => {
        arrayFriendAccept.push(friendSelect?.id);
        setArrayFriendAccept(arrayFriendAccept);
        toggleModal2();

        //Call API đồng ý kết bạn với id của Friend là friendSelect?.id
    }

    const handleRemoveFriend = () => {
        arrayFriendRemove.push(friendSelect?.id);
        setArrayFriendRemove(arrayFriendRemove);
        toggleModal3();

        //Call API không chấp nhận kết bạn
    }

    const onPressProfileHandler = (friendId: String | undefined) => {
        // handle Sang trang cá nhân của bạn bè
    }

    const onPressArrangeHandler = () => {
        // Xử lý khi ấn nút Sắp xếp
        toggleModal1();
    }

    const onPressSearchHandler = () => {

    }

    const onPressFullFriendHandler = () => {
        //Lấy user_Id từ Redux 
        const user_id = '1';
        navigation.navigate("FullFriend", {
            user_id: user_id
        })
    }

    const onPressSuggestHandler = () => {
        //handle sang màn hình Gợi ý
        navigation.navigate("SuggestFriend");
    }

    const onPressBlockHandler = () => {
        toggleModal4();
        toggleModal5();
    }

    const sortDataByCreateAt = () => {
        if (friendRequests.length > 0) {
            const new_data = friendRequests.sort((a, b) => {
                const dateA = dayjs(a?.created);
                const dateB = dayjs(b?.created);

                return dateA.isAfter(dateB) ? -1 : 1;
            });
            setFriendRequests(new_data);
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.navigationBar}>
                <View style={styles.navigationBarTop}>
                    <Text style={{ fontSize: 25, color: '#000', fontWeight: 'bold' }}>Bạn bè</Text>
                    <TouchableOpacity
                        onPress={onPressSearchHandler}
                        style={styles.btnBack}>
                        <FontAwesome5Icon name="search" color="#000" size={20} />
                    </TouchableOpacity>
                </View>
                <View style={styles.navigationBarBottom}>
                    <TouchableOpacity style={styles.navigation} onPress={onPressSuggestHandler}>
                        <Text style={{ fontSize: 16, fontWeight: "500", color: '#000' }}>Gợi ý</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.navigation} onPress={onPressFullFriendHandler}>
                        <Text style={{ fontSize: 16, fontWeight: "500", color: '#000' }}>Tất cả bạn bè</Text>
                    </TouchableOpacity>
                </View>
            </View>
            {data.total === '0' ?
                (<View style={{
                    paddingHorizontal: 40,
                    height: SCREEN_HEIGHT - (STATUSBAR_HEIGHT + 70),
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
                        }}>Không có lời mời mới</Text>
                    </View>
                    <View>
                        <Text style={{
                            fontSize: 15,
                            fontWeight: '400',
                            color: '#000',
                            textAlign: 'center'
                        }}>Những người gửi cho bạn lời mời kết bạn sẽ xuất hiện ở đây</Text>
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
                        onPress={onPressSuggestHandler}
                    >
                        <Text style={{ fontSize: 16, fontWeight: "500", color: '#fff' }}>Xem gợi ý kết bạn</Text>
                    </TouchableOpacity>
                </View>) :
                (<ScrollView
                    style={styles.scrollContainer}
                    bounces={false}
                    showsVerticalScrollIndicator={false}>

                    <View style={styles.friendRequestsWrapper}>
                        <View style={styles.friendRequestsWrapperHeader}>
                            <Text style={styles.friendRequestsTitle}>Lời mời kết bạn <Text style={{ color: 'red' }}>{data.total}</Text></Text>
                            <TouchableOpacity
                                onPress={onPressArrangeHandler}
                                activeOpacity={0.5}>
                                <Text style={{ fontSize: 18, color: '#318bfb' }}>
                                    Sắp xếp
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.friendRequests}>
                            {friendRequests.map((friendRequest, index) => (
                                <TouchableOpacity
                                    onPress={onPressProfileHandler.bind(this, friendRequest?.id)}
                                    key={index}
                                    style={styles.recommendFriendItem}>
                                    <Image style={styles.avatar} source={{ uri: friendRequest?.avatar }} />
                                    <View style={styles.recommendInfo}>
                                        <View>
                                            <Text style={styles.name}>{friendRequest?.username}</Text>
                                            {!arrayFriendAccept.includes(friendRequest?.id) && !arrayFriendRemove.includes(friendRequest?.id) && !(friendRequest?.same_friends === '0') && <Text style={styles.mutualCount}>{friendRequest?.same_friends} bạn chung</Text>}
                                            {arrayFriendAccept.includes(friendRequest?.id) ?
                                                (<View>
                                                    <Text style={styles.statusText}>Các bạn hiện là bạn bè của nhau</Text>
                                                </View>) : arrayFriendRemove.includes(friendRequest?.id) ? (<View>
                                                    <Text style={styles.statusText}>Đã gỡ lời mời</Text>
                                                </View>) : (<View style={styles.btnActionsWrapper}>
                                                    <TouchableOpacity
                                                        style={styles.btnAddFriend}
                                                        onPress={onPressAcceptsHandler.bind(this, friendRequest)}
                                                    >
                                                        <Text style={{ color: '#fff', fontWeight: '500', fontSize: 16 }}>Chấp nhận</Text>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity
                                                        onPress={onPressRemoveFriendRequest.bind(this, friendRequest)}
                                                        style={styles.btnHide}>
                                                        <Text style={{ color: '#000', fontWeight: '500', fontSize: 16 }}>Xoá</Text>
                                                    </TouchableOpacity>
                                                </View>)
                                            }
                                        </View>
                                        {arrayFriendRemove.includes(friendRequest?.id) && <TouchableOpacity
                                            onPress={onPressFriendOptionsHandler.bind(this, friendRequest)}
                                            style={styles.btnFriendOptions}>
                                            <FontAwesome5Icon name="ellipsis-h" size={20} />
                                        </TouchableOpacity>}
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                </ScrollView>)}
            {/* Model Sắp xếp */}
            <Modal
                isVisible={isModalVisible1}
                onBackdropPress={toggleModal1}
                onBackButtonPress={toggleModal1}
                backdropOpacity={0.3}
                onSwipeComplete={() => setModalVisible1(false)}
                useNativeDriverForBackdrop
                swipeDirection={['down']}
                style={{
                    margin: 5, borderRadius: 50, flex: 1,
                    justifyContent: 'flex-end',
                }}
            >
                <ArrangeWrapper sortDataByCreateAt={sortDataByCreateAt} toggleModal={toggleModal1} />
            </Modal>
            {/* Model Chấp nhận */}
            <Modal
                isVisible={isModalVisible2}
                onBackdropPress={toggleModal2}
                onBackButtonPress={toggleModal2}
                backdropOpacity={0.3}
                onSwipeComplete={() => setModalVisible2(false)}
                useNativeDriverForBackdrop
                swipeDirection={['down']}
                style={{ margin: 5, borderRadius: 50, alignItems: "center" }}
            >
                <View style={styles.postOptionsWrapper}>
                    <View style={styles.postOptionItemWrapper}>
                        <Text style={{
                            fontSize: 17,
                            fontWeight: '700',
                            color: '#000'
                        }}>Kết bạn với {friendSelect?.username}</Text>
                    </View>
                    <View style={styles.postOptionItemWrapper}>
                        <Text style={{
                            fontSize: 16,
                            fontWeight: '400',
                            color: '#000'
                        }}>Bạn có chắc chắn muốn kết bạn với {friendSelect?.username} không ? </Text>
                    </View>
                    <View style={styles.postOptionWrapperEnd}>
                        <TouchableOpacity onPress={handleAcceptFriend}>
                            <View>
                                <Text style={{
                                    fontSize: 17,
                                    fontWeight: '700',
                                    color: '#318bfb'
                                }}>Xác nhận</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setModalVisible2(false)}>
                            <View>
                                <Text style={{
                                    fontSize: 17,
                                    fontWeight: '700',
                                    color: '#318bfb'
                                }}>Hủy</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            {/* Model Xóa */}
            <Modal
                isVisible={isModalVisible3}
                onBackdropPress={toggleModal3}
                onBackButtonPress={toggleModal3}
                backdropOpacity={0.3}
                onSwipeComplete={() => setModalVisible2(false)}
                useNativeDriverForBackdrop
                swipeDirection={['down']}
                style={{ margin: 5, borderRadius: 50, alignItems: "center" }}
            >
                <View style={styles.postOptionsWrapper}>
                    <View style={styles.postOptionItemWrapper}>
                        <Text style={{
                            fontSize: 17,
                            fontWeight: '700',
                            color: '#000'
                        }}>Gỡ lời mời từ {friendSelect?.username}</Text>
                    </View>
                    <View style={styles.postOptionItemWrapper}>
                        <Text style={{
                            fontSize: 16,
                            fontWeight: '400',
                            color: '#000'
                        }}>Bạn có chắc chắn muốn gỡ lời mời kết bạn từ {friendSelect?.username} không ?</Text>
                    </View>
                    <View style={styles.postOptionWrapperEnd}>
                        <TouchableOpacity onPress={handleRemoveFriend}>
                            <View>
                                <Text style={{
                                    fontSize: 17,
                                    fontWeight: '700',
                                    color: '#318bfb'
                                }}>Xác nhận</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setModalVisible3(false)}>
                            <View>
                                <Text style={{
                                    fontSize: 17,
                                    fontWeight: '700',
                                    color: '#318bfb'
                                }}>Hủy</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            {/* Model Option (khi Xóa mới hiện ra) */}
            <Modal
                isVisible={isModalVisible4}
                onBackdropPress={toggleModal4}
                onBackButtonPress={toggleModal4}
                backdropOpacity={0.3}
                onSwipeComplete={() => setModalVisible4(false)}
                useNativeDriverForBackdrop
                swipeDirection={['down']}
                style={{
                    margin: 0, borderRadius: 50, flex: 1,
                    justifyContent: 'flex-end',
                }}
            >
                <View style={{
                    paddingTop: 16,
                    paddingBottom: 10,
                    backgroundColor: '#fff',
                    // position: 'absolute',
                    // bottom: 0
                }}>
                    <TouchableOpacity style={styles.postOptionItemWrapper}>
                        <View style={styles.postOptionItem}>
                            <View style={styles.optionIcon}><MaterialCommunityIcons name="alert-box-outline" size={24}></MaterialCommunityIcons></View>
                            <View>
                                <Text style={{
                                    fontSize: 17,
                                    fontWeight: '700',
                                    color: '#000'
                                }}>Bạn thấy sao về lời mời kết bạn này</Text>
                                <Text style={{ fontSize: 16, paddingRight: 30 }}>{friendSelect?.username} sẽ không nhận được thông báo</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.postOptionItemWrapper} onPress={onPressBlockHandler}>
                        <View style={styles.postOptionItem}>
                            <View style={styles.optionIcon}><MaterialCommunityIcons name="account-cancel-outline" size={24}></MaterialCommunityIcons></View>
                            <View>
                                <Text style={{
                                    fontSize: 17,
                                    fontWeight: '700',
                                    color: '#000'
                                }}>Chặn {friendSelect?.username}</Text>
                                <Text style={{ fontSize: 16, paddingRight: 30 }}>{friendSelect?.username} sẽ không thể nhìn thấy bạn hay liên hệ với bạn trên AntiFacebook</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
            </Modal>
            {/* Model AlertBlock */}
            <Modal
                isVisible={isModalVisible5}
                onBackdropPress={toggleModal5}
                onBackButtonPress={toggleModal5}
                backdropOpacity={0.3}
                onSwipeComplete={() => setModalVisible1(false)}
                useNativeDriverForBackdrop
                swipeDirection={['down']}
                style={{
                    margin: 5, borderRadius: 50, alignItems: 'center'
                }}
            >
                <BlockAlert friend={friendSelect} toggleModal={toggleModal5} />
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
    },
    navigationBar: {
        //flexDirection: 'row',
        padding: 15,
        //height: 94,
        borderBottomColor: '#ddd',
        borderBottomWidth: 1
    },
    navigationBarTop: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    navigationBarBottom: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    btnBack: {
        height: 40,
        width: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    searchInput: {
        flexDirection: 'row',
        backgroundColor: '#ddd',
        width: SCREEN_WIDTH - 40 - 15,
        height: 36,
        borderRadius: 40,
        alignItems: 'center',
        paddingHorizontal: 15
    },
    btnNavigationsWrapper: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        paddingVertical: 15
    },
    btnNavigation: {
        height: 36,
        paddingHorizontal: 10,
        justifyContent: 'center',
        borderRadius: 40,
        backgroundColor: "#ddd"
    },
    scrollContainer: {
        paddingHorizontal: 15,
        height: SCREEN_HEIGHT - (STATUSBAR_HEIGHT + 50)
    },
    friendRequestsWrapper: {
        paddingVertical: 15
    },
    friendRequestsWrapperHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    friendRequestsTitle: {
        color: '#000',
        fontSize: 20,
        fontWeight: '800'
    },
    friendRequests: {
        paddingVertical: 7.5
    },
    recommendFriendItem: {
        flexDirection: 'row',
        marginVertical: 7.5,
        alignItems: 'center'
    },
    avatar: {
        height: 100,
        width: 100,
        borderRadius: 100
    },
    recommendInfo: {
        width: SCREEN_WIDTH - 30 - 100,
        paddingLeft: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    name: {
        fontSize: 16,
        color: '#000',
        fontWeight: '700',
        marginBottom: 5
    },
    mutualCount: {
        fontSize: 14,
        color: '#333',
    },
    btnActionsWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5
    },
    btnAddFriend: {
        width: '48.5%',
        height: 36,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#318bfb',
        borderRadius: 5
    },
    btnHide: {
        width: '48.5%',
        height: 36,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        backgroundColor: '#ddd'
    },
    navigation: {
        // flexDirection: 'row',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 15,
        backgroundColor: '#ddd',
        borderRadius: 48,
        marginHorizontal: 5
    },
    postOptionsWrapper: {
        paddingTop: 16,
        paddingBottom: 10,
        backgroundColor: '#fff',
        width: SCREEN_WIDTH - 60
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
    statusText: {
        fontSize: 15,
        color: '#000',
        marginTop: 5
    },
    btnFriendOptions: {
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    postOptionItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    optionIcon: {
        width: 35,
        alignItems: 'center'
    },
});

export default FriendRequestScreen;
