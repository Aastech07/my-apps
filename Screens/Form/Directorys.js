import React, { useContext, useState } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  Modal,
  Pressable,
} from "react-native";
import Animated, { FadeInLeft } from "react-native-reanimated";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import { useNavigation } from "@react-navigation/native";

import axios from "axios";
import DateTimePicker from "react-native-ui-datepicker";
import dayjs from "dayjs";
import { api } from "../Api";

import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
const Directorys = () => {
  const [companyname, setCompanyName] = useState("");
  const [description, setDescription] = useState("");
  const [facebook, setFaceBook] = useState("");
  const [twitter, setTwitter] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [instagram, setInstagram] = useState("");
  const [companyEmail, setCompanyEmail] = useState("");
  const [gstNumber, setGstNumber] = useState("");
  const [tags, setTags] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [businessArea, setBusinessArea] = useState("");
  const [locality, setLocality] = useState("");
  const [website, setWebsite] = useState("");
  const [address, setAddress] = useState("");

  const [companynameError, setCompanyNameError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [facebookError, setFacebookError] = useState(false);
  const [twitterError, setTwitterError] = useState(false);
  const [linkedinError, setLinkedinError] = useState(false);
  const [instagramError, setInstagramError] = useState(false);
  const [companyEmailError, setCompanyEmailError] = useState(false);
  const [gstNumberError, setGstNumberError] = useState(false);
  const [tagsError, setTagsError] = useState(false);
  const [contactNumberError, setContactNumberError] = useState(false);
  const [businessAreaError, setBusinessAreaError] = useState(false);
  const [localityError, setLocalityError] = useState(false);
  const [websiteError, setWebsiteError] = useState(false);
  const [addressError, setAddressError] = useState(false);
  const [completionYearError, setCompletionYearError] = useState(false);

  const validate = () => {
    if (
      !companyname ||
      !description ||
      !facebook ||
      !twitter ||
      !linkedin ||
      !instagram ||
      !companyEmail ||
      !gstNumber ||
      !tags ||
      !contactNumber ||
      !businessArea ||
      !locality ||
      !website ||
      !address
    ) {
      Alert.alert(
        "Incomplete Information",
        "Please fill in all the required fields before proceeding."
      );
      setCompanyNameError(0);
      setDescriptionError(0);
      setFacebookError(0);
      setTwitterError(0);
      setLinkedinError(0);
      setInstagramError(0);
      setCompanyEmailError(0);
      setGstNumberError(0);
      setTagsError(0);
      setContactNumberError(0);
      setBusinessAreaError(0);
      setLocalityError(0);
      setWebsiteError(0);
      setAddressError(0);
      setCompletionYearError(0);
    } else {
      PostDirectory();
         navigation.navigate("Matrimonys");
    }
  };

  const [selectedImage, setSelectedImage] = useState("");
  const [completionYear, setCompletionYear] = useState(
    dayjs().format("YYYY-MM-DD")
  );
  const navigation = useNavigation();
  const [modalVisible1, setModalVisible1] = useState("");
  const [id, setID] = useState("");

  const img =
    "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?size=338&ext=jpg&ga=GA1.1.1700460183.1708646400&semt=ais";

  React.useEffect(() => {
    const storeData = async () => {
      try {
        const val = await AsyncStorage.getItem("profileid");
        setID(val);
      } catch (e) {
        console.log(e);
      }
    };
    storeData();
  }, []);

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

  const PostDirectory = async () => {

    try {
      const { data } = await axios.post(`${api}/directories`, {
        profileId: id,
        companyLogo: img,
        companyEmail: companyEmail,
        gstNumber: gstNumber,
        contactNumber: contactNumber,
        businessArea: businessArea,
        locality: locality,
        companyName: companyname,
        website: website,
        address: address,
        description: description,
        establishedDate: completionYear,
        socialMediaLinks: {
          facebook: facebook,
          twitter: twitter,
          linkedin: linkedin,
        },
        tags: tags,
      });
      console.warn(data);
      await AsyncStorage.setItem("Directoryid", data._id);
    } catch (error) {
      console.log("Error during login:", error.message);
    }
  };

  const removeimage = () => {
    setSelectedImage("");
  };

  const handleDateChange = (event, selectedDate) => {
    if (selectedDate !== undefined) {
      const year = selectedDate.getFullYear();
      setCompletionYear(year);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 200 }}
      >
        <View
          style={{
            width: responsiveWidth(100),
            height: 90,
            backgroundColor: "#874d3b",
            position: "absolute",
            bottom: 0,
            top: -1,
            elevation: 3,
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
          }}
        >
          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <Text
              style={{
                left: responsiveWidth(10),
                top: responsiveHeight(4),
                fontSize: responsiveFontSize(3),
                color: "red",
                fontWeight: "300",
              }}
            >
              Comm{" "}
              <Text style={{ fontWeight: "300", color: "#fff" }}>unity</Text>
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              bottom: responsiveHeight(-1),
              left: responsiveWidth(80),
            }}
          >
            <TouchableOpacity>
              <FontAwesome5Icon
                name="arrow-left"
                size={18}
                style={{
                  backgroundColor: "#fff",
                  padding: 5,
                  paddingHorizontal: 7,
                  borderRadius: 50,
                  elevation: 3,
                  shadowColor: "#000",
                  shadowOpacity: 0.6,
                  shadowRadius: 10,
                }}
                onPress={() => navigation.goBack()}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ flex: 1 }}>
          <View style={{ flex: 1, top: 110 }}>
            <Animated.Text
              style={{ left: 20, fontSize: 25, fontWeight: "300" }}
              entering={FadeInLeft.duration(500).damping()}
            >
              Create{" "}
              <Text style={{ color: "tomato", fontWeight: "500" }}>
                Directory...
              </Text>
            </Animated.Text>
          </View>

          <View style={{ bottom: 10 }}>
            <Text
              style={{
                position: "absolute",
                top: 135,
                left: 28,
                fontSize: 15,
                fontWeight: "500",
                opacity: 0.6,
              }}
            >
              ADD Image :
            </Text>

            <View
              style={{
                top: 140,
                alignSelf: "center",
                backgroundColor: "#fff",
                paddingHorizontal: 5,
                paddingVertical: 5,
                elevation: 1,
                right: 30,
                borderRadius: 5,
                position: "absolute",
              }}
            >
              <TouchableOpacity onPress={() => removeimage()}>
                <FontAwesome5Icon
                  name="trash-alt"
                  size={15}
                  style={{}}
                  color={"tomato"}
                />
              </TouchableOpacity>
            </View>

            <View
              style={{
                top: 135,
                alignSelf: "center",
                paddingHorizontal: 5,
                paddingVertical: 5,
                elevation: 1,
                borderRadius: 5,
                right: 50,
                marginBottom: 30,
                backgroundColor: "#fff",
              }}
            >
              <FontAwesome5Icon
                name="folder-open"
                size={15}
                style={{}}
                color={"orange"}
                onPress={() => pickImage()}
              />
            </View>

            <View style={{ top: 85, alignItems: "center", left: 10 }}>
              {selectedImage.length === 0 ? (
                <Text style={{ opacity: 0.6, left: 20 }}>{"No images "}</Text>
              ) : (
                <Text
                  style={{ opacity: 0.6, left: 20 }}
                >{`${selectedImage.length} images `}</Text>
              )}
            </View>
          </View>

          <View style={{ bottom: 30 }}>
            <View style={{ bottom: 40 }}>
              <Text
                style={{
                  top: responsiveHeight(24),
                  left: 23,
                  fontSize: 15,
                  fontWeight: "500",
                  opacity: 0.6,
                }}
              >
                Company Name
              </Text>
              <View
                style={[
                  styles.inputView,
                  {
                    borderColor:
                      companynameError === 0 && companyname.trim() === ""
                        ? "red"
                        : "#000",
                  },
                ]}
              >
                <TextInput
                  style={styles.inputText}
                  placeholder="Company Name"
                  placeholderTextColor={
                    companynameError === 0 && companyname.trim() === ""
                      ? "red"
                      : "#000"
                  }
                  onChangeText={(text) => {
                    setCompanyName(text);
                    setCompanyNameError(text.length);
                  }}
                  value={companyname}
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
                }}
              >
                Company Email
              </Text>
              <View
                style={[
                  styles.inputView,
                  {
                    borderColor:
                      companyEmailError === 0 && companyEmail.trim() === ""
                        ? "red"
                        : "#000",
                  },
                ]}
              >
                <TextInput
                  style={styles.inputText}
                  placeholder="xyz@gmail.com"
                  placeholderTextColor={
                    companyEmailError === 0 && companyEmail.trim() === ""
                      ? "red"
                      : "#000"
                  }
                  onChangeText={(text) => {
                    setCompanyEmail(text);
                    setCompanyEmailError(text.length);
                  }}
                  value={companyEmail}
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
                }}
              >
                Add Gst Number
              </Text>
              <View
                style={[
                  styles.inputView,
                  {
                    borderColor:
                      gstNumberError === 0 && gstNumber.trim() === ""
                        ? "red"
                        : "#000",
                  },
                ]}
              >
                <TextInput
                  style={styles.inputText}
                  placeholder="Add Gst Number"
                  placeholderTextColor={
                    gstNumberError === 0 && gstNumber.trim() === ""
                      ? "red"
                      : "#000"
                  }
                  onChangeText={(text) => {
                    setGstNumber(text);
                    setGstNumberError(text.length);
                  }}
                  value={gstNumber}
                  //keyboardType="numeric"
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
                }}
              >
                Add Contact Number
              </Text>
              <View
                style={[
                  styles.inputView,
                  {
                    borderColor:
                      contactNumberError === 0 && contactNumber.trim() === ""
                        ? "red"
                        : "#000",
                  },
                ]}
              >
                <TextInput
                  style={styles.inputText}
                  placeholder="1234567890"
                  placeholderTextColor={
                    contactNumberError === 0 && contactNumber.trim() === ""
                      ? "red"
                      : "#000"
                  }
                  onChangeText={(text) => {
                    setContactNumber(text);
                    setContactNumberError(text.length);
                  }}
                  value={contactNumber}
                  keyboardType="numeric"
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
                }}
              >
                Business Area
              </Text>
              <View
                style={[
                  styles.inputView,
                  {
                    borderColor:
                      businessAreaError === 0 && businessArea.trim() === ""
                        ? "red"
                        : "#000",
                  },
                ]}
              >
                <TextInput
                  style={styles.inputText}
                  placeholder="Business Area"
                  placeholderTextColor={
                    businessAreaError === 0 && businessArea.trim() === ""
                      ? "red"
                      : "#000"
                  }
                  onChangeText={(text) => {
                    setBusinessArea(text);
                    setBusinessAreaError(text.length);
                  }}
                  value={businessArea}
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
                }}
              >
                Enter locality
              </Text>
              <View
                style={[
                  styles.inputView,
                  {
                    borderColor:
                      localityError === 0 && locality.trim() === ""
                        ? "red"
                        : "#000",
                  },
                ]}
              >
                <TextInput
                  style={styles.inputText}
                  placeholder="Enter locality"
                  placeholderTextColor={
                    localityError === 0 && locality.trim() === ""
                      ? "red"
                      : "#000"
                  }
                  onChangeText={(text) => {
                    setLocality(text);
                    setLocalityError(text.length);
                  }}
                  value={locality}
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
                }}
              >
                Address
              </Text>
              <View
                style={[
                  styles.inputView,
                  {
                    borderColor:
                      addressError === 0 && address.trim() === ""
                        ? "red"
                        : "#000",
                  },
                ]}
              >
                <TextInput
                  style={styles.inputText}
                  placeholder="Address"
                  placeholderTextColor={
                    addressError === 0 && address.trim() === "" ? "red" : "#000"
                  }
                  onChangeText={(text) => {
                    setAddress(text);
                    setAddressError(text.length);
                  }}
                  value={address}
                />
              </View>
            </View>

            <View style={{ bottom: 23 }}>
              <Text
                style={{
                  top: responsiveHeight(24),

                  left: 23,
                  fontSize: 15,
                  fontWeight: "500",
                  opacity: 0.6,
                }}
              >
                Established Date
              </Text>
              <View
                style={[
                  styles.inputView,
                  {
                    borderColor: completionYearError === 0 ? "red" : "#000",
                  },
                ]}
              >
                <TouchableOpacity
                  onPress={() => setModalVisible1(!modalVisible1)}
                >
                  <Text
                    style={{
                      top: 15,
                      opacity: 0.7,
                      color: completionYearError === 0 ? "red" : "#000",
                    }}
                  >
                    {completionYear}
                  </Text>
                </TouchableOpacity>
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
                Add Description
              </Text>
              <View style={{ top: responsiveHeight(24.5) }}>
                <TextInput
                  multiline={true}
                  numberOfLines={4}
                  maxLength={100}
                  style={{
                    height: 80,
                    color: "black",
                    borderWidth: 1,
                    marginHorizontal: 17,
                    paddingLeft: 10,
                    borderColor:
                      descriptionError === 0 && description.trim() === ""
                        ? "red"
                        : "#000",
                    borderRadius: 8,
                    opacity: 0.7,
                  }}
                  placeholder="Add Description"
                  placeholderTextColor={
                    descriptionError === 0 && description.trim() === ""
                      ? "red"
                      : "#000"
                  }
                  onChangeText={(text) => {
                    setDescription(text);
                    setDescriptionError(text.length);
                  }}
                  value={description}
                  underlineColorAndroid="transparent"
                />
              </View>
            </View>

            <View style={{ bottom: 10 }}>
              <Text
                style={{
                  top: responsiveHeight(25),
                  left: 23,
                  fontSize: 15,
                  fontWeight: "500",
                  opacity: 0.6,
                }}
              >
                Add Facebook link
              </Text>
              <View
                style={[
                  styles.inputView1,
                  {
                    borderColor:
                      facebookError === 0 && facebook.trim() === ""
                        ? "red"
                        : "#000",
                  },
                ]}
              >
                <TextInput
                  style={styles.inputText}
                  placeholder="Add Facebook link"
                  placeholderTextColor={
                    facebookError === 0 && facebook.trim() === ""
                      ? "red"
                      : "#000"
                  }
                  onChangeText={(text) => {
                    setFaceBook(text);
                    setFacebookError(text.length);
                  }}
                  value={facebook}
                />
                <FontAwesome5Icon
                  name="facebook"
                  size={18}
                  style={{
                    position: "absolute",
                    left: 7,
                    top: 18,
                    opacity: 0.6,
                  }}
                  color={"#000"}
                />
              </View>
            </View>

            <View style={{ bottom: 10 }}>
              <Text
                style={{
                  top: responsiveHeight(25),
                  left: 23,
                  fontSize: 15,
                  fontWeight: "500",
                  opacity: 0.6,
                }}
              >
                Add twitter link
              </Text>
              <View
                style={[
                  styles.inputView1,
                  {
                    borderColor:
                      twitterError === 0 && twitter.trim() === ""
                        ? "red"
                        : "#000",
                  },
                ]}
              >
                <TextInput
                  style={styles.inputText}
                  placeholder="Add twitter link"
                  placeholderTextColor={
                    twitterError === 0 && twitter.trim() === "" ? "red" : "#000"
                  }
                  onChangeText={(text) => {
                    setTwitter(text);
                    setTwitterError(text.length);
                  }}
                  value={twitter}
                />
                <FontAwesome5Icon
                  name="twitter"
                  size={18}
                  style={{
                    position: "absolute",
                    left: 7,
                    top: 18,
                    opacity: 0.6,
                  }}
                  color={"#000"}
                />
              </View>
            </View>

            <View style={{ bottom: 10 }}>
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
              <View
                style={[
                  styles.inputView1,
                  {
                    borderColor:
                      linkedinError === 0 && linkedin.trim() === ""
                        ? "red"
                        : "#000",
                  },
                ]}
              >
                <TextInput
                  style={styles.inputText}
                  placeholder="Add linkedin link"
                  placeholderTextColor={
                    linkedinError === 0 && linkedin.trim() === ""
                      ? "red"
                      : "#000"
                  }
                  onChangeText={(text) => {
                    setLinkedin(text);
                    setLinkedinError(text.length);
                  }}
                  value={linkedin}
                />
                <FontAwesome5Icon
                  name="linkedin"
                  size={18}
                  style={{
                    position: "absolute",
                    left: 7,
                    top: 18,
                    opacity: 0.6,
                  }}
                  color={"#000"}
                />
              </View>
            </View>

            <View style={{ bottom: 10 }}>
              <Text
                style={{
                  top: responsiveHeight(25),
                  left: 23,
                  fontSize: 15,
                  fontWeight: "500",
                  opacity: 0.6,
                }}
              >
                Add Instagram link
              </Text>
              <View
                style={[
                  styles.inputView1,
                  {
                    borderColor:
                      instagramError === 0 && instagram.trim() === ""
                        ? "red"
                        : "#000",
                  },
                ]}
              >
                <TextInput
                  style={styles.inputText}
                  placeholder="Add Instagram link"
                  placeholderTextColor={
                    instagramError === 0 && instagram.trim() === ""
                      ? "red"
                      : "#000"
                  }
                  onChangeText={(txt) => setInstagram(txt)}
                  value={instagram}
                />
                <FontAwesome5Icon
                  name="instagram"
                  size={18}
                  style={{
                    position: "absolute",
                    left: 7,
                    top: 15,
                    opacity: 0.6,
                  }}
                  color={"#000"}
                />
              </View>
            </View>

            <View style={{ bottom: 10 }}>
              <Text
                style={{
                  top: responsiveHeight(25),
                  left: 23,
                  fontSize: 15,
                  fontWeight: "500",
                  opacity: 0.6,
                }}
              >
                Add Website link
              </Text>
              <View
                style={[
                  styles.inputView1,
                  {
                    borderColor:
                      websiteError === 0 && website.trim() === ""
                        ? "red"
                        : "#000",
                  },
                ]}
              >
                <TextInput
                  style={styles.inputText}
                  placeholder="Add Website link"
                  placeholderTextColor={
                    websiteError === 0 && website.trim() === "" ? "red" : "#000"
                  }
                  onChangeText={(txt) => setWebsite(txt)}
                  value={website}
                />
                <FontAwesome5Icon
                  name="wordpress"
                  size={18}
                  style={{
                    position: "absolute",
                    left: 7,
                    top: 15,
                    opacity: 0.6,
                  }}
                  color={"#000"}
                />
              </View>
            </View>

            <View style={{ bottom: 5 }}>
              <Text
                style={{
                  top: responsiveHeight(24),
                  left: 23,
                  fontSize: 15,
                  fontWeight: "500",
                  opacity: 0.6,
                }}
              >
                Add Tags
              </Text>
              <View
                style={[
                  styles.inputView,
                  {
                    borderColor:
                      websiteError === 0 && website.trim() === ""
                        ? "red"
                        : "#000",
                  },
                ]}
              >
                <TextInput
                  style={styles.inputText}
                  placeholder="Add Tags"
                  placeholderTextColor={
                    websiteError === 0 && website.trim() === "" ? "red" : "#000"
                  }
                  onChangeText={(txt) => setTags(txt)}
                  value={tags}
                />
              </View>
            </View>
          </View>

          <View style={styles.centeredView1}>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible1}
              onRequestClose={() => {
                //   Alert.alert("Modal has been closed.");
                setModalVisible1(!modalVisible1);
              }}
            >
              <View style={styles.centeredView1}>
                <View style={styles.modalView1}>
                  <DateTimePicker
                    value={completionYear}
                    mode="date"
                    display="default" // You can also use "spinner" or "calendar"
                    onChange={handleDateChange}
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
      </ScrollView>

      <View style={{ bottom: 50, left: responsiveWidth(21) }}>
        <TouchableOpacity
          style={{
            width: "50%",
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
            Next
          </Text>
          <FontAwesome5Icon
            name="arrow-right"
            style={{
              position: "absolute",
              left: 135,
              backgroundColor: "#874d3b",
              padding: 12,
              borderRadius: 50,
              color: "#fff",
            }}
          />
        </TouchableOpacity>
      </View>

      <View style={{ bottom: 100, right: responsiveWidth(26) }}>
        <TouchableOpacity
          style={{
            width: "40%",
            borderWidth: 1,
            borderRadius: 5,
            height: 50,
            alignItems: "center",
            justifyContent: "center",
            top: responsiveHeight(10),

            alignSelf: "center",
            borderColor: "tomato",
          }}
          onPress={() => navigation.navigate("Matrimonys")}
        >
          <Text style={{ color: "tomato", fontSize: 16, fontWeight: "500" }}>
            Skip
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Directorys;
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
    opacity: 0.6,

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
