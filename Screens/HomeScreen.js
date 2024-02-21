import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { responsiveWidth } from "react-native-responsive-dimensions";
import FontAwesome5 from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome5";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { api } from "./Api";
import AnnouncementDetails from "./Announcement/AnnouncementDetails";
import { Drawer } from "react-native-drawer-layout";
import NavigationView from "./Drawer";
import SkeletonLoader from "./skeletonloader/Skeletonloader";
const HomeScreen = () => {
  const Api = api;
  const navigation = useNavigation();

  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const profileId = await AsyncStorage.getItem("profileid");
        if (profileId !== null) {
          const { data } = await axios.get(`${Api}/profiles/${profileId}`);
          setData(data.firstName);
        }
      } catch (e) {
        console.log(e);
      }
    };

    getData();
  }, []);

  const [isEnabled, setIsEnabled] = useState(0);
  const Image1 =
    "https://communityappintegrate.s3.ap-south-1.amazonaws.com/Event/pexels-matheus-bertelli-2608515.jpg";
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
  const [matrimonial, setMatrimonial] = useState("");
  const [announcement, setAnnouncement] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`${Api}/jobs`);
        setDetails(data);

        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`${Api}/matrimonial/profiles`);

        setMatrimonial(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`${Api}/announcement-categories`);
        setAnnouncement(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    })();
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
    <Drawer
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      renderDrawerContent={NavigationView}
      drawerPosition="left"
    >
      {loading ? (
        <SkeletonLoader />
      ) : (
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
              Hi, {data}
            </Text>
            <Text
              onPress={() => setOpen(true)}
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
            <View style={{ backgroundColor: "#fff" }}>
              <View style={{ flex: 1, left: 48, marginRight: 55 }}>
                <FlatList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  data={announcement}
                  renderItem={({ item }) => (
                    <TouchableWithoutFeedback onPress={() => setIsEnabled(1)}>
                      <View
                        style={{
                          padding: 10,
                          backgroundColor: "#FFFF",
                          elevation: 1,
                          top: 1.5,
                        }}
                      >
                        <Text style={{ fontWeight: "400", fontSize: 18 }}>
                          {item.announcementCategoryName}
                        </Text>
                      </View>
                    </TouchableWithoutFeedback>
                  )}
                />
              </View>
              <View style={{ position: "absolute" }}>
                <TouchableOpacity
                  style={{
                    backgroundColor: "#FFFF",
                    elevation: 1,
                    top: 2,
                    padding: 10,
                    paddingHorizontal: 11,
                  }}
                  onPress={() => setIsEnabled(0)}
                >
                  <FontAwesome5 name="home" size={25} color={"blue"} />
                </TouchableOpacity>
              </View>
            </View>
            {isEnabled == 0 ? (
              <>
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
                      top: 5.7,
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
                <View style={{ backgroundColor: "#fff" }}>
                  <Text
                    style={{
                      fontSize: 20,
                      position: "absolute",
                      color: "black",
                      fontWeight: "700",
                      left: 30,
                      top: 20,
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
                      top: 25,
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
                                navigation.navigate("EventsDetails", {
                                  data: item,
                                })
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
                                  style={{
                                    position: "absolute",
                                    top: 120,
                                    left: 17,
                                  }}
                                >
                                  <Text
                                    style={{
                                      bottom: 20,
                                      left: 20,
                                      color: "#fff",
                                      backgroundColor: "orange",
                                      paddingHorizontal: 10,
                                      borderRadius: 5,
                                      fontSize: 10,
                                    }}
                                  >
                                    {item.category}
                                  </Text>
                                </View>

                                <View
                                  style={{
                                    position: "absolute",
                                    top: 215,
                                    left: 30,
                                  }}
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
                                  <Text
                                    style={{ color: "red", fontWeight: "600" }}
                                  >
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

                              <Text
                                style={{ color: "#fff", top: 30, right: 10 }}
                              >
                                {item.skills[0]},{item.skills[1]}
                              </Text>
                              <Text
                                style={{ color: "#fff", top: 30, right: 10 }}
                              >
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
                              <View
                                style={{
                                  position: "absolute",
                                  top: 125,
                                  left: 10,
                                }}
                              >
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
                      showsHorizontalScrollIndicator={false}
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
                                shadowOffset: {
                                  width: 0,
                                  height: 50,
                                },
                                shadowOpacity: 0.8,
                                shadowRadius: 16.0,
                                elevation: 5,
                              }}
                            >
                              <TouchableWithoutFeedback
                                onPress={() =>
                                  navigation.navigate("Mymatchdata", {
                                    data: item,
                                  })
                                }
                              >
                                <Image
                                  source={{ uri: item.images[0] }}
                                  style={{
                                    width: 150,
                                    height: 170,
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
                                Age: {calculateAge(item.profileId.dateOfBirth)}
                                yrs
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
                                ></Text>
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
                                <Text style={{}}>📍{} </Text>
                              </View>
                            </View>
                          </View>
                        </>
                      )}
                    />
                  </View>
                </View>
              </>
            ) : isEnabled == 1 ? (
              <AnnouncementDetails />
            ) : null}
          </View>
        </ScrollView>
      )}
    </Drawer>
  );
};

export default HomeScreen;
