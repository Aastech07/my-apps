import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import Modal from "react-native-modal";
import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";

import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { api } from "../../Api";
import { responsiveWidth } from "react-native-responsive-dimensions";

const ProfileEdits = () => {
  const img =
    "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?size=338&ext=jpg&ga=GA1.1.1700460183.1708646400&semt=ais";

  const profileItems = [
    { icon: "user", text: "Profile", screen: "ProfileScreen" },
    { icon: "file", text: "Update CV", screen: "CV" },
    { icon: "user-graduate", text: "Education", screen: "EducationScreen" },
    { icon: "compass", text: "Directory", screen: "DirectoriesScreen" },
    { icon: "users", text: "Family Tree", screen: "FamilyTreeScreen" },
    { icon: "user-friends", text: "Matrimony", screen: "matrimony" },
  ];

  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);
  const [modalVisible1, setModalVisible1] = useState(false);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [cameraRef, setCameraRef] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [data, setData] = useState(null);
  const [id, setID] = useState(null);
  const [images, setImages] = useState(null);

  const ImageUpload = async () => {
    const formData = new FormData();
    formData.append("url", img);
    try {
      const response = await axios.post(
        `${api}/uploadImage/profiles/${id}`,
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

  useEffect(() => {
    const getData = async () => {
      try {
        const profileId = await AsyncStorage.getItem("profileid");
        setID(profileId);

        if (profileId !== null) {
          const { data } = await axios.get(`${api}/profiles/${profileId}`);
          setData(data.firstName + " " + data.lastName);
          setImages(data.url);
        }
      } catch (e) {
        console.log(e);
      }
    };

    getData();
  }, []);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleCameraPress = () => {
    takePicture(), setModalVisible1(true), toggleModal();
  };

  const handleGalleryPress = () => {
    pickImage();
    toggleModal();
  };

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
        setModalVisible1(!modalVisible1);
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
      ImageUpload();
    }
  };

  const removeimage = () => {
    setSelectedImage("");
    setPhoto("");
    setImages("");
  };

  const toggleCameraType = () => {
    setCameraType(
      cameraType === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };

  const handlePress = (screen) => {
    switch (screen) {
      case "ProfileScreen":
        navigation.navigate("ProfileDetails");
        break;
      case "EducationScreen":
        navigation.navigate("EducationDetails");
        break;
      case "DirectoriesScreen":
        navigation.navigate("DirectoriesDetails");
        break;
      case "FamilyTreeScreen":
        navigation.navigate("FamilyTreeScreen");
        break;
      case "matrimony":
        navigation.navigate("MatrimonyDetails");
        break;
        case "CV":
          navigation.navigate("CV");
          break;
      default:
        break;
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={{ backgroundColor: "#1B1A55", paddingBottom: 80 }}>
        <View style={{}}>
          <Text style={{ left: 20, top: 10, fontSize: 17, color: "#fff" }}>
            Pro <Text style={{ color: "tomato" }}>file..</Text>
          </Text>
          <TouchableOpacity onPress={() => toggleModal()}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                style={{
                  width: 60,
                  height: 60,
                  top: 40,
                  left: 30,
                  borderRadius: 50,
                }}
                source={{
                  uri:
                    (photo && photo) ||
                    (selectedImage && selectedImage) ||
                    images ||
                    img,
                }}
              />
              <FontAwesome5Icon
                name="edit"
                size={13}
                color="tomato"
                style={{
                  marginLeft: -27,
                  top: 65,
                  backgroundColor: "#fff",
                  padding: 4,
                  borderRadius: 30,
                  shadowColor: "#000",
                  shadowOpacity: 0.5,
                  shadowRadius: 10,
                  elevation: 10,
                }}
              />
            </View>
          </TouchableOpacity>
          <View
            style={{ position: "absolute", top: 140, left: responsiveWidth(6) }}
          >
            <Text
              onPress={() => removeimage()}
              style={{ fontWeight: "300", color: "#fff" }}
            >
              Remove <Text style={{ color: "tomato" }}>Image..</Text>
            </Text>
          </View>
          <Text
            style={{
              left: 100,
              top: 1,
              fontSize: 17,
              fontWeight: "500",
              color: "#fff",
            }}
          >
            {data}
          </Text>
        </View>
      </View>

      <View
        style={{
          backgroundColor: "#fff",
          paddingBottom: 20,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          bottom: 10,
        }}
      >
        {profileItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handlePress(item.screen)}
          >
            <View
              style={{
                borderWidth: 1,
                padding: 15,
                marginHorizontal: 10,
                borderRadius: 10,
                marginTop: 10,
                opacity: 0.7,
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <FontAwesome5Icon
                  name={item.icon}
                  size={20}
                  style={{ opacity: 0.8 }}
                />
                <FontAwesome5Icon
                  name={"angle-right"}
                  size={20}
                  style={{ position: "absolute", left: responsiveWidth(84) }}
                />
                <Text style={{ marginLeft: 10 }}>{item.text}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.container}>
        <Modal
          isVisible={isModalVisible}
          onBackdropPress={toggleModal}
          style={styles.modal}
        >
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.option} onPress={handleCameraPress}>
              <Icon name="camera" size={20} color="#3498db" />
              <Text style={styles.optionText}>Add Image</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.option}
              onPress={handleGalleryPress}
            >
              <Icon name="image" size={20} color="#27ae60" />
              <Text style={styles.optionText}>Open Gallery</Text>
            </TouchableOpacity>
          </View>
        </Modal>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible1}
          onRequestClose={() => setModalVisible1(!modalVisible1)}
        >
          <View style={{ flex: 1, right: 50 }}>
            <View style={styles.container1}>
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
      </View>
    </View>
  );
};

export default ProfileEdits;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  openButton: {
    backgroundColor: "#3498db",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginBottom: 20,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalContent: {
    backgroundColor: "white",
    padding: 22,
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    width: "100%",
  },
  optionText: {
    marginLeft: 20,
    fontSize: 17,
    color: "#333",
  },
  container1: {
    flex: 1,
    flexDirection: "column",
    width: 400,
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
});
