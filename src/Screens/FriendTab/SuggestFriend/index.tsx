import React, { MutableRefObject, useRef, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, TextInput, Dimensions, Image, Button } from "react-native";
import { useNavigation, useRoute } from '@react-navigation/native';
import { ScreenNavigationProp, ScreenFullFriendProp } from '@/Routes/Stack';
import { TFriend, TUserFriend } from '@/types/user.type';
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import { SCREEN_WIDTH, SCREEN_HEIGHT, STATUSBAR_HEIGHT } from '@/Constants'
import Modal from "react-native-modal";
import ArrangeWrapper from "@/Components/ArrangeWrapper";

const SuggestFriendScreen = () => {
    const navigation = useNavigation<ScreenNavigationProp>();
    //--------------------Call APi Get Suggest Friend dựa vào giá trị---------------------
    const data = {
        remainUsers: [
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
                same_friends: '0',
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
        ]
    }

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
    const [friendSuggest, setfriendSuggest] = useState<Array<TFriend | undefined>>(data.remainUsers);
    const [friendSelect, setFriendSelect] = useState<TFriend>();
    const [indexSelect, setIndexSelect] = useState(-1)
    const [arrayFriendSent, setArrayFriendSent] = useState<Array<String | undefined>>([]);
    const [arrayFriendRemoveSent, setArrayFriendRemoveSent] = useState<Array<String | undefined>>([]);

    const onPressGoBackHandler = () => {
        navigation.goBack()
    }
    const onPressAllFriendsHandler = () => {
        // const { friends } = this.props
        // navigation.push('FullFriends', {
        //     friends
        // })
    }
    const onPressfriendSuggestHandler = () => {
        //navigation.push('friendSuggest')
    }

    const onPressProfileHandler = () => {

    }

    // const onPressArrangeHandler = () => {
    //     // Xử lý khi ấn nút Sắp xếp
    //     toggleModal();
    // }

    const onPressSearchHandler = () => {

    }

    const onPressSentFriendRequest = (friend: TFriend | undefined) => {
        setFriendSelect(friend);
        toggleModal1();
    }

    const handleAcceptSent = () => {
        if (arrayFriendRemoveSent.indexOf(friendSelect?.id) !== -1) {
            arrayFriendRemoveSent.splice(arrayFriendRemoveSent.indexOf(friendSelect?.id), 1);
            setArrayFriendRemoveSent(arrayFriendRemoveSent);
        }
        arrayFriendSent.push(friendSelect?.id);
        setArrayFriendSent(arrayFriendSent);
        toggleModal1();

        //Call API gửi lời mời kết bạn
    }

    const onPressRemoveFriendRequest = (friend: TFriend | undefined, index: number) => {
        setFriendSelect(friend);
        setIndexSelect(index);
        toggleModal3();
    }

    const handleRemoveSuggest = () => {
        friendSuggest.splice(indexSelect, 1);
        toggleModal3();
    }

    const onPressCancelFriendRequest = (friend: TFriend | undefined) => {
        setFriendSelect(friend);
        toggleModal2();
    }

    const handleCancelSent = () => {
        arrayFriendSent.splice(arrayFriendSent.indexOf(friendSelect?.id), 1);
        setArrayFriendSent(arrayFriendSent);

        arrayFriendRemoveSent.push(friendSelect?.id);
        setArrayFriendRemoveSent(arrayFriendRemoveSent);
        toggleModal2();
        //Call API Hủy lời mời kết bạn dựa với id_Friend friendSelect?.id
        //Hình như chưa có API hủy lời mời mà mình vừa gửi 
        //Có thể là API delRequestFriend
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
                    <Text style={styles.textNavigationBar}>Gợi ý</Text>
                </View>
                <TouchableOpacity
                    onPress={onPressSearchHandler}
                    style={styles.btnBack}>
                    <FontAwesome5Icon name="search" color="#000" size={20} />
                </TouchableOpacity>
            </View>
            {friendSuggest.length === 0 ?
                (<View style={{
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
                        }}>Không có gợi ý kết bạn mới</Text>
                    </View>
                    <View>
                        <Text style={{
                            fontSize: 15,
                            fontWeight: '400',
                            color: '#000',
                            textAlign: 'center'
                        }}>Những gọi ý kết bạn mới sẽ xuất hiện ở đây</Text>
                    </View>
                </View>) : <ScrollView
                    style={styles.scrollContainer}
                    bounces={false}
                    showsVerticalScrollIndicator={false}>

                    <View style={styles.friendSuggestWrapper}>
                        <View style={styles.friendSuggestWrapperHeader}>
                            <Text style={styles.friendSuggestTitle}>Những người bạn có thể biết</Text>
                        </View>
                        <View style={styles.friendSuggest}>
                            {friendSuggest.map((friendRequest, index) => (
                                <TouchableOpacity
                                    // onPress={onPressProfileHandler.bind(this, friendRequest.id)} 
                                    key={index}
                                    style={styles.recommendFriendItem}>
                                    <Image style={styles.avatar} source={{ uri: friendRequest?.avatar }} />
                                    <View style={styles.recommendInfo}>
                                        <Text style={styles.name}>{friendRequest?.username}</Text>
                                        {arrayFriendSent.includes(friendRequest?.id) ?
                                            (<Text style={styles.mutualCount}>Đã gửi yêu cầu</Text>) :
                                            arrayFriendRemoveSent.includes(friendRequest?.id) ?
                                                (<Text style={styles.mutualCount}>Đã hủy yêu cầu</Text>) :
                                                friendRequest?.same_friends === '0' ?
                                                    (<View style={{ marginVertical: 5 }}></View>) :
                                                    (<Text style={styles.mutualCount}>{friendRequest?.same_friends} bạn chung</Text>)}
                                        {arrayFriendSent.includes(friendRequest?.id) ?
                                            (<View style={styles.btnActionsWrapper}>
                                                <TouchableOpacity
                                                    onPress={onPressCancelFriendRequest.bind(this, friendRequest)}
                                                    style={styles.btnCancel}>
                                                    <Text style={{ color: '#000', fontWeight: '500', fontSize: 16 }}>Hủy</Text>
                                                </TouchableOpacity>
                                            </View>) :
                                            (<View style={styles.btnActionsWrapper}>
                                                <TouchableOpacity
                                                    style={styles.btnAddFriend}
                                                    onPress={onPressSentFriendRequest.bind(this, friendRequest)}>
                                                    <Text style={{ color: '#fff', fontWeight: '500', fontSize: 16 }}>Thêm bạn bè</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity
                                                    onPress={onPressRemoveFriendRequest.bind(this, friendRequest, index)}
                                                    style={styles.btnHide}>
                                                    <Text style={{ color: '#000', fontWeight: '500', fontSize: 16 }}>Gỡ</Text>
                                                </TouchableOpacity>
                                            </View>)}
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                </ScrollView>}
            {/* Model Chấp nhận */}
            <Modal
                isVisible={isModalVisible1}
                onBackdropPress={toggleModal1}
                onBackButtonPress={toggleModal1}
                backdropOpacity={0.3}
                onSwipeComplete={() => setModalVisible1(false)}
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
                        }}>Bạn có chắc chắn muốn gửi lời kết bạn tới {friendSelect?.username} không ? </Text>
                    </View>
                    <View style={styles.postOptionWrapperEnd}>
                        <TouchableOpacity
                            onPress={handleAcceptSent}
                        >
                            <View>
                                <Text style={{
                                    fontSize: 17,
                                    fontWeight: '700',
                                    color: '#318bfb'
                                }}>Xác nhận</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setModalVisible1(false)}>
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
            {/* Model Hủy lời mời kết bạn */}
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
                        }}>Hủy lời mời tới {friendSelect?.username}</Text>
                    </View>
                    <View style={styles.postOptionItemWrapper}>
                        <Text style={{
                            fontSize: 16,
                            fontWeight: '400',
                            color: '#000'
                        }}>Bạn có chắc chắn muốn hủy lời kết bạn tới {friendSelect?.username} không ? </Text>
                    </View>
                    <View style={styles.postOptionWrapperEnd}>
                        <TouchableOpacity
                            onPress={handleCancelSent}
                        >
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
            {/* Model Gỡ lời mời kết bạn */}
            <Modal
                isVisible={isModalVisible3}
                onBackdropPress={toggleModal3}
                onBackButtonPress={toggleModal3}
                backdropOpacity={0.3}
                onSwipeComplete={() => setModalVisible3(false)}
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
                        }}>Gỡ gợi ý kết bạn với {friendSelect?.username}</Text>
                    </View>
                    <View style={styles.postOptionItemWrapper}>
                        <Text style={{
                            fontSize: 16,
                            fontWeight: '400',
                            color: '#000'
                        }}>Bạn có chắc muốn gỡ gợi ý kết bạn với {friendSelect?.username} không ? </Text>
                    </View>
                    <View style={styles.postOptionWrapperEnd}>
                        <TouchableOpacity
                            onPress={handleRemoveSuggest}
                        >
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
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
    },
    navigationBar: {
        flexDirection: 'row',
        padding: 12,
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 64,
        //height: 94,
        borderBottomColor: '#ddd',
        borderBottomWidth: 1
    },
    navigationBarTop: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    btnBack: {
        width: 50,
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
        height: SCREEN_HEIGHT - (STATUSBAR_HEIGHT + 20)
    },
    friendSuggestWrapper: {
        paddingVertical: 15
    },
    friendSuggestWrapperHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    friendSuggestTitle: {
        color: '#000',
        fontSize: 20,
        fontWeight: '800'
    },
    friendSuggest: {
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
        fontWeight: '700',
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
    btnCancel: {
        width: '100%',
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
    navigationBarLeft: {
        flexDirection: 'row',
    },
    textNavigationBar: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
        marginLeft: 5
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
});

export default SuggestFriendScreen;
