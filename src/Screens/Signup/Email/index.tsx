import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Alert } from "react-native";
import { TextInput, Button } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ScreenNavigationProp, ScreenEmailProp, SignUpInfo } from '@/Routes/Stack';

const EmailScreen = () => {
    const navigation = useNavigation<ScreenNavigationProp>();
    const route = useRoute<ScreenEmailProp>();
    const [email, setEmail] = useState('');
    const [alertText, setAlertText] = useState('');

    const handleEmail = () => {
        //handleRegexEmail
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            setAlertText('Địa chỉ Email không hợp lệ');
            return;
        }

        // handle Email ton tai
        // if(){
        // setAlertText('Hiện đã có tài khoản liên kết với địa chỉ email này');
        //return;
        // }

        const info: SignUpInfo = {
            ho: route.params.ho,
            ten: route.params.ten,
            birthDay: route.params.birthDay,
            email: email,
            password: undefined
        }

        setAlertText('');
        navigation.navigate('Password', info);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.titleText}>Nhập địa chỉ Email của bạn</Text>
            <Text style={styles.alertText}>{alertText}</Text>
            <TextInput
                style={styles.input}
                label="Địa chỉ email"
                value={email}
                onChangeText={text => setEmail(text)}
            />

            <TouchableOpacity
                style={styles.EmailButton}
                onPress={handleEmail}>
                <Text style={styles.EmailButtonText}>Tiếp</Text>
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
        fontFamily: "roboto-900",
        color: "rgba(0,0,0,1)",
        fontWeight: 'bold',
        width: 375,
        height: 36,
        fontSize: 24,
        textAlign: "center",
        marginLeft: 10,
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
    EmailButton: {
        width: '100%',
        height: 40,
        backgroundColor: '#1877f2',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
        marginBottom: 10,
    },
    EmailButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default EmailScreen;
