import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Buy from "./Buy";
import Sell from "./Sell";
import ManageView from "./ManageView";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { api } from "../Api";

const ByAndSellNav = () => {
  const [activeTab, setActiveTab] = useState("Buy");
  const [data, setData] = useState("");
  const [views, setView] = useState("Public Propertys");

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

        const view = await AsyncStorage.getItem("View");
        setView(view);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [data]);

  const renderScreen = () => {
    switch (activeTab) {
      case "Buy":
        return <Buy />;
      case "Sell":
        return <Sell />;
      case "Manage View":
        return <ManageView />;
      default:
        return <Buy />;
    }
  };

  const renderTab = (tabName, iconName) => {
    const isActive = activeTab === tabName;
    const showTab = tabName !== "Manage View" || (tabName === "Manage View" && data !== null && data !== "");

    if (!showTab) {
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
          color={isActive ? "#1e90ff" : "#333"}
        />
        <Text style={styles.tabText}>{tabName}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Tab Bar */}
      <View style={styles.tabBar}>
        {renderTab("Buy", "shopping-cart")}
        {renderTab("Sell", "cash-register")}
        {renderTab("Manage View", "eye")}
      </View>

      {/* Content */}
      <View style={styles.content}>{renderScreen()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#1e90ff",
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

export default ByAndSellNav;
