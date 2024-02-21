import React, { useContext, useState } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,Alert,Modal,Pressable
} from "react-native";
import Animated, {
    FadeInLeft,
} from "react-native-reanimated";
import {
  responsiveHeight,
  responsiveWidth,responsiveFontSize
} from "react-native-responsive-dimensions";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import { useNavigation } from "@react-navigation/native";
import { MyContext } from "../../App";
import axios from "axios";
import DateTimePicker from "react-native-ui-datepicker";
import dayjs from "dayjs";
import { api } from "../Api";
import { useRoute } from "@react-navigation/native";
const Directorys = () => {
  const Value = useRoute();
  const ids = Value.params.data
  console.warn(ids)
  const [companyname, setCompanyName] = useState("");
  const [established, setEstablished] = useState("");
  const [description, setDescription] = useState("");
  const [facebook, setFaceBook] = useState("");
  const [twitter, setTwitter] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [instagram, setInstagram] = useState("");
  const [companyEmail,setCompanyEmail] = useState("");
  const [gstNumber,setGstNumber] = useState("");
  const [tags, setTags] = useState("");
  const [contactNumber,setContactNumber] = useState("");
  const [businessArea,setBusinessArea] = useState("");
  const [locality,setLocality] = useState("");
  const [website,setWebsite] = useState("");
  const [address,setAddress] = useState("");
  const [completionYear, setCompletionYear] = useState(dayjs().format("YYYY-MM-DD"));
  const navigation = useNavigation()
  const [modalVisible1, setModalVisible1] = useState("");
  const id = useContext(MyContext)
 
  const img = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyrHPk8PA3LcbnSqnikNs8A2AKJvvWIHgr9w&s"

  const PostDirectory = async () => {
    try {
      const { data } = await axios.post(`${api}/directories`, {
        profileId:id,
        companyLogo: img,
        companyEmail:companyEmail,
        gstNumber:gstNumber,
        contactNumber: contactNumber,
        businessArea: businessArea,
        locality: locality,
        companyName: companyname,
        website:website,
        address: address,
        description: description,
        establishedDate: completionYear,
        socialMediaLinks: {
          facebook: facebook,
          twitter: twitter,
          linkedin: linkedin,
        },
        tags: [
          tags
        ]
      });

    } catch (error) {
      console.log("Error during login:", error.message);
    }
  };
  
 
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


  const handleDateChange = (event, selectedDate) => {
    if (selectedDate !== undefined) {
      const year = selectedDate.getFullYear();
      setCompletionYear(year);
    }
  };
  




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
             <TouchableOpacity onPress={()=>navigation.goBack()}>
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
              placeholder="Enter Company Name"
              placeholderTextColor="black"
              onChangeText={(txt) => setCompanyName(txt)}
              value={companyname}
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
            Enter Company Email
          </Text>
          <View style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              placeholder="xyz@gmail.com"
              placeholderTextColor="black"
              onChangeText={(txt) => setCompanyEmail(txt)}
              value={companyEmail}
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
            Add Gst Number
          </Text>
          <View style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              placeholder="Add Gst Number"
              placeholderTextColor="black"
              onChangeText={(txt) => setGstNumber(txt)}
              value={gstNumber}
              //keyboardType="numeric"
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
            Add Contact Number
          </Text>
          <View style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              placeholder="1234567890"
              placeholderTextColor="black"
              onChangeText={(txt) => setContactNumber(txt)}
              value={contactNumber}
              keyboardType="numeric"
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
            Enter business Area
          </Text>
          <View style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              placeholder="Enter business Area"
              placeholderTextColor="black"
              onChangeText={(txt) => setBusinessArea(txt)}
              value={businessArea}
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
            Enter locality
          </Text>
          <View style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              placeholder="Enter locality"
              placeholderTextColor="black"
              onChangeText={(txt) => setLocality(txt)}
              value={locality}
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
            Enter Address
          </Text>
          <View style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              placeholder="Enter Address"
              placeholderTextColor="black"
              onChangeText={(txt) => setAddress(txt)}
              value={address}
            />
          </View>
        </View>


        <View style={{ bottom: 23 }}>
            <Text
              style={{
                top: responsiveHeight(24),

                left: 23,
                fontSize: 15,
                fontWeight: "500",
                opacity: 0.6,
              }}
            >
              Established Date
            </Text>
            <View style={styles.inputView}>
              <TouchableOpacity
                onPress={() => setModalVisible1(!modalVisible1)}
              >
                <Text style={{ top: 15, opacity: 0.7 }}>{completionYear}</Text>
              </TouchableOpacity>
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
            Add Website link
          </Text>
          <View style={styles.inputView1}>
            <TextInput
              style={styles.inputText}
              placeholder="Add Website link"
              placeholderTextColor="black"
              onChangeText={(txt) => setWebsite(txt)}
              value={website}
            />
            <FontAwesome5Icon
              name="wordpress"
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
          
          </View>
        </View>

        <View style={styles.centeredView1}>
                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={modalVisible1}
                  onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible1(!modalVisible1);
                  }}
                >
                  <View style={styles.centeredView1}>
                    <View style={styles.modalView1}>
                      <DateTimePicker
                        value={completionYear}
                        mode="date"
                        display="default" // You can also use "spinner" or "calendar"
                        onChange={handleDateChange}
                      />

                      <Pressable
                        style={[styles.button1, styles.buttonClose1]}
                        onPress={() => setModalVisible1(!modalVisible1)}
                      >
                        <Text style={styles.textStyle1}>Close</Text>
                      </Pressable>
                    </View>
                  </View>
                </Modal>
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
        }} onPress={()=> navigation.navigate('JobsScreens',{data:ids})}>
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
    paddingLeft: 15,
    paddingRight: 20,

    left: 20,
    marginBottom: 15,
    opacity: 0.6,

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
  centeredView1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView1: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button1: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  buttonOpen1: {
    backgroundColor: "#F194FF",
  },
  buttonClose1: {
    backgroundColor: "#2196F3",
  },
  textStyle1: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText1: {
    marginBottom: 15,
    textAlign: "center",
  },
});
