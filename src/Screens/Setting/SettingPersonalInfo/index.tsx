import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { useNavigation } from '@react-navigation/native';
import { ScreenNavigationProp } from '@/Routes/Stack';

const SettingPersonalInfoScreen = () => {

    const navigation = useNavigation<ScreenNavigationProp>();
    const name = 'Nguyễn Văn A';

    return (
        <View style={styles.container}>
            <Text style={styles.title_screen}>Thông tin cá nhân</Text>
            <View style={styles.main_body}>
                <Text style={styles.common}>Chung</Text>
                <TouchableOpacity onPress={() => {navigation.navigate('SettingName');}} style={styles.setting_name_option}>
                    <View>
                        <Text style={styles.key}>Tên</Text>
                        <Text style={styles.value}>{name}</Text>
                    </View>
                    <View><FontAwesome6 name="chevron-right" size={26} /></View>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    title_screen: {
        fontWeight: 'bold',
        fontSize: 27,
        color: 'black',
        paddingVertical: 15,
        paddingHorizontal: 20,
    },
    main_body: {
        marginTop: 15,
    },
    common: {
        paddingHorizontal: 20,
        fontWeight: 'bold',
        fontSize: 23,
        color: 'black',
    },
    setting_name_option: {
        paddingHorizontal: 20,
        paddingVertical: 15,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#dddddd',
        borderBottomStyle: 'solid',
    },
    key: {
        fontWeight: 'bold',
        fontSize: 19,
        color: 'black',
    },
    value: {
        fontSize: 19,
        fontWeight: '500',
    },
});

export default SettingPersonalInfoScreen;
