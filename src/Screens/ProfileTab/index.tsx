import { useAppSelector } from '@/Redux/store';
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { TUserFriend, TUserInfo } from '@/types/user.type';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import FriendsShowing from '@/Components/FriendsShowing';
import { SCREEN_WIDTH } from '@/Constants'



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
    listing: '6',
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
        }
    ],
    total: '6'
}

const ProfileTabScreen = () => {

    const onPressAvatarOptionsHandler = () => {
        console.log('1');
    }

    const onPressProfileSettingHandler = () => {
        console.log('1');
    }
    return (
        <ScrollView bounces={false} style={styles.container}>
            <View style={styles.infoWrapper}>
                <View style={styles.avatarCoverWrapper}>
                    <TouchableOpacity activeOpacity={0.8}>
                        <Image style={styles.cover} source={{ uri: data.cover_image }} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btnChangeCover}>
                        <FontAwesome5Icon size={18} name="camera" />
                    </TouchableOpacity>
                    <View style={styles.avatarWrapper}>
                        <TouchableOpacity activeOpacity={0.9}>
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
                        <TouchableOpacity activeOpacity={0.8} style={styles.btnAddStory}>
                            <FontAwesome5Icon size={16} color="#fff" name="plus-circle" />
                            <Text style={{ fontSize: 16, fontWeight: '500', color: '#fff', marginLeft: 5 }}>Nạp thêm Coin</Text>
                        </TouchableOpacity>
                        <View style={styles.introOptionsWrapper}>
                            <TouchableOpacity
                                // onPress={onPressProfileSettingHandler} 
                                activeOpacity={0.8} style={styles.btnEditProfileScreen}
                            >
                                <FontAwesome5Icon size={20} color="#000" name="pen" />
                                <Text style={{ fontSize: 16, fontWeight: '500', color: '#000', marginLeft: 5 }}>Chỉnh sửa trang cá nhân</Text>
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
                        // onPress={this.onPressEditPublicInfoHandler.bind(this)}
                        activeOpacity={0.8}
                        style={styles.btnEditPublicDetail}>
                        <Text style={{ color: '#276fc8', fontSize: 16, fontWeight: '500' }}>Chỉnh sửa chi tiết công khai</Text>
                    </TouchableOpacity>
                </View>
                <FriendsShowing userFriends={userFriends} user_id={data.id} />
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
        width: SCREEN_WIDTH - 30, //paddingHorizontal optionBtnWidth, marginLeft
    },
    btnEditProfileScreen: {
        backgroundColor: '#ddd',
        borderRadius: 5,
        height: 40,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: SCREEN_WIDTH - 30 - 50 - 10, //paddingHorizontal optionBtnWidth, marginLeft
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
    }
});

export default ProfileTabScreen;
