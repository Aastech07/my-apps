import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Button,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Modal,
  FlatList,
} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { api } from "../Api";
import {
  responsiveWidth,
  responsiveHeight,
} from "react-native-responsive-dimensions";
const MemberSearch = () => {
  const [searchText, setSearchText] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [area, setArea] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [data, setData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  const FetchUser = async () => {
    try {
      const { data } = await axios.get(`${api}/profiles`, {});
      setData(data);
    } catch (error) {
      console.log("Error during login:", error.message);
    }
  };

  useEffect(() => {
    FetchUser();
  }, []);

  useEffect(() => {
    const filterData = () => {
      const filtered = data.filter((item) => {
        const firstNameMatch = item.firstName
          ?.toLowerCase()
          ?.includes(firstName.toLowerCase());
        const lastNameMatch = item.lastName
          ?.toLowerCase()
          ?.includes(lastName.toLowerCase());

        return firstNameMatch && lastNameMatch;
      });
      setFilteredData(filtered);
    };
    filterData();
  }, [firstName, lastName, data]);

  const handleSearch = () => {
    Keyboard.dismiss();
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <TouchableOpacity
        onPress={() => navigation.navigate("MemberProfile", { data: item })}
      >
        <Text style={styles.itemText}>{item.firstName}</Text>
        <Image style={styles.itemImage} source={{ uri: item.url }} />
      </TouchableOpacity>
    </View>
  );

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ paddingBottom: 200, backgroundColor: "#fff" }}
    >
      <View style={styles.container}>
        <Text style={{ fontSize: 20, top: 50, textAlign: "center" }}>
          Member{" "}
          <Text style={{ color: "tomato", fontWeight: "200" }}>Search..</Text>{" "}
        </Text>
        <View></View>

        <View style={{ top: 80 }}>
          <View style={styles.inputView1}>
            <TextInput
              style={styles.inputText}
              placeholder="First Name"
              onChangeText={(text) => setFirstName(text)}
              value={firstName}
            />
          </View>
          <View style={styles.inputView1}>
            <TextInput
              style={styles.inputText}
              placeholder="Last Name"
              onChangeText={(text) => setLastName(text)}
              value={lastName}
            />
          </View>
          <View style={styles.inputView1}>
            <TextInput
              style={styles.inputText}
              placeholder="Father's Name"
              onChangeText={(text) => setFatherName(text)}
              value={fatherName}
            />
          </View>
          <View style={styles.inputView1}>
            <TextInput
              style={styles.inputText}
              placeholder="Phone Number"
              onChangeText={(text) => setPhoneNumber(text)}
              value={phoneNumber}
              keyboardType="phone-pad"
            />
          </View>
          <View style={styles.inputView1}>
            <TextInput
              style={styles.inputText}
              placeholder="Area"
              onChangeText={(text) => setArea(text)}
              value={area}
            />
          </View>
        </View>
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalView}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
              <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>
            <FlatList data={filteredData} renderItem={renderItem} />
          </View>
        </View>
      </Modal>
      
    </ScrollView>
  );
};

export default MemberSearch;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputView1: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 8,
    height: 50,

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

  searchButton: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    marginTop: 100,
    height: 45,
    width: "80%",
    alignSelf: "center",
  },
  searchButtonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    top: 4,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  itemText: {
    flex: 1,
    marginLeft: 70,
    top: 33,
  },
  itemImage: {
    height: 50,
    width: 50,
    borderRadius: 25,
  },
  modalView: {
    flex: 1,
    marginTop: 22,
    backgroundColor: "#fff",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 35,
  },
  closeButton: {
    position: "absolute",

    right: 15,
    backgroundColor: "transparent",
    padding: 5,
  },
  closeButtonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
  },
});
