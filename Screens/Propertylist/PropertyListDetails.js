import React, { useEffect, useState, useRef } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Share,
  Dimensions,
} from "react-native";
import {
  responsiveFontSize,
  responsiveHeight,
} from "react-native-responsive-dimensions";
import { useRoute } from "@react-navigation/native";
import { FontAwesome5 } from "@expo/vector-icons";
import { SliderBox } from "react-native-image-slider-box";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { api } from "../Api";
const PropertyListDetails = () => {
  const route = useRoute();
  const propertyData = route.params?.data;
  const productId = propertyData?._id;
  const scrollViewRef = useRef();
  const [properties, setProperties] = useState(null);
  const [landplots, setLandplots] = useState(null);
  const [pgguesthouses, setPgguesthouses] = useState(null);
  const [shopoffices, setTshopoffices] = useState(null);
  const [filteredData, setFilteredData] = useState("");
  const [profileid, setProfileID] = useState("");

  useEffect(() => {
    // Only update properties if propertyData.properties is truthy and properties is not already set
    if (propertyData.properties && !properties) {
      setProperties("Property");
    }
    if (propertyData.landplots && !landplots) {
      setLandplots("LandPlot");
    }
    if (propertyData.pgguesthouses && !pgguesthouses) {
      setPgguesthouses("PgGuestHouse");
    }
    if (propertyData.shopoffices && !shopoffices) {
      setTshopoffices("ShopOffice");
    }
  }, [
    propertyData.properties,
    properties,
    propertyData.landplots,
    landplots,
    propertyData.pgguesthouses,
    pgguesthouses,
    propertyData.shopoffices,
    shopoffices,
  ]);

  const onShare = async () => {
    try {
      const message = `Check out this property:
      Title: ${propertyData?.adTitle}
      Description: ${propertyData?.description}
      Price: $${propertyData?.price}
      Image: ${propertyData?.image[0]}`;

      const result = await Share.share({
        message: message,
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  useEffect(() => {
    const storeData = async () => {
      try {
        const value = await AsyncStorage.getItem("profileid");
        const UserID = await AsyncStorage.getItem("UserID");
        setProfileID(value);
          
        const { data } = await axios.get(`${api}/getCartItems`);

        const filtered = data.filter(
          (item) => item.productId?._id === productId
        );
    
        const userFilter = filtered.filter(
          (item) => item.buyerProfileId?.userId === UserID
        );

        //   console.warn({userFilter});
        setFilteredData(userFilter);
      } catch (error) {
        console.error(error);
      }
    };

    storeData();
  }, [api, productId]);

  const Cart = async () => {
    try {
      const { data } = await axios.post(`${api}/addToCart`, {
        buyerProfileId: profileid,
        productId: productId,
        productModel: properties || landplots || pgguesthouses || shopoffices,
      });
      console.warn(data);
    } catch (error) {
      console.error(error);
    }
  };
  const handleScrollToTop = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  };

  return (
    <>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{}}
       
      >
        <View style={{ flex: 1, paddingTop: responsiveHeight(1) }}>
          <View style={styles.propertyContainer}>
            <SliderBox
              images={propertyData.image || []}
              sliderBoxHeight={Dimensions.get("window").width} // Adjust to screen width
              dotColor="#F2f2f2"
              inactiveDotColor="#ffff"
              paginationBoxVerticalPadding={20}
              autoplay
              circleLoop
              resizeMethod="resize"
              resizeMode="cover"
              paginationBoxStyle={styles.sliderPagination}
              dotStyle={styles.sliderDot}
              ImageComponentStyle={styles.sliderImage}
              imageLoadingColor="#2196F3"
            />

            <TouchableOpacity onPress={() => onShare()}>
              <FontAwesome5Icon
                name={"share-alt"}
                style={{
                  left: 320,
                  position: "absolute",
                  bottom: responsiveHeight(45),
                }}
                size={23}
                color={"#fff"}
              />
              
            </TouchableOpacity>

            <View style={styles.propertyDetails}>
              <Text
                style={{
                  fontSize: responsiveFontSize(2.5),
                  fontWeight: "bold",
                  marginBottom: 20,
                }}
              >
                {propertyData.adTitle}
              </Text>

          
              <View
                style={{
                  width: "100%",
                  marginBottom: 15,
                  flexDirection: "row",
                  alignItems: "center",
                  borderBottomWidth: 1,
                  borderBottomColor: "#ddd",
                  paddingBottom: 10,
                }}
              >
                <FontAwesome5
                  name="map-marker-alt"
                  size={responsiveFontSize(2)}
                  color="#e74c3c" // red color
                />
                <Text style={styles.gridText}>
                  Address: {propertyData.address}
                </Text>
              </View>

              <View
                style={{
                  width: "100%",
                  marginBottom: 15,
                  flexDirection: "row",
                  alignItems: "center",
                  borderBottomWidth: 1,
                  borderBottomColor: "#ddd",
                  paddingBottom: 10,
                }}
              >
                <FontAwesome5
                  name="map-pin"
                  size={responsiveFontSize(2)}
                  color="#27ae60" // emerald color
                />
                <Text style={styles.gridText}>
                  Landmark: {propertyData.landmark}
                </Text>
              </View>

              <View
                style={{
                  width: "100%",
                  marginBottom: 15,
                  flexDirection: "row",
                  alignItems: "center",
                  borderBottomWidth: 1,
                  borderBottomColor: "#ddd",
                  paddingBottom: 10,
                }}
              >
                <FontAwesome5
                  name="ruler-combined"
                  size={responsiveFontSize(2)}
                  color="#8e44ad" // amethyst color
                />
                <Text style={styles.gridText}>
                  Super Built-up Area: {propertyData.superBuiltupArea} sq. ft.
                </Text>
              </View>

              <View
                style={{
                  width: "100%",
                  marginBottom: 15,
                  flexDirection: "row",
                  alignItems: "center",
                  borderBottomWidth: 1,
                  borderBottomColor: "#ddd",
                  paddingBottom: 10,
                }}
              >
                <FontAwesome5
                  name="home"
                  size={responsiveFontSize(2)}
                  color="#27ae60" // emerald color
                />
                <Text style={styles.gridText}>
                  Property Type: {propertyData.propertyType}
                </Text>
              </View>

              <View style={styles.gridContainer}>
                <View style={styles.gridItem}>
                  <FontAwesome5
                    name="dollar-sign"
                    size={responsiveFontSize(2)}
                    color="#3498db" // blue color
                  />
                  <Text style={styles.gridText}>
                    Price: ${propertyData.price}
                  </Text>
                </View>

                <View style={styles.gridItem}>
                  <FontAwesome5
                    name="bed"
                    size={responsiveFontSize(2)}
                    color="#2ecc71" // green color
                  />
                  <Text style={styles.gridText}>
                    Bedrooms: {propertyData.bedrooms}
                  </Text>
                </View>
                {/* Add more property details */}
                <View style={styles.gridItem}>
                  <FontAwesome5
                    name="bath"
                    size={responsiveFontSize(2)}
                    color="#9b59b6" // purple color
                  />
                  <Text style={styles.gridText}>
                    Bathrooms: {propertyData.bathrooms}
                  </Text>
                </View>
                <View style={styles.gridItem}>
                  <FontAwesome5
                    name="car"
                    size={responsiveFontSize(2)}
                    color="#f39c12" // orange color
                  />
                  <Text style={styles.gridText}>
                    Car Parking: {propertyData.carParking}
                  </Text>
                </View>
                <View style={styles.gridItem}>
                  <FontAwesome5
                    name="couch"
                    size={responsiveFontSize(2)}
                    color="#e67e22" // dark orange color
                  />
                  <Text style={styles.gridText}>
                    Furnishing: {propertyData.furnishing}
                  </Text>
                </View>
                {/* Add more property details */}
                <View style={styles.gridItem}>
                  <FontAwesome5
                    name="compass"
                    size={responsiveFontSize(2)}
                    color="#1abc9c" // teal color
                  />
                  <Text style={styles.gridText}>
                    Facing: {propertyData.facing}
                  </Text>
                </View>
                <View style={styles.gridItem}>
                  <FontAwesome5
                    name="building"
                    size={responsiveFontSize(2)}
                    color="#3498db" // blue color
                  />
                  <Text style={styles.gridText}>
                    Floor No: {propertyData.floorNo}
                  </Text>
                </View>
                {/* Add more property details */}
                <View style={styles.gridItem}>
                  <FontAwesome5
                    name="map-pin"
                    size={responsiveFontSize(2)}
                    color="#27ae60" // emerald color
                  />
                  <Text style={styles.gridText}>
                    Landmark: {propertyData.landmark}
                  </Text>
                </View>
                <View style={styles.gridItem}>
                  <FontAwesome5
                    name="coins"
                    size={responsiveFontSize(2)}
                    color="#f39c12" // orange color
                  />
                  <Text style={styles.gridText}>
                    Maintenance Monthly: ${propertyData.maintenanceMonthly}
                  </Text>
                </View>

                {/* Add more property details */}
                <View style={styles.gridItem}>
                  <FontAwesome5
                    name="layer-group"
                    size={responsiveFontSize(2)}
                    color="#3498db" // blue color
                  />
                  <Text style={styles.gridText}>
                    Total Floors: {propertyData.totalFloors}
                  </Text>
                </View>

                {/* Add more property details */}
                <View style={styles.gridItem}>
                  <FontAwesome5
                    name="user-tag"
                    size={responsiveFontSize(2)}
                    color="#1abc9c" // teal color
                  />
                  <Text style={styles.gridText}>
                    Property For: {propertyData.propertyFor}
                  </Text>
                </View>
                <View style={styles.gridItem}>
                  <FontAwesome5
                    name="ruler"
                    size={responsiveFontSize(2)}
                    color="#f39c12" // orange color
                  />
                  <Text style={styles.gridText}>
                    Carpet Area: {propertyData.carpetArea} sq. ft.
                  </Text>
                </View>
                <View style={styles.gridItem}>
                  <FontAwesome5
                    name="phone-volume"
                    size={responsiveFontSize(2)}
                    color="#2c3e50" // dark blue color
                  />
                  <Text style={styles.gridText}>
                    Contact No: {propertyData.ContactNo}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      <View
        style={{ paddingBottom: 17, elevation: 3, backgroundColor: "#fff" }}
      >
        {filteredData.length === 0 ? (
          <TouchableOpacity style={styles.loginBtn} onPress={Cart}>
            <Text style={{ color: "tomato", fontSize: 18, fontWeight: "500" }}>
              I am Interested
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.loginBtn1}>
            <Text style={{ color: "#f2f2f2", fontSize: 18, fontWeight: "500" }}>
              I am Interested
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </>
  );
};

export default PropertyListDetails;

const styles = StyleSheet.create({
  loginBtn: {
    width: "88%",
    borderRadius: 5,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 50,
    borderWidth: 1,
    alignSelf: "center",
    top: 7,
    borderColor: "tomato",
  },
  loginBtn1: {
    width: "88%",
    borderRadius: 5,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 50,
    borderWidth: 1,
    alignSelf: "center",
    top: 7,
    borderColor: "#f2f2f2",
  },

  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    paddingVertical: 20,
  },
  propertyContainer: {
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    bottom: 15,
  },
  sliderPagination: {
    position: "absolute",
    bottom: 0,
    padding: 0,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    paddingVertical: 10,
  },
  sliderDot: {
    width: 8,
    height: 8,
    borderRadius: 5,
    marginHorizontal: 0,
    padding: 0,
    margin: 0,
    backgroundColor: "rgba(128, 128, 128, 0.92)",
  },
  sliderImage: {
    width: "100%",
    height: Dimensions.get("window").width, // Adjust to screen width
  },
  propertyDetails: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: responsiveFontSize(2.5),
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  gridItem: {
    width: "48%",
    marginBottom: 15,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingBottom: 10,
  },
  gridText: {
    fontSize: responsiveFontSize(2),
    marginLeft: 10,
  },
  interestedProfileItem: {
    padding: 10,
    backgroundColor: "#f9f9f9",
    marginBottom: 10,
    borderRadius: 5,
  },
  interestedProfileName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  interestedProfileDetails: {
    fontSize: 14,
    marginBottom: 3,
  },
});
