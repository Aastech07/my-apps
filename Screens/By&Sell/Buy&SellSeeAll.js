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

const BuySellSeeAll = () => {
  const navigation = useNavigation();

  const [apidata, setApiData] = useState([]);

  useEffect(() => {
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

        setApiData(allData);
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
                onPress={() =>
                  navigation.navigate("ByDetalis", { data: item })
                }
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
                      source={{ uri: item.image }}
                      style={{
                        width: "100%", // Take full width of parent
                        aspectRatio: 4 / 5, // Aspect ratio for proper sizing
                        borderRadius: 11,
                        alignSelf: "center",
                        top:5
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
                        bottom:62,
                        right:110
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
                      <Text style={{ fontSize: 10 }}>
                     
                      </Text>
                    
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

export default BuySellSeeAll;
