import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { TextInput, Button } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ScreenNavigationProp } from '@/Routes/Stack';

const RulesScreen = () => {
    const navigation = useNavigation<ScreenNavigationProp>();

    const handleConfirm = () => {
        navigation.navigate('Confirm');
    };

    const handleWebView = () => {
        navigation.navigate('WebViewPolicy', { url: 'https://www.facebook.com/privacy/policy?section_id=0-WhatIsThePrivacy' });
    };
    const handleWebViewCookie = () => {
        navigation.navigate('WebViewPolicy', { url: 'https://www.facebook.com/privacy/policies/cookies' });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.titleText}>Hoàn tất đăng ký</Text>
            <Text style={styles.descriptionText}>
                Bằng cách nhấn vào đăng kí bạn đồng ý với <Text style={{ color: "#1877f2" }} onPress={handleWebView}>Điều khoản, chính sách dữ liệu</Text> và <Text style={{ color: "#1877f2" }} onPress={handleWebViewCookie}>Chính sách cookie</Text> của chúng tôi. Bạn có thể nhận được thông báo cảu chúng tôi qua Email và chọn không nhận bất cứ lúc nào. Thông tin từ danh bạ của bạn sẽ được tải lên Facebook liên tục để chúng tôi
                có thể gợi ý bạn bè, cung cấp và cải thiện quảng cáo cho bạn và người khác cũng như mang đến dịch vụ tốt hơn
            </Text>
            <TouchableOpacity
                style={styles.ConfirmButton}
                onPress={handleConfirm}>
                <Text style={styles.ConfirmButtonText}>Đăng ký</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.ConfirmButton1}
                onPress={handleConfirm}>
                <Text style={styles.ConfirmButtonText1}>Đăng ký mà không tải danh bạ của tôi lên</Text>
            </TouchableOpacity>
            <Text style={styles.descriptionText}>
                Thông tin liên hệ trong danh bạ của bạn, bao gồm tên, số điện thoại và biệt danh sẽ được gửi tới Facebook để chúng tôi có thể gợi ý bạn bè
                cung cấp và cải thiện quảng cáo cho bạn và người khác, cũng như mang đến dịch vụ tốt hơn. Bạn có thể tắt tính năng này trong phần Cài đặt, quản lý
                hoặc xoá bỏ thông tin liên hệ mình đã chia sẻ với Facebook.
            </Text>
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //justifyContent: 'center',
        marginTop: 20,
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    titleText: {
        fontFamily: "roboto-500",
        color: "rgba(0,0,0,1)",
        fontWeight: "bold",
        fontSize: 24,
        textAlign: "center",
        marginBottom: 20
    },
    descriptionText: {
        fontFamily: "roboto-900",
        width: 375,
        fontSize: 16,
        textAlign: "center",
    },
    ConfirmButton: {
        width: '100%',
        height: 40,
        backgroundColor: '#1877f2',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
        marginBottom: 10,
    },
    ConfirmButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    ConfirmButton1: {
        width: '100%',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 60,
    },
    ConfirmButtonText1: {
        color: '#1877f2',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default RulesScreen;
