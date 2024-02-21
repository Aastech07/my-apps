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
import { SelectList } from "react-native-dropdown-select-list";
import axios from "axios";
import { api } from "../Api";
import { firebase } from "@react-native-firebase/firestore";
import uuid from "react-native-uuid";
const SignUp = () => {
  const [Member, setMember] = useState("");
  const [number, setNumber] = useState("");
  const [relationship, setRelationship] = useState("");
  const navigation = useNavigation();
  const userId = uuid.v4();
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

  const StoreData = () => {
    firebase
      .firestore()
      .collection("users")
      .doc(userId)
      .set({
        Member: Member,
        number: number,
        relationship: relationship,
        userId:userId
      })
      .then((res) => {
        console.log(res, "insert data");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const loginUser = async () => {
    try {
      const { data } = await axios.post(`${api}/signup`, {
        phone: number,
        relationship: relationship,
        membershipId: Member,
      });

      console.warn("Response:", data);

      if (data._id) {
        navigation.navigate("Signin");
      } else {
        Alert.alert(
          "User Already Exists",
          "The provided user already exists. Please try a different number or log in."
        );
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.log(
          "Endpoint not found. Check the URL and server configuration."
        );
      } else {
      }
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
      <View style={{ top: responsiveHeight(10), alignSelf: "center" }}>
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
      <View style={{ top: responsiveHeight(23), left: responsiveWidth(7) }}>
        <Text style={{ fontSize: 23, fontWeight: "400", color: "#120D26" }}>
          Sign Up
        </Text>
      </View>

      <View style={{ marginTop: 3 }}>
        <View style={{ top: responsiveHeight(24.5) }}>
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
            }}
            dropdownStyles={{
              marginLeft: responsiveWidth(5),
              marginRight: responsiveWidth(5),
            }}
          />
        </View>
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText} //envelope
          placeholder="Enter Member ID"
          placeholderTextColor="black"
          onChangeText={(txt) => setMember(txt)}
          editable={true}
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
          onChangeText={(txt) => setNumber(txt)}
          editable={true}
          value={number}
          keyboardType="numeric"
        />
        <FontAwsome5
          name="phone"
          size={15}
          style={{ opacity: 0.6, position: "absolute", left: 15 }}
        />
      </View>

      <View style={{ top: responsiveHeight(20) }}>
        <TouchableOpacity
          onPress={() => loginUser()}
          style={styles.loginBtn}
        >
          <Text style={{ color: "white", fontSize: 18, fontWeight: "500" }}>
            SIGN UP
          </Text>
          <FontAwsome5
            name="arrow-right"
            style={{
              position: "absolute",
              left: 215,
              backgroundColor: "#3D56F0",
              padding: 12,
              borderRadius: 50,
              color: "#fff",
            }}
          />
        </TouchableOpacity>
      </View>

      <View style={{}}>
        <View style={{ top: responsiveHeight(40), left: responsiveWidth(23) }}>
          <Text style={{ fontSize: 16 }}> have an account?</Text>
          <Text
            style={{ left: 135, bottom: 19, color: "#1977F3" }}
            onPress={() => navigation.navigate("Signin")}
          >
            Sign in
          </Text>
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
    backgroundColor: "#3D50DF",
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
