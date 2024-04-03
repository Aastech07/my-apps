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
  Button,
  Dimensions,
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
import { SliderBox } from "react-native-image-slider-box";
import { responsiveWidth } from "react-native-responsive-dimensions";
import DateTimePicker from "react-native-ui-datepicker";
import { Height } from "./MatrimonyApi";
import { bloodGroup } from "./MatrimonyApi";
import { HealthInformation } from "./MatrimonyApi";
import { Lifestyle } from "./MatrimonyApi";
import { Religion } from "./MatrimonyApi";
import { MotherTongue } from "../../Api";
import { Community } from "./MatrimonyApi";
import { fatherStatus } from "./MatrimonyApi";
import { MotherStatus } from "./MatrimonyApi";
import { FamilyType } from "./MatrimonyApi";
import { FamilyAffluence } from "./MatrimonyApi";
import { ManglikChevvaidosham } from "./MatrimonyApi";
import { Nakshatra } from "./MatrimonyApi";
import { Genders } from "./MatrimonyApi";
import { Educations } from "./MatrimonyApi";
import { Professions } from "./MatrimonyApi";
import { HighestQualifications } from "./MatrimonyApi";
import { CollegeAttended } from "./MatrimonyApi";
import { WorkingWithOptions } from "./MatrimonyApi";
import { Countrys } from "./MatrimonyApi";
import { StateLivingInIndiaOptions } from "./MatrimonyApi";
import { CityLivingInIndiaOptions } from "./MatrimonyApi";
import { GrewUpInOptions } from "./MatrimonyApi";
import { EthnicOriginOptions } from "./MatrimonyApi";
import Slider from "@react-native-community/slider";
import { ImagePicker } from "expo-image-multiple-picker";
import { ProfileCreatedBy } from "./MatrimonyApi";
import SkeletonLoader from "../../skeletonloader/Skeletonloader";
import MatrimonyEdit from "./MatrimonyEdit";
const MatrimonyDetails = () => {
  const [profileData, setProfileData] = useState(null);
  const [editableFields, setEditableFields] = useState({});
  const [id, setID] = useState("");

  const [age, setAge] = useState(dayjs().format("YYYY-MM-DD"));
  const [profilecreatedby, setProfileCreatedBy] = useState("");
  const [nativePlace, setNativePlace] = useState("");
  const [healthInformation, setHealthInformation] = useState("");
  const [anyDisability, setAnyDisability] = useState("");
  const [bloodgroup, setBloodGroup] = useState("");
  const [hobbies, setHobbies] = useState("");
  const [lifestyle, setLifestyle] = useState("");
  const [
    moreAboutYourselfPartnerAndFamily,
    setMoreAboutYourselfPartnerAndFamily,
  ] = useState("");
  const [height, setHeight] = useState(4);
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
  const [ageRange, setAgeRange] = useState(18);
  const [gender, setGender] = useState("");
  const [education, setEducation] = useState("");
  const [profession, setProfession] = useState("");
  const [minHeight, setMinHeight] = useState("");
  const [maxIncome, setMaxIncome] = useState(10);
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
  const [modalVisible1, setModalVisible1] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [album, setAlbum] = useState(undefined);
  const [assets, setAssets] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showSkeleton, setShowSkeleton] = useState(false);
  const [form, setForm] = useState(false);
  const [ids, setIDs] = useState(false);

  const handlesave = (selectedAssets) => {
    setAssets(selectedAssets);
    setModalVisible(!modalVisible);
    const imageUris = selectedAssets.map((asset) => asset.uri);
    setSelectedImage(imageUris);
  };

  const handleCancel = () => {
    setAlbum(undefined);
    setOpen(false);
  };

  const handleSelectAlbum = (selectedAlbum) => {
    setAlbum(selectedAlbum);
  };

  const removeImage = () => {
    setAssets("");
  };

  const img =
    "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?size=338&ext=jpg&ga=GA1.1.1700460183.1708646400&semt=ais";

  const handleSliderChange = (val) => {
    const roundedValue = Math.floor(val);
    setAgeRange(roundedValue);
  };

  const handleSliderHeight = (val) => {
    const roundedValue = Math.floor(val);
    setMinHeight(roundedValue);
  };

  const handleSliderIncome = (val) => {
    const roundedValue = Math.floor(val);
    setMaxIncome(roundedValue);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profileId = await AsyncStorage.getItem("profileid");
        if (profileId !== null) {
          const [matrimonial] = await Promise.all([
            axios.get(`${api}/matrimonial/profiles`),
          ]);

          const allData = [...matrimonial.data];
          const filteredProperties = allData.filter(
            (property) => property.profileId._id === profileId
          );

          if (filteredProperties.length > 0) {
            const id = filteredProperties[0]._id; // Access the _id from the first element
            setIDs(id);
            await AsyncStorage.setItem(
              filteredProperties[0]._id,
              "Matrymonyid"
            );
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [api]);

  useEffect(() => {
    const getProfileData = async () => {
      setShowSkeleton(true);
      try {
        const profileId = ids;
        console.warn(profileId);
        //setShowSkeleton(true);
        if (profileId !== null) {
          const { data } = await axios.get(
            `${api}/matrimonial/profiles/${profileId}`
          );
          console.log(data);
          if (data) {
            setProfileData(data);
            setForm(false);
            setID(data?._id);
            setProfileCreatedBy(data?.profileCreatedBy);
            setHeight(data?.height);
            setBloodGroup(data?.bloodGroup);
            setHealthInformation(data?.healthInformation);
            setLifestyle(data?.lifestyle);
            setNativePlace(data?.nativePlace);

            // Set religious background
            setReligion(data?.religiousBackground.religion);
            setMotherTongue(data?.religiousBackground.motherTongue);
            setCommunity(data?.religiousBackground.community);
            setSubCommunity(data?.religiousBackground.subCommunity);
            setGothraGothram(data?.religiousBackground.gothraGothram);

            // Set family details
            setNumberOfSiblings(data?.family.numberOfSiblings);
            setFatherStatus(data?.family.fatherStatus);
            setMotherStatus(data?.family.motherStatus);
            setFamilyLocation(data?.family.familyLocation);
            setFamilyType(data?.family.familyType);
            setFamilyAffluence(data?.family.familyAffluence);

            // Set astro details
            // setManglikChevvaidosham(
            //   data?.astroDetails.manglikChevvaidosham
            // );
            setNakshatra(data?.astroDetails?.nakshatra);

            // Set partner preferences
            setAgeRange(data?.partnerPreferences?.ageRange.min);
            setGender(data?.partnerPreferences.gender);
            setEducation(data?.partnerPreferences.education);
            setProfession(data?.partnerPreferences.profession);
            setMinHeight(data?.partnerPreferences.minHeight);
            setMaxIncome(data?.partnerPreferences.maxIncome);

            // Set education and career
            setHighestQualification(
              data?.educationAndCareer.highestQualification
            );
            setCollegeAttended(data?.educationAndCareer.collegeAttended);
            setWorkingWith(data?.educationAndCareer.workingWith);

            // Set location of groom
            setCountryLivingIn(data?.locationOfGroom.countryLivingIn);
            setStateLivingIn(data?.locationOfGroom.stateLivingIn);
            setCityLivingIn(data?.locationOfGroom.cityLivingIn);
            setGrewUpIn(data?.locationOfGroom.grewUpIn);
            setEthnicOrigin(data?.locationOfGroom.ethnicOrigin);
            setZipPinCode(data?.locationOfGroom.zipPinCode);
            setSelectedImage(data?.images);
            // Set more about yourself, partner, and family

            setMoreAboutYourselfPartnerAndFamily(
              data?.moreAboutYourselfPartnerAndFamily
            );
            setHobbies(data?.hobbies);
          }
          setForm(true);
          setProfileData(false);
        }
      } catch (error) {
        console.log(error);
      }
      setShowSkeleton(false);
    };
    getProfileData();
  }, []);

  const limets = (dob) => {
    let time = new Date(dob);
    let year = time.getFullYear();
    let month = time.getMonth() + 1;
    let date = time.getDate();
    return date + "-" + month + "-" + year;
  };
  const handleImagePressed = async (index) => {
    setModalVisible(!modalVisible);
    await ImagePressed(index);
    console.warn(index);
  };

  const ImagePressed = async (index) => {
    console.warn(index);

    const updatedImages = [
      ...selectedImage.slice(0, index),
      selectedImage[index],
      ...selectedImage.slice(index + 1),
    ];

    const updatedData = {
      images: updatedImages,
    };

    try {
      const { data } = await axios.put(
        `${api}/matrimonial/profiles/${id}`,
        updatedData,
        {
          "Content-Type": "application/json",
        }
      );
      console.warn(data);
    } catch (error) {
      console.error("Error:", error);
    }
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
          {label === "Height" && (
            <SelectList
              setSelected={(val) => handleInputChange(key, val)}
              data={Height}
              save="value"
              boxStyles={{ flex: 1, minWidth: 200 }}
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
          {label === "Blood Group" && (
            <SelectList
              setSelected={(val) => handleInputChange(key, val)}
              data={bloodGroup}
              save="value"
              boxStyles={{ flex: 1, minWidth: 200 }}
              search={false}
            />
          )}
          {label === "Health Information" && (
            <SelectList
              setSelected={(val) => handleInputChange(key, val)}
              data={HealthInformation}
              save="value"
              boxStyles={{ flex: 1, minWidth: 200 }}
              search={false}
            />
          )}
          {label === "Lifestyle" && (
            <SelectList
              setSelected={(val) => handleInputChange(key, val)}
              data={Lifestyle}
              save="value"
              boxStyles={{ flex: 1, minWidth: 200 }}
              search={false}
            />
          )}
          {label === "Religion" && (
            <SelectList
              setSelected={(val) => handleInputChange(key, val)}
              data={Religion}
              save="value"
              boxStyles={{ flex: 1, minWidth: 200 }}
              search={false}
            />
          )}

          {label === "Mother Tongue" && (
            <SelectList
              setSelected={(val) => handleInputChange(key, val)}
              data={MotherTongue}
              save="value"
              boxStyles={{ flex: 1, minWidth: 200 }}
            />
          )}

          {label === "Community" && (
            <SelectList
              setSelected={(val) => handleInputChange(key, val)}
              data={Community}
              save="value"
              boxStyles={{ flex: 1, minWidth: 200 }}
              search={false}
            />
          )}

          {label === "Sub Community" && (
            <SelectList
              setSelected={(val) => handleInputChange(key, val)}
              data={Community}
              save="value"
              boxStyles={{ flex: 1, minWidth: 200 }}
              search={false}
            />
          )}

          {label === "Gothra/Gothram" && (
            <SelectList
              setSelected={(val) => handleInputChange(key, val)}
              data={Community}
              save="value"
              boxStyles={{ flex: 1, minWidth: 200 }}
              search={false}
            />
          )}

          {label === "Father's Status" && (
            <SelectList
              setSelected={(val) => handleInputChange(key, val)}
              data={fatherStatus}
              save="value"
              boxStyles={{ flex: 1, minWidth: 200 }}
              search={false}
            />
          )}

          {label === "Mother's Status" && (
            <SelectList
              setSelected={(val) => handleInputChange(key, val)}
              data={MotherStatus}
              save="value"
              boxStyles={{ flex: 1, minWidth: 200 }}
              search={false}
            />
          )}

          {label === "Family Type" && (
            <SelectList
              setSelected={(val) => handleInputChange(key, val)}
              data={FamilyType}
              save="value"
              boxStyles={{ flex: 1, minWidth: 200 }}
              search={false}
            />
          )}

          {label === "Family Affluence" && (
            <SelectList
              setSelected={(val) => handleInputChange(key, val)}
              data={FamilyAffluence}
              save="value"
              boxStyles={{ flex: 1, minWidth: 200 }}
              search={false}
            />
          )}

          {label === "Manglik/Chevva Dosham" && (
            <SelectList
              setSelected={(val) => handleInputChange(key, val)}
              data={ManglikChevvaidosham}
              save="value"
              boxStyles={{ flex: 1, minWidth: 200 }}
              search={false}
            />
          )}

          {label === "Nakshatra" && (
            <SelectList
              setSelected={(val) => handleInputChange(key, val)}
              data={Nakshatra}
              save="value"
              boxStyles={{ flex: 1, minWidth: 200 }}
              search={false}
            />
          )}

          {label === "Education" && (
            <SelectList
              setSelected={(val) => handleInputChange(key, val)}
              data={Educations}
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

          {label === "Highest Qualification" && (
            <SelectList
              setSelected={(val) => handleInputChange(key, val)}
              data={HighestQualifications}
              save="value"
              boxStyles={{ flex: 1, minWidth: 200 }}
              search={false}
            />
          )}

          {label === "College Attended" && (
            <SelectList
              setSelected={(val) => handleInputChange(key, val)}
              data={CollegeAttended}
              save="value"
              boxStyles={{ flex: 1, minWidth: 200 }}
              search={false}
            />
          )}

          {label === "Working With" && (
            <SelectList
              setSelected={(val) => handleInputChange(key, val)}
              data={WorkingWithOptions}
              save="value"
              boxStyles={{ flex: 1, minWidth: 200 }}
              search={false}
            />
          )}

          {label === "Country Living In" && (
            <SelectList
              setSelected={(val) => handleInputChange(key, val)}
              data={Countrys}
              save="value"
              boxStyles={{ flex: 1, minWidth: 200 }}
            />
          )}

          {label === "State Living In" && (
            <SelectList
              setSelected={(val) => handleInputChange(key, val)}
              data={StateLivingInIndiaOptions}
              save="value"
              boxStyles={{ minWidth: 200 }}
            />
          )}

          {label === "City Living In" && (
            <SelectList
              setSelected={(val) => handleInputChange(key, val)}
              data={CityLivingInIndiaOptions}
              save="value"
              boxStyles={{ minWidth: 200, flex: 1 }}
            />
          )}

          {label === "Grew Up In" && (
            <SelectList
              setSelected={(val) => handleInputChange(key, val)}
              data={GrewUpInOptions}
              save="value"
              boxStyles={{ minWidth: 200, flex: 1 }}
            />
          )}

          {label === "Ethnic Origin" && (
            <SelectList
              setSelected={(val) => handleInputChange(key, val)}
              data={EthnicOriginOptions}
              save="value"
              boxStyles={{ minWidth: 200, flex: 1 }}
            />
          )}

          {label === "Age Range" && (
            <>
              <Text style={{}}>{ageRange}</Text>
              <Slider
                style={{ width: responsiveWidth(50), height: 40 }}
                minimumValue={18}
                maximumValue={50}
                minimumTrackTintColor="red"
                maximumTrackTintColor="#000000"
                vertical={true}
                onValueChange={handleSliderChange}
              />
            </>
          )}

          {label === "Minimum Height" && (
            <>
              <Text style={{}}>{minHeight}</Text>
              <Slider
                style={{ width: responsiveWidth(50), height: 40 }}
                minimumValue={4}
                maximumValue={7}
                minimumTrackTintColor="red"
                maximumTrackTintColor="#000000"
                vertical={true}
                onValueChange={handleSliderHeight}
              />
            </>
          )}

          {label === "Maximum Income" && (
            <>
              <Text style={{}}>LPA{maxIncome}</Text>
              <Slider
                style={{ width: responsiveWidth(50), height: 40 }}
                minimumValue={10}
                maximumValue={90}
                minimumTrackTintColor="red"
                maximumTrackTintColor="#000000"
                vertical={true}
                onValueChange={handleSliderIncome}
              />
            </>
          )}

          {label === "Add Image" && (
            <View style={{ bottom: 90 }}>
              <View style={{ top: 90, alignItems: "center", right: 100 }}>
                <Text
                  style={{ opacity: 0.6, left: 20 }}
                  onPress={() => setModalVisible2(!modalVisible2)}
                >
                  Preview Images
                </Text>
              </View>
            </View>
          )}

          {label === "Profile Createdby" && (
            <SelectList
              setSelected={(val) => handleInputChange(key, val)}
              data={ProfileCreatedBy}
              save="value"
              boxStyles={{ minWidth: 200, flex: 1 }}
              search={false}
            />
          )}

          {label !== "Gender" &&
            label !== "Height" &&
            label !== "Blood Group" &&
            label !== "Health Information" &&
            label !== "Lifestyle" &&
            label !== "Religion" &&
            label !== "Mother Tongue" &&
            label !== "Community" &&
            label !== "Sub Community" &&
            label !== "Gothra/Gothram" &&
            label !== "Father's Status" &&
            label !== "Mother's Status" &&
            label !== "Family Type" &&
            label !== "Family Affluence" &&
            label !== "Nakshatra" &&
            label !== "Manglik/Chevva Dosham" &&
            label !== "Education" &&
            label !== "Profession" &&
            label !== "Highest Qualification" &&
            label !== "College Attended" &&
            label !== "Working With" &&
            label !== "State Living In" &&
            label !== "City Living In" &&
            label !== "Grew Up In" &&
            label !== "Ethnic Origin" &&
            label !== "Age Range" &&
            label !== "Minimum Height" &&
            label !== "Maximum Income" &&
            label !== "Add Image" &&
            label !== "Profile Createdby" &&
            label !== "Country Living In" && (
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
    console.warn(id);
    try {
      const updatedData = {
        profileCreatedBy: profilecreatedby,
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
          gothraGothram: gothraGothram,
        },
        family: {
          fatherStatus: fatherS,
          motherStatus: motherStatus,
          familyLocation: familyLocation,
          numberOfSiblings: numberOfSiblings,
          familyType: familyType,
          familyValue: familyValue,
          familyAffluence: familyAffluence,
        },
        //   astroDetails: {
        //     manglikChevvaidosham: manglikChevvaidosham,
        //     nakshatra: nakshatra,
        //   },
        //   partnerPreferences: {
        //     gender: gender,
        //     education: education,
        //     profession: profession,
        //     ageRange: {
        //       min: ageRange,
        //     },
        //     minHeight: minHeight,
        //     maxIncome: maxIncome,
        //   },
        //   educationAndCareer: {
        //     highestQualification: highestQualification,
        //     collegeAttended: collegeAttended,
        //     workingWith: workingWith,
        //     WorkingAs: workingAs,
        //   },
        //   lifestyle: lifestyle,
        //   locationOfGroom: {
        //     countryLivingIn: countryLivingIn,
        //     stateLivingIn: stateLivingIn,
        //     cityLivingIn: cityLivingIn,
        //     grewUpIn: grewUpIn,
        //     ethnicOrigin: ethnicOrigin,
        //     zipPinCode: zipPinCode,
        //   },
        //   moreAboutYourselfPartnerAndFamily: moreAboutYourselfPartnerAndFamily,
        //   height: height,
        //   images: selectedImage,
        //   hobbies: hobbies,
      };

      updatedData.age = new Date(age);

      const { data } = await axios.put(
        `${api}/matrimonial/profiles/${id}`,
        updatedData
      );
      console.warn("Profile updated:", data);
      setProfileData(data);
    } catch (error) {
      console.log("Error updating profile:", error.message);
    }
  };

  const handleInputChange = (key, value) => {
    switch (key) {
      case "age":
        setAge(value);
        break;
      case "profilecreatedby":
        setProfileCreatedBy(value);
        break;
      case "nativePlace":
        setNativePlace(value);
        break;
      case "healthInformation":
        setHealthInformation(value);
        break;
      case "anyDisability":
        setAnyDisability(value);
        break;
      case "BLoodGroup":
        setBloodGroup(value);
        break;
      case "hobbies":
        setHobbies(value);
        break;
      case "lifestyle":
        setLifestyle(value);
        break;
      case "moreAboutYourselfPartnerAndFamily":
        setMoreAboutYourselfPartnerAndFamily(value);
        break;
      case "Height":
        setHeight(value);
        break;
      case "aboutMe":
        setAboutMe(value);
        break;
      case "maritalstatus":
        setMaritalStatus(value);
        break;
      case "religion":
        setReligion(value);
        break;
      case "motherTongue":
        setMotherTongue(value);
        break;
      case "community":
        setCommunity(value);
        break;
      case "subCommunity":
        setSubCommunity(value);
        break;
      case "gothraGothram":
        setGothraGothram(value);
        break;
      case "fatherS":
        setFatherStatus(value);
        break;
      case "withWhom":
        setWithWhom(value);
        break;
      case "asWhat":
        setAsWhat(value);
        break;
      case "natureOfBusiness":
        setNatureOfBusiness(value);
        break;
      case "motherStatus":
        setMotherStatus(value);
        break;
      case "familyLocation":
        setFamilyLocation(value);
        break;
      case "numberOfSiblings":
        setNumberOfSiblings(value);
        break;
      case "familyType":
        setFamilyType(value);
        break;
      case "familyValue":
        setFamilyValue(value);
        break;
      case "familyAffluence":
        setFamilyAffluence(value);
        break;
      case "manglikChevvaidosham":
        setManglikChevvaidosham(value);
        break;
      case "nakshatra":
        setNakshatra(value);
        break;
      case "ageRange":
        setAgeRange(value);
        break;
      case "gender":
        setGender(value);
        break;
      case "education":
        setEducation(value);
        break;
      case "profession":
        setProfession(value);
        break;
      case "minHeight":
        setMinHeight(value);
        break;
      case "maxIncome":
        setMaxIncome(value);
        break;
      case "highestQualification":
        setHighestQualification(value);
        break;
      case "collegeAttended":
        setCollegeAttended(value);
        break;
      case "workingWith":
        setWorkingWith(value);
        break;
      case "workingAs":
        setWorkingAs(value);
        break;
      case "countryLivingIn":
        setCountryLivingIn(value);
        break;
      case "stateLivingIn":
        setStateLivingIn(value);
        break;
      case "cityLivingIn":
        setCityLivingIn(value);
        break;
      case "grewUpIn":
        setGrewUpIn(value);
        break;
      case "ethnicOrigin":
        setEthnicOrigin(value);
        break;
      case "zipPinCode":
        setZipPinCode(value);
        break;
      case "profilecreatedby":
        setProfileCreatedBy(value);
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
      <View style={styles.detailsContainer}>
        {!profileData ? (
          <MatrimonyEdit />
        ) : (
          <>
            <View style={styles.profileHeader}>
              <Image style={styles.profileImage} source={{ uri: img || [] }} />
              <View style={styles.profileInfo}>
                <Text style={styles.name}>
                  {profileData?.profileId?.firstName}{" "}
                  {profileData?.profileId?.lastName}
                </Text>
                <Text style={styles.profession}>
                  {profileData?.profileId?.profession}
                </Text>
              </View>
            </View>
            {/* details container */}
            <View style={styles.detailsContainer}>
              <View style={{ bottom: 25 }}>
                <Text style={styles.sectionTitle}>Personal Details</Text>
                {renderDetailItem("Add Image", assets.length, "Image")}
                {renderDetailItem(
                  "Profile Createdby",
                  profilecreatedby,
                  "profilecreatedby"
                )}
                {renderDetailItem("Height", height, "Height")}

                {renderDetailItem(
                  "Blood Group",
                  profileData?.bloodGroup,
                  "BLoodGroup"
                )}
                {renderDetailItem(
                  "Health Information",
                  profileData?.healthInformation,
                  "healthInformation"
                )}
                {renderDetailItem(
                  "Lifestyle",
                  profileData?.lifestyle,
                  "lifestyle"
                )}
                {renderDetailItem("NativePlace", nativePlace, "nativePlace")}
              </View>

              <View style={{ bottom: 15 }}>
                <Text style={styles.sectionTitle}>Religious Background</Text>
                {renderDetailItem(
                  "Religion",
                  profileData?.religiousBackground.religion,
                  "religion"
                )}
                {renderDetailItem(
                  "Mother Tongue",
                  profileData?.religiousBackground.motherTongue,
                  "motherTongue"
                )}
                {renderDetailItem(
                  "Community",
                  profileData?.religiousBackground.community,
                  "community"
                )}
                {renderDetailItem(
                  "Sub Community",
                  profileData?.religiousBackground.subCommunity,
                  "subCommunity"
                )}
                {renderDetailItem(
                  "Gothra/Gothram",
                  profileData?.religiousBackground.gothraGothram,
                  "gothraGothram"
                )}
              </View>
              {/* Family Details Section */}
              <Text style={styles.sectionTitle}>Family Details</Text>
              {renderDetailItem(
                "Number of Siblings",
                profileData?.family.numberOfSiblings,
                "numberOfSiblings"
              )}
              {renderDetailItem(
                "Father's Status",
                profileData?.family.fatherStatus,
                "fatherStatus"
              )}
              {renderDetailItem(
                "Mother's Status",
                profileData?.family.motherStatus,
                "motherStatus"
              )}
              {renderDetailItem(
                "Family Location",
                profileData?.family.familyLocation,
                "familyLocation"
              )}
              {renderDetailItem(
                "Family Type",
                profileData?.family.familyType,
                "familyType"
              )}
              {renderDetailItem(
                "Family Affluence",
                profileData?.family.familyAffluence,
                "familyAffluence"
              )}

              {/* Astro Details Section */}
              <Text style={styles.sectionTitle}>Astro Details</Text>
              {/* {renderDetailItem(
                "Manglik/Chevva Dosham",
                profileData?.astroDetails.manglikChevvaidosham,
                "manglikChevvaidosham"
              )} */}
              {/* {renderDetailItem(
                "Nakshatra",
                profileData?.astroDetails.nakshatra,
                "nakshatra"
              )} */}

              {/* Partner Preferences Section */}
              <Text style={styles.sectionTitle}>Partner Preferences</Text>
              {renderDetailItem(
                "Age Range",
                profileData?.partnerPreferences?.ageRange.min,
                "ageRange"
              )}
              {renderDetailItem(
                "Gender",
                profileData?.partnerPreferences?.gender,
                "gender"
              )}
              {renderDetailItem(
                "Education",
                profileData?.partnerPreferences?.education,
                "education"
              )}
              {renderDetailItem(
                "Profession",
                profileData?.partnerPreferences?.profession,
                "profession"
              )}
              {renderDetailItem(
                "Minimum Height",
                profileData?.partnerPreferences?.minHeight,
                "minHeight"
              )}
              {renderDetailItem(
                "Maximum Income",
                profileData?.partnerPreferences?.maxIncome,
                "maxIncome"
              )}

              {/* Education and Career Section */}
              <Text style={styles.sectionTitle}>Education and Career</Text>
              {renderDetailItem(
                "Highest Qualification",
                profileData?.educationAndCareer?.highestQualification,
                "highestQualification"
              )}
              {renderDetailItem(
                "College Attended",
                profileData?.educationAndCareer?.collegeAttended,
                "collegeAttended"
              )}
              {renderDetailItem(
                "Working With",
                profileData?.educationAndCareer?.workingWith,
                "workingWith"
              )}

              {/* Location of Groom Section */}
              <Text style={styles.sectionTitle}>Location of Groom</Text>
              {renderDetailItem(
                "Country Living In",
                profileData?.locationOfGroom?.countryLivingIn,
                "countryLivingIn"
              )}
              {renderDetailItem(
                "State Living In",
                profileData?.locationOfGroom?.stateLivingIn,
                "stateLivingIn"
              )}
              {renderDetailItem(
                "City Living In",
                profileData?.locationOfGroom?.cityLivingIn,
                "cityLivingIn"
              )}
              {renderDetailItem(
                "Grew Up In",
                profileData?.locationOfGroom?.grewUpIn,
                "grewUpIn"
              )}
              {renderDetailItem(
                "Ethnic Origin",
                profileData?.locationOfGroom?.ethnicOrigin,
                "ethnicOrigin"
              )}
              {renderDetailItem("Zip/Pin Code", zipPinCode, "zipPinCode")}

              {/* More About Yourself, Partner, and Family Section */}
              <Text style={styles.sectionTitle}>
                More About Yourself, Partner, and Family
              </Text>
              {renderDetailItem(
                "More About",
                moreAboutYourselfPartnerAndFamily,
                "moreAboutYourselfPartnerAndFamily"
              )}

              {/* Hobbies Section */}
              <Text style={styles.sectionTitle}>Hobbies</Text>

              {renderDetailItem("Add Hobbies", hobbies, "hobbies")}

              {profileData?.hobbies && profileData?.hobbies.length > 0 ? (
                <FlatList
                  data={profileData?.hobbies}
                  renderItem={({ item }) => (
                    <View style={styles.languageItem}>
                      <Text>{item}</Text>
                    </View>
                  )}
                  keyExtractor={(item, index) => index.toString()}
                  horizontal
                  style={styles.languagesContainer}
                />
              ) : (
                renderDetailItem("Hobbies", "No hobbies listed", "hobbies")
              )}
            </View>
          </>
        )}
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

        <Modal
          style={{}}
          animationType="slide"
          visible={modalVisible}
          onRequestClose={() => setModalVisible(!modalVisible)}
        >
          <View style={styles.container1}>
            <ImagePicker
              onSave={handlesave}
              onCancel={handleCancel}
              onSelectAlbum={handleSelectAlbum}
              selected={assets}
              selectedAlbum={album}
              multiple
              limit={5}
            />
          </View>
        </Modal>

        <Modal
          visible={modalVisible2}
          transparent={true}
          onRequestClose={() => setModalVisible2(!modalVisible2)}
        >
          <View style={styles.modalContainer}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible2(!modalVisible2)}
            >
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
            <SliderBox
              images={selectedImage}
              sliderBoxHeight={Dimensions.get("window").height} // Full screen height
              dotColor="#F2f2f2"
              inactiveDotColor="#ffff"
              paginationBoxVerticalPadding={20}
              autoplay
              circleLoop
              resizeMethod={"resize"}
              resizeMode={"contain"} // Adjust this as needed
              dotStyle={{
                width: 8,
                height: 8,
                borderRadius: 5,
                marginHorizontal: 0,
                padding: 0,
                margin: 0,
                backgroundColor: "rgba(128, 128, 128, 0.92)",
              }}
              onCurrentImagePressed={(index) => handleImagePressed(index)}
              ImageComponentStyle={{
                width: "100%", // Full width
                height: "100%", // Full height
                marginTop: 5,
              }}
              imageLoadingColor="#2196F3"
            />
            <TouchableOpacity
              style={styles.editIconContainer}
              onPress={() => {
                // Handle edit press
              }}
            >
              <FontAwesome5Icon name="edit" size={15} color="#fff" />
            </TouchableOpacity>
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
  container1: {
    flex: 1,
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
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
  closeButton: {
    position: "absolute",
    top: 20,
    right: 20,
    zIndex: 999,
  },
  closeText: {
    color: "#fff",
    fontSize: 16,
  },
  slide: {
    width: 300,
    height: 300,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  editIcon: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 999,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 20,
    padding: 5,
  },
  editIconContainer: {
    position: "absolute",
    top: 20,
    left: 20,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 10,
    borderRadius: 20,
  },
});

export default MatrimonyDetails;
