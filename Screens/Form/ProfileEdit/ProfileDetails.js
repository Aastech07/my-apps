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
import {
  MultipleSelectList,
  SelectList,
} from "react-native-dropdown-select-list";
// import { MotherTongue } from "../../By&Sell/SellDetails/Api";
import DateTimePicker from "react-native-ui-datepicker";
import SkeletonLoader from "../../skeletonloader/Skeletonloader";
const ProfileDetails = () => {
  const [profileData, setProfileData] = useState(null);
  const [editableFields, setEditableFields] = useState({});
  const [id, setID] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState(dayjs().format("YYYY-MM-DD"));
  const [gender, setGender] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [motherName, setMotherName] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [street, setStreet] = useState("");
  const [profession, setProfession] = useState("");
  const [languages, setLanguages] = useState([]);
  const [modalVisible1, setModalVisible1] = useState(false);
  const img =
    "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?size=338&ext=jpg&ga=GA1.1.1700460183.1708646400&semt=ais";

  const Genders = [
    { key: "1", value: "male" },
    { key: "2", value: "female" },
  ];

  const Professions = [
    { key: "1", value: "Business" },
    { key: "2", value: "Employee" },
    { key: "3", value: "Self Employee" },
  ];

  const MaritalStatus = [
    { key: "1", value: "Single" },
    { key: "2", value: "Married" },
    { key: "3", value: "Divorced" },
    { key: "4", value: "Widowed" },
  ];

  const MotherTongue = [
    { key: "1", value: "Doesn't Matter" },
    { key: "2", value: "Assamese" },
    { key: "3", value: "Bengali" },
    { key: "4", value: "English" },
    { key: "5", value: "Gujarati" },
    { key: "6", value: "Hindi" },
    { key: "7", value: "Kannada" },
    { key: "8", value: "Konkani" },
    { key: "9", value: "Malayalam" },
    { key: "10", value: "Marathi" },
    { key: "11", value: "Marwari" },
    { key: "11", value: "Odia" },
    { key: "12", value: "Punjabi" },
    { key: "13", value: "Sindhi" },
    { key: "14", value: "Tamil" },
    { key: "15", value: "Telugu" },
    { key: "16", value: "Urdu" },
    { key: "17", value: "Aka" },
    { key: "18", value: "Arabic" },
    { key: "19", value: "Arunachali" },
    { key: "20", value: "Awadhi" },
    { key: "21", value: "Baluchi" },
    { key: "22", value: "Bhojpuri" },
    { key: "23", value: "Bhutia" },
    { key: "24", value: "Brahui" },
    { key: "25", value: "Brij" },
    { key: "26", value: "Burmese" },
    { key: "27", value: "Chattisgarhi" },
    { key: "28", value: "Chinese" },
    { key: "29", value: "Coorgi" },
    { key: "30", value: "Dogi" },
    { key: "31", value: "French" },
    { key: "32", value: "Garhwali" },
    { key: "33", value: "Garo" },
    { key: "34", value: "Haryanavi" },
    { key: "35", value: "Himachali/Pahari" },
    { key: "36", value: "Hindko" },
    { key: "37", value: "Kakbarak" },
    { key: "38", value: "Kanauji" },
    { key: "39", value: "Kashmiri" },
    { key: "40", value: "Khandesi" },
    { key: "41", value: "Khasi" },
    { key: "42", value: "Koshali" },
    { key: "43", value: "Kumaoni" },
    { key: "44", value: "Kutchi" },
    { key: "45", value: "Ladakhi" },
    { key: "46", value: "Lepcha" },
    { key: "47", value: "Magahi" },
    { key: "48", value: "Maithili" },
    { key: "49", value: "Malay" },
    { key: "50", value: "Manipuri" },
    { key: "51", value: "Miji" },
    { key: "52", value: "Mizo" },
    { key: "53", value: "Monpa" },
    { key: "54", value: "Nepali" },
    { key: "55", value: "Pashto" },
    { key: "56", value: "Persian" },
    { key: "57", value: "Rajasthani" },
    { key: "58", value: "Russian" },
    { key: "59", value: "Santhali" },
    { key: "60", value: "Seraiki" },
    { key: "61", value: "Sinhala" },
    { key: "62", value: "Sourashtra" },
    { key: "63", value: "Spanish" },
    { key: "64", value: "Swedish" },
    { key: "65", value: "Tagalog" },
    { key: "66", value: "Tulu" },
    { key: "67", value: "Other" },
  ];
  useEffect(() => {
    const fetchData = async () => {
      try {
        const profileId = await AsyncStorage.getItem("profileid");

        if (profileId !== null) {
          const { data } = await axios.get(`${api}/profiles/${profileId}`);
          setProfileData(data);
          setID(data._id);
          setFirstName(data.firstName);
          setLastName(data.lastName);
          // Convert dateOfBirth string to Date object
          setAge(new Date(data.dateOfBirth));
          setMaritalStatus(data.maritalStatus);
          setGender(data.gender);
          setFatherName(data.family.fatherName);
          setMotherName(data.family.motherName);
          setCity(data.address.city);
          setCountry(data.address.country);
          setState(data.address.state);
          setPostalCode(data.address.postalCode);
          setStreet(data.address.street);
          setProfession(data.profession);
          setLanguages(data.languages);

          // Initialize editableFields state with all fields set to false
          const fields = {};
          Object.keys(data).forEach((key) => {
            fields[key] = false;
          });
          setEditableFields(fields);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const limets = (dateOfBirth) => {
    const birthDate = new Date(dateOfBirth);
    const formattedBirthDate = birthDate.toISOString().split("T")[0];
    return formattedBirthDate;
  };

  const renderLanguages = ({ item, index }) => (
    <View style={styles.languageContainer}>
      <Text style={styles.languageItem}>{item}</Text>
      <TouchableOpacity onPress={() => handleDeleteLanguage(index)}>
        <FontAwesome5Icon name="trash" size={20} color="#FF0000" />
      </TouchableOpacity>
    </View>
  );

  const handleDeleteLanguage = (index) => {
    const updatedLanguages = [...languages];
    updatedLanguages.splice(index, 1);
    setLanguages(updatedLanguages);
  };

  const renderDetailItem = (label, value, key) => {
    const isEditing = editableFields[key];

    if (isEditing) {
      return (
        <View style={styles.detailItem}>
          <Text style={styles.label}>{label}:</Text>
          {label === "Gender" && (
            <SelectList
              data={Genders}
              setSelected={(val) => handleInputChange(key, val)}
              multiple={false}
              boxStyles={{ flex: 1, minWidth: 200 }} // Adjust as needed
              search={false}
              save="value"
            />
          )}
          {label === "Marital Status" && (
            <SelectList
              setSelected={(val) => handleInputChange(key, val)}
              data={MaritalStatus}
              save="value"
              boxStyles={{ flex: 1, minWidth: 200 }}
              search={false}
            />
          )}
          {label === "Profession" && (
            <SelectList
              setSelected={(val) => handleInputChange(key, val)}
              data={Professions}
              save="value"
              boxStyles={{ flex: 1, minWidth: 200 }}
              search={false}
            />
          )}
          {label === "Date of Birth" && (
            <TouchableOpacity>
              <Text
                style={styles.editText}
                onPress={() => setModalVisible1(!modalVisible1)}
              >
                {limets(age)}
              </Text>
            </TouchableOpacity>
          )}
          {label !== "Gender" &&
            label !== "Marital Status" &&
            label !== "Profession" &&
            label !== "Date of Birth" && (
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
        firstName,
        lastName,
        dateOfBirth: age.toString(), // Convert Date to ISO string
        gender,
        maritalStatus,
        family: {
          fatherName,
          motherName,
        },
        address: {
          city,
          country,
          state,
          postalCode,
          street,
        },
        profession,
        languages,
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
      case "dateOfBirth":
        setAge(value); // value is already a Date object
        break;
      case "gender":
        setGender(value);
        break;
      case "maritalStatus":
        setMaritalStatus(value);
        break;
      case "fatherName":
        setFatherName(value);
        break;
      case "motherName":
        setMotherName(value);
        break;
      case "street":
        setStreet(value);
        break;
      case "city":
        setCity(value);
        break;
      case "state":
        setState(value);
        break;
      case "country":
        setCountry(value);
        break;
      case "postalCode":
        setPostalCode(value);
        break;
      case "profession":
        setProfession(value);
        break;
      case "languages":
        setLanguages(value);
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
    <ScrollView style={styles.container}>
      <View style={styles.profileHeader}>
        <Image style={styles.profileImage} source={{ uri: img }} />
        <View style={styles.profileInfo}>
          <Text style={styles.name}>
            {profileData.firstName} {profileData.lastName}
          </Text>
          <Text style={styles.profession}>{profileData.profession}</Text>
        </View>
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.sectionTitle}>Personal Details</Text>
        {renderDetailItem("First Name", firstName, "firstName")}
        {renderDetailItem("Last Name", lastName, "lastName")}
        {renderDetailItem("Date of Birth", limets(age), "dateOfBirth")}
        {renderDetailItem("Gender", gender, "gender")}
        {renderDetailItem("Marital Status", maritalStatus, "maritalStatus")}
        {renderDetailItem("Father's Name", fatherName, "fatherName")}
        {renderDetailItem("Mother's Name", motherName, "motherName")}
        {renderDetailItem("Profession", profession, "profession")}

        <Text style={styles.sectionTitle}>Address</Text>
        {renderDetailItem("Street", street, "street")}
        {renderDetailItem("City", city, "city")}
        {renderDetailItem("State", state, "state")}
        {renderDetailItem("Country", country, "country")}
        {renderDetailItem("Postal Code", postalCode, "postalCode")}

        <Text style={styles.sectionTitle}>Languages</Text>
        <FlatList
          data={languages}
          renderItem={renderLanguages}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          style={styles.languagesContainer}
        />

        {languages.length > 1 && (
          <TouchableOpacity
            style={{ left: 290, bottom: 15 }}
            onPress={() => handleSave("languages")}
          >
            <FontAwesome5Icon name="save" size={20} color="#007BFF" />
            <Text style={{ right: 4, fontSize: 11 }}>Save</Text>
          </TouchableOpacity>
        )}

        <View style={{}}>
          <MultipleSelectList
            setSelected={setLanguages}
            data={MotherTongue}
            save="value"
            boxStyles={{ flex: 1, minWidth: 200 }}
          />
        </View>
      </View>

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
                value={age}
                onValueChange={(date) => setAge(date)}
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

export default ProfileDetails;
