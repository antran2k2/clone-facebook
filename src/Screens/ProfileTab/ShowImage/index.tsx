import {View, Image, StyleSheet} from 'react-native';
//import { styles } from "../style";
import {useRoute} from '@react-navigation/native';
import {ScreenShowImageProp} from '@/Routes/Stack';

const ShowImageScreen = () => {
  const route = useRoute<ScreenShowImageProp>();
  const image = route.params?.link;
  const detailDisplay = 'none';

  //console.log(image)

  return (
    <View style={styles.postWrapper}>
      <View style={styles.imageWrapper}>
        <Image
          style={styles.image}
          resizeMode="contain"
          source={
            image
              ? {
                  uri: image,
                }
              : require('@/Assets/Images/Logo.png')
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  postWrapper: {
    position: 'relative',
    backgroundColor: 'black',
    height: '100%',
  },
  imageWrapper: {
    marginTop: 30,
  },
  image: {
    backgroundColor: 'rgba(0,0,0,0)',
    height: '100%',
  },
});

export default ShowImageScreen;
