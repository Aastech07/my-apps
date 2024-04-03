import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Button,
  FlatList,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { api } from "./Api";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ContactUsScreen = () => {
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [animation] = useState(new Animated.Value(0));
  const [contact, setContact] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const profileId = await AsyncStorage.getItem("profileid");
      try {
        const { data } = await axios.get(`${api}/profiles/${profileId}`);
        const contact = await axios.get(`${api}/ContactUs/`);
        const filteredContact = contact.data.filter((element) => {
          return element.profileId._id === profileId;
        });
        setContact(filteredContact);
        setName(data.firstName + " " + data.lastName);
        setEmail(data?.email);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async () => {
    try {
      // Submit the form data to the backend
      const userId = await AsyncStorage.getItem("UserID");
      const profileId = await AsyncStorage.getItem("profileid");
      const formData = { subject, description, userId, profileId };
      const { data } = await axios.post(`${api}/ContactUs`, formData);
      // Optionally, clear the form fields after submission
      setSubject("");
      setDescription("");
      setIsSubmitted(true);

      // Simple animation when the form is submitted
      if (data._id) {
        Animated.timing(animation, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }).start();
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  const translateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [200, 0],
  });

  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>Contact Us</Text> */}
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Subject"
          value={subject}
          onChangeText={setSubject}
          placeholderTextColor="#ccc"
        />
        <TextInput
          style={[styles.input, styles.messageInput]}
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
          placeholderTextColor="#ccc"
          multiline
          numberOfLines={4}
        />
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
      <View>
        <FlatList
          // showsHorizontalScrollIndicator={false}
          data={contact}
          renderItem={({ item }) => (
            <View
              style={{
                marginBottom: 10,
                borderBottomWidth: 2,
                borderBottomColor: "lightgray",
                padding: 10,
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: 350,
                  marginBottom: 5,
                }}
              >
                <Text style={{ fontSize: 17 }}>{item.subject}</Text>
                <Text>{item.status}</Text>
              </View>
              <Text>Message: {item.description}</Text>
            </View>
          )}
        />
      </View>
      {isSubmitted && (
        <Animated.View
          style={[styles.successMessage, { transform: [{ translateY }] }]}
        >
          <AntDesign name="checkcircle" size={24} color="green" />
          <Text style={styles.successText}>
            Message Submitted Successfully!
          </Text>
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "#ffff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#000",
  },
  form: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // elevation: 5,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    color: "#333",
  },
  messageInput: {
    height: 100,
    textAlignVertical: "top",
  },
  button: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  successMessage: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0, 255, 0, 0.2)",
    padding: 10,
    borderRadius: 5,
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
  },
  successText: {
    marginLeft: 10,
    color: "green",
    fontWeight: "bold",
  },
});

export default ContactUsScreen;
