import React from "react";
import {
  ScrollView,
  View,
  Image,
  Text,
  TouchableOpacity,
  Linking,
} from "react-native";
import {
  responsiveFontSize,
  responsiveHeight,
} from "react-native-responsive-dimensions";
import { useRoute } from "@react-navigation/native";

const Directroydata = () => {
  const Values = useRoute();
  const Apidata = Values.params.data;

  const openLink = (url) => {
    Linking.openURL(url);
  };

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ paddingBottom: 200 }}
    >
      <View style={{ flex: 1, top: 100 }}>
        <View
          style={{
            backgroundColor: "#fff",
            marginHorizontal: 10,
            paddingBottom: responsiveHeight(64),
            borderRadius: 10,
            shadowColor: "#000",
            shadowOpacity: 0.6,
            shadowRadius: 10,
            elevation: 3,
          }}
        >
          <View
            style={{
              flex: 1,
              position: "absolute",
              bottom: responsiveHeight(62),
              alignSelf: "center",
            }}
          >
            <Image
              source={{ uri: Apidata.images[0] }}
              style={{ height: 100, width: 100 }}
            />
          </View>

          <View style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontSize: responsiveFontSize(2),
                  top: responsiveHeight(6),
                  alignSelf: "center",
                }}
              >
                {Apidata.locality}
              </Text>
            </View>

            <TouchableOpacity
              style={{
                flex: 1,
                position: "absolute",
                top: responsiveHeight(10),
                left: 30,
              }}
              onPress={() => openLink(`tel:${Apidata.contactNumber}`)}
            >
              <Text style={styles.link}>
                {Apidata.contactNumber}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                flex: 1,
                position: "absolute",
                top: responsiveHeight(13),
                left: 30,
              }}
              onPress={() => openLink(`mailto:${Apidata.companyEmail}`)}
            >
              <Text style={styles.link}>
                {Apidata.companyEmail}
              </Text>
            </TouchableOpacity>

            <View
              style={{
                flex: 1,
                position: "absolute",
                top: responsiveHeight(16.5),
                left: 30,
              }}
            >
              <Text style={{ fontWeight: "300" }}>ADDRESS</Text>
            </View>

            <View
              style={{
                flex: 1,
                position: "absolute",
                top: responsiveHeight(20),
                marginLeft: 50,
              }}
            >
              <Text style={{ fontWeight: "500" }}>{Apidata.address}</Text>
            </View>

            <View
              style={{
                borderWidth: 0.3,
                top: responsiveHeight(25),
                opacity: 0.6,
              }}
            ></View>

            <View
              style={{
                flex: 1,
                position: "absolute",
                top: responsiveHeight(30),
                left: 30,
              }}
            >
              <Text style={{ fontWeight: "500" }}>
                Company: {Apidata.companyName}.
              </Text>
            </View>

            <View
              style={{
                flex: 1,
                position: "absolute",
                top: responsiveHeight(34),
                left: 30,
              }}
            >
              <Text style={{ fontWeight: "400" }}>
                Description: {Apidata.description}
              </Text>
            </View>
            <View
              style={{
                borderWidth: 0.3,
                top: responsiveHeight(40),
                opacity: 0.6,
              }}
            ></View>

            <View
              style={{
                flex: 1,
                position: "absolute",
                top: responsiveHeight(45),
                left: 30,
              }}
            >
              <Text style={{ fontWeight: "400" }}>
                GST Number: {Apidata.gstNumber}
              </Text>
            </View>

            <TouchableOpacity
              style={{
                flex: 1,
                position: "absolute",
                top: responsiveHeight(48),
                left: 30,
              }}
              onPress={() => openLink(Apidata.website)}
            >
              <Text style={styles.link}>
                Website: {Apidata.website}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                flex: 1,
                position: "absolute",
                top: responsiveHeight(49),
                left: 15,
                margin: 15,
              }}
              onPress={() =>
                openLink(Apidata.socialMediaLinks && Apidata.socialMediaLinks.facebook)
              }
            >
              <Text style={styles.link}>
                facebook: {Apidata.socialMediaLinks && Apidata.socialMediaLinks.facebook}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                flex: 1,
                position: "absolute",
                top: responsiveHeight(54),
                left: 15,
                margin: 15,
              }}
              onPress={() =>
                openLink(Apidata.socialMediaLinks && Apidata.socialMediaLinks.twitter)
              }
            >
              <Text style={styles.link}>
                twitter: {Apidata.socialMediaLinks && Apidata.socialMediaLinks.twitter}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                flex: 1,
                position: "absolute",
                top: responsiveHeight(57),
                left: 15,
                margin: 15,
              }}
              onPress={() =>
                openLink(Apidata.socialMediaLinks && Apidata.socialMediaLinks.linkedin)
              }
            >
              <Text style={styles.link}>
                linkedin: {Apidata.socialMediaLinks && Apidata.socialMediaLinks.linkedin}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = {
  link: {
    fontWeight: "400",
    color: "#007bff", // Blue color for links
    textDecorationLine: "underline", // Underline for links
  },
};

export default Directroydata;
