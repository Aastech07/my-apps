import React, { useState, useEffect } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { responsiveWidth } from "react-native-responsive-dimensions";
import { SelectList } from "react-native-dropdown-select-list";
import { responsiveHeight } from "react-native-responsive-dimensions";
import FontAwsome5 from "react-native-vector-icons/FontAwesome5";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "../Api";
const Postjobs = () => {
  const data = [
    { key: "1", value: "Any Experience" },
    { key: "2", value: "Fresher" },
    { key: "3", value: "0-1 Year" },
    { key: "4", value: "1-3 Years" },
    { key: "5", value: "3-5 Years" },
    { key: "6", value: "3-10 Years" },
    { key: "7", value: "10+ Years" },
  ];

  const data1 = [
    { key: "1", value: "Doctorate" },
    { key: "2", value: "Post-Graducation" },
    { key: "3", value: "Graducation/Diploma" },
    { key: "4", value: "Higher Secondary" },
    { key: "5", value: "School" },
  ];

  const data2 = [
    { key: "1", value: "Rs 1 LPA TO 2 LPA" },
    { key: "2", value: "Rs 2 LPA TO 3 LPA" },
    { key: "3", value: "Rs 3 LPA TO 4 LPA" },
    { key: "4", value: "Rs 4 LPA TO 5 LPA" },
    { key: "5", value: "Rs 6 LPA TO 7 LPA" },
    { key: "6", value: "Rs 7 LPA TO 8 LPA" },
    { key: "7", value: "Rs 8 LPA TO 9 LPA" },
    { key: "8", value: "Rs 9 LPA TO 10 LPA" },
    { key: "9", value: "Rs 10 LPA TO 11 LPA" },
    { key: "10", value: "Rs 11 LPA TO 12 LPA" },
    { key: "11", value: "Rs 12 LPA TO 13 LPA" },
    { key: "12", value: "Rs 13 LPA TO 14 LPA" },
    { key: "13", value: "Rs 14 LPA TO 15 LPA" },
    { key: "14", value: "Rs 15 LPA TO 16 LPA" },
    { key: "15", value: "Rs 16 LPA TO 17 LPA" },
    { key: "16", value: "Rs 17 LPA TO 18 LPA" },
    { key: "17", value: "Rs 18 LPA TO 19 LPA" },
    { key: "18", value: "Rs 19 LPA TO 20 LPA" },
    { key: "19", value: "Rs 20 LPA TO 21 LPA" },
    { key: "20", value: "Rs 21 LPA TO 22 LPA" },
    { key: "21", value: "Rs 22 LPA TO 23 LPA" },
    { key: "22", value: "Rs 23 LPA TO 24 LPA" },
    { key: "12", value: "Rs 24 LPA TO 25 LPA" },
    { key: "13", value: "Rs 25 LPA TO 26 LPA" },
    { key: "14", value: "Rs 26 LPA TO 27 LPA" },
    { key: "15", value: "Rs 27 LPA TO 28 LPA" },
    { key: "16", value: "Rs 28 LPA TO 29 LPA" },
    { key: "17", value: "Rs 29 LPA TO 30 LPA+" },
  ];

  const data3 = [
    { key: "1", value: "Full Time" },
    { key: "2", value: "Internship" },
    { key: "3", value: "Contract" },
  ];

  const data4 = [
    { key: "1", value: "Doctorate" },
    { key: "2", value: "Post-Graducation" },
    { key: "3", value: "Graducation/Diploma" },
    { key: "4", value: "Higher Secondary" },
    { key: "5", value: "School" },
  ];

  const [experience, setExperience] = useState("");
  const [education, setEducation] = useState("");
  const [salary, setSalary] = useState("");
  const [type, setType] = useState("");
  const [title, setJobTitle] = useState("");
  const [description, setDescription] = useState("");
  const [skill, setSkills] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [userid, setUserID] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [responsibilities, setResponsibilities] = useState("");
  const [qualifications, setQualifications] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem("UserID");
        if (value !== null) {
          setUserID(value);
          console.warn(value)
        }
      } catch (e) {
        console.log(e);
      }
    };
    getData();
  }, []);

  const POSTPRO = async () => {
    try {
      console.log(userid)
      const profileId= await AsyncStorage.getItem('profileid')
      const { data } = await axios.post(`${api}/jobs`, {
        userId: userid,
        profileId,
        salary: salary,
        title: title,
        contactEmail: email,
        company: company,
        location: addressLine1,
        description: description,
        employmentType: type,
        experienceLevel: experience,
        educationLevel: education,
        skills: skill,
        applicationDeadline: 20 - 20 - 2024,
        responsibilities: responsibilities,
        qualifications: qualifications,
      });
      console.warn(data);
    } catch (error) {
      console.log("Error during add job:", error.message);
    }
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#fff" }}
      contentContainerStyle={{ paddingBottom: 440, bottom: 60 }}
      keyboardShouldPersistTaps="handled"
    >
      <View style={{ flex: 1 }}>
        <View style={{}}>
          <Text
            style={{
              color: "#000",
              top: 85,
              left: 30,
              fontSize: 25,
              fontWeight: "500",
            }}
          >
            Post a {type} Job
          </Text>
          <Text
            style={{
              top: 95,
              left: responsiveWidth(15),
              fontSize: 15,
              fontWeight: "500",
              opacity: 0.6,
            }}
          >
            Switch Job Type
          </Text>
          <Text
            style={{
              top: 120,
              left: responsiveWidth(8),
              fontSize: 23,
              position: "absolute",
              opacity: 0.6,
            }}
          >
            ⇋
          </Text>
        </View>

        <View style={{ top: 100, marginBottom: 20 }}>
          <SelectList
            setSelected={(val) => setType(val)}
            data={data3}
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

        <View style={{ top: 100, left: 30, marginBottom: 40 }}>
          <Text style={{ fontSize: 16, opacity: 0.8 }}>Company</Text>
          <TextInput
            style={{
              ///qualifications
              borderBottomWidth: 1,
              top: 10,
              marginRight: 60,
              opacity: 0.6,
            }}
            placeholder="Please fill in Company"
            onChangeText={(text) => setCompany(text)}
            value={company}
          />
        </View>

        <View style={{ top: 100, left: 30 }}>
          <Text style={{ fontSize: 16, opacity: 0.8 }}>Job Title</Text>
          <TextInput
            style={{
              borderBottomWidth: 1,
              top: 10,
              marginRight: 60,
              opacity: 0.6,
            }}
            placeholder="Please fill in Job Title"
            onChangeText={(text) => setJobTitle(text)}
            value={title}
          />
        </View>

        <View style={{ top: 150, left: 30 }}>
          <Text style={{ fontSize: 16, opacity: 0.8 }}>Job Description</Text>
          <TextInput
            style={{
              borderBottomWidth: 1,
              top: 10,
              marginRight: 60,
              opacity: 0.6,
            }}
            placeholder="Describe Key responsibilities, skills..."
            onChangeText={(text) => setDescription(text)}
            value={description}
          />
        </View>

        <View style={{ top: 200, left: 30, marginBottom: 35 }}>
          <Text style={{ fontSize: 16, opacity: 0.8 }}>Skills</Text>
          <TextInput
            style={{
              borderBottomWidth: 1,
              top: 10,
              marginRight: 60,
              opacity: 0.6,
            }}
            placeholder="Describe skills..."
            onChangeText={(text) => setSkills(text)}
            value={skill}
          />
        </View>

        <View style={{ top: 200, left: 30, marginBottom: 35 }}>
          <Text style={{ fontSize: 16, opacity: 0.8 }}>Responsibilities</Text>
          <TextInput
            style={{
              borderBottomWidth: 1,
              top: 10,
              marginRight: 60,
              opacity: 0.6,
            }}
            placeholder="Responsibilities..."
            onChangeText={(text) => setResponsibilities(text)}
            value={responsibilities}
          />
        </View>

        <View style={{ top: 180, marginBottom: 20 }}>
          <Text style={{ fontSize: 16, opacity: 0.8, left: 30, top: 15 }}>
            Qualifications
          </Text>

          <View style={{ top: 20 }}>
            <SelectList
              setSelected={(val) => setQualifications(val)}
              data={data4}
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

        <View style={{ top: 200, left: 30 }}>
          <Text style={{ fontSize: 16, opacity: 0.8 }}>Job Requirements</Text>
          <Text style={{ fontSize: 14, opacity: 0.6, top: 13 }}>
            Experience.
          </Text>
          <View style={{ right: 25, top: 15 }}>
            <SelectList
              setSelected={(val) => setExperience(val)}
              data={data}
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

          <View style={{ top: 10 }}>
            <Text style={{ fontSize: 14, opacity: 0.6, top: 13 }}>
              Education.
            </Text>

            <View style={{ right: 25, top: 15 }}>
              <SelectList
                setSelected={(val) => setEducation(val)}
                data={data1}
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

          <View style={{ top: 20 }}>
            <Text style={{ fontSize: 14, opacity: 0.6, top: 13 }}>Salary.</Text>
            <View style={{ right: 25, top: 15 }}>
              <SelectList
                setSelected={(val) => setSalary(val)}
                data={data2}
                save="key"
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

          <View style={{ top: 65 }}>
            <Text style={{ fontSize: 16, opacity: 0.8 }}>Job Location</Text>
            <Text style={{ fontSize: 12, opacity: 0.6, top: 10 }}>
              Address Line 1.
            </Text>
            <TextInput
              style={{
                borderBottomWidth: 1,
                top: 10,
                marginRight: 60,
                opacity: 0.6,
              }}
              placeholder="Enter Postcode, street or addresss"
              onChangeText={(text) => setAddressLine1(text)}
              value={addressLine1}
            />
          </View>

          <View style={{ top: 90 }}>
            <Text style={{ fontSize: 12, opacity: 0.6, top: 10 }}>Email</Text>
            <TextInput
              style={{
                borderBottomWidth: 1,
                top: 10,
                marginRight: 60,
                opacity: 0.6,
              }}
              placeholder="e.g. xyz@gmail.com"
              onChangeText={(text) => setEmail(text)}
              value={email}
            />
          </View>

          <View style={{ top: 60 }}>
            <TouchableOpacity style={styles.loginBtn} onPress={() => POSTPRO()}>
              <Text style={{ color: "white", fontSize: 18, fontWeight: "500" }}>
                Post
              </Text>
              <FontAwsome5
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
      </View>
    </ScrollView>
  );
};

export default Postjobs;
const styles = StyleSheet.create({
  inputText: {
    height: 50,
    color: "black",
  },
  loginBtn: {
    width: "83%",
    backgroundColor: "#3D50DF",
    borderRadius: 8,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 50,
    top: responsiveHeight(13),
    shadowColor: "#3D50DF",
    shadowOffset: {
      width: 0,
      height: 50,
    },
    shadowOpacity: 0.8,
    shadowRadius: 16.0,
    elevation: 10,
  },
});
