import React, { useState, useMemo, useEffect, useRef } from "react";
import {
  ScrollView,
  Text,
  View,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Pressable,
  Alert,
} from "react-native";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import {
  responsiveHeight,
  responsiveFontSize,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import {
  MultipleSelectList,
  SelectList,
} from "react-native-dropdown-select-list";
import { Camera, CameraType } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import Animated, {
  FadeInUp,
  FadeInLeft,
  FadeInDown,
} from "react-native-reanimated";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RadioGroup from "react-native-radio-buttons-group";
import DateTimePicker from "react-native-ui-datepicker";
import dayjs from "dayjs";
import { api } from "../Api";
import { useNavigation } from "@react-navigation/native";

const Profiles = ({ id }) => {
  const navigation = useNavigation();
  const ids = id.user._id;
  const img =
    "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?size=338&ext=jpg&ga=GA1.1.632798143.1705622400&semt=ais";

  const [firstName, setFirstName] = useState("");
  const [error, setError] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState(dayjs().format("YYYY-MM-DD"));
  const [marital, setMarital] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [motherName, setMotherName] = useState("");
  const [cameraRef, setCameraRef] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [postalcode, setPostalCode] = useState("");
  const [street, setStreet] = useState("");
  const [profession, setProfession] = useState("");
  const [languages, setLanguages] = useState("");
  const [profileid, setProfileID] = useState("");

  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [genders, setGender] = useState();
  const [modalVisible1, setModalVisible1] = useState(false);

  const Api = api;
  const Marital = [
    { key: "1", value: "Doesn't Matter" },
    { key: "2", value: "Never Married" },
    { key: "3", value: "Divorced" },
    { key: "4", value: "Widowed" },
    { key: "5", value: "Awaiting Divorce" },
    { key: "6", value: "Diary Products" },
    { key: "7", value: "Annulled" },
  ];

  const Professions = [
    { key: "1", value: "Business" },
    { key: "2", value: "Employee" },
    { key: "3", value: "Self Employee" },
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

  const MaritalStatus = [
    { key: "1", value: "Single" },
    { key: "2", value: "Married" },
    { key: "3", value: "Divorced" },
    { key: "4", value: "Widowed" },
  ];

  const storeData = async () => {
    try {
      const jsonValue = JSON.stringify(marital);
      await AsyncStorage.setItem("my-key", jsonValue);
    } catch (e) {
      console.log(e);
    }
  };

  const Genders = [
    { key: "1", value: "male" },
    { key: "2", value: "female" },
  ];

  const validate = () => {
    if (
      !firstName ||
      !lastName ||
      !motherName ||
      !fatherName ||
      !country ||
      !state ||
      !city ||
      !street ||
      !postalcode ||
      !profession
    ) {
      Alert.alert("Incomplete Information", "Please fill in all the required fields before proceeding.",);
    } else {
      loginUser();
      navigation.navigate("FamilyTree");
    }
  };

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasPermission(cameraStatus.status === "granted");
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef) {
      try {
        const photoData = await cameraRef.takePictureAsync({
          quality: 1,
          base64: true,
        });
        setPhoto(`data:image/jpg;base64,${photoData.base64}`);
        //console.log(`data:image/jpg;base64,${photoData.base64}`);
        setModalVisible(!modalVisible);
      } catch (error) {
        console.error("Error taking picture:", error);
      }
    }
  };

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const removeimage = () => {
    setSelectedImage("");
    setPhoto("");
  };

  const toggleCameraType = () => {
    setCameraType(
      cameraType === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };

  const loginUser = async () => {
    try {
      const { data } = await axios.post(`${Api}/profiles`, {
        userId: ids,
        firstName: firstName,
        lastName: lastName,
        family: {
          fatherName: fatherName,
          motherName: motherName,
        },
        profession: profession,
        dateOfBirth: age,
        gender: genders,
        address: {
          street: street,
          city: city,
          state: state,
          country: country,
          postalCode: postalcode,
        },
        languages: languages,
        maritalStatus: marital,
      });

      console.log("Response:", data);
    } catch (error) {
      console.error("Error during login:", error.message);
    }
  };

  const ImageUpload = async () => {
    try {
      const response = await axios.post(`${Api}/uploadImage/profiles`, {
        ProfileID: profileid,
        url: photo,
      });

      if (response) {
        console.log("Login successful. Token:", response.data.url);
      } else {
      }
    } catch (error) {
      console.error("Error during login:", error.message);
    }
  };

  return (
    <View style={{ backgroundColor: "#fff", marginBottom: 80 }}>
      <ScrollView style={{}} contentContainerStyle={{ paddingBottom: 440 }}>
        <View
          style={{ flex: 1, top: 120 }}
          entering={FadeInLeft.duration(500).damping()}
        >
          <Text style={{ left: 20, fontSize: 25, fontWeight: "300" }}>
            Create{" "}
            <Text style={{ color: "tomato", fontWeight: "500" }}>
              Profile...
            </Text>
          </Text>
        </View>

        <View style={{ marginBottom: -230 }}>
          <View
            style={{
              top: 150,
              alignSelf: "center",
              backgroundColor: "#fff",
              paddingHorizontal: 5,
              paddingVertical: 5,
              borderRadius: 50,
              shadowColor: "#000",
              shadowOffset: 20.0,
              shadowOpacity: 0.6,
              shadowRadius: 10,
              elevation: 3,
            }}
          >
            <Image
              source={{
                uri:
                  (photo && photo) || (selectedImage && selectedImage) || img,
              }}
              style={{ height: 80, width: 80, borderRadius: 50 }}
            />
          </View>
          <View
            style={{
              top: 125,
              alignSelf: "center",
              backgroundColor: "#fff",
              paddingHorizontal: 5,
              paddingVertical: 5,
              borderRadius: 50,
              shadowColor: "#000",
              shadowOffset: 20.0,
              shadowOpacity: 0.6,
              shadowRadius: 10,
              elevation: 3,
              left: 30,
            }}
          >
            <TouchableOpacity
              onPress={() => setModalVisible(true) + takePicture()}
            >
              <FontAwesome5Icon
                name="camera"
                size={15}
                style={{}}
                color={"tomato"}
              />
            </TouchableOpacity>
          </View>

          <View
            style={{
              top: 100,
              alignSelf: "center",
              backgroundColor: "#fff",
              paddingHorizontal: 5,
              paddingVertical: 5,
              borderRadius: 50,
              shadowColor: "orange",
              shadowOffset: 20.0,
              shadowOpacity: 0.6,
              shadowRadius: 10,
              elevation: 3,
              right: 30,
            }}
          >
            <TouchableOpacity onPress={() => pickImage()}>
              <FontAwesome5Icon
                name="folder-open"
                size={15}
                style={{}}
                color={"orange"}
              />
            </TouchableOpacity>
          </View>

          <View style={{ top: 120, alignSelf: "center" }}>
            <Text onPress={() => removeimage()} style={{ fontWeight: "300" }}>
              Remove <Text style={{ color: "tomato" }}>Image..</Text>
            </Text>
          </View>

          <View style={{ bottom: 5 }}>
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
                Enter firstName
              </Text>
              <View style={styles.inputView}>
                <TextInput
                  style={styles.inputText}
                  placeholder="Enter firstName"
                  placeholderTextColor="black"
                  onChangeText={(text) => setFirstName(text)}
                  value={firstName}
                />
                <FontAwesome5Icon
                  name="signature"
                  size={16}
                  style={{
                    position: "absolute",
                    left: 5,
                    top: 18,
                    opacity: 0.6,
                  }}
                  color={"#000"}
                />
              </View>
            </View>

            <View style={{ top: 9 }}>
              <Text
                style={{
                  top: responsiveHeight(24),
                  left: 23,
                  fontSize: 15,
                  fontWeight: "500",
                  opacity: 0.6,
                }}
              >
                Enter LastName
              </Text>
              <View
                style={[
                  styles.inputView,
                  { borderColor: error.length == 0 ? "#000" : "red" },
                ]}
              >
                <TextInput
                  style={styles.inputText}
                  placeholder="Enter lastName"
                  placeholderTextColor="black"
                  onChangeText={(text) => setLastName(text)}
                  value={lastName}
                />
                <FontAwesome5Icon
                  name="signature"
                  size={16}
                  style={{
                    position: "absolute",
                    left: 5,
                    top: 18,
                    opacity: 0.6,
                  }}
                  color={"#000"}
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
                Select Gender
              </Text>
              <View style={{ top: responsiveHeight(25), marginBottom: 13 }}>
                <SelectList
                  setSelected={(val) => setGender(val)}
                  data={Genders}
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
                  top: responsiveHeight(24),

                  left: 23,
                  fontSize: 15,
                  fontWeight: "500",
                  opacity: 0.6,
                }}
              >
                Date of Birth :<Text style={{ color: "tomato" }}> {age}</Text>
              </Text>

              <TouchableOpacity onPress={() => setModalVisible1(true)}>
                <FontAwesome5Icon
                  name="calendar"
                  style={{
                    position: "absolute",
                    top: responsiveWidth(42),
                    left: responsiveWidth(79),
                    fontWeight: "400",
                    borderRadius: 4,
                    backgroundColor: "#fff",
                    padding: 3,
                    paddingHorizontal: 7,
                    shadowColor: "#000",
                    shadowOpacity: 0.5,
                    shadowRadius: 10,
                    elevation: 1,
                    color: "tomato",
                  }}
                  size={16}
                />
              </TouchableOpacity>

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
                Enter Father Name
              </Text>
              <View style={styles.inputView}>
                <TextInput
                  style={styles.inputText}
                  placeholder="Enter firstName"
                  placeholderTextColor="black"
                  onChangeText={(txt) => setFatherName(txt)}
                  value={fatherName}
                />
                <FontAwesome5Icon
                  name="signature"
                  size={16}
                  style={{
                    position: "absolute",
                    left: 5,
                    top: 18,
                    opacity: 0.6,
                  }}
                  color={"#000"}
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
                Enter Mother Name
              </Text>
              <View style={styles.inputView}>
                <TextInput
                  style={styles.inputText}
                  placeholder="Enter Mother Name"
                  placeholderTextColor="black"
                  onChangeText={(txt) => setMotherName(txt)}
                  value={motherName}
                />
                <FontAwesome5Icon
                  name="signature"
                  size={16}
                  style={{
                    position: "absolute",
                    left: 5,
                    top: 18,
                    opacity: 0.6,
                  }}
                  color={"#000"}
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
                Enter Country
              </Text>
              <View style={styles.inputView}>
                <TextInput
                  style={styles.inputText}
                  placeholder="Enter Country Name"
                  placeholderTextColor="black"
                  onChangeText={(text) => setCountry(text)}
                  value={country}
                />
                <FontAwesome5Icon
                  name="flag"
                  size={16}
                  style={{
                    position: "absolute",
                    left: 5,
                    top: 18,
                    opacity: 0.6,
                  }}
                  color={"#000"}
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
                Enter State Name
              </Text>
              <View style={styles.inputView}>
                <TextInput
                  style={styles.inputText}
                  placeholder="Enter State Name"
                  placeholderTextColor="black"
                  onChangeText={(txt) => setState(txt)}
                  value={state}
                />
                <FontAwesome5Icon
                  name="chart-area"
                  size={16}
                  style={{
                    position: "absolute",
                    left: 5,
                    top: 18,
                    opacity: 0.6,
                  }}
                  color={"#000"}
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
                Enter City Name
              </Text>
              <View style={styles.inputView}>
                <TextInput
                  style={styles.inputText}
                  placeholder="Enter City Name"
                  placeholderTextColor="black"
                  onChangeText={(txt) => setCity(txt)}
                  value={city}
                />
                <FontAwesome5Icon
                  name="city"
                  size={16}
                  style={{
                    position: "absolute",
                    left: 5,
                    top: 18,
                    opacity: 0.6,
                  }}
                  color={"#000"}
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
                Enter Street Name
              </Text>
              <View style={styles.inputView}>
                <TextInput
                  style={styles.inputText}
                  placeholder="Enter Street Name"
                  placeholderTextColor="black"
                  onChangeText={(txt) => setStreet(txt)}
                  value={street}
                />
                <FontAwesome5Icon
                  name="map-pin"
                  size={16}
                  style={{
                    position: "absolute",
                    left: 10,
                    top: 18,
                    opacity: 0.6,
                  }}
                  color={"#000"}
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
                Enter Postal Code
              </Text>
              <View style={styles.inputView}>
                <TextInput
                  style={styles.inputText}
                  placeholder="Enter Postal Code"
                  placeholderTextColor="black"
                  onChangeText={(txt) => setPostalCode(txt)}
                  value={postalcode}
                  keyboardType="numeric"
                />
                <FontAwesome5Icon
                  name="sort-numeric-up-alt"
                  size={16}
                  style={{
                    position: "absolute",
                    left: 5,
                    top: 18,
                    opacity: 0.6,
                  }}
                  color={"#000"}
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
                Enter profession
              </Text>
              <View style={{ top: responsiveHeight(25), marginBottom: 13 }}>
                <SelectList
                  setSelected={(text) => setProfession(text)}
                  data={Professions}
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
                Select Languages
              </Text>
              <View style={{ top: responsiveHeight(25), marginBottom: 13 }}>
                <MultipleSelectList
                  setSelected={(text) => setLanguages(text)}
                  data={MotherTongue}
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
                Select Marital Status
              </Text>
              <View style={{ top: responsiveHeight(25), marginBottom: 13 }}>
                <SelectList
                  setSelected={setMarital}
                  data={MaritalStatus}
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

            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => setModalVisible(!modalVisible)}
            >
              <View style={{ flex: 1 }}>
                <View style={styles.container}>
                  <Camera
                    ref={(ref) => setCameraRef(ref)}
                    style={styles.camera}
                    type={cameraType}
                  />
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => takePicture()}
                    >
                      <FontAwesome5Icon
                        name="camera"
                        size={20}
                        color={"tomato"}
                      />
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={{
                        backgroundColor: "#fff",
                        padding: 10,
                        borderRadius: 50,
                        borderWidth: 0.5,
                        borderColor: "tomato",
                        position: "absolute",
                        left: 130,
                        top: 10,
                      }}
                      onPress={() => toggleCameraType()}
                    >
                      <FontAwesome5Icon
                        name="redo-alt"
                        size={20}
                        color={"tomato"}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
          </View>
        </View>
      </ScrollView>

      <View style={{ bottom: responsiveHeight(18) }}>
        <TouchableOpacity style={styles.loginBtn} onPress={() => validate()}>
          <Text style={{ color: "white", fontSize: 18, fontWeight: "500" }}>
            Next
          </Text>
          <FontAwesome5Icon
            name="arrow-right"
            style={{
              position: "absolute",
              left: 215,
              backgroundColor: "#3D56F0",
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

export default Profiles;

const styles = StyleSheet.create({
  title: {
    fontWeight: "bold",
    fontSize: 50,
    color: "#fb5b5a",
    marginBottom: 40,
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
  loginBtn: {
    width: "88%",
    backgroundColor: "#3D50DF",
    borderRadius: 5,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 50,
    top: responsiveHeight(20),

    elevation: 3,
    alignSelf: "center",
  },
  container: {
    flex: 1,
    flexDirection: "column",
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
  },
  button: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 50,
    borderWidth: 0.5,
    borderColor: "tomato",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
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