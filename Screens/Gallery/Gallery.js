import React, { useState } from "react";
import {
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Modal,
  TouchableOpacity,
  View,
} from "react-native";
import MasonryList from "@react-native-seoul/masonry-list";
import { Ionicons } from "@expo/vector-icons"; // Import Ionicons for the close icon

const Gallery = ({ route }) => {
  const { album } = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const openModal = (image) => {
    setSelectedImage(image);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedImage(null);
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 50 }}
    >
      <Text style={styles.albumTitle}>{album.Albumtitle}</Text>
      <MasonryList
        data={album.image.map((item) => ({ uri: item }))} // Convert data to format accepted by MasonryList
        renderItem={({ item, index }) => (
          <TouchableOpacity onPress={() => openModal(item.uri)}>
            <Image
              source={{ uri: item.uri }}
              style={[
                styles.image,
                index % 2 === 0 ? styles.smallImage : styles.bigImage,
              ]}
            />
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()} // Use index as key, change if you have unique IDs
        numColumns={2}
        imageContainerStyle={styles.imageContainer}
      />
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
            <Ionicons name="close" size={30} color="white" />
          </TouchableOpacity>
          <Image
            source={{ uri: selectedImage }}
            style={styles.modalImage}
            resizeMode="contain"
          />
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#ffff",
  },
  albumTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "left",
  },
  image: {
    borderRadius: 8,
    margin: 4,
  },
  smallImage: {
    flex: 1,
    height: 150, // Smaller height for images with even index
  },
  bigImage: {
    flex: 2,
    height: 250, // Bigger height for images with odd index
  },
  imageContainer: {
    borderRadius: 8,
    overflow: "hidden",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  modalImage: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
  closeButton: {
    position: "absolute",
    top: 20,
    right: 20,
    zIndex: 1,
  },
});

export default Gallery;
