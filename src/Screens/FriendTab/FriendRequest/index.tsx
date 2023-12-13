import React, { MutableRefObject, useRef, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, TextInput, Dimensions, Image, Button } from "react-native";
import { useNavigation, useRoute } from '@react-navigation/native';
import { ScreenNavigationProp, ScreenFullFriendProp } from '@/Routes/Stack';
import { TFriend, TUserFriend } from '@/types/user.type';
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import { SCREEN_WIDTH, SCREEN_HEIGHT, STATUSBAR_HEIGHT } from '@/Constants'
import Modal from "react-native-modal";
import ArrangeWrapper from "@/Components/ArrangeWrapper";

const FriendRequestScreen = () => {
    const navigation = useNavigation<ScreenNavigationProp>();
    //--------------------Call APi Get Request Friend dựa vào giá trị user_id---------------------
    const data: TUserFriend = {
        friends: [
            {
                id: '2',
                username: 'Vũ Đức Thịnh',
                avatar: 'https://scontent.fhan15-2.fna.fbcdn.net/v/t1.6435-9/91187383_681877419287479_6192504020834189312_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=be3454&_nc_ohc=wFpXFhbBrBAAX9G0dGg&_nc_ht=scontent.fhan15-2.fna&oh=00_AfC-9okk9HyJUKVNQO_fFE8SIB4QH9L_FBBK0Wj8UX4S5Q&oe=658631E9',
                same_friends: '5',
                created: new Date(),
            },
            {
                id: '3',
                username: 'Thanh Huy',
                avatar: 'https://thuthuatnhanh.com/wp-content/uploads/2020/10/anh-dai-dien-ca-tinh-dac-biet-ke-bi-an-trum-mu.jpg',
                same_friends: '5',
                created: new Date(),
            },
            {
                id: '4',
                username: 'Hương Giang',
                avatar: 'https://thuthuatnhanh.com/wp-content/uploads/2021/02/Avatar-cho-con-gai-chat-lu.jpg',
                same_friends: '5',
                created: new Date(),
            },
            {
                id: '5',
                username: 'Đinh Tuấn Hưng',
                avatar: 'https://thuthuatnhanh.com/wp-content/uploads/2018/07/anh-avatar-dep.jpg',
                same_friends: '5',
                created: new Date(),
            },
            {
                id: '6',
                username: 'Nguyễn An',
                avatar: 'https://inkythuatso.com/uploads/thumbnails/800/2022/03/anh-dai-dien-facebook-dep-cho-nam-51-28-16-28-03.jpg',
                same_friends: '5',
                created: new Date(),
            },
            {
                id: '7',
                username: 'Phạm Minh Quân',
                avatar: 'https://dulich3mien.vn/wp-content/uploads/2023/04/Anh-Avatar-doi-13.jpg',
                same_friends: '5',
                created: new Date(),
            },
            {
                id: '8',
                username: 'Phạm Minh Quân1',
                avatar: 'https://dulich3mien.vn/wp-content/uploads/2023/04/Anh-Avatar-doi-13.jpg',
                same_friends: '5',
                created: new Date(),
            },
            {
                id: '9',
                username: 'Phạm Minh Quân2',
                avatar: 'https://dulich3mien.vn/wp-content/uploads/2023/04/Anh-Avatar-doi-13.jpg',
                same_friends: '5',
                created: new Date(),
            },
            {
                id: '10',
                username: 'Phạm Minh Quân3',
                avatar: 'https://dulich3mien.vn/wp-content/uploads/2023/04/Anh-Avatar-doi-13.jpg',
                same_friends: '5',
                created: new Date(),
            }
        ],
        total: '9'
    }

    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };
    const [friendRequests, setFriendRequests] = useState(data.friends);

    const onPressGoBackHandler = () => {
        navigation.goBack()
    }
    const onPressAllFriendsHandler = () => {
        // const { friends } = this.props
        // navigation.push('FullFriends', {
        //     friends
        // })
    }
    const onPressFriendRequestsHandler = () => {
        //navigation.push('FriendRequests')
    }

    const onPressProfileHandler = () => {

    }

    const onPressArrangeHandler = () => {
        // Xử lý khi ấn nút Sắp xếp
        toggleModal();
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
            <ScrollView
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
                                // onPress={onPressProfileHandler.bind(this, friendRequest.id)} 
                                key={index}
                                style={styles.recommendFriendItem}>
                                <Image style={styles.avatar} source={{ uri: friendRequest.avatar }} />
                                <View style={styles.recommendInfo}>
                                    <Text style={styles.name}>{friendRequest.username}</Text>
                                    <Text style={styles.mutualCount}>{friendRequest.same_friends} bạn chung</Text>
                                    <View style={styles.btnActionsWrapper}>
                                        <TouchableOpacity style={styles.btnAddFriend}>
                                            <Text style={{ color: '#fff', fontWeight: '500', fontSize: 16 }}>Chấp nhận</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            // onPress={onPressRemoveFriendRequest.bind(this, index)} 
                                            style={styles.btnHide}>
                                            <Text style={{ color: '#000', fontWeight: '500', fontSize: 16 }}>Xoá</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            </ScrollView>
            <Modal
                isVisible={isModalVisible}
                onBackdropPress={toggleModal}
                onBackButtonPress={toggleModal}
                backdropOpacity={0.3}
                onSwipeComplete={() => setModalVisible(false)}
                useNativeDriverForBackdrop
                swipeDirection={['down']}
                style={{ margin: 5, borderRadius: 50 }}
            >
                <ArrangeWrapper />
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
        paddingLeft: 10
    },
    name: {
        fontSize: 16,
        color: '#000',
        fontWeight: '700'
    },
    mutualCount: {
        fontSize: 14,
        color: '#333',
        marginVertical: 5
    },
    btnActionsWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between'
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
});

export default FriendRequestScreen;
