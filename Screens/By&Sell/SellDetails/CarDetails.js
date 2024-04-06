import React, { useState, useEffect } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Modal,
} from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import {
  responsiveWidth,
  responsiveHeight,
} from "react-native-responsive-dimensions";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import { Brand } from "./Api";
import { FuelType } from "./Api";
import { Trans } from "./Api";
import { NumberOfOwnerd } from "./Api";
import { ImagePicker } from "expo-image-multiple-picker";
import { api } from "../../Api";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRoute } from "@react-navigation/native";
import Alerts from "../../Alertmodal/Alerts";

const CarDetails = () => {
  const [brand, setBrand] = useState("");
  const [year, setYears] = useState("");
  const [number, setNumber] = useState("");
  const [fule, setFule] = useState("");
  const [transmission, setTransmission] = useState("");
  const [driven, setDriven] = useState("");
  const [adtitle, setAdTitle] = useState("");
  const [numberofOwners, setNumberofOwners] = useState("");
  const [price, setPrice] = useState("");
  const [address, setAddress] = useState("");
  const [landmark, setLandmark] = useState("");
  const [description, setDescription] = useState("");
  const [open, setOpen] = useState(false);
  const [album, setAlbum] = useState(undefined);
  const [assets, setAssets] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [modalVisible1, setModalVisible1] = useState(false);
  const [profileid, setProfileid] = useState("");
  const [visible,setVisible]=useState(false)

  const Data = useRoute();
  const Value = Data.params?.data;
  const Num = Data.params?.num;

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

  useEffect(()=>{
    const getproperties = async()=>{
       const {data} = await axios.get(`${api}/cars/${Value._id}`)
       setBrand(data.brand);
       setYears(data.year);
       setNumber(data.number);
       setFule(data.fuelType);
       setTransmission(data.transmission);
       setDriven(data.kmDriven);
       setNumberofOwners(data.numberOfOwners);
       setAdTitle(data.adTitle);
       setDescription(data.description);
       setPrice(data.price);
       setAddress(data.address);
       setLandmark(data.landmark);
       setSelectedImage(data.images)
     }
     getproperties()
   },[])

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

  const POSTPRO = async () => {
    console.warn(profileid)
    try {
      const { data } = await axios.post(`${api}/cars`, {
        profileId: profileid,
        brand: brand,
        year: year,
        number: number,
        fuelType: fule,
        transmission: transmission,
        kmDriven: driven,
        numberOfOwners: numberofOwners,
        adTitle: adtitle,
        description: description,
        price: price,
        address: address,
        landmark: landmark,
        images: selectedImage,
      });
     
      setVisible(true)
    } catch (error) {
      console.log("Error during login:", error.message);
    }
  };
  const onClose =()=>{setVisible(false)}

  const POSTPROS = async () => {
    try {
      const { data } = await axios.put(`${api}/cars/${Value._id}`, {
        brand: brand,
        year: year,
        number: number,
        fuelType: fule,
        transmission: transmission,
        kmDriven: driven,
        numberOfOwners: numberofOwners,
        adTitle: adtitle,
        description: description,
        price: price,
        address: address,
        landmark: landmark,
        images: selectedImage,
      });
      //console.warn(data);
      setVisible(true)
    } catch (error) {
      console.log("Error during login:", error.message);
    }
  };

  return (
    <><View style={{ flex: 1, backgroundColor: "#ffff" }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <View style={{ bottom: 120 }}>
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
                  color={"tomato"} />
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
                  onPress={() => setModalVisible1(!modalVisible1) + setOpen(true)} />
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

        <View style={{ bottom: 50 }}>
          <View style={{ bottom: 130 }}>
            <Text
              style={{
                top: responsiveHeight(24),
                left: 23,
                fontSize: 15,
                fontWeight: "500",
                opacity: 0.6,
              }}
            >
              Brand *
            </Text>
            <View style={{ top: responsiveHeight(25), marginBottom: 13 }}>
              <SelectList
                setSelected={(val) => setBrand(val)}
                data={Brand}
                save="value"
                boxStyles={{
                  marginLeft: responsiveWidth(5),
                  marginRight: responsiveWidth(5),
                }}
                dropdownStyles={{
                  marginLeft: responsiveWidth(5),
                  marginRight: responsiveWidth(5),
                }} />
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
              Years *
            </Text>
            <View style={styles.inputView}>
              <TextInput
                style={styles.inputText}
                placeholder="Years"
                placeholderTextColor="black"
                onChangeText={(txt) => setYears(txt)}
                value={year}
                keyboardType="numeric" />
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
              Car Number *
            </Text>
            <View style={styles.inputView}>
              <TextInput
                style={styles.inputText}
                placeholder="Number"
                placeholderTextColor="black"
                onChangeText={(txt) => setNumber(txt)}
                value={number} />
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
              Fuel *
            </Text>
            <View style={{ top: responsiveHeight(25), marginBottom: 13 }}>
              <SelectList
                setSelected={(val) => setFule(val)}
                data={FuelType}
                save="value"
                boxStyles={{
                  marginLeft: responsiveWidth(5),
                  marginRight: responsiveWidth(5),
                }}
                dropdownStyles={{
                  marginLeft: responsiveWidth(5),
                  marginRight: responsiveWidth(5),
                }}
                search={false} />
            </View>
          </View>

          <View style={{ bottom: 110 }}>
            <Text
              style={{
                top: responsiveHeight(24),
                left: 23,
                fontSize: 15,
                fontWeight: "500",
                opacity: 0.6,
              }}
            >
              Transmission
            </Text>
            <View style={{ top: responsiveHeight(25), marginBottom: 13 }}>
              <SelectList
                setSelected={(val) => setTransmission(val)}
                data={Trans}
                save="value"
                boxStyles={{
                  marginLeft: responsiveWidth(5),
                  marginRight: responsiveWidth(5),
                }}
                dropdownStyles={{
                  marginLeft: responsiveWidth(5),
                  marginRight: responsiveWidth(5),
                }}
                search={false} />
            </View>
          </View>

          <View style={{ bottom: 105 }}>
            <Text
              style={{
                top: responsiveHeight(24),
                left: 23,
                fontSize: 15,
                fontWeight: "500",
                opacity: 0.6,
              }}
            >
              Km Driven
            </Text>
            <View style={styles.inputView}>
              <TextInput
                style={styles.inputText}
                placeholder=" Km Driven "
                placeholderTextColor="black"
                onChangeText={(txt) => setDriven(txt)}
                value={driven}
                keyboardType="numeric" />
            </View>
          </View>

          <View style={{ bottom: 100 }}>
            <Text
              style={{
                top: responsiveHeight(24),
                left: 23,
                fontSize: 15,
                fontWeight: "500",
                opacity: 0.6,
              }}
            >
              Number of Owners
            </Text>
            <View style={{ top: responsiveHeight(25), marginBottom: 13 }}>
              <SelectList
                setSelected={(val) => setNumberofOwners(val)}
                data={NumberOfOwnerd}
                save="value"
                boxStyles={{
                  marginLeft: responsiveWidth(5),
                  marginRight: responsiveWidth(5),
                }}
                dropdownStyles={{
                  marginLeft: responsiveWidth(5),
                  marginRight: responsiveWidth(5),
                }}
                search={false} />
            </View>
          </View>

          <View style={{ bottom: 95 }}>
            <Text
              style={{
                top: responsiveHeight(24),
                left: 23,
                fontSize: 15,
                fontWeight: "500",
                opacity: 0.6,
              }}
            >
              AdTitle
            </Text>
            <View style={styles.inputView}>
              <TextInput
                style={styles.inputText}
                placeholder="AdTitle"
                placeholderTextColor="black"
                onChangeText={(txt) => setAdTitle(txt)}
                value={adtitle} />
            </View>
          </View>

          <View style={{ bottom: 95 }}>
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
                keyboardType="numeric" />
            </View>
          </View>

          <View style={{ bottom: 95 }}>
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
            <View style={styles.inputView}>
              <TextInput
                style={styles.inputText}
                placeholder="Address"
                placeholderTextColor="black"
                onChangeText={(txt) => setAddress(txt)}
                value={address} />
            </View>
          </View>

          <View style={{ bottom: 95 }}>
            <Text
              style={{
                top: responsiveHeight(24),
                left: 23,
                fontSize: 15,
                fontWeight: "500",
                opacity: 0.6,
              }}
            >
              landmark
            </Text>
            <View style={styles.inputView}>
              <TextInput
                style={styles.inputText}
                placeholder="landmark"
                placeholderTextColor="black"
                onChangeText={(txt) => setLandmark(txt)}
                value={landmark} />
            </View>
          </View>

          <View style={{ bottom: 95 }}>
            <Text
              style={{
                top: responsiveHeight(24),
                left: 23,
                fontSize: 15,
                fontWeight: "500",
                opacity: 0.6,
              }}
            >
              Description
            </Text>
            <View style={styles.inputView1}>
              <TextInput
                style={{ height: 100, color: "black" }}
                placeholder="description"
                placeholderTextColor="black"
                onChangeText={(txt) => setDescription(txt)}
                value={description}
                numberOfLines={4}
                multiline={true} />
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
            {open ? (
              <ImagePicker
                onSave={handleSave}
                onCancel={handleCancel}
                onSelectAlbum={handleSelectAlbum}
                selected={assets}
                selectedAlbum={album}
                multiple
                limit={5} />
            ) : (
              <TouchableOpacity onPress={() => setOpen(true)}>
                <Text style={styles.button}>Open Image Picker</Text>
              </TouchableOpacity>
            )}
          </View>
        </Modal>
      </ScrollView>

      <View style={{ paddingBottom: 20 }}>
        {Num == 1 ? (
          <TouchableOpacity style={styles.loginBtn1} onPress={() => POSTPROS()}>
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
              }} />
          </TouchableOpacity>
        )}
      </View>
    </View>
    <Alerts visible={visible} onClose={onClose} icon={"car"} title={'Application Submitted'} desc={"The Request For The Car Has Been Sent Successfully!"} /></>

  );
};

export default CarDetails;
const styles = StyleSheet.create({
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
  inputView1: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 8,
    height: 100,
    top: responsiveHeight(25),
    opacity: 0.8,
    paddingLeft: 20,
    paddingRight: 20,
    left: 20,
    marginBottom: 15,
    opacity: 0.7,
    borderWidth: 1,
  },
  loginBtn: {
    width: "88%",
    backgroundColor: "#3D50DF",
    borderRadius: 5,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 50,
    top: responsiveHeight(1.5),

    elevation: 3,
    alignSelf: "center",
  },
  container: {
    flex: 1,
    flexDirection: "column",
  },
  loginBtn1: {
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
