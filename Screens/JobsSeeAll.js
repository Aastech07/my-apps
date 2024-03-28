import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableWithoutFeedback,
  StyleSheet,
  ScrollView
} from "react-native";

import axios from "axios";
import { useNavigation } from "@react-navigation/native";

import { api } from "./Api";

const JobsSeeAll = () => {
  const Api = api;
  const navigation = useNavigation();

  const [details, setDetails] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${Api}/jobs`);
        setDetails(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <FlatList
        scrollEnabled={false}
        data={details}
        numColumns={2} // Show 2 columns
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate("JobsDetails", { data: item })}
          >
            <View style={styles.itemContainer}>
              <Image
                source={{ uri: item.images[0] }}
                style={styles.image}
              />
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.company}>{item.company}</Text>
              <Text style={styles.location}>📍 {item.location}</Text>
              <Text style={styles.salary}>{item.salary}</Text>
              <View style={styles.tagsContainer}>
                <View style={styles.tag}>
                  <Text style={styles.tagText}>{item.employmentType}</Text>
                </View>
                <View style={styles.tag}>
                  <Text style={styles.tagText}>{item.experienceLevel}</Text>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        )}
        contentContainerStyle={{ paddingBottom: 20 }} // Add padding to the list
        style={{ flex: 1 }} // Added flex: 1 to fill the parent container
      />
    </ScrollView>
  );
};

export default JobsSeeAll;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  itemContainer: {
    backgroundColor: "#0F2167",
    width: "47%", // Adjusted width to accommodate margin
    borderRadius: 20,
    padding: 15,
    marginBottom: 20, // Increased margin between items
    marginRight: "4%", // Added margin to create space between columns
  },
  image: {
    width: "100%",
    height: 50,
    borderRadius: 8,
    marginBottom: 10,
  },
  title: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  company: {
    color: "#fff",
    fontSize: 14,
    marginBottom: 5,
  },
  location: {
    color: "#fff",
    fontSize: 12,
  },
  salary: {
    color: "#fff",
    fontSize: 12,
    marginBottom: 5,
  },
  tagsContainer: {
    flexDirection: "row",
    marginTop: 5,
    right:10
  },
  tag: {
    backgroundColor: "#fff",
    paddingHorizontal: 8,
    borderRadius: 20,
    marginRight: 5,
  },
  tagText: {
    color: "#0F2167",
  },
});
