import { ScreenNavigationProp, ScreenPolicyProp } from '@/Routes/Stack';
import React, { useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { WebView } from 'react-native-webview';

const WebViewPolicyScreen = () => {
    const route = useRoute<ScreenPolicyProp>();

    return (
        <WebView source={{ uri: `${route.params.url}` }} style={{ flex: 1 }} />
    );
};

export default WebViewPolicyScreen;