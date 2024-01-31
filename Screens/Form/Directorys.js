import React, { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,Alert
} from "react-native";
import Animated, {
  FadeInUp,
  FadeInLeft,
  FadeInDown,
} from "react-native-reanimated";
import {
  responsiveHeight,
  responsiveWidth,responsiveFontSize
} from "react-native-responsive-dimensions";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import { useNavigation } from "@react-navigation/native";
const Directorys = () => {
  const [companyname, setCompanyName] = useState("");
  const [established, setEstablished] = useState("");
  const [description, setDescription] = useState("");
  const [facebook, setFaceBook] = useState("");
  const [twitter, setTwitter] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [instagram, setInstagram] = useState("");
  const [isEnabled, setIsEnabled] = useState(false);
  const [tags, setTags] = useState("");
   const navigation = useNavigation()
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);



  const validate = () => {
    let isValid = true
    if (companyname == '') {
      isValid = false
    }
    if (established == '') {
      isValid = false
    }
    if (description == '') {
      isValid = false
    }
    if (facebook == '') {
      isValid = false
    }
    if (twitter == '') {
      isValid = false
    }
    if (linkedin == '') {
      isValid = false
    }
    if (instagram == '') {
      isValid = false
    }
   if (isValid==true) {
    navigation.navigate('JobsScreens')
   } else {
    Alert.alert('fill this form')
   }
  }



















  return (
    <View
      style={{ flex: 1,backgroundColor:'#fff'}}
    >
      <ScrollView style={{flex:1}}  contentContainerStyle={{ paddingBottom: 200 }}  >
     
      <View
        style={{
          width: responsiveWidth(100),
          height: 90,
          backgroundColor: "#3468C0",
          position: "absolute",
          bottom: 0,
          top: -1,
          elevation: 3,
         borderBottomLeftRadius:20,
         borderBottomRightRadius:20
        }}
      >
        <View style={{ flexDirection: "row", marginTop: 10 }}>   
        <Text style={{left:responsiveWidth(10),top:responsiveHeight(4),fontSize:responsiveFontSize(3),color:'red',fontWeight:'300'}}>Comm <Text style={{fontWeight:'300',color:'#fff'}}>unity</Text></Text>
        </View>


        <View style={{ flexDirection: "row", bottom:responsiveHeight(-1), left:responsiveWidth(80),
        }}>
             <TouchableOpacity onPress={()=>navigation.navigate('Education')}>
             <FontAwesome5Icon name="arrow-left" size={18}  style={{  backgroundColor:'#fff',padding:5,paddingHorizontal:7,borderRadius:50,elevation:3,shadowColor:'#000',shadowOpacity:0.6,shadowRadius:10}}/>
             </TouchableOpacity>
          </View>

      </View>
     
     
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1, top: 110 }}>
          <Animated.Text
            style={{ left: 20, fontSize: 25, fontWeight: "300" }}
            entering={FadeInLeft.duration(500).damping()}
          >
            Create{" "}
            <Text style={{ color: "tomato", fontWeight: "500" }}>
              Directory...
            </Text>
          </Animated.Text>
        </View>

        <View style={{ bottom: 40 }}>
          <Text
            style={{
              top: responsiveHeight(24),
              left: 23,
              fontSize: 15,
              fontWeight: "500",
              opacity: 0.6,
            }}
          >
            Enter Company Name
          </Text>
          <View style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              placeholder="Enter CompanyName"
              placeholderTextColor="black"
              onChangeText={(txt) => setCompanyName(txt)}
              value={companyname}
            />
            <FontAwesome5Icon
              name="building"
              size={16}
              style={{ position: "absolute", left: 10, top: 18, opacity: 0.6 }}
              color={"#000"}
            />
          </View>
        </View>

        <View style={{ bottom: 30 }}>
          <Text
            style={{
              top: responsiveHeight(24),
              left: 23,
              fontSize: 15,
              fontWeight: "500",
              opacity: 0.6,
            }}
          >
            Enter Established Date
          </Text>
          <View style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              placeholder="dd/mm/yyyy"
              placeholderTextColor="black"
              onChangeText={(txt) => setEstablished(txt)}
              value={established}
            />
            <FontAwesome5Icon
              name="table"
              size={16}
              style={{ position: "absolute", left: 8, top: 18, opacity: 0.6 }}
              color={"#000"}
            />
          </View>
        </View>

        <View style={{ bottom: 20 }}>
          <Text
            style={{
              top: responsiveHeight(24),
              left: 23,
              fontSize: 15,
              fontWeight: "500",
              opacity: 0.6,
            }}
          >
            Add Description
          </Text>
          <View style={{ top: responsiveHeight(24.5) }}>
            <TextInput
              multiline={true}
              numberOfLines={4}
              maxLength={100}
              style={{
                height: 80,
                color: "black",
                borderWidth: 1,
                marginHorizontal: 17,
                paddingLeft: 10,

                borderRadius: 8,
                opacity: 0.7,
              }}
              placeholder="Add Description"
              placeholderTextColor="black"
              onChangeText={(txt) => setDescription(txt)}
              value={description}
              underlineColorAndroid="transparent"
            />
          </View>
        </View>

        <View style={{ bottom: 10 }}>
          <Text
            style={{
              top: responsiveHeight(25),
              left: 23,
              fontSize: 15,
              fontWeight: "500",
              opacity: 0.6,
            }}
          >
            Add Facebook link
          </Text>
          <View style={styles.inputView1}>
            <TextInput
              style={styles.inputText}
              placeholder="Add Facebook link"
              placeholderTextColor="black"
              onChangeText={(txt) => setFaceBook(txt)}
              value={facebook}
            />
            <FontAwesome5Icon
              name="facebook"
              size={18}
              style={{ position: "absolute", left: 7, top: 18, opacity: 0.6 }}
              color={"#000"}
            />
          </View>
        </View>

        <View style={{ bottom: 10 }}>
          <Text
            style={{
              top: responsiveHeight(25),
              left: 23,
              fontSize: 15,
              fontWeight: "500",
              opacity: 0.6,
            }}
          >
            Add twitter link
          </Text>
          <View style={styles.inputView1}>
            <TextInput
              style={styles.inputText}
              placeholder="Add twitter link"
              placeholderTextColor="black"
              onChangeText={(txt) => setTwitter(txt)}
              value={twitter}
            />
            <FontAwesome5Icon
              name="twitter"
              size={18}
              style={{ position: "absolute", left: 7, top: 18, opacity: 0.6 }}
              color={"#000"}
            />
          </View>
        </View>

        <View style={{ bottom: 10 }}>
          <Text
            style={{
              top: responsiveHeight(25),
              left: 23,
              fontSize: 15,
              fontWeight: "500",
              opacity: 0.6,
            }}
          >
            Add linkedin link
          </Text>
          <View style={styles.inputView1}>
            <TextInput
              style={styles.inputText}
              placeholder="Add linkedin link"
              placeholderTextColor="black"
              onChangeText={(txt) => setLinkedin(txt)}
              value={linkedin}
            />
            <FontAwesome5Icon
              name="linkedin"
              size={18}
              style={{ position: "absolute", left: 7, top: 18, opacity: 0.6 }}
              color={"#000"}
            />
          </View>
        </View>

        <View style={{ bottom: 10 }}>
          <Text
            style={{
              top: responsiveHeight(25),
              left: 23,
              fontSize: 15,
              fontWeight: "500",
              opacity: 0.6,
            }}
          >
            Add Instagram link
          </Text>
          <View style={styles.inputView1}>
            <TextInput
              style={styles.inputText}
              placeholder="Add Instagram link"
              placeholderTextColor="black"
              onChangeText={(txt) => setInstagram(txt)}
              value={instagram}
            />
            <FontAwesome5Icon
              name="instagram"
              size={18}
              style={{ position: "absolute", left: 7, top: 15, opacity: 0.6 }}
              color={"#000"}
            />
          </View>
        </View>

        <View style={{ bottom: 5 }}>
          <Text
            style={{
              top: responsiveHeight(24),
              left: 23,
              fontSize: 15,
              fontWeight: "500",
              opacity: 0.6,
            }}
          >
            Add Tags
          </Text>
          <View style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              placeholder="Add Tags"
              placeholderTextColor="black"
              onChangeText={(txt) => setTags(txt)}
              value={tags}
            />
            <FontAwesome5Icon
              name="tag"
              size={16}
              style={{ position: "absolute", left: 8, top: 18, opacity: 0.6 }}
              color={"#000"}
            />
          </View>
        </View>


      
        
      </View>
      </ScrollView>


      <View style={{ bottom: 50,left:responsiveWidth(21) }}>
        <TouchableOpacity style={{
          width: "50%",
          backgroundColor: "#3D50DF",
          borderRadius: 5,
          height: 50,
          alignItems: "center",
          justifyContent: "center",
          top: responsiveHeight(10),
          elevation: 3,
          alignSelf: "center",
          borderColor: "blue",
        }} onPress={()=>validate()}>
          <Text style={{ color: "white", fontSize: 16, fontWeight: "500" }}>
            Next
          </Text>
          <FontAwesome5Icon
            name="arrow-right"
            style={{
              position: "absolute",
              left: 135,
              backgroundColor: "#3D56F0",
              padding: 12,
              borderRadius: 50,
              color: "#fff",
            }}
          />
        </TouchableOpacity>
      </View>


      <View style={{ bottom: 100, right:responsiveWidth(26)}}>
        <TouchableOpacity style={{
          width: "40%",
           borderWidth:1,
          borderRadius: 5,
          height: 50,
          alignItems: "center",
          justifyContent: "center",
          top: responsiveHeight(10),
  
          alignSelf: "center",
          borderColor: "tomato",
        }} onPress={()=>navigation.navigate('JobsScreens')}>
          <Text style={{ color: "tomato", fontSize: 16, fontWeight: "500" }}>
            Skip
          </Text>
        
        </TouchableOpacity>
      </View>









    </View>
  );
};

export default Directorys;
const styles = StyleSheet.create({
  inputView: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 8,
    height: 50,

    top: responsiveHeight(25),
    opacity: 0.8,
    paddingLeft: 30,
    paddingRight: 20,

    left: 20,
    marginBottom: 15,
    opacity: 0.7,

    borderWidth: 1,
  },

  inputText: {
    height: 50,
    color: "black",
  },
  loginBtn: {
    width: "88%",
    backgroundColor: "#3D50DF",
    borderRadius: 5,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 50,
    top: responsiveHeight(90),
    shadowColor: "#3D50DF",
    shadowOffset: {
      width: 0,
      height: 50,
    },
    shadowOpacity: 0.8,
    shadowRadius: 16.0,
    elevation: 10,
    alignSelf: "center",
    borderColor: "blue",
  },
  inputView1: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 8,
    height: 50,

    top: responsiveHeight(25),
    opacity: 0.8,
    paddingLeft: 30,
    paddingRight: 20,

    left: 20,
    marginBottom: 15,
    opacity: 0.7,

    borderBottomWidth: 1,
  },
  loginBtn: {
    width: "88%",
    backgroundColor: "#3D50DF",
    borderRadius: 5,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 50,
    top: responsiveHeight(20),
    shadowColor: "#3D50DF",
    shadowOffset: {
      width: 0,
      height: 50,
    },
    shadowOpacity: 0.8,
    shadowRadius: 16.0,
    elevation: 10,
    alignSelf: "center",
  },
});
