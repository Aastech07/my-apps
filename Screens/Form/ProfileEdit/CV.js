import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Switch,
  Button,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "../../Api";
import axios from "axios";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import { SelectList } from "react-native-dropdown-select-list";
import SkeletonLoader from "../../skeletonloader/Skeletonloader";
import * as DocumentPicker from "expo-document-picker";

const CV = () => {
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
  const [profileData, setProfileData] = useState("");
  const [editableFields, setEditableFields] = useState("");
  const [file, setFile] = useState(null);
  const [uri, setURI] = useState("");
  const [isEnabled1, setIsEnabled1] = useState(false);
  const toggleSwitchs = () => setIsEnabled1((previousState) => !previousState);

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

  React.useEffect(() => {
    
    const fetchData = async () => {
      const id = await AsyncStorage.getItem("appl")
      console.warn(id)
      try {
        const { data } = await axios.get(
          `${api}/applications/${id}`
        );
        console.warn(data);
        //    setFilteredData(userFilter); // Set state with the filtered data
      } catch (error) {
        console.warn(error);
      }
    };

    fetchData();

    // Cleanup function (if needed)
    return () => {
      // Any cleanup code here
    };
  }, []); // Make sure to include jobid in the dependency array if it's used inside useEffect

  useEffect(() => {
    const fetchData = async () => {
      const id = await AsyncStorage.getItem("appl")

      try {
        const { data } = await axios.get(
          `${api}/applications/${id}`
        );
        setProfileData(data)
        setCurrentCompany(data.currentCompany);
        setExperience(data.experience);
        setYearsOfExperienced(data.yearsOfExperience);
        setCurrentCtc(data.currentCTC);
        setNoticeP(data.noticePeriod);
      setRoleAndResponsibility(data.roleAndResponsibility);
           setPosition(data.yourPosition);
         setGithubLink(data.githubProfile);
           setLinkedinLink(data.linkedInProfile);
         setPortfolioLink(data.portfolioLink);
         setReferences(data.references);
          setWorkMode(data.workmode);
           setIsEnabled1(data.willingnessToTravel)
           setIsEnabled(data.relocated);
           setExpectedCtc(data.expectedCTC);
         setProfession(data.profession);
          setURI(data.image);

        //
        const fields = {};
        Object.keys(data).forEach((key) => {
          fields[key] = false;
        });
        setEditableFields(fields);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);
  //
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

  const renderDetailItem = (label, value, key) => {
    const isEditing = editableFields[key];

    if (isEditing) {
      return (
        <View style={styles.detailItem}>
          <Text style={styles.label}>{label}:</Text>
          {label === "Experience" && (
            <SelectList
              data={EmploymentType}
              setSelected={(val) => handleInputChange(key, val)}
              multiple={false}
              boxStyles={{ flex: 1, minWidth: 200 }} // Adjust as needed
              search={false}
              save="value"
            />
          )}
          {label === "Years of Experienced" && (
            <SelectList
              setSelected={(val) => handleInputChange(key, val)}
              data={YearsOfExperienceLevel}
              save="value"
              boxStyles={{ flex: 1, minWidth: 200 }}
              search={false}
            />
          )}
          {label === "Current CTC" && (
            <SelectList
              setSelected={(val) => handleInputChange(key, val)}
              data={CTC}
              save="value"
              boxStyles={{ flex: 1, minWidth: 200 }}
              search={false}
            />
          )}
          {label === "NoticePeriod" && (
            <SelectList
              setSelected={(val) => handleInputChange(key, val)}
              data={NoticePeriod}
              save="value"
              boxStyles={{ flex: 1, minWidth: 200 }}
              search={false}
            />
          )}
          {label === "Select Expected CTC" && (
            <SelectList
              setSelected={(val) => handleInputChange(key, val)}
              data={CurrentCTC}
              save="value"
              boxStyles={{ flex: 1, minWidth: 200 }}
              search={false}
            />
          )}
          {label === "Work Mode" && (
            <SelectList
              setSelected={(val) => handleInputChange(key, val)}
              data={WorkMode}
              save="value"
              boxStyles={{ flex: 1, minWidth: 200 }}
              search={false}
            />
          )}

          {label === "Willingness To Travel" && (
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={isEnabled1 ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitchs}
              value={isEnabled1}
            />
          )}

          {label === "Willingness To Relocate" && (
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          )}

          {label !== "Experience" &&
            label !== "Years of Experienced" &&
            label !== "Current CTC" &&
            label !== "NoticePeriod" &&
            label !== "Select Expected CTC" &&
            label !== "Willingness To Travel" &&
            label !== "Willingness To Relocate" &&
            label !== "Work Mode" &&
             (
              <TextInput
                style={styles.textInput}
                value={value}
                onChangeText={(text) => handleInputChange(key, text)}
              />
            )}
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => handleSave(key)}
          >
            <FontAwesome5Icon name="save" size={20} color="#007BFF" />
          </TouchableOpacity>
        </View>
      );
    }
    ///AddGithublink
    return (
      <View style={styles.detailItem}>
        <Text style={styles.label}>{label}:</Text>
        <Text style={styles.value}>{value}</Text>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => handleEdit(key)}
        >
          <FontAwesome5Icon name="edit" size={20} color="#777" />
        </TouchableOpacity>
      </View>
    );
  };

  const handleEdit = (key) => {
    setEditableFields({ ...editableFields, [key]: true });
  };

  const handleSave = async (key) => {
    const id = await AsyncStorage.getItem("appl")

    setEditableFields({ ...editableFields, [key]: false });

    try {
      const updatedData = {
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
      };

      const { data } = await axios.put(`${api}/applications/${id}`, updatedData);
      console.warn("Profile updated:", data);

      // Update profileData with the saved data
      //setProfileData(data);
    } catch (error) {
      console.log("Error updating profile:", error.message);
    }
  };

  const handleInputChange = (key, value) => {
    switch (key) {
      case "CurrentCompany":
        setCurrentCompany(value);
        break;
      case "RoleAndResponsibility":
        setRoleAndResponsibility(value);
        break;
      case "yourposition":
        setPosition(value); // value is already a Date object
        break;
      case "Addlinkedinlink":
        setLinkedinLink(value);
        break;
      case "AddGithublink":
        setGithubLink(value);
        break;
      case "portfolioLink":
        setPortfolioLink(value);
        break;
      case "EnterReferences":
        setReferences(value);
        break;
      case "experience":
        setExperience(value);
        break;
      case "YearsofExperienced":
        setYearsOfExperienced(value);
        break;
      case "CurrentCTC":
        setCurrentCtc(value);
        break;
      case "SelectExpectedCTC":
        setExpectedCtc(value);
        break;
      case "workModes":
        setWorkMode(value);
        break;
      case "WillingnessToTravel":
        setIsEnabled1(value);
        break;
      case "WillingnessToRelocate":
        setIsEnabled(value);
        break;
      case "noticeperiod":
        setNoticeP(value);
        break;

      default:
        break;
    }
  };

  if (!profileData) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#fff",
          bottom: 15,
        }}
      >
        <SkeletonLoader />
      </View>
    );
  }
  return (
    <>
      <ScrollView style={styles.container}>
        <View style={styles.detailsContainer}>
          <Text style={styles.sectionTitle}>Details</Text>
          {renderDetailItem(
            "Current Company",
            currentCompany,
            "CurrentCompany"
          )}
          {renderDetailItem("Experience", experience, "experience")}
          {renderDetailItem(
            "Years of Experienced",
            yearsOfExperienced,
            "YearsofExperienced"
          )}
          {renderDetailItem("Current CTC", currentCtc, "CurrentCTC")}

          {renderDetailItem("NoticePeriod", noticep, "noticeperiod")}
          {renderDetailItem(
            "Select Expected CTC",
            expectedCtc,
            "SelectExpectedCTC"
          )}
          {renderDetailItem(
            "Role And Responsibility",
            roleAndResponsibility,
            "RoleAndResponsibility"
          )}
          {renderDetailItem("Your Position", position, "yourposition")}
          {renderDetailItem("Work Mode", workModes, "workModes")}
          {renderDetailItem(
            "Willingness To Travel",
            isEnabled1,
            "WillingnessToTravel"
          )}
          {renderDetailItem(
            "Willingness To Relocate",
            isEnabled,
            "WillingnessToRelocate"
          )}
          {renderDetailItem("Enter References", references, "EnterReferences")}


          <Text style={styles.sectionTitle}>Links</Text>
          {renderDetailItem(
            "Add linkedin link",
            linkedinLink,
            "Addlinkedinlink"
          )}
          {renderDetailItem("Add Github link", githubLink, "AddGithublink")}
          {renderDetailItem(
            "Add Portfolio link",
            portfolioLink,
            "portfolioLink"
          )}
         
          <View style={{ flex: 1, padding: 30 }}>
            <Button
              title="ADD Resume"
              onPress={pickDocument}
              color={"#874d3b"}
            />
            <FlatList
              data={file}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
              scrollEnabled={false}
            />
          </View>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    borderBottomWidth: 1,
    paddingBottom: 10,
    borderColor: "#ccc",
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 20,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  profileInfo: {
    flex: 1,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
  },
  profession: {
    fontSize: 16,
    color: "gray",
  },
  detailsContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 20,
    opacity: 0.6,
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
    borderBottomWidth: 1,
    paddingBottom: 5,
    borderColor: "#ccc",
  },
  label: {
    fontWeight: "bold",
    marginRight: 5,
    flex: 1,
  },
  value: {
    flex: 2,
  },
  iconButton: {
    padding: 5,
  },
  languageContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
  },
  languageItem: {
    padding: 5,
    borderWidth: 1,
    borderRadius: 5,
    marginRight: 5,
    marginBottom: 10,
  },
  languagesContainer: {
    marginBottom: 20,
  },
  textInput: {
    flex: 2,
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  editText: {
    flex: 2,
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  saveButton: {
    backgroundColor: "#007BFF",
    padding: 8,
    borderRadius: 5,
    marginTop: 10,
    alignSelf: "flex-start",
  },
  saveButtonText: {
    color: "#fff",
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

export default CV;
