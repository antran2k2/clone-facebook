import React, { MutableRefObject, useRef, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, TextInput, Dimensions, Image, Button, SafeAreaView, StatusBar } from "react-native";
import { useNavigation, useRoute } from '@react-navigation/native';
import { ScreenNavigationProp, ScreenFullFriendProp } from '@/Routes/Stack';
import { TFriend, TUserFriend, TUserInfo } from '@/types/user.type';
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import { SCREEN_WIDTH, SCREEN_HEIGHT, STATUSBAR_HEIGHT } from '@/Constants'
import Modal from "react-native-modal";
import ArrangeWrapper from "@/Components/ArrangeWrapper";

const EditPublicInfoScreen = () => {
    const navigation = useNavigation<ScreenNavigationProp>();
    //--------------------Call APi Get User_Info dựa vào giá trị userId ở Redux---------------------
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


    const [avatar, setAvatar] = useState(null);
    const [state, setState] = useState(1);
    const [profile, setProfile] = useState([]);
    const [cover, setCover] = useState(null);


    const handleBack = () => {
        navigation.goBack();
    };
    const onPressChangeAvatar = () => {
        navigation.navigate("ChangeAvatar", {
            type: 'avatar'
        });
    };

    const onPressChangeCover = () => {
        navigation.navigate("ChangeAvatar", {
            type: 'cover_image'
        });
    };


    return (
        <SafeAreaView>
            <View
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 16,
                    borderBottomColor: '#ddd',
                    borderBottomWidth: 2,
                    paddingTop: 8,
                    paddingLeft: 16,
                    paddingRight: 16,
                    paddingBottom: 12,
                }}
            >
                <View
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <TouchableOpacity onPress={handleBack}>
                        <FontAwesome5Icon color="#000" name="arrow-left" size={20} />
                    </TouchableOpacity>
                    <Text style={{ marginLeft: 16, fontSize: 17, color: '#000', fontWeight: '600' }}>Chỉnh sửa trang cá nhân</Text>
                </View>
            </View>
            <ScrollView bounces={false} style={styles.detailsWrapper}>
                <View style={{ ...styles.detail, paddingTop: 0 }}>
                    <View style={styles.detailTitleWrapper}>
                        <Text style={styles.detailTitle}>Ảnh đại diện</Text>
                        <TouchableOpacity
                            onPress={onPressChangeAvatar}
                        >
                            <Text style={{ fontSize: 16, color: '#318bfb' }}>Chỉnh sửa</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity activeOpacity={0.8}>
                        <Image
                            source={{
                                uri: data.avatar
                            }}
                            style={styles.avatar}
                        ></Image>
                    </TouchableOpacity>
                </View>
                <View style={styles.detail}>
                    <View style={styles.detailTitleWrapper}>
                        <Text style={styles.detailTitle}>Ảnh bìa</Text>
                        <TouchableOpacity
                            onPress={onPressChangeCover}
                        >
                            <Text style={{ fontSize: 16, color: '#318bfb' }}>Chỉnh sửa</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity activeOpacity={0.8}>
                        <Image
                            source={{
                                uri: data.cover_image
                            }}
                            style={styles.cover}
                        ></Image>
                    </TouchableOpacity>
                </View>
                <View style={styles.detail}>
                    <View style={styles.detailTitleWrapper}>
                        <Text style={styles.detailTitle}>Tiểu sử</Text>
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate('EditBio');
                            }}
                        >
                            <Text style={{ fontSize: 16, color: '#318bfb' }}>{data.description ? 'Chỉnh sửa' : 'Thêm'}</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        activeOpacity={0.8}
                    //onPress={() => {
                    //     navigation.navigate('EditBio', {
                    //         profile: profile,
                    //     });
                    // }}
                    >
                        <Text style={styles.introTxt}>
                            {data.description ? data.description : 'Mô tả bản thân...'}
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.detail}>
                    <View style={styles.detailTitleWrapper}>
                        <Text style={styles.detailTitle}>Chi tiết</Text>
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate('EditDetail');
                            }}
                        >
                            <Text style={{ fontSize: 16, color: '#318bfb' }}>Chỉnh sửa</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.introListWrapper}>
                        <View style={styles.introLine}>
                            <FontAwesome5Icon size={20} color="#333" style={styles.introIcon} name="home" />
                            <Text style={styles.introLineText}>
                                Sống tại <Text style={styles.introHightLight}>{data.city}</Text>
                            </Text>
                        </View>
                        <View style={styles.introLine}>
                            <FontAwesome5Icon
                                size={20}
                                color="#333"
                                style={styles.introIcon}
                                name="map-marker-alt"
                            />
                            <Text style={styles.introLineText}>
                                Đến từ <Text style={styles.introHightLight}>{data.address}, {data.city}, {data.country}</Text>
                            </Text>
                        </View>
                        <View style={styles.introLine}>
                            <FontAwesome5Icon size={20} color="#333" style={styles.introIcon} name="rss" />
                            <Text style={styles.introLineText}>
                                Có <Text style={styles.introHightLight}>{data.listing}</Text> người theo dõi
                            </Text>
                        </View>
                    </View>
                </View>

                <View style={styles.detail}>
                    <View style={styles.detailTitleWrapper}>
                        <Text style={styles.detailTitle}>Đáng chú ý</Text>
                    </View>
                    <Image
                        source={require('@/Assets/Images/featured.png')}
                        style={styles.featured}
                    ></Image>
                    <View style={styles.detailTitleWrapper}></View>
                    <View style={{ marginVertical: 12 }}>
                        <Text style={styles.featuredTxt}>Giới thiệu ảnh và tin bạn thích để tất cả bạn bè</Text>
                        <Text style={styles.featuredTxt}>đầu thấy.</Text>
                    </View>

                    <TouchableOpacity style={styles.btnTryIt}>
                        <Text style={{ color: 'black', fontSize: 16, fontWeight: '500' }}>Dùng thử</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.detail}>
                    <View style={styles.detailTitleWrapper}>
                        <Text style={styles.detailTitle}>Liên kết</Text>
                        <TouchableOpacity onPress={() => {
                            navigation.navigate('EditLink');
                        }}>
                            <Text style={{ fontSize: 16, color: '#318bfb' }}>{data.link ? 'Chỉnh sửa' : 'Thêm'}</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={{
                        color: '#333',
                        textAlign: 'center',
                        marginVertical: 10,
                    }}>
                        {data.link}
                    </Text>
                </View>

                <View style={{ ...styles.detail, ...styles.lastDetail }}>
                    <View style={styles.detailTitleWrapper}>
                        <TouchableOpacity style={styles.btnModifyMore}>
                            <FontAwesome5Icon size={20} color="#318bfb" style={styles.introIcon} name="user" />
                            <Text style={{ color: '#318bfb', fontSize: 16, fontWeight: '500' }}>
                                Chỉnh sửa thông tin giới thiệu
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{ ...styles.detail, ...styles.lastDetail }} />


            </ScrollView>
        </SafeAreaView>

    );

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
    },
    navigationBar: {
        flexDirection: 'row',
        height: 94,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    btnBack: {
        width: 50,
        alignItems: 'center',
    },
    navigationTitle: {
        fontSize: 18,
    },
    detailsWrapper: {
        padding: 15,
    },
    detail: {
        borderBottomColor: '#ddd',
        borderBottomWidth: 1,
        paddingVertical: 15,
    },
    detailTitleWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    detailTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000'
    },
    avatar: {
        width: 140,
        height: 140,
        alignSelf: 'center',
        borderRadius: 140,
    },
    featured: {
        width: '100%',
        height: 100,
        alignSelf: 'center',
        marginVertical: 10,
        resizeMode: 'contain',
    },
    cover: {
        width: '100%',
        height: 200,
        marginVertical: 10,
        borderRadius: 10,
    },
    introTxt: {
        color: '#333',
        alignSelf: 'center',
        marginVertical: 10,
    },
    featuredTxt: {
        color: '#333',
        fontSize: 15,
        alignSelf: 'center',
    },
    introListWrapper: {
        paddingVertical: 10,
    },
    introLine: {
        flexDirection: 'row',
        height: 40,
        alignItems: 'center',
    },
    introIcon: {
        width: 30,
    },
    introLineText: {
        fontSize: 16,
        fontWeight: '400',
    },
    introHightLight: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    highlightGallery: {
        marginVertical: 10,
    },
    lastDetail: {
        marginBottom: 30,
        borderBottomWidth: 0,
    },
    btnModifyMore: {
        height: 40,
        width: '100%',
        backgroundColor: '#c0dceb',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        borderRadius: 5,
    },
    btnTryIt: {
        height: 40,
        width: '100%',
        backgroundColor: '#ddd',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        borderRadius: 5,
    },
});



export default EditPublicInfoScreen;
