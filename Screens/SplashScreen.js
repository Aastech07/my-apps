import React, { useEffect, useState } from "react";
import { View, Image, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
const SplashScreen = () => {
  const navigation = useNavigation();

  const getData = async () => {
    
    setTimeout(() => {
      navigation.navigate("SignUp");
    }, 1000);
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <View style={{ alignItems: "center", justifyContent: "center", flex: 1,backgroundColor:'#fff' }}>
      <View style={{ bottom: 90 }}>
        <Image
          source={require("../assets/Splashs.png")}
          style={{ width: 48, height: 50 }}
        />
        <Text
          style={{
            top: 70,
            fontSize: 40,
            position: "absolute",
            fontWeight: "500",
            alignSelf: "center",
            color: "#5669FF",
          }}
        >
          Community
        </Text>
      </View>
    </View>
  );
};

export default SplashScreen;
