import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet, Dimensions } from "react-native";
import { useRoute } from "@react-navigation/native";
import { api } from "../Api";
import axios from "axios";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { StatusBar } from "react-native";

const { width, height } = Dimensions.get("window");
const NotificationBlogs = () => {
  const data = useRoute();
  const value = data.params?.data;
  const id = value?.Id;
  const [notification, setNotifications] = useState("");
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id !== null) {
          const { data } = await axios.get(`${api}/blogs/${id}`);
          console.warn(data);
          setNotifications(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const imageOpacity = useSharedValue(0);
  imageOpacity.value = withSpring(1);

  const imageStyle = useAnimatedStyle(() => {
    return {
      opacity: imageOpacity.value,
    };
  });

  const stripHtmlTags = (html) => {
    if (!html) return ""; // Check if html is undefined or null
    const strippedString = html.replace(/<[^>]+>/g, "");
    return strippedString;
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="dark-content"
        />
        <Animated.Image
          source={{ uri: notification.image }}
          style={[styles.image, imageStyle]}
        />

        <View style={styles.detailsContainer}>
          <Text style={styles.adTitle}>{notification.title}</Text>

          <View style={styles.separator}></View>
          <Text style={styles.type}>{notification.category}</Text>
          <View style={styles.descriptionContainer}>
            <Text style={styles.description}>
              {stripHtmlTags(notification.description)}
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default NotificationBlogs;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: height * 0.5,
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 1,
  },

  detailsContainer: {
    padding: 20,
  },
  adTitle: {
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
    color: "#333",
  },
  price: {
    color: "#0C84FF",
    fontSize: 17,
    marginTop: 5,
  },
  separator: {
    height: 1,
    backgroundColor: "#E0E0E0",
    marginVertical: 10,
  },
  type: {
    fontWeight: "500",
    fontSize: 18,
    alignSelf: "center",
    color: "#333",
  },
  descriptionContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  description: {
    fontSize: 16,
    marginLeft: 5,
    color: "#666",
    textAlign: "center",
  },
  addressContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  address: {
    fontSize: 16,
    marginLeft: 5,
  },
  iconContainer: {
    marginRight: 5,
    borderWidth: 1,
    borderColor: "gray",
    padding: 5,
    borderRadius: 5,
  },
  icon: {
    // You can add styles for the icon here if needed
  },
  bottomButtonContainer: {
    flexDirection: "row",

    backgroundColor: "#ffff",
    paddingBottom: 30,
    shadowColor: "#000",
    shadowOpacity: 0.6,
    shadowRadius: 20,
    elevation: 20,
  },

  button: {
    width: (width - 60) / 2, // Calculate the width dynamically based on the screen width
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#3D50DF",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#3D50DF",
    marginHorizontal: 10,
    top: 10,
    left: 10,
  },

  buttonText: {
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 5,
  },
});
