import React, { useState, useEffect } from "react";
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  Image,
  FlatList,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { api } from "../Api";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SearchBar from "react-native-dynamic-search-bar";

const PropertyList = () => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [menuVisibility, setMenuVisibility] = useState({});
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const getProperties = async () => {
      try {
        const profileId = await AsyncStorage.getItem("profileid");
        if (profileId !== null) {
          const { data } = await axios.get(`${api}/properties`, {});
          setData(data);
          const initialMenuVisibility = {};
          data.forEach((item) => {
            initialMenuVisibility[item._id] = false;
          });
          setMenuVisibility(initialMenuVisibility);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getProperties();
  }, []);

  const toggleMenu = (itemId) => {
    setMenuVisibility((prevState) => ({
      ...prevState,
      [itemId]: !prevState[itemId],
    }));
  };

  const handleUpdate = () => {
    navigation.navigate("List Update");
  };

  const handleDelete = () => {
    Alert.alert(
      "Delete",
      "Are you sure you want to delete?",
      [
        { text: "Cancel", onPress: () => {} },
        {
          text: "Delete",
          onPress: () => {},
        },
      ],
      { cancelable: false }
    );
  };

  const renderAnnouncementItem = ({ item }) => (
    <TouchableWithoutFeedback
      onPress={() => navigation.navigate("Details", { data: item })}
    >
      <View style={styles.announcementContainer}>
        <Image
          source={{ uri: item.image[0] }}
          style={styles.announcementImage}
        />
        <View style={styles.announcementDetails}>
          <Text style={styles.announcementType}>{item.propertyFor}</Text>
          <Text style={styles.announcementDate}>{item.adTitle}</Text>
          <Text style={styles.announcementDescription}>{item.description}</Text>
          {menuVisibility[item._id] && (
            <View style={styles.menuContainer}>
              <TouchableOpacity onPress={handleUpdate}>
                <Text style={{ top: 5, marginBottom: 10 }}>Update</Text>
              </TouchableOpacity>
              <View style={{ borderWidth: 0.2 }}></View>
              <TouchableOpacity onPress={handleDelete}>
                <Text style={styles.menuItem}>Delete</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );

  const filteredAnnouncements = data.filter((item) =>
    item.propertyFor.toLowerCase().includes(searchText.toLowerCase())
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
