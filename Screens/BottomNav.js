import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Pressable,
} from "react-native";
import HomecSreen from "./HomeScreen";
import {
  responsiveWidth,
} from "react-native-responsive-dimensions";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { useState } from "react";
import JobsScreen from "./JobsScreen";
import Directory from "./Directory";
import Matrimony from "./Matrimony";
import Animated, {
  FadeInUp,
  FadeInDown,
} from "react-native-reanimated";
import Message from "./Message";
const BottomNav = () => {
  const [selected, setSelected] = useState(0);
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {selected == 0 ? (
        <HomecSreen />
      ) : selected == 2 ? (
        <JobsScreen />
      ) : selected == 3 ? (
        <Matrimony />
      ) : selected == 1 ? (
        <Directory />
      ) : selected == 4 ? (
        <Message />
      ) : null}

      <View
        style={{
          width: responsiveWidth(100),
          height: 60,
          backgroundColor: "#fff",
          position: "absolute",
          bottom: 0,
          shadowColor: "#000",
          shadowOffset: {
            width: 100,
            height: 100,
          },
          shadowOpacity: 0.6,
          shadowRadius: 50.0,
          elevation: 30,
        }}
      >
        <View style={{ flexDirection: "row", marginTop: 10 }}>
          <TouchableOpacity onPress={() => setSelected(1)}>
            <Animated.View
              style={{
                position: "absolute",
                left: responsiveWidth(6),
                top: 2,
           
              }}
              entering={FadeInDown.duration(500).damping()}
            >
              <FontAwesome5
                name="compass"
                size={25}
                style={{ alignSelf: "center" }}
                color={selected == 1 ? "blue" : "gray"}
              />
              <Text
                style={{
                  alignSelf: "center",
                  fontSize: 12,
                  color: selected == 1 ? "blue" : "gray",
                }}
              >
                Directory
              </Text>
            </Animated.View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setSelected(2)}>
            <Animated.View
              style={{
                position: "absolute",
                left: responsiveWidth(30),
                
              }}
              entering={FadeInDown.duration(500).damping()}
            >
              <FontAwesome5
                name="briefcase"
                size={25}
                style={{ alignSelf: "center" }}
                color={selected == 2 ? "blue" : "gray"}
              />
              <Text
                style={{
                  alignSelf: "center",
                  fontSize: 14,
                  color: selected == 2 ? "blue" : "gray",
                }}
              >
                Job
              </Text>
            </Animated.View>
          </TouchableOpacity>

          <Animated.View
            style={{ flex: 1, position: "absolute", left: "44%" }}
            entering={FadeInUp.duration(500).damping()}
          >
            <TouchableOpacity onPress={() => setSelected(0)}>
              <Image
                source={require("../assets/round.png")}
                style={{
                  width: 50,
                  height: 50,
                  bottom: selected == 4 ? 10 : 40,
                  borderRadius: 100,
                }}
              />
              <Image
                source={require("../assets/Home.png")}
                style={{
                  width: 20,
                  height: 20,
                  alignSelf: "center",
                  bottom: selected == 4 ? 45 : 75,
                }}
              />
            </TouchableOpacity>
          </Animated.View>

          <TouchableOpacity onPress={() => setSelected(3)}>
            <Animated.View
              style={{
                position: "absolute",
                left: responsiveWidth(59),
              
              }}
              entering={FadeInDown.duration(500).damping()}
            >
              <FontAwesome5
                name="user-friends"
                size={25}
                style={{ alignSelf: "center" }}
                color={selected == 3 ? "blue" : "gray"}
              />
              <Text
                style={{
                  alignSelf: "center",
                  fontSize: 14,
                  color: selected == 3 ? "blue" : "gray",
                }}
              >
                Matrimony
              </Text>
            </Animated.View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setSelected(4)}>
            <Animated.View
              style={{
                position: "absolute",
                left: responsiveWidth(83),
                top: 2,
              
              }}
              entering={FadeInDown.duration(500).damping()}
            >
              <FontAwesome5
                name="comment"
                size={25}
                style={{ alignSelf: "center" }}
                color={selected == 4 ? "blue" : "gray"}
              />
              <Text
                style={{
                  alignSelf: "center",
                  fontSize: 12,
                  color: selected == 4 ? "blue" : "gray",
                }}
              >
                Message
              </Text>
            </Animated.View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
export default BottomNav;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
