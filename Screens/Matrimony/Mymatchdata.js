import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
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
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import * as Sharing from "expo-sharing";
const Mymatchdata = () => {
  const navigation = useNavigation();
  const Data = useRoute();
  const Value = Data.params.data;
  const [show, setShow] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      const value = Value.somePropertyThatMightNotExist;
      console.log("Value:", value);
    } catch (error) {
      handleError(error);
    }
  }, []);

  const handleError = (error) => {
    console.error("Error:", error);
    setError(error);
  };

  const handleNavigateBack = () => {
    navigation.goBack("EventsDetails");
  };

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

  return (
    <ScrollView style={{ flex: 1 }}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <View
        style={{ alignItems: "center", justifyContent: "center", marginTop: 5 }}
      >
        <Animated.Image
          entering={FadeInDown.duration(500).damping()}
          source={{ uri: Value.images[0] }}
          style={{ width: "98%", height: 410, borderRadius: 20 }}
        />
        <Animated.View
          entering={FadeInLeft.duration(500).damping()}
          style={{
            backgroundColor: "#000000",
            right: responsiveWidth(39),
            bottom: 360,
            padding: 5,
            borderRadius: 50,
            shadowColor: "black",
            shadowOpacity: 0.9,
            shadowRadius: 50,
            elevation: 6,
          }}
        >
          <TouchableOpacity onPress={() => handleNavigateBack()}>
            <ChevronLeftIcon size={27} strokeWidth={4.5} color={"#fff"} />
          </TouchableOpacity>
        </Animated.View>

        <Animated.View
          entering={FadeInRight.duration(500).damping()}
          style={{
            bottom: 400,
            padding: 5,
            borderRadius: 50,
            shadowColor: "black",
            shadowOpacity: 0.9,
            left: responsiveWidth(35),
            shadowRadius: 50,
            elevation: 6,
            marginTop: 10,
          }}
        >
          <TouchableOpacity>
            <FontAwesome5 name="camera" color={"#fff"} size={17} style={{}} />
          </TouchableOpacity>
        </Animated.View>

        <Animated.View
          entering={FadeInRight.duration(500).damping()}
          style={{
            bottom: 390,
            padding: 5,
            borderRadius: 50,
            shadowColor: "black",
            shadowOpacity: 0.9,
            left: responsiveWidth(33),
            shadowRadius: 50,
            elevation: 6,
          }}
        >
          <TouchableOpacity>
            <Text style={{ color: "#fff", fontSize: 25, position: "absolute" }}>
              ...
            </Text>
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
          style={{ position: "absolute", left: -25, top: 3 }}
        />
        <Text style={{ fontWeight: "600", fontSize: 16, color: "#fff" }}>
       
        </Text>
        <Text
          style={{
            fontWeight: "600",
            fontSize: 14,
            color: "#fff",
            top: 29,
            position: "absolute",
            left: -20,
          }}
        >
           yrs, 5'2" .
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
        >
          {Value.locationOfGroom && Value.locationOfGroom.countryLivingIn
            ? `${Value.locationOfGroom.countryLivingIn},`
            : null}
          {Value.locationOfGroom && Value.locationOfGroom.cityLivingIn
            ? `${Value.locationOfGroom.cityLivingIn},`
            : null}
          {Value.locationOfGroom && Value.locationOfGroom.stateLivingIn
            ? `${Value.locationOfGroom.stateLivingIn}`
            : null}
        </Text>
      </Animated.View>

      <View style={{ bottom: 100 }}>
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
            About Aneri S
          </Text>
          <Text
            style={{
              marginLeft: 15,
              marginRight: 15,
              marginTop: 10,
              fontSize: responsiveFontSize(2),
            }}
          >
            {Value.aboutMe}
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
              {Value.moreAboutYourselfPartnerAndFamily}
            </Text>
          ) : null}
        </View>
      </View>
      <View style={{ bottom: 85 }}>
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
              right: responsiveWidth(20),
            }}
          >
            Hobbies & Interest
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
            }}
          >
            📷 Photography
          </Text>
          <Text
            style={{
              marginTop: 10,
              fontSize: 14,
              borderWidth: 1,
              padding: 2,
              paddingHorizontal: 10,
              borderRadius: 20,
              position: "absolute",
              bottom: 86,
              right: 80,
            }}
          >
            🎨 Painting
          </Text>
          <Text
            style={{
              marginTop: 10,
              fontSize: 14,
              borderWidth: 1,
              padding: 2,
              paddingHorizontal: 10,
              borderRadius: 20,
              left: -115,
            }}
          >
            ♫ Music
          </Text>

          <Text
            style={{
              marginTop: 10,
              fontSize: 14,
              borderWidth: 1,
              padding: 2,
              paddingHorizontal: 10,
              borderRadius: 20,
              position: "absolute",
              bottom: 50,
            }}
          >
            🧳 {Value.hobbies}
          </Text>

          <Text
            style={{
              marginTop: 10,
              fontSize: 14,
              borderWidth: 1,
              padding: 2,
              paddingHorizontal: 10,
              borderRadius: 20,
              left: -110,
            }}
          >
            🍽️ Foodie
          </Text>
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
            Created by Self
          </Text>
          <Text
            style={{
              marginTop: 10,
              fontSize: 14,
              borderWidth: 1,
              padding: 2,
              paddingHorizontal: 10,
              borderRadius: 20,

              bottom: 35,
              right: -70,
              borderColor: "green",
            }}
          >
            ID: SH53938570 📑
          </Text>
          <Text
            style={{
              marginTop: 10,
              fontSize: 14,
              borderWidth: 1,
              padding: 2,
              paddingHorizontal: 10,
              borderRadius: 20,
              left: -110,
              bottom: 31,
              borderColor: "green",
            }}
          >
           yrs old
          </Text>

          <Text
            style={{
              marginTop: 10,
              fontSize: 14,
              borderWidth: 1,
              padding: 2,
              paddingHorizontal: 10,
              borderRadius: 20,
              position: "absolute",
              top: 70,
              borderColor: "green",
            }}
          >
            Height - 5'2"
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
              style={{ fontSize: 15, left: 45, position: "absolute", top: 15 }}
            >
              
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
              style={{ fontSize: 15, left: 45, position: "absolute", top: 15 }}
            >
              {Value.maritalStatus}
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
              style={{ fontSize: 15, left: 45, position: "absolute", top: 15 }}
            >
              {Value.locationOfGroom && Value.locationOfGroom.countryLivingIn
                ? `${Value.locationOfGroom.countryLivingIn},`
                : null}
              {Value.locationOfGroom && Value.locationOfGroom.cityLivingIn
                ? `${Value.locationOfGroom.cityLivingIn},`
                : null}
              {Value.locationOfGroom && Value.locationOfGroom.stateLivingIn
                ? `${Value.locationOfGroom.stateLivingIn}`
                : null}
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
              style={{ fontSize: 15, left: 45, position: "absolute", top: 15 }}
            >
              {Value.religiousBackground.religion},
              {Value.religiousBackground.motherTongue}
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
              style={{ fontSize: 15, left: 45, position: "absolute", top: 15 }}
            >
              {Value.religiousBackground.community}
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
              style={{ fontSize: 15, left: 45, position: "absolute", top: 15 }}
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
          <Text
            style={{
              fontSize: 13,
              left: responsiveWidth(22),
              position: "absolute",
              bottom: 110,
            }}
          >
            Contact No.
          </Text>
          <Text
            style={{
              fontSize: 15,
              left: responsiveWidth(22),
              position: "absolute",
              bottom: 90,
            }}
          >
            {/*Value.userId.phone*/}
          </Text>

          <View style={{ flexDirection: "row", right: 90, marginTop: 35 }}>
            <FontAwesome5
              name="envelope"
              size={17}
              color={"red"}
              style={{
                backgroundColor: "#fff",
                padding: 5,
                borderRadius: 20,
                shadowColor: "#000",

                shadowRadius: 20,
                elevation: 2,
                paddingHorizontal: 10,
                right: 37,
                paddingVertical: 9,
              }}
            />
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
            NumberOfSiblin: {Value.family.numberOfSiblings}, fatherStatus:{" "}
            {Value.family.fatherStatus},with {Value.family.with}, as{" "}
            {Value.family.as}, natureOfBusiness: {Value.family.natureOfBusiness}
            , motherStatus:{Value.family.motherStatus}, familyLocation:
            {Value.family.familyLocation}, familyType:{Value.family.familyType},
            familyValues:{Value.family.familyValues}, familyAffluence:
            {Value.family.familyAffluence}.
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
              right: responsiveWidth(25),
            }}
          >
            Basic Details
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
              style={{ fontSize: 15, left: 45, position: "absolute", top: 15 }}
            >
              {Value.partnerPreferences.profession}
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
              style={{ fontSize: 15, left: 45, position: "absolute", top: 15 }}
            >
              {Value.educationAndCareer.workingWith}
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
              style={{ fontSize: 15, left: 45, position: "absolute", top: 15 }}
            >
              {Value.educationAndCareer.annualIncome}
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
              style={{ fontSize: 15, left: 45, position: "absolute", top: 15 }}
            >
              {Value.educationAndCareer.highestQualification}
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
              style={{ fontSize: 15, left: 45, position: "absolute", top: 15 }}
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
              style={{ fontSize: 15, left: 48, position: "absolute", top: 15 }}
            >
              {Value.educationAndCareer.collegeAttended}
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Mymatchdata;
