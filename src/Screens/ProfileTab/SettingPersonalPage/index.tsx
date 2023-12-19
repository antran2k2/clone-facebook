import React, { MutableRefObject, useRef, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, TextInput, Dimensions, Image, Button, SafeAreaView, StatusBar, ImageBackground, Clipboard } from "react-native";
import { useNavigation, useRoute } from '@react-navigation/native';
import { ScreenNavigationProp, ScreenFullFriendProp, ScreenPreViewImageProp } from '@/Routes/Stack';
import { TFriend, TUserFriend, TUserInfo } from '@/types/user.type';
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
// import Clipboard from '@react-native-clipboard/clipboard';

//Giá trị User lấy trong Redux hoặc call API getUserInfo
const user = {
    id: '1',
    username: 'Duy Anh',
    created: new Date(),
    description: "The best is yet to come",
    avatar: 'https://thuthuatnhanh.com/wp-content/uploads/2018/07/anh-dai-dien-dep.jpg',
    cover_image: 'https://images.pexels.com/photos/572897/pexels-photo-572897.jpeg?auto=compress&cs=tinysrgb&w=600',
    link: 'https://www.facebook.com/profile.php?id=100014770352006',
    address: 'Ha-Nam, Hà Nam, Việt Nam',
    city: 'Hà Nam',
    country: 'VietNam',
    listing: '6',
    is_friend: 'true',
    online: '1',
    coins: '100'
}


const SettingPersonalPageScreen = () => {
    const navigation = useNavigation<ScreenNavigationProp>();
    const [link, setLink] = useState("");

    const handleBack = () => {
        navigation.goBack();
    };
    const handlePost = () => {

        //Gọi API SetUserInfo với giá trị link mới  
        console.log(link);

        navigation.goBack();
    }

    return (
        <View style={styles.parentContainer}>
            <View style={styles.navigationBar}>
                <View style={styles.navigationBarLeft}>
                    <TouchableOpacity
                        onPress={handleBack}
                        style={styles.btnBack}>
                        <FontAwesome5Icon name="arrow-left" color="#000" size={20} />
                    </TouchableOpacity>
                    <Text style={styles.textNavigationBar}>Cài đặt trang cá nhân</Text>
                </View>
            </View>
            <ScrollView>
                <View style={{ height: 10, backgroundColor: '#ddd' }}></View>
                <TouchableOpacity style={styles.postOptionItemWrapper}
                    onPress={() => { navigation.navigate("EditPublicInfo") }}>
                    <View style={styles.postOptionItem}>
                        <View style={styles.optionIcon}><MaterialCommunityIcons name="pencil-outline" size={26} color="#000"></MaterialCommunityIcons></View>
                        <View>
                            <Text style={{
                                fontSize: 17,
                                fontWeight: '400',
                                color: '#000'
                            }}>Chỉnh sửa trang cá nhân</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.postOptionItemWrapper}>
                    <View style={styles.postOptionItem}>
                        <View style={styles.optionIcon}><MaterialCommunityIcons name="clock-time-eight-outline" size={26} color="#000"></MaterialCommunityIcons></View>
                        <View>
                            <Text style={{
                                fontSize: 17,
                                fontWeight: '400',
                                color: '#000'
                            }}>Kho lưu trữ tin</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.postOptionItemWrapper}>
                    <View style={styles.postOptionItem}>
                        <View style={styles.optionIcon}><MaterialCommunityIcons name="tag-outline" size={26} color="#000"></MaterialCommunityIcons></View>
                        <View>
                            <Text style={{
                                fontSize: 17,
                                fontWeight: '400',
                                color: '#000'
                            }}>Mục đã lưu</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <View style={{ height: 10, backgroundColor: '#ddd' }}></View>
                <TouchableOpacity style={styles.postOptionItemWrapper}>
                    <View style={styles.postOptionItem}>
                        <View style={styles.optionIcon}><MaterialCommunityIcons name="eye-outline" size={26} color="#000"></MaterialCommunityIcons></View>
                        <View>
                            <Text style={{
                                fontSize: 17,
                                fontWeight: '400',
                                color: '#000'
                            }}>Chế độ xem</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.postOptionItemWrapper}>
                    <View style={styles.postOptionItem}>
                        <View style={styles.optionIcon}><MaterialCommunityIcons name="format-list-bulleted" size={26} color="#000"></MaterialCommunityIcons></View>
                        <View>
                            <Text style={{
                                fontSize: 17,
                                fontWeight: '400',
                                color: '#000'
                            }}>Nhật kí hoạt động</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.postOptionItemWrapper}>
                    <View style={styles.postOptionItem}>
                        <View style={styles.optionIcon}><MaterialCommunityIcons name="text-box-outline" size={26} color="#000"></MaterialCommunityIcons></View>
                        <View>
                            <Text style={{
                                fontSize: 17,
                                fontWeight: '400',
                                color: '#000'
                            }}>Quản lý bài viết</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.postOptionItemWrapper}>
                    <View style={styles.postOptionItem}>
                        <View style={styles.optionIcon}><MaterialCommunityIcons name="timeline-text-outline" size={26} color="#000"></MaterialCommunityIcons></View>
                        <View>
                            <Text style={{
                                fontSize: 17,
                                fontWeight: '400',
                                color: '#000'
                            }}>Xem lại dòng thời gian</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.postOptionItemWrapper}>
                    <View style={styles.postOptionItem}>
                        <View style={styles.optionIcon}><MaterialCommunityIcons name="lock-outline" size={25} color="#000"></MaterialCommunityIcons></View>
                        <View>
                            <Text style={{
                                fontSize: 17,
                                fontWeight: '400',
                                color: '#000'
                            }}>Xem lối tắt quyền riêng tư</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.postOptionItemWrapper}>
                    <View style={styles.postOptionItem}>
                        <View style={styles.optionIcon}><FontAwesome5 name="search" size={26}></FontAwesome5></View>
                        <View>
                            <Text style={{
                                fontSize: 17,
                                fontWeight: '400',
                                color: '#000'
                            }}>Tìm kiếm trên trang cá nhân</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <View style={{ height: 10, backgroundColor: '#ddd' }}></View>
                <TouchableOpacity style={styles.postOptionItemWrapper}>
                    <View>
                        <Text style={{
                            fontSize: 20,
                            fontWeight: '700',
                            color: '#000',
                            marginBottom: 8,
                            marginTop: 8
                        }}>Liên kết đến trang cá nhân của bạn</Text>
                        <Text style={{ fontSize: 15, paddingRight: 30 }}>Liên kết của riêng bạn trên AntiFacebook</Text>
                    </View>
                </TouchableOpacity>
                {user.link ? (
                    <TouchableOpacity style={styles.postOptionItemWrapper}>
                        <View>
                            <Text style={{
                                fontSize: 16,
                                fontWeight: '700',
                                color: '#000',
                                marginBottom: 8,
                                marginTop: 4
                            }}>{user.link}</Text>
                            <TouchableOpacity
                                style={{
                                    borderRadius: 8,
                                    borderWidth: 1,
                                    borderColor: '#ddd',
                                    paddingHorizontal: 6,
                                    paddingVertical: 8,
                                    width: 150
                                }}
                                onPress={() => Clipboard.setString(user.link)}
                            >
                                <Text style={{ color: '#000', fontWeight: '500' }}>SAO CHÉP LIÊN KẾT</Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>) : (<View></View>)}

            </ScrollView>

        </View>


    );

}

const windowHeight = Math.round(Dimensions.get('window').height);
const windowWidth = Math.round(Dimensions.get('window').width);

const styles = StyleSheet.create({
    parentContainer: {
        backgroundColor: 'white',
        flex: 1,
    },
    container: {},
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
    btnPost: {
        backgroundColor: '#1877F2',
        borderRadius: 8,
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 5,
        marginRight: 12
    },
    btnText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'white',
    },
    avatar: {
        width: windowWidth,
        height: 400,
        marginVertical: 15,
    },
    btnTemporary: {
        backgroundColor: '#E4E4E4',
        borderRadius: 5,
        height: 40,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: 150,
        marginRight: 13,
    },
    btnAddFrame: {
        backgroundColor: '#E4E4E4',
        borderRadius: 5,
        height: 40,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: 150,
        marginRight: 13,
    },
    postOptionItemWrapper: {
        paddingBottom: 14,
        paddingTop: 12,
        paddingLeft: 20,
        paddingRight: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd'
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

export default SettingPersonalPageScreen;
