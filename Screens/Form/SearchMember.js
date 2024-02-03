import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  TextInput,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  responsiveWidth,
  responsiveHeight,
} from "react-native-responsive-dimensions";
import { useNavigation } from "@react-navigation/native";
const SearchMember = () => {

  
  const [data, setData] = useState([
    { id: 1, name: "John" },
    { id: 2, name: "Jane" },
    { id: 3, name: "Alice" },
    { id: 4, name: "Bob" },
    { id: 5, name: "Charlie" },
    { id: 6, name: "item" },
    { id: 7, name: "item" },
    { id: 8, name: "item" },
    { id: 9, name: "item" },
    { id: 10, name: "item" },
    { id: 11, name: "item" },
    { id: 12, name: "item" },
  ]);
 const navigation = useNavigation()
  const img =
    "https://static.vecteezy.com/system/resources/previews/002/275/847/non_2x/male-avatar-profile-icon-of-smiling-caucasian-man-vector.jpg";
  const [filteredData, setFilteredData] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const filterData = () => {
      const filtered = data.filter((item) =>
        item.name.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredData(filtered);
    };

    filterData();
  }, [searchText, data]);

  const renderItem = ({ item }) => {
    return (
      <View style={{ flex: 1 }}>
        <TouchableOpacity onPress={()=>navigation.navigate('FamilyTree',{data:item})}>
          <View style={{ padding: 10 }}>
            <Text style={{ position: "absolute", left: 100, top: 30 }}>
              {item.name}
            </Text>
            <Image
              style={{
                height: 50,
                width: 50,
                top: 8,
                left: 20,
                borderRadius: 50,
              }}
              source={{ uri: img }}
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#ffff" }}>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Search..."
          placeholderTextColor="black"
          edile={true}
          onChangeText={(txt) => setSearchText(txt)}
          value={searchText}
        />
        <FontAwesome5Icon
          name="search"
          size={19}
          style={{
            position: "absolute",

            opacity: 0.4,
            right: responsiveWidth(80),
          }}
          color={"#000"}
        />
      </View>

      <View style={{ top: 30, marginBottom: 120 }}>
        {searchText.length > 0 ? (
          <FlatList
            data={filteredData}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
          />
        ) : null}
      </View>
    </View>
  );
};

export default SearchMember;
const styles = StyleSheet.create({
  inputView: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 10,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20,
    top: responsiveHeight(2),
    alignSelf: "center",
    shadowColor: "#984065",
    shadowOffset: {
      width: 0,
      height: 50,
    },
    shadowOpacity: 0.8,
    shadowRadius: 16.0,
    elevation: 5,
    paddingLeft: 50,
  },

  inputText: {
    height: 50,
    color: "black",
  },
});
