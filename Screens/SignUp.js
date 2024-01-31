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
  responsiveFontSize,
  responsiveHeight, responsiveWidth,
} from "react-native-responsive-dimensions";
import FontAwsome5 from "react-native-vector-icons/FontAwesome5";
import { useNavigation } from "@react-navigation/native";
import {
  MultipleSelectList,
  SelectList,
} from "react-native-dropdown-select-list";
import axios from "axios";
const SignUp = () => {
  const [Membar, setMembar] = useState("");
  const [number, setNumber] = useState("");
  const [relationship,setRelationship] = useState('')
  const navigation = useNavigation();
  const togglePass = () => {
    setSecure(!secure);
  };
  const Relationship = [
    { key: "1", value: "Father" },
    { key: "2", value: "Mother" },
    { key: "3", value: "Sister" },
    { key: "4", value: "Brother" },
    { key: "5", value: "Grandfather" },
    { key: "6", value: "uncle" },
  ];

  const loginUser = async () => {
    try {
      const { data } = await axios.post(
        "http://15.206.74.132:3000/api/signup",
        {
          phone:number,
          relationship:relationship,
          membershipId:Membar
        }
      );
  
      console.log("Response:", data);
  
      if (data._id) {
        navigation.navigate("Signin");
      } else {

      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.log("Endpoint not found. Check the URL and server configuration.");
        // Handle 404 error (e.g., display an error message to the user)
      } else {
        Alert.alert('User Already Exists', 'The provided user already exists. Please try a different number or log in.');

      }
    }
  };
  
//navigation.navigate("BottomNav")
  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#fff" }}
      contentContainerStyle={{
       
        paddingBottom: responsiveHeight(50),
        bottom: 40,
      }}
    >
      <View style={{ top:responsiveHeight(10),alignSelf:'center' }}>
        <Image
          source={require("../assets/Splashs.png")}
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
      <View style={{ top: responsiveHeight(23), left:responsiveWidth(7) }}>
        <Text style={{ fontSize: 23, fontWeight: "400", color: "#120D26" }}>
          Sign Up
        </Text>
      </View>

       
         <View style={{ marginTop: 10 }}>
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
                    save='value'
                    boxStyles={{
                      marginLeft: responsiveWidth(5),
                      marginRight: responsiveWidth(5),
                    }}
                    dropdownStyles={{
                      marginLeft: responsiveWidth(5),
                      marginRight: responsiveWidth(5),
                    }}
                    search={false}
                  />
                </View>
              </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}        //envelope
          placeholder="Enter Membar ID"
          placeholderTextColor="black"
          onChangeText={(txt) => setMembar(txt)}
          editable={true}
          value={Membar}
        />
      </View>
      <View style={{top:responsiveHeight(20),right:responsiveWidth(-9.5)}}>
           <FontAwsome5 name="users" size={16} style={{opacity:0.6}}/>
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
      </View>
      <View style={{top:responsiveHeight(20),right:responsiveWidth(-9.5)}}>
           <FontAwsome5 name="phone" size={15} style={{opacity:0.6}}/>
      </View>
    
          
      
      <View style={{ top: responsiveHeight(20) }}>
        <TouchableOpacity
          onPress={() =>loginUser() }
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
       
        <View style={{ top: responsiveHeight(40),left:responsiveWidth(23) }}>
          <Text style={{ fontSize: 16 }}> have an account?</Text>
          <Text style={{ left: 135, bottom: 19, color: "#1977F3" }} onPress={()=>navigation.navigate('Signin')}>
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
    top: responsiveHeight(29),
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
   alignSelf:'center',
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
