import React from "react";
import { View } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import MyMatches from "./MyMatches";
import New from "./New";
import Nearby from "./Nearby";
import Search from "./Search";
import { responsiveHeight } from "react-native-responsive-dimensions";
import RecentlyView from "./RecentlyView";
import { Ionicons } from "@expo/vector-icons";

const Tab = createMaterialTopTabNavigator();
const Matrimony = () => {
  return (
    <View style={{ flex: 1, marginTop: responsiveHeight(4) }}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Search") {
              iconName = focused ? "ios-search" : "ios-search-outline";
            } else if (route.name === "MyMatc") {
              iconName = focused ? "ios-heart" : "ios-heart-outline";
            } else if (route.name === "New") {
              iconName = focused ? "ios-add-circle" : "ios-add-circle-outline";
            } else if (route.name === "Nearby") {
              iconName = focused ? "ios-location" : "ios-location-outline";
            } else if (route.name === "View") {
              iconName = focused ? "ios-eye" : "ios-eye-outline";
            }

            return <Ionicons name={iconName} size={20} color={color} />;
          },
        })}
      >
        <Tab.Screen
          name="Search"
          component={Search}
          options={{
            tabBarLabelStyle: {
              fontSize: 10, // Adjust the font size here
            },
          }}
        />
        <Tab.Screen
          name="MyMatc"
          component={MyMatches}
          options={{
            tabBarLabelStyle: {
              fontSize: 10, // Adjust the font size here
            },
          }}
        />
        <Tab.Screen
          name="New"
          component={New}
          options={{
            tabBarLabelStyle: {
              fontSize: 10, // Adjust the font size here
            },
          }}
        />
        <Tab.Screen
          name="Nearby"
          component={Nearby}
          options={{
            tabBarLabelStyle: {
              fontSize: 10, // Adjust the font size here
            },
          }}
        />
        <Tab.Screen
          name="View"
          component={RecentlyView}
          options={{
            tabBarLabelStyle: {
              fontSize: 10, 
            },
          }}
        />
      </Tab.Navigator>
    </View>
  );
};

export default Matrimony;
