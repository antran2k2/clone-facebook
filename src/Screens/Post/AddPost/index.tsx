import React, {useState} from 'react';
import {View, TextInput, Button, Image, StyleSheet} from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import {useAddPostMutation} from '@/Redux/api/post';
import {AddPostDTO} from '@/types/post.type';
const AddPostScreen = () => {
  const [postText, setPostText] = useState('');
  const [response, setResponse] = React.useState<any>(null);
  const [addPost, {isLoading}] = useAddPostMutation();
  const [formData, setFormData] = useState(new FormData());
  const [textValue, setTextValue] = useState('');
  const handlePost = () => {
    // const formData = new FormData();
    // formData.append('image', response.assets);
    // formData.append('described', 'ahaih');

    console.log('form:', formData);
    const fileUri = 'file://path/to/your/file.jpg';

    // Append the file to FormData
    formData.append('file', {
      uri: fileUri,
      name: 'file.jpg',
      type: 'image/jpeg',
    });

    // You can also append other data as key-value pairs
    formData.append('textData', textValue);

    // addPost(formData);
    console.log('Post:', postText);
  };
  const onButtonPress = React.useCallback((type, options) => {
    if (type === 'capture') {
      ImagePicker.launchCamera(options, setResponse);
    } else {
      ImagePicker.launchImageLibrary(options, setResponse);
    }
  }, []);

  return (
    <View>
      <TextInput
        placeholder="Enter your post"
        value={postText}
        onChangeText={setPostText}
      />
      <Button
        title="Pick an image from camera roll"
        onPress={() =>
          onButtonPress('library', {
            selectionLimit: 0,
            // mediaType: 'photo',
            includeBase64: false,
            includeExtra: true,
          })
        }
      />
      <Button title="Post" onPress={handlePost} />
      {response?.assets &&
        response?.assets.map(({uri}: {uri: string}) => (
          <View key={uri} style={styles.imageContainer}>
            <Image
              resizeMode="cover"
              resizeMethod="scale"
              style={styles.image}
              source={{uri: uri}}
            />
          </View>
        ))}
    </View>
  );
};

export default AddPostScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'aliceblue',
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
