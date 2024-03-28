import React, { useState ,useEffect} from "react";
import { View, Text, TouchableOpacity, StyleSheet ,BackHandler,Alert} from "react-native";
import MyMatches from "./MyMatches";
import New from "./New";

import Search from "./Search";
import RecentlyView from "./RecentlyView";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { StatusBar } from "react-native";
const Matrimony = () => {
  const [activeTab, setActiveTab] = useState("Search");

  const renderScreen = () => {
    switch (activeTab) {
      case "Search":
        return <Search />;
      case "MyMatch":
        return <MyMatches />;
      case "New":
        return <New />;
      case "View":
        return <RecentlyView />;
      default:
        
        return <Search />;
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
          color={isActive ? "#874d3b" : "#333"}
        />
        <Text style={styles.tabText}>{tabName}</Text>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    const backAction = () => {
      Alert.alert(
        "Hold on!",
        "Are you sure you want to go back?",
        [
          {
            text: "Cancel",
            onPress: () => null,
            style: "destructive"
          },
          {
            text: "YES",
            onPress: () => BackHandler.exitApp(),
            style:"destructive"
          }
        ],
        { cancelable: false }
      );
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);



  return (
    <View style={styles.container}>
      <StatusBar style="auto" barStyle="light-content" backgroundColor={"#874d3b"} />
      {/* Header */}
      <View style={styles.header}></View>

      {/* Tab Bar */}
      <View style={styles.tabBar}>
        {renderTab("Search", "search")}
        {renderTab("MyMatch", "heart")}
        {renderTab("New", "plus-circle")}
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
  header: {
    backgroundColor: "#874d3b",
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    color: "#fff",
    fontSize: 18,
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
    height:90,
    top:25
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
