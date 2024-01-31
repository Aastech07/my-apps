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
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

import { ScrollView } from "react-native-virtualized-view";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { api } from "../Api";

const Views = () => {
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

  const images = 'https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg'
 
  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ paddingBottom: 230 }}
    >
      <View style={{ flex: 1 }}>
        <FlatList
          style={{ top: 50 }}
          data={apidata}
          renderItem={({ item }) => (
            <>
              <View
                key={item.id}
                style={{
                  paddingBottom: 10,
                  top: 20,
                }}
              >
                <Pressable
                  onPress={() =>
                    navigation.navigate("Viewdata", { data: item })
                  }
                >
                  <View
                    style={{
                      backgroundColor: "#fff",
                      paddingBottom: 250,
                      borderRadius: 10,
                      shadowColor: "#000",
                      shadowOffset: {
                        width: 0,
                        height: 50,
                      },
                      shadowOpacity: 0.8,
                      shadowRadius: 16.0,
                      elevation: 1.5,
                    }}
                  >
                    <View style={{}}>
                      <Text
                        style={{
                          top: 10,
                          fontWeight: "bold",
                          position: "absolute",
                          left: 20,
                          fontSize: 17,
                        }}
                      >
                        {item.title}
                      </Text>
                      <Text
                        style={{
                          top: 40,
                          position: "absolute",
                          left: 20,
                          fontSize: 13,
                          opacity: 0.6,
                        }}
                      >
                        State Boards | 3 Years | Rs 5-6 LPA{" "}
                      </Text>


                      <View style={{position:'absolute',left:responsiveWidth(85),top:10}}>
                           <Image source={{uri:images}} style={{height:40,width:40,borderRadius:50}}/>
                            <FontAwesome5 name="mars" size={14} style={{bottom:45,left:25,opacity:0.7}}/>

                      </View>


                      <View style={{ position: "absolute", top: 65, left: 20 }}>
                        <FontAwesome5
                          name="briefcase"
                          style={{ position: "absolute", top: 1, opacity: 0.3 }}
                          size={15}
                        />
                        <Text style={{ left: 20, opacity: 0.8 }}>
                          The VR Company . Senior Video Editor
                        </Text>
                        <Text
                          style={{
                            left: 20,
                            opacity: 0.8,
                            fontSize: 12,
                            top: 5,
                          }}
                        >
                          Jun 2022 - Sep 2023
                        </Text>
                      </View>

                      <View
                        style={{ position: "absolute", top: 110, left: 20 }}
                      >
                        <FontAwesome5
                          name="graduation-cap"
                          style={{ position: "absolute", top: 1, opacity: 0.3 }}
                          size={15}
                        />
                        <Text style={{ left: 20, opacity: 0.8 }}>
                          Mumbai University Mumbai . other
                        </Text>

                        <Text
                          style={{
                            left: 20,
                            opacity: 0.8,
                            fontSize: 12,
                            top: 5,
                          }}
                        >
                          Jul 2009 - Jul 2010
                        </Text>
                      </View>

                      <View
                        style={{ position: "absolute", top: 150, left: 20 }}
                      >
                        <Text
                          style={{
                           top:10,
                            backgroundColor: "#f2f2f2",
                            paddingHorizontal: 10,
                            borderRadius: 2,
                            position: "absolute",opacity:0.6
                          }}
                        >
                          React native
                        </Text>

                        <Text
                          style={{
                           top:10,
                            backgroundColor: "#f2f2f2",
                            paddingHorizontal: 10,
                            borderRadius: 2,
                            position: "absolute",left:110,opacity:0.6
                          }}
                        >
                            Flutter
                        </Text>
                      </View>

                        <Text style={{position:'absolute',top:160,left:responsiveWidth(80),opacity:0.6}}>Mumbai</Text>

                     <View style={{borderWidth:0.5,position:'absolute',bottom:60,alignSelf:'center',paddingHorizontal:responsiveWidth(45),opacity:0.2}}></View>
                      <View style={{position:"absolute",top:205}}>     
                        <Text style={{marginLeft:20,marginRight:20}}>React Native combines the best parts of native development with React, a best-in-class</Text>
                      </View>

                    </View>
                  </View>
                </Pressable>
              </View>
            </>
          )}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </ScrollView>
  );
};

export default Views;
