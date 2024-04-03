import React, { useEffect, useState } from "react";
import { View, Image, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SplashScreen = () => {
  const navigation = useNavigation();

  const getData = async () => {
    const userId = await AsyncStorage.getItem("UserID");
    const Profileid = await AsyncStorage.getItem("UserID");
    setTimeout(() => {
      if (!userId && !Profileid) {
        navigation.navigate("SignUp");
      } else {
        navigation.navigate("BottomNav");
      }
    }, 1000);
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        backgroundColor: "#874d3b",
      }}
    >
      <View style={{}}>
        <Image
          source={require("../assets/PAREKH_MOTU_TAD_LOGO.png")}
          style={{ width: 300, height: 100 }}
        />
      </View>
    </View>
  );
};

export default SplashScreen;