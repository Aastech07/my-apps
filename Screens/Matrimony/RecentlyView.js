import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import { api } from "../Api";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
const RecentlyView = () => {
  const [data, setData] = useState([]);
  const [ids, setID] = useState("");

  const img =
    "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?size=338&ext=jpg&ga=GA1.1.632798143.1705622400&semt=ais";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profileId = await AsyncStorage.getItem("profileid");
        if (profileId !== null) {
          const [matrimonial] = await Promise.all([
            axios.get(`${api}/matrimonial/profiles`),
          ]);

          const allData = [...matrimonial.data];
          const filteredProperties = allData.filter(
            (property) => property.profileId._id === profileId
          );

          if (filteredProperties.length > 0) {
            const id = filteredProperties[0]._id;
            setID(id); // Access the _id from the first element
            const res = await axios.get(`${api}/matrimonial/profiles/${id}`);

            let arr = [];
            for (let i = 0; i < res?.data.receivedRequests.length; i++) {
              const friendId = res.data.receivedRequests[i];
              const response = await axios.get(
                `${api}/matrimonial/profiles/${friendId}`
              );
              arr.push(response.data);
            }
            // Set the data
            setData(arr);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [api]);

  const handleAccept = async (id) => {
    console.warn(id._id);
    console.warn({ids})
    const { data } = await axios.put(`${api}/acceptRequest/${id._id}/${ids}`);

    console.warn(data);

    // setData(updatedData);
  };

  const handleReject = (id) => {
    // Remove the user from the list
    setData(data.filter((item) => item.id !== id));
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Image source={{ uri: img }} style={styles.avatar} />

      <View style={{}}>
        <Text>{item?.profileId?.firstName}</Text>
        <Text>{item?.profileId?.lastName}</Text>
      </View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={[
            styles.button,
            styles.acceptButton,
            item.accepted && styles.disabledButton,
          ]}
          onPress={() => handleAccept(item)}
          disabled={item.accepted}
        >
          <Text style={styles.buttonText}>Accept</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.rejectButton]}
          //   onPress={() => handleReject(item.id)}
        >
          <Text style={styles.buttonText}>Reject</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        // keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 5,
    paddingVertical: 10,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 15,
    marginBottom: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  buttonsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 5,
    marginHorizontal: 5,
    borderWidth: 1,
  },
  acceptButton: {
    backgroundColor: "green",
    borderColor: "green",
  },
  rejectButton: {
    backgroundColor: "red",
    borderColor: "red",
  },
  disabledButton: {
    opacity: 0.5,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
  },
});

export default RecentlyView;
