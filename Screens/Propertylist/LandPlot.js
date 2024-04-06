import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ToastAndroid,
  
} from "react-native";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";

import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { SelectList } from "react-native-dropdown-select-list";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "../Api";
import axios from "axios";
import { ImagePicker } from "expo-image-multiple-picker";
import { useRoute } from "@react-navigation/native";
import Alerts from "../Alertmodal/Alerts";
const LandPlot = () => {
  const data = useRoute();

  const value = data.params?.data
  const Num = data.params?.num;
  const id = value?._id

  const [address, setAddress] = useState("");
  const [landmark, setLandmark] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [superBuiltupArea, setSuperBuiltupArea] = useState("");
  const [carpetArea, setCarpetArea] = useState("");
  const [adTitle, setAdTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [modalVisible1, setModalVisible1] = useState(false);
  const [profileid, setProfileid] = useState("");
  const [open, setOpen] = useState(false);
  const [album, setAlbum] = useState(undefined);
  const [assets, setAssets] = useState([]);
  const [visible,setVisible]=useState(false)
  const [facilities, setFacilities] = useState({
    electricity: false,
    waterSupply: false,
    gasPipeline: false,
    roadAccess: false,
    streetLighting: false,
    parking: false,
    garden: false,
    gym: false,
    playground: false,
    nearbySchools: false,
    nearbyHospitals: false,
    nearbyPublicTransport: false,
  });
  const img =
    "https://i.pinimg.com/originals/07/8c/71/078c71955fe352c544e395fbafddf82c.jpg";

  const PropertyType = [
    { key: "1", value: "For Rent" },
    { key: "2", value: "For Sale" },
  ];

  useEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem("profileid");
        
        if (value !== null) {
          setProfileid(value);
        }
      } catch (e) {
        console.log(e);
      }
    };
    getData();
  }, []);

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

  const toggleFacility = (key) => {
    setFacilities((prevFacilities) => ({
      ...prevFacilities,
      [key]: !prevFacilities[key],
    }));
  };

  useEffect(() => {
    const getproperties = async () => {
      try {
        const { data } = await axios.get(`${api}/landPlots/${id}`);
        setAddress(data.address);
        setLandmark(data.landmark);
        setPropertyType(data.type);
        setSuperBuiltupArea(data.superBuiltupArea);
        setCarpetArea(data.carpetArea);
        setFacilities(data.facilities);
        setAdTitle(data.adTitle);
        setDescription(data.description);
        setPrice(data.price);
        setSelectedImage(data.images);
      } catch (error) {
        // Handle error here, you can log it or set some state to show an error message
        console.log("Error fetching data:", error.message);
      }
    };
  
    getproperties();
  }, []);
  
const onClose =()=>{setVisible(false)}


  const UpdateForm = async () => {
    try {
      const { data } = await axios.put(`${api}/landPlots/${value._id}`, {
        address: address,
        landmark: landmark,
        type: propertyType,
        superBuiltupArea: superBuiltupArea,
        carpetArea: carpetArea,
        adTitle: adTitle,
        description: description,
        price: price,
        facilities: facilities,
        images: (selectedImage && selectedImage) || img,
      });
      console.warn(data);
    } catch (error) {
      console.log("Error during login:", error.message);
    }
  };


  const POSTPRO = async () => {
    try {
     const { data } = await axios.post(`${api}/landPlots`, {
       profileId: profileid,
       address: address,
       landmark: landmark,
       type: propertyType,
       superBuiltupArea: superBuiltupArea,
       carpetArea: carpetArea,
       adTitle: adTitle,
       description: description,
       price: price,
       facilities: facilities,
       images: (selectedImage && selectedImage) || img,
     });
  
      ToastAndroid.show("Your Property Add !", ToastAndroid.SHORT);
      setVisible(true)
    } catch (error) {
      console.log("Error during login:", error.message);
    }
  };

  return (
    <>
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        <View style={{ flex: 1 }}>
          <ScrollView
            contentContainerStyle={{
              paddingBottom: 100,
            }}
          >
            <View style={{ bottom: 100 }}>
              <View style={{ top: 10 }}>
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
                <TouchableOpacity>
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
                      onPress={() =>
                        setModalVisible1(!modalVisible1) + setOpen(true)
                      }
                    />
                  </View>
                </TouchableOpacity>

                <View style={{ top: 85, alignItems: "center", left: 10 }}>
                  {assets.length === 0 ? (
                    <Text style={{ opacity: 0.6, left: 20 }}>
                      {"No images "}
                    </Text>
                  ) : (
                    <Text
                      style={{ opacity: 0.6, left: 20 }}
                    >{`${assets.length} images `}</Text>
                  )}
                </View>
              </View>
            </View>

            <View style={{ bottom: 20 }}>
              <View style={{ bottom: 140 }}>
                <Text
                  style={{
                    top: responsiveHeight(24),
                    left: 23,
                    fontSize: 15,
                    fontWeight: "500",
                    opacity: 0.6,
                  }}
                >
                  Property Type
                </Text>
                <View style={{ top: responsiveHeight(25), marginBottom: 13 }}>
                  <SelectList
                    setSelected={(val) => setPropertyType(val)}
                    data={PropertyType}
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

              <View style={{ bottom: 140 }}>
                <Text
                  style={{
                    top: responsiveHeight(24),
                    left: 23,
                    fontSize: 15,
                    fontWeight: "500",
                    opacity: 0.6,
                  }}
                >
                  Enter Address
                </Text>
                <View style={styles.inputView}>
                  <TextInput
                    style={styles.inputText}
                    placeholder="Enter Address"
                    placeholderTextColor="black"
                    onChangeText={(txt) => setAddress(txt)}
                    value={address}
                  />
                </View>
              </View>

              <View style={{ bottom: 140 }}>
                <Text
                  style={{
                    top: responsiveHeight(24),
                    left: 23,
                    fontSize: 15,
                    fontWeight: "500",
                    opacity: 0.6,
                  }}
                >
                  Enter Landmark
                </Text>
                <View style={styles.inputView}>
                  <TextInput
                    style={styles.inputText}
                    placeholder="Enter Landmark"
                    placeholderTextColor="black"
                    onChangeText={(txt) => setLandmark(txt)}
                    value={landmark}
                  />
                </View>
              </View>

              <View style={{ bottom: 140 }}>
                <Text
                  style={{
                    top: responsiveHeight(24),
                    left: 23,
                    fontSize: 15,
                    fontWeight: "500",
                    opacity: 0.6,
                  }}
                >
                  Super Builtup Area
                </Text>
                <View style={styles.inputView}>
                  <TextInput
                    style={styles.inputText}
                    placeholder="Super Builtup Area"
                    placeholderTextColor="black"
                    onChangeText={(txt) => setSuperBuiltupArea(txt)}
                    value={superBuiltupArea}
                    keyboardType="numeric"
                  />
                </View>
              </View>

              <View style={{ bottom: 140 }}>
                <Text
                  style={{
                    top: responsiveHeight(24),
                    left: 23,
                    fontSize: 15,
                    fontWeight: "500",
                    opacity: 0.6,
                  }}
                >
                  Carpet Area
                </Text>
                <View style={styles.inputView}>
                  <TextInput
                    style={styles.inputText}
                    placeholder="Carpet Area"
                    placeholderTextColor="black"
                    onChangeText={(txt) => setCarpetArea(txt)}
                    value={carpetArea}
                    keyboardType="numeric"
                  />
                </View>
              </View>

              <View style={{ bottom: 140 }}>
                <Text
                  style={{
                    top: responsiveHeight(24),
                    left: 23,
                    fontSize: 15,
                    fontWeight: "500",
                    opacity: 0.6,
                  }}
                >
                  Title
                </Text>
                <View style={styles.inputView}>
                  <TextInput
                    style={styles.inputText}
                    placeholder="Title"
                    placeholderTextColor="black"
                    onChangeText={(txt) => setAdTitle(txt)}
                    value={adTitle}
                  />
                </View>
              </View>

              <View style={{ bottom: 140 }}>
                <Text
                  style={{
                    top: responsiveHeight(24),
                    left: 23,
                    fontSize: 15,
                    fontWeight: "500",
                    opacity: 0.6,
                  }}
                >
                  Price
                </Text>
                <View style={styles.inputView}>
                  <TextInput
                    style={styles.inputText}
                    placeholder="Price"
                    placeholderTextColor="black"
                    onChangeText={(txt) => setPrice(txt)}
                    value={price}
                    keyboardType="numeric"
                  />
                </View>
              </View>

              <View style={{}}>
                <View style={styles.facilitiesContainer}>
                  <Text style={styles.facilitiesHeader}>Facilities:</Text>
                  <View style={styles.facilityRow}>
                    <Text>Electricity:</Text>
                    <TouchableOpacity
                      style={[
                        styles.facilityButton,
                        facilities.electricity && styles.facilityButtonActive,
                      ]}
                      onPress={() => toggleFacility("electricity")}
                    >
                      <Text style={styles.facilityButtonText}>
                        {facilities.electricity ? "Yes" : "No"}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  {/* Water Supply */}
                  <View style={styles.facilityRow}>
                    <Text>Water Supply:</Text>
                    <TouchableOpacity
                      style={[
                        styles.facilityButton,
                        facilities.waterSupply && styles.facilityButtonActive,
                      ]}
                      onPress={() => toggleFacility("waterSupply")}
                    >
                      <Text style={styles.facilityButtonText}>
                        {facilities.waterSupply ? "Yes" : "No"}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  {/* Gas Pipeline */}
                  <View style={styles.facilityRow}>
                    <Text>Gas Pipeline:</Text>
                    <TouchableOpacity
                      style={[
                        styles.facilityButton,
                        facilities.gasPipeline && styles.facilityButtonActive,
                      ]}
                      onPress={() => toggleFacility("gasPipeline")}
                    >
                      <Text style={styles.facilityButtonText}>
                        {facilities.gasPipeline ? "Yes" : "No"}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  {/* Add more facilities here */}

                  <View style={styles.facilityRow}>
                    <Text>Road Access:</Text>
                    <TouchableOpacity
                      style={[
                        styles.facilityButton,
                        facilities.roadAccess && styles.facilityButtonActive,
                      ]}
                      onPress={() => toggleFacility("roadAccess")}
                    >
                      <Text style={styles.facilityButtonText}>
                        {facilities.roadAccess ? "Yes" : "No"}
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <View style={styles.facilityRow}>
                    <Text>Street Lighting:</Text>
                    <TouchableOpacity
                      style={[
                        styles.facilityButton,
                        facilities.streetLighting &&
                          styles.facilityButtonActive,
                      ]}
                      onPress={() => toggleFacility("streetLighting")}
                    >
                      <Text style={styles.facilityButtonText}>
                        {facilities.streetLighting ? "Yes" : "No"}
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <View style={styles.facilityRow}>
                    <Text>Parking:</Text>
                    <TouchableOpacity
                      style={[
                        styles.facilityButton,
                        facilities.parking && styles.facilityButtonActive,
                      ]}
                      onPress={() => toggleFacility("parking")}
                    >
                      <Text style={styles.facilityButtonText}>
                        {facilities.parking ? "Yes" : "No"}
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <View style={styles.facilityRow}>
                    <Text>Garden:</Text>
                    <TouchableOpacity
                      style={[
                        styles.facilityButton,
                        facilities.garden && styles.facilityButtonActive,
                      ]}
                      onPress={() => toggleFacility("garden")}
                    >
                      <Text style={styles.facilityButtonText}>
                        {facilities.garden ? "Yes" : "No"}
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <View style={styles.facilityRow}>
                    <Text>Gym:</Text>
                    <TouchableOpacity
                      style={[
                        styles.facilityButton,
                        facilities.gym && styles.facilityButtonActive,
                      ]}
                      onPress={() => toggleFacility("gym")}
                    >
                      <Text style={styles.facilityButtonText}>
                        {facilities.gym ? "Yes" : "No"}
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <View style={styles.facilityRow}>
                    <Text>Play ground:</Text>
                    <TouchableOpacity
                      style={[
                        styles.facilityButton,
                        facilities.playground && styles.facilityButtonActive,
                      ]}
                      onPress={() => toggleFacility("playground")}
                    >
                      <Text style={styles.facilityButtonText}>
                        {facilities.playground ? "Yes" : "No"}
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <View style={styles.facilityRow}>
                    <Text>Nearby Schools:</Text>
                    <TouchableOpacity
                      style={[
                        styles.facilityButton,
                        facilities.nearbySchools && styles.facilityButtonActive,
                      ]}
                      onPress={() => toggleFacility("nearbySchools")}
                    >
                      <Text style={styles.facilityButtonText}>
                        {facilities.nearbySchools ? "Yes" : "No"}
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <View style={styles.facilityRow}>
                    <Text>Nearby Hospitals:</Text>
                    <TouchableOpacity
                      style={[
                        styles.facilityButton,
                        facilities.nearbyHospitals &&
                          styles.facilityButtonActive,
                      ]}
                      onPress={() => toggleFacility("nearbyHospitals")}
                    >
                      <Text style={styles.facilityButtonText}>
                        {facilities.nearbyHospitals ? "Yes" : "No"}
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <View style={styles.facilityRow}>
                    <Text>NearbyPublic Transport:</Text>
                    <TouchableOpacity
                      style={[
                        styles.facilityButton,
                        facilities.nearbyPublicTransport &&
                          styles.facilityButtonActive,
                      ]}
                      onPress={() => toggleFacility("nearbyPublicTransport")}
                    >
                      <Text style={styles.facilityButtonText}>
                        {facilities.nearbyPublicTransport ? "Yes" : "No"}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              <View
                style={{
                  borderBottomColor: "#000",
                  marginHorizontal: 20,
                  borderWidth: 1,
                  borderRadius: 8,
                  opacity: 0.5,
                  top: responsiveHeight(6),
                }}
              >
                <TextInput
                  editable
                  multiline
                  numberOfLines={4}
                  maxLength={40}
                  onChangeText={(text) => setDescription(text)}
                  value={description}
                  style={{ padding: 10 }}
                  placeholder="Decription"
                  placeholderTextColor={"#000"}
                />
              </View>
            </View>

            <Modal
              style={{}}
              animationType="slide"
              visible={modalVisible1}
              onRequestClose={() => setModalVisible1(!modalVisible1)}
            >
              <View style={styles.container}>
                {open ? (
                  <ImagePicker
                    onSave={handleSave}
                    onCancel={handleCancel}
                    onSelectAlbum={handleSelectAlbum}
                    selected={assets}
                    selectedAlbum={album}
                    multiple
                    limit={5}
                  />
                ) : (
                  <TouchableOpacity onPress={() => setOpen(true)}>
                    <Text style={styles.button}>Open Image Picker</Text>
                  </TouchableOpacity>
                )}
              </View>
            </Modal>
          </ScrollView>
        </View>
      </View>

      <View style={{ paddingBottom: 40, backgroundColor: "#fff" }}>
      {Num == 1 ? (
          <TouchableOpacity style={styles.loginBtn1} onPress={() => UpdateForm()}>
            <Text style={{ color: "tomato", fontSize: 18, fontWeight: "500" }}>
              Update
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.loginBtn} onPress={() => POSTPRO()}>
            <Text style={{ color: "white", fontSize: 18, fontWeight: "500" }}>
              Post
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
        )}
      </View>
      <Alerts visible={visible} onClose={onClose} icon={"building"} title={'Application Submitted'} desc={"The Request For The Property Has Been Sent Successfully!"}/>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  camera: {
    flex: 1,
  },
  button: {
    padding: 10,
    backgroundColor: "#3D50DF",
    color: "white",
    borderRadius: 5,
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
    elevation: 3,
    alignSelf: "center",
    top: 20,
  },
  facilitiesContainer: {
    padding: 20,
    borderTopColor: "#ccc",
    top: 20,
  },
  facilitiesHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  facilityRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  facilityButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 5,
  },
  facilityButtonActive: {
    backgroundColor: "green",
  },
  facilityButtonText: {
    color: "black",
    fontSize: 16,
  }, loginBtn1: {
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

export default LandPlot;
