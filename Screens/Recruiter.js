import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Postjobs from "./Jobs/Postjobs";
import ManagePost from "./Jobs/ManagePost";
import Views from "./Jobs/Views";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const ByAndSellNav = () => {
  const [activeTab, setActiveTab] = useState("Post job");

  const renderScreen = () => {
    switch (activeTab) {
      case "Post job":
        return <Postjobs />;
      case "Manage Post":
        return <ManagePost />;
      case "View":
        return <Views />;
      default:
        return <Postjobs />;
    }
  };

  const renderTab = (tabName, iconName) => {
    const isActive = activeTab === tabName;
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
        {renderTab("Post job", "briefcase")}
        {renderTab("Manage Post", "list")}
        {renderTab("View", "eye")}
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
