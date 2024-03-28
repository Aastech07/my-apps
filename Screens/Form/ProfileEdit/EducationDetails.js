import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Modal,
  Pressable,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "../../Api";
import axios from "axios";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import dayjs from "dayjs";
import DateTimePicker from "react-native-ui-datepicker";
import SkeletonLoader from "../../skeletonloader/Skeletonloader";
import EducationEditForm from "./EducationEditForm";

const EducationDetails = () => {
  const [profileData, setProfileData] = useState(null);
  const [editableFields, setEditableFields] = useState({});
  const [id, setID] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [completionYear, setCompletionYear] = useState(
    dayjs().format("YYYY-MM-DD")
  );
  const [showSkeleton, setShowSkeleton] = useState(false);
  const [degree, setDegree] = useState("");
  const [institution, setInstitution] = useState("");
  const [modalVisible1, setModalVisible1] = useState(false);
  const img =
    "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?size=338&ext=jpg&ga=GA1.1.1700460183.1708646400&semt=ais";

  useEffect(() => {
    const fetchData = async () => {
      setShowSkeleton(true);
      try {
        const profileId = await AsyncStorage.getItem("profileid");

        if (profileId !== null) {
          const { data } = await axios.get(`${api}/profiles/${profileId}`);
          if (data) {
            setProfileData(data);
            setID(data._id);
            setDegree(data.education.degree);
            setInstitution(data.education.institution);
            setCompletionYear(data.education.completionYear);

            // Initialize editableFields state with all fields set to false
            const fields = {};
            Object.keys(data).forEach((key) => {
              fields[key] = false;
            });
            setEditableFields(fields);
          } else {
            setProfileData(false);
          }
        }
      } catch (error) {
        console.log(error);
      }
      setShowSkeleton(false);
    };

    fetchData();
  }, []);

  const limets = (dateOfBirth) => {
    const birthDate = new Date(dateOfBirth);
    const formattedBirthDate = birthDate.toISOString().split("T")[0];
    return formattedBirthDate;
  };

  const renderDetailItem = (label, value, key) => {
    const isEditing = editableFields[key];

    if (isEditing) {
      return (
        <View style={styles.detailItem}>
          <Text style={styles.label}>{label}:</Text>

          <TextInput
            style={styles.textInput}
            value={value}
            onChangeText={(text) => handleInputChange(key, text)}
          />

          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => handleSave(key)}
          >
            <FontAwesome5Icon name="save" size={20} color="#007BFF" />
          </TouchableOpacity>
        </View>
      );
    }

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
    setEditableFields({ ...editableFields, [key]: false });

    try {
      const updatedData = {
        education: {
          degree: degree,
          institution: institution,
          completionYear: completionYear,
        },
      };

      const { data } = await axios.put(`${api}/profiles/${id}`, updatedData);
      console.warn("Profile updated:", data);

      // Update profileData with the saved data
      setProfileData(data);
    } catch (error) {
      console.log("Error updating profile:", error.message);
    }
  };

  const handleInputChange = (key, value) => {
    switch (key) {
      case "firstName":
        setFirstName(value);
        break;
      case "lastName":
        setLastName(value);
        break;
      case "completionYear":
        setCompletionYear(value); // value is already a Date object
        break;
      case "degree":
        setDegree(value);
        break;
      case "institution":
        setInstitution(value);
        break;

      default:
        break;
    }
  };

  if (showSkeleton == true) {
    return (
      <View style={[styles.container, { bottom: 50 }]}>
        <SkeletonLoader />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {!profileData ? (
        <EducationEditForm />
      ) : (
        <>
          <View style={styles.profileHeader}>
            <Image style={styles.profileImage} source={{ uri: img }} />
            <View style={styles.profileInfo}>
              <Text style={styles.name}>
                {profileData?.firstName} {profileData?.lastName}
              </Text>
              <Text style={styles.profession}>{profileData?.profession}</Text>
            </View>
          </View>

          <View style={styles.detailsContainer}>
            <Text style={styles.sectionTitle}>Education Details</Text>
            {renderDetailItem("Degree", degree, "degree")}
            {renderDetailItem("Institution", institution, "institution")}
            {renderDetailItem(
              "Completion Year",
              completionYear,
              "completionYear"
            )}
          </View>
        </>
      )}
    </ScrollView>
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
});

export default EducationDetails;
