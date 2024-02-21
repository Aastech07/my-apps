import React from "react";
import { View } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Buy from "./Buy";
import Sell from "./Sell";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import ManageView from "./ManageView";
const Tab = createMaterialTopTabNavigator();

const ByAndSellNav = () => {
  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarLabelStyle: { fontSize: 16 },
          tabBarStyle: { height: 55 },
          swipeEnabled: false,
          tabBarIcon: ({ focused, color }) => {
            let IconComponent;
            let iconName;
            if (route.name === "Buy") {
              IconComponent = FontAwesome5;
              iconName = focused ? "shopping-cart" : "shopping-cart";
            } else if (route.name === "Sell") {
              IconComponent = FontAwesome5;
              iconName = focused ? "cash-register" : "cash-register";
            } else if (route.name === "Manage View") {
              IconComponent = FontAwesome5;
              iconName = focused ? "eye" : "eye-slash";
            }
            return <IconComponent name={iconName} size={17} color={color} />;
          },
        })}
      >
        <Tab.Screen
          name="Buy"
          component={Buy}
          options={{
            tabBarLabelStyle: {
              fontSize: 10,
              right: 2,
              bottom: 5,
            },
          }}
        />

        <Tab.Screen
          name="Sell"
          component={Sell}
          options={{
            tabBarLabelStyle: {
              fontSize: 10,
              right: 2.5,
              bottom: 5,
            },
          }}
        />

        <Tab.Screen
          name="Manage View"
          component={ManageView}
          options={{
            tabBarLabelStyle: {
              fontSize: 10,
              right: 2.5,
              bottom: 5,
            },
          }}
        />
      </Tab.Navigator>
    </View>
  );
};

export default ByAndSellNav;
