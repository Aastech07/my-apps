import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import PropertyList from "./PropertyList";
import PropertyListView from "./PropertyListView";
import PropertyForm from "./AddProperty";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { api } from "../Api";

const PropertylistNav = () => {
  const [activeTab, setActiveTab] = useState("Public Propertys");
  const [views, setView] = useState("Public Propertys");
  const [data, setData] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const profileId = await AsyncStorage.getItem('profileid');

      try {
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
             setData(filteredProperties)
          } else {
            console.log('No properties found for the matching profileId.');
          }
        }
        const view = await AsyncStorage.getItem("View");
        setView(view);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);


  const renderScreen = () => {
    switch (activeTab) {
      case "Public Propertys":
        return <PropertyList />;
      case "Add Property":
        return <PropertyForm />;
      case "Manage View":
        return <PropertyListView />;
      default:
        return <PropertyList />;
    }
  };

  const renderTab = (tabName, iconName) => {
    const isActive = activeTab === tabName;
    const showTab = !(tabName === "Manage View" && !data);

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
        {renderTab("Public Propertys", "list")}
        {renderTab("Add Property", "plus-circle")}
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

export default PropertylistNav;
