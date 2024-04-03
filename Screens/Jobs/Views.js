import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  Pressable,
  StyleSheet,
} from "react-native";
import { responsiveWidth } from "react-native-responsive-dimensions";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

import { ScrollView } from "react-native-virtualized-view";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { api } from "../Api";

const Views = () => {
  const Api = api;
  const navigation = useNavigation();

  const [apidata, setApiData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${Api}/applications`);
        setApiData(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const renderListItem = ({ item }) => {
    const images =
      "https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png";
    const fullName = `${item.profileId.firstName} ${item.profileId.lastName}`;

    return (
      <Pressable
        onPress={() => navigation.navigate("Viewdata", { data: item })}
        style={styles.itemContainer}
      >
        <View style={styles.imageContainer}>
          <Image source={{ uri: images }} style={styles.image} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{fullName}</Text>
          <Text style={styles.details}>
            {item.profileId.address.city} | {item.profileId.address.state} |{" "}
            {item.profileId.address.street}
          </Text>
          <Text style={styles.details}>
            {item.experience} | {item.currentCompany}
          </Text>
          <Text style={styles.details}>
            {item.currentCTC} | {item.noticePeriod} | {item.workmode}
          </Text>
        </View>
      </Pressable>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <FlatList
        data={apidata}
        renderItem={renderListItem}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  itemContainer: {
    flexDirection: "row",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
  },
  imageContainer: {
    position: "relative",
    marginRight: 20,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  genderIcon: {
    position: "absolute",
    bottom: 5,
    right: 5,
    color: "#ffffff",
    backgroundColor: "rgba(0, 128, 0, 0.8)",
    borderRadius: 10,
    padding: 3,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 5,
  },
  details: {
    opacity: 0.6,
  },
});

export default Views;
