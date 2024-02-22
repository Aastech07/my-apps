import React, { useEffect, useState, useRef } from "react";
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
const MatrimonySeeAll = () => {
  const Api = api;
  const navigation = useNavigation();
  const drawer = useRef(null);
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

  const [apidata, setApiData] = useState("");
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`${Api}/matrimonial/profiles`);
        setApiData(data);
      } catch (error) {
        console.log(error);
      }
    })();
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
              <>
                <View
                  key={item.id}
                  style={{
                    marginLeft: responsiveWidth(5),
                    paddingBottom: 20,
                    top: 10,
                  }}
                >
                  <TouchableWithoutFeedback
                    onPress={() =>
                      navigation.navigate("Mymatchdata", { data: item })
                    }
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
                        alignSelf: "center",
                        paddingHorizontal: responsiveWidth(2),
                        right: responsiveWidth(3),
                      }}
                    >
                      <Image
                        source={{ uri: item.images[0] }}
                        style={{
                          width: 150,
                          height: 170,
                          bottom: 52,
                          marginTop: 60,
                          borderRadius: 10,
                          alignSelf: "center",
                        }}
                      />
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
                          {item.profileId.maritalStatus}
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
                        <Text style={{}}>
                          📍{item.profileId.address.country}
                        </Text>
                      </View>
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              </>
            )}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default MatrimonySeeAll;
