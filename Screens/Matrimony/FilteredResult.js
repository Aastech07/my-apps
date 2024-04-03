import React, { useContext, useEffect, useState } from "react";
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
import SearchBar from "react-native-dynamic-search-bar";
import { api } from "../Api";
import { useNavigation } from "@react-navigation/native";
import FilterDataContext from "./context/FilteredDataContext";

const FilteredResult = () => {
  const { filteredDatas } = useContext(FilterDataContext);
  const [apidata, setApiData] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [filteredData, setFilteredData] = useState([]);
 const navigation = useNavigation();
 
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`${api}/matrimonial/profiles`);
        if (filteredDatas == null) {
          setFilteredData(data); // Initialize filtered data with all data
        } else {
          setFilteredData(filteredDatas);
        }
      } catch (error) {
        console.log(error);
      }
    })();
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

  // Function to handle search input and filter data
  const handleSearch = (text) => {
    setSearchInput(text);
    const filtered = filteredDatas.filter(
      (item) =>
        item.profileId.address.street
          .toLowerCase()
          .includes(text.toLowerCase()) ||
        item.profileId.address.city
          .toLowerCase()
          .includes(text.toLowerCase()) ||
        item.profileId.address.state
          .toLowerCase()
          .includes(text.toLowerCase()) ||
        item.profileId.address.country
          .toLowerCase()
          .includes(text.toLowerCase()) ||
        item.profileId.address.postalCode
          .toLowerCase()
          .includes(text.toLowerCase()) ||
        (
          item.profileId.firstName.toLowerCase() +
          " " +
          item.profileId.lastName.toLowerCase()
        ).includes(text.toLowerCase())
    );
    setFilteredData(filtered);
  };


  return (
    <View
      style={{ flex: 1, backgroundColor: "#fff" }}
      contentContainerStyle={{ paddingBottom: 130 }}
    >
      {filteredData.length == 0 ? (
        <View style={styles.noUserView}>
          <Text style={styles.noUserText}>No User Found!</Text>
        </View>
      ) : (
        <>
        {/* <View
        style={{
          backgroundColor: "#ffff",
          shadowColor: "#000",
          shadowOffset: 0.5,
          shadowOpacity: 0.6,
          shadowRadius: 10,
          elevation: 2,
          padding: 10,
        }}
      >
        <SearchBar
          placeholder="Search here"
          onChangeText={handleSearch}
          value={searchInput}
        />
      </View> */}
        <ScrollView style={{ top: 10 }} contentContainerStyle={{}}>
          <View style={{ flex: 1, marginTop: responsiveHeight(9) }}>
            <FlatList
              style={{}}
              data={filteredData} // Render filtered data
              keyExtractor={(item) => item._id}
              renderItem={({ item }) => (
                <>
                  <View
                    style={{
                      alignSelf: "center",
                    }}
                  >
                    <TouchableWithoutFeedback 
                     onPress={() =>
                      navigation.navigate("MatrimonyData", { data: item })
                    }
                    >
                      <View
                        style={{
                          shadowColor: "black",
                          shadowOpacity: 0.9,
                          shadowRadius: 50,
                          elevation: 20,
                          marginTop: 18,
                        }}
                      >
                        <Image
                          source={{ uri: item.images[0] }}
                          style={{
                            width: responsiveWidth(90),
                            height: responsiveHeight(60),
                            bottom: 52,
                            marginTop: -20,
                            borderRadius: 10,
                            alignSelf: "center",
                          }}
                        />

                        <View
                          style={{ left: responsiveWidth(13), bottom: 200 }}
                        >
                          <FontAwesome5
                            name="check-circle"
                            color={"green"}
                            size={18}
                            style={{ position: "absolute", left: -25, top: 3 }}
                          />
                          <Text
                            style={{
                              fontWeight: "600",
                              fontSize: 16,
                              color: "#fff",
                            }}
                          >
                            {item.profileId.firstName} {item.profileId.lastName}
                          </Text>
                          <Text
                            style={{
                              fontWeight: "600",
                              fontSize: 14,
                              color: "#fff",
                              top: 29,
                              position: "absolute",
                              left: -20,
                            }}
                          >
                            {calculateAge(item.profileId.dateOfBirth)} yrs, 5'2"
                            .
                          </Text>
                          <Text
                            style={{
                              fontWeight: "600",
                              fontSize: 14,
                              color: "#fff",
                              top: 28,
                              position: "absolute",
                              left: 60,
                            }}
                          >
                            {/*item.educationAndCareer.workingWith*/}
                          </Text>
                          <Text
                            style={{
                              fontWeight: "600",
                              fontSize: 14,
                              color: "#fff",
                              top: 55,
                              position: "absolute",
                              left: -20,
                            }}
                          ></Text>
                        </View>
                        <View
                          style={{
                            position: "absolute",
                            left: responsiveWidth(75),
                          }}
                        >
                          <TouchableOpacity style={{}}>
                            <Text
                              style={{
                                color: "#fff",
                                fontSize: 35,
                                bottom: 60,
                              }}
                            >
                              ...
                            </Text>
                          </TouchableOpacity>
                        </View>
                        <View
                          style={{
                            borderWidth: 0.5,
                            paddingHorizontal: responsiveWidth(44),
                            alignSelf: "center",
                            top: responsiveHeight(-17),
                            borderColor: "#fff",
                            opacity: 0.8,
                          }}
                        ></View>
                        <View
                          style={{ bottom: responsiveHeight(15), left: 30 }}
                        >
                          <Text style={{ color: "#fff", fontWeight: 500 }}>
                            Like this Profile?
                          </Text>
                          <Text
                            style={{
                              color: "lightblue",
                              fontWeight: 500,
                              position: "absolute",
                              left: 120,
                              fontSize: 17,
                              bottom: 1,
                            }}
                          >
                            Connect Now
                          </Text>
                          <TouchableOpacity
                            style={{
                              backgroundColor: "pink",
                              position: "absolute",
                              shadowColor: "#000",
                              shadowOpacity: 0.6,
                              shadowRadius: 10,
                              elevation: 20,
                              padding: 10,
                              left: responsiveWidth(64),
                              bottom: 10,
                              borderRadius: 50,
                            }}
                          >
                            <FontAwesome5
                              name="check"
                              size={30}
                              style={{}}
                              color={"#fff"}
                            />
                          </TouchableOpacity>
                        </View>
                      </View>
                    </TouchableWithoutFeedback>
                  </View>
                </>
              )}
              showsHorizontalScrollIndicator={false}
            />
          </View>
        </ScrollView>
        </>
      )}
    </View>
  );
};

export default FilteredResult;

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
  noUserView: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  noUserText: {
    fontSize: 25,
    color: "gray",
  },
});
