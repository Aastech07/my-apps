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
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import FontAwesome5 from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome5";
import { ScrollView } from "react-native-virtualized-view";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { api } from "./Api";
const MatrimonySeeAll = () => {
  const Api = api;
  const navigation = useNavigation();
  const drawer = useRef(null);
  const calculateAge = (dateOfBirth) => {
    
    const birthDate = new Date(dateOfBirth);
    const currentDate = new Date();

    const age = currentDate.getFullYear() - birthDate.getFullYear();

    if (
      currentDate.getMonth() < birthDate.getMonth() ||
      (currentDate.getMonth() === birthDate.getMonth() &&
        currentDate.getDate() < birthDate.getDate())
    ) {
      return age - 1;
    } else {
      return age;
    }
  };

  const navigationView = () => (
    <View style={{ backgroundColor: "#fff" }}>
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



  const [apidata, setApiData] = useState("");
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`${Api}/matrimonial/profiles`);
        setApiData(data);
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
        style={{ flex: 1 ,backgroundColor: "#fff"}}
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
              left: 30,
              top: 15,
            }}
          >
            Matrimony
          </Text>

          <View style={{ flex: 1 }}>
            <FlatList
              style={{ top: 50 }}
              data={apidata}
             numColumns={2}
              renderItem={({ item }) => (
                <>
                  <View
                    key={item.id}
                    style={{
                      marginLeft: responsiveWidth(5),
                      paddingBottom: 20,
                      top: 10,
                    }}
                  >
                    <TouchableWithoutFeedback
                      onPress={() =>
                        navigation.navigate("Mymatchdata", { data: item })
                      }
                    >
                      <View
                        style={{
                          backgroundColor: "#fff",

                          borderRadius: 20,
                          shadowColor: "#000",
                          shadowOffset: {
                            width: 0,
                            height: 50,
                          },
                          shadowOpacity: 0.8,
                          shadowRadius: 16.0,
                          elevation: 8,
                          alignSelf: "center",
                          paddingHorizontal: responsiveWidth(2),
                          right: responsiveWidth(3),
                        }}
                      >
                        <Image
                          source={{ uri: item.images[0] }}
                          style={{
                            width:150,
                           height:170,
                            bottom: 52,
                            marginTop: 60,
                            borderRadius: 10,
                            alignSelf: "center",
                          }}
                        />
                        <Text
                        style={{
                          fontSize: 13,
                          top: 160,
                          right: 110,
                          marginTop: 25,
                          fontWeight: "600",
                          position: "absolute",
                        }}
                      >
                      {item.profileId.firstName}
                      </Text>
                      <Text
                        style={{
                          fontSize: 13,
                          top: 160,
                          right: 20,
                          marginTop: 25,
                          fontWeight: "600",
                          position: "absolute",
                        }}
                      >
                        Age: {calculateAge(item.profileId.dateOfBirth)}yrs
                      </Text>

                      <View
                        style={{
                          position: "absolute",
                          top: 150,
                          left: 15,
                          backgroundColor: "#fff",
                          paddingHorizontal: 4,
                          paddingVertical: 4,
                          borderRadius: 10,
                        }}
                      >
                        <Text
                          style={{
                            fontWeight: "600",
                            color: "#000",
                            fontSize: 10,
                          }}
                        >
                          {item.partnerPreferences.profession}
                        </Text>
                      </View>

                      <View
                        style={{
                          position: "absolute",
                          top: 150,
                          left: 75,
                          backgroundColor: "#fff",
                          paddingHorizontal: 4,
                          paddingVertical: 1,
                          borderRadius: 10,
                        }}
                      >
                        <Text style={{}}>📍 {item.locationOfGroom.cityLivingIn}</Text>
                      </View>


                       
                      </View>
                    </TouchableWithoutFeedback>
                  </View>
                </>
              )}
              showsHorizontalScrollIndicator={false}
            />
          </View>
        </View>
      </ScrollView>
    </DrawerLayoutAndroid>
  );
};

export default MatrimonySeeAll;
