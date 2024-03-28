import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  BackHandler,
  Alert,
} from "react-native";

import FontAwesome5 from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome5";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, { all } from "axios";
import { useNavigation } from "@react-navigation/native";
import { api } from "./Api";
import AnnouncementDetails from "./Announcement/AnnouncementDetails";
import { Drawer } from "react-native-drawer-layout";
import NavigationView from "./Drawer";
import SkeletonLoader from "./skeletonloader/Skeletonloader";
import { SliderBox } from "react-native-image-slider-box";
import { StatusBar } from "react-native";
import image1 from "../assets/Demoimage.jpeg";
import image2 from "../assets/Demoimage1.jpeg";
import image3 from "../assets/Demoimage2.jpeg";
import { responsiveHeight } from "react-native-responsive-dimensions";
const HomeScreen = () => {
  const Api = api;
  const navigation = useNavigation();
  const { width: screenWidth } = Dimensions.get("window");

  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState();
  const [loading, setLoading] = useState(true);
  const [userid, setUserID] = useState(true);
  const [buysell, setBuysell] = useState("");
  const [Property, setProperty] = useState("");
  const [filteredAnnouncement, setFilteredAnnouncement] = useState([]);

  const responsiveWidth = (percentage) => {
    const width = (percentage * screenWidth) / 100;
    return Math.round(width);
  };

  const fetchData = async () => {
    try {
      // Fetch data from API endpoints
      const accessoriesData = await axios.get(`${api}/accessories`);
      const tabletsData = await axios.get(`${api}/tablets`);
      const electronicsData = await axios.get(`${api}/electronics`);
      const furnitureData = await axios.get(`${api}/furniture`);
      const fashionData = await axios.get(`${api}/fashion`);
      const phonesData = await axios.get(`${api}/phones`);

      // Combine all fetched data into one array
      const allData = [
        ...accessoriesData.data,
        ...tabletsData.data,
        ...electronicsData.data,
        ...furnitureData.data,
        ...fashionData.data,
        ...phonesData.data,
      ];
      const limitedData = allData.slice(0, 6);

      setBuysell(limitedData);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDatas = async () => {
    try {
      // Fetch data from API endpoints
      const properties = await axios.get(`${api}/properties`);
      const pgGuestHouses = await axios.get(`${api}/pgGuestHouses`);
      const landPlots = await axios.get(`${api}/landPlots`);
      const shopOffices = await axios.get(`${api}/shopOffices`);

      const allData = [
        ...properties.data,
        ...pgGuestHouses.data,
        ...landPlots.data,
        ...shopOffices.data,
      ];
      const limitedData = allData.slice(0, 6);

      setProperty(limitedData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchDatas();
    const backAction = () => {
      Alert.alert(
        "Hold on!",
        "Are you sure you want to go back?",
        [
          {
            text: "Cancel",
            onPress: () => null,
            style: "destructive",
          },
          {
            text: "YES",
            onPress: () => BackHandler.exitApp(),
            style: "destructive",
          },
        ],
        { cancelable: false }
      );
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    const getData = async () => {
      try {
        const profileId = await AsyncStorage.getItem("profileid");
       console.warn(profileId)
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

  useEffect(() => {
    const getData = async () => {
      try {
        const userid = await AsyncStorage.getItem("UserID");

        if (userid !== null) {
          const { data } = await axios.get(
            `${Api}/notifications/count/${userid}`
          );

          setUserID(data.count);
        }
      } catch (e) {
        console.log(e);
      }
    };
    getData();
  }, []);

  const [isEnabled, setIsEnabled] = useState(0);
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
  const [allAnnounce, setAllAnnounce] = useState([]);

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
        const announce = await axios.get(`${api}/announcements`, {});
        //       setAnnouncement(data);
        setAllAnnounce(announce.data);
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

  useEffect(() => {
    const getProperties = async () => {
      try {
        const { data } = await axios.get(`${api}/properties`, {});
        // setData(data);
      } catch (error) {
        console.log(error);
      } finally {
        // setLoading(false);
      }
    };
    getProperties();
  }, []);

  const typeHandler = (value) => {
    const filteredDate = allAnnounce.filter((e) => {
      return value.toLowerCase().includes(e.announcementType.toLowerCase());
    });
    setFilteredAnnouncement(filteredDate);
  };

  const images = [image1, image2, image3];

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
          <StatusBar
            style="auto"
            barStyle="light-content"
            backgroundColor={"#874d3b"}
          />
          <View
            style={{
              backgroundColor: "#874d3b",
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
                backgroundColor: "#874d3b",
                paddingHorizontal: 7,
                paddingVertical: 5,
              }}
              onPress={() => navigation.navigate("Notification")}
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
                backgroundColor: "#874d3b",
                paddingHorizontal: 6,
                paddingVertical: 5,
              }}
            />
            {userid !== null && userid !== 0 ? (
              <Text
                style={{
                  position: "absolute",
                  fontSize: 15,
                  top: 45,
                  left: responsiveWidth(91.8),
                  backgroundColor: "red",
                  padding: 0,
                  borderRadius: 50,
                  paddingHorizontal: 5,
                  color: "#fff",
                }}
                onPress={() => navigation.navigate("Notification")}
              >
                {userid}
              </Text>
            ) : null}

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
                    <TouchableWithoutFeedback
                      onPress={() => {
                        setIsEnabled(1);
                        typeHandler(item.announcementCategoryName);
                      }}
                    >
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
                    bottom: 0,
                  }}
                >
                  <SliderBox
                    images={images || []}
                    sliderBoxHeight={180}
                    dotColor="#F2f2f2"
                    inactiveDotColor="#ffff"
                    paginationBoxVerticalPadding={20}
                    autoplay
                    circleLoop
                    resizeMethod={"resize"}
                    resizeMode={"cover"}
                    paginationBoxStyle={{
                      bottom: 0,
                      padding: 0,
                      alignItems: "center",
                      alignSelf: "center",
                      justifyContent: "center",
                    }}
                    dotStyle={{
                      width: 7,
                      height: 7,
                      borderRadius: 5,
                      marginHorizontal: 0,
                      padding: 0,
                      margin: 0,
                      top: 10,
                    }}
                    ImageComponentStyle={{
                      width: "100%",
                    }}
                    imageLoadingColor="#2196F3"
                  />
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
                    onPress={() => navigation.navigate("Events")}
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
                                  elevation: 6,
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
                                    right: responsiveWidth(10), // Adjust the percentage as needed
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
                                    top: 180,
                                    left: 10,
                                  }}
                                >
                                  <Text
                                    style={{
                                      fontSize: 12,
                                      marginLeft: 5,
                                      marginRight: 5,
                                    }}
                                  >
                                    📍{item.address}
                                  </Text>
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
                      onPress={() => navigation.navigate("jobs")}
                    >
                      See All ➤
                    </Text>

                    <FlatList
                      style={{ marginTop: 100, left: 10 }}
                      horizontal
                      data={details}
                      showsHorizontalScrollIndicator={false}
                      keyExtractor={(item, index) => index.toString()} // Add keyExtractor
                      renderItem={({ item }) => (
                        <TouchableWithoutFeedback
                          onPress={() =>
                            navigation.navigate("JobsDetails", { data: item })
                          }
                        >
                          <View
                            style={{
                              backgroundColor: "#ffff",
                              width: 200, // Set desired width
                              height: 200, // Set desired height
                              borderRadius: 20,
                              marginHorizontal: 10,
                              padding: 15,
                              shadowColor: "#000",
                              shadowOffset: {
                                width: 0,
                                height: 2,
                              },
                              shadowOpacity: 0.8,
                              shadowRadius: 16.0,
                              elevation: 6,
                              marginBottom: 10,
                              top: 2,
                            }}
                          >
                            <Image
                              source={{ uri: item.images[0] }}
                              style={{
                                width: "40%",
                                height: 50,
                                borderRadius: 8,
                                marginBottom: 10,
                              }}
                            />

                            <Text
                              style={{
                                color: "#000",
                                fontSize: 16,
                                fontWeight: "bold",
                              }}
                            >
                              {item.title}
                            </Text>
                            <Text
                              style={{
                                color: "#000",
                                fontSize: 14,
                                marginBottom: 5,
                              }}
                            >
                              {item.company}
                            </Text>
                            <Text style={{ color: "#000", fontSize: 12 }}>
                              📍 {item.location}
                            </Text>
                            <Text style={{ color: "#000", fontSize: 12 }}>
                              {item.salary}
                            </Text>
                            <View
                              style={{ flexDirection: "row", marginTop: 5 }}
                            >
                              <View
                                style={{
                                  backgroundColor: "#f2f2f2",
                                  paddingHorizontal: 8,
                                  borderRadius: 20,
                                  marginRight: 5,
                                }}
                              >
                                <Text style={{ color: "#0F2167" }}>
                                  {item.employmentType}
                                </Text>
                              </View>
                              <View
                                style={{
                                  backgroundColor: "#f2f2f2",
                                  paddingHorizontal: 8,
                                  borderRadius: 20,
                                }}
                              >
                                <Text style={{ color: "#0F2167" }}>
                                  {item.experienceLevel}
                                </Text>
                              </View>
                            </View>
                          </View>
                        </TouchableWithoutFeedback>
                      )}
                    />

                    <View style={{ top: 210, position: "absolute" }}>
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
                        onPress={() => navigation.navigate("matrimonys")}
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
                                shadowColor: "#000",
                                shadowOffset: {
                                  width: 0,
                                  height: 50,
                                },
                                shadowOpacity: 0.8,
                                shadowRadius: 16.0,
                                elevation: 6,
                              }}
                            >
                              <TouchableWithoutFeedback
                                onPress={() =>
                                  navigation.navigate("MatrimonyData", {
                                    data: item,
                                  })
                                }
                              >
                                <Image
                                  source={{ uri: item.images[0] }}
                                  style={{
                                    width: 200,
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
                                {item.profileId.firstName}{" "}
                                {item.profileId.lastName}
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
                                >
                                  {item.profileId.maritalStatus}
                                </Text>
                              </View>

                              <View
                                style={{
                                  position: "absolute",
                                  top: 150,
                                  left: 120,
                                  backgroundColor: "#fff",
                                  paddingHorizontal: 4,
                                  paddingVertical: 1,
                                  borderRadius: 10,
                                }}
                              >
                                <Text style={{}}>
                                  📍{item.profileId.address.country}
                                </Text>
                              </View>
                            </View>
                          </View>
                        </>
                      )}
                    />

                    <View style={{ top: 500, position: "absolute" }}>
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
                        Buy & sell
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
                        onPress={() => navigation.navigate("BuySellSeeAll")}
                      >
                        See All ➤
                      </Text>
                    </View>
                    <FlatList
                      style={{ top: 80 }}
                      pagingEnabled
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      data={buysell}
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
                                elevation: 6,
                              }}
                            >
                              <TouchableWithoutFeedback
                                onPress={() =>
                                  navigation.navigate("ByDetalis", {
                                    data: item,
                                  })
                                }
                              >
                                <Image
                                  source={{ uri: item.image }}
                                  style={{
                                    width: 200,
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
                                  right: 20,
                                  marginTop: 25,
                                  fontWeight: "600",
                                  position: "absolute",
                                }}
                              >
                                {item.adTitle}
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
                                    color: "green",
                                    fontSize: 10,
                                  }}
                                >
                                  ₹{item.price}
                                </Text>
                              </View>

                              <View
                                style={{
                                  position: "absolute",
                                  top: 150,
                                  left: 140,
                                  backgroundColor: "#fff",
                                  paddingHorizontal: 4,
                                  paddingVertical: 1,
                                  borderRadius: 10,
                                }}
                              >
                                <Text style={{}}>
                                  📍{item.profileId.address.country}
                                </Text>
                              </View>
                            </View>
                          </View>
                        </>
                      )}
                    />

                    <View
                      style={{
                        top: responsiveHeight(110),
                        position: "absolute",
                      }}
                    >
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
                        Property
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
                        onPress={() => navigation.navigate("PropertySeeAll")}
                      >
                        See All ➤
                      </Text>
                    </View>

                    <FlatList
                      style={{ top: 100, marginBottom: 50 }}
                      pagingEnabled
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      data={Property}
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
                                elevation: 6,
                              }}
                            >
                              <TouchableWithoutFeedback
                                onPress={() =>
                                  navigation.navigate("Details", { data: item })
                                }
                              >
                                <Image
                                  source={{
                                    uri:
                                      item.image && item.image.length > 0
                                        ? item.image[0]
                                        : null,
                                  }}
                                  style={{
                                    width: 200,
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
                                  right: 15,
                                  marginTop: 25,
                                  fontWeight: "600",
                                  position: "absolute",
                                }}
                              >
                                {item.adTitle}
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
                                    color: "green",
                                    fontSize: 10,
                                  }}
                                >
                                  ₹{item.price}
                                </Text>
                              </View>

                              <View
                                style={{
                                  position: "absolute",
                                  top: 150,
                                  left: 140,
                                  backgroundColor: "#fff",
                                  paddingHorizontal: 4,
                                  paddingVertical: 1,
                                  borderRadius: 10,
                                }}
                              >
                                <Text style={{}}>
                                  📍{item.profileId.address.country}
                                </Text>
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
              <AnnouncementDetails announce={filteredAnnouncement} />
            ) : null}
          </View>
        </ScrollView>
      )}
    </Drawer>
  );
};

export default HomeScreen;
