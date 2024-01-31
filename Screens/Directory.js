import React, { useEffect, useState, useRef } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  FlatList,
  TouchableOpacity,
  DrawerLayoutAndroid,
  ToastAndroid,
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
import Animated, { FadeInUp } from "react-native-reanimated";
import { StatusBar } from "react-native";
import { BookmarkIcon } from "react-native-heroicons/mini";
import { TouchableWithoutFeedback } from "react-native";
import { api } from "./Api";
const Directory = () => {
  const [meals, setMeals] = useState([]);
  const navigation = useNavigation();
  const drawer = useRef(null);
  const Api = api;
  const getRecipes = async () => {
    try {
      const response = await axios.get(`${Api}/directories`);
      console.log("got recipes: ", response.data);
      if (response && response.data) {
        setMeals(response.data);
      }
    } catch (err) {
      console.log("error: ", err.message);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      getRecipes();
    }, 500);
  }, []);
  const showToast = () => {
    ToastAndroid.show("Saved ", ToastAndroid.SHORT);
  };
  const images =
    "https://communityappintegrate.s3.ap-south-1.amazonaws.com/Event/pexels-fu-zhichao-587741.jpg";
  const [searchQuery, setSearchQuery] = useState("");
  const [isFavourite, setIsFavourite] = useState(false);
  const navigationView = () => (
    <View style={{ backgroundColor: "#fff" }}>
      <View style={{ left: 20, top: 100, opacity: 0.6 }}>
        <FontAwesome name="user" size={22} />
        <Text
          style={{
            position: "absolute",
            left: 30,
            fontSize: 18,
            fontWeight: "500",
          }}
        >
          My Profile
        </Text>
      </View>
      <View style={{ left: 20, top: 125, opacity: 0.6 }}>
        <FontAwesome name="comment" size={22} />
        <Text
          style={{
            position: "absolute",
            left: 30,
            fontSize: 18,
            fontWeight: "500",
          }}
          onPress={() => navigation.navigate("Blog")}
        >
          Blog
        </Text>
      </View>
      <View style={{ left: 20, top: 150, opacity: 0.6 }}>
        <FontAwesome name="money-check-alt" size={22} />
        <Text
          style={{
            position: "absolute",
            left: 33,
            fontSize: 18,
            fontWeight: "500",
          }}
        >
          Trade
        </Text>
      </View>
      <View style={{ left: 20, top: 175, opacity: 0.6 }}>
        <FontAwesome name="envelope" size={22} />
        <Text
          style={{
            position: "absolute",
            left: 33,
            fontSize: 18,
            fontWeight: "500",
          }}
        >
          Contact Us
        </Text>
      </View>
      <View style={{ left: 20, top: 200, opacity: 0.6 }}>
        <FontAwesome name="cog" size={22} />
        <Text
          style={{
            position: "absolute",
            left: 33,
            fontSize: 18,
            fontWeight: "500",
          }}
        >
          Setting
        </Text>
      </View>
      <View style={{ left: 20, top: 220, opacity: 0.6 }}>
        <FontAwesome name="question-circle" size={22} />
        <Text
          style={{
            position: "absolute",
            left: 33,
            fontSize: 18,
            fontWeight: "500",
          }}
        >
          Helps & FAQs
        </Text>
      </View>
      <View style={{ left: 20, top: 238, opacity: 0.6 }}>
        <FontAwesome name="sign-in-alt" size={22} />
        <Text
          style={{
            position: "absolute",
            left: 33,
            fontSize: 18,
            fontWeight: "500",
          }}
        >
          Sign Out
        </Text>
      </View>
    </View>
  );

  const renderMealItem1 = ({ item }) => (
    <View style={{ paddingBottom: 5, padding: 15 }}>
      <TouchableWithoutFeedback style={styles.mealItemContainer} onPress={()=>navigation.navigate('directroy',{data:item})}>
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
            elevation: 5,
          }}
          
        >
          <Image
            source={{ uri: item.companyLogo }}
            style={{ width: 100, height: 100, borderRadius: 10 }}
          />
          <Text
            style={{ position: "absolute", fontSize: 16, top: 13, left: 130 }}
          >
            {item.companyName}.
          </Text>

          <Text
            style={{ position: "absolute", fontSize: 12, top: 40, left: 130 }}
          >
           location: {item.locality}.
          </Text>
          <Text
            style={{
              position: "absolute",
              fontSize: 12,
              top: 60,
              left: 130,
              opacity: 0.6,
            }}
          >
            Company Email:{item.companyEmail}
          </Text>

          <Text
            style={{
              position: "absolute",
              fontSize: responsiveFontSize(1.4),
              top: 79,
              left: 130,
              opacity: 0.6,
            }}
          >
            {item.website}
          </Text>
      

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
    <DrawerLayoutAndroid
      ref={drawer}
      drawerWidth={200}
      drawerPosition={"left"}
      renderNavigationView={navigationView}
    >
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 10 }}
      >
        <StatusBar
          translucent
          backgroundColor="#4383f2"
          barStyle="dark-content"
        />

        <View
          style={{
            backgroundColor: "#4383f2",
            borderBottomStartRadius: 30,
            borderBottomEndRadius: 30,
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
            onPress={() => drawer.current.openDrawer()}
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

        <Animated.View
          entering={FadeInUp.duration(500).damping()}
          style={{ marginBottom: 70, right: 20 }}
        >
          <Text style={{ top: 20, left: 50, fontSize: 23, fontWeight: "500" }}>
           
          </Text>
        </Animated.View>

        <View style={{}}>
          <FlatList
            data={meals}
            scrollEnabled={false}
           
            renderItem={renderMealItem1}
            showsHorizontalScrollIndicator={false}
            style={{ bottom: 50 }}
          />
        </View>
      </ScrollView>
    </DrawerLayoutAndroid>
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
