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
  Platform,
} from "react-native";
import { responsiveHeight } from "react-native-responsive-dimensions";
import { useNavigation } from "@react-navigation/native";
import DateTimePicker from "react-native-ui-datepicker";
import dayjs from "dayjs";
import axios from "axios";
import { api } from "../../Api";
import { useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const EducationEditForm = () => {
  const navigation = useNavigation();
  const [degree, setDegree] = useState("");
  const [institution, setInstitution] = useState("");
  const [completionYear, setCompletionYear] = useState(dayjs().format("YYYY"));
  const [modalVisible1, setModalVisible1] = useState("");
  const [degreeError, setDegreeError] = useState(false);
  const [institutionerror, setInstitutionError] = useState(false);
  const [completionYearError, setCompletionYearError] = useState(false);
  const [Screens, setScreens] = useState("");
  const Value = useRoute();
  const ids = Value.params?.data;

  const validate = () => {
    let hasError = false;

    if (!degree) {
      hasError = true;
    } else {
      setDegreeError("");
    }

    if (!institution) {
      hasError = true;
    } else {
      setInstitutionError("");
    }

    if (!completionYear) {
      hasError = true;
    } else {
      setCompletionYearError("");
    }

    if (hasError) {
      // There are errors, do not proceed
      Alert.alert(
        "Incomplete Information",
        "Please fill in all the required fields before proceeding."
      );

      setDegreeError(0);
      setInstitutionError(0);
      setCompletionYearError(0);
      return;
    }

    // No errors, proceed with navigation and API call

    PostEducation();
  };

  const Skip = () => {
    if (Screens == "Business") {
      navigation.navigate("Directorys");
    } else {
      navigation.navigate("Matrimonys");
    }
  };

  const onChange = (date, selectedDate) => {
    const formattedDate = dayjs(date).format("YYYY");
    setModalVisible1(Platform.OS === "ios");
    setCompletionYear(formattedDate);
    setCompletionYearError(formattedDate);
  };

  const minDate = new Date();
  minDate.setDate(minDate.getDate() - 15); // Minimum date: 15 days ago

  const [data, setData] = React.useState();

  useEffect(() => {
    const storeData = async () => {
      try {
        // await AsyncStorage.setItem("UserID", ids);
        const value = await AsyncStorage.getItem("profileid");
        const screens = await AsyncStorage.getItem("ShowScreen");
        setScreens(screens);
        setData(value);
      } catch (e) {
        console.log(e);
      }
    };
    storeData();
  }, []);

  const PostEducation = async () => {
    try {
      console.log({
        degree,
        institution,
        completionYear,
      });
      const response = await axios.put(`${api}/profiles/${data}`, {
        education: {
          degree,
          institution,
          completionYear,
        },
      });
      console.log(response.data);
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
        <View style={{ top: -170 }}>
          <View style={{ bottom: 40 }}>
            <Text
              style={{
                top: responsiveHeight(24),
                left: 23,
                fontSize: 15,
                fontWeight: "500",
                opacity: 0.6,
                color:
                  degreeError === 0 && degree.trim() === "" ? "red" : "#000",
              }}
            >
              Degree
            </Text>
            <View style={[styles.inputView]}>
              <TextInput
                style={styles.inputText}
                placeholder="Degree"
                placeholderTextColor={"#000"}
                onChangeText={(text) => {
                  setDegree(text);
                  setDegreeError(text.length);
                }}
                value={degree}
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
                color:
                  institutionerror === 0 && institution.trim() === ""
                    ? "red"
                    : "#000",
              }}
            >
              Institution Name
            </Text>
            <View style={[styles.inputView]}>
              <TextInput
                style={styles.inputText}
                placeholder="Institution Name"
                placeholderTextColor={"#000"}
                onChangeText={(txt) => setInstitution(txt)}
                value={institution}
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
                color: completionYearError === 0 ? "red" : "#000",
              }}
            >
              Completion Year
            </Text>
            <View style={[styles.inputView]}>
              <TouchableOpacity
                onPress={() => setModalVisible1(!modalVisible1)}
              >
                <Text
                  style={{
                    top: 15,
                    opacity: 0.7,
                  }}
                >
                  {completionYear}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={{ top: responsiveHeight(25) }}>
              <View style={styles.centeredView1}>
                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={modalVisible1}
                  onRequestClose={() => {
                    //  Alert.alert("Modal has been closed.");
                    setModalVisible1(!modalVisible1);
                  }}
                >
                  <View style={styles.centeredView1}>
                    <View style={styles.modalView1}>
                      <DateTimePicker
                        value={completionYear}
                        onValueChange={onChange}
                        mode="date"
                        display="spinner"
                        maximumDate={minDate}
                        displayFullDays={false}
                      />
                    </View>
                  </View>
                </Modal>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={{ bottom: 300 }}>
        <TouchableOpacity
          style={{
            width: "90%",
            backgroundColor: "#874d3b",
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
            Update
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EducationEditForm;

const styles = StyleSheet.create({
  inputView: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 8,
    height: 50,

    top: responsiveHeight(25),
    opacity: 0.8,
    paddingLeft: 15,
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
