import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Alert } from "react-native";
import { TextInput, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { ScreenNavigationProp } from '@/Routes/Stack';
import { SignUpInfo } from '@/types/user.type';
import { useAppSelector } from '@/Redux/store';
import { useAppDispatch } from '@/Redux/store';
import { setSignUpInfo } from '@/Redux/reducer/signUpInfo';

const ConfirmScreen = () => {
    const navigation = useNavigation<ScreenNavigationProp>();
    const [code, setCode] = useState('');
    const [alertText, setAlertText] = useState('');
    const email = useAppSelector(state => state.signUpInfo.data?.email);

    const handleConfirm = () => {

        setAlertText('');
        navigation.navigate('Home');
    };

    const handleSendCode = () => {

        setAlertText('');
        navigation.navigate('Home');
    };

    const handleLogout = () => {

        setAlertText('');
        navigation.navigate('Login');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.titleText}>Chúng tôi đã gửi mã xác nhận tới
                <Text style={{ fontWeight: 'bold' }}> {email}</Text>
            </Text>
            <Text style={{ fontWeight: 'bold', color: "rgba(0,0,0,1)", fontSize: 20, textAlign: "center", }}> Nhập mã gồm 5 chữ số </Text>
            <Text style={{
                fontWeight: 'bold', fontFamily: "roboto-500",
                color: "rgba(0,0,0,1)",
                fontSize: 24,
                textAlign: "center",
                marginTop: 20,
            }}>FB-
                <TextInput
                    style={styles.input}
                    value={code}
                    onChangeText={text => setCode(text)}
                />
            </Text>
            <TouchableOpacity
                style={styles.ConfirmButton}
                onPress={handleConfirm}>
                <Text style={styles.ConfirmButtonText}>Xác nhận</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.SendCodeButton}
                onPress={handleSendCode}>
                <Text style={styles.SendCodeButtonText}>Tôi không nhận được mã</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.LogoutButton}
                onPress={handleLogout}>
                <Text style={styles.LogoutButtonText}>Đăng xuất</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //justifyContent: 'center',
        marginTop: 100,
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    titleText: {
        fontFamily: "roboto-500",
        color: "rgba(0,0,0,1)",
        fontSize: 20,
        textAlign: "center",
    },
    alertText: {
        fontFamily: "roboto-900",
        color: "red",
        width: 375,
        fontSize: 17,
        textAlign: "center",
        marginTop: 20,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 20
    },
    input: {
        width: 100,
        height: 30,
        marginBottom: 30,
        borderRadius: 5,
        backgroundColor: '#fff',
    },
    ConfirmButton: {
        width: '100%',
        height: 40,
        backgroundColor: '#1877f2',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
        marginBottom: 10,
    },
    ConfirmButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    SendCodeButton: {
        width: '100%',
        height: 40,
        backgroundColor: '#A9A9A9',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
        marginBottom: 10,
    },
    SendCodeButtonText: {
        color: '#000',
        fontSize: 16,
        fontWeight: 'bold',
    },
    LogoutButton: {
        width: '100%',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
        marginBottom: 10,
    },
    LogoutButtonText: {
        color: '#1877f2',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default ConfirmScreen;
