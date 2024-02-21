import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";

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

const Sell = ({ navigation }) => {
  return (
    <ScrollView
      style={styles.mainContainer}
      contentContainerStyle={styles.scrollContentContainer}
    >
      <View style={styles.table}>
        <CategoryBox
          iconName="car"
          title="Car"
          onPress={() => navigation.navigate("CarDetails")}
        />
        <CategoryBox
          iconName="mobile-alt"
          title="Mobile"
          onPress={() => navigation.navigate("MobileDetails")}
        />
        <CategoryBox
          iconName="bicycle"
          title="Bike"
          onPress={() => navigation.navigate("BikeDetails")}
        />
      </View>

      <View style={styles.table}>
        <CategoryBox
          iconName="laptop"
          title="Electronics & Application"
          onPress={() => navigation.navigate("ElectronicsDetails")}
        />
        <CategoryBox
          iconName="bicycle"
          title="cycle"
          onPress={() => navigation.navigate("BicycleDetails")}
        />
        <CategoryBox
          iconName="headphones-alt"
          title="Accessories"
          onPress={() => navigation.navigate("AccessoriesDetails")}
        />
      </View>
      <View style={styles.table}>
        <CategoryBox
          iconName="tshirt"
          title="Fashion"
          onPress={() => navigation.navigate("FashionDetails")}
        />
        <CategoryBox
          iconName="couch"
          title="Furniture"
          onPress={() => navigation.navigate("FurnitureDetail")}
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
  table: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: "#fff",
    borderRadius: 20,
  },
  categoryContainer: {
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    borderColor: "black",
    borderRadius: 10,
    padding: 5,
    backgroundColor: "#fff",
    shadowColor: "#000",
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
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    backgroundColor: "lightgray",
    marginBottom: 5,
  },
  icon: {
    marginBottom: 5,
    opacity: 0.6,
  },
  categoryText: {
    textAlign: "center",
  },
});

export default Sell;
