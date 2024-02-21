import React from "react";
import { View } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import PropertyList from "./PropertyList";
import PropertyListView from "./PropertyListView";
import PropertyForm from "./AddProperty";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
const Tab = createMaterialTopTabNavigator();

const PropertylistNav = () => {
  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarLabelStyle: { fontSize: 16 }, 
          tabBarStyle: { height: 65 },
          swipeEnabled:false,
          tabBarIcon: ({ focused, color, size }) => {
            let IconComponent;
            let iconName;
            if (route.name === "Public Propertys") {
              IconComponent = FontAwesome5;
              iconName = focused ? "list" : "list";
            } else if (route.name === "Add Property") {
              IconComponent = FontAwesome5;
              iconName = focused ? "plus-circle" : "plus-circle";
            } else if (route.name === "Manage View") {
              IconComponent = FontAwesome5;
              iconName = focused ? "eye" : "eye-slash";
            }

            return <IconComponent name={iconName} size={17} color={color} />;
          },
        })}
        
      >
        <Tab.Screen
          name="Public Propertys"
          component={PropertyList}
          options={{
            tabBarLabelStyle: {
              fontSize: 10,
              right: 2,
            },
          }}
        />

        <Tab.Screen
          name="Add Property"
          component={PropertyForm}
          options={{
            tabBarLabelStyle: {
              fontSize: 10,
              right: 2.5,
            },
          }}
        />

        <Tab.Screen
          name="Manage View"
          component={PropertyListView}
          options={{
            tabBarLabelStyle: {
              fontSize: 10,
              right: 2,
            },
          }}
        />
      </Tab.Navigator>
    </View>
  );
};

export default PropertylistNav;
