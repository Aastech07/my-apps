import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from "react-native";
import MyMatches from "./MyMatches";
import New from "./New";
import Search from "./Search";
import RecentlyView from "./RecentlyView";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { api } from "../Api";
import MatrimonyFriends from "./MatrimonyFriends";

const Matrimony = () => {
  const [activeTab, setActiveTab] = useState("Search");
  const [hide, setHide] = useState(null); // Changed initial state to null
  const [data, setData] = useState(null); // Changed initial state to null

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
            const id = filteredProperties[0]._id; // Access the _id from the first element
            const res = await axios.get(`${api}/matrimonial/profiles/${id}`);

            // Fetch friends' profiles
            let arr = [];
            for (let i = 0; i < res?.data.friends.length; i++) {
              const friendId = res.data.friends[i];
              const response = await axios.get(
                `${api}/matrimonial/profiles/${friendId}`
              );
              arr.push(response.data);
            }

            // Set the data
            setHide(arr);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    setActiveTab("MyMatch");
    fetchData();
  }, [api]);

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
            const id = filteredProperties[0]._id; // Access the _id from the first element
            const res = await axios.get(`${api}/matrimonial/profiles/${id}`);

            // Fetch friends' profiles
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

  const renderScreen = () => {
    switch (activeTab) {
      case "Search":
        return <Search />;
      case "MyMatch":
        return <MyMatches />;
      case "New":
        return <New />;
      case "Request":
        return <RecentlyView />;
      case "Friends":
        return <MatrimonyFriends />;
      default:
        return <Search />;
    }
  };

  const renderTab = (tabName, iconName) => {
    const isActive = activeTab === tabName;

    // Check if the tab is 'View' and data is null or empty, then don't show the tab
    const showTab = !(tabName === "Request" && (!data || data.length === 0));
    const showTab1 = !(tabName === "Friends" && (!hide || hide.length === 0));

    if (!showTab) {
      return null; // Don't render the tab
    }
    if (!showTab1) {
      return null; // Don't render the tab
    }
    return (
      <TouchableOpacity
        key={tabName}
        style={[styles.tab, isActive && styles.activeTab]}
        onPress={() => setActiveTab(tabName)}
      >
        <FontAwesome5
          name={iconName}
          size={17}
          color={isActive ? "#874d3b" : "#333"}
        />
        <Text style={styles.tabText}>{tabName}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#874d3b" />

      <View style={styles.header}></View>

      <View style={styles.tabBar}>
        {renderTab("Search", "search")}
        {renderTab("MyMatch", "heart")}
        {renderTab("New", "plus-circle")}
        {renderTab("Request", "user-check")}
        {renderTab("Friends", "users")}
      </View>

      <View style={styles.content}>{renderScreen()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    backgroundColor: "#874d3b",
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#fff",
    elevation: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  tab: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
    height: 70,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#874d3b",
  },
  tabText: {
    fontSize: 12,
    color: "#333",
    marginTop: 5,
  },
  content: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    padding: 10,
  },
});

export default Matrimony;
