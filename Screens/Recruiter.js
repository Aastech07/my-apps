import React from "react";
import { View } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Postjobs from "./Jobs/Postjobs";
import ManagePost from "./Jobs/ManagePost";
import Views from "./Jobs/Views";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
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
            if (route.name === "Post job") {
              IconComponent = FontAwesome5;
              iconName = focused ? "briefcase" : "briefcase";
            } else if (route.name === "Manage Post") {
              IconComponent = FontAwesome5;
              iconName = focused ? "list" : "list";
            } else if (route.name === "View") {
              IconComponent = FontAwesome5;
              iconName = focused ? "eye" : "eye-slash";
            }
            return <IconComponent name={iconName} size={17} color={color} />;
          },
        })}
      >
        <Tab.Screen
          name="Post job"
          component={Postjobs}
          options={{
            tabBarLabelStyle: {
              fontSize: 10,
              right: 2,
              bottom: 5,
            },
          }}
        />

        <Tab.Screen
          name="Manage Post"
          component={ManagePost}
          options={{
            tabBarLabelStyle: {
              fontSize: 10,
              right: 2.5,
              bottom: 5,
            },
          }}
        />

        <Tab.Screen
          name="View"
          component={Views}
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
