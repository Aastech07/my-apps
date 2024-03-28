import React from "react";
import { ScrollView, View, Text, StyleSheet } from "react-native";
import {
  responsiveFontSize,
  responsiveHeight,
} from "react-native-responsive-dimensions";
import { useRoute } from "@react-navigation/native";
import { FontAwesome5 } from "@expo/vector-icons";
import { SliderBox } from "react-native-image-slider-box";

const ManageViewDetail = () => {
  const route = useRoute();
  const propertyData = route.params.data;
  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.sliderContainer}>
          <SliderBox
            images={
              Array.isArray(propertyData.images) ? propertyData.images : []
            }
            sliderBoxHeight={200}
            dotColor="#F2f2f2"
            inactiveDotColor="#ffff"
            paginationBoxVerticalPadding={20}
            autoplay
            circleLoop
            resizeMethod={"resize"}
            resizeMode={"cover"}
            paginationBoxStyle={styles.paginationBox}
            dotStyle={styles.dotStyle}
            ImageComponentStyle={styles.imageComponentStyle}
            imageLoadingColor="#2196F3"
          />
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.title}>
            <FontAwesome5 name="info-circle" style={[styles.icon]} />
            {propertyData.adTitle}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: responsiveHeight(1),
  },
  sliderContainer: {
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.6,
    shadowRadius: 10,
    elevation: 3,
    paddingBottom: 10,
  },
  paginationBox: {
    position: "absolute",
    bottom: 0,
    padding: 0,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    paddingVertical: 10,
  },
  dotStyle: {
    width: 8,
    height: 8,
    borderRadius: 5,
    marginHorizontal: 0,
    padding: 0,
    margin: 0,
    backgroundColor: "rgba(128, 128, 128, 0.92)",
  },
  imageComponentStyle: {
    width: "97%",
    marginTop: 5,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: responsiveFontSize(2),
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  description: {
    fontSize: responsiveFontSize(2),
    marginBottom: 10,
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingBottom: 10,
  },
  icon: {
    fontSize: responsiveFontSize(2),
    color: "black",
    marginRight: 5,
  },
  infoText: {
    fontSize: responsiveFontSize(2),
  },
});

export default ManageViewDetail;
