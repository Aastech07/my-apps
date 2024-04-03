import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Share,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { StatusBar } from "react-native";
import { responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";

const { width, height } = Dimensions.get("window");

const ByDetails = () => {
  const navigation = useNavigation();

  const route = useRoute();
  const { data } = route.params;
  const [isFavourite, setIsFavourite] = useState(false);
  const item = data;

  const imageOpacity = useSharedValue(0);
  imageOpacity.value = withSpring(1);

  const imageStyle = useAnimatedStyle(() => {
    return {
      opacity: imageOpacity.value,
    };
  });

  const onShare = async () => {
    try {
      const message = `Check out this :
      Title: ${item.adTitle}
      Description: ${item.description}
      Price: $${item.price}
      Image: ${item.image}`;

      const result = await Share.share({
        message: message,
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="dark-content"
        />
        <Animated.Image
          source={{ uri: item.image }}
          style={[styles.image, imageStyle]}
        />
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <FontAwesome5
            name="arrow-left"
            color={"#000"}
            size={24}
            style={styles.icon}
          />

        
        </TouchableOpacity>

      <View style={{alignSelf:'flex-end',right:20}}>
      <FontAwesome5
            name={"share-alt"}
            style={{
       
             bottom:responsiveHeight(43.5)
            }}
            size={23}
            color={"#874d3b"}
            onPress={() => onShare()}
          />
      </View>
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={() => setIsFavourite(!isFavourite)}
        ></TouchableOpacity>
        <View style={styles.detailsContainer}>
          <Text style={styles.adTitle}>{item.adTitle}</Text>
          <Text style={styles.price}>Price: ₹{item.price}</Text>
          <View style={styles.separator}></View>
          <Text style={styles.type}>{item.type}</Text>
          <View style={styles.descriptionContainer}>
            <FontAwesome5
              name="info-circle"
              size={20}
              color="gray"
              style={styles.icon}
            />
            <Text style={styles.description}>{item.description}</Text>
          </View>
          <View style={styles.addressContainer}>
            <FontAwesome5
              name="map-marker-alt"
              size={20}
              color="gray"
              style={styles.icon}
            />
            <Text style={styles.address}>{item.address}</Text>
          </View>
          {item.landmark && (
            <View style={styles.addressContainer}>
              <FontAwesome5
                name="landmark"
                size={20}
                color="gray"
                style={styles.icon}
              />
              <Text style={styles.address}>{item.landmark}</Text>
            </View>
          )}
        </View>
      </ScrollView>

      <View style={styles.bottomButtonContainer}>
        <TouchableOpacity style={styles.button}>
          <FontAwesome5
            name="handshake"
            size={20}
            color="white"
            style={styles.icon}
          />
          <Text style={styles.buttonText}>Make Offer</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: "white", borderColor: "tomato" },
          ]}
        >
          <FontAwesome5
            name="comments"
            size={20}
            color="tomato"
            style={styles.icon}
          />
          <Text style={[styles.buttonText, { color: "tomato" }]}>Chats</Text>
        </TouchableOpacity>
      </View>

      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: height * 0.5,
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 1,
  },
  favoriteButton: {
    position: "absolute",
    top: 40,
    right: 20,
    zIndex: 1,
  },
  detailsContainer: {
    padding: 20,
  },
  adTitle: {
    fontWeight: "400",
    fontSize: 20,
  },
  price: {
    color: "#0C84FF",
    fontSize: 17,
    marginTop: 5,
  },
  separator: {
    height: 1,
    backgroundColor: "#E0E0E0",
    marginVertical: 10,
  },
  type: {
    fontWeight: "500",
    fontSize: 18,
  },
  descriptionContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  description: {
    fontSize: 16,
    marginLeft: 5,
  },
  addressContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  address: {
    fontSize: 16,
    marginLeft: 5,
  },
  icon: {
    marginRight: 5,
  },
  bottomButtonContainer: {
    flexDirection: "row",

    backgroundColor: "#ffff",
    paddingBottom: 30,
    shadowColor: "#000",
    shadowOpacity: 0.6,
    shadowRadius: 20,
    elevation: 20,
  },

  button: {
    width: (width - 60) / 2, // Calculate the width dynamically based on the screen width
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#3D50DF",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#3D50DF",
    marginHorizontal: 10,
    top: 10,
    left: 10,
  },

  buttonText: {
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 5,
  },
});

export default ByDetails;
