import React, { useState } from "react";
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Modal,
  Switch,
  Alert,
  Button,
  FlatList,
} from "react-native";
import Animated, {
  FadeInUp,
  FadeInLeft,
  FadeInDown,
} from "react-native-reanimated";
import {
  responsiveHeight,
  responsiveWidth,
  
} from "react-native-responsive-dimensions";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import {
  SelectList,
} from "react-native-dropdown-select-list";

import { api } from "../Api";
import axios from "axios";
import { useNavigation, useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as DocumentPicker from "expo-document-picker";
const JobsScreens = () => {
  const navigation = useNavigation();
  const data = useRoute();
  const item = data.params?.data;
  const jobid = item?._id;

  console.warn({jobid});
  
  const [currentCompany, setCurrentCompany] = useState("");
  const [experience, setExperience] = useState("");
  const [yearsOfExperienced, setYearsOfExperienced] = useState("");
  const [currentCtc, setCurrentCtc] = useState("");
  const [expectedCtc, setExpectedCtc] = useState("");
  const [noticep, setNoticeP] = useState("");
  const [roleAndResponsibility, setRoleAndResponsibility] = useState("");
  const [linkedinLink, setLinkedinLink] = useState("");
  const [githubLink, setGithubLink] = useState("");
  const [portfolioLink, setPortfolioLink] = useState("");
  const [workModes, setWorkMode] = useState("");
  const [references, setReferences] = useState("");
  const [position, setPosition] = useState("");
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  const [id, setID] = useState("");
  const [profileid, setProfileID] = useState("");
  const [file, setFile] = useState(null);
  const [uri, setURI] = useState("");
  const [showModal, setShowModal] = useState(false); // State to control modal visibility


  const EmploymentType = [
    { key: "1", value: "Experienced" },
    { key: "2", value: "Fresher" },
  ];

  const YearsOfExperienceLevel = [
    { key: "1", value: "0-1 years" },
    { key: "2", value: "1-2 years" },
    { key: "3", value: "2-3 years" },
    { key: "4", value: "3-4 years" },
    { key: "5", value: "4-5 years" },
    { key: "6", value: "5-6 years +" },
  ];

  const WorkMode = [
    { key: "1", value: "Remote" },
    { key: "2", value: "Hybrid" },
    { key: "3", value: "On-site" },
  ];

  const CTC = [
    { key: "1", value: "1LPA - 2LPA" },
    { key: "2", value: "3LPA - 4LPA" },
    { key: "3", value: "5LPA - 6LPA" },
    { key: "4", value: "6LPA - 7LPA" },
    { key: "5", value: "8LPA - 9LPA" },
    { key: "6", value: "10LPA - 11LPA+" },
  ];

  const CurrentCTC = [
    { key: "1", value: "1LPA - 2LPA" },
    { key: "2", value: "3LPA - 4LPA" },
    { key: "3", value: "5LPA - 6LPA" },
    { key: "4", value: "6LPA - 7LPA" },
    { key: "5", value: "8LPA - 9LPA" },
    { key: "6", value: "10LPA - 11LPA+" },
  ];

  const NoticePeriod = [
    { key: "1", value: "Immediately" },
    { key: "2", value: "7 days" },
    { key: "3", value: "15 days" },
    { key: "4", value: "1 months" },
  ];

  const [isEnabled1, setIsEnabled1] = useState(false);
  const toggleSwitchs = () => setIsEnabled1((previousState) => !previousState);

  const validate = () => {
    let isValid = true;
    if (currentCompany == "") {
      isValid = false;
    }
    if (experience == "") {
      isValid = false;
    }
    if (yearsOfExperienced == "") {
      isValid = false;
    }
    if (currentCtc == "") {
      isValid = false;
    }
    if (noticep == "") {
      isValid = false;
    }
    if (expectedCtc == "") {
      isValid = false;
    }
    if (linkedinLink == "") {
      isValid = false;
    }
    if (position == "") {
      isValid = false;
    }
    if (githubLink == "") {
      isValid = false;
    }
    if (portfolioLink == "") {
      isValid = false;
    }
    if (workModes == "") {
      isValid = false;
    }
    if (references == "") {
      isValid = false;
    }
    if (isValid == true) {
      navigation.navigate("Matrimonys");
    } else {
      Alert.alert("fill this form");
    }
  };

  const handleModalSubmit = () => {
   // console.warn("Modal input:", modalInput);
    setShowModal(true);
  };

  React.useEffect(() => {
    const storeData = async () => {
      try {
        const value = await AsyncStorage.getItem("profileid");

        const ID = await AsyncStorage.getItem("UserID");
         console.warn(value);
        setID(ID);
        setProfileID(value);
      } catch (e) {
        console.log(e);
      }
    };
    storeData();
  }, []);

  const PostJob = async () => {

    try {
      const { data } = await axios.post(`${api}/applications`, {
        userId: id,
        jobId: jobid,
        profileId: profileid,
        experience: experience,
        currentCTC: currentCtc,
        noticePeriod: noticep,
        //  yearsOfExperience: yearsOfExperienced,
        currentCompany: currentCompany,
        roleAndResponsibility: roleAndResponsibility,
        yourPosition: position,
        linkedInProfile: linkedinLink,
        githubProfile: githubLink,
        portfolioLink: portfolioLink,
        references: references,
        workmode: workModes,
        willingnessToTravel: isEnabled1,
        relocated: isEnabled,
        expectedCTC: expectedCtc,
        image: uri,
      });
      handleModalSubmit();
      await AsyncStorage.setItem("appl",data._id)
    } catch (error) {
      // console.error("Error during login:", error.message);
      Alert.alert("plz fill this forms");
    }
  };

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
      });

      setFile(result.assets);
    } catch (err) {
      console.log("Document picker error:", err);
    }
  };

  const func = (item) => {
    console.warn(item);
    setURI(item);
  };

  const renderItem = ({ item }) => (
    <View style={{ padding: 10 }}>
      {func(item.uri)}
      <Text style={{ letterSpacing: 1.5 }}>{item.name}</Text>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView
        style={{ flex: 1, bottom: 100 }}
        contentContainerStyle={{ paddingBottom: 200 }}
      >
        <View style={{ flex: 1, top: 130 }}>
          <Animated.Text
            style={{ left: 20, fontSize: 25, fontWeight: "300" }}
            entering={FadeInLeft.duration(500).damping()}
          >
            Apply{" "}
            <Text style={{ color: "tomato", fontWeight: "500" }}>Jobs...</Text>
          </Animated.Text>
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
            Current Company
          </Text>
          <View style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              placeholder="Enter Current Company"
              placeholderTextColor="black"
              onChangeText={(text) => setCurrentCompany(text)}
              value={currentCompany}
            />
            <FontAwesome5Icon
              name="building"
              size={16}
              style={{ position: "absolute", left: 8, top: 18, opacity: 0.6 }}
              color={"#000"}
            />
          </View>
        </View>

        <View style={{ bottom: 25 }}>
          <Text
            style={{
              top: responsiveHeight(24),
              left: 23,
              fontSize: 15,
              fontWeight: "500",
              opacity: 0.6,
            }}
          >
            Experience
          </Text>
          <View style={{ top: responsiveHeight(25), marginBottom: 10 }}>
            <SelectList
              setSelected={(text) => setExperience(text)}
              data={EmploymentType}
              save="value"
              boxStyles={{
                marginLeft: responsiveWidth(5),
                marginRight: responsiveWidth(5),
              }}
              dropdownStyles={{
                marginLeft: responsiveWidth(5),
                marginRight: responsiveWidth(5),
              }}
              search={false}
            />
          </View>
        </View>

        <View style={{ bottom: 20 }}>
          <Text
            style={{
              top: responsiveHeight(24),
              left: 23,
              fontSize: 15,
              fontWeight: "500",
              opacity: 0.6,
            }}
          >
            Years of Experienced
          </Text>
          <View style={{ top: responsiveHeight(25), marginBottom: 13 }}>
            <SelectList
              setSelected={(text) => setYearsOfExperienced(text)}
              data={YearsOfExperienceLevel}
              save="value"
              boxStyles={{
                marginLeft: responsiveWidth(5),
                marginRight: responsiveWidth(5),
              }}
              dropdownStyles={{
                marginLeft: responsiveWidth(5),
                marginRight: responsiveWidth(5),
              }}
              search={false}
            />
          </View>
        </View>

        <View style={{ bottom: 18 }}>
          <Text
            style={{
              top: responsiveHeight(24),
              left: 23,
              fontSize: 15,
              fontWeight: "500",
              opacity: 0.6,
            }}
          >
            Current CTC
          </Text>
          <View style={{ top: responsiveHeight(25), marginBottom: 13 }}>
            <SelectList
              setSelected={(text) => setCurrentCtc(text)}
              data={CTC}
              save="value"
              boxStyles={{
                marginLeft: responsiveWidth(5),
                marginRight: responsiveWidth(5),
              }}
              dropdownStyles={{
                marginLeft: responsiveWidth(5),
                marginRight: responsiveWidth(5),
              }}
              search={false}
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
            Select Joining Date
          </Text>
          <View style={{ top: responsiveHeight(25), marginBottom: 13 }}>
            <SelectList
              setSelected={(text) => setNoticeP(text)}
              data={NoticePeriod}
              save="value"
              boxStyles={{
                marginLeft: responsiveWidth(5),
                marginRight: responsiveWidth(5),
              }}
              dropdownStyles={{
                marginLeft: responsiveWidth(5),
                marginRight: responsiveWidth(5),
              }}
              search={false}
            />
          </View>
        </View>

        <View style={{ bottom: 10 }}>
          <Text
            style={{
              top: responsiveHeight(24),
              left: 23,
              fontSize: 15,
              fontWeight: "500",
              opacity: 0.6,
            }}
          >
            Select Expected CTC
          </Text>
          <View style={{ top: responsiveHeight(25), marginBottom: 13 }}>
            <SelectList
              setSelected={(text) => setExpectedCtc(text)}
              data={CurrentCTC}
              save="value"
              boxStyles={{
                marginLeft: responsiveWidth(5),
                marginRight: responsiveWidth(5),
              }}
              dropdownStyles={{
                marginLeft: responsiveWidth(5),
                marginRight: responsiveWidth(5),
              }}
              search={false}
            />
          </View>
        </View>

        <View style={{}}>
          <Text
            style={{
              top: responsiveHeight(24),
              left: 23,
              fontSize: 15,
              fontWeight: "500",
              opacity: 0.6,
            }}
          >
            Role And Responsibility
          </Text>
          <View style={styles.inputView2}>
            <TextInput
              style={{ height: 100, color: "black" }}
              placeholder="Enter Role And Responsibility"
              placeholderTextColor="black"
              onChangeText={(text) => setRoleAndResponsibility(text)}
              value={roleAndResponsibility}
              multiline={true}
              numberOfLines={4}
              maxLength={100}
            />
          </View>
        </View>

        <View style={{ top: 10 }}>
          <Text
            style={{
              top: responsiveHeight(24),
              left: 23,
              fontSize: 15,
              fontWeight: "500",
              opacity: 0.6,
            }}
          >
            Your Position
          </Text>
          <View style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              placeholder="Enter Your Position"
              placeholderTextColor="black"
              onChangeText={(text) => setPosition(text)}
              value={position}
            />
            <FontAwesome5Icon
              name="project-diagram"
              size={15}
              style={{ position: "absolute", left: 8, top: 18, opacity: 0.6 }}
              color={"#000"}
            />
          </View>
        </View>

        <View style={{ top: 10 }}>
          <Text
            style={{
              top: responsiveHeight(25),
              left: 23,
              fontSize: 15,
              fontWeight: "500",
              opacity: 0.6,
            }}
          >
            Add linkedin link
          </Text>
          <View style={styles.inputView1}>
            <TextInput
              style={styles.inputText}
              placeholder="Add linkedin link"
              placeholderTextColor="black"
              onChangeText={(text) => setLinkedinLink(text)}
              value={linkedinLink}
            />
            <FontAwesome5Icon
              name="linkedin"
              size={18}
              style={{ position: "absolute", left: 7, top: 18, opacity: 0.6 }}
              color={"#000"}
            />
          </View>
        </View>

        <View style={{ top: 10 }}>
          <Text
            style={{
              top: responsiveHeight(25),
              left: 23,
              fontSize: 15,
              fontWeight: "500",
              opacity: 0.6,
            }}
          >
            Add Github link
          </Text>
          <View style={styles.inputView1}>
            <TextInput
              style={styles.inputText}
              placeholder="Add Github link"
              placeholderTextColor="black"
              onChangeText={(text) => setGithubLink(text)}
              value={githubLink}
            />
            <FontAwesome5Icon
              name="github"
              size={18}
              style={{ position: "absolute", left: 7, top: 18, opacity: 0.6 }}
              color={"#000"}
            />
          </View>
        </View>

        <View style={{ top: 10 }}>
          <Text
            style={{
              top: responsiveHeight(25),
              left: 23,
              fontSize: 15,
              fontWeight: "500",
              opacity: 0.6,
            }}
          >
            Add Portfolio link
          </Text>
          <View style={styles.inputView1}>
            <TextInput
              style={styles.inputText}
              placeholder="Add Portfolio link"
              placeholderTextColor="black"
              onChangeText={(text) => setPortfolioLink(text)}
              value={portfolioLink}
            />
            <FontAwesome5Icon
              name="address-card"
              size={18}
              style={{ position: "absolute", left: 7, top: 18, opacity: 0.6 }}
              color={"#000"}
            />
          </View>
        </View>

        <View style={{ top: 15 }}>
          <Text
            style={{
              top: responsiveHeight(24),
              left: 23,
              fontSize: 15,
              fontWeight: "500",
              opacity: 0.6,
            }}
          >
            Work Mode
          </Text>
          <View style={{ top: responsiveHeight(25), marginBottom: 13 }}>
            <SelectList
              setSelected={(text) => setWorkMode(text)}
              data={WorkMode}
              save="value"
              boxStyles={{
                marginLeft: responsiveWidth(5),
                marginRight: responsiveWidth(5),
              }}
              dropdownStyles={{
                marginLeft: responsiveWidth(5),
                marginRight: responsiveWidth(5),
              }}
              search={false}
            />
          </View>
        </View>

        <View style={{ top: 15 }}>
          <Text
            style={{
              top: responsiveHeight(25.5),
              left: 23,
              fontSize: 15,
              fontWeight: "500",
              opacity: 0.6,
            }}
          >
            Willingness To Travel
          </Text>
          <View style={{ top: responsiveHeight(21), right: 20 }}>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={isEnabled1 ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitchs}
              value={isEnabled1}
            />
          </View>
        </View>

        <View style={{}}>
          <Text
            style={{
              top: responsiveHeight(25.5),
              left: 23,
              fontSize: 15,
              fontWeight: "500",
              opacity: 0.6,
            }}
          >
            Willingness To Relocate
          </Text>
          <View style={{ top: responsiveHeight(21), right: 20 }}>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>
        </View>

        <View style={{}}>
          <Text
            style={{
              top: responsiveHeight(24),
              left: 23,
              fontSize: 15,
              fontWeight: "500",
              opacity: 0.6,
            }}
          >
            Enter References
          </Text>
          <View style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              placeholder="xyz@gmail.com"
              placeholderTextColor="black"
              onChangeText={(text) => setReferences(text)}
              value={references}
            />
            <FontAwesome5Icon
              name="user-check"
              size={16}
              style={{ position: "absolute", left: 8, top: 18, opacity: 0.6 }}
              color={"#000"}
            />
          </View>
        </View>

        <View style={{ flex: 1, padding: 30, top: 150 }}>
          <Button title="ADD Resume" onPress={pickDocument} color={"#874d3b"} />
          <FlatList
            data={file}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            scrollEnabled={false}
          />
        </View>

        <Modal
          visible={showModal}
          animationType="slide"
          transparent
          onRequestClose={() => setShowModal(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <FontAwesome5Icon
                name="paper-plane"
                size={20}
                color="blue"
                style={styles.icon}
              />
              <Text style={styles.modalTitle}>Submit Application</Text>
              <Text style={{ fontWeight: "400" }}>
                Apply to more opportunities to increase
              </Text>
              <Text style={{ alignSelf: "center", fontWeight: "400" }}>
                your chances of getting hired
              </Text>
              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={[styles.modalButton, styles.submitButton]}
                  onPress={() => navigation.goBack()}
                >
                  <Text style={{ color: "#fff", fontWeight: "500" }}>
                    Continue applying
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </ScrollView>

      <View style={{ bottom: 150, marginBottom: -60 }}>
        <TouchableOpacity
          style={{
            width: "80%",
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
          onPress={() => PostJob()}
        >
          <Text style={{ color: "white", fontSize: 16, fontWeight: "500" }}>
            Submit
          </Text>
          <FontAwesome5Icon
            name="arrow-right"
            style={{
              position: "absolute",
              left: 220,
              backgroundColor: "#874d3b",
              padding: 12,
              borderRadius: 50,
              color: "#fff",
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default JobsScreens;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffff",
    marginTop: responsiveHeight(25),
    marginHorizontal: 30,
  },
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
  inputView2: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 8,
    height: 100,

    top: responsiveHeight(25),
    opacity: 0.8,
    paddingLeft: 10,
    paddingRight: 20,

    left: 20,
    marginBottom: 15,
    opacity: 0.7,

    borderWidth: 1,
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
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
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
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
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
  icon: {
    alignSelf: "center",
    marginBottom: responsiveHeight(2), // Responsive margin
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 10,
    textAlign: "center",
  },
  modalInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "center",
  },
  modalButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginLeft: 10,
    top: 10,
  },
  cancelButton: {
    backgroundColor: "#ccc",
  },
  submitButton: {
    backgroundColor: "tomato",
  },
});
