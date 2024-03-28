import React, { useState, useEffect } from "react";
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  Image,
  FlatList,
} from "react-native";


const AnnouncementDetails = ({announce}) => {
  // const [announcement, setAnnouncement] = useState("");

  // useEffect(() => {
  //   const GetAnn = async () => {
  //     try {
  //       const { data } = await axios.get(`${api}/announcements`, {});
  //       setAnnouncement(data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   GetAnn();
  // }, []);

  function formatDate(inputDate) {
    const date = new Date(inputDate);

    // Get day, month, and year
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is zero-based
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }

  const renderAnnouncementItem = ({ item }) => (
    <>
      <View style={styles.announcementContainer}>
        <Image source={{ uri: item.image }} style={styles.announcementImage} />
        <View style={styles.announcementDetails}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View>
              <Text style={styles.announcementType}>
                {item.announcementType}
              </Text>
              <Text style={styles.announcementName}>
                {item?.createdBy?.username}
              </Text>
            </View>
            <Text style={styles.announcementDate}>{formatDate(item.date)}</Text>
          </View>
          <Text style={styles.announcementDescription}>{item.description}</Text>
        </View>
      </View>
    </>
  );

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{paddingBottom:250}}
      >
        <View style={{ flex: 1, paddingHorizontal: 10}}>
          <FlatList
            data={announce}
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
    borderBottomWidth:1,
    borderBlockEndColor:"lightgray",
    marginVertical: 8,
    // borderRadius: 8,
    // elevation: 3,
  },
  announcementImage: {
    width: 100,
    height: 100,
  },
  announcementName: {
    fontSize: 14,
    color: "gray",
    fontWeight: "bold",
  },
  announcementDetails: {
    paddingVertical: 10,
    paddingHorizontal:0,
    marginLeft: 16,
    flex: 1,
  },
  announcementType: {
    fontSize: 16,
    fontWeight: "bold",
  },
  announcementDate: {
    fontSize: 14,
    color: "gray",
  },
  announcementDescription: {
    fontSize: 18,
    marginTop: 10,
  },
});
