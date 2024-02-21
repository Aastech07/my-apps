import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Modal,
  Dimensions,
} from "react-native";
import { responsiveHeight } from "react-native-responsive-dimensions";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import axios from "axios";
import MasonryList from "@react-native-seoul/masonry-list";
import { useNavigation } from "@react-navigation/native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { StatusBar } from "react-native";
import { api } from "../Api";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
import { useRoute } from "@react-navigation/native";

const Gallery= () => {
  const navigation = useNavigation();
  const data = useRoute();
  const id = data.params.data._id;
  const [albums, setAlbums] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    const getimg = async () => {
      try {
        const { data } = await axios.get(`${api}/gallery/${id}`);
        setAlbums(data);
      } catch (error) {
        console.log(error);
      }
    };
    getimg();
  }, []);

  const renderMealItem = ({ item }) => (
    <View style={{ top: 10 }}>
      <TouchableOpacity
        style={styles.mealItemContainer}
        onPress={() => handleMealPress(item)}
      >
        <Animated.Image
          entering={FadeInDown.duration(500)}
          source={{ uri: item.uri }}
          style={{
            width: "90%",
            height: 200,
            alignSelf: "center",
            borderRadius: 20,
          }}
        />
        <Text
          style={{ textAlign: "center", fontWeight: "600", marginBottom: 10 }}
        >
          {item.title}
        </Text>
      </TouchableOpacity>
    </View>
  );

  const handleMealPress = (item) => {
    setSelectedImage(item.uri);
    setModalVisible(true);
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#fff" }}>
      <StatusBar translucent backgroundColor="#fff" barStyle="dark-content" />

      <View style={{ top: 60, left: 20 }}>
        <TouchableOpacity style={{}} onPress={() => navigation.goBack("")}>
          <FontAwesome5Icon
            name="arrow-left"
            color={"#000"}
            size={30}
            style={{ opacity: 0.7 }}
          />
        </TouchableOpacity>
      </View>

      <View
        style={{
          paddingTop: 60,
        }}
      ></View>

      <View style={{ flex: 1, alignItems: "center" }}>
        <MasonryList
          data={albums}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          renderItem={renderMealItem}
          onEndReachedThreshold={0.1}
          style={{ padding: 10 }}
        />
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}
          >
            <FontAwesome5 name="times" size={24} color="white" />
          </TouchableOpacity>
          <Image
            source={{ uri: selectedImage }}
            style={{ width: screenWidth, height: screenHeight }}
            resizeMode="contain"
          />
        </View>
      </Modal>
    </ScrollView>
  );
};

export default Gallery;

const styles = StyleSheet.create({
  inputView: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 50,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20,
    top: responsiveHeight(6),
    alignSelf: "center",
    shadowColor: "#984065",
    shadowOffset: {
      width: 0,
      height: 50,
    },
    shadowOpacity: 0.8,
    shadowRadius: 16.0,
    elevation: 5,
  },
  inputText: {
    height: 50,
    color: "black",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  closeButton: {
    position: "absolute",
    top: 50,
    right: 20,
    zIndex: 999,
  },
});
