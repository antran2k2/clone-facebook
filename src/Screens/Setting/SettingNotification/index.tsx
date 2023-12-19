import { ScreenNavigationProp } from '@/Routes/Stack';
import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Octicons from 'react-native-vector-icons/Octicons';
import Entypo from 'react-native-vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';

const SettingNotificationScreen = () => {

    const navigation = useNavigation<ScreenNavigationProp>();
    const [switchEnabled, setSwitchEnabled] = useState({
        comment: true,
        updateFromFriend: true,
        friendRequest: true,
        peopleYouCanKnow: true,
        birthday: true,
        video: true,
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
            <View style={styles.notification_about}>
                <Text style={styles.title}>Bạn nhận thông báo về</Text>
                <View style={styles.setting_notification_about_container}>
                    <View style={styles.option_item}>
                        <View><FontAwesome6 style={styles.icon} name="comment" size={32} color={'black'} /></View>
                        <View style={styles.title_description}>
                            <Text style={styles.title_option}>Bình luận</Text>
                            <Text style={styles.description_option}>Thông báo đẩy</Text>
                        </View>
                        <View>
                            <Switch
                                style={{ transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }] }}
                                trackColor={{false: '#767577', true: '#81b0ff'}}
                                thumbColor={switchEnabled.comment ? '#1355bf' : '#f4f3f4'}
                                onValueChange={() => toggleSwitch('comment', !switchEnabled.comment)}
                                value={switchEnabled.comment}
                            />
                        </View>
                    </View>
                    <View style={styles.option_item}>
                        <View><FontAwesome5 style={styles.icon} name="user-friends" size={28} color={'black'} /></View>
                        <View style={styles.title_description}>
                            <Text style={styles.title_option}>Cập nhật từ bạn bè</Text>
                            <Text style={styles.description_option}>Thông báo đẩy</Text>
                        </View>
                        <View>
                            <Switch
                                style={{ transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }] }}
                                trackColor={{false: '#767577', true: '#81b0ff'}}
                                thumbColor={switchEnabled.updateFromFriend ? '#1355bf' : '#f4f3f4'}
                                onValueChange={() => toggleSwitch('updateFromFriend', !switchEnabled.updateFromFriend)}
                                value={switchEnabled.updateFromFriend}
                            />
                        </View>
                    </View>
                    <View style={styles.option_item}>
                        <View><FontAwesome6 style={styles.icon} name="user-plus" size={28} color={'black'} /></View>
                        <View style={styles.title_description}>
                            <Text style={styles.title_option}>Lời mời kết bạn</Text>
                            <Text style={styles.description_option}>Thông báo đẩy</Text>
                        </View>
                        <View>
                            <Switch
                                style={{ transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }] }}
                                trackColor={{false: '#767577', true: '#81b0ff'}}
                                thumbColor={switchEnabled.friendRequest ? '#1355bf' : '#f4f3f4'}
                                onValueChange={() => toggleSwitch('friendRequest', !switchEnabled.friendRequest)}
                                value={switchEnabled.friendRequest}
                            />
                        </View>
                    </View>
                    <View style={styles.option_item}>
                        <View><FontAwesome6 style={styles.icon} name="users-rectangle" size={28} color={'black'} /></View>
                        <View style={styles.title_description}>
                            <Text style={styles.title_option}>Những người bạn có thể biết</Text>
                            <Text style={styles.description_option}>Thông báo đẩy</Text>
                        </View>
                        <View>
                            <Switch
                                style={{ transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }] }}
                                trackColor={{false: '#767577', true: '#81b0ff'}}
                                thumbColor={switchEnabled.peopleYouCanKnow ? '#1355bf' : '#f4f3f4'}
                                onValueChange={() => toggleSwitch('peopleYouCanKnow', !switchEnabled.peopleYouCanKnow)}
                                value={switchEnabled.peopleYouCanKnow}
                            />
                        </View>
                    </View>
                    <View style={styles.option_item}>
                        <View><FontAwesome5 style={styles.icon} name="birthday-cake" size={38} color={'black'} /></View>
                        <View style={styles.title_description}>
                            <Text style={styles.title_option}>Sinh nhật</Text>
                            <Text style={styles.description_option}>Thông báo đẩy</Text>
                        </View>
                        <View>
                            <Switch
                                style={{ transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }] }}
                                trackColor={{false: '#767577', true: '#81b0ff'}}
                                thumbColor={switchEnabled.birthday ? '#1355bf' : '#f4f3f4'}
                                onValueChange={() => toggleSwitch('birthday', !switchEnabled.birthday)}
                                value={switchEnabled.birthday}
                            />
                        </View>
                    </View>
                    <View style={styles.option_item}>
                        <View><Octicons style={styles.icon} name="video" size={35} color={'black'} /></View>
                        <View style={styles.title_description}>
                            <Text style={styles.title_option}>Video</Text>
                            <Text style={styles.description_option}>Thông báo đẩy</Text>
                        </View>
                        <View>
                            <Switch
                                style={{ transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }] }}
                                trackColor={{false: '#767577', true: '#81b0ff'}}
                                thumbColor={switchEnabled.video ? '#1355bf' : '#f4f3f4'}
                                onValueChange={() => toggleSwitch('video', !switchEnabled.video)}
                                value={switchEnabled.video}
                            />
                        </View>
                    </View>
                </View>
            </View>
            <View style={styles.notification_via}>
                <Text style={styles.title}>Bạn nhận thông báo qua</Text>
                <View style={styles.setting_notification_via_container}>
                    <TouchableOpacity onPress={() => navigation.navigate('SettingPush')} style={styles.option_item}>
                        <View><Entypo style={styles.icon} name="notification" size={38} color={'black'} /></View>
                        <View style={styles.title_description}>
                            <Text style={styles.title_option}>Thông báo đẩy</Text>
                            <Text style={styles.description_option}>Bật</Text>
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
        backgroundColor: 'white',
    },
    notification_about: {
        marginHorizontal: 20,
        marginTop: 20,
        marginBottom: 10,
    },
    notification_via: {
        marginHorizontal: 20,
        marginVertical: 20,
        borderTopWidth: 1,
        borderTopColor: '#cccccc',
        borderTopStyle: 'solid',
        paddingVertical: 20,
    },
    title: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 22,
    },
    setting_notification_about_container:{
        display: 'flex',
        flexDirection: 'column',
        marginTop: 20,
        gap: 20,
    },
    setting_notification_via_container: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: 20,
        gap: 20,
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
        width: 270,
    },
    title_option: {
        color: 'black',
        fontWeight: '500',
        fontSize: 18,
    },
    description_option: {
        fontSize: 16,
        fontWeight: '400',
        width: 315,
    },
});

export default SettingNotificationScreen;
