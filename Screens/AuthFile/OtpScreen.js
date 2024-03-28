import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { OtpInput } from "react-native-otp-entry";
import { useNavigation } from "@react-navigation/native";
import FontAwsome5 from "react-native-vector-icons/FontAwesome5";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRoute } from "@react-navigation/native";
import { api } from "../Api";
const OtpScreen = () => {
  const data = useRoute();
  const otp = data.params.id;
  const num = useRoute();
  const phone = num.params.phone;
  const nums = otp.otp;

  const navigation = useNavigation();

  const [otps, setOtp] = useState("");

  const loginUser = async () => {
    try {
      const { data } = await axios.post(`${api}/verify-login`, {
        phone: phone,
        otp: otps,
      });

      //   console.warn(data.userProfile);
      await AsyncStorage.setItem("UserID", data.user._id);
      if (data.userProfile == null) {
        navigation.navigate("CreateProfile", { Datas: data });
      } else {
        navigation.navigate("BottomNav", { Datas: data });
        await AsyncStorage.setItem("profileid", data.userProfile._id);
      }
    } catch (error) {
      console.log("Error during login:", error.message);
    }
  };

  const [timer, setTimer] = useState(30);

  useEffect(() => {
    const interval = setInterval(() => {
      if (timer > 0) {
        setTimer(timer - 1);
      } else {
        clearInterval(interval);
        setOtp("");
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;

  const restartTimer = () => {
    setTimer(30);
    setOtp("");
  };

  return (
    <View style={{ backgroundColor: "#fff", flex: 1 }}>
      <View style={{ top: 50, left: 30 }}>
        <Text style={{ fontSize: 18, marginBottom: 8 }}>
          We've send you the verification.
        </Text>
      </View>
      <View style={{ top: 80 }}>
        <OtpInput
          numberOfDigits={4}
          focusColor="green"
          focusStickBlinkingDuration={500}
          onTextChange={(text) => setOtp(text)}
          onFilled={(text) => console.log(`OTP is ${otps}`)}
          theme={{
            containerStyle: styles.container,
            inputsContainerStyle: styles.inputsContainer,
            pinCodeContainerStyle: styles.pinCodeContainer,
            pinCodeTextStyle: styles.pinCodeText,
            focusStickStyle: styles.focusStick,
            focusedPinCodeContainerStyle: styles.pinCodeContainer,
          }}
        />
      </View>
      <View style={{ top: 150, position: "absolute", alignSelf: "center" }}>
        <TouchableOpacity onPress={() => loginUser()} style={styles.loginBtn}>
          <Text style={{ color: "white", fontSize: 18, fontWeight: "500" }}>
            Submit
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
        </TouchableOpacity>
      </View>
      <View
        style={{
          top: responsiveHeight(30),
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TouchableOpacity onPress={() => Resend() + restartTimer()}>
          <Text style={{ fontSize: 16 }}>Re-send code in</Text>
        </TouchableOpacity>

        <Text
          style={{
            color: "#874d3b",
            position: "absolute",
            left: responsiveWidth(68),
          }}
        >
          {`${minutes}:${seconds < 10 ? "0" : ""}${seconds}`}
        </Text>
        <Text style={{ position: "absolute", top: responsiveHeight(5) }}>
          OTP: {nums}
        </Text>
      </View>
    </View>
  );
};

export default OtpScreen;
const styles = StyleSheet.create({
  container: {
    textAlign: "center",
  },
  inputsContainer: { marginHorizontal: 40 },
  pinCodeContainer: {
    borderRadius: 10,
  },
  loginBtn: {
    width: "100%",
    backgroundColor: "#874d3b",
    borderRadius: 15,
    height: 55,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 100,
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
