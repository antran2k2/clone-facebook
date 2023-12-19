import { useAppSelector } from '@/Redux/store';
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { TUserFriend, TUserInfo } from '@/types/user.type';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import FriendsShowing from '@/Components/FriendsShowing';
import { SCREEN_WIDTH } from '@/Constants'
import { ScreenNavigationProp } from '@/Routes/Stack';
import { useNavigation, useRoute } from '@react-navigation/native';
import Modal from "react-native-modal";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import BuyCoinScreen from '@/Components/BuyCoin';


const data: TUserInfo = {
    id: '1',
    username: 'Duy Anh',
    created: new Date(),
    description: "The best is yet to come",
    avatar: 'https://thuthuatnhanh.com/wp-content/uploads/2018/07/anh-dai-dien-dep.jpg',
    cover_image: 'https://images.pexels.com/photos/572897/pexels-photo-572897.jpeg?auto=compress&cs=tinysrgb&w=600',
    link: 'https://www.facebook.com/profile.php?id=100014770352006',
    address: 'Ha-Nam',
    city: 'Hà Nam',
    country: 'VietNam',
    listing: '9',
    is_friend: 'true',
    online: '1',
    coins: '100',
}

const userFriends: TUserFriend = {
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

const ProfileTabScreen = () => {
    const navigation = useNavigation<ScreenNavigationProp>();

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

    const [userFriendsState, setUserFriendState] = useState(userFriends);

    const onPressAvatarOptionsHandler = () => {
        toggleModal1();
    }

    const onPressCoverImageOptionsHandler = () => {
        toggleModal2();
    }

    const onPressProfileSettingHandler = () => {
        navigation.navigate("SettingPersonalPage")
    }

    const onPressEditPublicInfoHandler = () => {
        navigation.navigate("EditPublicInfo")
    }

    const onPressCoinHandler = () => {
        toggleModal3();
    }

    const onPressShowImage = () => {
        setModalVisible1(false);
        setModalVisible2(false);
        navigation.navigate("ShowImage", {
            link: data.cover_image
        })
    }

    const onPressChangeAvatar = () => {
        setModalVisible1(false);
        setModalVisible2(false);
        navigation.navigate("ChangeAvatar", {
            type: 'avatar'
        });
    }

    const onPressChangeImageCover = () => {
        setModalVisible1(false);
        setModalVisible2(false);
        navigation.navigate("ChangeAvatar", {
            type: 'cover_image'
        });
    }

    return (
        <ScrollView bounces={false} style={styles.container}>
            <View style={styles.infoWrapper}>
                <View style={styles.avatarCoverWrapper}>
                    <TouchableOpacity activeOpacity={0.8}
                        onPress={() => {
                            navigation.navigate("ShowImage", {
                                link: data.cover_image
                            })
                        }}
                    >
                        <Image style={styles.cover} source={{ uri: data.cover_image }} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btnChangeCover} onPress={onPressCoverImageOptionsHandler}>
                        <FontAwesome5Icon size={18} name="camera" />
                    </TouchableOpacity>
                    <View style={styles.avatarWrapper}>
                        <TouchableOpacity activeOpacity={0.9} onPress={() => {
                            navigation.navigate("ShowImage", {
                                link: data.avatar
                            })
                        }}>
                            <Image style={styles.avatar} source={{ uri: data.avatar }} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onPressAvatarOptionsHandler} style={styles.btnChangeAvatar}>
                            <FontAwesome5Icon size={18} name="camera" />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.introWrapper}>
                    <Text style={styles.name}>{data.username}</Text>
                    <Text style={styles.introTxt}>{data.description}</Text>
                    <View style={styles.introButtonWrapper}>
                        <TouchableOpacity activeOpacity={0.8} style={styles.btnCoin}>
                            <Text style={{ fontSize: 16, fontWeight: '500', color: '#fff', marginRight: 5 }}>{data.coins}</Text>
                            <FontAwesome5Icon size={16} color="#fff" name="bitcoin" />
                        </TouchableOpacity>
                        <View style={styles.introOptionsWrapper}>
                            <TouchableOpacity
                                onPress={onPressCoinHandler}
                                activeOpacity={0.8} style={styles.btnAddStory}
                            >
                                <FontAwesome5Icon size={16} color="#fff" name="plus-circle" />
                                <Text style={{ fontSize: 16, fontWeight: '500', color: '#fff', marginLeft: 5 }}>Nạp thêm Coin</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={onPressProfileSettingHandler} activeOpacity={0.8} style={styles.btnOption}>
                                <FontAwesome5Icon size={20} color="#000" name="ellipsis-h" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={styles.introListWrapper}>
                    <View style={styles.introLine}>
                        <FontAwesome5Icon size={20} color="#333" style={styles.introIcon} name="home" />
                        <Text style={styles.introLineText}>
                            Sống tại <Text style={styles.introHightLight}>{data.city}</Text>
                        </Text>
                    </View>
                    <View style={styles.introLine}>
                        <FontAwesome5Icon size={20} color="#333" style={styles.introIcon} name="map-marker-alt" />
                        <Text style={styles.introLineText}>
                            Đến từ <Text style={styles.introHightLight}>{data.address}, {data.city}, {data.country}</Text>
                        </Text>
                    </View>
                    <View style={styles.introLine}>
                        <FontAwesome5Icon size={20} color="#333" style={styles.introIcon} name="rss" />
                        <Text style={styles.introLineText}>
                            Có <Text style={styles.introHightLight}>{data.listing} </Text>người theo dõi
                        </Text>
                    </View>
                    <View style={styles.introLine}>
                        <FontAwesome5Icon size={20} color="#333" style={styles.introIcon} name="link" />
                        <TouchableOpacity>
                            <Text style={styles.introLineText}>
                                {data.link}
                            </Text>
                        </TouchableOpacity>

                    </View>
                    <View style={styles.introLine}>
                        <FontAwesome5Icon size={20} color="#333" style={styles.introIcon} name="ellipsis-h" />
                        <TouchableOpacity>
                            <Text style={styles.introLineText}>
                                Xem thông tin giới thiệu của bạn
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ paddingVertical: 20, borderBottomWidth: 0.5, borderBottomColor: '#ddd' }}>
                    <TouchableOpacity
                        onPress={onPressEditPublicInfoHandler}
                        activeOpacity={0.8}
                        style={styles.btnEditPublicDetail}>
                        <Text style={{ color: '#276fc8', fontSize: 16, fontWeight: '500' }}>Chỉnh sửa chi tiết công khai</Text>
                    </TouchableOpacity>
                </View>
                <FriendsShowing userFriends={userFriendsState} user_id={data.id} />
            </View>
            <ScrollView
                // alignItems="center"
                bounces={false}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                style={styles.navigationsWrapper}>
                <TouchableOpacity style={styles.navigation}>
                    <FontAwesome5Icon style={styles.navigationIcon} color="#000" size={20} name="images" />
                    <Text style={{ fontSize: 16, fontWeight: "500" }}>Ảnh</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navigation}>
                    <FontAwesome5Icon style={styles.navigationIcon} color="#000" size={20} name="video" />
                    <Text style={{ fontSize: 16, fontWeight: "500" }}>Videos</Text>
                </TouchableOpacity>
            </ScrollView >
            {/* Model when Click Avatar*/}
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
                <View style={styles.modalView}>
                    <TouchableOpacity
                        style={{ ...styles.modalButton, marginTop: 15 }}
                    >
                        <View style={styles.modalIcon}>
                            <MaterialCommunityIcons name="image-frame" size={20}></MaterialCommunityIcons>
                        </View>
                        <Text style={styles.modalText}>Thêm khung</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.modalButton}>
                        <View style={styles.modalIcon}>
                            <MaterialCommunityIcons name="video" size={20}></MaterialCommunityIcons>
                        </View>
                        <Text style={styles.modalText}>Quay video đại diện</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.modalButton}>
                        <View style={styles.modalIcon}>
                            <Entypo name="video" size={20}></Entypo>
                        </View>
                        <Text style={styles.modalText}>Chọn video đại diện</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.modalButton}
                        onPress={() => onPressChangeAvatar()}
                    >
                        <View style={styles.modalIcon}>
                            <MaterialCommunityIcons name="image" size={20}></MaterialCommunityIcons>
                        </View>
                        <Text style={styles.modalText}>Chọn ảnh đại diện</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
            {/* Model when Click Cover Image*/}
            <Modal
                isVisible={isModalVisible2}
                onBackdropPress={toggleModal2}
                onBackButtonPress={toggleModal2}
                backdropOpacity={0.3}
                onSwipeComplete={() => setModalVisible2(false)}
                useNativeDriverForBackdrop
                swipeDirection={['down']}
                style={{
                    margin: 5, borderRadius: 50, flex: 1,
                    justifyContent: 'flex-end',
                }}
            >
                <View style={styles.modalView}>
                    <TouchableOpacity
                        style={{ ...styles.modalButton, marginTop: 15 }}
                        onPress={onPressShowImage}
                    >
                        <View style={styles.modalIcon}>
                            <MaterialCommunityIcons name="image" size={20}></MaterialCommunityIcons>
                        </View>
                        <Text style={styles.modalText}>Xem ảnh bìa</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.modalButton}
                        onPress={onPressChangeImageCover}
                    >
                        <View style={styles.modalIcon}>
                            <MaterialCommunityIcons name="upload" size={20}></MaterialCommunityIcons>
                        </View>
                        <Text style={styles.modalText}>Tải ảnh lên</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.modalButton}>
                        <View style={styles.modalIcon}>
                            <MaterialCommunityIcons name="facebook" size={20}></MaterialCommunityIcons>
                        </View>
                        <Text style={styles.modalText}>Chọn ảnh trên Facebook</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.modalButton}>
                        <View style={styles.modalIcon}>
                            <MaterialCommunityIcons name="select-group" size={20}></MaterialCommunityIcons>
                        </View>
                        <Text style={styles.modalText}>Tạo nhóm ảnh bìa</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.modalButton}>
                        <View style={styles.modalIcon}>
                            <FontAwesome5Icon name="paint-brush" size={20}></FontAwesome5Icon>
                        </View>
                        <Text style={styles.modalText}>Chọn ảnh nghệ thuật</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
            {/* Model Buy Coin*/}
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
                <BuyCoinScreen toggleModal={toggleModal3} />
            </Modal>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {

    },
    infoWrapper: {
        padding: 15,
        backgroundColor: '#fff',
        borderBottomColor: '#ddd',
        borderBottomWidth: 1
    },
    avatarCoverWrapper: {
        paddingBottom: 90,
        position: 'relative'
    },
    cover: {
        width: '100%',
        height: 200,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
    avatarWrapper: {
        backgroundColor: '#000',
        position: 'absolute',
        borderRadius: 2000,
        left: (SCREEN_WIDTH - 30 - 180) / 2, //paddingHorizontal - avatarWidth
        bottom: 0
    },
    avatar: {
        height: 180,
        width: 180,
        borderRadius: 2000,
        borderColor: '#fff',
        borderWidth: 5
    },
    btnChangeCover: {
        borderColor: '#fff',
        backgroundColor: '#ddd',
        position: 'absolute',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 50,
        width: 45,
        height: 45,
        borderWidth: 2.5,
        bottom: 90 + 10,
        right: 10,
        justifyContent: 'center',
        alignItems: 'center'

    },
    btnChangeAvatar: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        borderRadius: 50,
        width: 45,
        height: 45,
        borderWidth: 2.5,
        borderColor: '#fff',
        backgroundColor: '#ddd',
        justifyContent: 'center',
        alignItems: 'center'
    },
    imgCamera: {
        height: 34,
        width: 34,
    },
    introWrapper: {
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomColor: '#ddd',
        borderBottomWidth: 0.5
    },
    name: {
        fontSize: 24,
        fontWeight: '500',
        color: '#000'
    },
    introTxt: {
        color: 'rgba(0,0,0,0.7)',
        marginTop: 10
    },
    introButtonWrapper: {
        marginTop: 15,
    },
    introOptionsWrapper: {
        marginTop: 5,
        flexDirection: 'row'
    },
    btnAddStory: {
        backgroundColor: '#318bfb',
        borderRadius: 5,
        height: 40,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: SCREEN_WIDTH - 30 - 50 - 10, //paddingHorizontal optionBtnWidth, marginLeft
    },
    btnCoin: {
        backgroundColor: '#318bfb',
        borderRadius: 5,
        height: 40,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: SCREEN_WIDTH - 30, //paddingHorizontal optionBtnWidth, marginLeft
    },
    btnOption: {
        marginLeft: 10,
        borderRadius: 5,
        height: 40,
        width: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ddd'
    },
    introListWrapper: {
        paddingVertical: 10
    },
    introLine: {
        flexDirection: 'row',
        height: 40,
        alignItems: 'center'
    },
    introIcon: {
        width: 30,
    },
    introLineText: {
        fontSize: 16,
        fontWeight: '400',
        color: '#000'
    },
    introHightLight: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#000'
    },
    btnEditPublicDetail: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e1f0f9',
        width: '100%',
        height: 40,
        borderRadius: 5
    },
    navigationsWrapper: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        marginTop: 15,
        borderTopColor: '#ddd',
        borderTopWidth: 1,
        borderBottomColor: '#ddd',
        borderBottomWidth: 1,
        height: 100,
        width: SCREEN_WIDTH,
        paddingHorizontal: 10,
        paddingTop: 24
    },
    navigation: {
        flexDirection: 'row',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 15,
        backgroundColor: '#ddd',
        borderRadius: 48,
        marginHorizontal: 5
    },
    navigationIcon: {
        width: 30,
        alignItems: "center"
    },
    modalView: {
        paddingBottom: 6,
        backgroundColor: '#fff',
        width: '100%',
        borderRadius: 15,
    },
    modalButton: {
        flexDirection: 'row',
        marginBottom: 15,
        marginLeft: 10,
        alignItems: 'center'
    },
    modalIcon: {
        backgroundColor: '#E4E4E4',
        borderRadius: 50,
        padding: 10
    },
    modalText: {
        marginLeft: 10,
        fontWeight: 'bold',
        fontSize: 17,
    },

});

export default ProfileTabScreen;
