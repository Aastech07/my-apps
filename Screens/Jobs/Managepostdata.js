import React from "react";
import { ScrollView, View, TouchableOpacity, Text } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import { responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";

const Managepostdata = () => {
  const navigation = useNavigation();
  const Data = useRoute();
  const Value = Data.params.data;
  const Id = Value.idMeal;

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#fff" }}
      contentContainerStyle={{ paddingBottom:290 }}
    >
      <View style={{ alignContent: "center", alignItems: "center" }}>
        <View style={{ top: 60, right: responsiveWidth(40) }}>
          <TouchableOpacity style={{}} onPress={() => navigation.goBack("")}>
            <FontAwesome5Icon
              name="arrow-left"
              color={"#000"}
              size={30}
              style={{ opacity: 0.7 }}
            />
          </TouchableOpacity>
        </View>

        <View style={{ top: 65, left: responsiveWidth(80) ,position:"absolute"}}>
          <TouchableOpacity style={{}} onPress={() => navigation.navigate("EditPost", { data: Value })}>
            <FontAwesome5Icon
              name="edit"
              color={"red"}
              size={25}
              style={{ opacity: 0.7 }}
            />
          </TouchableOpacity>
        </View>


        <View style={{ top: 100, right: responsiveWidth(15) }}>
          <Text style={{ fontSize: 22, fontWeight: "bold" }}>
          {Value.title}
          </Text>
          <Text
            style={{
              fontSize: 17,
              fontWeight: "bold",
              position: "absolute",
              left: responsiveWidth(63),
              top: 7,
              color: "green",
            }}
          >
          RS. {Value.salary}
          </Text>
        </View>

        <View style={{ top: 120, right: 155 }}>
          <FontAwesome5Icon
            name="map-pin"
            color={"#000"}
            size={18}
            style={{ opacity: 0.7 }}
          />
          <Text style={{ position: "absolute", left: 18 }}>{Value.location}</Text>
        </View>

        <View style={{ top: 100, right: 20 }}>
          <FontAwesome5Icon
            name="briefcase"
            color={"#000"}
            size={18}
            style={{ opacity: 0.7 }}
          />
          <Text style={{ position: "absolute", left: 25 }}>{Value.experienceLevel}</Text>
        </View>

        <View style={{ top: 115, right: 150 }}>
          <FontAwesome5Icon
            name="graduation-cap"
            color={"#000"}
            size={17}
            style={{ opacity: 0.7 }}
          />
          <Text style={{ position: "absolute", left: 25 }}>
            {Value.educationLevel}
          </Text>
        </View>

        <View style={{ top: 140 }}>
          <Text style={{ fontSize: 18, right: 100, fontWeight: "bold" }}>
            Job Description
          </Text>
        </View>

        <View style={{ top: 120, right: 10 }}>
          <Text
            style={{
              top: 40,
              right: 60,
              backgroundColor: "#f2f2f2",
              paddingHorizontal: 10,
              borderRadius: 2,
              position: "absolute",
            }}
          >
            React native
          </Text>
          <Text
            style={{
              top: 40,
              backgroundColor: "#f2f2f2",
              paddingHorizontal: 10,
              borderRadius: 2,
              position: "absolute",
              right: -10,
            }}
          >
            Flutter
          </Text>
          <Text
            style={{
              top: 40,
              backgroundColor: "#f2f2f2",
              paddingHorizontal: 10,
              borderRadius: 2,
              position: "absolute",
              right: -170,
            }}
          >
            Mobile Web Engineer
          </Text>
          <Text
            style={{
              top: 70,
              backgroundColor: "#f2f2f2",
              paddingHorizontal: 10,
              borderRadius: 2,
              position: "absolute",
              left: -155,
            }}
          >
            {Value.skills}
          </Text>
        </View>

        <View
          style={{ top: 230, alignItems: "center", justifyContent: "center" }}
        >
          <Text style={{ marginLeft: 20, marginRight: 20, fontSize: 15 }}>
            {Value.description}If you are new to mobile development, the easiest
            way to get started is with Expo Go. Expo is a set of tools and
            services built around React Native and, while it has many features,
            the most relevant feature for us right now is that it can get you
            writing a React Native app within minutes. You will only need a
            recent version of Node.js and a phone or emulator. If you'd like to
            try out React Native directly in your web browser before installing
            any tools, you can try out Snack.
          </Text>

          <Text
            style={{
              right: 100,
              top: 10,
              fontSize: 15,
              fontWeight: "500",
              opacity: 0.6,
            }}
          >
            Responsibilities:
          </Text>

          <Text
            style={{ marginLeft: 20, marginRight: 20, fontSize: 15, top: 20 }}
          >
            {Value.responsibilities}If you are new to mobile development, the
            easiest way to get started is with Expo Go. Expo is a set of tools
            and services built around React Native and, while it has many
            features, the most relevant feature for us right now is that it can
            get you writing a React Native app within minutes. You will only
            need a recent version of Node.js and a phone or emulator. If you'd
            like to try out React Native directly in your web browser before
            installing any tools, you can try out Snack.
          </Text>
        </View>

        <View style={{ right: 120 }}>
          <View
            style={{
              top: 310,
              padding: 15,
              borderRadius: 50,
              paddingHorizontal: 17,
              backgroundColor: "green",
              shadowColor: "#000",
              shadowOffset: 0.9,
              shadowOpacity: 0.8,
              shadowRadius: 20,
              elevation: 2,
            }}
          >
            <FontAwesome5Icon name="building" size={20} color={"#fff"} />
          </View>
        </View>

        <View style={{ top: 200 }}>
          <Text style={{ left: responsiveWidth(28), top: 50,fontSize:20 }}>
            Integrate 360
          </Text>
          <Text
            style={{
              left: responsiveWidth(9),
              top: 50,
              marginLeft: 70,
              marginRight: 70,
            }}
          >
            No need for financing . 0-19 Employees People. Information
            Technology
          </Text>
        </View>



      </View>
    </ScrollView>
  );
};

export default Managepostdata;
