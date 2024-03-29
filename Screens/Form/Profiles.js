import React, { useState, useEffect } from "react";
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
  responsiveWidth,
} from "react-native-responsive-dimensions";
import {
  MultipleSelectList,
  SelectList,
} from "react-native-dropdown-select-list";
import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import Animated, { FadeInLeft } from "react-native-reanimated";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from "react-native-ui-datepicker";
import dayjs from "dayjs";
import { api } from "../Api";
import { useNavigation } from "@react-navigation/native";
import { MotherTongue } from "../By&Sell/SellDetails/Api";

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
  const [profileid, setProfileID] = useState([]);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [genders, setGender] = useState();
  const [modalVisible1, setModalVisible1] = useState(false);

  const Api = api;

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
      Alert.alert(
        "Incomplete Information",
        "Please fill in all the required fields before proceeding."
      );
    } else {
      loginUser();
      ImageUpload();
      navigation.navigate("FamilyTree", { data: ids, profileid: profileid });
    }
  };

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasPermission(cameraStatus.status === "granted");
    })();
    setProfileID("");
  }, []);

  const takePicture = async () => {
    if (cameraRef) {
      try {
        const photoData = await cameraRef.takePictureAsync({
          quality: 1,
          base64: true,
        });
        setPhoto(`data:image/jpg;base64,${photoData.base64}`);
        setModalVisible(!modalVisible);
      } catch (error) {
        console.log("Error taking picture:", error);
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
      await AsyncStorage.setItem("profileid", data._id);
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
                Date of Birth
              </Text>
              <View style={styles.inputView}>
                <TouchableOpacity
                  onPress={() => setModalVisible1(!modalVisible1)}
                >
                  <Text style={{ top: 15, opacity: 0.7 }}>{age}</Text>
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
                  maxHeight={200}
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
    paddingLeft: 20,
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
