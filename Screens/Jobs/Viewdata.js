import React from "react";
import {
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  Linking,
  StyleSheet,
} from "react-native";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";

const Viewdata = ({ route }) => {
  const { data } = route.params;

  const images =
    data.profileId.image ||
    "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg";
  const fullName = `${data.profileId.firstName} ${data.profileId.lastName}`;

  const openProfileLink = () => {
    const uri = data.image;
    Linking.openURL(uri);
  };

  const linkedInProfile = () => {
    const uri = data.linkedInProfile;
    Linking.openURL(uri);
  };

  const githubProfile = () => {
    const uri = data.githubProfile;
    Linking.openURL(uri);
  };

  const portfolioLink = () => {
    const uri = data.portfolioLink;
    Linking.openURL(uri);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: images }} style={styles.image} />
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.fullName}>{fullName}</Text>
          <View style={styles.detailRow}>
            <FontAwesome5Icon name="briefcase" size={16} style={styles.icon} />
            <Text style={styles.detailText}>{`${data.yourPosition} at ${data.currentCompany}`}</Text>
          </View>
          <View style={styles.detailRow}>
            <FontAwesome5Icon name="map-marker-alt" size={16} style={styles.icon} />
            <Text style={styles.detailText}>{`${data.jobId.location}`}</Text>
          </View>
          <View style={styles.detailRow}>
            <FontAwesome5Icon name="suitcase" size={16} style={styles.icon} />
            <Text style={styles.detailText}>{`${data.experience} | ${data.currentCTC}`}</Text>
          </View>
          <View style={styles.detailRow}>
            <FontAwesome5Icon name="user-graduate" size={16} style={styles.icon} />
            <Text style={styles.detailText}>{`${data.profileId.education.degree}`}</Text>
          </View>
          <Text style={styles.skills}>
            <FontAwesome5Icon name="tools" size={16} style={styles.icon} />
            {` Skills: ${data.jobId.skills.join(", ")}`}
          </Text>
          <Text style={styles.skills}>
            <FontAwesome5Icon name="cogs" size={16} style={styles.icon} />
            {` Work mode: ${data.workmode}`}
          </Text>
          <Text style={styles.skills}>
            <FontAwesome5Icon name="tasks" size={16} style={styles.icon} />
            {` Role And Responsibility: ${data.roleAndResponsibility}`}
          </Text>
          <Text style={styles.skills}>
            <FontAwesome5Icon name="user-circle" size={16} style={styles.icon} />
            {` Your Position: ${data.roleAndResponsibility}`}
          </Text>

          <Text style={styles.description}>
            <FontAwesome5Icon name="file-alt" size={16} style={styles.icon} />
            {` Description: ${data.jobId.description}`}
          </Text>
          <TouchableOpacity style={styles.link} onPress={openProfileLink}>
            <Text style={styles.linkText}>
              <FontAwesome5Icon name="file-pdf" size={16} style={styles.icon} />
              {` Show Resume:`}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.link} onPress={linkedInProfile}>
            <Text style={styles.linkText}>
              <FontAwesome5Icon name="linkedin" size={16} style={styles.icon} />
              {` LinkedIn Profile: ${data.linkedInProfile}`}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.link} onPress={githubProfile}>
            <Text style={styles.linkText}>
              <FontAwesome5Icon name="github" size={16} style={styles.icon} />
              {` Github Profile: ${data.githubProfile}`}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.link} onPress={portfolioLink}>
            <Text style={styles.linkText}>
              <FontAwesome5Icon name="link" size={16} style={styles.icon} />
              {` Portfolio Link: ${data.portfolioLink}`}
            </Text>
          </TouchableOpacity>

          <Text style={styles.references}>
            <FontAwesome5Icon name="users" size={16} style={styles.icon} />
            {` References: ${data.references.join(", ")}`}
          </Text>
          <Text style={styles.contactEmail}>
            <FontAwesome5Icon name="phone" size={16} style={styles.icon} />
            {` Contact No: ${data.userId.phone}`}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
  card: {
    backgroundColor: "#fff",
  },
  imageContainer: {
    alignItems: "flex-end",
    borderBottomColor: "#ccc",
    top: 20,
    right: 10,
  },
  image: {
    height: 50,
    width: 50,
    borderRadius: 40,
  },
  detailsContainer: {
    paddingHorizontal: 20,
    bottom: 30,
  },
  fullName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  jobDetails: {
    fontSize: 18,
    marginBottom: 10,
    color: "#555",
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  icon: {
    marginRight: 8,
    color: "#888",
  },
  detailText: {
    fontSize: 16,
    color: "#555",
  },
  skills: {
    fontSize: 16,
    color: "#333",
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    paddingTop: 10,
  },
  description: {
    fontSize: 16,
    color: "#555",
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    paddingTop: 10,
  },
  link: {
    marginTop: 10,
  },
  linkText: {
    color: "#007BFF",
    fontSize: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  references: {
    fontSize: 16,
    color: "#555",
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    paddingTop: 10,
  },
  contactEmail: {
    fontSize: 16,
    color: "#555",
    marginTop: 10,
  },
  applicationDeadline: {
    fontSize: 16,
    color: "#555",
    marginTop: 10,
  },
  company: {
    fontSize: 16,
    color: "#555",
    marginTop: 10,
  },
  jobId: {
    fontSize: 16,
    color: "#555",
    marginTop: 10,
  },
});

export default Viewdata;
