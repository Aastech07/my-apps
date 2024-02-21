import React from "react";
import { ScrollView, View, Text,StyleSheet } from "react-native";
import {
  responsiveFontSize,
  responsiveHeight,
} from "react-native-responsive-dimensions";
import { useRoute } from "@react-navigation/native";
import { FontAwesome5 } from "@expo/vector-icons";
import { SliderBox } from "react-native-image-slider-box";

const ManageViewDetails = () => {
  const route = useRoute();
  const propertyData = route.params.data;
  return (
    <>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{}}>
        <View style={{ flex: 1, paddingTop: responsiveHeight(1) }}>
          <View
            style={{
              backgroundColor: "#fff",

              shadowColor: "#000",
              shadowOpacity: 0.6,
              shadowRadius: 10,
              elevation: 3,
              paddingBottom: 10,
            }}
          >
            <SliderBox
              images={propertyData.image}
              sliderBoxHeight={200}
              dotColor="#F2f2f2"
              inactiveDotColor="#ffff"
              paginationBoxVerticalPadding={20}
              autoplay
              circleLoop
              resizeMethod={"resize"}
              resizeMode={"cover"}
              paginationBoxStyle={{
                position: "absolute",
                bottom: 0,
                padding: 0,
                alignItems: "center",
                alignSelf: "center",
                justifyContent: "center",
                paddingVertical: 10,
              }}
              dotStyle={{
                width: 8,
                height: 8,
                borderRadius: 5,
                marginHorizontal: 0,
                padding: 0,
                margin: 0,
                backgroundColor: "rgba(128, 128, 128, 0.92)",
              }}
              ImageComponentStyle={{
                width: "97%",
                marginTop: 5,
              }}
              imageLoadingColor="#2196F3"
            />

            <View style={{ paddingHorizontal: 20, paddingTop: 20 }}>
              <Text
                style={{ fontSize: responsiveFontSize(2), fontWeight: "bold" }}
              >
                {propertyData.adTitle}
              </Text>
              <Text style={{ fontSize: responsiveFontSize(2), marginTop: 10 }}>
                {propertyData.description}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 10,
                }}
              >
                <FontAwesome5
                  name="dollar-sign"
                  size={responsiveFontSize(2)}
                  color="black"
                />
                <Text
                  style={{ fontSize: responsiveFontSize(2), marginLeft: 5 }}
                >
                  Price: ${propertyData.price}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 10,
                }}
              >
                <FontAwesome5
                  name="map-marker-alt"
                  size={responsiveFontSize(2)}
                  color="black"
                />
                <Text
                  style={{ fontSize: responsiveFontSize(2), marginLeft: 5 }}
                >
                  Address: {propertyData.address}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 10,
                }}
              >
                <FontAwesome5
                  name="bed"
                  size={responsiveFontSize(2)}
                  color="black"
                />
                <Text
                  style={{ fontSize: responsiveFontSize(2), marginLeft: 5 }}
                >
                  Bedrooms: {propertyData.bedrooms}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 10,
                }}
              >
                <FontAwesome5
                  name="bath"
                  size={responsiveFontSize(2)}
                  color="black"
                />
                <Text
                  style={{ fontSize: responsiveFontSize(2), marginLeft: 5 }}
                >
                  Bathrooms: {propertyData.bathrooms}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 10,
                }}
              >
                <FontAwesome5
                  name="car"
                  size={responsiveFontSize(2)}
                  color="black"
                />
                <Text
                  style={{ fontSize: responsiveFontSize(2), marginLeft: 5 }}
                >
                  Car Parking: {propertyData.carParking}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 10,
                }}
              >
                <FontAwesome5
                  name="couch"
                  size={responsiveFontSize(2)}
                  color="black"
                />
                <Text
                  style={{ fontSize: responsiveFontSize(2), marginLeft: 5 }}
                >
                  Furnishing: {propertyData.furnishing}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 10,
                }}
              >
                <FontAwesome5
                  name="compass"
                  size={responsiveFontSize(2)}
                  color="black"
                />
                <Text
                  style={{ fontSize: responsiveFontSize(2), marginLeft: 5 }}
                >
                  Facing: {propertyData.facing}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 10,
                }}
              >
                <FontAwesome5
                  name="building"
                  size={responsiveFontSize(2)}
                  color="black"
                />
                <Text
                  style={{ fontSize: responsiveFontSize(2), marginLeft: 5 }}
                >
                  Floor No: {propertyData.floorNo}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 10,
                }}
              >
                <FontAwesome5
                  name="map-pin"
                  size={responsiveFontSize(2)}
                  color="black"
                />
                <Text
                  style={{ fontSize: responsiveFontSize(2), marginLeft: 5 }}
                >
                  Landmark: {propertyData.landmark}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 10,
                }}
              >
                <FontAwesome5
                  name="coins"
                  size={responsiveFontSize(2)}
                  color="black"
                />
                <Text
                  style={{ fontSize: responsiveFontSize(2), marginLeft: 5 }}
                >
                  Maintenance Monthly: ${propertyData.maintenanceMonthly}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 10,
                }}
              >
                <FontAwesome5
                  name="ruler-combined"
                  size={responsiveFontSize(2)}
                  color="black"
                />
                <Text
                  style={{ fontSize: responsiveFontSize(2), marginLeft: 5 }}
                >
                  Super Built-up Area: {propertyData.superBuiltupArea} sq. ft.
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 10,
                }}
              >
                <FontAwesome5
                  name="layer-group"
                  size={responsiveFontSize(2)}
                  color="black"
                />
                <Text
                  style={{ fontSize: responsiveFontSize(2), marginLeft: 5 }}
                >
                  Total Floors: {propertyData.totalFloors}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 10,
                }}
              >
                <FontAwesome5
                  name="home"
                  size={responsiveFontSize(2)}
                  color="black"
                />
                <Text
                  style={{ fontSize: responsiveFontSize(2), marginLeft: 5 }}
                >
                  Property Type: {propertyData.propertyType}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 10,
                }}
              >
                <FontAwesome5
                  name="user-tag"
                  size={responsiveFontSize(2)}
                  color="black"
                />
                <Text
                  style={{ fontSize: responsiveFontSize(2), marginLeft: 5 }}
                >
                  Property For: {propertyData.propertyFor}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 10,
                }}
              >
                <FontAwesome5
                  name="ruler"
                  size={responsiveFontSize(2)}
                  color="black"
                />
                <Text
                  style={{ fontSize: responsiveFontSize(2), marginLeft: 5 }}
                >
                  Carpet Area: {propertyData.carpetArea} sq. ft.
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 10,
                }}
              >
                <FontAwesome5
                  name="phone-volume"
                  size={responsiveFontSize(2)}
                  color="black"
                />
                <Text
                  style={{ fontSize: responsiveFontSize(2), marginLeft: 5 }}
                >
                  Contact No: {propertyData.ContactNo}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
     
    </>
  );
};

export default ManageViewDetails;

const styles = StyleSheet.create({

  loginBtn: {
    width: "88%",
    borderRadius: 5,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 50,
    borderWidth:1,
    alignSelf: "center",
    top:7,
    borderColor: "tomato",
    
  },
})
