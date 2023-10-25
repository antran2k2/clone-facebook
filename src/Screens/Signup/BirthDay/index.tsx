import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Alert } from "react-native";
import { TextInput, Button } from 'react-native-paper';
import DatePicker from 'react-native-date-picker'
import { useNavigation, useRoute } from '@react-navigation/native';
import { ScreenNavigationProp, SignUpInfo, ScreenBirthDayProp } from '@/Routes/Stack';

const BirthDayScreen = () => {
    const navigation = useNavigation<ScreenNavigationProp>();
    const route = useRoute<ScreenBirthDayProp>();
    const [date, setDate] = useState(new Date());
    const [alertText, setAlertText] = useState('');

    const handleBirthDay = () => {
        var diff_ms = Date.now() - date.getTime();
        var age_dt = new Date(diff_ms);
        if (Math.abs(age_dt.getUTCFullYear() - 1970) < 13) {
            setAlertText('Có vẻ như bạn đã nhập thông tin sai. Hãy đảm bảo dùng ngày sinh thật của mình');
            return;
        }
        setAlertText('');
        const info: SignUpInfo = {
            ho: route.params.ho,
            ten: route.params.ten,
            birthDay: date,
            email: undefined,
            password: undefined
        }
        navigation.navigate('Email', info);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.titleText}>Sinh nhật của bạn khi nào?</Text>
            <Text style={styles.alertText}>{alertText}</Text>
            <DatePicker date={date} onDateChange={setDate} mode="date" />
            <TouchableOpacity
                style={styles.BirthDayButton}
                onPress={handleBirthDay}>
                <Text style={styles.BirthDayButtonText}>Tiếp</Text>
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
        marginBottom: 20
    },
    alertText: {
        fontFamily: "roboto-900",
        color: "red",
        width: 375,
        fontSize: 18,
        textAlign: "center",
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10
    },
    BirthDayButton: {
        width: '100%',
        height: 40,
        backgroundColor: '#1877f2',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
        marginBottom: 10,
    },
    BirthDayButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default BirthDayScreen;
