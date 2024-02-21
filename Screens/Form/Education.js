import React, { useContext, useEffect, useState } from "react";
import {
  ScrollView,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Modal,
  Pressable,
} from "react-native";
import Animated, { FadeInLeft } from "react-native-reanimated";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import { useNavigation } from "@react-navigation/native";
import DateTimePicker from "react-native-ui-datepicker";
import dayjs from "dayjs";
import axios from "axios";
import { api } from "../Api";
import { MyContext } from "../../App";
import { useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
const Education = () => {
  const navigation = useNavigation();
  const [degree, setDegree] = useState("");
  const [institution, setInstitution] = useState("");
  const [completionYear, setCompletionYear] = useState(dayjs().format("YYYY"));
  const [modalVisible1, setModalVisible1] = useState("");
  const id = useContext(MyContext);
  const Value = useRoute();
  const ids = Value.params.data;
  console.warn(ids);
  const Api = api;
  const validate = () => {
    if (!degree || !institution || !completionYear) {
      Alert.alert(
        "Incomplete Information",
        "Please fill in all the required fields before proceeding."
      );
    } else {
      PostEducation();
      navigation.navigate("Directorys", { data: ids });
    }
  };
  const handleDateChange = (event, selectedDate) => {
    if (selectedDate !== undefined) {
      const year = selectedDate.getFullYear();
      setCompletionYear(parseInt(year));
    }
  };

  useEffect(() => {
    const storeData = async () => {
      try {
        await AsyncStorage.setItem("UserID", ids);
      } catch (e) {
        console.log(e);
      }
    };
    storeData();
  }, []);

  const PostEducation = async () => {
    try {
      const response = await axios.put(`${Api}/profiles/${id}`, {
        education: {
          degree: degree,
          institution: institution,
          completionYear: completionYear,
        },
      });
      console.warn(response);
    } catch (error) {
      console.log("Error during login:", error.message);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 240 }}
      >
        <View
          style={{
            width: responsiveWidth(100),
            height: 90,
            backgroundColor: "#3468C0",
            position: "absolute",
            bottom: 0,
            top: -1,
            elevation: 3,
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
          }}
        >
          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <Text
              style={{
                left: responsiveWidth(10),
                top: responsiveHeight(4),
                fontSize: responsiveFontSize(3),
                color: "red",
                fontWeight: "300",
              }}
            >
              Comm{" "}
              <Text style={{ fontWeight: "300", color: "#fff" }}>unity</Text>
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              bottom: responsiveHeight(-1),
              left: responsiveWidth(80),
            }}
          >
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <FontAwesome5Icon
                name="arrow-left"
                size={18}
                style={{
                  backgroundColor: "#fff",
                  padding: 5,
                  paddingHorizontal: 7,
                  borderRadius: 50,
                  elevation: 3,
                  shadowColor: "#000",
                  shadowOpacity: 0.6,
                  shadowRadius: 10,
                }}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ top: 10 }}>
          <View style={{ flex: 1, top: 100 }}>
            <Animated.Text
              style={{ left: 20, fontSize: 25, fontWeight: "300" }}
              entering={FadeInLeft.duration(500).damping()}
            >
              Add{" "}
              <Text style={{ color: "tomato", fontWeight: "500" }}>
                Education...
              </Text>
            </Animated.Text>
          </View>

          <View style={{ bottom: 40 }}>
            <Text
              style={{
                top: responsiveHeight(24),
                left: 23,
                fontSize: 15,
                fontWeight: "500",
                opacity: 0.6,
              }}
            >
              Enter Degree
            </Text>
            <View style={styles.inputView}>
              <TextInput
                style={styles.inputText}
                placeholder="Enter Degree"
                placeholderTextColor="black"
                onChangeText={(txt) => setDegree(txt)}
                value={degree}
              />
              <FontAwesome5Icon
                name="user-graduate"
                size={16}
                style={{ position: "absolute", left: 8, top: 18, opacity: 0.6 }}
                color={"#000"}
              />
            </View>
          </View>

          <View style={{ bottom: 30 }}>
            <Text
              style={{
                top: responsiveHeight(24),
                left: 23,
                fontSize: 15,
                fontWeight: "500",
                opacity: 0.6,
              }}
            >
              Enter institution Name
            </Text>
            <View style={styles.inputView}>
              <TextInput
                style={styles.inputText}
                placeholder="Enter institution Name"
                placeholderTextColor="black"
                onChangeText={(txt) => setInstitution(txt)}
                value={institution}
              />
              <FontAwesome5Icon
                name="university"
                size={16}
                style={{ position: "absolute", left: 8, top: 18, opacity: 0.6 }}
                color={"#000"}
              />
            </View>
          </View>

          <View style={{ bottom: 15 }}>
            <Text
              style={{
                top: responsiveHeight(24),

                left: 23,
                fontSize: 15,
                fontWeight: "500",
                opacity: 0.6,
              }}
            >
              Completion Year
            </Text>
            <View style={styles.inputView}>
              <TouchableOpacity
                onPress={() => setModalVisible1(!modalVisible1)}
              >
                <Text style={{ top: 15, opacity: 0.7 }}>{completionYear}</Text>
              </TouchableOpacity>
            </View>

            <View style={{ top: responsiveHeight(25) }}>
              <View style={styles.centeredView1}>
                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={modalVisible1}
                  onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible1(!modalVisible1);
                  }}
                >
                  <View style={styles.centeredView1}>
                    <View style={styles.modalView1}>
                      <DateTimePicker
                        value={completionYear}
                        mode="date"
                        display="default" // You can also use "spinner" or "calendar"
                        onChange={handleDateChange}
                      />

                      <Pressable
                        style={[styles.button1, styles.buttonClose1]}
                        onPress={() => setModalVisible1(!modalVisible1)}
                      >
                        <Text style={styles.textStyle1}>Close</Text>
                      </Pressable>
                    </View>
                  </View>
                </Modal>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={{ bottom: 50, left: responsiveWidth(21) }}>
        <TouchableOpacity
          style={{
            width: "50%",
            backgroundColor: "#3D50DF",
            borderRadius: 5,
            height: 50,
            alignItems: "center",
            justifyContent: "center",
            top: responsiveHeight(10),
            elevation: 3,
            alignSelf: "center",
            borderColor: "blue",
          }}
          onPress={() => validate()}
        >
          <Text style={{ color: "white", fontSize: 16, fontWeight: "500" }}>
            Next
          </Text>
          <FontAwesome5Icon
            name="arrow-right"
            style={{
              position: "absolute",
              left: 135,
              backgroundColor: "#3D56F0",
              padding: 12,
              borderRadius: 50,
              color: "#fff",
            }}
          />
        </TouchableOpacity>
      </View>

      <View style={{ bottom: 100, right: responsiveWidth(26) }}>
        <TouchableOpacity
          style={{
            width: "40%",
            borderWidth: 1,
            borderRadius: 5,
            height: 50,
            alignItems: "center",
            justifyContent: "center",
            top: responsiveHeight(10),
            alignSelf: "center",
            borderColor: "tomato",
          }}
          onPress={() => navigation.navigate("Directorys")}
        >
          <Text style={{ color: "tomato", fontSize: 16, fontWeight: "500" }}>
            Skip
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Education;

const styles = StyleSheet.create({
  inputView: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 8,
    height: 50,

    top: responsiveHeight(25),
    opacity: 0.8,
    paddingLeft: 30,
    paddingRight: 20,

    left: 20,
    marginBottom: 15,
    opacity: 0.7,

    borderWidth: 1,
  },
  inputText: {
    height: 50,
    color: "black",
  },
  loginBtn: {
    width: "88%",
    backgroundColor: "#3D50DF",
    borderRadius: 5,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 50,
    top: responsiveHeight(90),
    shadowColor: "#3D50DF",
    shadowOffset: {
      width: 0,
      height: 50,
    },
    shadowOpacity: 0.8,
    shadowRadius: 16.0,
    elevation: 10,
    alignSelf: "center",
    borderColor: "blue",
  },
  inputView1: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 8,
    height: 50,

    top: responsiveHeight(25),
    opacity: 0.8,
    paddingLeft: 30,
    paddingRight: 20,

    left: 20,
    marginBottom: 15,
    opacity: 0.7,

    borderBottomWidth: 1,
  },
  loginBtn: {
    width: "88%",
    backgroundColor: "#3D50DF",
    borderRadius: 5,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 50,
    top: responsiveHeight(20),
    shadowColor: "#3D50DF",
    shadowOffset: {
      width: 0,
      height: 50,
    },
    shadowOpacity: 0.8,
    shadowRadius: 16.0,
    elevation: 10,
    alignSelf: "center",
  },
  centeredView1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView1: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button1: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  buttonOpen1: {
    backgroundColor: "#F194FF",
  },
  buttonClose1: {
    backgroundColor: "#2196F3",
  },
  textStyle1: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText1: {
    marginBottom: 15,
    textAlign: "center",
  },
});
