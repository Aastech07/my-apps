import React, { useState, useEffect } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  Modal,
  Alert,
} from "react-native";
import Animated, {
  FadeInLeft
} from "react-native-reanimated";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import Materials from "react-native-vector-icons/MaterialCommunityIcons";
import { SelectList } from "react-native-dropdown-select-list";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import { useNavigation,useRoute } from "@react-navigation/native";
import axios from "axios";
import { api } from "../Api";
const FamilyTree = () => {
  const Api = api;
  const datas = useRoute();
  const ids = datas.params.data;
  console.warn(ids)
  
  
  const [filteredData, setFilteredData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [fullname, setFullName] = useState("");
  const [relationship, setRelationship] = useState("");
  const [show, setShow] = useState(false);
  const [listData, setListData] = useState([]);
  const [cameraRef, setCameraRef] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [searchmember, setSearchMember] = useState(false);
  const [id, setID] = useState("");
  const [data, setData] = useState([]);
  const navigation = useNavigation();

  const showlist = () => {
    setShow(!show);
  };

  const Relationship = [
    { key: "1", value: "Father" },
    { key: "2", value: "Mother" },
    { key: "3", value: "Son" },
    { key: "4", value: "Daughter" },
    { key: "5", value: "Grandfather" },
    { key: "7", value: "Grandmother" },
    { key: "8", value: "Uncle" },
    { key: "9", value: "Aunt" },
    { key: "10", value: "Brother" },
    { key: "11", value: "Cousin" },
    { key: "12", value: "Nephew" },
    { key: "13", value: "Niece" },
    { key: "14", value: "Husband" },
    { key: "15", value: "Wife" },
    { key: "16", value: "Partner" },
    { key: "17", value: "Fiance" },
    { key: "18", value: "Fiancee" },
    { key: "19", value: "Ex-Spouse" },
    { key: "20", value: "In-law" },
    { key: "21", value: "Guardian" },
    { key: "22", value: "Godfather" },
    { key: "23", value: "Godmother" },
  ];

  useEffect(() => {
    loadListData();
    FetchUser();
  }, []);

  const FetchUser = async () => {
    try {
      const { data } = await axios.get(`${Api}/profiles`, {});
      setData(data);
    } catch (error) {
      console.error("Error during login:", error.message);
    }
  };

  const MemberPost = async () => {
  
    try {
      const { data } = await axios.post(`${Api}/members`, {
        profileId: id,
        userId:ids,
        fullname: fullname,
        Relationship: relationship,
      });
      console.warn(data);
    } catch (error) {
      console.log("Error during login:", error.message);
    }
  };

  useEffect(() => {
    const filterData = () => {
      const filtered = data.filter((item) =>
        item.firstName.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredData(filtered);
    };

    filterData();
  }, [searchText, data]);

  const validate = () => {
    if (!fullname || !relationship) {
      Alert.alert(
        "Incomplete Information",
        "Please fill in all the required fields before proceeding."
      );
    } else {
      
    }
  };

  useEffect(() => {}, [fullname]);

  const loadListData = async () => {
    try {
      const storedListData = await AsyncStorage.getItem("listData");
      if (storedListData) {
        setListData(JSON.parse(storedListData));
      }
    } catch (error) {
      console.error("Error loading list data:", error);
    }
  };

  const saveListData = async (newListData) => {
    try {
      await AsyncStorage.setItem("listData", JSON.stringify(newListData));
    } catch (error) {
      console.error("Error saving list data:", error);
    }
  };

  const addItemToList = async () => {
    if (fullname.trim() === "") {
      return; 
    }

    const newFamilyMember = { fullname, relationship };
    const newListData = [...listData, newFamilyMember];
    setListData(newListData);

    setFullName("");
    setRelationship("");

    await saveListData(newListData);
  };

  const removeItemFromList = async (index) => {
    const newListData = [...listData];
    newListData.splice(index, 1);
    setListData(newListData);
    await saveListData(newListData);
  };

  const img ="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?size=338&ext=jpg&ga=GA1.1.632798143.1705622400&semt=ais";

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
        console.error("Error taking picture:", error);
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

  const handeldata = (name, id) => {
    setFullName(name);
    setID(id);
  };

  const renderItem = ({ item }) => {
    return (
      <View style={{ flex: 1 }}>
        <TouchableOpacity
          onPress={() =>
            setSearchMember(!searchmember) +
            handeldata(item.firstName, item._id)
          }
        >
          <View style={{ padding: 10 }}>
            <Text style={{ position: "absolute", left: 100, top: 30 }}>
              {item.firstName}
            </Text>
            <Image
              style={{
                height: 50,
                width: 50,
                top: 8,
                left: 20,
                borderRadius: 50,
              }}
              source={{ uri: item.url }}
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 300 }}
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
            <TouchableOpacity onPress={() => navigation.goBack()}>
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

        <Animated.View
          style={{ flex: 1, top: 110 }}
          entering={FadeInLeft.duration(500).damping()}
        >
          <Text style={{ left: 20, fontSize: 25, fontWeight: "300" }}>
            Create{" "}
            <Text style={{ color: "tomato", fontWeight: "500" }}>
              FamilyTree...
            </Text>
          </Text>

          <TouchableOpacity onPress={() => showlist()}>
            <Materials
              name="plus"
              size={25}
              style={{
                position: "absolute",
                left: 300,
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 50,
                },
                shadowOpacity: 0.8,
                shadowRadius: 16.0,
                elevation: 3,
                backgroundColor: "#f2f2f2",
                padding: 4,
                borderRadius: 50,
                bottom: -4,
              }}
              color={"tomato"}
            />
          </TouchableOpacity>
        </Animated.View>

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
              uri: (photo && photo) || (selectedImage && selectedImage) || img,
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

        <View style={{ bottom: 30 }}>
          <View style={{}}>
            <Text
              style={{
                top: responsiveHeight(25),
                left: 20,
                fontSize: 15,
                fontWeight: "500",
                opacity: 0.6,
              }}
              entering={FadeInLeft.duration(500).damping()}
            >
              Add FamilyTree
            </Text>
            <View
              style={{
                top: responsiveHeight(26),
                backgroundColor: "#fff",
                borderWidth: 1,
                padding: 20,
                marginHorizontal: 15,
                borderRadius: 5,
              }}
            >
              <FlatList
                data={listData}
                scrollEnabled={false}
                renderItem={({ item, index }) => (
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginVertical: 10,
                    }}
                  >
                    <Text
                      style={{
                        marginHorizontal: 80,
                        backgroundColor: "#f2f2f2",
                        flex: 1,
                        borderRadius: 5,
                        paddingLeft: 20,
                        fontSize: 15,
                        right: 60,
                        shadowColor: "#000",
                        shadowOpacity: 0.6,
                        shadowRadius: 20,
                        elevation: 3,
                      }}
                    >
                      {item.fullname}
                    </Text>

                    <Text
                      style={{
                        backgroundColor: "#f2f2f2",

                        flex: 1,
                        borderRadius: 5,
                        right: 90,
                        marginHorizontal: -10,
                        paddingLeft: 10,
                        fontSize: 16,
                        fontWeight: "300",
                        shadowColor: "#000",

                        shadowOpacity: 0.6,
                        shadowRadius: 20,
                        elevation: 3,
                      }}
                    >
                      {item.relationship}
                    </Text>

                    <FontAwesome5Icon
                      name="times"
                      size={16}
                      color="red"
                      style={{
                        marginLeft: responsiveWidth(73),
                        position: "absolute",
                      }}
                      onPress={() => removeItemFromList(index)}
                    />
                  </View>
                )}
                keyExtractor={(item, index) => index.toString()}
                style={{ marginTop: 5 }}
              />
            </View>

            {show ? (
              <View style={{ marginTop: responsiveHeight(5) }}>
                <View style={{ bottom: 10 }}>
                  <Text
                    style={{
                      top: responsiveHeight(24),
                      left: 23,
                      fontSize: 15,
                      fontWeight: "500",
                      opacity: 0.6,
                    }}
                  >
                    Add Member
                  </Text>
                  <View style={styles.inputView}>
                    <TextInput
                      style={styles.inputText}
                      placeholder="Add Member"
                      placeholderTextColor="black"
                      onChangeText={(txt) => setFullName(txt)}
                      value={fullname}
                    />
                    <FontAwesome5Icon
                      name="users"
                      size={16}
                      style={{
                        position: "absolute",
                        left: 7,
                        top: responsiveHeight(2.5),
                        opacity: 0.6,
                      }}
                      color={"#000"}
                    />
                  </View>
                </View>

                <View style={styles.inputView}>
                  <TouchableOpacity
                    onPress={() => setSearchMember(!searchmember)}
                  >
                    {fullname ? (
                      <Text
                        style={{
                          top: responsiveHeight(2),
                          opacity: 0.7,
                          left: 10,
                        }}
                      >
                        {fullname}
                      </Text>
                    ) : (
                      <Text
                        style={{
                          top: responsiveHeight(2),
                          opacity: 0.7,
                          left: 10,
                        }}
                      >
                        Search Member
                      </Text>
                    )}

                    <FontAwesome5Icon
                      name="search"
                      size={16}
                      style={{
                        position: "absolute",
                        top: 16,
                        opacity: 0.7,
                        right: responsiveWidth(76),
                      }}
                      color={"#000"}
                    />
                  </TouchableOpacity>
                </View>

                <View style={{ marginTop: 15 }}>
                  <View style={{ top: responsiveHeight(24.5) }}>
                    <Text
                      style={{
                        top: responsiveHeight(-1),
                        left: 23,
                        fontSize: 15,
                        fontWeight: "500",
                        opacity: 0.6,
                      }}
                    >
                      Select Relationship
                    </Text>

                    <SelectList
                      setSelected={(val) => setRelationship(val)}
                      data={Relationship}
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
            ) : null}

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
                      <FontAwesome5Icon
                        name="camera"
                        size={20}
                        color={"tomato"}
                      />
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

            <Modal
              animationType="slide"
              transparent={true}
              visible={searchmember}
              onRequestClose={() => setSearchMember(!searchmember)}
            >
              <View style={{ flex: 1, backgroundColor: "#fff" }}>
                <View style={{ flex: 1 }}>
                  <View style={styles.inputView1}>
                    <TextInput
                      style={styles.inputText}
                      placeholder="Search..."
                      placeholderTextColor="black"
                      edile={true}
                      onChangeText={(txt) => setSearchText(txt)}
                      value={searchText}
                    />
                    <FontAwesome5Icon
                      name="search"
                      size={19}
                      style={{
                        position: "absolute",

                        opacity: 0.4,
                        right: responsiveWidth(80),
                      }}
                      color={"#000"}
                    />
                  </View>

                  <View style={{ top: 30, marginBottom: 120 }}>
                    {searchText.length > 0 ? (
                      <FlatList data={filteredData} renderItem={renderItem} />
                    ) : null}
                  </View>
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
          onPress={() => navigation.navigate("Education",{data:ids})} >

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
          onPress={() => addItemToList() + MemberPost()}
        >
          <Text style={{ color: "tomato", fontSize: 16, fontWeight: "500" }}>
            Save
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FamilyTree;
const styles = StyleSheet.create({
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
  inputView1: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 8,
    height: 50,

    top: responsiveHeight(35),
    opacity: 0.8,
    paddingLeft: 10,
    paddingRight: 20,

    left: 20,
    marginBottom: 15,
    opacity: 0.7,

    shadowColor: "#000",
    shadowOffset: 0.6,

    shadowOpacity: 0.8,
    shadowRadius: 16.0,
    elevation: 3,
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
  inputView1: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 10,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20,
    top: responsiveHeight(2),
    alignSelf: "center",
    shadowColor: "#984065",
    shadowOffset: {
      width: 0,
      height: 50,
    },
    shadowOpacity: 0.8,
    shadowRadius: 16.0,
    elevation: 5,
    paddingLeft: 50,
  },

  inputText: {
    height: 50,
    color: "black",
  },
  
});
