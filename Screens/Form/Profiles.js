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
  Platform,
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

const Profiles = ({ id }) => {
  const navigation = useNavigation();
  const ids = id?.user._id;
  const img =
    "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?size=338&ext=jpg&ga=GA1.1.632798143.1705622400&semt=ais";

  const [firstName, setFirstName] = useState("");
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
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [motherNameError, setMotherNameError] = useState(false);
  const [fatherNameError, setFatherNameError] = useState(false);
  const [countryError, setCountryError] = useState(false);
  const [stateError, setStateError] = useState(false);
  const [cityError, setCityError] = useState(false);
  const [streetError, setStreetError] = useState(false);
  const [postalCodeError, setPostalCodeError] = useState(false);
  const [professionError, setProfessionError] = useState(false);
  const [ageError, setAgeError] = useState(false);
  const [genderError, setGenderError] = useState(false);
  const [languagesError, setLanguagesError] = useState(false);
  const [maritalError, setMaritalError] = useState(false);
  const [countrys, setCountrys] = useState([]);
  const [states, setStates] = useState([]);
  const [Citys, setCitys] = useState([]);
  const Api = api;

  const Professions = [
    { key: "1", value: "Business" },
    { key: "2", value: "Employee" },
    { key: "3", value: "Self Employee" },
  ];

  const Languages = [
    { key: "1", value: "Hindi" },
    { key: "2", value: "English" },
    { key: "3", value: "Gujarati" },
    { key: "4", value: "Marathi" },
  ];

  const MaritalStatus = [
    { key: "1", value: "Single" },
    { key: "2", value: "Married" },
    { key: "3", value: "Divorced" },
    { key: "4", value: "Widowed" },
  ];

  const Genders = [
    { key: "1", value: "Male" },
    { key: "2", value: "Female" },
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
      !profession ||
      !age ||
      !languages ||
      !genders
    ) {
      Alert.alert(
        "Incomplete Information",
        "Please fill in all the required fields before proceeding."
      );

      setFirstNameError(0);
      setLastNameError(0);
      setCountryError(0);
      setMotherNameError(0);
      setFatherNameError(0);
      setCityError(0);
      setPostalCodeError(0);
      setProfession(0);
      setStateError(0);
      setStreetError(0);
      setProfessionError(0);
      setAgeError(0);
      setGenderError(0);
      setLanguagesError(0);
      setMaritalError(0);
    } else {
      loginUser();
      //ImageUpload();
      navigation.navigate("FamilyTree", { data: ids, profileid: profileid });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.countrystatecity.in/v1/countries",
          {
            headers: {
              "X-CSCAPI-KEY":
                "YWdZbVBYYTRXNml4WEFuMGdvYlVZeEhmaUZoOHFWWm9oUXFiQm03Rw==",
            },
          }
        );
        let newArray = response.data.map((item) => {
          return { key: item.id, value: item.name };
        });
        setCountrys(newArray);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const fetchState = async () => {
    try {
      const response = await axios.get(
        `https://api.countrystatecity.in/v1/countries/${country[0] +
          country[1]}/states`,
        {
          headers: {
            "X-CSCAPI-KEY":
              "YWdZbVBYYTRXNml4WEFuMGdvYlVZeEhmaUZoOHFWWm9oUXFiQm03Rw==",
          },
        }
      );

      setStates(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCity = async () => {
    try {
      const response = await axios.get(
        `https://api.countrystatecity.in/v1/countries/${country[0] +
          country[1]}/states/${state[0] + state[1]}/cities`,
        {
          headers: {
            "X-CSCAPI-KEY":
              "YWdZbVBYYTRXNml4WEFuMGdvYlVZeEhmaUZoOHFWWm9oUXFiQm03Rw==",
          },
        }
      );
      setCitys(response.data);
    } catch (error) {
      console.log(error);
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

  const handelText = (text) => {
    setPostalCode(text);
    setPostalCodeError(text.length === 0);
    if (text.length >= 7) {
      setPostalCode(false);
      alert("Postal code should be 6 characters or less");
    } else {
      // You might want to clear the postalCode state here if it's not 6 characters
      //   setPostalCode(""); // Clear the postalCode state
    }
  };

  // setAge(date) + setAgeError(date)

  const onChange = (date, selectedDate) => {
    const formattedDate = dayjs(date).format("YYYY-MM-DD");
    setModalVisible1(Platform.OS === "ios");
    setAge(formattedDate);
    setAgeError(formattedDate);
  };

  const minDate = new Date();
  minDate.setDate(minDate.getDate() - 15); // Minimum date: 15 days ago

  const loginUser = async () => {
    console.warn(ids);
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
      console.warn(data);
      console.log(data._id);
      await AsyncStorage.setItem("profileid", data._id);
      await AsyncStorage.setItem("UserID", ids);
      await AsyncStorage.setItem("ShowScreen", profession);
    } catch (error) {
      console.error("Error during login:", error.message);
    }
  };

  const ImageUpload = async () => {
    const formData = new FormData();
    formData.append("url", photo||selectedImage);

    try {
      const response = await axios.post(
        ` ${api}/uploadImage/profiles/${profileid}`,
        FormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response) {
        console.log("Login successful. Token:", response.data.url);
      } else {
        console.log("object");
      }
    } catch (error) {
      console.error("Error during sending Image to backend:", error.message);
    }
  };
  // const countryNames = countrys.map(
  //   (country) => `(${country.iso2}) ${country.name}`
  // );

  const stateNames = states.map((state) => ({
    value: `${state.iso2} ${state.name}`,
    key: id,
  }));

  const cityNames = Citys.map((city) => ({ value: `${city.name}`, key: id }));

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

          <View style={{ bottom: 20 }}>
            <View style={{}}>
              <Text
                style={{
                  top: responsiveHeight(24),
                  left: 23,
                  fontSize: 15,
                  fontWeight: "500",
                  opacity: 0.6,
                  color:
                    firstNameError === 0 && firstName.trim() === ""
                      ? "red"
                      : "#000",
                }}
              >
                First Name
              </Text>
              <View style={[styles.inputView]}>
                <TextInput
                  style={[styles.inputText]}
                  placeholder="First Name"
                  placeholderTextColor={"#000"}
                  onChangeText={(text) => {
                    setFirstName(text);
                    setFirstNameError(text.length);
                  }}
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
                  color:
                    lastNameError === 0 && lastName.trim() === ""
                      ? "red"
                      : "#000",
                }}
              >
                Last Name
              </Text>
              <View style={[styles.inputView]}>
                <TextInput
                  style={styles.inputText}
                  placeholder="Last Name"
                  placeholderTextColor={"#000"}
                  onChangeText={(text) => {
                    setLastName(text);
                    setLastNameError(text.length);
                  }}
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
                  color: genderError === 0 && genders == null ? "red" : "#000",
                }}
              >
                Select Gender
              </Text>
              <View style={{ top: responsiveHeight(25), marginBottom: 13 }}>
                <SelectList
                  setSelected={(val) => setGender(val) + setGenderError(val)}
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
                  color: ageError === 0 ? "red" : "#000",
                }}
              >
                Date of Birth
              </Text>
              <View style={[styles.inputView]}>
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
                      setModalVisible1(!modalVisible1);
                    }}
                  >
                    <View style={styles.centeredView1}>
                      <View style={styles.modalView1}>
                        <DateTimePicker
                          value={age}
                          onValueChange={onChange}
                          mode="date"
                          display="spinner"
                          maximumDate={minDate}
                        />
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
                  color:
                    fatherNameError === 0 && fatherName.trim() === ""
                      ? "red"
                      : "#000",
                }}
              >
                Father Name
              </Text>
              <View style={[styles.inputView]}>
                <TextInput
                  style={styles.inputText}
                  placeholder="Father Name"
                  placeholderTextColor={"#000"}
                  onChangeText={(text) => {
                    setFatherName(text);
                    setFatherNameError(text.length);
                  }}
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
                  color:
                    motherNameError === 0 && motherName.trim() === ""
                      ? "red"
                      : "#000",
                }}
              >
                Mother Name
              </Text>
              <View style={[styles.inputView]}>
                <TextInput
                  style={styles.inputText}
                  placeholder="Mother Name"
                  placeholderTextColor={"#000"}
                  onChangeText={(text) => {
                    setMotherName(text);
                    setMotherNameError(text.length);
                  }}
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
                  color: countryError === 0 && !country ? "red" : "#000",
                }}
              >
                Country
              </Text>
              <View style={{ top: responsiveHeight(25), marginBottom: 13 }}>
                <SelectList
                  setSelected={(val) => {
                    setCountry(val);
                    setCountryError(val);
                  }}
                  data={countrys}
                  save="value"
                  boxStyles={{
                    marginLeft: responsiveWidth(5),
                    marginRight: responsiveWidth(5),

                    // Check if countryError is truthy and country is "undefined"
                  }}
                  dropdownStyles={{
                    marginLeft: responsiveWidth(5),
                    marginRight: responsiveWidth(5),
                  }}
                  onSelect={fetchState}
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
                  color: stateError === 0 && !state ? "red" : "#000",
                }}
              >
                State Name
              </Text>
              <View style={{ top: responsiveHeight(25), marginBottom: 13 }}>
                <SelectList
                  setSelected={(val) => setState(val) + setStateError(val)}
                  data={stateNames}
                  save="value"
                  boxStyles={{
                    marginLeft: responsiveWidth(5),
                    marginRight: responsiveWidth(5),
                  }}
                  dropdownStyles={{
                    marginLeft: responsiveWidth(5),
                    marginRight: responsiveWidth(5),
                  }}
                  onSelect={fetchCity}
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
                  color: cityError === 0 && !cityError ? "red" : "#000",
                }}
              >
                City Name
              </Text>
              <View style={{ top: responsiveHeight(25), marginBottom: 13 }}>
                <SelectList
                  setSelected={(val) => setCity(val) + setCityError(val)}
                  data={cityNames}
                  save="value"
                  boxStyles={{
                    marginLeft: responsiveWidth(5),
                    marginRight: responsiveWidth(5),
                  }}
                  dropdownStyles={{
                    marginLeft: responsiveWidth(5),
                    marginRight: responsiveWidth(5),
                  }}
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
                  color:
                    streetError === 0 && street.trim() === "" ? "red" : "#000",
                }}
              >
                Street Name
              </Text>
              <View style={[styles.inputView]}>
                <TextInput
                  style={styles.inputText}
                  placeholder="Street Name"
                  placeholderTextColor={"#000"}
                  onChangeText={(text) => {
                    setStreet(text);
                    setStreetError(text.length);
                  }}
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
                  color:
                    postalCodeError === 0 && postalcode.trim() === ""
                      ? "red"
                      : "#000",
                }}
              >
                Postal Code
              </Text>
              <View style={[styles.inputView]}>
                <TextInput
                  style={styles.inputText}
                  placeholder="Postal Code"
                  placeholderTextColor={"#000"}
                  onChangeText={(txt) => handelText(txt)}
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
                  color: professionError === 0 && !profession ? "red" : "#000",
                }}
              >
                Enter profession
              </Text>
              <View style={{ top: responsiveHeight(25), marginBottom: 13 }}>
                <SelectList
                  setSelected={(text) => {
                    setProfession(text);
                    setProfessionError(text.length === 0);
                  }}
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
                  color: languagesError === 0 && !languages ? "red" : "#000",
                }}
              >
                Select Languages
              </Text>
              <View style={{ top: responsiveHeight(25), marginBottom: 13 }}>
                <MultipleSelectList
                  setSelected={(text) => {
                    setLanguages(text);
                    setLanguagesError(
                      text.length === 0
                        ? "Please select at least one language"
                        : ""
                    );
                  }}
                  data={Languages}
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
                  color: maritalError === 0 && !marital ? "red" : "#000",
                }}
              >
                Select Marital Status
              </Text>
              <View style={{ top: responsiveHeight(25), marginBottom: 13 }}>
                <SelectList
                  setSelected={(val) => setMarital(val) + setMaritalError(val)}
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
    backgroundColor: "#874d3b",
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
