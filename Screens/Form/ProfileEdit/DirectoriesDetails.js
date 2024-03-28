import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Modal,
  Pressable,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import { api } from "../../Api";
import SkeletonLoader from "../../skeletonloader/Skeletonloader";
import DateTimePicker from "react-native-ui-datepicker";
import dayjs from "dayjs";
import DirectorysEditForm from "./DirectorysEditForm";

const DirectoriesDetails = () => {
  const [profileData, setProfileData] = useState();
  const [showSkeleton, setShowSkeleton] = useState(false);
  const [id, setID] = useState(null);
  const [editableFields, setEditableFields] = useState({});
  const [editingTags, setEditingTags] = useState(false);
  const [tagsInput, setTagsInput] = useState("");
  const [form, setForm] = useState(false);
  const [profileid, setProfileID] = useState("");
  const [formData, setFormData] = useState({
    companyName: "",
    businessArea: "",
    contactNumber: "",
    companyEmail: "",
    website: "",
    gstNumber: "",
    locality: "",
    address: "",
    description: "",
    socialMediaLinks: {
      facebook: "",
      twitter: "",
      linkedin: "",
    },
    tags: [],
  });
  const [establishedDate, setEstablishedDate] = useState(
    dayjs().format("YYYY-MM-DD")
  );
  const [modalVisible1, setModalVisible1] = useState(false);
  const img =
    "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?size=338&ext=jpg&ga=GA1.1.1700460183.1708646400&semt=ais";

  const [buttonClicked, setButtonClicked] = useState(false);

  useEffect(() => {
    const getProfileData = async () => {
      setShowSkeleton(true);
      try {
        const profileId = await AsyncStorage.getItem("profileid");

        setProfileID(profileId);
        if (profileId !== null) {
          const { data } = await axios.get(
            `${api}/directories/${profileId}`,
          );
          if (data) {
            setProfileData(data);
            setForm(false);
            setID(data._id);

            // Initialize editableFields state with all fields set to false
            const fields = {};
            Object.keys(data).forEach((key) => {
              fields[key] = false;
            });
            setEditableFields(fields);

            // Set formData with fetched data
            setFormData(data);
          } else {
            setProfileData(false);
            setForm(true);
            console.log("No profile found for the matching profileId.");
          }
        }
      } catch (error) {
        console.log(error);
      }
      setShowSkeleton(false);
    };
    getProfileData();
  }, []);

  const PostDirectory = async () => {
    try {
      const { data } = await axios.post(`${api}/directories`, {
        profileId: profileid,
        companyLogo: img,
        companyEmail: formData.companyEmail,
        gstNumber: formData.gstNumber,
        contactNumber: formData.contactNumber,
        businessArea: formData.businessArea,
        locality: formData.locality,
        companyName: formData.companyName,
        website: formData.website,
        address: formData.address,
        description: formData.description,
        establishedDate: establishedDate,
        socialMediaLinks: {
          facebook: formData.socialMediaLinks.facebook,
          twitter: formData.socialMediaLinks.twitter,
          linkedin: formData.socialMediaLinks.linkedin,
        },
        tags: formData.tags,
      });
      console.warn("Posted Data:", data);
      setProfileData(data); // Update state with posted data
      setFormData(data); // Update form data with posted data
      await AsyncStorage.setItem("Directoryid", data._id);
      setButtonClicked(true); // Set button clicked to true
    } catch (error) {
      console.log("Error during login:", error.message);
    }
  };

  const formatDate = (date) => {
    const formattedDate = new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    return formattedDate;
  };

  const handleEdit = (key) => {
    setEditableFields({ ...editableFields, [key]: true });
  };

  const handleSave = async (key) => {
    setEditableFields({ ...editableFields, [key]: false });
    const update = {
      _id: id,
      companyLogo: img,
      companyEmail: formData.companyEmail,
      gstNumber: formData.gstNumber,
      contactNumber: formData.contactNumber,
      businessArea: formData.businessArea,
      locality: formData.locality,
      companyName: formData.companyName,
      website: formData.website,
      address: formData.address,
      description: formData.description,
      establishedDate: establishedDate,
      socialMediaLinks: {
        facebook: formData.socialMediaLinks.facebook,
        twitter: formData.socialMediaLinks.twitter,
        linkedin: formData.socialMediaLinks.linkedin,
      },
      tags: formData.tags,
    };
    try {
      const { data } = await axios.put(`${api}/directories/${id}`, update, {});
      console.warn("Profile updated:", data);
    } catch (error) {
      console.log("Error updating profile:", error.message);
    }
  };

  const handleEditTags = () => {
    setEditingTags(true);
    setTagsInput(profileData.tags.join(", "));
  };

  const handleSaveTags = async () => {
    const updatedTags = tagsInput.split(",").map((tag) => tag.trim());
    setProfileData({ ...profileData, tags: updatedTags });
    setEditingTags(false);

    try {
      const { data } = await axios.put(`${api}/directories/${id}`, {
        ...profileData,
      });
      console.warn("Tags updated:", data);
    } catch (error) {
      console.log("Error updating tags:", error.message);
    }
  };

  const addTag = (newTag) => {
    if (newTag.trim() === "") return;

    const updatedTags = [...profileData.tags, newTag.trim()];
    setProfileData({ ...profileData, tags: updatedTags });
  };

  const removeTag = (index) => {
    const updatedTags = [...profileData.tags];
    updatedTags.splice(index, 1);
    setProfileData({ ...profileData, tags: updatedTags });
  };
  function extractDate(dateString) {
    const dateObject = new Date(dateString);

    // Extract the date components
    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(dateObject.getDate()).padStart(2, "0");

    // Form the date string in YYYY-MM-DD format
    const formattedDate = `${year}-${month}-${day}`;

    return formattedDate;
  }
  `  `;
  const handleDateChange = (event) => {
    console.log(event)
    if (event !== undefined) {
      setModalVisible1(!modalVisible1);
      setEstablishedDate(event);
      console.log(event)
    }
  };
  const renderTag = (tag, index) => (
    <View key={index} style={styles.tagItem}>
      <Text style={styles.tagText}>{tag}</Text>
      <TouchableOpacity onPress={() => removeTag(index)}>
        <FontAwesome5Icon name="times-circle" size={18} color="#FF6347" />
      </TouchableOpacity>
    </View>
  );

  const renderDetailItem = (label, value, key) => {
    const isEditing = editableFields[key];

    if (isEditing) {
      return (
        <View style={styles.detailItem}>
          <Text style={styles.label}>{label}:</Text>

          <TextInput
            style={styles.textInput}
            value={value}
            onChangeText={(text) => setFormData({ ...formData, [key]: text })}
          />

          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => handleSave(key)}
          >
            <FontAwesome5Icon name="save" size={20} color="#007BFF" />
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <View style={styles.detailItem}>
        <Text style={styles.label}>{label}:</Text>
        <Text style={styles.value}>{value}</Text>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => handleEdit(key)}
        >
          <FontAwesome5Icon name="edit" size={20} color="#777" />
        </TouchableOpacity>
      </View>
    );
  };

  if (showSkeleton == true) {
    return (
      <View style={[styles.container, { bottom: 50 }]}>
        <SkeletonLoader />
      </View>
    );
  }
  return (
    <ScrollView style={styles.container}>
      {!profileData ? (
        <DirectorysEditForm />
      ) : (
        <>
          <View style={styles.profileHeader}>
            <Image
              style={styles.profileImage}
              source={{ uri: profileData.companyLogo }}
            />
            <View style={styles.profileInfo}>
              <Text style={styles.name}>{profileData.companyName}</Text>
              <Text style={styles.profession}>{profileData.businessArea}</Text>
            </View>
          </View>

          <View style={styles.detailsContainer}>
            <Text style={styles.sectionTitle}>Company Details</Text>
            {renderDetailItem(
              "Company Name",
              formData.companyName,
              "companyName"
            )}
            {renderDetailItem(
              "Business Area",
              formData.businessArea,
              "businessArea"
            )}

            <TouchableOpacity onPress={() => setModalVisible1(true)}>
              {renderDetailItem(
                "Established Date",
                formatDate(establishedDate),
                "EstablishedDate"
              )}
            </TouchableOpacity>
            {renderDetailItem(
              "Contact Number",
              formData.contactNumber,
              "contactNumber"
            )}
            {renderDetailItem("Email", formData.companyEmail, "companyEmail")}
            {renderDetailItem("Website", formData.website, "website")}
            {renderDetailItem("GST Number", formData.gstNumber, "gstNumber")}
            {renderDetailItem("Locality", formData.locality, "locality")}
            {renderDetailItem("Address", formData.address, "address")}
            {renderDetailItem(
              "Description",
              formData.description,
              "description"
            )}

            <Text style={styles.sectionTitle}>Social Media Links</Text>
            {renderDetailItem(
              "Facebook",
              formData.socialMediaLinks.facebook,
              "socialMediaLinks.facebook"
            )}
            {renderDetailItem(
              "Twitter",
              formData.socialMediaLinks.twitter,
              "socialMediaLinks.twitter"
            )}
            {renderDetailItem(
              "Linkedin",
              formData.socialMediaLinks.linkedin,
              "socialMediaLinks.linkedin"
            )}

            <Text style={styles.sectionTitle}>Tags</Text>
            {editingTags ? (
              <View style={styles.tagsEditContainer}>
                <TextInput
                  style={styles.tagsInput}
                  value={tagsInput}
                  onChangeText={setTagsInput}
                  placeholder="Enter tags separated by comma"
                />
                <TouchableOpacity
                  style={styles.saveTagsButton}
                  onPress={handleSaveTags}
                >
                  <Text style={styles.saveTagsText}>Save Tags</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.tagsContainer}>
                {profileData.tags.map((tag, index) => renderTag(tag, index))}
                <TouchableOpacity
                  style={styles.editTagsButton}
                  onPress={handleEditTags}
                >
                  <Text style={styles.editTagsText}>Edit Tags</Text>
                </TouchableOpacity>
              </View>
            )}

            <View style={styles.centeredView1}>
              <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible1}
                onRequestClose={() => {
                  setModalVisible1(!modalVisible1);
                }}
              >
                <View style={styles.centeredView1}>
                  <View style={styles.modalView1}>
                    <DateTimePicker
                    mode="date"
                    display="default"
                      value={establishedDate}
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
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  iconButton: {
    padding: 5,
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
    borderBottomWidth: 1,
    paddingBottom: 5,
    borderColor: "#ccc",
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    borderBottomWidth: 1,
    paddingBottom: 10,
    borderColor: "#ccc",
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 20,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  profileInfo: {
    flex: 1,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
  },
  profession: {
    fontSize: 16,
    color: "gray",
  },
  detailsContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 20,
    opacity: 0.6,
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
    borderBottomWidth: 1,
    paddingBottom: 5,
    borderColor: "#ccc",
  },
  label: {
    fontWeight: "bold",
    marginRight: 5,
    flex: 1,
  },
  value: {
    flex: 2,
  },
  editIcon: {
    marginLeft: 10,
  },
  languageItem: {
    padding: 5,
    borderWidth: 1,
    borderRadius: 5,
    marginRight: 10,
    marginBottom: 10,
  },
  languagesContainer: {
    marginBottom: 20,
  },
  editableInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 5,
    marginBottom: 10,
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 20,
  },
  tagItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    padding: 5,
    marginRight: 5,
    marginBottom: 5,
    borderRadius: 5,
  },
  tagText: {
    marginRight: 5,
  },
  editTagsButton: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  editTagsText: {
    color: "#fff",
    fontWeight: "bold",
  },
  tagsEditContainer: {
    marginBottom: 10,
  },
  tagsInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  saveTagsButton: {
    backgroundColor: "#28a745",
    padding: 10,
    borderRadius: 5,
  },
  saveTagsText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  socialMediaLinksContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 20,
  },
  socialMediaLinkItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 20,
    marginBottom: 10,
  },
  socialMediaLinkText: {
    marginLeft: 5,
  },
  postButton: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
    alignItems: "center",
  },
  postButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
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
  textInput: {
    flex: 2,
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 10,
    borderRadius: 10,
  },
});

export default DirectoriesDetails;
