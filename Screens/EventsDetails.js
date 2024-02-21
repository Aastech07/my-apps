import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { ChevronLeftIcon } from "react-native-heroicons/outline";

import Animated, { FadeInLeft, FadeInDown } from "react-native-reanimated";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { StatusBar } from "react-native";
import HTML from "react-native-render-html";
const EventsDetails = () => {
  const navigation = useNavigation();
  const Data = useRoute();
  const Value = Data.params.data;

 
  const handleNavigateBack = () => {
    navigation.goBack("EventsDetails");
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#fff" }}>
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
          source={{ uri: Value.image }}
          style={{ width: "98%", height: 400, borderRadius: 10 }}
        />
        <Animated.View
          entering={FadeInLeft.duration(500).damping()}
          style={{
            backgroundColor: "#fff",
            right: 140,
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
            <ChevronLeftIcon size={27} strokeWidth={4.5} color={"red"} />
          </TouchableOpacity>
        </Animated.View>
      </View>

      <Animated.View
        entering={FadeInLeft.duration(500).damping()}
        style={{ bottom: 70 }}
      >
        <Text
          style={{ fontWeight: "400", fontSize: 20, color: "#fff", left: 20 }}
        >
          {Value.title}
        </Text>
      </Animated.View>
      <View style={{ borderBottomWidth: 1, opacity: 0.4 }}></View>
      <View style={{ padding: 10 }}>
        <Animated.Text
          entering={FadeInDown.duration(500).damping()}
          style={{
            fontWeight: "300",
            marginBottom: 10,
            fontSize: 17,
            bottom: 50,
          }}
        >
          {Value.category}
        </Animated.Text>

        <Animated.View
          entering={FadeInLeft.duration(500).damping()}
          style={{ bottom: 40 }}
        >
          <Text style={{ fontSize: 20, fontWeight: "500", top: 10 }}>
            Instructions:
          </Text>
          <HTML
            source={{ html: Value.description }}
            contentWidth={100}
            style={{
              fontSize: 17,
              padding: 10,
            }}
          />
        </Animated.View>
        <View style={{ borderBottomWidth: 1, opacity: 0.4, bottom: 40 }}></View>
        <Animated.View
          entering={FadeInLeft.duration(500).damping()}
          style={{ bottom: 30 }}
        >
          <Text
            style={{
              fontSize: 17,

              marginBottom: 5,
              fontWeight: "bold",
            }}
          >
            Other Detalis:
          </Text>
          <View style={{ top: 10 }}>
            <View
              style={{
                backgroundColor: "#fff",
                position: "absolute",
                borderRadius: 10,
                paddingHorizontal: 20,
                paddingVertical: 10,
                shadowColor: "#fff",
                shadowOffset: 0.9,
                shadowOpacity: 0.9,
                shadowRadius: 50,
                elevation: 50,
              }}
            >
              <FontAwesome5
                name="map-marked-alt"
                style={{}}
                size={20}
                color={"gray"}
              />
            </View>
            <Text
              style={{
                fontSize: 20,
                top: 10,
                opacity: 0.5,
                left: 80,
                fontWeight: "400",
              }}
            >
              {Value.address}
            </Text>
          </View>
          <View style={{ paddingBottom: 50, top: 40 }}>
            <View
              style={{
                backgroundColor: "#fff",
                position: "absolute",
                borderRadius: 10,
                paddingHorizontal: 20,
                paddingVertical: 10,
                shadowColor: "#fff",
                shadowOffset: 0.9,
                shadowOpacity: 0.9,
                shadowRadius: 50,
                elevation: 50,
              }}
            >
              <FontAwesome5
                name="calendar-alt"
                style={{}}
                size={20}
                color={"gray"}
              />
            </View>
            <Text
              style={{
                fontSize: 18,
                left: 80,
                top: 9,
                fontWeight: "500",
                opacity: 0.5,
              }}
            >
              {Value.date}
            </Text>
          </View>
        </Animated.View>
      </View>
    </ScrollView>
  );
};

export default EventsDetails;
