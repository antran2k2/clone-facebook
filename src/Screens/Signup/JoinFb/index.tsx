import React from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { ScreenNavigationProp } from '@/Routes/Stack';

const JoinFbScreen = () => {
    const navigation = useNavigation<ScreenNavigationProp>();

    return (
        <View style={styles.container}>
            <Image
                source={require('@/Assets/Images/SignUpLogo.png')}
                resizeMode="contain"
                style={styles.logo}
            />
            <Text style={styles.titleText}>Tham gia Anti Facebook</Text>
            <Text style={styles.infoText}>
                Chúng tôi sẽ giúp bạn tạo tài khoản mới sau vài bước dễ dàng
            </Text>
            <TouchableOpacity
                style={styles.loginButton}
                onPress={() => navigation.navigate('Name')}>
                <Text style={styles.loginButtonText}>Tiếp</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    logo: {
        width: 224,
        height: 224,
        // marginBottom: 150,
    },
    titleText: {
        fontFamily: "roboto-900",
        fontWeight: 'bold',
        color: "rgba(0,0,0,1)",
        width: 375,
        height: 36,
        fontSize: 24,
        textAlign: "center",
        marginTop: 30,
        marginLeft: 10
    },
    infoText: {
        fontFamily: "roboto-regular",
        color: "#121212",
        textAlign: "center",
        fontSize: 18,
        opacity: 0.7,
        marginTop: 16,
    },
    loginButton: {
        width: '100%',
        height: 40,
        backgroundColor: '#1877f2',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
        marginBottom: 10,
    },
    loginButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default JoinFbScreen;
