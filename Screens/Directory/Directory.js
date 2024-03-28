import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  FlatList,
  TouchableWithoutFeedback,
  BackHandler,Alert
} from "react-native";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import axios from "axios";
import FontAwesome from "react-native-vector-icons/FontAwesome5";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { Drawer } from "react-native-drawer-layout";
import { api } from "../Api";
import NavigationView from "../Drawer";
import SearchBar from "react-native-dynamic-search-bar";

const Directory = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const navigation = useNavigation();
  const [open, setOpen] = React.useState(false);


  const getData = async () => {
    try {
      const response = await axios.get(`${api}/directories`);
      if (response && response.data) {
        setData(response.data);
        setFilteredData(response.data);
      }
    } catch (err) {
      console.log("error: ", err.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const renderMealItem1 = ({ item }) => {
    if (!item || !item.images ) {
      return null;
    }
  
    return (
      <View style={{ paddingBottom: 5, padding: 15 }}>
        <TouchableWithoutFeedback
          style={styles.mealItemContainer}
          onPress={() => navigation.navigate("directroy", { data: item })}
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
              shadowOffset: { width: 0, height: 20 },
              shadowRadius: 50,
              elevation: 2,
            }}
          >
            <Image
              source={{ uri: item.images[0] }}
              style={{ width: 100, height: 100, borderRadius: 10 }}
            />
            <Text style={{ position: "absolute", fontSize: 16, top: 13, left: 130 }}>
              {item.companyName}.
            </Text>
            <Text style={{ position: "absolute", fontSize: 12, top: 40, left: 130 }}>
              location: {item.locality}.
            </Text>
            <Text style={{ fontSize: 12, top: 50, opacity: 0.6, left: 25 }}>
              {item.companyEmail}
            </Text>
            <Text style={{ position: "absolute", fontSize: responsiveFontSize(1.4), top: 79, left: 130, opacity: 0.6 }}>
              {item.website}
            </Text>
            <Text style={{ position: "absolute", fontSize: 11, top: 95, left: 135, opacity: 0.6 }}>
              {item.employmentType}
            </Text>
            <Text style={{ position: "absolute", fontSize: 11, top: 95, left: 185, opacity: 0.6 }}>
              {item.educationLevel}
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  };
  


  const handleSearch = (text) => {
    const filtered = data.filter((item) =>
      item.companyName.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredData(filtered);
  };

  return (
    <><StatusBar

      backgroundColor="#874d3b"
      barStyle="light-content" /><Drawer
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        renderDrawerContent={NavigationView}
        drawerPosition="left"
      >
        <View style={{ flex: 1 }}>

          <View
            style={{
              backgroundColor: "#874d3b",
              paddingTop: 100,
            }}
          >
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
              }} />
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
              }} />

            <Text
              style={{
                fontSize: 18,
                position: "absolute",
                marginTop: 54,
                color: "white",
                fontWeight: "bold",
                left: 70,
              }}
            >
              Directory
            </Text>
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
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                bottom: 6,
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontSize: 25,
                  fontWeight: "bold",
                  position: "absolute",
                  top: 135,
                }}
              >
                {" "}
                ...{" "}
              </Text>
            </View>
          </View>

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
            <SearchBar placeholder="Search here" onChangeText={handleSearch} />
          </View>
          <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 100 }}>
            <View style={{}}>
              {filteredData.length > 0 ? (
                <FlatList
                  data={filteredData}
                  scrollEnabled={false}
                  renderItem={renderMealItem1}
                  showsHorizontalScrollIndicator={false}
                  style={{}} />
              ) : null}
            </View>
          </ScrollView>
        </View>
      </Drawer></>
  );
};

export default Directory;

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
