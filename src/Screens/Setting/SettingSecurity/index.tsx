import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ScreenNavigationProp } from '@/Routes/Stack';
import { useNavigation } from '@react-navigation/native';

const SettingSecurityScreen = () => {

    const navigation = useNavigation<ScreenNavigationProp>();

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Bảo mật và đăng nhập</Text>
            <View style={styles.main_body}>
                <Text style={styles.title_setting}>Đăng nhập</Text>
                <TouchableOpacity onPress={() => navigation.navigate('ChangePassword')} style={styles.setting_option}>
                    <View><Ionicons style={styles.key_icon} name="key-outline" size={32} /></View>
                    <View style={styles.text_option}>
                        <Text style={styles.name_option}>Đổi mật khẩu</Text>
                        <Text style={styles.description}>Bạn nên sử dụng mật khẩu mạnh mà mình chưa sử dụng ở đâu khác</Text>
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
    header: {
        fontWeight: 'bold',
        fontSize: 25,
        color: 'black',
        paddingTop: 15,
        paddingBottom: 10,
        paddingHorizontal: 20,
    },
    main_body: {
        marginTop: 15,
    },
    title_setting: {
        fontWeight: 'bold',
        fontSize: 21,
        color: 'black',
        paddingHorizontal: 20,
    },
    setting_option: {
        display: 'flex',
        flexDirection: 'row',
        paddingHorizontal: 20,
        marginTop: 12,
        alignItems: 'center',
        gap: 12,
    },
    key_icon: {
        marginTop: -28,
    },
    text_option: {
        width: 300,
    },
    name_option: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
    },
    description: {
        fontSize: 16,
        marginTop: 2,
    },
});

export default SettingSecurityScreen;
