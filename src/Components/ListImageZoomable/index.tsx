import React, {useState} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  Modal,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
const widthScreen = Dimensions.get('window').width;
const ListImageZoomable = ({images, width, height}: any) => {
  const imagesSrc = images.map((img: any) => ({url: img.url}));

  const widthImg = width ? width : 100;
  const heightImg = height ? height : 100;
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const toggleModal = (index: any) => {
    setModalVisible(!isModalVisible);
    setSelectedImageIndex(index);
  };

  const renderThumbnail = ({item, index}: any) => {
    let thumbnailStyle = {width: widthScreen, height: widthScreen, margin: 1};
    // Adjust thumbnail size based on the number of images
    if (images.length === 1) {
      thumbnailStyle = {width: widthScreen - 1, height: widthScreen, margin: 1};
    } else if (images.length === 2) {
      thumbnailStyle = {
        width: widthScreen / 2 - 2,
        height: widthScreen,
        margin: 1,
      };
    } else if (images.length === 3) {
      if (index === 0) {
        thumbnailStyle = {
          width: widthScreen - 2,
          height: widthScreen / 2 - 2,
          margin: 1,
        };
      } else if (index === 1 || index === 2) {
        thumbnailStyle = {
          width: widthScreen / 2 - 2,
          height: widthScreen / 2 - 2,
          margin: 1,
        };
      }
    } else if (images.length === 4) {
      thumbnailStyle = {
        width: widthScreen / 2 - 2,
        height: widthScreen / 2,
        margin: 1,
      };
    }

    return (
      <TouchableOpacity key={index} onPress={() => toggleModal(index)}>
        <Image source={{uri: item.url}} style={thumbnailStyle} />
      </TouchableOpacity>
    );
  };

  const renderModalCloseButton = () => {
    return (
      <TouchableOpacity
        onPress={() => toggleModal(selectedImageIndex)}
        style={{position: 'absolute', top: 20, right: 20}}>
        <Text style={{color: 'white', fontSize: 18}}>Close</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.thumbnailsContainer}>
        {images.map((img: any, index: any) =>
          renderThumbnail({item: img, index}),
        )}
      </View>

      {/* Modal */}
      <Modal
        visible={isModalVisible}
        transparent={true}
        onRequestClose={() => toggleModal(selectedImageIndex)}>
        <ImageViewer imageUrls={imagesSrc} index={selectedImageIndex} />
        {renderModalCloseButton()}
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // width: 320 + 4,
    // flex: 1,
    // width: 320,
  },
  thumbnailsContainer: {
    flexDirection: 'row', // Display thumbnails in a row
    flexWrap: 'wrap', // Wrap to the next row if needed
  },
});

export default ListImageZoomable;
