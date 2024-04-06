import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import axios from "axios";
import * as Location from "expo-location";
const LonLat = async () => {
  try {
    let data = await Location.requestForegroundPermissionsAsync();
    if (data.status !== "granted") {
      console.log("Permission to access location was denied");
      return;
    }
    const { coords } = await Location.getCurrentPositionAsync({});
    const location = { longitude: coords.longitude, latitude: coords.latitude };
    return location;
  } catch (error) {
    console.log(error);
  }
  return;
};

export const GeoLocation = async () => {
  let loc;
  const lonlat = await LonLat();
  try {
    const { data } = await axios.get(
      `https://api.openweathermap.org/geo/1.0/reverse?lat=${lonlat.latitude}&lon=${lonlat.longitude}&limit=1&appid=18ec223fd958f8825740ea82bcf3a994` // to get city name
    );
    if (data && data[0].name) {
      loc = data[0].name;
    } else {
      loc = "Address not found";
    }
  } catch (error) {
    console.error("Error getting user location:", error);
  }
  return loc;
};
