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
  TouchableOpacity,
  Pressable,
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
import { api } from "../Api";

const ManagePost = () => {
  const Api = api;
  const navigation = useNavigation();
  const drawer = useRef(null);

  const [apidata, setApiData] = useState("");
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`${Api}/jobs`);
        setApiData(data);
        console.log(apidata);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ paddingBottom: 190 }}
    >
      <View>
        <Text
          style={{
            top: 70,
            left: 20,
            fontSize: 17,
          }}
        >
          All post.
        </Text>

        <View style={{ flex: 1 }}>
          <FlatList
            style={{}}
            data={apidata}
            
            renderItem={({ item }) => (
              <>
                <Pressable
                  onPress={() =>
                    navigation.navigate("Managepostdata", { data: item })
                  }
                >
                  <View
                    key={item.id}
                    style={{
                      marginLeft: responsiveWidth(5),
                      paddingBottom: 10,
                      top: 80,
                    }}
                  >
                    <View
                      style={{
                        backgroundColor: "#fff",
                        paddingBottom: 110,
                        borderRadius: 10,
                        shadowColor: "#000",
                        shadowOffset: {
                          width: 0,
                          height: 50,
                        },
                        shadowOpacity: 0.8,
                        shadowRadius: 16.0,
                        elevation: 1.5,
                        alignSelf: "center",
                        paddingHorizontal: responsiveWidth(48),
                        right: responsiveWidth(3),
                      }}
                    >
                      <View style={{ position: "absolute" }}>
                        <Text
                          style={{
                            color: "#000",
                            position: "absolute",
                            top: 10,
                            fontSize: 17,
                            left: 20,
                          }}
                        >
                          {item.title}
                        </Text>

                        <Text
                          style={{
                            opacity: 0.6,
                            color: "purple",
                            position: "absolute",
                            top: 35,
                            fontSize: 12,
                            left: 20,
                            borderWidth: 1,
                            paddingHorizontal: 2,
                            borderColor: "purple",
                            borderRadius: 4,
                          }}
                        >
                          Exclusive
                        </Text>

                        <Text
                          style={{
                            opacity: 0.6,
                            color: "#000",
                            position: "absolute",
                            top: 60,
                            fontSize: 14,
                            left: 20,
                          }}
                        >
                          RS. {item.salary}
                        </Text>

                        <Text
                          style={{
                            opacity: 0.6,
                            color: "#FE7A36",
                            position: "absolute",
                            top: 10,
                            fontSize: 14,
                            left: responsiveWidth(70),
                          }}
                        >
                          To be opened
                        </Text>

                        <Text
                          style={{
                            opacity: 0.6,
                            color: "#000",
                            position: "absolute",
                            top: 80,
                            fontSize: 14,
                            left: 20,
                          }}
                        >
                          {item.location} . {item.educationLevel} .{" "}
                          {item.experienceLevel}
                        </Text>
                      </View>
                    </View>
                  </View>
                </Pressable>
              </>
            )}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default ManagePost;
