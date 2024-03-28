import React, { useState, useEffect } from "react";
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  Image,
  FlatList,
  TouchableWithoutFeedback,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { api } from "../Api";
import axios from "axios";
import SearchBar from "react-native-dynamic-search-bar";

const PropertyList = () => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");

  const fetchDatas = async () => {
    try {
      // Fetch data from API endpoints
      const properties = await axios.get(`${api}/properties`);
      const pgGuestHouses = await axios.get(`${api}/pgGuestHouses`);
      const landPlots = await axios.get(`${api}/landPlots`);
      const shopOffices = await axios.get(`${api}/shopOffices`);

      const allData = [
        ...properties.data,
        ...pgGuestHouses.data,
        ...landPlots.data,
        ...shopOffices.data,
      ];
    
       setLoading(false)
      setData(allData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(()=>{
    fetchDatas();
  },[])
  const renderAnnouncementItem = ({ item }) => (
    <TouchableWithoutFeedback
      onPress={() => navigation.navigate("Details", { data: item })}
    >
      <View style={styles.announcementContainer}>
        <Image
          source={{ uri: item.image && item.image.length > 0
            ? item.image[0]
            : null, }}
          style={styles.announcementImage}
        />
        <View style={styles.announcementDetails}>
          <Text style={styles.announcementType}>{item.propertyFor}</Text>
          <Text style={styles.announcementDate}>{item.adTitle}</Text>
          <Text style={styles.announcementDescription}>{item.description}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );

  const filteredAnnouncements = data.filter((item) =>
    item.adTitle?.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <View
        style={{
          backgroundColor: "#fff",
          shadowColor: "#000",
          shadowOffset: 0.5,
          shadowOpacity: 0.5,
          elevation: 3,
          padding: 10,
        }}
      >
        <SearchBar
          placeholder="Search here"
          onChangeText={(text) => setSearchText(text)}
        />
      </View>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 70 }}
      >
        <View style={{ flex: 1, paddingHorizontal: 10, top: 10 }}>
          {loading ? (
            Array.from({ length: 5 }).map((_, index) => (
              <View key={index} style={styles.skeletonContainer}>
                <View style={styles.skeletonImage} />
                <View style={styles.skeletonDetails}>
                  <View style={styles.skeletonText} />
                  <View style={styles.skeletonText} />
                  <View style={styles.skeletonText} />
                </View>
              </View>
            ))
          ) : (
            <FlatList
              data={filteredAnnouncements}
              keyExtractor={(item) => item._id}
              renderItem={renderAnnouncementItem}
              scrollEnabled={false}
            />
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default PropertyList;

const styles = StyleSheet.create({
  announcementContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 5,
    marginVertical: 8,
    borderRadius: 8,
    elevation: 3,
    marginHorizontal: 2,
  },
  announcementImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  announcementDetails: {
    marginLeft: 16,
    flex: 1,
  },
  announcementType: {
    fontSize: 18,
    fontWeight: "400",
  },
  announcementDate: {
    fontSize: 16,
    color: "gray",
  },
  announcementDescription: {
    fontSize: 16,
    fontWeight: "300",
  },
  menuContainer: {
    position: "absolute",
    top: 30,
    right: 10,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    shadowColor: "#000",
    shadowOpacity: 0.6,
    shadowRadius: 10,
    elevation: 10,
    borderRadius: 10,
  },
  menuItem: {
    fontSize: 15,
    marginBottom: 10,
  },
  skeletonContainer: {
    flexDirection: "row",
    padding: 5,
    marginVertical: 8,
    borderRadius: 8,
    marginHorizontal: 2,
  },
  skeletonImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    backgroundColor: "#ccc",
    opacity: 0.4,
  },
  skeletonDetails: {
    marginLeft: 16,
    flex: 1,
  },
  skeletonText: {
    width: "70%",
    height: 16,
    backgroundColor: "#ccc", // Placeholder color
    marginBottom: 8,
    opacity: 0.4,
  },
});
