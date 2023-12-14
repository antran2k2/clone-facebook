import { ScreenNavigationProp } from '@/Routes/Stack';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const SettingAccountScreen = () => {

    const navigation = useNavigation<ScreenNavigationProp>();

    return (
        <View style={styles.container}>
            <View style={styles.setting_account}>
                <Text style={styles.title}>Cài đặt tài khoản</Text>
                <Text style={styles.description}>Quản lý thông tin về bạn, bảo mật cũng như tài khoản nói chung.</Text>
                <View style={styles.setting_options_container}>
                    <TouchableOpacity onPress={() => {navigation.navigate('SettingPersonalInfo', { name: 'Nguyễn Văn A' });}} style={styles.setting_item}>
                        <View><FontAwesome6 style={styles.icon} name="user-circle" size={32} color={'black'} /></View>
                        <View style={styles.title_description}>
                            <Text style={styles.title_option}>Thông tin cá nhân</Text>
                            <Text style={styles.description_option}>Cập nhật tên của bạn.</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.setting_item}>
                        <View><FontAwesome6 style={styles.icon} name="user-shield" size={27} color={'black'} /></View>
                        <View style={styles.title_description}>
                            <Text style={styles.title_option}>Bảo mật</Text>
                            <Text style={styles.description_option}>Đổi mật khẩu để tăng cường bảo mật cho tài khoản của bạn.</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.setting_account}>
                <Text style={styles.title}>Quyền riêng tư</Text>
                <Text style={styles.description}>Quản lý quyền riêng tư của bạn trên Facebook.</Text>
                <View style={styles.setting_options_container}>
                    <TouchableOpacity style={styles.setting_item}>
                        <View><MaterialIcons style={styles.icon} name="block" size={32} color={'black'} /></View>
                        <View style={styles.title_description}>
                            <Text style={styles.title_option}>Chặn</Text>
                            <Text style={styles.description_option}>Xem lại những người bạn đã chặn trước đó.</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
    },
    setting_account: {
        backgroundColor: 'white',
        width: '100%',
        padding: 20,
    },
    title: {
        color: 'black',
        fontWeight: '500',
        fontSize: 21,
    },
    description: {
        fontSize: 15,
        fontWeight: '400',
    },
    setting_options_container: {
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
        marginTop: 25,
    },
    setting_item: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
        width: '100%',
        backgroundColor: 'white',
    },
    icon: {
        width: 35,
    },
    title_description: {
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
    },
    title_option: {
        color: 'black',
        fontWeight: '500',
        fontSize: 18,
    },
    description_option: {
        fontSize: 14,
        fontWeight: '400',
        width: 315,
    },
});

export default SettingAccountScreen;
