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
import { api } from "./Api";
import { StatusBar } from "react-native";
const HomeScreen = () => {
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
      <View
        style={{
          opacity: 0.6,
          top: responsiveHeight(6.5),
          left: responsiveWidth(4),
          backgroundColor: "lightgray",
          position: "absolute",
          paddingHorizontal: 10,
          paddingVertical: 8,
          borderRadius: 50,
          shadowColor: "#f2f2f2",
          shadowOffset: 0.9,
          shadowOpacity: 0.9,
          shadowRadius: 50,
          elevation: 10,
        }}
      >
        <TouchableOpacity onPress={() => navigation.navigate("ProfileScreen")}>
          <FontAwesome name="user" size={22} color={"black"} />
        </TouchableOpacity>
      </View>

      <View style={{ left: 20, top: 133, opacity: 0.6 }}>
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
        <FontAwesome name="bullhorn" size={18} />
        <Text
          style={{
            position: 'absolute',
            left: 30,
            fontSize: 18,
            fontWeight: "500",
          }}
          onPress={() => navigation.navigate("Announcement")}
        >
          Announcement
        </Text>
      </View>

      <View style={{ left: 20, top: 170, opacity: 0.6 }}>
        <FontAwesome name="calendar" size={22} />
        <Text
          style={{
            position: "absolute",
            left: 33,
            fontSize: 18,
            fontWeight: "500",
          }}
          onPress={() => navigation.navigate("Calendars")}
        >
          Calendars
        </Text>
      </View>
      <View style={{ left: 20, top: 190, opacity: 0.6 }}>
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
      <View style={{ left: 20, top: 205, opacity: 0.6 }}>
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
      <View style={{ left: 20, top: responsiveHeight(70), opacity: 0.6 }}>
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
        
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

   const [matrimonial,setMatrimonial] = useState('')
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${Api}/matrimonial/profiles`);
        setMatrimonial(data);
        console.log(matrimonial);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

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
              left: responsiveWidth(75.5),
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
           <Image
              source={{ uri: Image1 }}
              style={{
                width: responsiveWidth(99.8),
                height: 170,
               top:5.5,
                paddingBottom: 30,
              }}
            />
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
          <Text
            style={{
              fontSize: 14,
              position: "absolute",
              color: "black",
              left: responsiveWidth(80),
              top: 17,
              opacity: 0.9,
            }}
            onPress={() => navigation.navigate("SeeAll ")}
          >
            See All ➤
          </Text>
          <View style={{ flex: 1 }}>
            <FlatList
              style={{ top: 50 }}
              horizontal
              data={apidata}
         
              renderItem={({ item }) => (
                <>
                  <View
                    key={item.id}
                    style={{
                      marginLeft: 15,
                      paddingBottom: 30,
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
                          paddingHorizontal: 8,
                          paddingBottom: 70,
                          borderRadius: 20,
                          shadowColor: "#000",
                          shadowOffset: {
                            width: 0,
                            height: 50,
                          },
                          shadowOpacity: 0.8,
                          shadowRadius: 16.0,
                          elevation: 8,
                        }}
                      >
                        <Image
                          source={{ uri: item.image }}
                          style={{
                            width: 200,
                            height: 120,
                            bottom: 52,
                            marginTop: 60,
                            borderRadius: 10,
                          }}
                        />
                        <Text
                          style={{
                            fontSize: 16,
                            top: 110,
                            right: 20,
                            marginTop: 25,
                            fontWeight: "600",
                            position: "absolute",
                          }}
                        >
                          {item.title}
                        </Text>

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
                          style={{ position: "absolute", top: 215, left: 30 }}
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

            <Text
              style={{
                fontSize: 19,
                position: "absolute",
                color: "black",
                fontWeight: "bold",
                top: 330,
                left: 30,
              }}
            >
              Jobs Nearby You
            </Text>
            <Text
              style={{
                fontSize: 14,
                position: "absolute",
                color: "black",
                top: 335,
                left: responsiveWidth(80),
                opacity: 0.9,
              }}
              onPress={() => navigation.navigate("JobsSeeAll")}
            >
              See All ➤
            </Text>

            <FlatList
              style={{ top: 100 }}
              horizontal
              data={details}
              showsHorizontalScrollIndicator={false}

              renderItem={({ item }) => (
                <>
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
                      marginLeft: 25,
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
                </>
              )}
            />

            <View style={{ top: 180, position: "absolute" }}>
              <Text
                style={{
                  fontSize: 19,
                  position: "absolute",
                  color: "black",
                  fontWeight: "bold",
                  top: 400,
                  left: 30,
                }}
              >
                Matrimony
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  position: "absolute",
                  color: "black",
                  top: 400,
                  left: responsiveWidth(80),
                  opacity: 0.9,
                }}
                onPress={() => navigation.navigate("MatrimonySeeAll")}
              >
                See All ➤
              </Text>
            </View>
            <FlatList
              style={{ top: 50 }}
              pagingEnabled
              horizontal
              data={matrimonial}
            
              renderItem={({ item }) => (
                <>
                  <View
                    style={{
                      marginLeft: 20,
          
                      paddingBottom: 30,
                      top: 10,
                    }}
                  >
                    <View
                      style={{
                        backgroundColor: "#fff",
                        paddingHorizontal: 8,
                        borderRadius: 20,
                        shadowColor: "#000",
                        shadowOffset: {
                          width: 0,
                          height: 50,
                        },
                        shadowOpacity: 0.8,
                        shadowRadius: 16.0,
                        elevation: 8,
                      }}
                    >
                      <TouchableWithoutFeedback
                        onPress={() =>
                          navigation.navigate("Mymatchdata",{data: item })
                        }
                      >
                        <Image
                          source={{ uri: item.images[0] }}
                          style={{
                           width:150,
                           height:170,
                            bottom: 52,
                            marginTop: 60,
                            borderRadius: 10,
                          }}
                        />
                      </TouchableWithoutFeedback>
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
                  </View>
                </>
              )}
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
