import React, { useEffect, useState, useRef } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from "react-native";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { useRoute, useScrollToTop } from "@react-navigation/native";
import { FontAwesome5 } from "@expo/vector-icons";
import { SliderBox } from "react-native-image-slider-box";
import axios from "axios";
import { api } from "../Api";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";

const ManageViewDetails = () => {
  const route = useRoute();
  const propertyData = route.params?.data;
  const productId = propertyData?._id;

  const scrollViewRef = useRef();
  const [filteredData, setFilteredData] = useState([]);
  console.warn(filteredData);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${api}/getCartItems`);

        const filtered = data.filter(
          (item) => item.productId?._id === productId
        );
        setFilteredData(filtered);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [productId]);

  const handleScrollToTop = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.interestedProfileItem}>
      <Text style={styles.interestedProfileName}>
        {item.buyerProfileId.firstName} {item.buyerProfileId.lastName}
      </Text>
      <Text style={styles.interestedProfileDetails}>
        Profession: {item.buyerProfileId.profession}
      </Text>
      <Text style={styles.interestedProfileDetails}>
        Profession: {item.buyerProfileId.userId.phone}
      </Text>
    </View>
  );

  return (
    <ScrollView
      ref={scrollViewRef}
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
    >
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
              alignItems: "flex-end",
              right: 20,
              top: 20,
              position: "absolute",
            }}
          >
            <TouchableOpacity onPress={() => handleScrollToTop()}>
              <Text style={{}}>View Profile</Text>
            </TouchableOpacity>
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
              name="map-marker-alt"
              size={responsiveFontSize(2)}
              color="#e74c3c" 
            />
            <Text style={styles.gridText}>Address: {propertyData.address}</Text>
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
              <Text style={styles.gridText}>Price: ${propertyData.price}</Text>
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

            {/* Add more property details */}
            <View style={styles.gridItem}>
              <FontAwesome5
                name="compass"
                size={responsiveFontSize(2)}
                color="#1abc9c" // teal color
              />
              <Text style={styles.gridText}>Facing: {propertyData.facing}</Text>
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

          <Text style={{ fontSize: 17, fontWeight: "400", marginTop: 20 }}>
            Interested Profile
          </Text>
          <FlatList
            scrollEnabled={false}
            data={filteredData}
            renderItem={renderItem}
            keyExtractor={(item) => item._id}
            style={{ marginTop: 10 }}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default ManageViewDetails;

const styles = StyleSheet.create({
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
