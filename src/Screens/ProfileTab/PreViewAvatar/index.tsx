import React, { MutableRefObject, useRef, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, TextInput, Dimensions, Image, Button, SafeAreaView, StatusBar, ImageBackground } from "react-native";
import { useNavigation, useRoute } from '@react-navigation/native';
import { ScreenNavigationProp, ScreenFullFriendProp, ScreenPreViewImageProp } from '@/Routes/Stack';
import { TFriend, TUserFriend, TUserInfo } from '@/types/user.type';
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";


const PreViewAvatarScreen = () => {
    const navigation = useNavigation<ScreenNavigationProp>();
    const route = useRoute<ScreenPreViewImageProp>();

    const [link, setLink] = useState(route.params.link);
    const type = route.params.type;

    const handleBack = () => {
        navigation.goBack();
    };

    const handlePost = () => {
        // Dùng link ảnh sau đó láy UserId trong redux và gọi APi SET UserInfo
        //Dựa vào Type để biết là thay Avatar hay thay CoverImage
        if (type === 'avatar') {

        }

        if (type === 'cover_image') {

        }

        navigation.navigate("ProfileTab")
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
                    <Text style={styles.textNavigationBar}>Xem trước ảnh</Text>
                </View>
                <TouchableOpacity style={styles.btnPost}
                    onPress={() => handlePost()}
                >
                    <Text style={styles.btnText}>Lưu</Text>
                </TouchableOpacity>

            </View>
            <View style={styles.container}>
                <View
                    style={{
                        flexDirection: 'row',
                        marginLeft: 15,
                        marginTop: 5,
                        alignItems: 'center',
                    }}
                >
                    <Text>Đến:</Text>
                    <MaterialCommunityIcons name="earth" color="#000" size={20} />
                    <Text>Công khai</Text>
                </View>

                <ImageBackground
                    style={styles.avatar}
                    source={{
                        uri: link,
                    }}
                ></ImageBackground>

                <View
                    style={{
                        marginTop: 15,
                        flexDirection: 'row',
                        marginHorizontal: 15,
                    }}
                >
                    <TouchableOpacity style={styles.btnTemporary}>
                        <MaterialCommunityIcons name="clock-time-four" size={20}></MaterialCommunityIcons>
                        <Text style={{ fontSize: 16, fontWeight: '500', color: 'black', marginLeft: 5 }}>
                            Để tạm thời
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.btnAddFrame}>
                        <MaterialCommunityIcons name="image-frame" size={20}></MaterialCommunityIcons>
                        <Text style={{ fontSize: 16, fontWeight: '500', color: 'black', marginLeft: 5 }}>
                            Thêm khung
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* <TextInput
                    // onChangeText={(newText) => setContent(newText)}
                    placeholder="Say something about your profile picture..."
                    // value={content}
                    // variant="standard"
                    multiline
                    style={{
                        marginHorizontal: 15,
                        marginTop: 15,
                        marginBottom: 15,
                    }}
                ></TextInput> */}
            </View>
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
});

export default PreViewAvatarScreen;
