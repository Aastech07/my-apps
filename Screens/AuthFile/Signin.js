import React, { useState } from "react";
import {
  View,
  Image,
  Text,
  ScrollView,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import FontAwsome5 from "react-native-vector-icons/FontAwesome5";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { api } from "../Api";

const Signin = () => {
  const navigation = useNavigation();
  const [number, setNumber] = useState("");
  const Api = api;

  const loginUser = async () => {
    try {
      const { data } = await axios.post(`${Api}/login`, {
        phone: number,
      });
      console.warn(data);
      if (number.length === 10) {
        console.log("Data stored successfully");
        navigation.navigate("Verification", { id: data, phone: number });
      } else {
        Alert.alert("Please Enter 10 number");
      }
    } catch (error) {
      console.error("Error during login:", error.message);
    }
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#fff" }}
      contentContainerStyle={{
        alignItems: "center",
        justifyContent: "center",
        paddingBottom: responsiveHeight(60),
        bottom: 40,
      }}
    >
      <View style={{ top: responsiveHeight(10) }}>
        <Image
          source={require("/Community/my-apps/my-apps/assets/Splashs.png")}
          style={{ width: 59, height: 62 }}
        />
        <Text
          style={{
            top: 70,
            fontSize: 40,
            position: "absolute",
            fontWeight: "500",
            alignSelf: "center",
            color: "#37364A",
          }}
        >
          Community
        </Text>
      </View>

      <View style={{ top: responsiveHeight(30), right: responsiveWidth(32) }}>
        <Text style={{ fontSize: 23, fontWeight: "400", color: "#120D26" }}>
          Sign In
        </Text>
      </View>
      <View style={styles.input}>
        <TextInput
          style={styles.inputText}
          placeholder="Phone number"
          placeholderTextColor="black"
          onChangeText={(txt) => setNumber(txt)}
          editable={true}
          value={number}
          keyboardType="numeric"
        />
        <Image
          source={require("/Community/my-apps/my-apps/assets/PhoneImg.png")}
          style={{
            width: 26,
            height: 26,
            opacity: 0.6,
            position: "absolute",
            left: 10,
          }}
        />
      </View>

      <View style={{ top: responsiveHeight(4) }}>
        <View style={{ top: responsiveHeight(25) }}>
          <TouchableOpacity onPress={() => loginUser()} style={styles.loginBtn}>
            <Text style={{ color: "white", fontSize: 18, fontWeight: "500" }}>
              Sign in
            </Text>
            <FontAwsome5
              name="arrow-right"
              style={{
                position: "absolute",
                left: 205,
                backgroundColor: "#3D56F0",
                padding: 12,
                borderRadius: 50,
                color: "#fff",
              }}
            />
          </TouchableOpacity>
        </View>
        <View style={{}}>
          <View
            style={{ top: responsiveHeight(42), left: responsiveWidth(10) }}
          >
            <Text style={{ fontSize: 16 }}>Don't have an account?</Text>
            <Text
              style={{ left: 170, bottom: 19, color: "#1977F3" }}
              onPress={() => navigation.navigate("SignUp")}
            >
              Sign up
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Signin;
const styles = StyleSheet.create({
  inputView: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 8,
    height: 50,
    marginBottom: 40,
    justifyContent: "center",
    padding: 27,
    borderWidth: 0.3,
    top: responsiveHeight(29),
    alignSelf: "center",
    paddingLeft: 50,
    opacity: 0.6,
  },
  input: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 8,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 27,
    borderWidth: 1,
    top: responsiveHeight(35),
    alignSelf: "center",
    paddingLeft: 50,
    opacity: 0.6,
    marginVertical: -20,
    paddingRight: 50,
  },

  inputText: {
    height: 50,
    color: "black",
  },
  loginBtn: {
    width: "100%",
    backgroundColor: "#3D50DF",
    borderRadius: 15,
    height: 55,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 120,
    top: responsiveHeight(13),
    shadowColor: "#3D50DF",
    shadowOffset: {
      width: 0,
      height: 50,
    },
    shadowOpacity: 0.8,
    shadowRadius: 16.0,
    elevation: 10,
  },
});
