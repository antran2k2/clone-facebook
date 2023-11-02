import React, { useState } from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";
import { TextInput, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { ScreenNavigationProp } from '@/Routes/Stack';
import { SignUpInfo } from '@/types/user.type';
import { useAppSelector } from '@/Redux/store';
import { useAppDispatch } from '@/Redux/store';
import { setSignUpInfo } from '@/Redux/reducer/signUpInfo';

const NameScreen = () => {
    const navigation = useNavigation<ScreenNavigationProp>();
    const dispatch = useAppDispatch();
    const [ho, setHo] = useState('');
    const [ten, setTen] = useState('');
    const [alertText, setAlertText] = useState('');

    const handleName = () => {

        if (ho.length === 0 || ten.length === 0) {
            setAlertText('Không thể bỏ trống họ và tên!');
            return;
        }
        setAlertText('');
        const data: SignUpInfo = {
            ho: ho,
            ten: ten
        }
        dispatch(setSignUpInfo(data));
        navigation.navigate('BirthDay');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.titleText}>Bạn tên gì?</Text>
            <Text style={styles.alertText}>{alertText}</Text>
            <View style={styles.containerRow}>
                <TextInput
                    style={styles.input}
                    label="Họ"
                    value={ho}
                    onChangeText={text => setHo(text)}
                />
                <TextInput
                    style={styles.input}
                    label="Tên"
                    value={ten}
                    onChangeText={text => setTen(text)}
                />
            </View>
            <TouchableOpacity
                style={styles.NameButton}
                onPress={handleName}>
                <Text style={styles.nameButtonText}>Tiếp</Text>
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
    containerRow: {
        gap: 8,
        flexDirection: "row",
        justifyContent: 'space-between'
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
    input: {
        minWidth: '50%',
        height: 58,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
        backgroundColor: '#fff',
    },
    NameButton: {
        width: '100%',
        height: 40,
        backgroundColor: '#1877f2',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
        marginBottom: 10,
    },
    nameButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default NameScreen;
