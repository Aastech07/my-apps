import React from "react";
import { ScrollView, View, Image, Text } from "react-native";
import {
  responsiveFontSize,
  responsiveHeight,
} from "react-native-responsive-dimensions";
import { useRoute } from "@react-navigation/native";
const Directroydata = () => {
  const Values = useRoute();
  const Apidata = Values.params.data;

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
              source={{ uri: Apidata.companyLogo }}
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
            <View
              style={{
                flex: 1,
                position: "absolute",
                top: responsiveHeight(10),
                left: 30,
              }}
            >
              <Text style={{ fontWeight: "300" }}>{Apidata.contactNumber}</Text>
            </View>
            <View
              style={{
                flex: 1,
                position: "absolute",
                top: responsiveHeight(13),
                left: 30,
              }}
            >
              <Text style={{ fontWeight: "300" }}>{Apidata.companyEmail}</Text>
            </View>

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
                right: responsiveHeight(20),
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
                Company:{Apidata.companyName}.
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

            <View
              style={{
                flex: 1,
                position: "absolute",
                top: responsiveHeight(48),
                left: 30,
              }}
            >
              <Text style={{ fontWeight: "400" }}>
                Website: {Apidata.website}
              </Text>
            </View>

            <View
              style={{
                flex: 1,
                position: "absolute",
                top: responsiveHeight(49),
                left: 15,
                margin: 15,
              }}
            >
              <Text style={{ fontWeight: "400" }}>
                facebook: {Apidata.socialMediaLinks.facebook}
              </Text>
            </View>

            <View
              style={{
                flex: 1,
                position: "absolute",
                top: responsiveHeight(54),
                left: 15,
                margin: 15,
              }}
            >
              <Text style={{ fontWeight: "400" }}>
                twitter: {Apidata.socialMediaLinks.twitter}
              </Text>
            </View>

            <View
              style={{
                flex: 1,
                position: "absolute",
                top: responsiveHeight(57),
                left: 15,
                margin: 15,
              }}
            >
              <Text style={{ fontWeight: "400" }}>
                linkedin: {Apidata.socialMediaLinks.linkedin}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Directroydata;
