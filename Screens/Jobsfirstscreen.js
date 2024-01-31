import {
  View,
  Text,
  DrawerLayoutAndroid,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Switch,
} from "react-native";
import FontAwesome5 from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome5";
import React, { useRef, useState } from "react";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { useNavigation } from "@react-navigation/native";
import Recruiter from "./Recruiter";
const Jobsfirstscreen = () => {
  const drawer = useRef(null);
  const navigation = useNavigation();

  const [isEnabled, setIsEnabled] = useState(0);
   
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  const navigationView = () => (
    <View style={{ backgroundColor: "#fff" }}>
      <View style={{ left: 20, top: 100, opacity: 0.6 }}>
        <FontAwesome name="user" size={22} />
        <Text
          style={{
            position: "absolute",
            left: 30,
            fontSize: 18,
            fontWeight: "500",
          }}
        >
          My Profile
        </Text>
      </View>
      <View style={{ left: 20, top: 125, opacity: 0.6 }}>
        <FontAwesome name="comment" size={22} />
        <Text
          style={{
            position: "absolute",
            left: 30,
            fontSize: 18,
            fontWeight: "500",
          }}
          onPress={() => navigation.navigate("Blog")}
        >
          Blog
        </Text>
      </View>
      <View style={{ left: 20, top: 150, opacity: 0.6 }}>
        <FontAwesome name="money-check-alt" size={22} />
        <Text
          style={{
            position: "absolute",
            left: 33,
            fontSize: 18,
            fontWeight: "500",
          }}
        >
          Trade
        </Text>
      </View>
      <View style={{ left: 20, top: 175, opacity: 0.6 }}>
        <FontAwesome name="envelope" size={22} />
        <Text
          style={{
            position: "absolute",
            left: 33,
            fontSize: 18,
            fontWeight: "500",
          }}
        >
          Contact Us
        </Text>
      </View>
      <View style={{ left: 20, top: 200, opacity: 0.6 }}>
        <FontAwesome name="cog" size={22} />
        <Text
          style={{
            position: "absolute",
            left: 33,
            fontSize: 18,
            fontWeight: "500",
          }}
        >
          Setting
        </Text>
      </View>
      <View style={{ left: 20, top: 220, opacity: 0.6 }}>
        <FontAwesome name="question-circle" size={22} />
        <Text
          style={{
            position: "absolute",
            left: 33,
            fontSize: 18,
            fontWeight: "500",
          }}
        >
          Helps & FAQs
        </Text>
      </View>
      <View style={{ left: 20, top: 238, opacity: 0.6 }}>
        <FontAwesome name="sign-in-alt" size={22} />
        <Text
          style={{
            position: "absolute",
            left: 33,
            fontSize: 18,
            fontWeight: "500",
          }}
        >
          Sign Out
        </Text>
      </View>
    </View>
  );

  return (
  
    <DrawerLayoutAndroid
      ref={drawer}
      drawerWidth={200}
      drawerPosition={"left"}
      renderNavigationView={navigationView}
    >
     
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 400 }}
      >


        <View
          style={{
            backgroundColor: "#4383f2",
            borderBottomStartRadius: 30,
            borderBottomEndRadius: 30,
            paddingTop: 100,
          }}
        >
          <FontAwesome
            name="bell"
            size={20}
            color={"#fff"}
            style={{
              position: "absolute",
              left: responsiveWidth(87),
              top: 50,
              borderRadius: 50,
              backgroundColor: "#4383f2",
              paddingHorizontal: 7,
              paddingVertical: 5,
            }}
          />
          <FontAwesome5
            name="comment"
            size={20}
            color={"#fff"}
            style={{
              position: "absolute",
              left: responsiveWidth(75),
              top: 50,
              borderRadius: 50,
              backgroundColor: "#4383f2",
              paddingHorizontal: 6,
              paddingVertical: 5,
            }}
          />

          <Text
            style={{
              fontSize: 18,
              position: "absolute",
              marginTop: 54,
              color: "white",
              fontWeight: "bold",
              left: 70,
            }}
          >
            Directory
          </Text>
          <Text
            onPress={() => drawer.current.openDrawer()}
            style={{
              position: "absolute",
              top: 40,
              left: 28,
              fontSize: 30,
              color: "#fff",
            }}
          >
            ☰
          </Text>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              bottom: 6,
            }}
          >
            <Text
              style={{
                color: "#fff",
                fontSize: 25,
                fontWeight: "bold",
                position: "absolute",
                top: 135,
              }}
            >
              {" "}
              ...{" "}
            </Text>
          </View>
        </View>
        <View style={{ flex: 1, alignContent: "center", alignItems: "center" }}>
       
        <Switch
        trackColor={{false: '#767577', true: '#81b0ff'}}
        thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
 {isEnabled == 0? <Recruiter/>:null}
        </View>
      </ScrollView>
    </DrawerLayoutAndroid>
  );
};

export default Jobsfirstscreen;

const styles = StyleSheet.create({
  loginBtn: {
    width: "100%",
    backgroundColor: "#3D50DF",
    borderRadius: 15,
    height: 55,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 100,
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
