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
import RNPickerSelect from "react-native-picker-select";
import { api } from "../../Api";
import { useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const EducationEditForm = ({education}) => {
  const navigation = useNavigation();
  const [educationEntries, setEducationEntries] = useState(education);
  const [degree, setDegree] = useState("");
  const [completionYear, setCompletionYear] = useState(dayjs().format("YYYY"));
  const [educationType, setEducationType] = useState(""); // To store the type of education (HSC, SSC, Graduation, Postgraduation)
  const [modalVisible1, setModalVisible1] = useState(false);
  const [degreeError, setDegreeError] = useState(false);
  const [institutionError, setInstitutionError] = useState(false);
  const [completionYearError, setCompletionYearError] = useState(false);
  const [course, setCourse] = useState(""); // To store the selected course for graduation or postgraduation
  const [Screens, setScreens] = useState("");
  const [institution, setInstitution] = useState("");

  const Value = useRoute();
  const ids = Value.params?.data;

  const undergraduateCourses = [
    "Bachelor of Arts (BA)",
    "Bachelor of Science (BSc)",
    "Bachelor of Commerce (BCom)",
    "Bachelor of Engineering (BE)",
    "Bachelor of Technology (B.Tech)",
    "Bachelor of Business Administration (BBA)",
    "Bachelor of Computer Applications (BCA)",
    "Bachelor of Architecture (B.Arch)",
    "Bachelor of Fine Arts (BFA)",
    "Bachelor of Pharmacy (B.Pharm)",
    "Bachelor of Medicine and Bachelor of Surgery (MBBS)",
    "Bachelor of Dental Surgery (BDS)",
    "Bachelor of Ayurvedic Medicine and Surgery (BAMS)",
    "Bachelor of Homeopathic Medicine and Surgery (BHMS)",
    "Bachelor of Physiotherapy (BPT)",
    "Bachelor of Nursing (B.Sc Nursing)",
    "Bachelor of Law (LLB)",
    "Bachelor of Education (B.Ed)",
    "Bachelor of Design (B.Des)",
    "Bachelor of Journalism and Mass Communication (BJMC)",
    "Bachelor of Hotel Management (BHM)",
    "Bachelor of Science in Agriculture (BSc Agriculture)",
    "Bachelor of Veterinary Science and Animal Husbandry (B.V.Sc & AH)",
    "Bachelor of Fisheries Science (B.F.Sc)",
    "Bachelor of Science in Forestry (BSc Forestry)",
  ];
  const postgraduateCourses = [
    "Master of Arts (MA)",
    "Master of Science (MSc)",
    "Master of Commerce (MCom)",
    "Master of Business Administration (MBA)",
    "Master of Technology (M.Tech)",
    "Master of Engineering (ME)",
    "Master of Computer Applications (MCA)",
    "Master of Architecture (M.Arch)",
    "Master of Fine Arts (MFA)",
    "Master of Pharmacy (M.Pharm)",
    "Master of Medicine (MD)",
    "Master of Surgery (MS)",
    "Master of Dental Surgery (MDS)",
    "Master of Science in Nursing (M.Sc Nursing)",
    "Master of Law (LLM)",
    "Master of Education (M.Ed)",
    "Master of Design (M.Des)",
    "Master of Journalism and Mass Communication (MJMC)",
    "Master of Social Work (MSW)",
    "Master of Public Health (MPH)",
    "Master of Science in Agriculture (MSc Agriculture)",
    "Master of Veterinary Science (MVSc)",
    "Master of Fisheries Science (M.F.Sc)",
    "Master of Science in Forestry (MSc Forestry)",
    "Master of Physiotherapy (MPT)",
  ];

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

  // Function to add a new education entry
  const addEducationEntry = () => {
    // Validate the input fields
    if (!institution || !completionYear || !educationType) {
      Alert.alert(
        "Incomplete Information",
        "Please fill in all the required fields before proceeding."
      );
      return;
    }

    // Add the new education entry to the array
    setEducationEntries([
      ...educationEntries,
      {
        institution,
        completionYear,
        educationType,
        course:
          educationType === "Graduation" || educationType === "Post Graduation"
            ? course
            : "", // Add course if education type is Graduation or Postgraduation
      },
    ]);

    // Clear the input fields
    setDegree("");
    setInstitution("");
    setCompletionYear(dayjs().format("YYYY"));
    setEducationType("");
    setCourse("");
  };

  const PostEducation = async () => {
    // try {
    //   console.log({
    //     degree,
    //     institution,
    //     completionYear,
    //   });
    //   const response = await axios.put(`${api}/profiles/${data}`, {
    //     education: {
    //       degree,
    //       institution,
    //       completionYear,
    //     },
    //   });
    //   console.log(response.data);
    // } catch (error) {
    //   console.log("Error during login:", error.message);
    // }
    console.log("Education Entries:", educationEntries);
  };

  const deleteEducation = (index) => {
    const updatedEducationList = [...educationEntries];
    updatedEducationList.splice(index, 1);
    setEducationEntries(updatedEducationList);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 240 }}
      >
        <View style={styles.inputContainer}>
          <Text style={styles.labelText}>Institution Name</Text>
          <TextInput
            style={styles.inputField}
            value={institution}
            onChangeText={setInstitution}
            placeholder="Institution Name"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.labelText}>Completion Year</Text>
          <TouchableOpacity onPress={() => setModalVisible1(!modalVisible1)} style={{borderWidth:1,padding:10,borderRadius:10,borderColor:'lightgray'}}>
            <Text>{completionYear}</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.labelText}>Select Education Type:</Text>
          <RNPickerSelect
            placeholder={{ label: "Select Type", value: null }}
            style={{borderWidth:1,padding:10,borderRadius:10,borderColor:'lightgray'}}
            onValueChange={(value) => setEducationType(value)}
            items={[
              { label: "HSC", value: "HSC" },
              { label: "SSC", value: "SSC" },
              { label: "Graduation", value: "Graduation" },
              { label: "Post Graduation", value: "Post Graduation" },
            ]}
          />
        </View>

        {/* Display the course selection dropdown for Graduation and Postgraduation */}
        {(educationType === "Graduation" ||
          educationType === "Post Graduation") && (
          <View>
            <Text style={styles.labelText}>Select Course:</Text>
            <RNPickerSelect
              placeholder={{ label: "Select Course", value: null }}
              onValueChange={(value) => setCourse(value)}
              items={
                educationType === "Graduation"
                  ? undergraduateCourses.map((course) => ({
                      label: course,
                      value: course,
                    }))
                  : postgraduateCourses.map((course) => ({
                      label: course,
                      value: course,
                    }))
              }
            />
          </View>
        )}

        {/* Modal for selecting completion year */}
        <View style={styles.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible1}
            onRequestClose={() => setModalVisible1(!modalVisible)}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <DateTimePicker
                  value={completionYear}
                  onValueChange={onChange}
                  mode="date"
                  display="spinner"
                  maximumDate={minDate}
                  displayFullDays={false}
                />
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={() => setModalVisible1(!modalVisible1)}
                >
                  <Text style={styles.modalButtonText}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      </ScrollView>

      {/* Button to add new education entry */}
      <TouchableOpacity style={styles.addButton} onPress={addEducationEntry}>
        <Text style={styles.addButtonText}>Add Education Entry</Text>
      </TouchableOpacity>

      {/* Display the list of education entries */}
      {educationEntries?.map((entry, index) => (
        <View key={index} style={styles.educationEntry}>
          <Text style={styles.educationText}>
            Institution - {entry.institution}
          </Text>
          <Text style={styles.educationText}>Year - {entry.completionYear}</Text>
          <Text style={styles.educationText}>Type - {entry.educationType}</Text>
          {(entry.educationType == "Graduation" ||
            entry.educationType == "Post Graduation") && (
            <Text style={styles.educationText}>course - {entry.course}</Text>
          )}
          <TouchableOpacity onPress={() => deleteEducation(index)}>
            <Text style={styles.deleteButton}>Delete</Text>
          </TouchableOpacity>
        </View>
      ))}

      {/* Button to submit the education entries */}
      <TouchableOpacity onPress={PostEducation} style={styles.submitButton}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EducationEditForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  deleteButton: {
    color: "red",
    marginTop: 5,
  },
  labelText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  inputField: {
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  selectContainer: {
    marginBottom: 20,
  },
  selectLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  picker: {
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  addButton: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  educationEntry: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  educationText: {
    fontSize: 16,
    marginBottom: 5,
  },
  submitButton: {marginTop:10,
    backgroundColor: "#28a745",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
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
  modalButton: {
    marginTop: 20,
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  modalButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
