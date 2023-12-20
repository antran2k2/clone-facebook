import React, {MutableRefObject, useRef, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Dimensions,
  Image,
  Button,
  SafeAreaView,
  StatusBar,
  ImageBackground,
  Platform,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  ScreenNavigationProp,
  ScreenFullFriendProp,
  ScreenChangeViewImageProp,
} from '@/Routes/Stack';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as ImagePicker from 'react-native-image-picker';
import {DemoButton} from '@/Screens/Video/DemoButton';
import {useSetUserInfoMutation} from '@/Redux/api/profile';
import Spinner from 'react-native-loading-spinner-overlay';
/* toggle includeExtra */
const includeExtra = true;

const ChangeAvatarScreen = () => {
  const navigation = useNavigation<ScreenNavigationProp>();
  const route = useRoute<ScreenChangeViewImageProp>();

  const onButtonPress = React.useCallback(
    (
      type: string,
      options: ImagePicker.CameraOptions | ImagePicker.ImageLibraryOptions,
    ) => {
      if (type === 'capture') {
        //ImagePicker.launchCamera(options, setResponse);
        ImagePicker.launchCamera(options, response => {
          if (response.assets) {
            navigation.navigate('PreViewAvatar', {
              image: response?.assets[0],
              type: route.params.type,
            });
          }
        });
      } else {
        //ImagePicker.launchImageLibrary(options, setResponse);
        ImagePicker.launchImageLibrary(options, response => {
          if (response.assets) {
            navigation.navigate('PreViewAvatar', {
              image: response?.assets[0],
              type: route.params.type,
            });
          }
        });
      }
    },
    [],
  );

  const handleBack = () => {
    navigation.goBack();
  };

  const handlePost = () => {};

  return (
    <View style={styles.parentContainer}>
      <View style={styles.navigationBar}>
        <View style={styles.navigationBarLeft}>
          <TouchableOpacity onPress={handleBack} style={styles.btnBack}>
            <FontAwesome5Icon name="arrow-left" color="#000" size={20} />
          </TouchableOpacity>
          <Text style={styles.textNavigationBar}>Chọn ảnh</Text>
        </View>
        <TouchableOpacity style={styles.btnPost} onPress={handleBack}>
          <Text style={styles.btnText}>Hủy</Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View style={styles.buttonContainer}>
          {actions.map(({title, type, options}) => {
            return (
              <DemoButton
                key={title}
                onPress={() => onButtonPress(type, options)}>
                {title}
              </DemoButton>
            );
          })}
        </View>

        {/* {response?.assets &&
                    response?.assets.map(({ uri }: { uri: string }) => (
                        <View key={uri} style={styles.imageContainer}>
                            <Image
                                resizeMode="cover"
                                resizeMethod="scale"
                                style={styles.image}
                                source={{ uri: uri }}
                            />
                        </View>
                    ))} */}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  parentContainer: {
    backgroundColor: 'white',
    flex: 1,
  },
  container: {},
  navigationBar: {
    paddingTop: 12,
    flexDirection: 'row',
    height: 64,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  navigationBarLeft: {
    flexDirection: 'row',
  },
  textNavigationBar: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginLeft: 5,
  },
  btnBack: {
    width: 50,
    alignItems: 'center',
  },
  btnPost: {
    backgroundColor: 'white',
    alignItems: 'center',
    marginRight: 24,
  },
  btnText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
  },
  btnTemporary: {
    backgroundColor: '#E4E4E4',
    borderRadius: 5,
    height: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 150,
    marginRight: 13,
  },
  btnAddFrame: {
    backgroundColor: '#E4E4E4',
    borderRadius: 5,
    height: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 150,
    marginRight: 13,
  },

  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 8,
  },
  imageContainer: {
    marginVertical: 24,
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
  },
});

interface Action {
  title: string;
  type: 'capture' | 'library';
  options: ImagePicker.CameraOptions | ImagePicker.ImageLibraryOptions;
}

const actions: Action[] = [
  {
    title: 'Chụp Ảnh',
    type: 'capture',
    options: {
      saveToPhotos: true,
      mediaType: 'photo',
      includeBase64: false,
      includeExtra,
    },
  },
  {
    title: 'Chọn Ảnh từ thư viện',
    type: 'library',
    options: {
      selectionLimit: 0,
      mediaType: 'photo',
      includeBase64: false,
      includeExtra,
    },
  },
  {
    title: 'Quay Video',
    type: 'capture',
    options: {
      saveToPhotos: true,
      formatAsMp4: true,
      mediaType: 'video',
      includeExtra,
    },
  },
  {
    title: 'Chọn Video từ thư viện',
    type: 'library',
    options: {
      selectionLimit: 0,
      mediaType: 'video',
      formatAsMp4: true,
      includeExtra,
    },
  },
  {
    title: 'Chọn ảnh hoặc video',
    type: 'library',
    options: {
      selectionLimit: 0,
      mediaType: 'mixed',
      includeExtra,
    },
  },
];

if (Platform.OS === 'ios') {
  actions.push({
    title: 'Take Image or Video\n(mixed)',
    type: 'capture',
    options: {
      saveToPhotos: true,
      mediaType: 'mixed',
      includeExtra,
      presentationStyle: 'fullScreen',
    },
  });
}

export default ChangeAvatarScreen;
