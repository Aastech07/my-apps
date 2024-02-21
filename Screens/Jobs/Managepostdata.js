import React from "react";
import { ScrollView, View, Text, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";

const Managepostdata = () => {
  const Data = useRoute();
  const Value = Data.params.data;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{Value.title}</Text>
          <Text style={styles.salary}>RS. {Value.salary}</Text>
        </View>

        <View style={[styles.infoContainer, styles.borderBottom]}>
          <FontAwesome5Icon
            name="map-marker-alt"
            color={"#000"}
            size={18}
            style={styles.icon}
          />
          <Text style={styles.infoText}>{Value.location}</Text>
        </View>

        <View style={[styles.infoContainer, styles.borderBottom]}>
          <FontAwesome5Icon
            name="briefcase"
            color={"#000"}
            size={18}
            style={styles.icon}
          />
          <Text style={styles.infoText}>{Value.experienceLevel}</Text>
        </View>

        <View style={[styles.infoContainer, styles.borderBottom]}>
          <FontAwesome5Icon
            name="graduation-cap"
            color={"#000"}
            size={17}
            style={styles.icon}
          />
          <Text style={styles.infoText}>{Value.educationLevel}</Text>
        </View>

        <View style={[styles.section, styles.borderBottom]}>
          <Text style={styles.sectionTitle}>Job Description</Text>
          <View style={styles.tagContainer}>
            {Value.skills.map((skill, index) => (
              <Text key={index} style={styles.tag}>
                {skill}
              </Text>
            ))}
          </View>
        </View>

        <View style={[styles.section, styles.borderBottom]}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.descriptionText}>{Value.description}</Text>
        </View>

        <View style={[styles.section, styles.borderBottom]}>
          <Text style={styles.sectionTitle}>Responsibilities</Text>
          <Text style={styles.descriptionText}>{Value.responsibilities}</Text>
        </View>

        <View style={[styles.section, styles.borderBottom]}>
          <Text style={styles.sectionTitle}>Qualifications</Text>
          <Text style={styles.descriptionText}>{Value.qualifications}</Text>
        </View>

        <View style={[styles.section, styles.borderBottom]}>
          <Text style={styles.sectionTitle}>Employment Type</Text>
          <Text style={styles.descriptionText}>{Value.employmentType}</Text>
        </View>

        <View style={[styles.section, styles.borderBottom]}>
          <Text style={styles.sectionTitle}>Contact Email</Text>
          <Text style={styles.descriptionText}>{Value.contactEmail}</Text>
        </View>

        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <FontAwesome5Icon name="building" size={20} color={"#fff"} />
          </View>
        </View>

        <View style={styles.companyInfo}>
          <Text style={styles.companyName}>{Value.company}</Text>
          <Text style={styles.companyDescription}>
            {Value.companyDescription}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    marginBottom: 10,
    borderBottomWidth: 1,
    paddingBottom: 10,
    borderBottomColor: "#f2f2f2",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
  },
  salary: {
    fontSize: 17,
    fontWeight: "bold",
    color: "green",
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  icon: {
    marginRight: 10,
    opacity: 0.7,
  },
  infoText: {
    fontSize: 16,
  },
  section: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  tagContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 20,
  },
  tag: {
    backgroundColor: "#f2f2f2",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 2,
    marginRight: 10,
    marginBottom: 10,
    fontSize: 14,
  },
  descriptionText: {
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 20,
  },
  buttonContainer: {
    alignItems: "flex-end",
    marginTop: 20,
  },
  button: {
    padding: 15,
    borderRadius: 50,
    backgroundColor: "green",
    shadowColor: "#000",
    shadowOffset: { width: 0.9, height: 0.9 },
    shadowOpacity: 0.8,
    shadowRadius: 20,
    elevation: 2,
  },
  companyInfo: {
    marginTop: 20,
    borderTopWidth: 1,
    paddingTop: 20,
    borderTopColor: "#f2f2f2",
  },
  companyName: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  companyDescription: {
    fontSize: 16,
    lineHeight: 22,
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
  },
});

export default Managepostdata;
