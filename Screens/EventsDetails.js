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
import { BookmarkIcon } from "react-native-heroicons/mini";
import Animated, {
  FadeInRight,
  FadeInLeft,
  FadeInDown,
} from "react-native-reanimated";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

import { StatusBar } from "react-native";

const EventsDetails = () => {
  const navigation = useNavigation();
  const Data = useRoute();
  const Value = Data.params.data;
  const Id = Value.idMeal;

  const showToast = () => {
    ToastAndroid.show("Saved ", ToastAndroid.SHORT);
  };

  const [isFavourite, setIsFavourite] = useState(false);

  const handleNavigateBack = () => {
    navigation.goBack("EventsDetails");
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
          source={{ uri: Value.image }}
          style={{ width: "98%", height: 400, borderRadius: 30 }}
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

        <Animated.View
          entering={FadeInRight.duration(500).damping()}
          style={{
            backgroundColor: "#fff",
            bottom: 390,
            padding: 5,
            borderRadius: 50,
            shadowColor: "black",
            shadowOpacity: 0.9,
            left: 130,
            shadowRadius: 50,
            elevation: 6,
          }}
        >
          <TouchableOpacity
            onPress={() => setIsFavourite(!isFavourite) + showToast()}
          >
            <BookmarkIcon
              size={27}
              strokeWidth={4.5}
              color={isFavourite ? "blue" : "red"}
            />
          </TouchableOpacity>
        </Animated.View>
      </View>

      <Animated.View
        entering={FadeInLeft.duration(500).damping()}
        style={{ left: 15, bottom: 55 }}
      >
        <Text style={{ fontWeight: "600", fontSize: 20 }}>{Value.title}</Text>
      </Animated.View>

      <View style={{ padding: 10 }}>
        <Animated.Text
          entering={FadeInDown.duration(500).damping()}
          style={{
            textAlign: "center",
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
          <Text style={{ left: 20, fontSize: 20, fontWeight: "500", top: 10 }}>
            Instructions:
          </Text>
          <Text
            style={{
              fontSize: 16,
              marginLeft: 10,
              marginRight: 10,
              padding: 10,
            }}
          >
            {Value.description}
          </Text>
        </Animated.View>

        <Animated.View
          entering={FadeInLeft.duration(500).damping()}
          style={{ bottom: 30 }}
        >
          <Text
            style={{
              fontSize: 17,
              marginLeft: 20,
              marginBottom: 5,
              fontWeight: "bold",
            }}
          >
            Other Detalis:
          </Text>
          <View style={{ left: 15 }}>
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
            <Text style={{ fontSize: 15, top: 50, opacity: 0.5 }}>
              {Value.address}
            </Text>
          </View>
          <View style={{ left: 12, paddingBottom: 50, top: 60 }}>
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
