import React, { useEffect, useState } from "react";
import {
  FlatList,
  ScrollView,
  Image,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Animated,
} from "react-native";
import axios from "axios";
import { api } from "../Api";
import { useNavigation } from "@react-navigation/native";
import SkeletonLoader from "../skeletonloader/Skeletonloader";
const { width } = Dimensions.get("window");

const Album = () => {
  const [data, setData] = useState([]);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [fadeHeader] = useState(new Animated.Value(0));
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${api}/gallery`);
        setData(response.data);
        animateList();
        animateHeader();
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const animateList = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  const animateHeader = () => {
    Animated.timing(fadeHeader, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  if (!data) {
    return (
      <View style={{ flex: 1, backgroundColor: "#fff", bottom: 25 }}>
        <SkeletonLoader />
      </View>
    );
  }

  const renderAlbumItem = ({ item }) => {
    const onPressAlbum = () => {
      navigation.navigate("Gallery", { album: item });
    };

    const firstImage = item.image[0];
    const imageCount = item.image.length;

    return (
      <TouchableOpacity
        style={[styles.albumContainer, { opacity: fadeAnim }]}
        onPress={onPressAlbum}
      >
        <Image source={{ uri: firstImage }} style={styles.image} />
        <Text style={styles.albumTitle}>{item.Albumtitle}</Text>
        <Text style={styles.imageCount}>{imageCount} Images</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Animated.Text style={[styles.header, { opacity: fadeHeader }]}>
        <Text style={{ color: "tomato" }}>All</Text> Images..
      </Animated.Text>
      <ScrollView contentContainerStyle={styles.albumList}>
        <FlatList
          data={data}
          renderItem={renderAlbumItem}
          keyExtractor={(item) => item._id}
          numColumns={2}
          scrollEnabled={false}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    paddingTop: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: "600",
    textAlign: "left",
    color: "#000",
    left: 10,
  },
  albumList: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 20,
  },
  albumContainer: {
    width: width * 0.45,
    margin: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    elevation: 4,
    alignItems: "center",
  },
  albumTitle: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 5,
    paddingHorizontal: 5,
    color: "#000",
  },
  image: {
    width: "100%",
    height: 150,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  imageCount: {
    fontSize: 12,
    color: "#333",
    marginBottom: 5,
  },
});

export default Album;
