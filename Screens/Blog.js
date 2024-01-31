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
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
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

const Blog = () => {
  const Api = api;
  const [meals, setMeals] = useState([]);
  const navigation = useNavigation();
  const drawer = useRef(null);
  const category = searchQuery;
  const getRecipes = async () => {
    try {
      const response = await axios.get(`http://35.154.214.120/api/jobs`);
      console.log("got recipes: ", response.data);
      if (response && response.data) {
        setMeals(response.data);
      }
    } catch (err) {
      console.log("error: ", err.message);
    }
  };
  const SaveIcon = "https://cdn-icons-png.flaticon.com/128/5667/5667029.png";
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

  const MusicIcon = "https://cdn-icons-png.flaticon.com/128/7566/7566380.png";
  const [searchQuery, setSearchQuery] = useState("");
  const [isFavourite, setIsFavourite] = useState(false);

  const [apidata, setApiData] = useState("");
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`${Api}/events`);
        setApiData(data);
        console.log(apidata);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
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
          paddingTop: 50,
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

          <TouchableOpacity onPress={() => navigation.goBack("BottomNav")}>
            <FontAwesome5
              size={30}
              name="arrow-left"
              style={{
                position: "absolute",
                top: 49,
                left: 20,
              
               
              }}
              color={"#fff"}
            />
          </TouchableOpacity>

          <Text
            style={{
              fontSize: 20,
              position: "absolute",
              marginTop: 50,
              color: "white",
              fontWeight: "bold",
              left: 70,
            }}
          >
            Blogs
          </Text>
        </View>

        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Search..."
            placeholderTextColor="black"
            edile={true}
            onChangeText={(txt) => setSearchQuery(txt)}
            value={searchQuery}
          />

          <TouchableOpacity
            onPress={() => getRecipes()}
            style={{
              left: responsiveWidth(78),
              bottom: 15,
              position: "absolute",
            }}
          >
            <FontAwesome5 size={20} name="search" color={"#704a93"} />
          </TouchableOpacity>
        </View>
      </View>

      <Animated.View
        entering={FadeInUp.duration(500).damping()}
        style={{ marginBottom: 70, left: responsiveWidth(6) }}
      >
        <Text style={{ top: responsiveHeight(5), fontSize: 23, fontWeight: "500" }}>
          Recent Blogs
        </Text>
      </Animated.View>

      <View style={{ flex: 1 }}>
        <FlatList
          style={{ bottom: 20 }}
          data={apidata}
          scrollEnabled={false}
          renderItem={({ item }) => (
            <>
              <View
                key={item.id}
                style={{
                  marginLeft: responsiveWidth(5),
                  paddingBottom: 20,
                }}
              >
                <TouchableWithoutFeedback
                  onPress={() =>
                    navigation.navigate("EventsDetails", { data: item })
                  }
                >
                  <View
                    style={{
                      backgroundColor: "#fff",
                      paddingBottom: 60,
                      borderRadius: 20,
                      shadowColor: "#000",
                      shadowOffset: {
                        width: 0,
                        height: 50,
                      },
                      shadowOpacity: 0.8,
                      shadowRadius: 16.0,
                      elevation: 8,
                      alignSelf: "center",
                      paddingHorizontal: responsiveWidth(2),
                      right: responsiveWidth(3),
                    }}
                  >
                    <Image
                      source={{ uri: item.image }}
                      style={{
                        width: 330,
                        height: 175,
                        bottom: 52,
                        marginTop: 60,
                        borderRadius: 10,
                        alignSelf: "center",
                      }}
                    />
                    <Text
                      style={{
                        fontSize: responsiveFontSize(2),
                        top: 170,
                        left: 10,
                        marginTop: 25,
                        fontWeight: "600",
                        position: "absolute",
                      }}
                    >
                      {item.title}
                    </Text>
                    <Text
                      style={{
                        fontSize: 16,
                        top: 225,
                        left: responsiveWidth(73),
                        marginTop: 25,
                        fontWeight: "600",
                        position: "absolute",
                      }}
                    >
                      Read...
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </>
          )}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </ScrollView>
  );
};

export default Blog;

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
