import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Pressable,
} from "react-native";

import {
  responsiveWidth,
  responsiveHeight,
} from "react-native-responsive-dimensions";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { useState } from "react";
import Postjobs from "./Jobs/Postjobs";
import ManagePost from "./Jobs/ManagePost";
import Animated, {
  FadeInDown,
} from "react-native-reanimated";
import Views from "./Jobs/Views";
const BottomNav = () => {
  const [selected, setSelected] = useState(1);
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {selected == 1 ? (
        <Postjobs />
      ) : selected == 2 ? (
        <ManagePost />
      ) : selected == 3 ? (
        <Views />
      ) : null}

      <View
        style={{
          width: responsiveWidth(100),
          height: 60,
          backgroundColor: "#fff",
          position: "absolute",
          bottom: 0,
          top: 1,
          shadowColor: "#000",
          shadowOffset: {
            width: 100,
            height: 100,
          },
          shadowOpacity: 0.6,
          shadowRadius: 50.0,
          elevation: 2,
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
                name="briefcase"
                size={20}
                style={{ alignSelf: "center" }}
                color={selected == 1 ? "#000" : "gray"}
              />
              <Text
                style={{
                  alignSelf: "center",
                  fontSize: 12,
                  color: selected == 1 ? "#000" : "gray",
                }}
              >
                Post Jobs
              </Text>
            </Animated.View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setSelected(2)} style={{}}>
            <Animated.View
              style={{
                position: "absolute",
                left: responsiveWidth(40),
             
                top: 3,
              }}
              entering={FadeInDown.duration(500).damping()}
            >
              <FontAwesome5
                name="list"
                size={18}
                style={{ textAlign: "center" }}
                color={selected == 2 ? "#000" : "gray"}
              />
              <Text
                style={{
                  alignSelf: "center",
                  fontSize: 12,
                  color: selected == 2 ? "#000" : "gray",
                }}
              >
                Manage Post
              </Text>
            </Animated.View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setSelected(3)}>
            <Animated.View
              style={{
                position: "absolute",
                left: responsiveWidth(80),
              
                top: 5,
              }}
              entering={FadeInDown.duration(500).damping()}
            >
              <FontAwesome5
                name="eye"
                size={18}
                style={{ alignSelf: "center" }}
                color={selected == 3 ? "#000" : "gray"}
              />
              <Text
                style={{
                  alignSelf: "center",
                  fontSize: 12,
                  color: selected == 3 ? "#000" : "gray",
                }}
              >
                View
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
