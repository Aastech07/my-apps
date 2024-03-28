import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import HomecSreen from "./HomeScreen";
import { responsiveWidth } from "react-native-responsive-dimensions";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { useState } from "react";
import JobsScreen from "./JobsScreen";
import Directory from "./Directory/Directory";
import Matrimony from "./Matrimony/Matrimony";
import Message from "./Message";

const BottomNav = () => {
  const [selected, setSelected] = useState(0);

  const renderTab = (index, iconName, text) => (
    <TouchableOpacity
      key={index}
      onPress={() => setSelected(index)}
      style={{ flex: 1, alignItems: "center" }}
    >
      <FontAwesome5
        name={iconName}
        size={25}
        color={selected === index ? "#874d3b" : "gray"}
      />
      <Text
        style={{
          fontSize: 12,
          color: selected === index ? "#874d3b" : "gray",
        }}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {selected === 0 && <HomecSreen />}
      {selected === 2 && <JobsScreen />}
      {selected === 3 && <Matrimony />}
      {selected === 1 && <Directory />}
      {selected === 4 && <Message />}

      <View style={styles.bottomNav}>
        {renderTab(1, "compass", "Directory")}
        {renderTab(2, "briefcase", "Job")}
        <View style={{ flex: 1, alignItems: "center" }}>
          <TouchableOpacity onPress={() => setSelected(0)}>
            <Image
              source={require("../assets/round.png")}
              style={{
                width: 50,
                height: 50,
                bottom: selected === 4 ? -8 : 25,
                borderRadius: 100,
              }}
            />
            <Image
              source={require("../assets/Home.png")}
              style={{
                width: 20,
                height: 20,
                alignSelf: "center",
                bottom: selected === 4 ? 28 : 60,
              }}
            />
          </TouchableOpacity>
        </View>
        {renderTab(3, "user-friends", "Matrimony")}
        {renderTab(4, "comment", "Message")}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  bottomNav: {
    width: responsiveWidth(100),
    height: 60,
    backgroundColor: "#fff",
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: responsiveWidth(5),
    shadowColor: "#000",
    shadowOffset: {
      width: 100,
      height: 100,
    },
    shadowOpacity: 0.6,
    shadowRadius: 50.0,
    elevation: 30,
  },
});

export default BottomNav;
