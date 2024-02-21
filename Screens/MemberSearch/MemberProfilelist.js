import React from "react";
import { View, Text, FlatList, Image, StyleSheet } from "react-native";

const MemberProfilelist = ({ route }) => {
  const { filteredData } = route.params;

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.url }} style={styles.itemImage} />
      <Text style={styles.itemText}>{item.firstName}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList data={filteredData} renderItem={renderItem} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#fff",
    top: 20,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  itemImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  itemText: {
    fontSize: 16,
  },
});

export default MemberProfilelist;
