import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import axios from "axios";
import FontAwesome from "react-native-vector-icons/FontAwesome5";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { TouchableWithoutFeedback } from "react-native";
import Recruiter from "./Recruiter";
import { api } from "./Api";
import { Drawer } from "react-native-drawer-layout";
import NavigationView from "./Drawer";
import SearchBar from "react-native-dynamic-search-bar";
import { ScrollView } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";

const JobsScreen = () => {
  const [datas, setData] = useState([]);
  const navigation = useNavigation();
  const [filteredData, setFilteredData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [userid, setUserID] = useState(true);
  const [location, setLocation] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        const userid = await AsyncStorage.getItem("UserID");
        const loc = await AsyncStorage.getItem("location");
        setLocation(loc);
        if (userid !== null) {
          const { data } = await axios.get(
            `${api}/notifications/count/${userid}`
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
  const [open, setOpen] = React.useState(false);

  const GetData = async () => {
    try {
      const response = await axios.get(`${api}/jobs`);
      if (response && response.data) {
        setData(response.data);
        setFilteredData(response.data);
      }
    } catch (err) {
      console.log("error: ", err.message);
    }
  };

  useEffect(() => {
    GetData();
  }, []);


  useEffect(() => {
    const filteredData = datas.filter((item) =>
      item.title.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredData(filteredData);
  }, []);


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
    setSearchText(searchValue);
    const filtered = datas.filter((element) => {
      // Convert all values to lower case for case-insensitive search
      const searchData = searchValue.toLowerCase();
      // Check if any property of the element contains the search value
      return Object.values(element).some((value) => {
        if (typeof value === "string") {
          return value.toLowerCase().includes(searchData);
        }
        // If value is an array, check if any item in the array matches the search value
        if (Array.isArray(value)) {
          return value.some((item) => item.toLowerCase().includes(searchData));
        }
        // If value is an object, recursively check its properties
        if (typeof value === "object") {
          return searchObject(value, searchData);
        }
        // Otherwise, return false
        return false;
      });
    });
    setFilteredData(filtered);
  };


  const renderMealItem1 = ({ item }) => (
    <View style={styles.mealItemContainer}>
      <TouchableWithoutFeedback
        onPress={() => navigation.navigate("JobsDetails", { data: item })}
      >
        <View style={styles.cardContainer}>
          <Image source={{ uri: item.images[0] }} style={styles.image} />
          <View style={styles.textContainer}>
            <Text style={styles.companyText}>{item.company}</Text>
            <Text style={styles.titleText}>{item.title}</Text>
            <Text style={styles.infoText}>{item.experienceLevel}</Text>
            <View style={styles.locationContainer}>
              <FontAwesome5 name="map-marker-alt" style={styles.locationIcon} />
              <Text style={styles.locationText}>{item.location}</Text>
            </View>
            <Text style={styles.infoText}>{item.employmentType}</Text>
            <Text style={styles.infoText}>{item.educationLevel}</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );

  return (
    <Drawer
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      renderDrawerContent={NavigationView}
      drawerPosition="left"
    >
      <StatusBar
        style="auto"
        barStyle="light-content"
        backgroundColor={"#874d3b"}
      />

      <View
        style={{
          backgroundColor: "#874d3b",
          paddingTop: 120,
        }}
      >
        <View style={{ position: "absolute" }}>
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

          <FontAwesome5
            name="comment"
            size={20}
            color={"#fff"}
            style={{
              position: "absolute",
              left: responsiveWidth(75),
              top: 50,
              borderRadius: 50,
              backgroundColor: "#874d3b",
              paddingHorizontal: 6,
              paddingVertical: 5,
            }}
          />
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

          <View style={{ bottom: 5, opacity: isEnabled == 0 ? null : 0.6 }}>
            <Text
              style={{
                fontSize: 17,
                position: "absolute",
                marginTop: 95,
                color: "white",
                left: 66,
              }}
              onPress={() => setIsEnabled(0)}
            >
              Jobs
            </Text>
            <FontAwesome5
              name="briefcase"
              style={{ position: "absolute", top: 95, left: 40 }}
              color={"#fff"}
              size={20}
              onPress={() => setIsEnabled(0)}
            />
          </View>
          <Text
            style={{
              position: "absolute",
              fontSize: 30,
              top: 85,
              left: responsiveWidth(48),
              color: "#fff",
            }}
          >
            |
          </Text>
          <View
            style={{
              bottom: 5,
              left: responsiveWidth(55),
              position: "absolute",
              opacity: isEnabled == 1 ? null : 0.6,
            }}
          >
            <Text
              style={{
                fontSize: 17,
                position: "absolute",
                marginTop: 95,
                color: "white",
                left: 66,
              }}
              onPress={() => setIsEnabled(1)}
            >
              Recruiter
            </Text>
            <FontAwesome5
              name="user-tie"
              style={{ position: "absolute", top: 95, left: 45 }}
              color={"#fff"}
              size={20}
            />
          </View>
        </View>
      </View>

      {isEnabled == 1 ? <Recruiter /> : null}
      {isEnabled == 0 ? (
        <>
          <View
            style={{
              backgroundColor: "#ffff",
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 0.5 }, // Correct shadowOffset format
              shadowOpacity: 0.6,
              shadowRadius: 10,
              elevation: 2,
              padding: 10,
              display: "flex",
              flexDirection: "row", // Set flexDirection to row
              alignItems: "center", // Align items vertically
            }}
          >
            <SearchBar
              style={{ flex: 1 }} // Let the SearchBar take up remaining space
              placeholder="Search here"
              onChangeText={handleSearch}
              onClearPress={() => setFilteredData(datas)}
              value={searchText}
            />
            <TouchableOpacity
              onPress={() => handleSearch(location)}
              style={{
                backgroundColor: "white",
                padding: 10,
                borderRadius: 10,
                paddingHorizontal: 23,
                elevation: 5,
              }}
            >
              <FontAwesome5 name="map-pin" size={20} style={{}} color="black" />
            </TouchableOpacity>
          </View>

          <ScrollView style={{}} contentContainerStyle={{ paddingBottom: 100 }}>
            <FlatList
              data={filteredData}
              renderItem={renderMealItem1}
              showsHorizontalScrollIndicator={false}
              scrollEnabled={false}
            />
          </ScrollView>
        </>
      ) : null}
    </Drawer>
  );
};

export default JobsScreen;

const styles = StyleSheet.create({
  inputView: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 50,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20,
    top: responsiveHeight(6),
    alignSelf: "center",
    shadowColor: "#984065",
    shadowOffset: {
      width: 0,
      height: 50,
    },
    shadowOpacity: 0.8,
    shadowRadius: 16.0,
    elevation: 5,
    paddingLeft: 30,
    paddingRight: 50,
  },
  inputText: {
    height: 50,
    color: "black",
  },

  cardContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 2,
    elevation: 2,
    marginVertical: 5,
    marginHorizontal: 10,
  },
  image: {
    width: 110,
    height: 110,
    borderRadius: 10,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  companyText: {
    fontSize: 14,
    marginBottom: 5,
    fontWeight: "bold",
  },
  titleText: {
    fontSize: 19,
    marginBottom: 5,
  },
  infoText: {
    fontSize: 12,
    opacity: 0.6,
    marginBottom: 2,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  locationIcon: {
    marginRight: 5,
    opacity: 0.6,
  },
  locationText: {
    fontSize: 15,
    opacity: 0.6,
  },
});
