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
const PropertyListView = () => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [menuVisibility, setMenuVisibility] = useState({});

  useEffect(() => {
    const getProperties = async () => {
      try {
        const profileId = await AsyncStorage.getItem("profileid");
        if (profileId !== null) {
          const { data } = await axios.get(`${api}/properties`, {});
          const filteredProperties = data.filter(
            (property) => property.profileId._id === profileId
          );
          if (filteredProperties.length > 0) {
            setData(filteredProperties);
            const initialMenuVisibility = {};
            filteredProperties.forEach((item) => {
              initialMenuVisibility[item._id] = false;
            });
            setMenuVisibility(initialMenuVisibility);
          } else {
            console.log("No properties found for the matching profileId.");
          }
        }
      } catch (error) {
        console.log(error);
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

  const handleUpdate = (item) => {
    navigation.navigate("List Update", { data: item });
  };

  const handleDelete = (item) => {
    Alert.alert(
      "Delete",
      "Are you sure you want to delete?",
      [
        { text: "Cancel", onPress: () => {} },
        {
          text: "Delete",
          onPress: async () => {
            try {
              await axios.delete(`${api}/properties/${item._id}`);
            } catch (error) {
              console.log(error);
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  const renderAnnouncementItem = ({ item }) => (
    <TouchableWithoutFeedback
      onPress={() => navigation.navigate("ManageViewDetails", { data: item })}
    >
      <View style={styles.announcementContainer}>
        <Image
          source={{ uri: item.image[0] }}
          style={styles.announcementImage}
        />
        <View style={styles.announcementDetails}>
          <Text style={styles.announcementType}>
            {item.profileId.firstName} {item.profileId.lastName}
          </Text>
          <Text style={styles.announcementDate}>
            {item.profileId.profession}
          </Text>
          <Text style={styles.announcementDescription}>{item.description}</Text>

          <Text style={styles.menuText} onPress={() => toggleMenu(item._id)}>
            ...
          </Text>

          {menuVisibility[item._id] && (
            <View style={styles.menuContainer}>
              <TouchableOpacity onPress={() => handleUpdate(item)}>
                <Text
                  style={{
                    top: 5,
                    marginBottom: 10,
                    elevation: 2,
                    backgroundColor: "#f2f2f2",
                    padding: 3,
                    paddingHorizontal: 10,
                    borderRadius: 5,
                  }}
                >
                  Update
                </Text>
              </TouchableOpacity>
              <View style={{ borderWidth: 0.2 }}></View>
              <TouchableOpacity onPress={() => handleDelete(item)}>
                <Text style={styles.menuItem}>Delete</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 70 }}
      >
        <View style={{ flex: 1, paddingHorizontal: 10, top: 10 }}>
          <FlatList
            data={data}
            keyExtractor={(item) => item._id}
            renderItem={renderAnnouncementItem}
            scrollEnabled={false}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default PropertyListView;

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
  menuText: {
    position: "absolute",
    left: 180,
    fontSize: 25,
    bottom: 80,
  },
  menuContainer: {
    position: "absolute",
    top: 25,
    right: 10,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    shadowColor: "#000",
    shadowOpacity: 0.6,
    shadowRadius: 10,
    elevation: 10,
    borderRadius: 10,
  },
  menuItem: {
    fontSize: 15,
    marginBottom: 10,
    elevation: 2,
    backgroundColor: "red",
    padding: 3,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginTop: 5,
  },
});
