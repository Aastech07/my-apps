import React, { useState, useEffect, useContext } from "react";
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Image,
  Pressable,
  TextInput,
} from "react-native";
import {
  responsiveWidth,
  responsiveFontSize,
  responsiveHeight,
} from "react-native-responsive-dimensions";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import { useNavigation } from "@react-navigation/native";
import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import { SelectList } from "react-native-dropdown-select-list";
import DateTimePicker from "react-native-ui-datepicker";
import dayjs from "dayjs";
import axios from "axios";
import { MyContext } from "../../App";
import {api} from '../Api' 

const Announcement = () => {
  const id = useContext(MyContext);
  const naviation= useNavigation()

  const [modalVisible, setModalVisible] = useState(false);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [cameraRef, setCameraRef] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [completionYear, setCompletionYear] = useState(
    dayjs().format("YYYY-MM-DD")
  );
  const [modalVisible1, setModalVisible1] = useState("");
  const [category, setCategory] = useState("");
  const [value, onChangeText] = React.useState("");

  const img =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyrHPk8PA3LcbnSqnikNs8A2AKJvvWIHgr9w&s";

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasPermission(cameraStatus.status === "granted");
    })();
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

  const Category = [
    { key: "1", value: "Birthday party" },
    { key: "2", value: "wedding party" },
    { key: "3", value: "death" },
    { key: "4", value: "anniversary" },
  ];

  function extractDate(dateString) {
    const dateObject = new Date(dateString);
    
    // Extract the date components
    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(dateObject.getDate()).padStart(2, '0');
  
    // Form the date string in YYYY-MM-DD format
    const formattedDate = `${year}-${month}-${day}`;
  
    return formattedDate;
  }`  `
  const handleDateChange = (event) => {
    if (event !== undefined) {
      setModalVisible1(!modalVisible1)
      setCompletionYear(extractDate(event));
    }
  };

  const PostAnn = async () => {
    if(category==""||value==""|| completionYear==""){
      return alert('Please enter all the Details')
    }
    try {
      const res = await axios.post(`${api}/announcements`, {
        profileId: id,
        announcementType:category,
        description:value,
        date:completionYear
      });
      // setProfileID(res.data._id);
      naviation.navigate('HomeScreen')
    } catch (error) {
      console.log(error)
      console.error("Error during login:", error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={{ flex: 1, backgroundColor: "#fff" }}
        contentContainerStyle={{ paddingBottom: 150 }}
      >
        <View style={{ top: 30, alignItems: "center" }}>
          <Text style={{ fontSize: responsiveFontSize(3), fontWeight: "400" }}>
            Add{" "}
            <Text style={{ fontWeight: "300", color: "tomato" }}>
              Announcement
            </Text>
          </Text>
        </View>

        <View style={{ bottom: responsiveHeight(12) }}>
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
            Category
          </Text>
          <View style={{ top: responsiveHeight(25), marginBottom: 13 }}>
            <SelectList
              setSelected={(val) => setCategory(val)}
              data={Category}
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

        <View style={{ bottom: responsiveHeight(18) }}>
          <Text
            style={{
              top: responsiveHeight(24),

              left: 23,
              fontSize: 15,
              fontWeight: "500",
              opacity: 0.6,
            }}
          >
            Date:
          </Text>
          <View style={styles.inputView}>
            <TouchableOpacity onPress={() => setModalVisible1(!modalVisible1)}>
              <Text style={{ top: 15, opacity: 0.7 }}>{completionYear}</Text>
            </TouchableOpacity>
          </View>

          <View >
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
                      value={completionYear}
                      mode="date"
                      display="default"
                      onValueChange={handleDateChange}
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

        <Text
          style={{
            top: 50,
            left: 23,
            fontSize: 15,
            fontWeight: "500",
            opacity: 0.6,
          }}
        >
          Description:
        </Text>

        <View
          style={{
            backgroundColor: value,
            borderBottomColor: "#000",
            marginHorizontal: 20,
            top: 60,
            borderWidth: 1,
            borderRadius: 8,
            opacity: 0.5,
          }}
        >
          <TextInput
            editable
            multiline
            numberOfLines={4}
            maxLength={40}
            onChangeText={(text) => onChangeText(text)}
            value={value}
            style={{ padding: 10 }}
          />
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
                  <FontAwesome5Icon name="camera" size={20} color={"tomato"} />
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

        <View style={{ bottom: 95 }}>
          <TouchableOpacity style={styles.loginBtn} onPress={() => {PostAnn()}}>
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
      </ScrollView>
    </View>
  );
};

export default Announcement;

const styles = StyleSheet.create({
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
});
