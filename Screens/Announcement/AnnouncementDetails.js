import React, { useState, useEffect } from "react";
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  Image,
  FlatList,
} from "react-native";

import { api } from "../Api";
import axios from "axios";

const AnnouncementDetails = () => {
  const [announcement, setAnnouncement] = useState("");
  
  useEffect(() => {
    const GetAnn = async () => {
      try {
        const { data } = await axios.get(`${api}/announcements`, {});
        setAnnouncement(data);
      } catch (error) {
        console.log(error);
      }
    };
    GetAnn();
  }, []);

  const renderAnnouncementItem = ({ item }) => (
    <View style={styles.announcementContainer}>
      <Image source={{ uri: item.image }} style={styles.announcementImage} />
      <View style={styles.announcementDetails}>
        <Text style={styles.announcementType}>{item.announcementType}</Text>
        <Text style={styles.announcementDate}>{item.date}</Text>
        <Text style={styles.announcementDescription}>{item.description}</Text>
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 150 }}
      >
        <View style={{ flex: 1, paddingHorizontal: 10 }}>
          <FlatList
            data={announcement}
            keyExtractor={(item) => item._id}
            renderItem={renderAnnouncementItem}
            scrollEnabled={false}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default AnnouncementDetails;

const styles = StyleSheet.create({
  announcementContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 10,
    marginVertical: 8,
    borderRadius: 8,
    elevation: 3,
  },
  announcementImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  announcementDetails: {
    marginLeft: 16,
    flex: 1,
  },
  announcementType: {
    fontSize: 18,
    fontWeight: "bold",
  },
  announcementDate: {
    fontSize: 16,
    color: "gray",
  },
  announcementDescription: {
    fontSize: 16,
  },
});
