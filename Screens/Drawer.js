import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { StatusBar } from "react-native";
import {
  responsiveWidth,
  responsiveHeight,
} from "react-native-responsive-dimensions";
import FontAwesome from "react-native-vector-icons/FontAwesome5";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
const NavigationView = () => {
  const navigation = useNavigation();

  const handleSignOut = () => {
    Alert.alert(
      "Sign Out",
      "Are you sure you want to sign out?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: async () => {
            // Clear AsyncStorage or any other local storage
            try {
              await AsyncStorage.removeItem("UserID");
              await AsyncStorage.clear();
              // Navigate to Home or any other initial screen after sign out
              navigation.navigate("SignUp"); // Change 'Home' to your desired screen
            } catch (error) {
              console.error("Error clearing async storage:", error);
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <StatusBar
        translucent
        backgroundColor="#4383f2"
        barStyle="dark-content"
      />

      <View
        style={{
          backgroundColor: "#f2f2f2",
          padding: 60,
          borderBottomWidth: 1,
          opacity: 0.6,
        }}
      ></View>
      <TouchableOpacity
        style={{
          position: "absolute",
          top: responsiveHeight(6.5),
          left: responsiveWidth(4),
          backgroundColor: "lightgray",
          paddingHorizontal: 10,
          paddingVertical: 8,
          borderRadius: 50,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.6,
          shadowRadius: 3,
          elevation: 2,
          zIndex: 10,
        }}
        onPress={() => navigation.navigate("Profile")}
      >
        <FontAwesome name="user" size={22} color={"black"} />
      </TouchableOpacity>

      <ScrollView style={{ marginTop: 20, marginBottom: 80 }}>
        <TouchableOpacity
          style={styles.item}
          onPress={() => navigation.navigate("MemberSearch")}
        >
          <FontAwesome name="users" size={17} style={{ opacity: 0.6 }} />
          <Text style={styles.itemText}>Member Search</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.item}
          onPress={() => navigation.navigate("Announcement")}
        >
          <FontAwesome name="bullhorn" size={17} style={{ opacity: 0.6 }} />
          <Text style={styles.itemText}>Announcement</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.item}
          onPress={() => navigation.navigate("PropertylistNav")}
        >
          <FontAwesome name="list" size={17} style={{ opacity: 0.6 }} />
          <Text style={styles.itemText}>Property List</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.item}
          onPress={() => navigation.navigate("Calendars")}
        >
          <FontAwesome name="calendar" size={17} style={{ opacity: 0.6 }} />
          <Text style={styles.itemText}>Calendars</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.item}
          onPress={() => navigation.navigate("Buy&Sell")}
        >
          <FontAwesome
            name="shopping-cart"
            size={17}
            style={{ opacity: 0.6 }}
          />
          <Text style={styles.itemText}>Buy & Sell</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.item}
          onPress={() => navigation.navigate("Album")}
        >
          <FontAwesome name="images" size={17} style={{ opacity: 0.6 }} />
          <Text style={styles.itemText}>Gallery</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.item}
          onPress={() => navigation.navigate("Blog")}
        >
          <FontAwesome name="comment" size={17} style={{ opacity: 0.6 }} />
          <Text style={styles.itemText}>Blog</Text>
        </TouchableOpacity>

        <View style={{ borderBottomWidth: 1, bottom: 5, opacity: 0.4 }}></View>
        <TouchableOpacity
          style={styles.item}
          onPress={() => navigation.navigate("ContactUsScreen")}
        >
          <FontAwesome name="envelope" size={17} style={{ opacity: 0.6 }} />
          <Text style={styles.itemText}>Contact Us</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.item}
          onPress={() => navigation.navigate("Settings")}
        >
          <FontAwesome name="cog" size={17} style={{ opacity: 0.6 }} />
          <Text style={styles.itemText}>Settings</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.item}
          onPress={() => navigation.navigate("HelpAndFAQs")}
        >
          <FontAwesome
            name="question-circle"
            size={17}
            style={{ opacity: 0.6 }}
          />
          <Text style={styles.itemText}>Helps & FAQs</Text>
        </TouchableOpacity>
        <View style={{ borderBottomWidth: 1, bottom: 5, opacity: 0.4 }}></View>
        <TouchableOpacity style={styles.item} onPress={() => handleSignOut()}>
          <FontAwesome name="sign-in-alt" size={17} style={{ opacity: 0.6 }} />
          <Text style={styles.itemText}>Sign Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default NavigationView;
const styles = StyleSheet.create({
  inputText: {
    height: 50,
    color: "black",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    marginLeft: 20,
  },
  itemText: {
    marginLeft: 15,
    fontSize: 17,
  },
});
