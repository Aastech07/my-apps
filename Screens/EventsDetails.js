import React from "react";
import { View, Text, ScrollView, TouchableOpacity, Linking } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import HTML from "react-native-render-html";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { StatusBar } from "react-native";
import Animated, { FadeInLeft, FadeInDown } from "react-native-reanimated";

const EventsDetails = () => {
  const navigation = useNavigation();
  const Data = useRoute();
  const Value = Data.params.data;

  const handleNavigateBack = () => {
    navigation.goBack("EventsDetails");
  };

  const openMaps = () => {
    const address = Value.address.replace(/\s/g, "+");
    const url = `https://www.google.com/maps/search/?api=1&query=${address}`;
    Linking.openURL(url);
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#fff" }}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      <View style={{ alignItems: "center", justifyContent: "center", marginTop: 5 }}>
        <Animated.Image
          entering={FadeInDown.duration(500).damping()}
          source={{ uri: Value.image }}
          style={{ width: "98%", height: 400, borderRadius: 10 }}
        />
        <Animated.View
          entering={FadeInLeft.duration(500).damping()}
          style={{
            backgroundColor: "#fff",
            position: "absolute",
            top: 20,
            left: 20,
            padding: 5,
            borderRadius: 50,
            shadowColor: "black",
            shadowOpacity: 0.5,
            shadowRadius: 5,
            elevation: 5,
          }}
        >
          <TouchableOpacity onPress={() => handleNavigateBack()}>
            <ChevronLeftIcon size={27} strokeWidth={4.5} color={"#874d3b"} />
          </TouchableOpacity>
        </Animated.View>
      </View>

      <View style={{ padding: 20 }}>
        <Animated.Text
          entering={FadeInDown.duration(500).damping()}
          style={{ fontWeight: "bold", fontSize: 26, marginBottom: 10, color: "#212529" }}
        >
          {Value.title}
        </Animated.Text>
        <View style={{ borderBottomWidth: 1, opacity: 0.4, marginBottom: 20, borderBottomColor: "#ced4da" }} />

        <Animated.Text
          entering={FadeInLeft.duration(500).damping()}
          style={{ fontWeight: "300", fontSize: 18, marginBottom: 10, color: "#495057" }}
        >
          {Value.category}
        </Animated.Text>

        <Animated.Text
          entering={FadeInLeft.duration(500).damping()}
          style={{ fontSize: 18, marginBottom: 20, color: "#495057" }}
        >
          Instructions:
        </Animated.Text>
        <HTML
          source={{ html: Value.description }}
          contentWidth={300}
          baseFontStyle={{ fontSize: 16, color: "#495057" }}
        />

        <View style={{ borderBottomWidth: 1, opacity: 0.4, marginBottom: 20, borderBottomColor: "#ced4da" }} />

        <Animated.View entering={FadeInLeft.duration(500).damping()}>
          <TouchableOpacity onPress={openMaps} style={{ flexDirection: "row", marginBottom: 20 }}>
            <View style={{ backgroundColor: "#874d3b", padding: 10, borderRadius: 10 }}>
              <FontAwesome5 name="map-marked-alt" size={20} color={"#fff"} />
            </View>
            <Text style={{ fontSize: 15, marginLeft: 10, color: "#007bff", }}>
              {Value.address}
            </Text>
          </TouchableOpacity>

          <View style={{ flexDirection: "row" }}>
            <View style={{ backgroundColor: "#874d3b", padding: 10, borderRadius: 10 }}>
              <FontAwesome5 name="calendar-alt" size={20} color={"#fff"} />
            </View>
            <Text style={{ fontSize: 18, marginLeft: 10, fontWeight: "500", color: "#495057" }}>
              {Value.date}
            </Text>
          </View>
        </Animated.View>
      </View>
    </ScrollView>
  );
};

export default EventsDetails;
