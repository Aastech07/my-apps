import React from "react";
import { ScrollView, View, TouchableOpacity, Text, Image } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import { responsiveWidth } from "react-native-responsive-dimensions";

const Viewdata = () => {
  const navigation = useNavigation();
  const Data = useRoute();
  const Value = Data.params.data;

  const images =
    "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg";

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#fff" }}
      contentContainerStyle={{ paddingBottom: 420 }}
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

        <View
          style={{ top: 65, left: responsiveWidth(80), position: "absolute" }}
        >
          <TouchableOpacity
            style={{}}
            onPress={() => navigation.navigate("Chats")}
          >
            <FontAwesome5Icon
              name="comment"
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

          <View
            style={{ position: "absolute", left: responsiveWidth(66), top: 10 }}
          >
            <Image
              source={{ uri: images }}
              style={{ height: 50, width: 50, borderRadius: 50 }}
            />
            <FontAwesome5Icon
              name="mars"
              size={14}
              style={{ bottom: 55, opacity: 0.7, left: 30 }}
            />
            <Text
              style={{
                right: 30,
                fontSize: 12,
                bottom: 10,
                opacity: 0.4,
                fontWeight: "600",
              }}
            >
              Last active today
            </Text>
          </View>
        </View>

        <View style={{ top: 100, right: 145 }}>
          <Text style={{ position: "absolute" }}>
            {Value.skills[0]} | {Value.skills[1]} | {Value.skills[2]}
          </Text>
        </View>

        <View style={{ top: 120, right: 10, marginTop: 40 }}>
          <Text style={{ position: "absolute", right: -100 }}>
            Actively applying - 2 weeks notice period
          </Text>

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
        <View style={{ position: "absolute", left: 30, top: 320 }}>
          <FontAwesome5Icon
            name="briefcase"
            style={{ position: "absolute", top: 1, opacity: 0.3 }}
            size={15}
          />
          <Text style={{ left: 20, opacity: 0.8 }}>5 Years</Text>
        </View>

        <View style={{ position: "absolute", left: 120, top: 320 }}>
          <FontAwesome5Icon
            name="graduation-cap"
            style={{ position: "absolute", top: 1, opacity: 0.3 }}
            size={15}
          />
          <Text style={{ left: 20, opacity: 0.8 }}>B.B.A/B.M.S</Text>
        </View>

        <View style={{ position: "absolute", left: 230, top: 320 }}>
          <FontAwesome5Icon
            name="birthday-cake"
            style={{ position: "absolute", top: 1, opacity: 0.3 }}
            size={15}
          />
          <Text style={{ left: 20, opacity: 0.8 }}>B.B.A/B.M.S</Text>
        </View>

        <View
          style={{
            top: 230,
            alignItems: "center",
            justifyContent: "center",
            marginTop: 20,
          }}
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
        </View>

        <View
          style={{
            borderWidth: 0.5,
            paddingHorizontal: 170,
            top: 250,
            opacity: 0.4,
          }}
        ></View>
        <View style={{ top: 260, right: 100 }}>
          <Text style={{ fontSize: 17 }}>Job Preference</Text>
          <Text style={{ left: 4, fontWeight: "500", top: 10 }}>
            Photography
          </Text>
          <Text
            style={{
              left: 200,
              fontWeight: "500",
              top: 35,
              position: "absolute",
            }}
          >
            Rs 3 - 4 LPA
          </Text>
          <Text style={{ top: 10, left: 5, fontWeight: "300" }}>
            any industry
          </Text>
          <Text style={{ top: 10, left: 5, fontWeight: "300" }}>
            Mumbai, MH
          </Text>
        </View>
        <View
          style={{
            borderWidth: 0.5,
            paddingHorizontal: 170,
            top: 280,
            opacity: 0.4,
          }}
        ></View>

        <View style={{ top: 300, right: 100 }}>
          <Text style={{ fontSize: 17, right: 10 }}>Experience</Text>
          <Text style={{ fontWeight: "500", top: 10, right: 10 }}>
            Angel Finance
          </Text>
          <Text
            style={{
              left: 160,
              fontWeight: "300",
              top: 35,
              position: "absolute",
            }}
          >
            Dec 2020 - Present
          </Text>
          <Text style={{ top: 20, fontWeight: "300", right: 10 }}>
            Video editor
          </Text>
        </View>

        <View
          style={{
            borderWidth: 0.5,
            paddingHorizontal: 170,
            top: 330,
            opacity: 0.4,
          }}
        ></View>

        <View style={{ top: 350, right: 50 }}>
          <Text style={{ fontSize: 17, right: 10 }}>Education</Text>
          <Text style={{ fontWeight: "500", top: 10, right: 10 }}>
            KK Parekh Commerce College
          </Text>
          <Text
            style={{
              left: 190,
              fontWeight: "300",
              top: 35,
              position: "absolute",
            }}
          >
            Dec 2020 - Present
          </Text>
          <Text
            style={{
              top: 60,
              fontWeight: "500",
              position: "absolute",
              left: -10,
              opacity: 0.4,
            }}
          >
            Graducation/Diploma - B.B.A/B.M.S - Management
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default Viewdata;
