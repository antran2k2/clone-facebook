import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Alert } from "react-native";
import { TextInput, Button } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ScreenNavigationProp, ScreenConfirmProp, SignUpInfo } from '@/Routes/Stack';

const ConfirmScreen = () => {
    const navigation = useNavigation<ScreenNavigationProp>();
    const route = useRoute<ScreenConfirmProp>();
    const [code, setCode] = useState('');
    const [alertText, setAlertText] = useState('');

    const info: SignUpInfo = {
        ho: route.params.ho,
        ten: route.params.ten,
        birthDay: route.params.birthDay,
        email: route.params.email,
        password: route.params.password
    }

    const handleConfirm = () => {

        setAlertText('');
        navigation.navigate('Home');
    };

    const handleSendCode = () => {

        setAlertText('');
        navigation.navigate('Home');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.titleText}>Chúng tôi đã gửi mã xác nhận tới
                <Text style={{ fontWeight: 'bold' }}> {info.email}</Text>
            </Text>
            <Text style={{ fontWeight: 'bold', color: "rgba(0,0,0,1)", fontSize: 20, textAlign: "center", }}> Nhập mã gồm 5 chữ số </Text>
            {/* <Text style={styles.alertText}>{alertText}</Text> */}
            <TextInput
                style={styles.input}
                value={code}
                onChangeText={text => setCode(text)}
            />
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
        width: '100%',
        height: 60,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
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
        backgroundColor: '#fff',
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
});

export default ConfirmScreen;
