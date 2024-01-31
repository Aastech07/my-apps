import React, { useEffect, useState } from "react";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  StyleSheet,
  FlatList,
} from "react-native";
import FontAwesome5 from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome5";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { useNavigation } from "@react-navigation/native";
import Modal from "react-native-modal";
import AsyncStorage from "@react-native-async-storage/async-storage";
const ProfileScreen = () => {
  const navigation = useNavigation();

  const [value, setValue] = useState("");
  const [data, setDatas] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);

  const storeData = async () => {
    try {
      await AsyncStorage.setItem("key", value);
      console.warn("save data");
    } catch (e) {
      console.log(e);
    }
  };

  const clearAllData = async () => {
    try {
      await AsyncStorage.clear();
      console.log("AsyncStorage data cleared successfully.");
    } catch (error) {
      console.error("Error clearing AsyncStorage data:", error);
    }
  };
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("key");
      const datas = JSON.stringify(value);
      if (datas !== null) {
        setDatas(datas);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const Image1 =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3flIHsvZtK3eU7tEnp-LSEjNznTZCn0dkcA&usqp=CAU";
  return (
    <ScrollView style={{}} contentContainerStyle={{ paddingBottom: 220 }}>
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
          name="message"
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
          Profile.
        </Text>
        <View style={{ position: "absolute" }}>
          <TouchableOpacity onPress={() => navigation.goBack("BottomNav")}>
            <FontAwesome5
              size={35}
              name="arrow-left"
              style={{
                top: 49,
                left: 20,
              }}
              color={"#fff"}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ marginTop: 50 }}>
        <View style={{}}>
          <Image
            source={{ uri: Image1 }}
            style={{
              height: 80,
              width: 80,
              alignSelf: "center",
              borderRadius: 50,
            }}
          />
        </View>
        <View style={{ alignSelf: "center", position: "absolute", top: 90 }}>
          <Text style={{ fontSize: 20, fontWeight: "500" }}>Abcd Xyz</Text>
        </View>
        <View
          style={{
            alignSelf: "center",
            position: "absolute",
            top: 140,
            left: responsiveWidth(50),
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: "500", right: 110 }}>
            25yrs|5.1ft
          </Text>
          <FontAwesome
            name="user"
            size={20}
            style={{
              position: "absolute",
              right: responsiveWidth(53),
              bottom: 3,
            }}
          />
        </View>
        <View
          style={{
            alignSelf: "center",
            position: "absolute",
            top: 140,
            left: 190,
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: "500" }}>
            Mumbai,Maharastra
          </Text>
          <FontAwesome
            name="map-marker-alt"
            size={20}
            style={{
              position: "absolute",
              right: responsiveWidth(41),
              bottom: 3,
            }}
          />
        </View>
        <View style={{ alignSelf: "center", position: "absolute", top: 170 }}>
          <Text style={{ fontSize: 16, fontWeight: "500" }}>
            Graphic Designer
          </Text>
          <FontAwesome
            name="briefcase"
            size={20}
            style={{
              position: "absolute",
              right: responsiveWidth(36),
              bottom: 3,
            }}
          />
        </View>

        <View style={{}}>
          <TouchableOpacity onPress={() => clearAllData()}>
            <View
              style={{
                borderWidth: 2,
                alignSelf: "center",
                top: 140,
                padding: 20,
                paddingHorizontal: 50,
                borderRadius: 10,
                borderColor: "blue",
              }}
            >
              <Text style={{ color: "blue" }}>Edit Profile</Text>
              <FontAwesome
                name="edit"
                size={20}
                style={{
                  position: "absolute",
                  right: responsiveWidth(36),
                  bottom: 20,
                }}
                color={"blue"}
              />
            </View>
          </TouchableOpacity>
        </View>
        <View style={{ top: responsiveHeight(25), left: responsiveWidth(8) }}>
          <Text style={{ fontSize: 20, fontWeight: "500" }}>About Me</Text>
          <View style={{ marginRight: 30, marginTop: 10 }}>
            <Text style={{ fontSize: 16 }}>
              Enjoy your favorite dishe and a lovely your friends and family and
              have a great time.Food from local food trucks will be available
              for purchase.
            </Text>
            <Text
              style={{
                color: "blue",
                position: "absolute",
                top: responsiveHeight(8.5),
                left: responsiveWidth(20),
              }}
            >
              Read More▼
            </Text>
          </View>
        </View>

        <View style={{ top: responsiveHeight(28), left: responsiveWidth(7) }}>
          <Text style={{ fontSize: 20, fontWeight: "500" }}>interest</Text>
          <TouchableOpacity onPress={toggleModal}>
            <View
              style={{
                bottom: -3,
                left: responsiveWidth(60),
                backgroundColor: "lightgray",
                position: "absolute",
                paddingHorizontal: 15,
                paddingVertical: 5,
                borderRadius: 20,
              }}
            >
              <Text style={{ color: "blue" }}>🖊CHANGE</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={{ flex: 1 }}>
          <Modal isVisible={isModalVisible}>
            <View
              style={{
                flex: 1,
                backgroundColor: "#fff",
                borderRadius: 10,
              }}
            >
              <TouchableOpacity onPress={toggleModal}>
                <View
                  style={{
                    left: responsiveWidth(75),
                    top: responsiveHeight(2),
                    backgroundColor: "#ffff",
                    paddingHorizontal: 12,
                    paddingVertical: 10,
                    position: "absolute",
                    borderRadius: 50,
                    shadowColor: "#000",
                    shadowOffset: 9.0,
                    shadowOpacity: 9.0,
                    shadowRadius: 50,
                    elevation: 5,
                  }}
                >
                  <FontAwesome name="arrow-right" size={20} />
                </View>
              </TouchableOpacity>

              <View style={styles.inputView}>
                <TextInput
                  style={styles.inputText}
                  placeholder="Change your interest"
                  placeholderTextColor="black"
                  onChangeText={(txt) => setValue(txt)}
                  value={value}
                />
              </View>
              <TouchableOpacity
                onPress={() => storeData()}
                style={styles.loginBtn}
              >
                <Text style={{ color: "white" }}>🖊CHANGE</Text>
              </TouchableOpacity>
            </View>
          </Modal>
        </View>
        <View
          style={{ top: responsiveHeight(30), left: responsiveHeight(3.5) }}
        >
          <View style={{ flex: 1, marginRight: 20 }}>
            <FlatList
              data={data}
              renderItem={({ item }) => (
                <View style={{ padding: 10 }}>
                  <Text
                    style={{
                      backgroundColor: "gray",
                      paddingVertical: 10,
                      paddingHorizontal: 10,
                      borderRadius: 20,
                      color: "#fff",
                    }}
                  >
                    Games Online
                  </Text>
                </View>
              )}
              keyExtractor={(item, index) => index.toString()}
              horizontal
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;
const styles = StyleSheet.create({
  inputView: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 8,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20,
    borderWidth: 1,
    top: responsiveHeight(15),
    alignSelf: "center",
  },
  inputText: {
    height: 50,
    color: "black",
  },
  loginBtn: {
    width: "90%",
    backgroundColor: "#4383f2",
    borderRadius: 5,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10,
    top: responsiveHeight(10),
    shadowColor: "#984065",
    shadowOffset: {
      width: 0,
      height: 50,
    },
    shadowOpacity: 0.8,
    shadowRadius: 16.0,
    elevation: 10,
    alignSelf: "center",
  },
});
