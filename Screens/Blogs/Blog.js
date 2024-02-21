import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import {
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import SearchBar from "react-native-dynamic-search-bar";
import { api } from "../Api";


const SkeletonLoader = () => {
  const SkeletonCard = () => (
    <View style={styles.card}>
      <View style={[styles.image, { backgroundColor: "#f0f0f0" }]} />
      <View style={[styles.title, { backgroundColor: "#f0f0f0", height: 20 }]} />
      <View style={[styles.readText, { backgroundColor: "#f0f0f0", height: 18, marginTop: 5 }]} />
    </View>
  );

  return (
    <FlatList
      data={[1, 2, 3]} // Array of arbitrary length for demonstration
      renderItem={() => <SkeletonCard />}
      scrollEnabled={false}
    />
  );
};

const Blog = () => {
  const navigation = useNavigation();
  const [apidata, setApiData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true); // State to manage loading status

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const { data } = await axios.get(`${api}/blogs`);

      setTimeout(() => {
        setApiData(data);
        setLoading(false); 
      }, 500);
    } catch (error) {
      console.log(error);
      setLoading(false); 
    }
  };
  

  const filteredData = apidata.filter((item) =>
    item.title.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchBarContainer}>
        <SearchBar
          placeholder="Search here"
          onChangeText={(text) => setSearchText(text)}
          style={styles.searchBar}
          height={50}
        />
      </View>
      <ScrollView>
        {loading ? ( 
          <SkeletonLoader />
        ) : (
          <FlatList
            data={filteredData}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <Image source={{ uri: item.image }} style={styles.image} />
                <Text style={styles.title}>{item.title}</Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate("Blogs", { data: item })}
                >
                  <Text style={styles.readText}>Read More..</Text>
                </TouchableOpacity>
              </View>
            )}
            scrollEnabled={false}
          />
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  searchBarContainer: {
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
    borderRadius: 5,
    padding: 7,
  },
  searchBar: {
    paddingHorizontal: 10,
  },
  card: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#cccccc",
    borderRadius: 5,
    margin: 10,
    marginBottom: 10,
  },
  image: {
    width: responsiveWidth(94),
    height: 200,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  title: {
    fontSize: responsiveFontSize(2),
    fontWeight: "bold",
    margin: 10,
  },
  readText: {
    fontSize: responsiveFontSize(1.8),
    fontWeight: "bold",
    color: "#007bff",
    marginHorizontal: 10,
    marginBottom: 10,
  },
});

export default Blog;
