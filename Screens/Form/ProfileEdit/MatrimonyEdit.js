import React, { useState, useEffect } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Modal,
  TextInput,
  TouchableOpacity,
} from "react-native";
// import Animated, { FadeInLeft } from "react-native-reanimated";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import { SelectList } from "react-native-dropdown-select-list";
import dayjs from "dayjs";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { api } from "../../Api";
import { ImagePicker } from "expo-image-multiple-picker";
import { EthnicOriginOptions, Genders } from "./MatrimonyApi";
import { GrewUpInOptions } from "./MatrimonyApi";
import { WorkingAsOptions } from "./MatrimonyApi";
import { HighestQualifications } from "./MatrimonyApi";
import { Professions } from "./MatrimonyApi";
import { Lifestyle } from "./MatrimonyApi";
import { AstroDetails } from "./MatrimonyApi";
import { FamilyValue } from "./MatrimonyApi";
import { FamilyType } from "./MatrimonyApi";
import { Disability } from "./MatrimonyApi";
import { Educations } from "./MatrimonyApi";
import { MotherStatus } from "./MatrimonyApi";
import { fatherStatus } from "./MatrimonyApi";
import { Community } from "./MatrimonyApi";
import { Height } from "./MatrimonyApi";
import { bloodGroup } from "./MatrimonyApi";
import { HealthInformation } from "./MatrimonyApi";
import { WorkingWithOptions } from "./MatrimonyApi";
import { ProfileCreatedBy } from "./MatrimonyApi";
import RangeSlider from "react-native-range-slider-expo";

const MatrimonyEdit = () => {
  const [userid, setUserID] = useState();
  const [profileid, setProfileid] = useState();

  useEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem("UserID");
        const value1 = await AsyncStorage.getItem("profileid");
        if (value !== null) {
          setUserID(value);
          setProfileid(value1);
        }
      } catch (e) {
        console.log(e);
      }
    };
    getData();
  }, []);

  const [fromValue, setFromValue] = useState(0);
  const [toValue, setToValue] = useState(0);
  const [profilecreatedby, setProfileCreatedBy] = useState("");
  const [nativePlace, setNativePlace] = useState("");
  const [healthInformation, setHealthInformation] = useState("");
  const [anyDisability, setAnyDisability] = useState("");
  const [bloodgroup, setBloodGroup] = useState("");
  const [lifestyle, setLifestyle] = useState("");
  const [
    moreAboutYourselfPartnerAndFamily,
    setMoreAboutYourselfPartnerAndFamily,
  ] = useState("");
  const [height, setHeight] = useState("");
  const [gothraGothram, setGothraGothram] = useState("");
  const [fatherS, setFatherStatus] = useState("");
  const [motherStatus, setMotherStatus] = useState("");
  const [familyLocation, setFamilyLocation] = useState("");
  const [numberOfSiblings, setNumberOfSiblings] = useState({});
  const [familyType, setFamilyType] = useState("");
  const [familyValue, setFamilyValue] = useState("");
  const [manglikChevvaidosham, setManglikChevvaidosham] = useState("");
  const [gender, setGender] = useState("");
  const [education, setEducation] = useState("");
  const [profession, setProfession] = useState("");
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
  const [open, setOpen] = useState(false);
  const [album, setAlbum] = useState(undefined);
  const [assets, setAssets] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [countrys, setCountrys] = useState([]);
  const [states, setStates] = useState([]);
  const [minHeight, setMinHeight] = useState("");
  const [Citys, setCitys] = useState([]);

  const handleSave = (selectedAssets) => {
    setAssets(selectedAssets);
    setModalVisible1(!modalVisible1);
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

  useEffect(() => {
    const getData = async () => {
      try {
        const profileId = await AsyncStorage.getItem("profileid");
        if (profileId !== null) {
          const { data } = await axios.get(`${api}/profiles/${profileId}`);
          //setCountryLivingIn(data.address.country);
          //setStateLivingIn(data.address.state);
          //setCityLivingIn(data.address.city);
        }
      } catch (e) {
        console.log(e);
      }
    };
    getData();
  }, []);

  
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
        `https://api.countrystatecity.in/v1/countries/${countryLivingIn[0] +
          countryLivingIn[1]}/states`,
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
        `https://api.countrystatecity.in/v1/countries/${countryLivingIn[0] +
          countryLivingIn[1]}/states/${stateLivingIn[0] +
          stateLivingIn[1]}/cities`,
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
  const stateNames = states.map((state) => ({
    value: `${state.iso2} ${state.name}`,
    key: state.id,
  }));

  const cityNames = Citys.map((city) => ({
    value: `${city.name}`,
    key: city.id,
  }));

  const PostMatri = async () => {
     console.warn({userid})
     console.warn({profileid})
    try {
      const { data } = await axios.post(`${api}/matrimonial/profiles`, {
        userId: userid,
        profileId: profileid,
        Profilecreatedby: profilecreatedby,
        nativePlace: nativePlace,
        healthInformation: healthInformation,
        anyDisabiliy: anyDisability,
        bloodGroup: bloodgroup,
        religiousBackground: {
          gothraGothram: gothraGothram,
        },
        family: {
          fatherStatus: fatherS,
          motherStatus: motherStatus,
          familyLocation: familyLocation,
          numberOfSiblings: numberOfSiblings,
          familyType: familyType,
          familyValue: familyValue,
        },
       astroDetails: {
         manglikChevvaidosham: manglikChevvaidosham,
       },
    //   partnerPreferences: {
    //     gender: gender,
    //     education: education,
    //     profession: profession,
    //     ageRange: {
    //       min: fromValue,
    //       max: toValue,
    //     },
    //     // minHeight: minHeight,
    //     // maxIncome: maxIncome,
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
    //    images: selectedImage,
      });
      console.warn(data);
      console.log({ data });
      await AsyncStorage.setItem("Matrymonyid", data._id);
    } catch (error) {
      console.log("Error during login:", error.message);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 550 }}
      >
        <View style={{ flex: 1 }}>
          <View style={{ bottom: 40 }}>
            <View style={{ left: 22, top: 50 }}>
              <Text
                style={{ fontSize: 20, color: "tomato", fontWeight: "300" }}
              >
                Basic{" "}
                <Text style={{ color: "#000", fontWeight: "400" }}>
                  Information
                </Text>
              </Text>
            </View>

            <View style={{ bottom: 70, right: 7 }}>
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
                <TouchableOpacity onPress={() => removeImage()}>
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
                  right: 30,
                  marginBottom: 30,
                  backgroundColor: "#fff",
                }}
              >
                <FontAwesome5Icon
                  name="folder-open"
                  size={15}
                  style={{}}
                  color={"orange"}
                  onPress={() =>
                    setModalVisible1(!modalVisible1) + setOpen(true)
                  }
                />
              </View>

              <View style={{ top: 85, alignItems: "center", left: 10 }}>
                {assets.length === 0 ? (
                  <Text style={{ opacity: 0.6, left: 20 }}>{"No images "}</Text>
                ) : (
                  <Text
                    style={{ opacity: 0.6, left: 20 }}
                  >{`${assets.length} images `}</Text>
                )}
              </View>
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
                Select Profile Created for
              </Text>
              <ScrollView style={{ top: responsiveHeight(25) }}>
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
              </ScrollView>
            </View>

            <View style={{ bottom: responsiveHeight(15) }}>
              <View style={{ bottom: responsiveHeight(3) }}>
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
                <ScrollView style={{ top: responsiveHeight(25) }}>
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
                </ScrollView>
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

              <View style={{ bottom: responsiveHeight(-1) }}>
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
                    setSelected={(val) => setAnyDisability(val)}
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
                  Blood Group
                </Text>
                <View style={{ top: responsiveHeight(25) }}>
                  <SelectList
                    setSelected={(val) => setBloodGroup(val)}
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

              <View style={{ bottom: 40 }}>
                <View style={{ left: 22, top: responsiveHeight(36.6) }}>
                  <Text
                    style={{ fontSize: 20, color: "tomato", fontWeight: "300" }}
                  >
                    Religious{" "}
                    <Text style={{ color: "#000", fontWeight: "400" }}>
                      Background...
                    </Text>
                  </Text>
                </View>

                <View style={{ top: 70 }}>
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
                      Gothra/GothraGothram
                    </Text>
                    <View style={{ top: responsiveHeight(25) }}>
                      <SelectList
                        setSelected={(val) => setGothraGothram(val)}
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

                <View style={{ top: 50 }}>
                  <View style={{ left: 22, top: responsiveHeight(35) }}>
                    <Text
                      style={{
                        fontSize: 20,
                        color: "tomato",
                        fontWeight: "300",
                      }}
                    >
                      Family
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
                          setSelected={(val) => setFatherStatus(val)}
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
                          setSelected={(text) => setMotherStatus(text)}
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
                          placeholder="Family Location"
                          placeholderTextColor="black"
                          onChangeText={(val) => setFamilyLocation(val)}
                          value={familyLocation}
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
                          placeholder="Native Place"
                          placeholderTextColor="black"
                          onChangeText={(val) => setNativePlace(val)}
                          value={nativePlace}
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
                          placeholder="No.of Siblings"
                          placeholderTextColor="black"
                          onChangeText={(val) => setNumberOfSiblings(val)}
                          value={numberOfSiblings}
                          keyboardType="numeric"
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
                          setSelected={(val) => setFamilyType(val)}
                          data={FamilyType}
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
                          setSelected={(val) => setFamilyValue(val)}
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
                  </View>
                </View>

                <View style={{ top: 150 }}>
                  <View style={{ left: 22, top: responsiveHeight(37) }}>
                    <Text
                      style={{
                        fontSize: 20,
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

                  <View style={{ top: 75 }}>
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
                          setSelected={(val) => setManglikChevvaidosham(val)}
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

                <View style={{ top: 210 }}>
                  <View style={{ left: 22, top: responsiveHeight(37) }}>
                    <Text
                      style={{
                        fontSize: 20,
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
                        Highest Qualification
                      </Text>
                      <View style={{ top: responsiveHeight(25) }}>
                        <SelectList
                          setSelected={(val) => setHighestQualification(val)}
                          data={HighestQualifications}
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
                          onChangeText={(text) => setCollegeAttended(text)}
                          value={collegeAttended}
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
                          setSelected={(val) => setWorkingWith(val)}
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
                          setSelected={(val) => setWorkingAs(val)}
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

                <View style={{ top: 300 }}>
                  <View style={{ left: 22, top: responsiveHeight(37) }}>
                    <Text
                      style={{
                        fontSize: 20,
                        color: "tomato",
                        fontWeight: "300",
                      }}
                    >
                      Lifestyle...{" "}
                    </Text>
                  </View>

                  <View style={{ top: responsiveHeight(14) }}>
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
                          setSelected={(val) => setLifestyle(val)}
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

                <View style={{ top: 330 }}>
                  <View style={{ left: 22, top: responsiveHeight(38) }}>
                    <Text
                      style={{
                        fontSize: 17,
                        color: "tomato",
                        fontWeight: "300",
                      }}
                    >
                      More About Yourself,{" "}
                      <Text style={{ color: "#000", fontWeight: "400" }}>
                        Partner and F...
                      </Text>
                    </Text>
                  </View>

                  <View style={{ top: responsiveHeight(16) }}>
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

                <View style={{ top: 310 }}>
                  <View style={{ left: 22, top: responsiveHeight(40) }}>
                    <Text
                      style={{
                        fontSize: 20,
                        color: "tomato",
                        // top: responsiveHeight(10),
                        fontWeight: "300",
                      }}
                    >
                      Location of{" "}
                      <Text style={{ color: "#000", fontWeight: "400" }}>
                        Partner...
                      </Text>
                    </Text>
                  </View>

                  <View style={{ top: 120 }}>
                    <Text
                      style={{
                        top: responsiveHeight(24),
                        left: 23,
                        fontSize: 15,
                        fontWeight: "500",
                        opacity: 0.6,
                      }}
                    >
                      Country
                    </Text>
                    <View
                      style={{ top: responsiveHeight(25), marginBottom: 13 }}
                    >
                      <SelectList
                        setSelected={(val) => {
                          setCountryLivingIn(val);
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

                  <View style={{ top: 120 }}>
                    <Text
                      style={{
                        top: responsiveHeight(24),
                        left: 23,
                        fontSize: 15,
                        fontWeight: "500",
                        opacity: 0.6,
                      }}
                    >
                      State Name
                    </Text>
                    <View
                      style={{ top: responsiveHeight(25), marginBottom: 13 }}
                    >
                      <SelectList
                        setSelected={(val) => setStateLivingIn(val)}
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

                  <View style={{ top: 120 }}>
                    <Text
                      style={{
                        top: responsiveHeight(24),
                        left: 23,
                        fontSize: 15,
                        fontWeight: "500",
                        opacity: 0.6,
                      }}
                    >
                      City Name
                    </Text>
                    <View
                      style={{ top: responsiveHeight(25), marginBottom: 13 }}
                    >
                      <SelectList
                        setSelected={(val) => setCityLivingIn(val)}
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
                        Grew up in
                      </Text>
                      <View style={{ top: responsiveHeight(25) }}>
                        <SelectList
                          setSelected={(val) => setGrewUpIn(val)}
                          data={countrys}
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
                  </View>

                  <View style={{ top: responsiveHeight(20) }}>
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
                          setSelected={(val) => setEthnicOrigin(val)}
                          data={countrys}
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
                  </View>

                  <View style={{ top: responsiveHeight(23) }}>
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
                          onChangeText={(val) => setZipPinCode(val)}
                          value={zipPinCode}
                        />
                      </View>
                    </View>
                  </View>
                </View>

                <View style={{ top: 420 }}>
                  <View style={{ bottom: responsiveHeight(-10) }}>
                    <View style={{ top: responsiveHeight(25), left: 20 }}>
                      <Text
                        style={{
                          fontSize: 20,
                          color: "tomato",
                          fontWeight: "300",
                        }}
                      >
                        Partner{" "}
                        <Text style={{ color: "#000", fontWeight: "400" }}>
                          Preference...
                        </Text>
                      </Text>
                    </View>

                    <Text
                      style={{
                        top: responsiveHeight(26),
                        left: 23,
                        fontSize: 15,
                        fontWeight: "500",
                        opacity: 0.6,
                        marginBottom: 10,
                      }}
                    >
                      Set Age Range
                    </Text>

                    <Text
                      style={{
                        top: responsiveHeight(26),
                        left: responsiveWidth(7),
                        fontSize: 15,
                        fontWeight: "500",
                        opacity: 0.6,
                      }}
                    >
                      Min Age {fromValue}
                    </Text>

                    <Text
                      style={{
                        top: responsiveHeight(23),
                        left: responsiveWidth(62),
                        fontSize: 15,
                        fontWeight: "500",
                        opacity: 0.6,
                      }}
                    >
                      {toValue} Max Age
                    </Text>
                    <View style={{ top: responsiveHeight(21) }}>
                      <RangeSlider
                        min={18}
                        max={70}
                        fromValueOnChange={(value) => setFromValue(value)}
                        toValueOnChange={(value) => setToValue(value)}
                        styleSize={"small"}
                        barHeight={3}
                        inRangeBarColor={"tomato"}
                      />
                    </View>
                  </View>

                  <View style={{ bottom: responsiveHeight(-5) }}>
                    <Text
                      style={{
                        top: responsiveHeight(25.5),
                        left: 23,
                        fontSize: 15,
                        fontWeight: "500",
                        opacity: 0.6,
                      }}
                    >
                      Height
                    </Text>

                    <View style={{ top: responsiveHeight(26) }}>
                      <SelectList
                        setSelected={(val) => setMinHeight(val)}
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

                  <View
                    style={{ bottom: responsiveHeight(-11), marginBottom: 10 }}
                  >
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
                        setSelected={(val) => setEducation(val)}
                        data={Educations}
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

                  <View
                    style={{ bottom: responsiveHeight(-12), marginBottom: 13 }}
                  >
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
                        setSelected={(val) => setProfession(val)}
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

                  <View
                    style={{ bottom: responsiveHeight(-12), marginBottom: 13 }}
                  >
                    <Text
                      style={{
                        top: responsiveHeight(24),
                        left: 23,
                        fontSize: 15,
                        fontWeight: "500",
                        opacity: 0.6,
                      }}
                    >
                      Gender
                    </Text>
                    <View style={{ top: responsiveHeight(25) }}>
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
                </View>
              </View>
            </View>
          </View>
        </View>

        <Modal
          style={{}}
          animationType="slide"
          visible={modalVisible1}
          onRequestClose={() => setModalVisible1(!modalVisible1)}
        >
          <View style={styles.container}>
            <ImagePicker
              onSave={handleSave}
              onCancel={handleCancel}
              onSelectAlbum={handleSelectAlbum}
              selected={assets}
              selectedAlbum={album}
              multiple
              limit={5}
            />
          </View>
        </Modal>
      </ScrollView>

      <View style={{ bottom: 80 }}>
        <TouchableOpacity
          style={{
            width: "100%",
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
          onPress={() => PostMatri()}
        >
          <Text style={{ color: "white", fontSize: 16, fontWeight: "500" }}>
            Update
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MatrimonyEdit;
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
    paddingLeft: 10,
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
    borderRadius: 5,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 50,
    alignSelf: "center",
    top: 10,
    borderWidth: 1,
    borderColor: "tomato",
  },
});
