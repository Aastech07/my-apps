import React, { useState, useRef } from "react";
import {
  View,
  Image,
  Text,
  ScrollView,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import FontAwsome5 from "react-native-vector-icons/FontAwesome5";
import { useNavigation } from "@react-navigation/native";
import { SelectList } from "react-native-dropdown-select-list";
import axios from "axios";
import { api } from "../Api";

const SignUp = () => {
  const [Member, setMember] = useState("");
  const [number, setNumber] = useState("");
  const [relationship, setRelationship] = useState("");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const Relationship = [
    { key: "1", value: "Father" },
    { key: "2", value: "Mother" },
    { key: "3", value: "Son" },
    { key: "4", value: "Daughter" },
    { key: "5", value: "Grandfather" },
    { key: "7", value: "Grandmother" },
    { key: "8", value: "Uncle" },
    { key: "9", value: "Aunt" },
    { key: "10", value: "Brother" },
    { key: "11", value: "Cousin" },
    { key: "12", value: "Nephew" },
    { key: "13", value: "Niece" },
    { key: "14", value: "Husband" },
    { key: "15", value: "Wife" },
    { key: "16", value: "Partner" },
    { key: "17", value: "Fiance" },
    { key: "18", value: "Fiancee" },
    { key: "19", value: "Ex-Spouse" },
    { key: "20", value: "In-law" },
    { key: "21", value: "Guardian" },
    { key: "22", value: "Godfather" },
    { key: "23", value: "Godmother" },
  ];
  const loginUser = async () => {
    try {
      // Validation
      if (!Member.trim()) {
        Alert.alert("Error", "Please enter a valid Member ID.");
        return;
      }
  
      const phoneRegex = /^[0-9]{10}$/;
      if (!number.match(phoneRegex)) {
        Alert.alert("Error", "Please enter a valid 10-digit phone number.");
        return;
      }
  
      if (!relationship) {
        Alert.alert("Error", "Please select a relationship.");
        return;
      }
  
      setLoading(true);
  
      const res = await axios.post(`${api}/signup`, {
        phone: number,
        relationship: relationship,
        membershipId: Member,
      });
  
      const {data} = await axios.post(`${api}/login`, {
        phone: number,
      });
  
      setLoading(false);
  
      console.warn("Response:", data);
  
      if (res.data && res.data._id) {
        navigation.navigate("Verification", { id: data, phone: number });
      }
    } catch (error) {
      setLoading(false);
      if (error.response && error.response.status === 400) {
        const responseData = error.response.data;
        if (responseData && responseData.error) {
          Alert.alert(
            "API Error",
            responseData.error.message || "An error occurred. Please try again."
          );
        } else {
          Alert.alert(
            "API Error",
            "The provided user already exists. Please try a different number or log in."
          );
        }
      } else {
        Alert.alert(
          "Error",
          "An unexpected error occurred. Please try again later."
        );
      }
    }
  };
  

  const handlePhoneNumberChange = (text) => {
    if (text.length <= 10) {
      setNumber(text);
    } else {
      Alert.alert("Error", "Phone number should not exceed 10 digits.");
    }
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#fff" }}
      contentContainerStyle={{
        paddingBottom: responsiveHeight(50),
        bottom: 40,
      }}
    >
      <View
        style={{
          top: responsiveHeight(4),
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

      <View style={{ bottom: 100 }}>
        <View style={{ top: responsiveHeight(23), left: responsiveWidth(7) }}>
          <Text style={{ fontSize: 23, fontWeight: "400", color: "#120D26" }}>
            Sign Up
          </Text>
        </View>

        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Enter Member ID"
            placeholderTextColor="black"
            onChangeText={(txt) => setMember(txt)}
            value={Member}
          />
          <FontAwsome5
            name="users"
            size={16}
            style={{ opacity: 0.6, position: "absolute", left: 15 }}
          />
        </View>

        <View style={styles.input}>
          <TextInput
            style={styles.inputText}
            placeholder="Phone Number"
            placeholderTextColor="black"
            onChangeText={handlePhoneNumberChange}
            value={number}
            keyboardType="numeric"
          />
          <Image
            source={require("/Community/my-apps/my-apps/assets/PhoneImg.png")}
            style={{
              width: 23,
              height: 23,
              opacity: 0.6,
              position: "absolute",
              left: 10,
            }}
          />
        </View>

        <View style={{ marginTop: 3 }}>
          <View style={{ top: responsiveHeight(27) }}>
            <Text
              style={{
                top: responsiveHeight(-1),
                left: 23,
                fontSize: 15,
                fontWeight: "500",
                opacity: 0.6,
              }}
            >
              Select Relationship
            </Text>

            <SelectList
              setSelected={(val) => setRelationship(val)}
              data={Relationship}
              save="value"
              boxStyles={{
                marginLeft: responsiveWidth(5),
                marginRight: responsiveWidth(5),
                height: 50,
              }}
              dropdownStyles={{
                marginLeft: responsiveWidth(5),
                marginRight: responsiveWidth(5),
              }}
              search={true}
            />
          </View>
        </View>

        <View style={{ top: responsiveHeight(20) }}>
          <TouchableOpacity onPress={loginUser} style={styles.loginBtn}>
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <>
                <Text
                  style={{ color: "white", fontSize: 18, fontWeight: "500" }}
                >
                  SIGN UP
                </Text>
                <FontAwsome5
                  name="arrow-right"
                  style={{
                    position: "absolute",
                    left: 215,
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
            style={{ top: responsiveHeight(35), left: responsiveWidth(23) }}
          >
            <Text style={{ fontSize: 16 }}> have an account?</Text>
            <Text
              style={{ left: 135, bottom: 19, color: "#874d3b" }}
              onPress={() => navigation.navigate("Signin")}
            >
              Sign in
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  inputView: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 8,
    height: 50,
    marginBottom: 30,
    justifyContent: "center",
    padding: 27,
    borderWidth: 1,
    top: responsiveHeight(27),
    alignSelf: "center",
    paddingLeft: 50,
  },
  input: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 8,
    height: 50,
    marginBottom: 30,
    justifyContent: "center",
    padding: 27,
    borderWidth: 1,
    top: responsiveHeight(29),
    alignSelf: "center",
    paddingLeft: 50,

    marginVertical: -20,
    paddingRight: 30,
  },
  inputText: {
    height: 50,
    color: "black",
  },
  loginBtn: {
    width: "80%",
    backgroundColor: "#874d3b",
    borderRadius: 15,
    height: 55,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
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
