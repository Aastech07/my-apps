import React from "react";
import {
  ScrollView,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";

const JobsDetails = () => {
  const navigation = useNavigation();
  const Data = useRoute();
  const Value = Data.params.data;
  const { width } = Dimensions.get("window");
  const dates = (originalDate) => {
    const date = new Date(originalDate);
    const options = { year: "numeric", month: "short", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  return (
    <>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>{Value.title}</Text>
        <View style={styles.skillContainer}>
          {Value.skills.slice(0, 3).map((skill, index) => (
            <Text key={index} style={styles.skillTag}>
              {skill}
            </Text>
          ))}
        </View>

        <View style={styles.separator}></View>

        <View style={styles.infoContainer}>
          <Text style={styles.infoHeading}>Company:</Text>
          <Text style={styles.infoText}>{Value.company}</Text>
          <View style={styles.separator}></View>
          <Text style={styles.infoHeading}>Contact Email:</Text>
          <Text style={styles.infoText}>{Value.contactEmail}</Text>
          <View style={styles.separator}></View>
          <Text style={styles.infoHeading}>Description:</Text>
          <Text style={styles.infoText}>{Value.description}</Text>
          <View style={styles.separator}></View>
          <Text style={styles.infoHeading}>Responsibilities:</Text>
          {Value.responsibilities.map((resp, index) => (
            <Text key={index} style={styles.infoText}>
              {resp}
            </Text>
          ))}
          <View style={styles.separator}></View>

          <Text style={styles.infoHeading}>Qualifications:</Text>
          {Value.qualifications.map((qual, index) => (
            <Text key={index} style={styles.infoText}>
              {qual}
            </Text>
          ))}
          <View style={styles.separator}></View>

          <Text style={styles.infoHeading}>Education Level:</Text>
          <Text style={styles.infoText}>{Value.educationLevel}</Text>
          <View style={styles.separator}></View>

          <Text style={styles.infoHeading}>Experience Level:</Text>
          <Text style={styles.infoText}>{Value.experienceLevel}</Text>
          <View style={styles.separator}></View>

          <Text style={styles.infoHeading}>Employment Type:</Text>
          <Text style={styles.infoText}>{Value.employmentType}</Text>
          <View style={styles.separator}></View>

          <Text style={styles.infoHeading}>Location:</Text>
          <Text style={styles.infoText}>{Value.location}</Text>
          <View style={styles.separator}></View>

          <Text style={styles.infoHeading}>Application Deadline:</Text>
          <Text style={styles.infoText}>
            {dates(Value.applicationDeadline)}
          </Text>
          <View style={styles.separator}></View>
        </View>
      </ScrollView>
      <View style={styles.bottomButtonContainer}>
        <TouchableOpacity style={[styles.button, { paddingHorizontal: 25 }]}>
          <FontAwesome5Icon
            name="handshake"
            size={20}
            color="white"
            style={styles.icon}
          />
          <Text style={[styles.buttonText, { color: "#fff" }]}>Applying</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            {
              backgroundColor: "white",
              borderColor: "tomato",
              left: 15,
              paddingHorizontal: 40,
            },
          ]}
        >
          <FontAwesome5Icon
            name="comments"
            size={20}
            color="tomato"
            style={styles.icon}
          />
          <Text style={[styles.buttonText, { color: "tomato" }]}>Chats</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 20,
    color: "#333",
  },
  skillContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  skillTag: {
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    marginRight: 10,
    color: "#333",
  },
  separator: {
    height: 1,
    backgroundColor: "#ccc",
    marginVertical: 10,
  },
  infoContainer: {
    marginTop: 20,
  },
  infoText: {
    fontSize: 15,
    marginBottom: 10,
    color: "#333",
  },
  infoHeading: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
    opacity: 0.7,
  },
  bottomButtonContainer: {
    flexDirection: "row",
    backgroundColor: "#ffff",
    paddingBottom: 30,
    shadowColor: "#000",
    shadowOpacity: 0.6,
    shadowRadius: 20,
    elevation: 20,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#3D50DF",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#3D50DF",
    marginHorizontal: 10,
    top: 10,
    left: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 5,
  },
});

export default JobsDetails;
