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

 

  
  const MusicIcon = "https://cdn-icons-png.flaticon.com/128/7566/7566380.png";
  const [apidata, setApiData] = useState("");
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`${Api}/events`);
        setApiData(data);
     
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#fff" }}
      contentContainerStyle={{ paddingBottom: 130 }}
    >
     
      <View>
        <Text
          style={{
            fontSize: 20,
            position: "absolute",
            color: "black",
            fontWeight: "700",
            left: 30,
            top: 15,
            opacity:0.5
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
                        elevation: 4,
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
                          left: 200,
                        }}
                      />

                      <View
                        style={{ position: "absolute", top: 140, left: 17 }}
                      >
                        
                        <Text
                          style={{
                           
                            left: 20,
                            color: "#fff",
                            backgroundColor: "orange",
                            paddingHorizontal: 10,
                            borderRadius: 5,
                          }}
                        >
                        {item.category}
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
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  inputText: {
    height: 50,
    color: "black",
  },
});
