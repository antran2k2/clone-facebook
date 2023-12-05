import {useState} from 'react';
import {Alert} from 'react-native';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Linking,
} from 'react-native';

const FriendScreen = () => {
  const [facebookShareURL, setFacebookShareURL] = useState(
    'https://aboutreact.com',
  );
  const [postContent, setPostContent] = useState(
    'Hello Guys, This is a testing of facebook share example',
  );

  const postOnFacebook = () => {
    let facebookParameters = [];
    if (facebookShareURL)
      facebookParameters.push('u=' + encodeURI(facebookShareURL));
    if (postContent) facebookParameters.push('quote=' + encodeURI(postContent));
    const url =
      'https://www.facebook.com/sharer/sharer.php?' +
      facebookParameters.join('&');
    console.log(url);

    Linking.openURL(url)
      .then(data => {
        Alert.alert('Facebook Opened');
      })
      .catch(() => {
        Alert.alert('Something went wrong');
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.titleText}>
          Share Facebook Post with URL from React Native App
        </Text>
        <Text style={styles.titleTextsmall}>Enter Post Content</Text>
        <TextInput
          value={postContent}
          onChangeText={postContent => setPostContent(postContent)}
          placeholder={'Enter Facebook Post Content'}
          style={styles.textInput}
        />
        <Text style={styles.titleTextsmall}>Enter URL to Share</Text>
        <TextInput
          value={facebookShareURL}
          onChangeText={facebookShareURL =>
            setFacebookShareURL(facebookShareURL)
          }
          placeholder={'Enter URL to Share'}
          style={styles.textInput}
        />
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.buttonStyle}
          onPress={postOnFacebook}>
          <Text style={styles.buttonTextStyle}>Share on Facebook</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default FriendScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
    textAlign: 'center',
  },
  titleText: {
    fontSize: 22,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  titleTextsmall: {
    marginVertical: 8,
    fontSize: 16,
  },
  buttonStyle: {
    justifyContent: 'center',
    marginTop: 15,
    padding: 10,
    backgroundColor: '#8ad24e',
    marginRight: 2,
    marginLeft: 2,
  },
  buttonTextStyle: {
    color: '#fff',
    textAlign: 'center',
  },
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '100%',
    paddingHorizontal: 10,
  },
});
