import React, { useState, useMemo } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Modal,
  Pressable,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Animated, {
  FadeInUp,
  FadeInLeft,
  FadeInDown,
} from "react-native-reanimated";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import {

  SelectList,
} from "react-native-dropdown-select-list";
import RadioGroup from "react-native-radio-buttons-group";
import DateTimePicker from "react-native-ui-datepicker";
import Slider from "@react-native-community/slider";
import dayjs from "dayjs";
import { useNavigation } from "@react-navigation/native";
const Matrimonys = () => {
  const navigation = useNavigation()
  const ProfileCreatedBy = [
    { key: "1", value: "Self" },
    { key: "2", value: "Parent/Guardian" },
    { key: "3", value: "Sibling" },
    { key: "4", value: "Friend" },
    { key: "5", value: "Other" },
  ];

  const HealthInformation = [
    { key: "1", value: "No Health Problems" },
    { key: "2", value: "HIV positive" },
    { key: "3", value: "Diabetes" },
    { key: "4", value: "Low BP" },
    { key: "5", value: "High BP" },
    { key: "6", value: "Heart Ailments" },
    { key: "7", value: "other" },
  ];

  const bloodGroup = [
    { key: "1", value: "Don't Know" },
    { key: "2", value: "A+" },
    { key: "3", value: "A-" },
    { key: "4", value: "B+" },
    { key: "5", value: "B-" },
    { key: "6", value: "AB+" },
    { key: "7", value: "AB-" },
    { key: "8", value: "O+" },
    { key: "9", value: "O-" },
  ];

  const Height = [
    { key: "1", value: "4ft" },
    { key: "2", value: "4.11ft" },
    { key: "3", value: "5ft" },
    { key: "4", value: "5.11ft" },
    { key: "5", value: "6ft" },
  ];

  const MaritalStatus = [
    { key: "1", value: "Not Married" },
    { key: "2", value: "Married" },
  ];

  const Religion = [
    { key: "1", value: "Doesn't Matter" },
    { key: "2", value: "Hindu" },
    { key: "3", value: "Muslim" },
    { key: "4", value: "Christian" },
    { key: "5", value: "Sikh" },
    { key: "6", value: "Parsi" },
    { key: "7", value: "Jain" },
    { key: "8", value: "Buddhist" },
    { key: "9", value: "Jewish" },
    { key: "10", value: "No Religion" },
    { key: "11", value: "Spritual - not religious" },
    { key: "11", value: "Other" },
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

  const Community = [
    { key: "1", value: "Digambar" },
    { key: "2", value: "Shetamber" },
    { key: "3", value: "Vania" },
    { key: "4", value: "Porwal" },
  ];

  const fatherStatus = [
    { key: "1", value: "Employed" },
    { key: "2", value: "Business" },
    { key: "3", value: "Retired" },
    { key: "4", value: "Not Employed" },
    { key: "5", value: "Passed Away" },
  ];

  const MotherStatus = [
    { key: "1", value: "Employed" },
    { key: "2", value: "Business" },
    { key: "3", value: "Retired" },
    { key: "4", value: "Homemaker" },
    { key: "5", value: "Passed Away" },
  ];

  const Affluence = [
    { key: "1", value: "Affluent" },
    { key: "2", value: "Upper Middle Class" },
    { key: "3", value: "Middle Class" },
    { key: "4", value: "Lower Middle Class" },
  ];

  const WorkingWith = [
    { key: "1", value: "Private Company" },
    { key: "2", value: "Government/Public Sector" },
    { key: "3", value: "Defense/Civil Services" },
    { key: "4", value: "Business/Self Employed" },
    { key: "5", value: "Not Working" },
  ];

  const Countrys = [
    { key: "1", value: "Doesn't Matter" },
    { key: "2", value: "India" },
    { key: "3", value: "USA" },
    { key: "4", value: "Uk" },
    { key: "5", value: "UAE" },
    { key: "6", value: "Canada" },
    { key: "7", value: "Australia" },
    { key: "8", value: "New Zealand" },
    { key: "9", value: "Pakistan" },
    { key: "10", value: "Saudi Arabia" },
    { key: "11", value: "Kuwait" },
    { key: "11", value: "South Africa" },
  ];

  const Stateliving = [
    { key: "1", value: "Doesn't Matter" },
    { key: "2", value: "Andaman & Nicobar" },
    { key: "3", value: "Andhra Pradesh" },
    { key: "4", value: "Arunachal Pradesh" },
    { key: "5", value: "Assam" },
    { key: "6", value: "Bihar" },
    { key: "7", value: "Chandigarh" },
    { key: "8", value: "Chhattisgarh" },
    { key: "9", value: "Dadra & Nagar Haveli" },
    { key: "10", value: "Daman & Diu" },
    { key: "11", value: "Delhi-NCR" },
    { key: "12", value: "Goa" },
    { key: "13", value: "Gujarati" },
    { key: "14", value: "Haryana" },
    { key: "15", value: "Himachal Pradesh" },
    { key: "16", value: "Jammu & Kashmir" },
    { key: "17", value: "JharKhand" },
    { key: "18", value: "Karnataka" },
    { key: "19", value: "Kerala" },
    { key: "20", value: "Lakshadweep" },
    { key: "21", value: "Madhya Pradesh" },
    { key: "22", value: "Maharashtra" },
    { key: "23", value: "Manipur" },
    { key: "24", value: "Meghalaya" },
    { key: "25", value: "Mizoram" },
    { key: "26", value: "Nagaland" },
    { key: "27", value: "Orissa" },
    { key: "28", value: "Pondicherry" },
    { key: "29", value: "Punjab" },
    { key: "30", value: "Rajashan" },
    { key: "31", value: "Sikkim" },
    { key: "32", value: "Tamil Nadu" },
    { key: "33", value: "Telangana" },
    { key: "34", value: "Tripura" },
    { key: "35", value: "Uttar Pradesh" },
    { key: "36", value: "Uttaranchal" },
    { key: "37", value: "West Bengal" },
  ];

  const radioButtons = useMemo(
    () => [
      {
        id: "1", // acts as primary key, should be unique and non-empty string
        label: "Male",
        value: "option1",
      },
      {
        id: "2",
        label: "Female",
        value: "option2",
      },
    ],
    []
  );

  const radioButtons1 = useMemo(
    () => [
      {
        id: "1",
        label: "None",
        value: "None",
      },
      {
        id: "2",
        label: "Physical Disability",
        value: "Physical Disability",
      },
    ],
    []
  );

  const radioButtons2 = useMemo(
    () => [
      {
        id: "1",
        label: "Joint",
        value: "Joint",
      },
      {
        id: "2",
        label: "Nuclear",
        value: "Nuclear",
      },
    ],
    []
  );

  const radioButtons3 = useMemo(
    () => [
      {
        id: "1",
        label: "Traditional",
        value: "Traditional",
      },
      {
        id: "2",
        label: "Moderate",
        value: "Moderate",
      },
      {
        id: "3",
        label: "Liberal",
        value: "Liberal",
      },
    ],
    []
  );

  const radioButtons4 = useMemo(
    () => [
      {
        id: "1",
        label: "Veg",
        value: "Veg",
      },
      {
        id: "2",
        label: "Non-Veg",
        value: "Non-Veg",
      },
      {
        id: "3",
        label: "Occasionally Non-Veg",
        value: "Occasionally Non-Veg",
      },
      {
        id: "4",
        label: "Eggetarian",
        value: "Eggetarian",
      },
      {
        id: "5",
        label: "Jain",
        value: "Jain",
      },
      {
        id: "6",
        label: "Vegan",
        value: "Vegan",
      },
    ],
    []
  );

  const radioButtons5 = useMemo(
    () => [
      {
        id: "1",
        label: "yes",
        value: "yes",
      },
      {
        id: "2",
        label: "No",
        value: "No",
      },
      {
        id: "3",
        label: "Don't Know",
        value: "Don't Know",
      },
    ],
    []
  );
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedId, setSelectedId] = useState();
  const [disability, setDisability] = useState();
  const [disability1, setDisability1] = useState();
  const [disability2, setDisability2] = useState();
  const [disability3, setDisability3] = useState();
  const [disability4, setDisability4] = useState();
  const [values, setValues] = useState(dayjs().format("YYYY-MM-DD"));
  const [profileData, setProfileData] = useState({
    Profilecreatedby: "",
    maritalStatus: {
      Not_married: "",
      Married: "",
    },
    nativePlace: "",
    healthInformation: "",
    anyDisabiliy: "",
    bloodGroup: "",
    religiousBackground: {
      religion: "",
      motherTongue: "",
      community: "",
      subCommunity: "",
      gothraGothram: "",
    },
    family: {
      fatherStatus: "",
      with: "",
      as: "",
      natureOfBusiness: "",
      motherStatus: "",
      familyLocation: "",
      numberOfSiblings: {},
      familyType: "",
      familyValue: "",
      familyAffluence: "",
    },
    astroDetails: {
      manglikChevvaidosham: {
        Yes: "",
        No: "",
        NotSure: "",
      },
      nakshatra: "",
    },
    hobbies: "",

    partnerPreferences: {
      ageRange: {
        min: "",
        max: "",
      },

      gender: {
        Male: "",
        Female: "",
      },
      education: "",
      profession: "",
      minHeight: "",
      maxIncome: "",
    },
    educationAndCareer: {
      highestQualification: "",
      collegeAttended: "",
      workingWith: "",
      WorkingAs: "",
    },
    lifestyle: "",
    locationOfGroom: {
      countryLivingIn: "",
      stateLivingIn: "",
      cityLivingIn: "",
      grewUpIn: "",
      ethnicOrigin: "",
      zipPinCode: "",
    },
    moreAboutYourselfPartnerAndFamily: "",
    height: "",
    aboutMe: "",
  });

  const handleInputChange = (field, Values) => {
    setProfileData({ ...profileData, [field]: Values });
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 800 }}
      >
        <View
          style={{
            width: responsiveWidth(100),
            height: 90,
            backgroundColor: "#3468C0",
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

          <View style={{ flexDirection: "row", bottom:responsiveHeight(-1), left:responsiveWidth(80),
        }}>
             <TouchableOpacity onPress={()=>navigation.navigate('JobsScreens')}>
             <FontAwesome5Icon name="arrow-left" size={18}  style={{  backgroundColor:'#fff',padding:5,paddingHorizontal:7,borderRadius:50,elevation:3,shadowColor:'#000',shadowOpacity:0.6,shadowRadius:10}}/>
             </TouchableOpacity>
          </View>
        </View>

        <View style={{ flex: 1, top: 110 }}>
          <Animated.Text
            style={{ left: 20, fontSize: 25, fontWeight: "300" }}
            entering={FadeInLeft.duration(500).damping()}
          >
            Create{" "}
            <Text style={{ color: "tomato", fontWeight: "500" }}>
              Matrimony...
            </Text>
          </Animated.Text>

          <View style={{}}>
            <View style={{ left: 22, top: 20 }}>
              <Text
                style={{ fontSize: 17, color: "tomato", fontWeight: "300" }}
              >
                Basic{" "}
                <Text style={{ color: "#000", fontWeight: "400" }}>
                  Info...
                </Text>
              </Text>
            </View>
            <View style={{ bottom: responsiveHeight(20) }}>
              <Text
                style={{
                  top: responsiveHeight(24),
                  left: 23,
                  fontSize: 15,
                  fontWeight: "500",
                  opacity: 0.6,
                }}
              >
                Select Profile Created By
              </Text>
              <View style={{ top: responsiveHeight(25) }}>
                <SelectList
                  setSelected={(text) =>
                    handleInputChange("Profilecreatedby", text)
                  }
                  data={ProfileCreatedBy}
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

            <View style={{ bottom: responsiveHeight(17) }}>
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
              <View style={{ top: responsiveHeight(24), left: 15 }}>
                <RadioGroup
                  radioButtons={radioButtons}
                  onPress={setSelectedId}
                  selectedId={selectedId}
                  layout="row"
                  containerStyle={{ opacity: 0.6 }}
                />
              </View>
            </View>

            <View style={{ bottom: responsiveHeight(15) }}>
              <Text
                style={{
                  top: responsiveHeight(24),
                  left: 23,
                  fontSize: 15,
                  fontWeight: "500",
                  opacity: 0.6,
                }}
              >
                Date of Birth :
                <Text style={{ color: "tomato" }}> {values}</Text>
              </Text>

              <TouchableOpacity onPress={() => setModalVisible(true)}>
                <Text
                  style={{
                    position: "absolute",
                    top:responsiveHeight(21),
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
                >
                  Clike
                </Text>
              </TouchableOpacity>

              <View style={{ top: responsiveHeight(25) }}>
                <View style={styles.centeredView}>
                  <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                      Alert.alert("Modal has been closed.");
                      setModalVisible(!modalVisible);
                    }}
                  >
                    <View style={styles.centeredView}>
                      <View style={styles.modalView}>
                        <DateTimePicker
                          value={values}
                          onValueChange={(date) => setValues(date)}
                        />

                        <Pressable
                          style={[styles.button, styles.buttonClose]}
                          onPress={() => setModalVisible(!modalVisible)}
                        >
                          <Text style={styles.textStyle}>Close</Text>
                        </Pressable>
                      </View>
                    </View>
                  </Modal>
                </View>
              </View>

              <View style={{ bottom: responsiveHeight(1) }}>
                <Text
                  style={{
                    top: responsiveHeight(24),
                    left: 23,
                    fontSize: 15,
                    fontWeight: "500",
                    opacity: 0.6,
                  }}
                >
                  Marital status
                </Text>
                <View style={{ top: responsiveHeight(25) }}>
                  <SelectList
                    setSelected={(text) =>
                      handleInputChange("maritalStatus", text)
                    }
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

              <View style={{ bottom: responsiveHeight(-1.5) }}>
                <Text
                  style={{
                    top: responsiveHeight(24),
                    left: 23,
                    fontSize: 15,
                    fontWeight: "500",
                    opacity: 0.6,
                  }}
                >
                  Height
                </Text>
                <View style={{ top: responsiveHeight(25) }}>
                  <SelectList
                    setSelected={(text) => handleInputChange("height", text)}
                    data={Height}
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

              <View style={{ bottom: responsiveHeight(-4) }}>
                <Text
                  style={{
                    top: responsiveHeight(24),
                    left: 23,
                    fontSize: 15,
                    fontWeight: "500",
                    opacity: 0.6,
                  }}
                >
                  Health Information
                </Text>
                <View style={{ top: responsiveHeight(25) }}>
                  <SelectList
                    setSelected={(text) =>
                      handleInputChange("healthInformation", text)
                    }
                    data={HealthInformation}
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

              <View style={{ bottom: responsiveHeight(-7) }}>
                <Text
                  style={{
                    top: responsiveHeight(24),
                    left: 23,
                    fontSize: 15,
                    fontWeight: "500",
                    opacity: 0.6,
                  }}
                >
                  Any Disability
                </Text>
                <View style={{ top: responsiveHeight(24), left: 15 }}>
                  <RadioGroup
                    radioButtons={radioButtons1}
                    onPress={setDisability}
                    selectedId={disability}
                    layout="row"
                    containerStyle={{ opacity: 0.6 }}
                  />
                </View>
              </View>

              <View style={{ bottom: responsiveHeight(-8) }}>
                <Text
                  style={{
                    top: responsiveHeight(24),
                    left: 23,
                    fontSize: 15,
                    fontWeight: "500",
                    opacity: 0.6,
                  }}
                >
                  Blood Group
                </Text>
                <View style={{ top: responsiveHeight(25) }}>
                  <SelectList
                    setSelected={(text) =>
                      handleInputChange("bloodGroup", text)
                    }
                    data={bloodGroup}
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

              <View style={{ bottom: responsiveHeight(-10) }}>
              <Text
                  style={{
                    top: responsiveHeight(24),
                    left: 23,
                    fontSize: 15,
                    fontWeight: "500",
                    opacity: 0.6,
                  }}
                >
                  Set Age Range
                </Text>


                <Text
                  style={{
                    top: responsiveHeight(26),
                    left: responsiveWidth(10),
                    fontSize: 13,
                    fontWeight: "500",
                    opacity: 0.6,
                  }}
                >
                min Age 18
                </Text>

                <Text
                  style={{
                    top: responsiveHeight(29),
                    left: responsiveWidth(72),
                    fontSize: 13,
                    fontWeight: "500",
                    opacity: 0.6,position:'absolute'
                  }}
                >
                max Age 38
                </Text>

                <View style={{ top: responsiveHeight(26),left:15 }}>
                  <Slider
                    style={{ width: responsiveWidth(95), height: 40 }}
                    minimumValue={0}
                    maximumValue={1}
                    minimumTrackTintColor="red"
                    maximumTrackTintColor="#000000"
                    vertical={true}
                  />
                </View>
              </View>



              <View style={{ bottom: responsiveHeight(-10) }}>
              <Text
                  style={{
                    top: responsiveHeight(25.5),
                    left: 23,
                    fontSize: 15,
                    fontWeight: "500",
                    opacity: 0.6,
                  }}
                >
                  Set Height
                </Text>



                <Text
                  style={{
                    top: responsiveHeight(26),
                    left: responsiveWidth(10),
                    fontSize: 13,
                    fontWeight: "500",
                    opacity: 0.6,
                  }}
                >
                min Height 5.5
                </Text>

                <Text
                  style={{
                    top: responsiveHeight(29),
                    left: responsiveWidth(72),
                    fontSize: 13,
                    fontWeight: "500",
                    opacity: 0.6,position:'absolute'
                  }}
                >
                max Height 6.2
                </Text>

                <View style={{ top: responsiveHeight(26),left:15 }}>
                  <Slider
                    style={{ width: responsiveWidth(95), height: 40 }}
                    minimumValue={0}
                    maximumValue={1}
                    minimumTrackTintColor="red"
                    maximumTrackTintColor="#000000"
                    vertical={true}
                  />
                </View>
              </View>


              <View style={{ bottom: responsiveHeight(-10) }}>
              <Text
                  style={{
                    top: responsiveHeight(25.5),
                    left: 23,
                    fontSize: 15,
                    fontWeight: "500",
                    opacity: 0.6,
                  }}
                >
                  Set Max Income 
                </Text>



                <Text
                  style={{
                    top: responsiveHeight(26),
                    left: responsiveWidth(10),
                    fontSize: 13,
                    fontWeight: "500",
                    opacity: 0.6,
                  }}
                >
                min Income 5lpa
                </Text>

                <Text
                  style={{
                    top: responsiveHeight(29),
                    left: responsiveWidth(68),
                    fontSize: 13,
                    fontWeight: "500",
                    opacity: 0.6,position:'absolute'
                  }}
                >
                max Income 20lpa
                </Text>

                <View style={{ top: responsiveHeight(26),left:15 }}>
                  <Slider
                    style={{ width: responsiveWidth(95), height: 40 }}
                    minimumValue={0}
                    maximumValue={1}
                    minimumTrackTintColor="red"
                    maximumTrackTintColor="#000000"
                    vertical={true}
                  />
                </View>
              </View>


















              <View style={{ bottom: responsiveHeight(-11),marginBottom:10 }}>
                <Text
                  style={{
                    top: responsiveHeight(24),
                    left: 23,
                    fontSize: 15,
                    fontWeight: "500",
                    opacity: 0.6,
                  }}
                >
                  Education
                </Text>
                <View style={{ top: responsiveHeight(25) }}>
                  <SelectList
                    setSelected={(text) =>
                      handleInputChange("partnerPreferences.education", text)
                    }
                    data={bloodGroup}
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

              <View style={{ bottom: responsiveHeight(-12),marginBottom:13 }}>
                <Text
                  style={{
                    top: responsiveHeight(24),
                    left: 23,
                    fontSize: 15,
                    fontWeight: "500",
                    opacity: 0.6,
                  }}
                >
                  Profession
                </Text>
                <View style={{ top: responsiveHeight(25) }}>
                  <SelectList
                    setSelected={(text) =>
                      handleInputChange("partnerPreferences.profession", text)
                    }
                    data={fatherStatus}
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

                <View style={{ left: 22, top: responsiveHeight(36.6) }}>
                  <Text
                    style={{ fontSize: 17, color: "tomato", fontWeight: "300" }}
                  >
                    Religious{" "}
                    <Text style={{ color: "#000", fontWeight: "400" }}>
                      Background...
                    </Text>
                  </Text>
                </View>

                <View style={{ top: 110 }}>
                  <View style={{ bottom: responsiveHeight(1) }}>
                    <Text
                      style={{
                        top: responsiveHeight(24),
                        left: 23,
                        fontSize: 15,
                        fontWeight: "500",
                        opacity: 0.6,
                      }}
                    >
                      Religion
                    </Text>
                    <View style={{ top: responsiveHeight(25) }}>
                      <SelectList
                        setSelected={(text) =>
                          handleInputChange(
                            "religiousBackground.religion",
                            text
                          )
                        }
                        data={Religion}
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

                  <View style={{ bottom: responsiveHeight(-1.5) }}>
                    <Text
                      style={{
                        top: responsiveHeight(24),
                        left: 23,
                        fontSize: 15,
                        fontWeight: "500",
                        opacity: 0.6,
                      }}
                    >
                      Mother Tongue
                    </Text>
                    <View style={{ top: responsiveHeight(25) }}>
                      <SelectList
                        setSelected={(text) =>
                          handleInputChange(
                            "religiousBackground.motherTongue",
                            text
                          )
                        }
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

                  <View style={{ bottom: responsiveHeight(-4) }}>
                    <Text
                      style={{
                        top: responsiveHeight(24),
                        left: 23,
                        fontSize: 15,
                        fontWeight: "500",
                        opacity: 0.6,
                      }}
                    >
                      Community
                    </Text>
                    <View style={{ top: responsiveHeight(25) }}>
                      <SelectList
                        setSelected={(text) =>
                          handleInputChange(
                            "religiousBackground.community",
                            text
                          )
                        }
                        data={Community}
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

                  <View style={{ bottom: responsiveHeight(-7) }}>
                    <Text
                      style={{
                        top: responsiveHeight(24),
                        left: 23,
                        fontSize: 15,
                        fontWeight: "500",
                        opacity: 0.6,
                      }}
                    >
                      Sub Community
                    </Text>
                    <View style={{ top: responsiveHeight(25) }}>
                      <SelectList
                        setSelected={(text) =>
                          handleInputChange(
                            "religiousBackground.subCommunity",
                            text
                          )
                        }
                        data={Community}
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

                  <View style={{ bottom: responsiveHeight(-10) }}>
                    <Text
                      style={{
                        top: responsiveHeight(24),
                        left: 23,
                        fontSize: 15,
                        fontWeight: "500",
                        opacity: 0.6,
                      }}
                    >
                      Gothra/GothraGothram
                    </Text>
                    <View style={{ top: responsiveHeight(25) }}>
                      <SelectList
                        setSelected={(text) =>
                          handleInputChange(
                            "religiousBackground.subCommunity",
                            text
                          )
                        }
                        data={Community}
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
                </View>

                <View style={{ top: 120 }}>
                  <View style={{ left: 22, top: responsiveHeight(36.6) }}>
                    <Text
                      style={{
                        fontSize: 17,
                        color: "tomato",
                        fontWeight: "300",
                      }}
                    >
                      Family{" "}
                      <Text style={{ color: "#000", fontWeight: "400" }}>
                        Background...
                      </Text>
                    </Text>
                  </View>

                  <View style={{ top: 110 }}>
                    <View style={{ bottom: responsiveHeight(1) }}>
                      <Text
                        style={{
                          top: responsiveHeight(24),
                          left: 23,
                          fontSize: 15,
                          fontWeight: "500",
                          opacity: 0.6,
                        }}
                      >
                        Father status
                      </Text>
                      <View style={{ top: responsiveHeight(25) }}>
                        <SelectList
                          setSelected={(text) =>
                            handleInputChange("family.fatherStatus", text)
                          }
                          data={fatherStatus}
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

                    <View style={{ bottom: responsiveHeight(-1.5) }}>
                      <Text
                        style={{
                          top: responsiveHeight(24),
                          left: 23,
                          fontSize: 15,
                          fontWeight: "500",
                          opacity: 0.6,
                        }}
                      >
                        Mother status
                      </Text>
                      <View style={{ top: responsiveHeight(25) }}>
                        <SelectList
                          setSelected={(text) =>
                            handleInputChange("family.motherStatus", text)
                          }
                          data={MotherStatus}
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

                    <View style={{ bottom: responsiveHeight(-4) }}>
                      <Text
                        style={{
                          top: responsiveHeight(24),
                          left: 23,
                          fontSize: 15,
                          fontWeight: "500",
                          opacity: 0.6,
                        }}
                      >
                        Family Location
                      </Text>
                      <View style={styles.inputView}>
                        <TextInput
                          style={styles.inputText}
                          placeholder="Example: Mumbai, India"
                          placeholderTextColor="black"
                          onChangeText={(text) =>
                            handleInputChange("family.familyLocation", text)
                          }
                          value={profileData.family.familyLocation}
                        />
                        <FontAwesome5Icon
                          name="map-pin"
                          size={17}
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

                    <View style={{ bottom: responsiveHeight(-4.5) }}>
                      <Text
                        style={{
                          top: responsiveHeight(24),
                          left: 23,
                          fontSize: 15,
                          fontWeight: "500",
                          opacity: 0.6,
                        }}
                      >
                        Native Place
                      </Text>
                      <View style={styles.inputView}>
                        <TextInput
                          style={styles.inputText}
                          placeholder="Enter native place"
                          placeholderTextColor="black"
                          onChangeText={(text) =>
                            handleInputChange("family.familyLocation", text)
                          }
                          value={profileData.family.familyLocation}
                        />
                        <FontAwesome5Icon
                          name="map-pin"
                          size={17}
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

                    <View style={{ bottom: responsiveHeight(-5.5) }}>
                      <Text
                        style={{
                          top: responsiveHeight(24),
                          left: 23,
                          fontSize: 15,
                          fontWeight: "500",
                          opacity: 0.6,
                        }}
                      >
                        No.of Siblings
                      </Text>
                      <View style={styles.inputView}>
                        <TextInput
                          style={styles.inputText}
                          placeholder="Enter No.of Siblings"
                          placeholderTextColor="black"
                          onChangeText={(text) =>
                            handleInputChange(
                              "family.numberOfSiblings",
                              text.toString()
                            )
                          }
                          value={profileData.family.numberOfSiblings.toString()}
                        />
                        <FontAwesome5Icon
                          name="user-friends"
                          size={17}
                          style={{
                            position: "absolute",
                            left: 6,
                            top: 18,
                            opacity: 0.6,
                          }}
                          color={"#000"}
                        />
                      </View>
                    </View>

                    <View style={{ bottom: responsiveHeight(-7) }}>
                      <Text
                        style={{
                          top: responsiveHeight(24),
                          left: 23,
                          fontSize: 15,
                          fontWeight: "500",
                          opacity: 0.6,
                        }}
                      >
                        Family Type
                      </Text>
                      <View style={{ top: responsiveHeight(24), left: 15 }}>
                        <RadioGroup
                          radioButtons={radioButtons2}
                          onPress={setDisability1}
                          selectedId={disability1}
                          layout="row"
                          containerStyle={{ opacity: 0.6 }}
                        />
                      </View>
                    </View>

                    <View style={{ bottom: responsiveHeight(-9) }}>
                      <Text
                        style={{
                          top: responsiveHeight(24),
                          left: 23,
                          fontSize: 15,
                          fontWeight: "500",
                          opacity: 0.6,
                        }}
                      >
                        Family Value
                      </Text>
                      <View style={{ top: responsiveHeight(24), left: 15 }}>
                        <RadioGroup
                          radioButtons={radioButtons3}
                          onPress={setDisability2}
                          selectedId={disability2}
                          layout="row"
                          containerStyle={{ opacity: 0.6 }}
                        />
                      </View>
                    </View>

                    <View style={{ bottom: responsiveHeight(-10) }}>
                      <Text
                        style={{
                          top: responsiveHeight(24),
                          left: 23,
                          fontSize: 15,
                          fontWeight: "500",
                          opacity: 0.6,
                        }}
                      >
                        Family Affluence
                      </Text>
                      <View style={{ top: responsiveHeight(25) }}>
                        <SelectList
                          setSelected={(text) =>
                            handleInputChange("family.familyAffluence", text)
                          }
                          data={Affluence}
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
                  </View>
                </View>

                <View style={{ top: 240 }}>
                  <View style={{ left: 22, top: responsiveHeight(37) }}>
                    <Text
                      style={{
                        fontSize: 17,
                        color: "tomato",
                        fontWeight: "300",
                      }}
                    >
                      Astro{" "}
                      <Text style={{ color: "#000", fontWeight: "400" }}>
                        Details...
                      </Text>
                    </Text>
                  </View>

                  <View style={{ top: 100 }}>
                    <View style={{ bottom: responsiveHeight(-1.5) }}>
                      <Text
                        style={{
                          top: responsiveHeight(24),
                          left: 23,
                          fontSize: 15,
                          fontWeight: "500",
                          opacity: 0.6,
                        }}
                      >
                        Nakshatra
                      </Text>
                      <View style={{ top: responsiveHeight(25) }}>
                        <SelectList
                          setSelected={(text) =>
                            handleInputChange("astroDetalis.nakshatra", text)
                          }
                          data={MotherStatus}
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

                    <View style={{ bottom: responsiveHeight(-5) }}>
                      <Text
                        style={{
                          top: responsiveHeight(24),
                          left: 23,
                          fontSize: 15,
                          fontWeight: "500",
                          opacity: 0.6,
                        }}
                      >
                        Manglik/Chevvai dosham
                      </Text>
                      <View style={{ top: responsiveHeight(24), left: 15 }}>
                        <RadioGroup
                          radioButtons={radioButtons5}
                          onPress={setDisability3}
                          selectedId={disability3}
                          layout="row"
                          containerStyle={{ opacity: 0.6 }}
                        />
                      </View>
                    </View>
                  </View>
                </View>

                <View style={{ top: 300 }}>
                  <View style={{ left: 22, top: responsiveHeight(37) }}>
                    <Text
                      style={{
                        fontSize: 17,
                        color: "tomato",
                        fontWeight: "300",
                      }}
                    >
                      Education{" "}
                      <Text style={{ color: "#000", fontWeight: "400" }}>
                        Career...
                      </Text>
                    </Text>
                  </View>

                  <View style={{ top: responsiveHeight(15) }}>
                    <View style={{ bottom: responsiveHeight(1) }}>
                      <Text
                        style={{
                          top: responsiveHeight(24),
                          left: 23,
                          fontSize: 15,
                          fontWeight: "500",
                          opacity: 0.6,
                        }}
                      >
                        highest Qualification
                      </Text>
                      <View style={{ top: responsiveHeight(25) }}>
                        <SelectList
                          setSelected={(text) =>
                            handleInputChange(
                              "educationAndCareer.highestQualification",
                              text
                            )
                          }
                          data={fatherStatus}
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

                    <View style={{ bottom: responsiveHeight(-1.5) }}>
                      <Text
                        style={{
                          top: responsiveHeight(24),
                          left: 23,
                          fontSize: 15,
                          fontWeight: "500",
                          opacity: 0.6,
                        }}
                      >
                        College Attended
                      </Text>
                      <View style={styles.inputView}>
                        <TextInput
                          style={styles.inputText}
                          placeholder="Specify highest degree college"
                          placeholderTextColor="black"
                          onChangeText={(text) =>
                            handleInputChange(
                              "educationAndCareer.collegeAttended",
                              text
                            )
                          }
                          value={profileData.educationAndCareer.collegeAttended}
                        />
                        <FontAwesome5Icon
                          name="university"
                          size={17}
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

                    <View style={{ bottom: responsiveHeight(-2) }}>
                      <Text
                        style={{
                          top: responsiveHeight(24),
                          left: 23,
                          fontSize: 15,
                          fontWeight: "500",
                          opacity: 0.6,
                        }}
                      >
                        Working With
                      </Text>
                      <View style={{ top: responsiveHeight(25) }}>
                        <SelectList
                          setSelected={(text) =>
                            handleInputChange(
                              "educationAndCareer.workingWith",
                              text
                            )
                          }
                          data={WorkingWith}
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

                    <View style={{ bottom: responsiveHeight(-4.5) }}>
                      <Text
                        style={{
                          top: responsiveHeight(24),
                          left: 23,
                          fontSize: 15,
                          fontWeight: "500",
                          opacity: 0.6,
                        }}
                      >
                        Working As
                      </Text>
                      <View style={{ top: responsiveHeight(25) }}>
                        <SelectList
                          setSelected={(text) =>
                            handleInputChange(
                              "educationAndCareer.WorkingAs",
                              text
                            )
                          }
                          data={WorkingWith}
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
                  </View>
                </View>

                <View style={{ top: 370 }}>
                  <View style={{ left: 22, top: responsiveHeight(38) }}>
                    <Text
                      style={{
                        fontSize: 17,
                        color: "tomato",
                        fontWeight: "300",
                      }}
                    >
                      Lifestyle...{" "}
                    </Text>
                  </View>

                  <View style={{ top: responsiveHeight(15) }}>
                    <View style={{ bottom: responsiveHeight(1) }}>
                      <Text
                        style={{
                          top: responsiveHeight(24),
                          left: 23,
                          fontSize: 15,
                          fontWeight: "500",
                          opacity: 0.6,
                        }}
                      >
                        Diet
                      </Text>
                      <ScrollView
                        horizontal
                        style={{
                          top: responsiveHeight(24),
                          left: 15,
                          marginRight: 10,
                        }}
                      >
                        <RadioGroup
                          radioButtons={radioButtons4}
                          onPress={setDisability4}
                          selectedId={disability4}
                          layout="row"
                          containerStyle={{ opacity: 0.6 }}
                        />
                      </ScrollView>
                    </View>
                  </View>
                </View>

                <View style={{ top: 390 }}>
                  <View style={{ left: 22, top: responsiveHeight(37) }}>
                    <Text
                      style={{
                        fontSize: 17,
                        color: "tomato",
                        fontWeight: "300",
                      }}
                    >
                      Location of{" "}
                      <Text style={{ color: "#000", fontWeight: "400" }}>
                        Groom...
                      </Text>
                    </Text>
                  </View>

                  <View style={{ top: responsiveHeight(15) }}>
                    <View style={{ bottom: responsiveHeight(1) }}>
                      <Text
                        style={{
                          top: responsiveHeight(24),
                          left: 23,
                          fontSize: 15,
                          fontWeight: "500",
                          opacity: 0.6,
                        }}
                      >
                        Country Living In
                      </Text>
                      <View style={{ top: responsiveHeight(25) }}>
                        <SelectList
                          setSelected={(text) =>
                            handleInputChange(
                              "locationOfGroom.countryLivingIn",
                              text
                            )
                          }
                          data={Countrys}
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
                  </View>

                  <View style={{ top: responsiveHeight(18) }}>
                    <View style={{ bottom: responsiveHeight(1) }}>
                      <Text
                        style={{
                          top: responsiveHeight(24),
                          left: 23,
                          fontSize: 15,
                          fontWeight: "500",
                          opacity: 0.6,
                        }}
                      >
                        State Living In
                      </Text>
                      <View style={{ top: responsiveHeight(25) }}>
                        <SelectList
                          setSelected={(text) =>
                            handleInputChange(
                              "locationOfGroom.stateLivingIn",
                              text
                            )
                          }
                          data={Stateliving}
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
                  </View>

                  <View style={{ top: responsiveHeight(21) }}>
                    <View style={{ bottom: responsiveHeight(1) }}>
                      <Text
                        style={{
                          top: responsiveHeight(24),
                          left: 23,
                          fontSize: 15,
                          fontWeight: "500",
                          opacity: 0.6,
                        }}
                      >
                        City Living In
                      </Text>
                      <View style={{ top: responsiveHeight(25) }}>
                        <SelectList
                          setSelected={(text) =>
                            handleInputChange(
                              "locationOfGroom.cityLivingIn",
                              text
                            )
                          }
                          data={Stateliving}
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
                  </View>

                  <View style={{ top: responsiveHeight(24) }}>
                    <View style={{ bottom: responsiveHeight(1) }}>
                      <Text
                        style={{
                          top: responsiveHeight(24),
                          left: 23,
                          fontSize: 15,
                          fontWeight: "500",
                          opacity: 0.6,
                        }}
                      >
                        Grew up in
                      </Text>
                      <View style={{ top: responsiveHeight(25) }}>
                        <SelectList
                          setSelected={(text) =>
                            handleInputChange("locationOfGroom.grewUpIn", text)
                          }
                          data={Stateliving}
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
                  </View>

                  <View style={{ top: responsiveHeight(27) }}>
                    <View style={{ bottom: responsiveHeight(1) }}>
                      <Text
                        style={{
                          top: responsiveHeight(24),
                          left: 23,
                          fontSize: 15,
                          fontWeight: "500",
                          opacity: 0.6,
                        }}
                      >
                        Ethnic Origin
                      </Text>
                      <View style={{ top: responsiveHeight(25) }}>
                        <SelectList
                          setSelected={(text) =>
                            handleInputChange(
                              "locationOfGroom.ethnicOrigin",
                              text
                            )
                          }
                          data={Stateliving}
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
                  </View>

                  <View style={{ top: responsiveHeight(29) }}>
                    <View style={{ bottom: responsiveHeight(1) }}>
                      <Text
                        style={{
                          top: responsiveHeight(24),
                          left: 23,
                          fontSize: 15,
                          fontWeight: "500",
                          opacity: 0.6,
                        }}
                      >
                        Zip/Pin Code
                      </Text>
                      <View style={styles.inputView}>
                        <TextInput
                          style={styles.inputText}
                          placeholder="Example: 400072"
                          placeholderTextColor="black"
                          onChangeText={(text) =>
                            handleInputChange(
                              "locationOfGroom.zipPinCode",
                              text
                            )
                          }
                          value={profileData.locationOfGroom.zipPinCode}
                        />
                        <FontAwesome5Icon
                          name="sort-numeric-up-alt"
                          size={17}
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
                  </View>
                </View>

                <View style={{ top: 510 }}>
                  <View style={{ left: 22, top: responsiveHeight(37) }}>
                    <Text
                      style={{
                        fontSize: 17,
                        color: "tomato",
                        fontWeight: "300",
                      }}
                    >
                      More About Yourself,{" "}
                      <Text style={{ color: "#000", fontWeight: "400" }}>
                        Partner and Family...
                      </Text>
                    </Text>
                  </View>

                  <View style={{ top: responsiveHeight(18) }}>
                    <View style={{ bottom: responsiveHeight(1) }}>
                      <Text
                        style={{
                          top: responsiveHeight(24),
                          left: 23,
                          fontSize: 15,
                          fontWeight: "500",
                          opacity: 0.6,
                        }}
                      ></Text>
                      <View
                        style={{
                          backgroundColor: "#ffff",
                          borderBottomColor: "#000000",
                          borderWidth: 1,
                          top: 150,
                          marginHorizontal: 20,
                          borderRadius: 10,
                        }}
                      >
                        <TextInput
                          editable
                          multiline
                          numberOfLines={4}
                          maxLength={40}
                          placeholder="Personality, Family Details, Career, Partner Expectations etc."
                          onChangeText={(text) =>
                            handleInputChange(
                              "moreAboutYourselfPartnerAndFamily",
                              text
                            )
                          }
                          value={profileData.moreAboutYourselfPartnerAndFamily}
                          style={{ padding: 10 }}
                        />
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={{ bottom: 50, left: responsiveWidth(21) }}>
        <TouchableOpacity
          style={{
            width: "50%",
            backgroundColor: "#3D50DF",
            borderRadius: 5,
            height: 50,
            alignItems: "center",
            justifyContent: "center",
            top: responsiveHeight(10),
            elevation: 3,
            alignSelf: "center",
            borderColor: "blue",
          }}
        >
          <Text style={{ color: "white", fontSize: 16, fontWeight: "500" }}>
            Next
          </Text>
          <FontAwesome5Icon
            name="arrow-right"
            style={{
              position: "absolute",
              left: 135,
              backgroundColor: "#3D56F0",
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
          }} onPress={()=>navigation.navigate('BottomNav')}
        >
          <Text style={{ color: "tomato", fontSize: 16, fontWeight: "500" }}>
            Skip
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Matrimonys;
const styles = StyleSheet.create({
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
    borderRadius: 10,
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
});
