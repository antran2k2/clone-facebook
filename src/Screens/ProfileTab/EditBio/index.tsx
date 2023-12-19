import React, { MutableRefObject, useRef, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, TextInput, Dimensions, Image, Button, SafeAreaView, StatusBar, ImageBackground } from "react-native";
import { useNavigation, useRoute } from '@react-navigation/native';
import { ScreenNavigationProp } from '@/Routes/Stack';
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";

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


const EditBioScreen = () => {
    const navigation = useNavigation<ScreenNavigationProp>();
    const [description, setDescription] = useState("")

    const handleBack = () => {
        navigation.goBack();
    };
    const handlePost = () => {

        //Gọi API SetUserInfo với giá trị description mới  
        console.log(description);

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
                    <Text style={styles.textNavigationBar}>Chỉnh sửa tiểu sử</Text>
                </View>
                <TouchableOpacity style={styles.btnPost}
                    onPress={() => handlePost()}
                >
                    <Text style={styles.btnText}>Lưu</Text>
                </TouchableOpacity>
            </View>
            <View
                style={{
                    marginTop: 20,
                    marginHorizontal: 16
                }}
            >
                <View
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}
                >
                    <Image
                        style={{
                            marginRight: 10,
                            borderRadius: 50,
                            width: 50,
                            height: 50,
                        }}
                        source={{
                            uri: user.avatar
                        }}
                    />
                    <View>
                        <Text
                            style={{
                                fontSize: 20,
                                fontWeight: '600',
                            }}
                        >
                            {user.username}
                        </Text>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}>
                            {/* <FontAwesomeIcon icon={faGlobeAsia} size={16} style={{ marginHorizontal: 5 }} /> */}
                            <Text>Public</Text>
                        </View>
                    </View>
                </View>
            </View>
            <TextInput
                placeholder="Thêm tiểu sử ngắn, chẳng hạn câu trích dẫn bạn yêu thích hoặc những điều khiến bạn hạn phúc."
                multiline={true}
                textAlignVertical="top"
                onChangeText={(newText) => setDescription(newText)}
                style={{
                    height: 200,
                    margin: 15,
                    padding: 10,
                    borderColor: 'gray',
                    borderWidth: 1,
                    borderRadius: 5,

                }}
            >
            </TextInput>

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

export default EditBioScreen;
