import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableWithoutFeedback,
} from "react-native";
import { responsiveWidth } from "react-native-responsive-dimensions";
import { ScrollView } from "react-native-virtualized-view";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { api } from "../Api";

const PropertySeeAll = () => {
  const navigation = useNavigation();

  const [apidata, setApiData] = useState([]);

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

      setApiData(allData);
      console.warn(limitedData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDatas();
  }, []);


  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#fff" }}
      contentContainerStyle={{ paddingBottom: 90 }}
    >
      <View style={{ bottom: 40 }}>
        <View style={{ flex: 1 }}>
          <FlatList
            style={{ top: 50 }}
            data={apidata}
            numColumns={2}
            renderItem={({ item }) => (
              <TouchableWithoutFeedback
                onPress={() => navigation.navigate("Details", { data: item })}
              >
                <View
                  style={{
                    marginLeft: responsiveWidth(3),
                    paddingBottom: 20,
                    top: 10,
                    width: responsiveWidth(45), // Set width for each item
                    alignItems: "center", // Center items horizontally
                  }}
                >
                  <View
                    style={{
                      backgroundColor: "#fff",
                      borderRadius: 20,
                      shadowColor: "#000",
                      shadowOffset: {
                        width: 0,
                        height: 50,
                      },
                      shadowOpacity: 0.8,
                      shadowRadius: 16.0,
                      elevation: 4,
                      paddingHorizontal: responsiveWidth(2),
                      width: "100%", // Make sure the box takes full width
                    }}
                  >
                    <Image
                      source={{
                        uri:
                          item.image && item.image.length > 0
                            ? item.image[0]
                            : null,
                      }}
                      style={{
                        width: "100%", // Take full width of parent
                        aspectRatio: 4 / 5, // Aspect ratio for proper sizing
                        borderRadius: 11,
                        alignSelf: "center",
                        top: 5,
                      }}
                      resizeMode="cover" // Adjust image content mode
                    />
                    <Text
                      style={{
                        fontSize: 12,
                        marginTop: 10,
                        fontWeight: "600",
                        textAlign: "center",
                      }}
                      numberOfLines={2} // Limit to 2 lines
                    >
                      {item.adTitle}
                    </Text>
                    <Text
                      style={{
                        fontWeight: "600",
                        color: "green",
                        fontSize: 10,
                        position: "absolute",
                        backgroundColor: "#fff",
                        paddingHorizontal: 4,
                        paddingVertical: 1,
                        borderRadius: 10,
                        bottom: 62,
                        right: 110,
                      }}
                    >
                      ₹{item.price}
                    </Text>

                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                        marginTop: 5,
                      }}
                    >
                      <Text style={{ fontSize: 10 }}></Text>
                    </View>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            )}
            keyExtractor={(item, index) => index.toString()}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: responsiveWidth(2),
              paddingTop: 10,
            }}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default PropertySeeAll;
