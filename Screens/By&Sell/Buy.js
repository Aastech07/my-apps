import React, { useState, useEffect, useRef } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Animated,
} from "react-native";
import axios from "axios";
import FontAwesome from "react-native-vector-icons/FontAwesome5";
import { useNavigation } from "@react-navigation/native";
import { api } from "../Api";
import SearchBar from "react-native-dynamic-search-bar";

const numColumns = 2;

const categories = [
  { name: "", icon: "filter" },
  { name: "Mobile", icon: "mobile" },
  { name: "iPads", icon: "tablet-alt" },
  { name: "Electronics", icon: "tv" },
  { name: "Furniture", icon: "couch" },
  { name: "Fashion", icon: "tshirt" },
  { name: "brand", icon: "phone" },
];

const Buy = () => {
  const [datas, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("");
  const skeletonOpacity = useRef(new Animated.Value(1)).current;
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch data from API endpoints
      const accessoriesData = await axios.get(`${api}/accessories`);
      const tabletsData = await axios.get(`${api}/tablets`);
      const electronicsData = await axios.get(`${api}/electronics`);
      const furnitureData = await axios.get(`${api}/furniture`);
      const fashionData = await axios.get(`${api}/fashion`);
      const phonesData = await axios.get(`${api}/phones`);

      // Combine all fetched data into one array
      const allData = [
        ...accessoriesData.data,
        ...tabletsData.data,
        ...electronicsData.data,
        ...furnitureData.data,
        ...fashionData.data,
        ...phonesData.data,
      ];

      setData(allData);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  // Filter data based on selected category and search text
  const filteredData = datas.filter((item) => {
    return (
      (selectedCategory ? item.type === selectedCategory : true) &&
      (searchText
        ? item.adTitle.toLowerCase().includes(searchText.toLowerCase())
        : true)
    );
  });

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => navigation.navigate("ByDetalis", { data: item })}
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.image }} style={styles.image} />
      </View>
      <Text style={styles.price}>${item.price}</Text>
      <Text style={styles.title}>{item.adTitle}</Text>
      <View style={styles.locationContainer}>
        <FontAwesome
          name="map-marker-alt"
          size={16}
          color="#555"
          style={styles.locationIcon}
        />
        <Text style={styles.location}>{item.address}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Search bar */}
      <View
        style={{
          backgroundColor: "#fff",
          shadowColor: "#000",
          shadowOffset: 0.5,
          shadowOpacity: 0.5,
          elevation: 3,
          padding: 5,
          bottom: 5,
          borderRadius: 4,
        }}
      >
        <SearchBar
          placeholder="Search here"
          onChangeText={(text) => setSearchText(text)}
        />
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <View
          style={{
            marginBottom: 10,
            backgroundColor: "#fff",
            padding: 10,
            shadowColor: "#000",
            shadowOpacity: 0.6,
            shadowRadius: 20,
            elevation: 1,
            borderRadius: 5,
          }}
        >
          <Text style={{ fontSize: 18, marginBottom: 10 }}>
            Browse categories
          </Text>
          <ScrollView
            horizontal
            style={{}}
            showsHorizontalScrollIndicator={false}
          >
            {categories.map((category, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.categoryButton,
                  {
                    backgroundColor:
                      selectedCategory === category.name ? "#3D50DF" : "#ccc",
                  },
                ]}
                onPress={() => setSelectedCategory(category.name)}
              >
                <FontAwesome name={category.icon} size={20} color="#fff" />
                <Text style={styles.categoryButtonText}>{category.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        {loading ? (
          <Animated.View
            style={[styles.skeletonContainer, { opacity: skeletonOpacity }]}
          >
            <View style={styles.skeletonImage}></View>
            <View style={styles.skeletonText}></View>
            <View style={styles.skeletonText}></View>
            <View style={styles.skeletonText}></View>
          </Animated.View>
        ) : (
          <FlatList
            data={selectedCategory ? filteredData : datas}
            renderItem={renderItem}
            scrollEnabled={false}
            numColumns={numColumns}
            columnWrapperStyle={styles.columnWrapper}
          />
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  itemContainer: {
    flex: 1,
    margin: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    alignItems: "center",
  },
  imageContainer: {
    position: "relative",
    width: "100%",
    aspectRatio: 1,
    marginBottom: 10,
    overflow: "hidden",
    borderRadius: 5,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  title: {
    fontSize: 15,
    fontWeight: "400",
    marginBottom: 5,
  },
  price: {
    fontSize: 14,
    color: "green",
    bottom: 5,
  },
  columnWrapper: {
    justifyContent: "space-between",
  },
  location: {
    fontSize: 12,
    color: "#555",
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  locationIcon: {
    marginRight: 5,
  },
  heartIconContainer: {
    position: "absolute",
    top: 5,
    right: 5,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.6,
    shadowRadius: 10,
    elevation: 1,
    paddingHorizontal: 5,
    borderRadius: 20,
    paddingVertical: 4,
  },
  skeletonContainer: {
    flex: 1,
    margin: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
  },
  skeletonImage: {
    width: "100%",
    aspectRatio: 1,
    backgroundColor: "#f0f0f0",
    marginBottom: 10,
    borderRadius: 5,
  },
  skeletonText: {
    width: "80%",
    height: 12,
    backgroundColor: "#f0f0f0",
    marginBottom: 5,
    borderRadius: 3,
  },
  categoryButton: {
    backgroundColor: "#ccc",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: "center",
    flexDirection: "row",
    margin: 4,
  },
  categoryButtonText: {
    color: "#fff",
    fontWeight: "bold",
    marginLeft: 5,
  },
});

export default Buy;
