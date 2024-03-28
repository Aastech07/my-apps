import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import { useNavigation } from "@react-navigation/native";
const CategoryBox = ({ iconName, title, onPress }) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.categoryContainer}>
        <View style={styles.iconTextWrapper}>
          <View style={styles.iconContainer}>
            <FontAwesome5Icon name={iconName} size={22} style={styles.icon} />
          </View>
          <Text style={styles.categoryText}>{title}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const AddProperty = () => {
  const navigation = useNavigation();

  return (
    <ScrollView
      style={styles.mainContainer}
      contentContainerStyle={styles.scrollContentContainer}
    >
      {/* First Row */}
      <View style={styles.rowContainer}>
        <CategoryBox
          iconName="home"
          title="Property"
          onPress={() => navigation.navigate("PropertyForm")}
        />
        <CategoryBox
          iconName="landmark"
          title="Lands & Plots"
          onPress={() => navigation.navigate("LandPlot")}
        />
      </View>

      {/* Second Row */}
      <View style={styles.rowContainer}>
        <CategoryBox
          iconName="building"
          title="PG & House"
          onPress={() => navigation.navigate("PgGuestHouse")}
        />
        <CategoryBox
          iconName="shopping-bag"
          title="Shop & Office"
          onPress={() => navigation.navigate("ShopOffice")}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContentContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: "#fff",
    borderRadius: 20,
  },
  categoryContainer: {
    width: 150,
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    borderColor: "black",
    borderRadius: 10,
    padding: 10,
    backgroundColor: "#fff",
    shadowColor: "tomato",
    shadowOpacity: 0.6,
    shadowRadius: 20,
    elevation: 3,
  },
  iconTextWrapper: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  iconContainer: {
    width: 70,
    height: 70,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 35,
    backgroundColor: "#fff",
    marginBottom: 10,
    shadowColor: "tomato",
    shadowOpacity: 0.6,
    shadowRadius: 20,
    elevation: 3,
  },
  icon: {
    marginBottom: 10,
    opacity: 0.6,
    color: "tomato",
  },
  categoryText: {
    textAlign: "center",
  },
});

export default AddProperty;
