import React, { useEffect, useState } from "react";
import {
  FlatList,
  ScrollView,
  Image,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { api } from "../Api";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import { responsiveHeight } from "react-native-responsive-dimensions";
import { useNavigation } from "@react-navigation/native";
const Album = () => {
  const [data, setData] = useState([]);
  const navigation = useNavigation();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${api}/gallery`);
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const renderAlbumItem = ({ item }) => (
    <View style={styles.albumContainer}>
      <Text style={styles.albumTitle}>{item.Albumtitle}</Text>
      <FlatList
        data={item.image}
        horizontal
        renderItem={({ item }) => (
          <Image source={{ uri: item }} style={styles.image} />
        )}
        keyExtractor={(image) => image}
      />
      <View
        style={{ position: "absolute", left: responsiveHeight(40), top: 7 }}
      >
        <Text
          style={{ fontWeight: "300" }}
          onPress={() => navigation.navigate("Gellary", { data: item })}
        >
          SeeAll
        </Text>
      </View>
    </View>
  );

  return (
    <ScrollView contentContainerStyle={{ flex: 1, marginBottom: -50 }}>
      <View style={{ top: 50, left: 20 }}>
        <TouchableOpacity style={{}} onPress={() => navigation.goBack("")}>
          <FontAwesome5Icon
            name="arrow-left"
            color={"#000"}
            size={30}
            style={{ opacity: 0.7 }}
          />
        </TouchableOpacity>
      </View>
      <View style={{ top: 70, flex: 1, marginHorizontal: 10 }}>
        <FlatList
          data={data}
          renderItem={renderAlbumItem}
          keyExtractor={(item) => item._id}
          scrollEnabled={false}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  albumContainer: {
    marginBottom: 10,
  },
  albumTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  image: {
    width: 150,
    height: 150,
    marginRight: 10,
    borderRadius: 5,
  },
});

export default Album;
