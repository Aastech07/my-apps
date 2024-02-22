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
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ paddingBottom: 130 }}
    >
      <View style={{bottom:30}}>
      

        <FlatList
          style={{ top: 55 }}
          data={details}
          showsHorizontalScrollIndicator={false}
          numColumns={2}
          renderItem={({ item }) => (
            <>
              <TouchableWithoutFeedback
                onPress={() =>
                  navigation.navigate("JobsDetails", { data: item })
                }
              >
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
                    marginBottom: 20,
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
  );
};

export default JobsSeeAll;

const styles = StyleSheet.create({
  inputText: {
    height: 50,
    color: "black",
  },
});
