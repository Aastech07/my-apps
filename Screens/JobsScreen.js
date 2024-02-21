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
import { StatusBar } from "react-native";
import { TouchableWithoutFeedback } from "react-native";
import Recruiter from "./Recruiter";
import { api } from "./Api";
import { Drawer } from "react-native-drawer-layout";
import NavigationView from "./Drawer";
import SearchBar from "react-native-dynamic-search-bar";
import { ScrollView } from "react-native-gesture-handler";
const JobsScreen = () => {
  const [datas, setData] = useState([]);
  const navigation = useNavigation();
  const [filteredDatas, setFilteredDatas] = useState([]);
  const [searchText, setSearchText] = useState("");
 
  const [isEnabled, setIsEnabled] = useState(0);
  const [open, setOpen] = React.useState(false);
  const GetData = async () => {
    try {
      const response = await axios.get(`${api}/jobs`);

      if (response && response.data) {
        setData(response.data);
        setFilteredDatas(response.data);
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
    setFilteredDatas(filteredData);
  }, [searchText, datas]);
  const images =
    "https://communityappintegrate.s3.ap-south-1.amazonaws.com/Event/pexels-fu-zhichao-587741.jpg";

  const renderMealItem1 = ({ item }) => (
    <View style={{ paddingBottom: 5, padding: 15 }}>
      <TouchableWithoutFeedback
        style={styles.mealItemContainer}
        onPress={() => navigation.navigate("JobsDetails", { data: item })}
      >
        <View
          style={{
            flexDirection: "row",
            backgroundColor: "#fff",
            paddingHorizontal: 5,
            paddingVertical: 5,
            borderRadius: 10,
            shadowColor: "black",
            shadowOpacity: 0.9,
            shadowOffset: 20,
            shadowRadius: 50,
            elevation: 2,
          }}
        >
          <Image
            source={{ uri: images }}
            style={{ width: 110, height: 110, borderRadius: 10 }}
          />
          <Text
            style={{ position: "absolute", fontSize: 14, top: 40, left: 130 }}
          >
            {item.company}
          </Text>

          <Text
            style={{ position: "absolute", fontSize: 19, top: 10, left: 130 }}
          >
            {item.title}
          </Text>
          <Text
            style={{
              position: "absolute",
              fontSize: 12,
              top: 42,
              left: 200,
              opacity: 0.6,
            }}
          >
            {item.experienceLevel}
          </Text>

          <Text
            style={{
              position: "absolute",
              fontSize: 15,
              top: 65,
              left: responsiveWidth(42),
              opacity: 0.6,
            }}
          >
            {item.location}
          </Text>
          <FontAwesome5
            name="map-marker-alt"
            style={{ position: "absolute", left: "42%", top: 70 }}
          />

          <Text
            style={{
              position: "absolute",
              fontSize: 11,
              top: 95,
              left: 135,
              opacity: 0.6,
            }}
          >
            {item.employmentType}
          </Text>

          <Text
            style={{
              position: "absolute",
              fontSize: 11,
              top: 95,
              left: 185,
              opacity: 0.6,
            }}
          >
            {item.educationLevel}
          </Text>
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
        translucent
        backgroundColor="#4383f2"
        barStyle="dark-content"
      />

      <View
        style={{
          backgroundColor: "#4383f2",

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
              backgroundColor: "#4383f2",
              paddingHorizontal: 7,
              paddingVertical: 5,
            }}
          />
          <FontAwesome5
            name="comment"
            size={20}
            color={"#fff"}
            style={{
              position: "absolute",
              left: responsiveWidth(75),
              top: 50,
              borderRadius: 50,
              backgroundColor: "#4383f2",
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
            <TouchableOpacity onPress={() => setIsEnabled(0)}>
              <Text
                style={{
                  fontSize: 17,
                  position: "absolute",
                  marginTop: 95,
                  color: "white",
                  left: 66,
                }}
              >
                Jobs
              </Text>
              <FontAwesome5
                name="briefcase"
                style={{ position: "absolute", top: 95, left: 40 }}
                color={"#fff"}
                size={20}
              />
            </TouchableOpacity>
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
            <TouchableOpacity onPress={() => setIsEnabled(1)}>
              <Text
                style={{
                  fontSize: 17,
                  position: "absolute",
                  marginTop: 95,
                  color: "white",
                  left: 66,
                }}
              >
                Recruiter
              </Text>
              <FontAwesome5
                name="user-tie"
                style={{ position: "absolute", top: 95, left: 45 }}
                color={"#fff"}
                size={20}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {isEnabled == 1 ? <Recruiter /> : null}
      {isEnabled == 0 ? (
        <>
          <View
            style={{
              backgroundColor: "#fff",
              shadowColor: "#000",
              shadowOffset: 0.5,
              shadowOpacity: 0.5,
              elevation: 3,
              padding: 10,
            }}
          >
            <SearchBar
              placeholder="Search here"
              onChangeText={(text) => setSearchText(text)}
            />
          </View>

          <ScrollView style={{}} contentContainerStyle={{paddingBottom:100}}>
            <FlatList
              data={filteredDatas}
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
});
