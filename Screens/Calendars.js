import React, { useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";
import {
  responsiveWidth,
} from "react-native-responsive-dimensions";
import FontAwesome5 from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome5";

LocaleConfig.locales["gu"] = {
  monthNames: [
    "જાન્યુઆરી",
    "ફેબ્રુઆરી",
    "કુચ",
    "એપ્રિલ ",
    "મે",
    "જૂન",
    "જુલાઈ",
    "ગસ્ટ",
    "સપ્ટેમ્બર",
    "ઓક્ટોબર",
    "નવેમ્બર ",
    "ડિસેમ્બર",
  ],
  monthNamesShort: [
    "જાન્યુઆરી",
    "ફેબ્રુઆરી",
    "કુચ",
    "એપ્રિલ ",
    "મે",
    "જૂન",
    "જુલાઈ",
    "ગસ્ટ",
    "સપ્ટેમ્બર",
    "ઓક્ટોબર",
    "નવેમ્બર ",
    "ડિસેમ્બર",
  ],
  dayNames: ["રવિવાર", "સોમવાર"],
  dayNamesShort: ["રવિ", "સોમ", "મંગ", "બુધ", "ગુરુ", "શુક્ર", "શનિ"],
  today: "આજ",
};

LocaleConfig.defaultLocale = "gu";

const festivals = {
  "2024-01-14": "ઉત્તરાયણ",
};
const currentYear = new Date().getFullYear().toString();
const Calendars = () => {
  const [selected, setSelected] = useState("");

  return (
    <ScrollView style={{}} contentContainerStyle={{ paddingBottom: 100 }}>
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
          name="message"
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
          Hi, Viraj
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
        ></Text>
      </View>

      <View style={{ top: 50, flex: 1 }}>
        <Calendar
          onDayPress={(day) => {
            setSelected(day.dateString);
            console.warn(day);
          }}
          markedDates={{
            [selected]: {
              selected: true,
              disableTouchEvent: true,
              selectedDotColor: "orange",
            },
            ...festivals,
          }}
          style={{
            marginLeft: 10,
            marginRight: 10,
            marginBottom: 100,
            backgroundColor: "#ffff",
          }}
          minDate={currentYear}
        />
        {festivals[selected] && <Text>{festivals[selected]}</Text>}
      </View>
    </ScrollView>
  );
};

export default Calendars;
