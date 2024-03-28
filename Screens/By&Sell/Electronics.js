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
const Electronics = () => {
  const navigation = useNavigation();
  return (
    <ScrollView
      style={styles.mainContainer}
      contentContainerStyle={styles.scrollContentContainer}
    >
      <View style={styles.table}>
        <CategoryBox
          iconName="headphones-alt"
          title="Accessories"
          onPress={() => navigation.navigate("AccessoriesDetails")}
        />

        <CategoryBox
          iconName="tablet-alt"
          title="Tablets"
          onPress={() => navigation.navigate("Tablets")}
        />

        <CategoryBox
          iconName="mobile-alt"
          title="Mobile"
          onPress={() => navigation.navigate("MobileDetails")}
        />
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignItems: "center",
          marginBottom: 20,
          backgroundColor: "#fff",
          borderRadius: 20,
          right:120
        }}
      >
        <CategoryBox
          iconName="laptop"
          title="Electronics & Application"
          onPress={() => navigation.navigate("ElectronicsDetails")}
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
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    backgroundColor: "#fff",
    marginBottom: 5,
    shadowColor: "tomato",
    shadowOpacity: 0.6,
    shadowRadius: 20,
    elevation: 3,
  },
  icon: {
    marginBottom: 5,
    opacity: 0.6,
    color: "tomato",
  },
  categoryText: {
    textAlign: "center",
  },
});

export default Electronics;
