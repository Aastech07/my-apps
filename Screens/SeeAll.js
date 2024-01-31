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
const HomeScreen = () => {
  const Api = api;
  const navigation = useNavigation();
  const drawer = useRef(null);

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

  const jsondata = {
    EventItems: [
      {
        id: 1,
        name: "International Band Mu...",
        image:
          "https://s3-alpha-sig.figma.com/img/84a9/76ac/cf2178f37f5fdaf13d26c3580b71f85d?Expires=1704067200&Signature=DTyqiE0hxQwd0fGun7H7PIN4YQhThiUL2fEBk0u1cPPDafZGulJ9mV1rXnpN-1~41auNkfCnhhaGnocpHCieMgQf7d4Vx66TF~YsQX3u8j7-Hvv0rHch6cimNqrnIGTLLCWNVORMUxKLrtGRzLfmBngO2SxhztxpKOttlx6Wmx6A3Avv9DOB8wLjpjLhRD~kF5GUcpfDiv4YtpxSyzoPIgv72sUyX6sS6N7sMXUNboqQD3lNcfpEtpzer-v996l91HNGSIF1H-rnT8cYA~OORU2iTj5RdaVk04yg4gGhX3Cc-v5dhLGgu1ECZ5b0T6BVtBWoh5Mngq23bu2tbJ7nHg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
      },
      {
        id: 2,
        name: "International Band Mu...",
        image:
          "https://s3-alpha-sig.figma.com/img/6c71/bf2d/805db991ea266144b48ac8adde78bcf0?Expires=1704067200&Signature=fCgb44EbHPCWWjUatHT0JQTByf9wOMd3jeghPsIeazisHVDe8ruhkZeeZKUtTo7MH6I9VovGXdaUUSm8mfNbyn~kMK6VhXjQXYLd6SA-71jcbzOWYUhkZLukP~ohGXVqlfrISPzyipdmh9Z2EoMoYAHLluuJTuYuZE5SZajP-I0HD39SDNX6p2bGB09eviGCoKvSv3bkAJa0WQulzldErnz1ECYnK7dbRcQ4-wmMQI8cTIPYx0C8MSyfBZDVYh6VfF5eQ8pbWpv5uk~QgWFWFZ2Uo4wD7qIES0AIwGT2EJ1ua02l4R-QA2MKi9vN~Led5lxjl3LQfeF63cclhn8eJQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
      },
      {
        id: 3,
        name: "International Band Mu...",
        image:
          "https://s3-alpha-sig.figma.com/img/84a9/76ac/cf2178f37f5fdaf13d26c3580b71f85d?Expires=1704067200&Signature=DTyqiE0hxQwd0fGun7H7PIN4YQhThiUL2fEBk0u1cPPDafZGulJ9mV1rXnpN-1~41auNkfCnhhaGnocpHCieMgQf7d4Vx66TF~YsQX3u8j7-Hvv0rHch6cimNqrnIGTLLCWNVORMUxKLrtGRzLfmBngO2SxhztxpKOttlx6Wmx6A3Avv9DOB8wLjpjLhRD~kF5GUcpfDiv4YtpxSyzoPIgv72sUyX6sS6N7sMXUNboqQD3lNcfpEtpzer-v996l91HNGSIF1H-rnT8cYA~OORU2iTj5RdaVk04yg4gGhX3Cc-v5dhLGgu1ECZ5b0T6BVtBWoh5Mngq23bu2tbJ7nHg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
      },
      {
        id: 4,
        name: "International Band Mu...",
        image:
          "https://s3-alpha-sig.figma.com/img/6c71/bf2d/805db991ea266144b48ac8adde78bcf0?Expires=1704067200&Signature=fCgb44EbHPCWWjUatHT0JQTByf9wOMd3jeghPsIeazisHVDe8ruhkZeeZKUtTo7MH6I9VovGXdaUUSm8mfNbyn~kMK6VhXjQXYLd6SA-71jcbzOWYUhkZLukP~ohGXVqlfrISPzyipdmh9Z2EoMoYAHLluuJTuYuZE5SZajP-I0HD39SDNX6p2bGB09eviGCoKvSv3bkAJa0WQulzldErnz1ECYnK7dbRcQ4-wmMQI8cTIPYx0C8MSyfBZDVYh6VfF5eQ8pbWpv5uk~QgWFWFZ2Uo4wD7qIES0AIwGT2EJ1ua02l4R-QA2MKi9vN~Led5lxjl3LQfeF63cclhn8eJQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
      },
      {
        id: 5,
        name: "International Band Mu...",
        image:
          "https://s3-alpha-sig.figma.com/img/6c71/bf2d/805db991ea266144b48ac8adde78bcf0?Expires=1704067200&Signature=fCgb44EbHPCWWjUatHT0JQTByf9wOMd3jeghPsIeazisHVDe8ruhkZeeZKUtTo7MH6I9VovGXdaUUSm8mfNbyn~kMK6VhXjQXYLd6SA-71jcbzOWYUhkZLukP~ohGXVqlfrISPzyipdmh9Z2EoMoYAHLluuJTuYuZE5SZajP-I0HD39SDNX6p2bGB09eviGCoKvSv3bkAJa0WQulzldErnz1ECYnK7dbRcQ4-wmMQI8cTIPYx0C8MSyfBZDVYh6VfF5eQ8pbWpv5uk~QgWFWFZ2Uo4wD7qIES0AIwGT2EJ1ua02l4R-QA2MKi9vN~Led5lxjl3LQfeF63cclhn8eJQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
      },
      {
        id: 6,
        name: "International Band Mu...",
        image:
          "https://s3-alpha-sig.figma.com/img/84a9/76ac/cf2178f37f5fdaf13d26c3580b71f85d?Expires=1704067200&Signature=DTyqiE0hxQwd0fGun7H7PIN4YQhThiUL2fEBk0u1cPPDafZGulJ9mV1rXnpN-1~41auNkfCnhhaGnocpHCieMgQf7d4Vx66TF~YsQX3u8j7-Hvv0rHch6cimNqrnIGTLLCWNVORMUxKLrtGRzLfmBngO2SxhztxpKOttlx6Wmx6A3Avv9DOB8wLjpjLhRD~kF5GUcpfDiv4YtpxSyzoPIgv72sUyX6sS6N7sMXUNboqQD3lNcfpEtpzer-v996l91HNGSIF1H-rnT8cYA~OORU2iTj5RdaVk04yg4gGhX3Cc-v5dhLGgu1ECZ5b0T6BVtBWoh5Mngq23bu2tbJ7nHg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
      },
      {
        id: 7,
        name: "International Band Mu...",
        image:
          "https://s3-alpha-sig.figma.com/img/6c71/bf2d/805db991ea266144b48ac8adde78bcf0?Expires=1704067200&Signature=fCgb44EbHPCWWjUatHT0JQTByf9wOMd3jeghPsIeazisHVDe8ruhkZeeZKUtTo7MH6I9VovGXdaUUSm8mfNbyn~kMK6VhXjQXYLd6SA-71jcbzOWYUhkZLukP~ohGXVqlfrISPzyipdmh9Z2EoMoYAHLluuJTuYuZE5SZajP-I0HD39SDNX6p2bGB09eviGCoKvSv3bkAJa0WQulzldErnz1ECYnK7dbRcQ4-wmMQI8cTIPYx0C8MSyfBZDVYh6VfF5eQ8pbWpv5uk~QgWFWFZ2Uo4wD7qIES0AIwGT2EJ1ua02l4R-QA2MKi9vN~Led5lxjl3LQfeF63cclhn8eJQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
      },
    ],
  };

  const Image1 =
    "https://communityappintegrate.s3.ap-south-1.amazonaws.com/Event/pexels-matheus-bertelli-2608515.jpg";
  const Image2 =
    "https://s3-alpha-sig.figma.com/img/a511/6394/d8c24efab59533add110ee8338355c42?Expires=1704067200&Signature=Y9I8r2Ylj2o4kRPwyxAClXNHITBtHsO--ZX40-UuXNLPm1CnY6UZby7FZK5stRHZirM-kK540ziaTQn08US4cuWSeUmdV-AcNAnbevElJOPn-XQfbatw0GE3BlUXN3VBCQW-DmiQCT2EemQlnGpCdCz14EA67yypbIxyivRQE1XHpR0apYPK7us2-c-I~NDyoWcARFgyrl2-DXrJEzjYbUtKui87seg6HvjqqygrosF78XB78grCEPi7CldiSZcochsVEdgABrj7zl5cOu5Z5pOzpQ2s56K7KXWKCT1TpnVZwPYnoL5JHqkUJsQDAkMRrMvj35iCAAWELyRPKJqLyg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4";
  const Image3 =
    "https://s3-alpha-sig.figma.com/img/2902/8b47/6eedca800bd259b5877f98458c1ec66a?Expires=1704067200&Signature=biIjyyo1Qu8SOB~Nl-gq50qv5M~hXqExKW1W3chToaa3ZLylvPX9L1toXgIgnv~MvmQVRcGwy0uDrdmYinisclQxdROiQk287lmjR91hi3791NcfHgGwWGyZgNAPquHiR4xNn723rNytMUvXz8vWPc1hoADk4W8SPk~oY6TDPwbNV~Bo8l5t2FqcmjsuA2viRpswMwEb6bXnOeouGvyj2fdd7CEubkeHQhAjfs0Jhq6WVrOd9bAVv~jyvcgbw~x1AIjiQL5dcFJgbvmqIt1VwjLxdECzvoKLxSLCj1Jn1~qYBsz~c7b0N4UQEAgYPmhO5~0-0eyb7x4DBh6srQcUJA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4";
  const Image4 =
    "https://s3-alpha-sig.figma.com/img/e6e0/802c/b43aceb267d24e6c72e464bbc8fa5f13?Expires=1704067200&Signature=AQpOCu1XHmJQ5fdHx9hXQHAxIme9C7PpRuhm-v1bGa~12nnvm~jIEzoEFXBryOXcFySD~8VU4M9wgdCOwAfdSO0B04CEozy-0IzbPHUVppUdo1H4u9B8F3jil~LfAltxaVitwqwtsrt3fFYtbk8rLNwvENfIb0PwgCd~-OVXqDDVRXsbIYxPojW1~7qA46P0ACtnOdAuTf9ihkjy8NiILgbyimh3k8Ks9KXTQQGfphVuO046CWGzl6vwWt4~HHLWrfsTG9R6Q6CKH9TYC4VxhFvKxOBw3m86Y52E6-lnFf3CABIgy1jDY0wq6EGvnPIXTA52AVtRz8AzBZAHSaPBUw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4";
  const SaveIcon = "https://cdn-icons-png.flaticon.com/128/5667/5667029.png";
  const MusicIcon = "https://cdn-icons-png.flaticon.com/128/7566/7566380.png";
  const [apidata, setApiData] = useState("");
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`${Api}/events`);
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
        style={{ flex: 1,backgroundColor:'#fff' }}
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
            Upcoming Events
          </Text>

          <View style={{ flex: 1 }}>
            <FlatList
              style={{ top: 50 }}
              data={apidata} 
              renderItem={({ item }) => (
                <>
                  <View
                    style={{
                      marginLeft: responsiveWidth(5),
                      paddingBottom: 20,
                      top: 10,
                    }}
                  >
                    <TouchableWithoutFeedback
                      onPress={() =>
                        navigation.navigate("EventsDetails", { data: item })
                      }
                    >
                      <View
                        style={{
                          backgroundColor: "#fff",

                          paddingBottom: 60,
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
                          source={{ uri: item.image }}
                          style={{
                            width: 330,
                            height: 175,
                            bottom: 52,
                            marginTop: 60,
                            borderRadius: 10,
                            alignSelf: "center",
                          }}
                        />
                        <Text
                          style={{
                            fontSize: responsiveFontSize(2),
                            top: 170,
                            left: 10,
                            marginTop: 25,
                            fontWeight: "600",
                            position: "absolute",
                          }}
                        >
                          {item.title}
                        </Text>
                        <Text
                          style={{
                            fontSize: 16,
                            top: 225,
                            left: 230,
                            marginTop: 25,
                            fontWeight: "600",
                            position: "absolute",
                          }}
                        >
                          {item.date}
                          
                        </Text>
                        <FontAwesome5
                            name="calendar-week"
                            size={20}
                            style={{
                              position: "absolute",
                              top: "107%",
                              left:200
                            }}
                          />
                      

                        <View
                          style={{ position: "absolute", top: 100, left: 17 }}
                        >
                          <Image
                            source={{ uri: MusicIcon }}
                            style={{ width: 15, height: 15 }}
                          />
                          <Text
                            style={{
                              bottom: 20,
                              left: 20,
                              color: "#fff",
                              backgroundColor: "orange",
                              paddingHorizontal: 10,
                              borderRadius: 5,
                            }}
                          >
                            Music
                          </Text>
                        </View>

                        <View
                          style={{ position: "absolute", top: 250, left: 20 }}
                        >
                          <Text style={{}}>📍 Mumbai, Maharastra</Text>
                        </View>

                        <View
                          style={{
                            position: "absolute",
                            top: 15,
                            left: 15,
                            backgroundColor: "#fff",
                            paddingHorizontal: 5,
                            paddingVertical: 5,
                            borderRadius: 10,
                          }}
                        >
                          <Text
                            style={{
                              top: 2,
                              left: 5,
                              fontSize: 20,
                              fontWeight: "700",
                              color: "red",
                            }}
                          >
                            10
                          </Text>
                          <Text style={{ color: "red", fontWeight: "600" }}>
                            JUNE
                          </Text>
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

export default HomeScreen;

const styles = StyleSheet.create({
  inputText: {
    height: 50,
    color: "black",
  },
});
