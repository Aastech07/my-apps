import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { responsiveWidth } from "react-native-responsive-dimensions";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { api } from "../Api";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

const ManagePost = () => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [menuVisibility, setMenuVisibility] = useState({});

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const profileId = await AsyncStorage.getItem("UserID");

        if (profileId) {
          const response = await axios.get(`${api}/jobs`);
          const filteredPosts = response.data.filter(
            (post) => post.userId._id === profileId
          );

          setData(filteredPosts);

          const initialMenuVisibility = {};
          filteredPosts.forEach((post) => {
            initialMenuVisibility[post._id] = false;
          });
          setMenuVisibility(initialMenuVisibility);
        } else {
          console.log("UserID not found in AsyncStorage.");
        }
      } catch (error) {
        console.log("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  const toggleMenu = (postId) => {
    setMenuVisibility((prevState) => ({
      ...prevState,
      [postId]: !prevState[postId],
    }));
  };

  const handleDelete = async (postId) => {
    try {
      await axios.delete(`${api}/jobs/${postId}`);
      setData((prevData) => prevData.filter((post) => post._id !== postId));
    } catch (error) {
      console.log("Error deleting post:", error);
    }
  };

  const handleUpdate = (post) => {
    navigation.navigate("Edit", { data: post._id });
  };

  const renderItem = ({ item }) => (
    <View style={styles.postContainer}>
      <TouchableWithoutFeedback
        onPress={() => navigation.navigate("details", { data: item })}
        style={{}}
      >
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.details}>
          {item.location} . {item.educationLevel} . {item.experienceLevel}
        </Text>
      </TouchableWithoutFeedback>
      <View
        style={{ flexDirection: "row", justifyContent: "flex-end", top: 10 }}
      >
        <TouchableOpacity onPress={() => toggleMenu(item._id)}>
          <Text style={styles.menuText}>...</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.price}>RS. {item.salary}</Text>

      {menuVisibility[item._id] && (
        <View style={styles.menuContainer}>
          <TouchableOpacity onPress={() => handleUpdate(item)}>
            <Text style={styles.menuItem}>Update</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleDelete(item._id)}>
            <Text style={styles.menuItem}>Delete</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>All Posts</Text>
      <FlatList
        data={data}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: responsiveWidth(1),
    marginBottom: 55,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
    opacity: 0.7,
    left: 10,
  },
  postContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
    marginHorizontal: 3,
    top: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  details: {
    fontSize: 16,
    color: "#666",
    marginBottom: 5,
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#007bff",
    marginBottom: 10,
  },
  menuText: {
    fontSize: 24,
    position: "absolute",
    color: "#808080",
    bottom: 50,
    right: 10,
  },
  menuContainer: {
    position: "absolute",
    top: 30,
    right: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  menuItem: {
    fontSize: 16,
    paddingVertical: 5,
  },
});

export default ManagePost;
