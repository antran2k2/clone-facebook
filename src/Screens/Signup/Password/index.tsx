import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Alert } from "react-native";
import { TextInput, Button } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ScreenNavigationProp, ScreenPasswordProp, SignUpInfo } from '@/Routes/Stack';

const PasswordScreen = () => {
    const navigation = useNavigation<ScreenNavigationProp>();
    const route = useRoute<ScreenPasswordProp>();
    const [password, setPassword] = useState('');
    const [alertText, setAlertText] = useState('');

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    const handlePassword = () => {

        if (password.length < 6 || password.length > 10) {
            setAlertText('Mật khẩu phải có từ 6 đến 10 kí tự');
            return;
        }
        const info: SignUpInfo = {
            ho: route.params.ho,
            ten: route.params.ten,
            birthDay: route.params.birthDay,
            email: route.params.email,
            password: password
        }
        setAlertText('');
        navigation.navigate('Confirm', info);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.titleText}>Nhập mật khẩu của bạn?</Text>
            <Text style={styles.alertText}>{alertText}</Text>
            <TextInput
                style={styles.input}
                label="Mật khẩu"
                value={password}
                secureTextEntry={!isPasswordVisible}
                onChangeText={text => setPassword(text)}
                right={
                    <TextInput.Icon
                        icon={isPasswordVisible ? 'eye-off' : 'eye'}
                        onPress={togglePasswordVisibility}
                    />
                }
            />
            <TouchableOpacity
                style={styles.PasswordButton}
                onPress={handlePassword}>
                <Text style={styles.PasswordButtonText}>Tiếp</Text>
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
        fontWeight: 'bold',
        color: "rgba(0,0,0,1)",
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
    PasswordButton: {
        width: '100%',
        height: 40,
        backgroundColor: '#1877f2',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
        marginBottom: 10,
    },
    PasswordButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default PasswordScreen;
