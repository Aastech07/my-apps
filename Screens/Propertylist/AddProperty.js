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
import { Camera } from "expo-camera";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { SelectList } from "react-native-dropdown-select-list";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "../Api";
import axios from "axios";
import { ImagePicker } from "expo-image-multiple-picker";
const PropertyForm = () => {
  const [address, setAddress] = useState("");
  const [landmark, setLandmark] = useState("");
  const [proprietorshiptypes, setProprietorshiptypes] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [furnishing, setFurnishing] = useState("");
  const [superBuiltupArea, setSuperBuiltupArea] = useState("");
  const [carpetArea, setCarpetArea] = useState("");
  const [maintenanceMonthly, setMaintenanceMonthly] = useState("");
  const [totalFloors, setTotalFloors] = useState("");
  const [floorNo, setFloorNo] = useState("");
  const [carParking, setCarParking] = useState("");
  const [facing, setFacing] = useState("");
  const [adTitle, setAdTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [propertyFor, setPropertyFor] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [modalVisible1, setModalVisible1] = useState(false);
  const [profileid, setProfileid] = useState("");
  const [open, setOpen] = useState(false);
  const [album, setAlbum] = useState(undefined);
  const [assets, setAssets] = useState([]);
  const [number, setNumber] = useState("");
  const img =
    "https://i.pinimg.com/originals/07/8c/71/078c71955fe352c544e395fbafddf82c.jpg";

  const PropertyFor = [
    { key: "1", value: "For Sale: Houses & Apartments" },
    { key: "2", value: "For Rent: Houses & Apartments" },
    { key: "3", value: "other" },
  ];

  const Proprietorshiptypes = [
    { key: "1", value: "Ownership" },
    { key: "2", value: "Pagdi" },
  ];

  const PropertyType = [
    { key: "1", value: "Apartments" },
    { key: "2", value: "Builder Floors" },
    { key: "3", value: "Farm Houses" },
    { key: "4", value: "Houses & Villas" },
  ];

  const Bedrooms = [
    { key: "1", value: "0" },
    { key: "2", value: "1" },
    { key: "3", value: "2" },
    { key: "4", value: "3" },
    { key: "5", value: "3+" },
  ];

  const Bathrooms = [
    { key: "1", value: "0" },
    { key: "2", value: "1" },
    { key: "3", value: "2" },
    { key: "4", value: "3" },
    { key: "5", value: "3+" },
  ];

  const Furnishing = [
    { key: "1", value: "Furnished" },
    { key: "2", value: "Semi-Furnished" },
    { key: "3", value: "Unfurnished" },
  ];

  const CarParking = [
    { key: "1", value: "0" },
    { key: "2", value: "1" },
    { key: "3", value: "2" },
    { key: "4", value: "3" },
    { key: "5", value: "3+" },
  ];

  const Facing = [
    { key: "1", value: "East" },
    { key: "2", value: "North" },
    { key: "3", value: "North-East" },
    { key: "4", value: "North-West" },
    { key: "5", value: "South" },
    { key: "6", value: "South-East" },
    { key: "7", value: "South-West" },
    { key: "8", value: "West" },
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

  const POSTPRO = async () => {
    try {
      const { data } = await axios.post(`${api}/properties`, {
        profileId: profileid,
        propertyFor: propertyFor,
        address: address,
        landmark: landmark,
        proprietorshiptypes: proprietorshiptypes,
        propertyType: propertyType,
        bedrooms: bedrooms,
        bathrooms: bathrooms,
        furnishing: furnishing,
        superBuiltupArea: superBuiltupArea,
        carpetArea: carpetArea,
        maintenanceMonthly: maintenanceMonthly,
        totalFloors: totalFloors,
        floorNo: floorNo,
        carParking: carParking,
        facing: facing,
        adTitle: adTitle,
        description: description,
        price: price,
        image: (selectedImage && selectedImage) || img,
        ContactNo: number,
      });
      console.warn(data);
      ToastAndroid.show("Your Property Add !", ToastAndroid.SHORT);
    } catch (error) {
      console.log("Error during login:", error.message);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView
        contentContainerStyle={{
          flex: 1,
          marginBottom: -1500,
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
            <TouchableOpacity
              onPress={() => setModalVisible1(!modalVisible1) + setOpen(true)}
            >
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
                />
              </View>
            </TouchableOpacity>

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
              Property For
            </Text>
            <View style={{ top: responsiveHeight(25), marginBottom: 13 }}>
              <SelectList
                setSelected={(val) => setPropertyFor(val)}
                data={PropertyFor}
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
              Proprietor ship types
            </Text>
            <View style={{ top: responsiveHeight(25), marginBottom: 13 }}>
              <SelectList
                setSelected={(val) => setProprietorshiptypes(val)}
                data={Proprietorshiptypes}
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
              Bedrooms
            </Text>
            <View style={{ top: responsiveHeight(25), marginBottom: 13 }}>
              <SelectList
                setSelected={(val) => setBedrooms(val)}
                data={Bedrooms}
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
                maxHeight={150}
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
              Bathrooms
            </Text>
            <View style={{ top: responsiveHeight(25), marginBottom: 13 }}>
              <SelectList
                setSelected={(val) => setBathrooms(val)}
                data={Bathrooms}
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
                maxHeight={150}
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
              Furnishing
            </Text>
            <View style={{ top: responsiveHeight(25), marginBottom: 13 }}>
              <SelectList
                setSelected={(val) => setFurnishing(val)}
                data={Furnishing}
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
                maxHeight={150}
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
              Maintenance Monthly
            </Text>
            <View style={styles.inputView}>
              <TextInput
                style={styles.inputText}
                placeholder="Maintenance Monthly"
                placeholderTextColor="black"
                onChangeText={(txt) => setMaintenanceMonthly(txt)}
                value={maintenanceMonthly}
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
              Total Floors
            </Text>
            <View style={styles.inputView}>
              <TextInput
                style={styles.inputText}
                placeholder="Total Floors"
                placeholderTextColor="black"
                onChangeText={(txt) => setTotalFloors(txt)}
                value={totalFloors}
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
              Floor No
            </Text>
            <View style={styles.inputView}>
              <TextInput
                style={styles.inputText}
                placeholder="Floor No"
                placeholderTextColor="black"
                onChangeText={(txt) => setFloorNo(txt)}
                value={floorNo}
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
              Car Parking
            </Text>
            <View style={{ top: responsiveHeight(25), marginBottom: 13 }}>
              <SelectList
                setSelected={(val) => setCarParking(val)}
                data={CarParking}
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
                maxHeight={150}
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
              Facing
            </Text>
            <View style={{ top: responsiveHeight(25), marginBottom: 13 }}>
              <SelectList
                setSelected={(val) => setFacing(val)}
                data={Facing}
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
                maxHeight={150}
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
              Contact No
            </Text>
            <View style={styles.inputView}>
              <TextInput
                style={styles.inputText}
                placeholder="Contact No"
                placeholderTextColor="black"
                onChangeText={(txt) => setNumber(txt)}
                value={number}
                keyboardType="numeric"
              />
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

      <View style={{ paddingBottom: 40 }}>
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
      </View>
    </View>
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
});

export default PropertyForm;
