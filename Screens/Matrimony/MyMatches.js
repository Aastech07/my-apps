import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  FlatList,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import {
  responsiveWidth,
  responsiveHeight,
} from "react-native-responsive-dimensions";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { ScrollView } from "react-native-virtualized-view";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { api } from "../Api";
import Animated, { FadeInLeft, FadeInRight } from "react-native-reanimated";
import SearchBar from "react-native-dynamic-search-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";

const MyMatches = () => {
  const Api = api;
  const navigation = useNavigation();
  const [apidata, setApiData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [location, setLocation] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${Api}/matrimonial/profiles`);
        const loc = await AsyncStorage.getItem("location");
        setLocation(loc);
        setApiData(data);
        setFilteredData(data);
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

  const searchObject = (obj, searchData) => {
    return Object.values(obj).some((value) => {
      if (value === null || value === undefined) {
        return false;
      }
      if (typeof value === "string") {
        return value.toLowerCase().includes(searchData);
      }
      if (Array.isArray(value)) {
        return value.some((item) => item.toLowerCase().includes(searchData));
      }
      if (typeof value === "object") {
        return searchObject(value, searchData);
      }
      return false;
    });
  };

  const handleSearch = (searchValue) => {
    setSearchInput(searchValue);
    const filtered = apidata.filter((element) => {
      const searchData = searchValue.toLowerCase();
      return Object.values(element).some((value) => {
        if (typeof value === "string") {
          return value.toLowerCase().includes(searchData);
        }
        if (Array.isArray(value)) {
          return value.some((item) => item.toLowerCase().includes(searchData));
        }
        if (typeof value === "object") {
          return searchObject(value, searchData);
        }
        return false;
      });
    });
    setFilteredData(filtered);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={styles.header}>
        <SearchBar
          style={styles.searchBar}
          placeholder="Search here"
          onChangeText={handleSearch}
          onClearPress={() => setFilteredData(apidata)}
          value={searchInput}
        />
        <TouchableOpacity
          onPress={() => handleSearch(location)}
          style={styles.mapButton}
        >
          <FontAwesome5 name="map-pin" size={20} color="black" />
        </TouchableOpacity>
      </View>

      <ScrollView style={{}}>
        <View style={{ flex: 1, marginBottom: 100 }}>
          <FlatList
            data={filteredData}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <TouchableWithoutFeedback
                onPress={() =>
                  navigation.navigate("MatrimonyData", { data: item })
                }
              >
                <View style={styles.profileCard}>
                  <Image
                    source={{ uri: item.images[0] }}
                    style={styles.profileImage}
                  />
                  <Animated.View
                    entering={FadeInLeft.duration(500).damping()}
                    style={styles.profileDetails}
                  >
                    <Text style={styles.profileName}>
                      {item.profileId.firstName} {item.profileId.lastName}
                    </Text>
                    <Text style={styles.profileAge}>
                      {calculateAge(item.profileId.dateOfBirth)} yrs,{" "}
                      {item.height}
                    </Text>
                 
                  </Animated.View>
                </View>
              </TouchableWithoutFeedback>
            )}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default MyMatches;

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#ffff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0.5 },
    shadowOpacity: 0.6,
    shadowRadius: 10,
    elevation: 2,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  searchBar: {
    flex: 1,
  },
  mapButton: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    paddingHorizontal: 23,
    elevation: 5,
  },
  profileCard: {
    alignSelf: "center",
    shadowColor: "black",
    shadowOpacity: 0.9,
    shadowRadius: 50,
    elevation: 20,
    marginTop: 18,
  },
  profileImage: {
    width: responsiveWidth(90),
    height: responsiveHeight(60),
    borderRadius: 10,
    alignSelf: "center",
  },
  profileDetails: {
    position: "absolute",
    left: responsiveWidth(13),
    bottom: responsiveHeight(15),
  },
  profileName: {
    fontWeight: "600",
    fontSize: 16,
    color: "#f2f2f2",
    marginBottom: 5,
  },
  profileAge: {
    fontWeight: "600",
    fontSize: 14,
    color: "#f2f2f2",
  },
});
