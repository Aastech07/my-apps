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
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { api } from "../Api";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ManageView = () => {
  const navigation = useNavigation();

  const [data, setData] = useState([]);
  const [menuVisibility, setMenuVisibility] = useState({});
  const [id, setID] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const profileId = await AsyncStorage.getItem("profileid");

        if (profileId !== null) {
          const [
            pgGuestHouses,
            properties,
            landPlots,
            shopOffices,
          ] = await Promise.all([
            axios.get(`${api}/pgGuestHouses`),
            axios.get(`${api}/properties`),
            axios.get(`${api}/landPlots`),
            axios.get(`${api}/shopOffices`),
          ]);

          const allData = [
            ...pgGuestHouses.data,
            ...properties.data,
            ...landPlots.data,
            ...shopOffices.data,
          ];

          const filteredProperties = allData.filter(
            (property) => property.profileId._id === profileId
          );
          if (filteredProperties.length > 0) {
            setData(filteredProperties);
          } else {
            console.log("No properties found for the matching profileId.");
          }
        }

        // After data is set, check if it's null to determine AsyncStorage value
        if (data === null || data.length === 0) {
          await AsyncStorage.setItem("View", "0");
        } else {
          await AsyncStorage.setItem("View", "1");
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [data]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profileId = await AsyncStorage.getItem("profileid");
        if (profileId !== null) {
          const [properties, pgGuestHouses] = await Promise.all([
            axios.get(`${api}/properties`),
            axios.get(`${api}/pgGuestHouses`),
          ]);

          const allData = [...properties.data, ...pgGuestHouses.data];

          const filteredProperties = allData.filter(
            (property) => property.profileId._id === profileId
          );

          if (filteredProperties.length > 0) {
            const propertyIds = filteredProperties.map(
              (property) => property._id
            );
            setID(propertyIds);
           // console.warn(propertyIds);
            // Now propertyIds will contain an array of _id values
          } else {
            console.log("No properties found for the matching profileId.");
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const toggleMenu = (itemId) => {
    setMenuVisibility((prevState) => ({
      ...prevState,
      [itemId]: !prevState[itemId],
    }));
  };

  const handleUpdate = (item) => {
  console.warn(item._id)
    if (item.properties == "properties") { // Assuming `id` is defined somewhere else
        navigation.navigate("PropertyForm", { data: item, num: 1 });
    } if (item.landplots == "landplots") { // Assuming `id` is defined somewhere else
      navigation.navigate("LandPlot", { data: item, num: 1 });
  } if (item.pgguesthouses == "pgguesthouses") { // Assuming `id` is defined somewhere else
    navigation.navigate("PgGuestHouse", { data: item, num: 1 });
}  if (item.shopoffices == "shopoffices") { // Assuming `id` is defined somewhere else
  navigation.navigate("ShopOffice", { data: item, num: 1 });
}
};


  const handleDelete = async (postId) => {
    try {
      // Delete requests for all types
      const pgGuestHouses = axios.delete(`${api}/pgGuestHouses/${postId}`);
      const properties = axios.delete(`${api}/properties/${postId}`);
      const landPlots = axios.delete(`${api}/landPlots/${postId}`);
      const shopOffices = axios.delete(`${api}/shopOffices/${postId}`);

      // Wait for all delete requests to complete
      await Promise.all([pgGuestHouses, properties, landPlots, shopOffices]);

      // Filter out the deleted item from data
      const updatedData = data.filter((post) => post._id !== postId);
      // Update data state with the new array reference
      setData(updatedData);
    } catch (error) {
      console.log("Error deleting post:", error);
    }
  };

  const renderAnnouncementItem = ({ item }) => (
    <TouchableWithoutFeedback
      onPress={() => navigation.navigate("ManageViewDetails", { data: item })}
    >
      <View style={styles.announcementContainer}>
        <Image
          source={{
            uri: item.image && item.image.length > 0 ? item.image[0] : null,
          }}
          style={styles.announcementImage}
        />
        <View style={styles.announcementDetails}>
          <Text style={styles.announcementType}>
            {item.profileId.firstName} {item.profileId.lastName}
          </Text>
          <Text style={styles.announcementDate}>
            {item.profileId && item.profileId.profession}
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
                    fontSize: 15,
                    marginBottom: 10,
                    elevation: 2,
                    backgroundColor: "#fff",
                    padding: 3,
                    paddingHorizontal: 10,
                    borderRadius: 5,
                    marginTop: 5,
                  }}
                >
                  Update
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDelete(item._id)}>
                <Text
                  style={{
                    fontSize: 15,
                    marginBottom: 10,
                    elevation: 2,
                    backgroundColor: "#fff",
                    padding: 3,
                    paddingHorizontal: 10,
                    borderRadius: 5,
                    marginTop: 5,
                    color: "tomato",
                  }}
                >
                  Delete
                </Text>
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

export default ManageView;

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
    left: 160,
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
    elevation: 0.5,
    padding: 3,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginTop: 5,
  },
});
