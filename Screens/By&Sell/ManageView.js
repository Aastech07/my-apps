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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profileId = await AsyncStorage.getItem("profileid");

        if (profileId !== null) {
          const [
            cars,
            bikes,
            electronics,
            bicycles,
            fashion,
            furniture,
            tablets,
            phones,
            accessories,
          ] = await Promise.all([
            axios.get(`${api}/cars`),
            axios.get(`${api}/bikes`),
            axios.get(`${api}/electronics`),
            axios.get(`${api}/bicycles`),
            axios.get(`${api}/fashion`),
            axios.get(`${api}/furniture`),
            axios.get(`${api}/tablets`),
            axios.get(`${api}/phones`),
            axios.get(`${api}/accessories`),
          ]);
          
          const allData = [
            ...cars.data,
            ...bikes.data,
            ...electronics.data,
            ...bicycles.data,
            ...fashion.data,
            ...furniture.data,
            ...tablets.data,
            ...phones.data,
            ...accessories.data,
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

  const toggleMenu = (itemId) => {
    setMenuVisibility((prevState) => ({
      ...prevState,
      [itemId]: !prevState[itemId],
    }));
  };

  const handleUpdate = (item) => {
    console.warn(item._id);
    if (item.cars == "cars") {
      navigation.navigate("CarDetails", { data: item, num: 1 });
    }
    if (item.phones == "phones") {
      navigation.navigate("MobileDetails", { data: item, num: 1 });
    }
    if (item.bikes == "bikes") {
      navigation.navigate("BikeDetails", { data: item, num: 1 });
    }
    if (item.electronics == "electronics") {
      navigation.navigate("ElectronicsDetails", { data: item, num: 1 });
    }
    if (item.bicycles == "bicycles") {
      navigation.navigate("BicycleDetails", { data: item, num: 1 });
    }
    if (item.accessories == "accessories") {
      navigation.navigate("AccessoriesDetails", { data: item, num: 1 });
    }
    if (item.fashions == "fashions") {
      navigation.navigate("FashionDetails", { data: item, num: 1 });
    }

    if (item.furnitures == "furnitures") {
      navigation.navigate("FurnitureDetail", { data: item, num: 1 });
    }
    if (item.tablets == "tablets") {
      navigation.navigate("Tablets", { data: item, num: 1 });
    }
  };
  //tablets

  const handleDelete = async (postId) => {
    try {
      // Delete requests for all types
      const deleteCar = axios.delete(`${api}/cars/${postId}`);
      const deleteBike = axios.delete(`${api}/bikes/${postId}`);
      const deleteElectronics = axios.delete(`${api}/electronics/${postId}`);
      const deleteBicycles = axios.delete(`${api}/bicycles/${postId}`);
      const deleteFashion = axios.delete(`${api}/fashion/${postId}`);
      const deleteFurniture = axios.delete(`${api}/furniture/${postId}`);
      const deletetablets = axios.delete(`${api}/tablets/${postId}`);
      const deletephone = axios.delete(`${api}/phones/${postId}`);
      // phones
      await Promise.all([
        deleteCar,
        deleteBike,
        deleteElectronics,
        deleteBicycles,
        deleteFashion,
        deleteFurniture,
        deletetablets,
        deletephone,
      ]);

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
      onPress={() => navigation.navigate("ManageViewDetail", { data: item })}
    >
      <View style={styles.announcementContainer}>
        <Image
          source={{
            uri: item.images && item.images.length > 0 ? item.images[0] : null,
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
    left: 165,
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
