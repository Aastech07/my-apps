import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  Modal,
  Switch,
  StyleSheet,
  Platform,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import api from "./Api";
import { responsiveWidth } from "react-native-responsive-dimensions";
const Settings = () => {
  const [languageModalVisible, setLanguageModalVisible] = useState(false);
  const [notificationModalVisible, setNotificationModalVisible] =
    useState(false);
  const [notificationSettings, setNotificationSettings] = useState({
    Job: true,
    Property: true,
    Buy_Sell: true,
    Blog: true,
    Announcement: true,
    Event: true,
  });

  const toggleLanguageModal = () => {
    setLanguageModalVisible(!languageModalVisible);
  };

  const toggleNotificationModal = () => {
    setNotificationModalVisible(!notificationModalVisible);
  };

  const handleNotificationToggle = (key) => {
    setNotificationSettings({
      ...notificationSettings,
      [key]: !notificationSettings[key],
    });
  };

  useEffect(() => {
    const fetch = async () => {
      const userId = await AsyncStorage.getItem("userID");
      const { data } = await axios.get(`${api}/${userId}`);
      setNotificationSettings(data.notification);
    };
    fetch();
  }, []);
  const submitHandler = async () => {
    toggleNotificationModal();
    console.log({ notificationSettings });
    try {
      const userId = await AsyncStorage.getItem("userID");
      const { data } = await axios.put(`${api}/findById/${userId}`);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity
        onPress={toggleLanguageModal}
        style={styles.settingItem}
      >
        <Text style={styles.settingText}>Language</Text>
        <FontAwesome5 name="chevron-right" size={18} />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={toggleNotificationModal}
        style={styles.settingItem}
      >
        <Text style={styles.settingText}>Notification</Text>
        <FontAwesome5 name="chevron-right" size={18} />
      </TouchableOpacity>

      {/* Language Modal */}
      <Modal
        visible={languageModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={toggleLanguageModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Language</Text>
            <TouchableOpacity
              onPress={toggleLanguageModal}
              style={styles.button}
            >
              <Text>English</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={toggleLanguageModal}
              style={styles.button}
            >
              <Text>Gujrati</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Notification Modal */}
      <Modal
        visible={notificationModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={toggleNotificationModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.flexSB}>
              <Text style={styles.modalTitle}>Notification Settings</Text>
              <FontAwesome5
                name="times"
                size={20}
                onPress={toggleNotificationModal}
              />
            </View>
            <View style={styles.switchContainer}>
              <Switch
                value={notificationSettings.Job}
                onValueChange={() => handleNotificationToggle("Job")}
              />
              <Text>Job</Text>
            </View>
            <View style={styles.switchContainer}>
              <Switch
                value={notificationSettings.Blog}
                onValueChange={() => handleNotificationToggle("Blog")}
              />
              <Text>Blog</Text>
            </View>
            <View style={styles.switchContainer}>
              <Switch
                value={notificationSettings.Event}
                onValueChange={() => handleNotificationToggle("Event")}
              />
              <Text>Event</Text>
            </View>
            <View style={styles.switchContainer}>
              <Switch
                value={notificationSettings.Buy_Sell}
                onValueChange={() => handleNotificationToggle("Buy_Sell")}
              />
              <Text>Buy and sell</Text>
            </View>
            <View style={styles.switchContainer}>
              <Switch
                value={notificationSettings.Announcement}
                onValueChange={() => handleNotificationToggle("Announcement")}
              />
              <Text>Announcement</Text>
            </View>
            <TouchableOpacity onPress={submitHandler} style={styles.update}>
              <Text style={styles.updateText}>Update</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  settingText: {
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: "center",
  },
  languageOption: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  languageText: {
    fontSize: 18,
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  notificationLabel: {
    marginLeft: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: "white", // light white
    marginBottom: 4, // .4 rem
    borderRadius: 5,
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: "lightgray",
  },
  update: {
    backgroundColor: "#007AFF", // Blue color, you can change it as per your design
    borderRadius: 5,
    paddingVertical: 12,
    width: responsiveWidth(70),
    paddingHorizontal: 20,
    alignSelf: "center",
    marginTop: 20,
  },
  updateText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  flexSB: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center", // Optional: Align items in the cross axis
  },
});
