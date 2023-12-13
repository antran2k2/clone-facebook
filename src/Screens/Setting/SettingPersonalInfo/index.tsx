import { ScreenSettingPersonalInfoProp } from '@/Routes/Stack';
import React from 'react';
import { useRoute } from '@react-navigation/native';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

const SettingPersonalInfoScreen = () => {

    const route = useRoute<ScreenSettingPersonalInfoProp>();

    return (
        <View style={styles.container}>
            <Text style={styles.title_screen}>Thông tin cá nhân</Text>
            <View style={styles.main_body}>
                <Text style={styles.common}>Chung</Text>
                <TouchableOpacity style={styles.setting_name_option}>
                    <View>
                        <Text style={styles.key}>Tên</Text>
                        <Text style={styles.value}>{route.params.name}</Text>
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
