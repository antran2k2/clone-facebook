import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const SettingPushScreen = () => {

    const [switchEnabled, setSwitchEnabled] = useState({
        pushNotification: true,
        vibrate: true,
        light: true,
        sound: true,
    });

    const toggleSwitch = (field: string, newState: boolean) => {
        setSwitchEnabled((prev) => ({
            ...prev,
            [field]: newState,
        }));
        // Gọi API ở đây
    };

    return (
        <View style={styles.container}>
            <View style={styles.main}>
                <View style={styles.option_item}>
                    <View><FontAwesome6 style={styles.icon} name="bell" size={32} color={'black'} /></View>
                    <View style={styles.title_description}>
                        <Text style={styles.title_option}>Thông báo đẩy</Text>
                        <Text style={styles.description_option}>Nhận thông báo khi không trong app hoặc không dùng thiết bị</Text>
                    </View>
                    <View>
                        <Switch
                            style={{ transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }] }}
                            trackColor={{false: '#767577', true: '#81b0ff'}}
                            thumbColor={switchEnabled.pushNotification ? '#1355bf' : '#f4f3f4'}
                            onValueChange={() => toggleSwitch('pushNotification', !switchEnabled.pushNotification)}
                            value={switchEnabled.pushNotification}
                        />
                    </View>
                </View>
                <View style={styles.option_item}>
                    <View><MaterialCommunityIcons style={styles.icon} name="vibrate" size={28} color={'black'} /></View>
                    <View style={styles.title_description}>
                        <Text style={styles.title_option}>Rung</Text>
                        <Text style={styles.description_option}>Rung khi có thông báo đến</Text>
                    </View>
                    <View>
                        <Switch
                            style={{ transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }] }}
                            trackColor={{false: '#767577', true: '#81b0ff'}}
                            thumbColor={switchEnabled.vibrate ? '#1355bf' : '#f4f3f4'}
                            onValueChange={() => toggleSwitch('vibrate', !switchEnabled.vibrate)}
                            value={switchEnabled.vibrate}
                        />
                    </View>
                </View>
                <View style={styles.option_item}>
                    <View><MaterialCommunityIcons style={styles.icon} name="lightning-bolt" size={32} color={'black'} /></View>
                    <View style={styles.title_description}>
                        <Text style={styles.title_option}>Đèn LED điện thoại</Text>
                        <Text style={styles.description_option}>Nhấp nháy đèn LED khi có thông báo đến</Text>
                    </View>
                    <View>
                        <Switch
                            style={{ transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }] }}
                            trackColor={{false: '#767577', true: '#81b0ff'}}
                            thumbColor={switchEnabled.light ? '#1355bf' : '#f4f3f4'}
                            onValueChange={() => toggleSwitch('light', !switchEnabled.light)}
                            value={switchEnabled.light}
                        />
                    </View>
                </View>
                <View style={styles.option_item}>
                    <View><AntDesign style={styles.icon} name="sound" size={28} color={'black'} /></View>
                    <View style={styles.title_description}>
                        <Text style={styles.title_option}>Âm thanh</Text>
                        <Text style={styles.description_option}>Phát âm thanh khi có thông báo đến</Text>
                    </View>
                    <View>
                        <Switch
                            style={{ transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }] }}
                            trackColor={{false: '#767577', true: '#81b0ff'}}
                            thumbColor={switchEnabled.sound ? '#1355bf' : '#f4f3f4'}
                            onValueChange={() => toggleSwitch('sound', !switchEnabled.sound)}
                            value={switchEnabled.sound}
                        />
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    main: {
        paddingHorizontal: 20,
        display: 'flex',
        flexDirection: 'column',
        paddingVertical: 20,
        gap: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc',
        borderBottomStyle: 'solid',
    },
    option_item: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        width: 60,
    },
    title_description: {
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        marginRight: 10,
    },
    title_option: {
        color: 'black',
        fontWeight: '500',
        fontSize: 18,
    },
    description_option: {
        fontSize: 16,
        fontWeight: '400',
        width: 250,
    },
});

export default SettingPushScreen;
