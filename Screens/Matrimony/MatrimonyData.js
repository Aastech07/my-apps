import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { ChevronLeftIcon } from "react-native-heroicons/outline";

import Animated, {
  FadeInRight,
  FadeInLeft,
  FadeInDown,
} from "react-native-reanimated";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { StatusBar } from "react-native";
import {
  responsiveFontSize,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import axios from "axios";
import { api } from "../Api";
import AsyncStorage from "@react-native-async-storage/async-storage";
const MatrimonyData = () => {
  const navigation = useNavigation();
  const Data = useRoute();
  const Value = Data.params?.data;
  const id = Value?._id;
  console.warn(id);

  // console.warn({ matrimonial:id });
  const [show, setShow] = useState(false);
  const [profileId, setProfileID] = useState("");
  const [filteredData, setFilteredData] = useState("");
  const [friends, setFriendsID] = useState("");

  const handleNavigateBack = () => {
    navigation.goBack();
  };

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const profileId = await AsyncStorage.getItem("profileid");
        if (profileId !== null) {
          const [matrimonial] = await Promise.all([
            axios.get(`${api}/matrimonial/profiles`),
          ]);

          const allData = [...matrimonial.data];
          const filteredProperties = allData.filter(
            (property) => property.profileId._id === profileId
          );

          if (filteredProperties.length > 0) {
            const id = filteredProperties[0]._id;
            const FriendsIDs = filteredProperties[0].friends;
            setFriendsID(FriendsIDs);

            setProfileID(id);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [api]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const value = await AsyncStorage.getItem("UserID");
        const { data } = await axios.get(`${api}/matrimonial/profiles`);
        const filtered = data.filter((item) =>
          item?.sentRequests.map((req) => req === id).includes(true)
        );

        const userFilter = filtered.filter(
          (item) => item?.userId._id === value
        );

        //  console.warn({ userFilter });
        setFilteredData(userFilter);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [api]);

  const calculateAge = (dateOfBirth) => {
    const birthDate = new Date(dateOfBirth);
    const currentDate = new Date();
    const age = currentDate.getFullYear() - birthDate.getFullYear();
    if (
      currentDate.getMonth() < birthDate.getMonth() ||
      (currentDate.getMonth() === birthDate.getMonth() &&
        currentDate.getDate() < birthDate.getDate())
    ) {
      return age - 1;
    } else {
      return age;
    }
  };

  const limets = (dateOfBirth) => {
    const birthDate = new Date(dateOfBirth);
    const formattedBirthDate = birthDate.toISOString().split("T")[0];
    return formattedBirthDate;
  };

  React.useEffect(() => {
    const storeData = async () => {
      try {
        // await AsyncStorage.setItem("UserID", ids);
        const Matrymonyid = await AsyncStorage.getItem("Matrymonyid");
        // setProfileID(Matrymonyid);
      } catch (e) {
        console.log(e);
      }
    };
    storeData();
  }, []);

  const RequestApi = async () => {
    try {
      const { data } = await axios.post(
        `${api}/sendRequest/${profileId}/${id}`,
        {}
      );
      console.warn(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <ScrollView style={{ flex: 1 }}>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="dark-content"
        />
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginTop: 5,
          }}
        >
          <Animated.Image
            entering={FadeInDown.duration(500).damping()}
            source={{ uri: Value?.images[0] }}
            style={{ width: "98%", height: 410, borderRadius: 20 }}
          />
          <Animated.View
            entering={FadeInLeft.duration(500).damping()}
            style={{
              right: responsiveWidth(39),
              bottom: 360,
              padding: 5,
              borderRadius: 50,

              shadowRadius: 50,
            }}
          >
            <TouchableOpacity onPress={() => handleNavigateBack()}>
              <ChevronLeftIcon size={27} strokeWidth={4.5} color={"#000"} />
            </TouchableOpacity>
          </Animated.View>

          <Animated.View
            entering={FadeInRight.duration(500).damping()}
            style={{
              bottom: 400,
              padding: 5,
              borderRadius: 50,
              left: responsiveWidth(35),
              shadowRadius: 50,
              elevation: 2,
              marginTop: 10,
            }}
          >
            <TouchableOpacity>
              <FontAwesome5
                name="camera"
                color={"#f2f2f2"}
                size={17}
                style={{}}
              />
            </TouchableOpacity>
          </Animated.View>
        </View>

        <Animated.View
          entering={FadeInLeft.duration(500).damping()}
          style={{ left: responsiveWidth(17), bottom: 200 }}
        >
          <FontAwesome5
            name="check-circle"
            color={"green"}
            size={18}
            style={{ position: "absolute", left: -25, top: 50 }}
          />
          <Text
            style={{ fontWeight: "600", fontSize: 16, color: "#fff" }}
          ></Text>
          <Text
            style={{
              fontWeight: "600",
              fontSize: 14,
              color: "#fff",
              top: 70,
              position: "absolute",
              left: -20,
            }}
          >
            {calculateAge(Value?.profileId?.dateOfBirth)} yrs, 5'2" .
          </Text>
          <Text
            style={{
              fontWeight: "600",
              fontSize: 14,
              color: "#fff",
              top: 28,
              position: "absolute",
              left: 60,
            }}
          ></Text>
          <Text
            style={{
              fontWeight: "600",
              fontSize: 14,
              color: "#fff",
              top: 55,
              position: "absolute",
              left: -20,
            }}
          ></Text>
        </Animated.View>

        <View style={{ bottom: 90, marginBottom: 10 }}>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#fff",
              paddingBottom: 20,
              marginLeft: 15,
              marginRight: 15,
              paddingTop: 10,
              borderRadius: 10,
              shadowColor: "#000",
              shadowOffset: 0.9,
              shadowOpacity: 0.6,
              shadowRadius: 20,
              elevation: 2,
            }}
          >
            <Text
              style={{
                fontSize: 17,
                fontWeight: 500,
                right: responsiveWidth(26),
              }}
            >
              About
            </Text>
            <Text
              style={{
                marginLeft: 15,
                marginRight: 15,
                marginTop: 10,
                fontSize: responsiveFontSize(2),
              }}
            >
              {Value?.aboutMe}
            </Text>

            {show ? (
              <Text
                onPress={() => setShow(!show)}
                style={{
                  bottom: 130,
                  textAlign: "center",
                  top: 5,
                  left: -40,
                  color: "gray",
                }}
              >
                View less▲
              </Text>
            ) : (
              <Text
                onPress={() => setShow(!show)}
                style={{
                  bottom: 130,
                  textAlign: "center",
                  top: 5,
                  left: -40,
                  color: "gray",
                }}
              >
                View more▼
              </Text>
            )}
            {show ? (
              <Text
                style={{
                  marginLeft: 20,
                  marginRight: 20,
                  bottom: 17,
                  fontSize: responsiveFontSize(2),
                  marginTop: 20,
                }}
              >
                {Value?.moreAboutYourselfPartnerAndFamily}
              </Text>
            ) : null}
          </View>
        </View>

        <View style={{ bottom: 70 }}>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#fff",
              paddingBottom: 30,
              marginLeft: 15,
              marginRight: 15,
              paddingTop: 10,
              borderRadius: 10,
              shadowColor: "#000",
              shadowOffset: 0.9,
              shadowOpacity: 0.6,
              shadowRadius: 20,
              elevation: 2,
            }}
          >
            <Text
              style={{
                fontSize: 17,
                fontWeight: 500,
                right: responsiveWidth(25),
              }}
            >
              Basic Details
            </Text>

            <Text
              style={{
                marginTop: 10,
                fontSize: 14,
                borderWidth: 1,
                padding: 2,
                paddingHorizontal: 10,
                borderRadius: 20,
                left: -90,
                borderColor: "green",
              }}
            >
              Created by {Value?.profileCreatedBy}
            </Text>

            <Text
              style={{
                marginTop: 10,
                fontSize: 14,
                borderWidth: 1,
                padding: 2,
                paddingHorizontal: 10,
                borderRadius: 20,
                left: -105,

                borderColor: "green",
              }}
            >
              {calculateAge(Value?.profileId.dateOfBirth)} yrs old
            </Text>

            <Text
              style={{
                fontSize: 14,
                borderWidth: 1,
                padding: 2,
                paddingHorizontal: 10,
                borderRadius: 20,

                borderColor: "green",
                bottom: 25,
                left: 20,
              }}
            >
              {Value?.height} Height
            </Text>

            <View style={{ flexDirection: "row", right: 100 }}>
              <View
                style={{
                  backgroundColor: "#fff",
                  padding: 5,
                  borderRadius: 20,
                  shadowColor: "#000",
                  shadowOffset: 0.9,
                  shadowOpacity: 0.6,
                  shadowRadius: 20,
                  elevation: 2,
                  paddingHorizontal: 10,
                  paddingVertical: 9,
                }}
              >
                <FontAwesome5 name="calendar-week" size={17} color={"green"} />
              </View>
              <Text style={{ fontSize: 13, left: 10 }}>Birth Date</Text>
              <Text
                style={{
                  fontSize: 15,
                  left: 45,
                  position: "absolute",
                  top: 15,
                }}
              >
                {limets(Value?.profileId.dateOfBirth)}
              </Text>
            </View>

            <View style={{ flexDirection: "row", right: 90, marginTop: 20 }}>
              <View
                style={{
                  backgroundColor: "#fff",
                  padding: 5,
                  borderRadius: 20,
                  shadowColor: "#000",
                  shadowOffset: 0.9,
                  shadowOpacity: 0.6,
                  shadowRadius: 20,
                  elevation: 2,
                  paddingHorizontal: 10,
                  paddingVertical: 9,
                }}
              >
                <FontAwesome5 name="user" size={17} color={"green"} />
              </View>
              <Text style={{ fontSize: 13, left: 10 }}>Marital Status</Text>
              <Text
                style={{
                  fontSize: 15,
                  left: 45,
                  position: "absolute",
                  top: 15,
                }}
              >
                {Value?.profileId.maritalStatus}
              </Text>
            </View>

            <View style={{ flexDirection: "row", right: 106, marginTop: 20 }}>
              <View
                style={{
                  backgroundColor: "#fff",
                  padding: 5,
                  borderRadius: 20,
                  shadowColor: "#000",
                  shadowOffset: 0.9,
                  shadowOpacity: 0.6,
                  shadowRadius: 20,
                  elevation: 2,
                  paddingHorizontal: 11,
                  paddingVertical: 9,
                }}
              >
                <FontAwesome5 name="map-marker" size={17} color={"green"} />
              </View>
              <Text style={{ fontSize: 13, left: 10 }}>Lives in</Text>
              <Text
                style={{
                  fontSize: 15,
                  left: 45,
                  position: "absolute",
                  top: 15,
                }}
              >
                {Value?.profileId.address?.country}
              </Text>
            </View>

            <View style={{ flexDirection: "row", right: 55, marginTop: 20 }}>
              <View
                style={{
                  backgroundColor: "#fff",
                  padding: 5,
                  borderRadius: 20,
                  shadowColor: "#000",
                  shadowOffset: 0.9,
                  shadowOpacity: 0.6,
                  shadowRadius: 20,
                  elevation: 2,
                  paddingHorizontal: 10,
                  paddingVertical: 9,
                }}
              >
                <FontAwesome5 name="book" size={17} color={"green"} />
              </View>
              <Text style={{ fontSize: 13, left: 10 }}>
                Religion & Mother Tongue
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  left: 45,
                  position: "absolute",
                  top: 15,
                }}
              >
                {Value?.religiousBackground?.religion},
                {Value?.religiousBackground?.motherTongue}
              </Text>
            </View>

            <View style={{ flexDirection: "row", right: 93, marginTop: 20 }}>
              <View
                style={{
                  backgroundColor: "#fff",
                  padding: 5,
                  borderRadius: 20,
                  shadowColor: "#000",
                  shadowOffset: 0.9,
                  shadowOpacity: 0.6,
                  shadowRadius: 20,
                  elevation: 2,
                  paddingHorizontal: 7,
                  paddingVertical: 9,
                }}
              >
                <FontAwesome5 name="users" size={17} color={"green"} />
              </View>
              <Text style={{ fontSize: 13, left: 10 }}>Community</Text>
              <Text
                style={{
                  fontSize: 15,
                  left: 45,
                  position: "absolute",
                  top: 15,
                }}
              >
                {Value?.religiousBackground?.community}
              </Text>
            </View>

            <View style={{ flexDirection: "row", right: 80, marginTop: 20 }}>
              <View
                style={{
                  backgroundColor: "#fff",
                  padding: 5,
                  borderRadius: 20,
                  shadowColor: "#000",
                  shadowOffset: 0.9,
                  shadowOpacity: 0.6,
                  shadowRadius: 20,
                  elevation: 2,
                  paddingHorizontal: 11,
                  paddingVertical: 9,
                }}
              >
                <FontAwesome5 name="utensils" size={17} color={"green"} />
              </View>
              <Text style={{ fontSize: 13, left: 10 }}>Diet Preferences</Text>
              <Text
                style={{
                  fontSize: 15,
                  left: 45,
                  position: "absolute",
                  top: 15,
                }}
              >
                Vegetarian
              </Text>
            </View>
          </View>
        </View>

        <View style={{ bottom: 55 }}>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#fff",
              paddingBottom: 30,
              marginLeft: 15,
              marginRight: 15,
              paddingTop: 10,
              borderRadius: 10,
              shadowColor: "#000",
              shadowOffset: 0.9,
              shadowOpacity: 0.6,
              shadowRadius: 20,
              elevation: 2,
            }}
          >
            <Text
              style={{
                fontSize: 17,
                fontWeight: 500,
                right: responsiveWidth(25),
              }}
            >
              Contact Details
            </Text>

            <View style={{ flexDirection: "row", right: 90, top: 10 }}>
              <FontAwesome5
                name="phone-volume"
                size={17}
                color={"red"}
                style={{
                  backgroundColor: "#fff",
                  padding: 5,
                  borderRadius: 20,
                  shadowColor: "#000",

                  shadowRadius: 20,
                  elevation: 2,
                  paddingHorizontal: 12,
                  right: 37,
                  paddingVertical: 9,
                }}
              />
            </View>

            <View style={{ top: 100, right: 100 }}>
              <Text
                style={{
                  fontSize: 13,

                  position: "absolute",
                  bottom: 110,
                }}
              >
                Contact No:
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  position: "absolute",
                  bottom: 90,
                }}
              >
                {friends.includes(id) ? Value?.userId?.phone : "*********"}
              </Text>
            </View>
          </View>
        </View>

        <View style={{ bottom: 40 }}>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#fff",
              paddingBottom: 30,
              marginLeft: 15,
              marginRight: 15,
              paddingTop: 10,
              borderRadius: 10,
              shadowColor: "#000",
              shadowOffset: 0.9,
              shadowOpacity: 0.6,
              shadowRadius: 20,
              elevation: 2,
            }}
          >
            <Text
              style={{
                fontSize: 17,
                fontWeight: 500,
                right: responsiveWidth(25),
              }}
            >
              Family Details
            </Text>

            <Text style={{ marginLeft: 20, marginRight: 20 }}>
              Number of Siblings: {Value?.family?.numberOfSiblings}, Father's
              Status: {Value?.family?.fatherStatus}, Living with:{" "}
              {Value?.family.with}, Father's Profession: {Value?.family?.as},
              Nature of Business: {Value?.family?.natureOfBusiness}, Mother's
              Status: {Value?.family?.motherStatus}, Family Location:{" "}
              {Value?.family?.familyLocation}, Family Type:{" "}
              {Value?.family?.familyType}, Family Values:{" "}
              {Value?.family?.familyValues}, Family Affluence:{" "}
              {Value?.family?.familyAffluence}.
            </Text>
          </View>
        </View>

        <View style={{ bottom: 25 }}>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#fff",
              paddingBottom: 30,
              marginLeft: 15,
              marginRight: 15,
              paddingTop: 10,
              borderRadius: 10,
              shadowColor: "#000",
              shadowOffset: 0.9,
              shadowOpacity: 0.6,
              shadowRadius: 20,
              elevation: 2,
            }}
          >
            <Text
              style={{
                fontSize: 17,
                fontWeight: 500,
                right: responsiveWidth(20),
              }}
            >
              Career & Education
            </Text>

            <View style={{ flexDirection: "row", right: 100, marginTop: 10 }}>
              <View
                style={{
                  backgroundColor: "#fff",
                  padding: 5,
                  borderRadius: 20,
                  shadowColor: "#000",
                  shadowOffset: 0.9,
                  shadowOpacity: 0.6,
                  shadowRadius: 20,
                  elevation: 2,
                  paddingHorizontal: 9,
                  paddingVertical: 9,
                }}
              >
                <FontAwesome5 name="briefcase" size={17} color={"orange"} />
              </View>
              <Text style={{ fontSize: 13, left: 10 }}>Profession</Text>
              <Text
                style={{
                  fontSize: 15,
                  left: 45,
                  position: "absolute",
                  top: 15,
                }}
              >
                {Value?.partnerPreferences?.profession}
              </Text>
            </View>

            <View style={{ flexDirection: "row", right: 85, marginTop: 20 }}>
              <View
                style={{
                  backgroundColor: "#fff",
                  padding: 5,
                  borderRadius: 20,
                  shadowColor: "#000",
                  shadowOffset: 0.9,
                  shadowOpacity: 0.6,
                  shadowRadius: 20,
                  elevation: 2,
                  paddingHorizontal: 10,
                  paddingVertical: 9,
                }}
              >
                <FontAwesome5 name="building" size={17} color={"orange"} />
              </View>
              <Text style={{ fontSize: 13, left: 10 }}>Company Name</Text>
              <Text
                style={{
                  fontSize: 15,
                  left: 45,
                  position: "absolute",
                  top: 15,
                }}
              >
                {Value?.educationAndCareer?.workingWith}
              </Text>
            </View>

            <View style={{ flexDirection: "row", right: 90, marginTop: 20 }}>
              <View
                style={{
                  backgroundColor: "#fff",
                  padding: 5,
                  borderRadius: 20,
                  shadowColor: "#000",
                  shadowOffset: 0.9,
                  shadowOpacity: 0.6,
                  shadowRadius: 20,
                  elevation: 2,
                  paddingHorizontal: 10,
                  paddingVertical: 9,
                }}
              >
                <FontAwesome5 name="wallet" size={17} color={"orange"} />
              </View>
              <Text style={{ fontSize: 13, left: 10 }}>Annual Income</Text>
              <Text
                style={{
                  fontSize: 15,
                  left: 45,
                  position: "absolute",
                  top: 15,
                }}
              >
                {Value?.partnerPreferences?.maxIncome},LPA
              </Text>
            </View>

            <View style={{ flexDirection: "row", right: 73, marginTop: 20 }}>
              <View
                style={{
                  backgroundColor: "#fff",
                  padding: 5,
                  borderRadius: 20,
                  shadowColor: "#000",
                  shadowOffset: 0.9,
                  shadowOpacity: 0.6,
                  shadowRadius: 20,
                  elevation: 2,
                  paddingHorizontal: 10,
                  paddingVertical: 9,
                }}
              >
                <FontAwesome5 name="user-graduate" size={17} color={"orange"} />
              </View>
              <Text style={{ fontSize: 13, left: 10 }}>
                Highest Qualification
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  left: 45,
                  position: "absolute",
                  top: 15,
                }}
              >
                {Value?.educationAndCareer?.highestQualification}
              </Text>
            </View>

            <View style={{ flexDirection: "row", right: 87, marginTop: 20 }}>
              <View
                style={{
                  backgroundColor: "#fff",
                  padding: 5,
                  borderRadius: 20,
                  shadowColor: "#000",
                  shadowOffset: 0.9,
                  shadowOpacity: 0.6,
                  shadowRadius: 20,
                  elevation: 2,
                  paddingHorizontal: 10,
                  paddingVertical: 9,
                }}
              >
                <FontAwesome5 name="book" size={17} color={"orange"} />
              </View>
              <Text style={{ fontSize: 13, left: 10 }}>Education Field</Text>
              <Text
                style={{
                  fontSize: 15,
                  left: 45,
                  position: "absolute",
                  top: 15,
                }}
              >
                Finance / Commerce
              </Text>
            </View>

            <View style={{ flexDirection: "row", right: 90, marginTop: 20 }}>
              <View
                style={{
                  backgroundColor: "#fff",
                  padding: 5,
                  borderRadius: 20,
                  shadowColor: "#000",
                  shadowOffset: 0.9,
                  shadowOpacity: 0.6,
                  shadowRadius: 20,
                  elevation: 2,
                  paddingHorizontal: 10,
                  paddingVertical: 9,
                }}
              >
                <FontAwesome5 name="university" size={17} color={"orange"} />
              </View>
              <Text style={{ fontSize: 13, left: 10 }}>College Name</Text>
              <Text
                style={{
                  fontSize: 15,
                  left: 48,
                  position: "absolute",
                  top: 15,
                }}
              >
                {Value?.educationAndCareer?.collegeAttended}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View
        style={{ paddingBottom: 17, elevation: 3, backgroundColor: "#fff" }}
      >
        {filteredData.length === 0 ? (
          <TouchableOpacity style={styles.loginBtn} onPress={RequestApi}>
            <Text style={{ color: "tomato", fontSize: 18, fontWeight: "500" }}>
              Send Request
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.loginBtn1}>
            <Text style={{ color: "#f2f2f2", fontSize: 18, fontWeight: "500" }}>
              Send Request
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </>
  );
};

export default MatrimonyData;

const styles = StyleSheet.create({
  loginBtn: {
    width: "88%",
    borderRadius: 5,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 50,
    borderWidth: 1,
    alignSelf: "center",
    top: 7,
    borderColor: "tomato",
  },
  loginBtn1: {
    width: "88%",
    borderRadius: 5,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 50,
    borderWidth: 1,
    alignSelf: "center",
    top: 7,
    borderColor: "#f2f2f2",
  },
});
