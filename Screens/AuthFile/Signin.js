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
  ActivityIndicator,
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
  const [loading, setLoading] = useState(false);

  const loginUser = async () => {
    try {
      setLoading(true);

      // Validation for phone number
      const phoneRegex = /^[0-9]{10}$/;
      if (!number.match(phoneRegex)) {
        setLoading(false);
        Alert.alert(
          "Invalid Phone Number",
          "Please enter a valid 10-digit phone number."
        );
        return;
      }

      const { data } = await axios.post(`${api}/login`, {
        phone: number,
      });

      setLoading(false);

    

      console.log("Data stored successfully");
      navigation.navigate("Verification", { id: data, phone: number });
    } catch (error) {
      setLoading(false);
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
      <View
        style={{
          top: responsiveHeight(4.5),
          alignSelf: "center",
          backgroundColor: "#874d3b",
          paddingHorizontal: 20,
          paddingVertical: 20,
        }}
      >
        <Image
          source={require("/Community/my-apps/my-apps/assets/PAREKH MOTU TAD LOGO.png")}
          style={{ width: responsiveWidth(90), height: responsiveHeight(15) }}
          resizeMode="contain"
        />
      </View>

      <View style={{ top: responsiveHeight(15), right: responsiveWidth(32) }}>
        <Text style={{ fontSize: 23, fontWeight: "400", color: "#120D26" }}>
          Sign In
        </Text>
      </View>
      <View style={styles.input}>
        <TextInput
          style={styles.inputText}
          placeholder="Phone number"
          placeholderTextColor="black"
          onChangeText={(txt) => {
            if (txt.length <= 10) {
              setNumber(txt);
            }
          }}
          value={number}
          keyboardType="numeric"
          maxLength={10} // Set maximum length to 10
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
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <>
                <Text
                  style={{ color: "white", fontSize: 18, fontWeight: "500" }}
                >
                  Sign in
                </Text>
                <FontAwsome5
                  name="arrow-right"
                  style={{
                    position: "absolute",
                    left: 205,
                    backgroundColor: "#874d3b",
                    padding: 12,
                    borderRadius: 50,
                    color: "#fff",
                  }}
                />
              </>
            )}
          </TouchableOpacity>
        </View>
        <View style={{}}>
          <View
            style={{ top: responsiveHeight(23), left: responsiveWidth(10) }}
          >
            <Text style={{ fontSize: 16 }}>Don't have an account?</Text>
            <Text
              style={{ left: 170, bottom: 19, color: "#874d3b" }}
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
    top: responsiveHeight(20),
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
    backgroundColor: "#874d3b",
    borderRadius: 15,
    height: 55,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 120,
    top: responsiveHeight(-5),
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
