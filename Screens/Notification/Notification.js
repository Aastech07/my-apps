import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { api } from "../Api";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/FontAwesome";

const Notification = ({ navigation }) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const userId = await AsyncStorage.getItem("UserID");
      console.warn(userId);
      try {
        const { data } = await axios.get(`${api}/notifications/${userId}`, {});
        setNotifications(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleNotificationPress = async (item) => {
    console.log({ item });
    await markNotificationAsRead(item);
    function removeNewAndPost(inputString) {
      return inputString.replace(/New|Post/g, "").replace(/\s+/g, "");
    }
    const changedString = removeNewAndPost(item.title);
    const properties = ["LandPlot", "PgGuestHouse", "Property", "ShopOffice"];
    const buyAndSell = [
      "Phone",
      "Accessories",
      "Tablets",
      "Bicycles",
      "Bike",
      "Car",
    ];
    if (changedString === "Blog") {
      navigation.navigate("NotificationBlogs", { data: item });
    } else if (properties.includes(changedString)) {
      navigation.navigate("Details", { data: item });
    } else if (buyAndSell.includes(changedString)) {
      navigation.navigate("ByDetalis", { data: item });
    }
  };

  const markNotificationAsRead = async (item) => {
    try {
      const { data } = await axios.put(`${api}/notifications/${item._id}`, {});
      const updatedNotifications = notifications.map((notif) =>
        notif._id === item._id ? { ...notif, isRead: true } : notif
      );
      setNotifications(updatedNotifications);
    } catch (error) {
      console.log(error);
    }
  };

  const renderItem = ({ item }) => {
    const isSeen = item.isRead || false;

    return (
      <TouchableOpacity
        onPress={() => handleNotificationPress(item)}
        style={[
          styles.container,
          isSeen ? styles.seenContainer : styles.unseenContainer,
        ]}
      >
        <Icon
          name="bell"
          size={20}
          color={isSeen ? "#666" : "#007bff"}
          style={styles.icon}
        />
        <View style={styles.textContainer}>
          <Text
            style={[styles.text, isSeen ? styles.seenText : styles.unseenText]}
          >
            {item.title}
          </Text>
          <Text
            style={[styles.text, isSeen ? styles.seenText : styles.unseenText]}
          >
            {item.message}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  // const renderEmptyComponent = () => {
  //   return (
  //     <View style={styles.emptyContainer}>
  //       <Text style={styles.emptyText}>No notifications to display</Text>
  //     </View>
  //   );
  // };

  return (
    <View style={styles.outerContainer}>
      <FlatList
        data={notifications}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        inverted // This will render the FlatList in reverse order
      />
    </View>
  );
};

const windowWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  seenContainer: {
    backgroundColor: "#fff",
  },
  unseenContainer: {
    backgroundColor: "#e8f4fb",
  },
  textContainer: {
    flex: 1,
    marginLeft: 12,
  },
  text: {
    fontSize: 16,
    color: "#333",
    marginBottom: 4,
  },
  seenText: {
    color: "#666",
  },
  unseenText: {
    color: "#333",
    fontWeight: "bold",
  },
  icon: {
    marginRight: 12,
  },
  unseenIndicator: {
    backgroundColor: "#007bff",
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
});

export default Notification;
