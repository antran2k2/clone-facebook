import React, { MutableRefObject, useRef, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, TextInput, Dimensions, Image, Button, SafeAreaView, StatusBar, ImageBackground } from "react-native";
import { useNavigation, useRoute } from '@react-navigation/native';
import { ScreenNavigationProp, ScreenFullFriendProp, ScreenPreViewImageProp } from '@/Routes/Stack';
import { TFriend, TUserFriend, TUserInfo } from '@/types/user.type';
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import { SCREEN_WIDTH, SCREEN_HEIGHT, STATUSBAR_HEIGHT } from '@/Constants'
import Modal from "react-native-modal";
import ArrangeWrapper from "@/Components/ArrangeWrapper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { CheckBox } from "react-native-elements";

//Giá trị User lấy trong Redux hoặc call API getUserInfo
const user = {
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
    coins: '100'
}


const EditDetailScreen = () => {
    const navigation = useNavigation<ScreenNavigationProp>();
    const [address, setAddress] = useState("")
    const [city, setCity] = useState("")
    const [country, setCountry] = useState("")
    const [checked, setChecked] = useState(false)

    const handleBack = () => {
        navigation.goBack();
    };
    const handlePost = () => {

        //Gọi API SetUserInfo với giá trị address,city,country mới  
        //Nhớ check xem 3 trường đấy có khác "" hay không rồi ms truyền
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
                    <Text style={styles.textNavigationBar}>Chỉnh sửa chi tiết</Text>
                </View>
                <TouchableOpacity style={styles.btnPost}
                    onPress={handleBack}
                >
                    <Text style={styles.btnText}>Hủy</Text>
                </TouchableOpacity>
            </View>

            <ScrollView>
                <View style={styles.detail}>
                    <View style={styles.detailTitleWrapper}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Chỉnh sửa phần giới thiệu</Text>

                    </View>

                    <View style={{ marginVertical: 5 }}>
                        <Text style={styles.featuredTxt}>
                            Chi tiết bạn chọn sẽ hiển thị công khai.
                        </Text>
                    </View>
                </View>
                <View style={styles.detail}>
                    <View style={styles.detailTitleWrapper}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Danh xưng</Text>

                    </View>

                    <TouchableOpacity style={styles.btnTryIt}>
                        <Text style={{ color: 'black', fontSize: 16, fontWeight: '500' }}>Thêm danh xưng vào trang cá nhân</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.detail}>
                    <View style={styles.detailTitleWrapper}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Quê quán</Text>

                    </View>
                    <TextInput
                        placeholder="Thêm địa chỉ hiện tại của bạn"
                        defaultValue={user.address ? user.address : undefined}
                        multiline={true}
                        textAlignVertical="top"
                        onChangeText={(newText) => setAddress(newText)}
                        style={{
                            height: 40,
                            margin: 15,
                            padding: 10,
                            borderColor: 'gray',
                            borderWidth: 1,
                            borderRadius: 5,
                        }}
                    >
                    </TextInput>
                    <TextInput
                        placeholder="Thêm tỉnh/Thành Phố hiện tại"
                        defaultValue={user.city ? user.city : undefined}
                        multiline={true}
                        textAlignVertical="top"
                        onChangeText={(newText) => setCity(newText)}
                        style={{
                            height: 40,
                            margin: 15,
                            padding: 10,
                            borderColor: 'gray',
                            borderWidth: 1,
                            borderRadius: 5,
                        }}
                    >
                    </TextInput>
                    <TextInput
                        placeholder="Thêm thông tin đất nước"
                        defaultValue={user.country ? user.country : undefined}
                        multiline={true}
                        textAlignVertical="top"
                        onChangeText={(newText) => setCountry(newText)}
                        style={{
                            height: 40,
                            margin: 15,
                            padding: 10,
                            borderColor: 'gray',
                            borderWidth: 1,
                            borderRadius: 5,
                        }}
                    >
                    </TextInput>
                </View>
                <View style={styles.detail}>
                    <View style={styles.detailTitleWrapper}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Học vấn</Text>

                    </View>

                    <TouchableOpacity style={styles.btnTryIt}>
                        <Text style={{ color: 'black', fontSize: 16, fontWeight: '500' }}>Thêm trường trung học</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btnTryIt}>
                        <Text style={{ color: 'black', fontSize: 16, fontWeight: '500' }}>Thêm trường cao đẳng/đại học</Text>
                    </TouchableOpacity>

                </View>
                <View style={styles.detail}>
                    <View style={styles.detailTitleWrapper}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Công việc</Text>

                    </View>

                    <TouchableOpacity style={styles.btnTryIt}>
                        <Text style={{ color: 'black', fontSize: 16, fontWeight: '500' }}>Thêm nghề nghiệp</Text>
                    </TouchableOpacity>

                </View>
                <View style={styles.detail}>
                    <View style={styles.detailTitleWrapper}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Mối quan hệ</Text>

                    </View>

                    <TouchableOpacity style={styles.btnTryIt}>
                        <Text style={{ color: 'black', fontSize: 16, fontWeight: '500' }}>Thêm tình trạng mối quan hệ</Text>
                    </TouchableOpacity>

                </View>

                <View style={{ paddingVertical: 15, paddingHorizontal: 15 }}>
                    <TouchableOpacity style={styles.btnSave} onPress={handlePost}>
                        <Text style={{ color: 'white', fontSize: 16, fontWeight: '500' }}>Lưu</Text>
                    </TouchableOpacity>

                </View>
                <View style={{ ...styles.detail, ...styles.lastDetail, marginBottom: 60 }} />

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
    detailsWrapper: {
        paddingHorizontal: 15,
    },
    detail: {
        borderBottomColor: '#ddd',
        borderBottomWidth: 1,
        paddingVertical: 15,
        marginHorizontal: 15,

    },
    detailTitleWrapper: {
        flexDirection: 'row',
        justifyContent: "space-between",
    },
    wrapperEle: {

        flexDirection: 'row',
        justifyContent: "space-between",
        marginVertical: 5,
    },
    detailTitle: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    featuredTxt: {
        color: 'grey',
        fontSize: 17,
    },
    btnOption: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 55,
        marginBottom: 20,
    },
    btnTryIt: {
        height: 35,
        width: '100%',
        backgroundColor: '#ddd',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        borderRadius: 5,
        marginVertical: 5,
    },
    btnSave: {
        height: 35,
        width: '100%',
        backgroundColor: '#318bfb',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        borderRadius: 5,
    },
    lastDetail: {
        marginBottom: 30,
        borderBottomWidth: 0,
    },

});

export default EditDetailScreen;
