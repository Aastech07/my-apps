import React, { useState } from "react";
import {
  ScrollView,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
  Modal,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import axios from "axios";
import { api } from "./Api";
import AsyncStorage from "@react-native-async-storage/async-storage";
const JobsDetails = () => {
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
  const [willingnessToTravel, setWillingnessToTravel] = useState("");
  const [relocated, setRelocated] = useState("");
  const [cv, setCV] = useState("");
  const [profileId, setProfileID] = useState("");
  const [id, setID] = useState("");
  const [value, setValue] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [filteredData, setFilteredData] = useState([]);

  const navigation = useNavigation();
  const Data = useRoute();
  const Value = Data.params?.data;
  const jobid = Value?._id;
  console.warn({ jobid });
  const { width } = Dimensions.get("window");
  const dates = (originalDate) => {
    const date = new Date(originalDate);
    const options = { year: "numeric", month: "short", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${api}/applications`);

        const userId = await AsyncStorage.getItem("UserID");

        const filtered = data.filter((item) => item.jobId._id === jobid);

        const userFilter = filtered.filter(
          (item) => item.userId._id === userId
        );

        setFilteredData(userFilter); // Set state with the filtered data
      } catch (error) {
        console.warn(error);
      }
    };

    fetchData();

    // Cleanup function (if needed)
    return () => {
      // Any cleanup code here
    };
  }, [jobid]); // Make sure to include jobid in the dependency array if it's used inside useEffect

  React.useEffect(() => {
    const fetchData = async () => {
      const profileId = await AsyncStorage.getItem("profileid");
      setProfileID(profileId);
      const ID = await AsyncStorage.getItem("UserID");
      setID(ID);

      try {
        if (profileId !== null) {
          const { data } = await axios.get(`${api}/applications`);
          const filteredProperties = data.filter(
            (property) => property.profileId._id === profileId
          );
          if (filteredProperties.length > 0) {
            const firstFilteredProperty = filteredProperties[0]; // Get the first matching property
            setValue(firstFilteredProperty);
            setCurrentCompany(firstFilteredProperty.currentCompany);
            setExperience(firstFilteredProperty.experience);
            setCurrentCtc(firstFilteredProperty.currentCTC);
            setNoticeP(firstFilteredProperty.noticePeriod);
            setYearsOfExperienced(firstFilteredProperty.yearsOfExperience);
            setRoleAndResponsibility(
              firstFilteredProperty.roleAndResponsibility
            );
            setPosition(firstFilteredProperty.yourPosition);
            setLinkedinLink(firstFilteredProperty.linkedInProfile);
            setGithubLink(firstFilteredProperty.githubProfile);
            setPortfolioLink(firstFilteredProperty.portfolioLink);
            setReferences(firstFilteredProperty.references);
            setWorkMode(firstFilteredProperty.workmode);
            setExpectedCtc(firstFilteredProperty.expectedCTC);
            setWillingnessToTravel(firstFilteredProperty.willingnessToTravel);
            setRelocated(firstFilteredProperty.relocated);
            setCV(firstFilteredProperty.image);
          } else {
            console.log("No properties found for the matching profileId.");
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const PostJob = async () => {
    try {
      const { data } = await axios.post(`${api}/applications`, {
        userId: id,
        jobId: jobid,
        profileId: profileId,
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
        willingnessToTravel: willingnessToTravel,
        relocated: relocated,
        expectedCTC: expectedCtc,
        image: cv,
      });
    } catch (error) {
      console.error("Error during login:", error.message);
      //Alert.alert("plz fill this forms");
    }
  };

  const handleApplying = () => {
    if (!value) {
      navigation.navigate("JobsScreens", { data: Value });
    } else {
      PostJob();
      setShowModal(true);

      // Navigate to another screen after 5 seconds
    }
  };

  return (
    <>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>{Value.title}</Text>
        <View style={styles.skillContainer}>
          {Value.skills.slice(0, 3).map((skill, index) => (
            <Text key={index} style={styles.skillTag}>
              {skill}
            </Text>
          ))}
        </View>

        <View style={styles.separator}></View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoHeading}>Company:</Text>
          <Text style={styles.infoText}>{Value.company}</Text>
          <View style={styles.separator}></View>
          <Text style={styles.infoHeading}>Contact Email:</Text>
          <Text style={styles.infoText}>{Value.contactEmail}</Text>
          <View style={styles.separator}></View>
          <Text style={styles.infoHeading}>Description:</Text>
          <Text style={styles.infoText}>{Value.description}</Text>
          <View style={styles.separator}></View>
          <Text style={styles.infoHeading}>Responsibilities:</Text>
          {Value.responsibilities.map((resp, index) => (
            <Text key={index} style={styles.infoText}>
              {resp}
            </Text>
          ))}
          <View style={styles.separator}></View>

          <Text style={styles.infoHeading}>Qualifications:</Text>
          {Value.qualifications.map((qual, index) => (
            <Text key={index} style={styles.infoText}>
              {qual}
            </Text>
          ))}
          <View style={styles.separator}></View>

          <Text style={styles.infoHeading}>Education Level:</Text>
          <Text style={styles.infoText}>{Value.educationLevel}</Text>
          <View style={styles.separator}></View>

          <Text style={styles.infoHeading}>Experience Level:</Text>
          <Text style={styles.infoText}>{Value.experienceLevel}</Text>
          <View style={styles.separator}></View>

          <Text style={styles.infoHeading}>Employment Type:</Text>
          <Text style={styles.infoText}>{Value.employmentType}</Text>
          <View style={styles.separator}></View>

          <Text style={styles.infoHeading}>Location:</Text>
          <Text style={styles.infoText}>{Value.location}</Text>
          <View style={styles.separator}></View>

          <Text style={styles.infoHeading}>Application Deadline:</Text>
          <Text style={styles.infoText}>
            {dates(Value.applicationDeadline)}
          </Text>
          <View style={styles.separator}></View>
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

      <View style={styles.bottomButtonContainer}>
        <View
          style={{
            position: "absolute",
            top: responsiveHeight(3),
            left: responsiveWidth(8),
          }}
        >
          <Text
            style={{ color: "#874d3b", fontWeight: "400", fontSize: 16 }}
            onPress={() => navigation.goBack()}
          >
            Back
          </Text>
        </View>

        <TouchableOpacity
          style={[styles.button, { paddingHorizontal: 25 }]}
          onPress={() => handleApplying()}
        >
          <FontAwesome5Icon
            name="handshake"
            size={20}
            color="tomato"
            style={{}}
          />
          <Text style={[styles.buttonText, { color: "tomato" }]}>Applying</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 20,
    color: "#333",
  },
  skillContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  skillTag: {
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    marginRight: 10,
    color: "#333",
  },
  separator: {
    height: 1,
    backgroundColor: "#ccc",
    marginVertical: 10,
  },
  infoContainer: {
    marginTop: 20,
  },
  infoText: {
    fontSize: 15,
    marginBottom: 10,
    color: "#333",
  },
  infoHeading: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
    opacity: 0.7,
  },
  bottomButtonContainer: {
    flexDirection: "row",
    backgroundColor: "#ffff",
    paddingBottom: 30,
    shadowColor: "#000",
    shadowOpacity: 0.6,
    shadowRadius: 20,
    elevation: 4,
    alignContent: "flex-end",
    justifyContent: "flex-end",
    borderTopWidth: 0.2,
  },

  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    elevation: 3,
    borderWidth: 1,
    borderColor: "tomato",
    marginHorizontal: 10,
    top: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 5,
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

export default JobsDetails;
