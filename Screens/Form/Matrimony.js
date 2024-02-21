import React, { useState, useMemo, useEffect } from "react";
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
import { SelectList } from "react-native-dropdown-select-list";
import DateTimePicker from "react-native-ui-datepicker";
import Slider from "@react-native-community/slider";
import dayjs from "dayjs";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { api } from "../Api";
const Matrimonys = () => {

  const [userid, setUserID] = useState();
  const [profileid, setProfileid] = useState();

  useEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem('UserID');
        const value1 = await AsyncStorage.getItem('profileid');
        if (value !== null) {
          setUserID(value)
          setProfileid(value1)
          console.warn(value)
        }
      } catch (e) {
        console.log(e)

      }
    };
    getData()
  }, [])


  const navigation = useNavigation();

  const ProfileCreatedBy = [
    { key: "1", value: "Self" },
    { key: "2", value: "Parent/Guardian" },
    { key: "3", value: "Sibling" },
    { key: "4", value: "Friend" },
    { key: "5", value: "Other" },
  ];

  const WorkingWithOptions = [
    { key: "1", value: "Private Company" },
    { key: "2", value: "Government/Public Sector" },
    { key: "3", value: "Self-Employed" },
    { key: "4", value: "Business/Entrepreneur" },
    { key: "5", value: "Not Working" },
    { key: "6", value: "Other" },
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
    { key: "1", value: "Not married" },
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

  const Education = [
    { key: "1", value: "High School Graduate" },
    { key: "2", value: "Associate's Degree" },
    { key: "3", value: "Bachelor's Degree" },
    { key: "4", value: "Master's Degree" },
    { key: "5", value: "Doctorate or Professional Degree" },
  ];


  const Affluence = [
    { key: "1", value: "Affluent" },
    { key: "2", value: "Upper Middle Class" },
    { key: "3", value: "Middle Class" },
    { key: "4", value: "Lower Middle Class" },
  ];



  const Countrys = [
    { key: "2", value: "India" },
    { key: "3", value: "USA" },
    { key: "4", value: "UK" },
    { key: "5", value: "UAE" },
    { key: "6", value: "Canada" },
    { key: "7", value: "Australia" },
    { key: "8", value: "New Zealand" },
    { key: "9", value: "Pakistan" },
    { key: "10", value: "Saudi Arabia" },
    { key: "11", value: "Kuwait" },
    { key: "12", value: "South Africa" },
    { key: "13", value: "Germany" },
    { key: "14", value: "France" },
    { key: "15", value: "Brazil" },
    { key: "16", value: "China" },
    { key: "17", value: "Japan" },
    { key: "18", value: "Singapore" },
    { key: "19", value: "Malaysia" },
    { key: "20", value: "Thailand" },
    { key: "21", value: "Netherlands" },
    { key: "22", value: "Sweden" },
    { key: "23", value: "Norway" },
    { key: "24", value: "Denmark" },
    { key: "25", value: "Switzerland" },
    { key: "26", value: "Spain" },
    { key: "27", value: "Italy" },
    { key: "28", value: "Portugal" },
    { key: "29", value: "Russia" },
    { key: "30", value: "South Korea" },
    { key: "31", value: "Other" },
    // Add more countries as needed
  ];




  const Genders = [
    { key: "1", value: "Male" },
    { key: "2", value: "Female" },
  ];

  const Disability = [
    { key: "1", value: "None" },
    { key: "2", value: "Physical Disability" },
  ];

  const Family = [
    { key: "1", value: "Joint" },
    { key: "2", value: "Nuclear" },
  ];

  const FamilyValue = [
    { key: "1", value: "Traditional" },
    { key: "2", value: "Moderate" },
    { key: "3", value: "Liberal" },
  ];

  const AstroDetails = [
    { key: "1", value: "yes" },
    { key: "2", value: "No" },
    { key: "3", value: "NotSure" },
  ];

  const Lifestyle = [
    { key: "1", value: "Veg" },
    { key: "2", value: "Non-Veg" },
    { key: "3", value: "Occasionally Non-Veg" },
    { key: "4", value: "Eggetarian" },
    { key: "5", value: "Jain" },
    { key: "5", value: "Vegan" },
  ];

  const Profession = [
    { key: "1", value: "Software Engineer" },
    { key: "2", value: "Teacher" },
    { key: "3", value: "Doctor" },
    { key: "4", value: "Accountant" },
    { key: "5", value: "Marketing Manager" },
    { key: "6", value: "Graphic Designer" },
    { key: "7", value: "Nurse" },
    { key: "8", value: "Engineer" },
    { key: "9", value: "Architect" },
    { key: "10", value: "Lawyer" },
    { key: "11", value: "Chef" },
    { key: "12", value: "Financial Analyst" },
    { key: "13", value: "Pharmacist" },
    { key: "14", value: "Police Officer" },
    { key: "15", value: "Artist" },
    // Add more professions as needed
  ];

  const Nakshatra = [
    { key: "1", value: "Ashwini" },
    { key: "2", value: "Bharani" },
    { key: "3", value: "Krittika" },
    { key: "4", value: "Rohini" },
    { key: "5", value: "Mrigashira" },
    { key: "6", value: "Ardra" },
    { key: "7", value: "Punarvasu" },
    { key: "8", value: "Pushya" },
    { key: "9", value: "Ashlesha" },
    { key: "10", value: "Magha" },
    { key: "11", value: "Purva Phalguni" },
    { key: "12", value: "Uttara Phalguni" },
    { key: "13", value: "Hasta" },
    { key: "14", value: "Chitra" },
    { key: "15", value: "Swati" },
    { key: "16", value: "Vishakha" },
    { key: "17", value: "Anuradha" },
    { key: "18", value: "Jyeshtha" },
    { key: "19", value: "Mula" },
    { key: "20", value: "Purva Ashadha" },
    { key: "21", value: "Uttara Ashadha" },
    { key: "22", value: "Shravana" },
    { key: "23", value: "Dhanishta" },
    { key: "24", value: "Shatabhisha" },
    { key: "25", value: "Purva Bhadrapada" },
    { key: "26", value: "Uttara Bhadrapada" },
    { key: "27", value: "Revati" },
    { key: "28", value: "Ashwini" },
    { key: "29", value: "Bharani" },
    { key: "30", value: "Krittika" },
    // Add more Nakshatras as needed
  ];

  const HighestQualification = [
    { key: "1", value: "High School Diploma" },
    { key: "2", value: "Associate's Degree" },
    { key: "3", value: "Bachelor's Degree" },
    { key: "4", value: "Master's Degree" },
    { key: "5", value: "Doctorate or Professional Degree" },
    { key: "6", value: "Other" },
  ];

  const WorkingAsOptions = [
    { key: "1", value: "Software Engineer" },
    { key: "2", value: "Teacher" },
    { key: "3", value: "Doctor" },
    { key: "4", value: "Accountant" },
    { key: "5", value: "Marketing Manager" },
    { key: "6", value: "Business Analyst" },
    { key: "7", value: "Artist" },
    { key: "8", value: "Engineer" },
    { key: "9", value: "Entrepreneur" },
    { key: "10", value: "Not Applicable" },
    { key: "11", value: "Other" },
  ];

  const StateLivingInIndiaOptions = [
    { key: "1", value: "Andhra Pradesh" },
    { key: "2", value: "Arunachal Pradesh" },
    { key: "3", value: "Assam" },
    { key: "4", value: "Bihar" },
    { key: "5", value: "Chhattisgarh" },
    { key: "6", value: "Goa" },
    { key: "7", value: "Gujarat" },
    { key: "8", value: "Haryana" },
    { key: "9", value: "Himachal Pradesh" },
    { key: "10", value: "Jharkhand" },
    { key: "11", value: "Karnataka" },
    { key: "12", value: "Kerala" },
    { key: "13", value: "Madhya Pradesh" },
    { key: "14", value: "Maharashtra" },
    { key: "15", value: "Manipur" },
    { key: "16", value: "Meghalaya" },
    { key: "17", value: "Mizoram" },
    { key: "18", value: "Nagaland" },
    { key: "19", value: "Odisha" },
    { key: "20", value: "Punjab" },
    { key: "21", value: "Rajasthan" },
    { key: "22", value: "Sikkim" },
    { key: "23", value: "Tamil Nadu" },
    { key: "24", value: "Telangana" },
    { key: "25", value: "Tripura" },
    { key: "26", value: "Uttar Pradesh" },
    { key: "27", value: "Uttarakhand" },
    { key: "28", value: "West Bengal" },
    { key: "29", value: "Andaman and Nicobar Islands" },
    { key: "30", value: "Chandigarh" },
    { key: "31", value: "Dadra and Nagar Haveli and Daman and Diu" },
    { key: "32", value: "Delhi" },
    { key: "33", value: "Lakshadweep" },
    { key: "34", value: "Puducherry" },
    // Add more states or union territories as needed
  ];

  const CityLivingInIndiaOptions = [
    { key: "1", value: "Mumbai" },
    { key: "2", value: "Delhi" },
    { key: "3", value: "Bangalore" },
    { key: "4", value: "Hyderabad" },
    { key: "5", value: "Chennai" },
    { key: "6", value: "Kolkata" },
    { key: "7", value: "Pune" },
    { key: "8", value: "Ahmedabad" },
    { key: "9", value: "Jaipur" },
    { key: "10", value: "Lucknow" },
    { key: "11", value: "Chandigarh" },
    { key: "12", value: "Surat" },
    { key: "13", value: "Bhopal" },
    { key: "14", value: "Indore" },
    { key: "15", value: "Vadodara" },
    { key: "16", value: "Kochi" },
    { key: "17", value: "Coimbatore" },
    { key: "18", value: "Nagpur" },
    { key: "19", value: "Ludhiana" },
    { key: "20", value: "Amritsar" },
    { key: "21", value: "Visakhapatnam" },
    { key: "22", value: "Thane" },
    { key: "23", value: "Bhubaneswar" },
    { key: "24", value: "Agra" },
    { key: "25", value: "Patna" },
    { key: "26", value: "Ranchi" },
    { key: "27", value: "Varanasi" },
    { key: "28", value: "Nashik" },
    { key: "29", value: "Faridabad" },
    { key: "30", value: "Meerut" },
    { key: "31", value: "Srinagar" },
    { key: "32", value: "Jodhpur" },
    { key: "33", value: "Raipur" },
    { key: "34", value: "Kanpur" },
    { key: "35", value: "Kozhikode" },
    // Add more cities as needed
  ];

  const GrewUpInOptions = [
    { key: "1", value: "India" },
    { key: "2", value: "United States" },
    { key: "3", value: "Canada" },
    { key: "4", value: "United Kingdom" },
    { key: "5", value: "Australia" },
    { key: "6", value: "New Zealand" },
    { key: "7", value: "South Africa" },
    { key: "8", value: "Other" },
  ];

  const EthnicOriginOptions = [
    { key: "1", value: "Caucasian" },
    { key: "2", value: "African American" },
    { key: "3", value: "Asian" },
    { key: "4", value: "Hispanic/Latino" },
    { key: "5", value: "Native American" },
    { key: "6", value: "Middle Eastern" },
    { key: "7", value: "Indian" },
    { key: "8", value: "Pacific Islander" },
    { key: "9", value: "Other" },
  ];


  const [modalVisible, setModalVisible] = useState(false);
  const [values, setValues] = useState(dayjs().format("YYYY-MM-DD"));


  const [profilecreatedby, setProfileCreatedBy] = useState("");
  const [nativePlace, setNativePlace] = useState("");
  const [healthInformation, setHealthInformation] = useState("");
  const [anyDisability, setAnyDisability] = useState("");
  const [bloodgroup, setBloodGroup] = useState("");
  const [hobbies, setHobbies] = useState("");
  const [lifestyle, setLifestyle] = useState("");
  const [moreAboutYourselfPartnerAndFamily, setMoreAboutYourselfPartnerAndFamily] = useState("");
  const [height, setHeight] = useState("");
  const [aboutMe, setAboutMe] = useState("");
  const [maritalstatus, setMaritalStatus] = useState("");
  const [religion, setReligion] = useState("");
  const [motherTongue, setMotherTongue] = useState("");
  const [community, setCommunity] = useState("");
  const [subCommunity, setSubCommunity] = useState("");
  const [gothraGothram, setGothraGothram] = useState("");
  const [fatherS, setFatherStatus] = useState("");
  const [withWhom, setWithWhom] = useState("");
  const [asWhat, setAsWhat] = useState("");
  const [natureOfBusiness, setNatureOfBusiness] = useState("");
  const [motherStatus, setMotherStatus] = useState("");
  const [familyLocation, setFamilyLocation] = useState("");
  const [numberOfSiblings, setNumberOfSiblings] = useState({});
  const [familyType, setFamilyType] = useState("");
  const [familyValue, setFamilyValue] = useState("");
  const [familyAffluence, setFamilyAffluence] = useState("");
  const [manglikChevvaidosham, setManglikChevvaidosham] = useState("");
  const [nakshatra, setNakshatra] = useState("");
  const [ageRange, setAgeRange] = useState("");
  const [gender, setGender] = useState("");
  const [education, setEducation] = useState("");
  const [profession, setProfession] = useState("");
  const [minHeight, setMinHeight] = useState("");
  const [maxIncome, setMaxIncome] = useState("");
  const [highestQualification, setHighestQualification] = useState("");
  const [collegeAttended, setCollegeAttended] = useState("");
  const [workingWith, setWorkingWith] = useState("");
  const [workingAs, setWorkingAs] = useState("");
  const [countryLivingIn, setCountryLivingIn] = useState("");
  const [stateLivingIn, setStateLivingIn] = useState("");
  const [cityLivingIn, setCityLivingIn] = useState("");
  const [grewUpIn, setGrewUpIn] = useState("");
  const [ethnicOrigin, setEthnicOrigin] = useState("");
  const [zipPinCode, setZipPinCode] = useState("");


  const PostMatri = async () => {
   console.warn(profileid)
   console.warn(profilecreatedby)
    try {
      const { data } = await axios.post(`${api}/matrimonial/profiles`, {
        userId:userid,
        profileId:profileid,
        Profilecreatedby: profilecreatedby,
        maritalStatus: maritalstatus,
        nativePlace: nativePlace,
        healthInformation: healthInformation,
        anyDisabiliy: anyDisability,
        bloodGroup: bloodgroup,
        religiousBackground: {
          religion: religion,
          motherTongue: motherTongue,
          community: community,
          subCommunity: subCommunity,
          gothraGothram: gothraGothram
        },
        family: {
          fatherStatus: fatherS,
          motherStatus: motherStatus,
          familyLocation: familyLocation,
          numberOfSiblings: numberOfSiblings,
          familyType: familyType,
          familyValue: familyValue,
          familyAffluence: familyAffluence
        },
        astroDetails: {
          manglikChevvaidosham: manglikChevvaidosham,
          nakshatra: nakshatra
        },
        partnerPreferences: {
         
          gender: gender,
          education: education,
          profession: profession,
          
        },
        educationAndCareer: {
          highestQualification: highestQualification,
          collegeAttended: collegeAttended,
          workingWith: workingWith,
          WorkingAs: workingAs,
        },
        lifestyle: lifestyle,
        locationOfGroom: {
          countryLivingIn: countryLivingIn,
          stateLivingIn: stateLivingIn,
          cityLivingIn: cityLivingIn,
          grewUpIn: grewUpIn,
          ethnicOrigin: ethnicOrigin,
          zipPinCode: zipPinCode
        },
        moreAboutYourselfPartnerAndFamily: moreAboutYourselfPartnerAndFamily,
        height: height,
      


      })
      console.warn(data)
    } catch (error) {
      console.error("Error during login:", error.message);
    }
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

          <View
            style={{
              flexDirection: "row",
              bottom: responsiveHeight(-1),
              left: responsiveWidth(80),
            }}
          >
            <TouchableOpacity
              onPress={() => navigation.navigate("JobsScreens")}
            >
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
              />
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
                  setSelected={(val) => setProfileCreatedBy(val)}
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

            <View style={{ bottom: 120 }}>
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
                    top: responsiveHeight(21),
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
                    setSelected={(val) => setMaritalStatus(val)
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
                    setSelected={(val) => setHeight(val)}
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
                    setSelected={(val) => setHealthInformation(val)}
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
                <View style={{ top: responsiveHeight(25), marginBottom: 13 }}>
                  <SelectList
                    setSelected={(val) =>
                      setAnyDisability(val)
                    }
                    data={Disability}
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
                    setSelected={(val) =>
                      setBloodGroup(val)
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
                    opacity: 0.6,
                    position: "absolute",
                  }}
                >
                  max Age 38
                </Text>

                <View style={{ top: responsiveHeight(26), left: 15 }}>
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
                    opacity: 0.6,
                    position: "absolute",
                  }}
                >
                  max Height 6.2
                </Text>

                <View style={{ top: responsiveHeight(26), left: 15 }}>
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
                    opacity: 0.6,
                    position: "absolute",
                  }}
                >
                  max Income 20lpa
                </Text>

                <View style={{ top: responsiveHeight(26), left: 15 }}>
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

              <View style={{ bottom: responsiveHeight(-11), marginBottom: 10 }}>
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
                    setSelected={(val) =>
                      setEducation(val)
                    }
                    data={Education}
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

              <View style={{ bottom: responsiveHeight(-12), marginBottom: 13 }}>
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
                    setSelected={(val) =>
                      setProfession(val)
                    }
                    data={Profession}
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
                        setSelected={(val) =>
                          setReligion(val)
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
                        setSelected={(val) =>
                          setMotherTongue(val)
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
                        setSelected={(val) =>
                          setCommunity(val)
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
                        setSelected={(val) =>
                          setSubCommunity(val)
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
                        setSelected={(val) =>
                          setGothraGothram(val)
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
                          setSelected={(val) =>
                            setFatherStatus(val)
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
                            setMotherStatus(text)
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
                          onChangeText={(val) =>
                            setFamilyLocation(val)
                          }
                          value={familyLocation}
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
                          onChangeText={(val) =>
                            setNativePlace(val)
                          }
                          value={nativePlace}
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
                          onChangeText={(val) =>
                            setNumberOfSiblings(val)
                          }
                          value={numberOfSiblings}
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
                      <View
                        style={{ top: responsiveHeight(25), marginBottom: 13 }}
                      >
                        <SelectList
                          setSelected={(val) =>
                            setFamilyType(val)
                          }
                          data={Family}
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
                      <View
                        style={{ top: responsiveHeight(25), marginBottom: 13 }}
                      >
                        <SelectList
                          setSelected={(val) =>
                            setFamilyValue(val)
                          }
                          data={FamilyValue}
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
                        Family Affluence
                      </Text>
                      <View style={{ top: responsiveHeight(25) }}>
                        <SelectList
                          setSelected={(val) =>
                            setFamilyAffluence(val)
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
                          setSelected={(val) =>
                            setNakshatra(val)
                          }
                          data={Nakshatra}
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
                      <View style={{ top: responsiveHeight(25) }}>
                        <SelectList
                          setSelected={(val) =>
                            setManglikChevvaidosham(val)
                          }
                          data={AstroDetails}
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
                          setSelected={(val) =>
                            setHighestQualification(val)
                          }
                          data={HighestQualification}
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
                            setCollegeAttended(text)
                          }
                          value={collegeAttended}
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
                          setSelected={(val) =>
                            setWorkingWith(val)
                          }
                          data={WorkingWithOptions}
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
                          setSelected={(val) =>
                            setWorkingAs(val)
                          }
                          data={WorkingAsOptions}
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
                      <View style={{ top: responsiveHeight(25) }}>
                        <SelectList
                          setSelected={(val) =>
                            setLifestyle(val)
                          }
                          data={Lifestyle}
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
                          setSelected={(val) =>
                            setCountryLivingIn(val)
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
                          setSelected={(val) =>
                            setStateLivingIn(val)
                          }
                          data={StateLivingInIndiaOptions}
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
                          setSelected={(val) =>
                            setCityLivingIn(val)
                          }
                          data={CityLivingInIndiaOptions}
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
                          setSelected={(val) =>
                            setGrewUpIn(val)
                          }
                          data={GrewUpInOptions}
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
                          setSelected={(val) =>
                            setEthnicOrigin(val)
                          }
                          data={EthnicOriginOptions}
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
                          onChangeText={(val) =>
                            setZipPinCode(val)
                          }
                          value={zipPinCode}
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
                            setMoreAboutYourselfPartnerAndFamily(text)
                          }
                          value={moreAboutYourselfPartnerAndFamily}
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
          onPress={() => PostMatri()}
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
          }}
          onPress={() => navigation.navigate("BottomNav")}
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
