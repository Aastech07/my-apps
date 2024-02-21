import React, { useEffect, useState, useRef } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  Image,
  FlatList,
  DrawerLayoutAndroid,
  TouchableWithoutFeedback,
} from "react-native";
import {
  responsiveWidth,
  responsiveHeight,
} from "react-native-responsive-dimensions";
import FontAwesome5 from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome5";
import { ScrollView } from "react-native-virtualized-view";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { Drawer } from "react-native-drawer-layout";
import { api } from "./Api";
import { StatusBar } from "react-native";
const JobsSeeAll = () => {
  const Api = api;
  const navigation = useNavigation();
  const drawer = useRef(null);

  const navigationView = () => (
    <View style={{ backgroundColor: "#fff" }}>
      <StatusBar
        translucent
        backgroundColor="#4383f2"
        barStyle="dark-content"
      />
      <View style={{ left: 20, top: 100, opacity: 0.6 }}>
        <FontAwesome name="user" size={22} />
        <Text
          style={{
            position: "absolute",
            left: 30,
            fontSize: 18,
            fontWeight: "500",
          }}
        >
          My Profile
        </Text>
      </View>
      <View style={{ left: 20, top: 125, opacity: 0.6 }}>
        <FontAwesome name="comment" size={22} />
        <Text
          style={{
            position: "absolute",
            left: 30,
            fontSize: 18,
            fontWeight: "500",
          }}
          onPress={() => navigation.navigate("Blog")}
        >
          Blog
        </Text>
      </View>
      <View style={{ left: 20, top: 150, opacity: 0.6 }}>
        <FontAwesome name="money-check-alt" size={22} />
        <Text
          style={{
            position: "absolute",
            left: 33,
            fontSize: 18,
            fontWeight: "500",
          }}
        >
          Trade
        </Text>
      </View>
      <View style={{ left: 20, top: 175, opacity: 0.6 }}>
        <FontAwesome name="envelope" size={22} />
        <Text
          style={{
            position: "absolute",
            left: 33,
            fontSize: 18,
            fontWeight: "500",
          }}
        >
          Contact Us
        </Text>
      </View>
      <View style={{ left: 20, top: 200, opacity: 0.6 }}>
        <FontAwesome name="cog" size={22} />
        <Text
          style={{
            position: "absolute",
            left: 33,
            fontSize: 18,
            fontWeight: "500",
          }}
        >
          Setting
        </Text>
      </View>
      <View style={{ left: 20, top: 220, opacity: 0.6 }}>
        <FontAwesome name="question-circle" size={22} />
        <Text
          style={{
            position: "absolute",
            left: 33,
            fontSize: 18,
            fontWeight: "500",
          }}
        >
          Helps & FAQs
        </Text>
      </View>
      <View style={{ left: 20, top: 238, opacity: 0.6 }}>
        <FontAwesome name="sign-in-alt" size={22} />
        <Text
          style={{
            position: "absolute",
            left: 33,
            fontSize: 18,
            fontWeight: "500",
          }}
        >
          Sign Out
        </Text>
      </View>
    </View>
  );

  const Image1 =
    "https://communityappintegrate.s3.ap-south-1.amazonaws.com/Event/pexels-matheus-bertelli-2608515.jpg";
  const SaveIcon = "https://cdn-icons-png.flaticon.com/128/5667/5667029.png";
  const MusicIcon = "https://cdn-icons-png.flaticon.com/128/7566/7566380.png";
  const [apidata, setApiData] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${Api}/events`);
        setApiData(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const [details, setDetails] = useState("");
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`${Api}/jobs`);
        setDetails(data);
        console.log(apidata);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <DrawerLayoutAndroid
      ref={drawer}
      drawerWidth={200}
      drawerPosition={"left"}
      renderNavigationView={navigationView}
    >
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 130 }}
      >
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
          >
            ☰
          </Text>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              bottom: 6,
            }}
          >
            <Text
              style={{
                color: "#fff",
                fontSize: 25,
                fontWeight: "bold",
                position: "absolute",
                top: 135,
              }}
            >
              {" "}
              ...{" "}
            </Text>
          </View>
        </View>
        <View>
          <Text
            style={{
              fontSize: 20,
              position: "absolute",
              color: "black",
              fontWeight: "700",
              left: 10,
              top: 15,
            }}
          >
            Jobs Nearby You
          </Text>

          <FlatList
            style={{ top: 55 }}
            data={details}
            showsHorizontalScrollIndicator={false}
            numColumns={2}
           
            renderItem={({ item }) => (
              <>
      <TouchableWithoutFeedback onPress={()=>navigation.navigate('JobsDetails',{data:item})} >
                <View
                  style={{
                    backgroundColor: "#0F2167",
                    paddingHorizontal: 30,
                    paddingBottom: 100,
                    borderRadius: 20,
                    shadowColor: "#000",
                    shadowOffset: {
                      width: 0,
                      height: 50,
                    },
                    shadowOpacity: 0.8,
                    shadowRadius: 16.0,
                    elevation: 8,
                    marginBottom: 100,
                    marginLeft: 5,
                  }}
                >
                  <View
                    style={{
                      backgroundColor: "#fff",
                      padding: 20,
                      top: 10,
                      marginRight: 60,
                      borderRadius: 8,
                      right: 15,
                    }}
                  ></View>
                  <Text
                    style={{
                      color: "#fff",
                      top: 10,
                      right: 10,
                      position: "absolute",
                      fontSize: 11,
                      fontWeight: "600",
                    }}
                  >
                    Post by
                  </Text>
                  <Text
                    style={{
                      color: "#fff",
                      top: 25,
                      right: 10,
                      position: "absolute",
                      fontSize: 10,
                      fontWeight: "600",
                    }}
                  >
                    1 Dec 23
                  </Text>

                  <Text style={{ color: "#fff", top: 30, right: 10 }}>
                    {item.title}
                  </Text>
                  <Text style={{ color: "#fff", top: 30, right: 10 }}>
                    {item.company}
                  </Text>
                  <View
                    style={{
                      backgroundColor: "#000",
                      borderWidth: 0.5,
                      paddingLeft: 145,
                      position: "absolute",
                      top: 120,
                      left: 10,
                    }}
                  ></View>
                  <View style={{ position: "absolute", top: 125, left: 10 }}>
                    <Text
                      style={{
                        fontWeight: "600",
                        color: "#fff",
                        fontSize: 12,
                      }}
                    >
                      📍 {item.location}
                    </Text>
                  </View>
                  <Text
                    style={{
                      position: "absolute",
                      top: 125,
                      left: 110,
                      fontWeight: "600",
                      color: "#fff",
                    }}
                  >
                    {item.salary}
                  </Text>

                  <View
                    style={{
                      position: "absolute",
                      top: 150,
                      left: 20,
                      backgroundColor: "#fff",
                      paddingHorizontal: 5,
                      borderRadius: 20,
                    }}
                  >
                    <Text>{item.employmentType}</Text>
                  </View>
                  <View
                    style={{
                      position: "absolute",
                      top: 150,
                      left: 100,
                      backgroundColor: "#fff",
                      paddingHorizontal: 5,
                      borderRadius: 20,
                    }}
                  >
                    <Text>Hybrid</Text>
                  </View>
                </View>
                </TouchableWithoutFeedback>
              </>
            )}
          />
        </View>
      </ScrollView>
    </DrawerLayoutAndroid>
  );
};

export default JobsSeeAll;

const styles = StyleSheet.create({
  inputText: {
    height: 50,
    color: "black",
  },
});
