import React from "react";
import { View } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import MyMatches from "./MyMatches";
import New from "./New";
import Nearby from "./Nearby";
import Search from "./Search";
import { responsiveHeight } from "react-native-responsive-dimensions";
import RecentlyView from "./RecentlyView";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const Tab = createMaterialTopTabNavigator();

const Matrimony = () => {
  return (
    <View style={{ flex: 1, marginTop: responsiveHeight(4) }}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let IconComponent;
            let iconName;

            if (route.name === "Search") {
              IconComponent = FontAwesome5;
              iconName = focused ? "search" : "search";
            } else if (route.name === "MyMatc") {
              IconComponent = FontAwesome5;
              iconName = focused ? "heart" : "heart";
            } else if (route.name === "New") {
              IconComponent = FontAwesome5;
              iconName = focused ? "plus-circle" : "plus-circle";
            } else if (route.name === "Nearby") {
              IconComponent = FontAwesome5;
              iconName = focused ? "map-marker-alt" : "map-marker-alt";
            } else if (route.name === "View") {
              IconComponent = FontAwesome5;
              iconName = focused ? "eye" : "eye-slash";
            }

            return <IconComponent name={iconName} size={18} color={color} />;
          },
        })}
      >
        <Tab.Screen
          name="Search"
          component={Search}
          options={{
            tabBarLabelStyle: {
              fontSize: 10,
            },
          }}
        />
        <Tab.Screen
          name="MyMatc"
          component={MyMatches}
          options={{
            tabBarLabelStyle: {
              fontSize: 10,
            },
          }}
        />
        <Tab.Screen
          name="New"
          component={New}
          options={{
            tabBarLabelStyle: {
              fontSize: 10,
            },
          }}
        />
        <Tab.Screen
          name="Nearby"
          component={Nearby}
          options={{
            tabBarLabelStyle: {
              fontSize: 10,
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
