import React, { useState } from "react";
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Modal,
  Pressable,
  Switch,Alert
} from "react-native";
import Animated, {
  FadeInUp,
  FadeInLeft,
  FadeInDown,
} from "react-native-reanimated";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from "react-native-responsive-dimensions";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import {
  MultipleSelectList,
  SelectList,
} from "react-native-dropdown-select-list";
import DateTimePicker from "react-native-ui-datepicker";
import dayjs from "dayjs";
import { api } from "../Api";
import { useNavigation } from "@react-navigation/native";

const JobsScreens = () => {
  const navigation = useNavigation();
  const [currentCompany, setCurrentCompany] = useState("");
  const [experience, setExperience] = useState("");
  const [yearsOfExperienced, setYearsOfExperienced] = useState("");
  const [currentCtc, setCurrentCtc] = useState("");
  const [expectedCtc, setExpectedCtc] = useState("");
  const [noticep, setNoticeP] = useState("");
  const [roleAndResponsibility, setRoleAndResponsibility] = useState("");
  const [linkedinLink, setLinkedinLink] = useState("");
  const [githubLink, setGithubLink] = useState("");
  const [portfolioLink, setPortfolioLink] = useState("");
  const [workModes, setWorkMode] = useState("");
  const [references, setReferences] = useState("");
  const [position, setPosition] = useState("");
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  const [modalVisible, setModalVisible] = useState(false);
  const [value, setValue] = useState(dayjs().format("YYYY-MM-DD"));
  const [modalVisible1, setModalVisible1] = useState(false);
  const [value1, setValue1] = useState(dayjs().format("YYYY-MM-DD"));
  const [modalVisible2, setModalVisible2] = useState(false);
  const [value2, setValue2] = useState(dayjs().format("YYYY-MM-DD"));
  
  const EmploymentType = [
    { key: "1", value: "Experienced" },
    { key: "2", value: "Fresher" },
  ];

  const YearsOfExperienceLevel = [
    { key: "1", value: "0-1 years" },
    { key: "2", value: "1-2 years" },
    { key: "3", value: "2-3 years" },
    { key: "4", value: "3-4 years" },
    { key: "5", value: "4-5 years" },
    { key: "6", value: "5-6 years +" },
  ];

  const WorkMode = [
    { key: "1", value: "Remote" },
    { key: "2", value: "Hybrid" },
    { key: "3", value: "On-site" },
  ];

  const CTC = [
    { key: "1", value: "1LPA - 2LPA" },
    { key: "2", value: "3LPA - 4LPA" },
    { key: "3", value: "5LPA - 6LPA" },
    { key: "4", value: "6LPA - 7LPA" },
    { key: "5", value: "8LPA - 9LPA" },
    { key: "6", value: "10LPA - 11LPA+" },
  ];

  const CurrentCTC = [
    { key: "1", value: "5LPA - 6LPA" },
    { key: "2", value: "7LPA - 8LPA" },
    { key: "3", value: "8LPA - 9LPA" },
    { key: "4", value: "10LPA - 11LPA" },
    { key: "5", value: "11LPA - 12LPA" },
    { key: "6", value: "13LPA - 14LPA+" },
  ];

  const NoticePeriod = [
    { key: "1", value: "3 days" },
    { key: "2", value: "5 days" },
    { key: "3", value: "10 days" },
    { key: "4", value: "1 week" },
    { key: "5", value: "1 months" },
  ];

  const [isEnabled1, setIsEnabled1] = useState(false);
  const toggleSwitchs = () => setIsEnabled1((previousState) => !previousState);

    

const validate = () => {
    let isValid = true
    if (currentCompany == '') {
      isValid = false
    }
    if (experience == '') {
      isValid = false
    }
    if (yearsOfExperienced == '') {
      isValid = false
    }
    if (currentCtc == '') {
      isValid = false
    }
    if (noticep == '') {
      isValid = false
    }
    if (expectedCtc == '') {
      isValid = false
    }
    if (linkedinLink == '') {
      isValid = false
    }
    if (position == '') {
      isValid = false
    }
    if (githubLink == '') {
      isValid = false
    }
    if (portfolioLink == '') {
      isValid = false
    }
    if (workModes == '') {
      isValid = false
    }
    if (references == '') {
      isValid = false
    }
   if (isValid==true) {
    navigation.navigate('Matrimonys')
   } else {
    Alert.alert('fill this form')
   }
  }



  const PostJob = async () => {
   
    try {
      const { data } = await axios.post(`${api}/profiles`, {
        userId: ids,
        firstName: firstName,
        lastName: lastName,
        family: {
          fatherName: fatherName,
          motherName: motherName,
        },
        profession: profession,
        dateOfBirth: age,
        gender: genders,
        address: {
          street: street,
          city: city,
          state: state,
          country: country,
          postalCode: postalcode,
        },
        languages: languages,
        maritalStatus: marital,
        
      })
      await AsyncStorage.setItem('profileid', data._id);
    } catch (error) {
      console.error("Error during login:", error.message);
    }
  };



  return (
    <View
      style={{ flex: 1,backgroundColor:'#fff' }}
    >

      <ScrollView style={{ flex:1 }} contentContainerStyle={{ paddingBottom: 200 }}>
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
             <TouchableOpacity onPress={()=>navigation.navigate('Directorys')}>
             <FontAwesome5Icon name="arrow-left" size={18}  style={{  backgroundColor:'#fff',padding:5,paddingHorizontal:7,borderRadius:50,elevation:3,shadowColor:'#000',shadowOpacity:0.6,shadowRadius:10}}/>
             </TouchableOpacity>
          </View>
      </View>

        <View style={{ flex: 1, top: 130 }}>
          <Animated.Text
            style={{ left: 20, fontSize: 25, fontWeight: "300" }}
            entering={FadeInLeft.duration(500).damping()}
          >
            Apply{" "}
            <Text style={{ color: "tomato", fontWeight: "500" }}>Jobs...</Text>
          </Animated.Text>
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
            Current Company
          </Text>
          <View style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              placeholder="Enter Current Company"
              placeholderTextColor="black"
              onChangeText={(text) => setCurrentCompany(text)}
              value={currentCompany}
            />
            <FontAwesome5Icon
              name="building"
              size={16}
              style={{ position: "absolute", left: 8, top: 18, opacity: 0.6 }}
              color={"#000"}
            />
          </View>
        </View>

        <View style={{ bottom: 25 }}>
          <Text
            style={{
              top: responsiveHeight(24),
              left: 23,
              fontSize: 15,
              fontWeight: "500",
              opacity: 0.6,
            }}
          >
            Experience
          </Text>
          <View style={{ top: responsiveHeight(25), marginBottom: 10 }}>
            <SelectList
              setSelected={(text) => setExperience(text)}
              data={EmploymentType}
              save="value"
              boxStyles={{
                marginLeft: responsiveWidth(5),
                marginRight: responsiveWidth(5),
              }}
              dropdownStyles={{
                marginLeft: responsiveWidth(5),
                marginRight: responsiveWidth(5),
              }}
              search={false}
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
            Years of Experienced
          </Text>
          <View style={{ top: responsiveHeight(25), marginBottom: 13 }}>
            <SelectList
              setSelected={(text) =>
                setYearsOfExperienced(text)}

              data={YearsOfExperienceLevel}
              save="value"
              boxStyles={{
                marginLeft: responsiveWidth(5),
                marginRight: responsiveWidth(5),
              }}
              dropdownStyles={{
                marginLeft: responsiveWidth(5),
                marginRight: responsiveWidth(5),
              }}
              search={false}
            />
          </View>
        </View>

        <View style={{ bottom: 18 }}>
          <Text
            style={{
              top: responsiveHeight(24),
              left: 23,
              fontSize: 15,
              fontWeight: "500",
              opacity: 0.6,
            }}
          >
            Current CTC
          </Text>
          <View style={{ top: responsiveHeight(25), marginBottom: 13 }}>
            <SelectList
              setSelected={(text) => setCurrentCtc(text)}
              data={CTC}
              save="value"
              boxStyles={{
                marginLeft: responsiveWidth(5),
                marginRight: responsiveWidth(5),
              }}
              dropdownStyles={{
                marginLeft: responsiveWidth(5),
                marginRight: responsiveWidth(5),
              }}
              search={false}
            />
          </View>
        </View>

        <View style={{ bottom: 15 }}>
          <Text
            style={{
              top: responsiveHeight(24),
              left: 23,
              fontSize: 15,
              fontWeight: "500",
              opacity: 0.6,
            }}
          >
            Select Notice Period
          </Text>
          <View style={{ top: responsiveHeight(25), marginBottom: 13 }}>
            <SelectList
              setSelected={(text) => setNoticeP(text)}
              data={NoticePeriod}
              save="value"
              boxStyles={{
                marginLeft: responsiveWidth(5),
                marginRight: responsiveWidth(5),
              }}
              dropdownStyles={{
                marginLeft: responsiveWidth(5),
                marginRight: responsiveWidth(5),
              }}
              search={false}
            />
          </View>
        </View>

        <View style={{ bottom: 10 }}>
          <Text
            style={{
              top: responsiveHeight(24),
              left: 23,
              fontSize: 15,
              fontWeight: "500",
              opacity: 0.6,
            }}
          >
            Select Expected CTC
          </Text>
          <View style={{ top: responsiveHeight(25), marginBottom: 13 }}>
            <SelectList
              setSelected={(text) => setExpectedCtc(text)}
              data={CurrentCTC}
              save="value"
              boxStyles={{
                marginLeft: responsiveWidth(5),
                marginRight: responsiveWidth(5),
              }}
              dropdownStyles={{
                marginLeft: responsiveWidth(5),
                marginRight: responsiveWidth(5),
              }}
              search={false}
            />
          </View>
        </View>

        <View style={{}}>
          <Text
            style={{
              top: responsiveHeight(24),
              left: 23,
              fontSize: 15,
              fontWeight: "500",
              opacity: 0.6,
            }}
          >
            From Date :
            <Text style={{ color: "tomato" }}> {value} </Text>
          </Text>

          <TouchableOpacity onPress={() => setModalVisible(true)} >
            <Text style={{
              position: 'absolute',
              top: responsiveWidth(42),
              left: responsiveWidth(79),
              fontWeight: '400', borderRadius: 4, backgroundColor: "#fff",
              padding: 3, paddingHorizontal: 7, shadowColor: '#000', shadowOpacity: 0.5, shadowRadius: 10, elevation: 1, color: 'tomato'
            }}

            >Clike</Text>
          </TouchableOpacity>

          <View style={{ top: responsiveHeight(25) }}>
            <View style={styles.centeredView}>
              <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                  Alert.alert("Modal has been closed.");
                  setModalVisible(!modalVisible);
                }}
              >
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                    <DateTimePicker
                      value={value}
                      onValueChange={(date) => setValue(date)}
                    />

                    <Pressable
                      style={[styles.button, styles.buttonClose]}
                      onPress={() => setModalVisible(!modalVisible)}
                    >
                      <Text style={styles.textStyle}>Close</Text>
                    </Pressable>
                  </View>
                </View>
              </Modal>
            </View>
          </View>
        </View>

        <View style={{}}>
          <Text
            style={{
              top: responsiveHeight(24),
              left: 23,
              fontSize: 15,
              fontWeight: "500",
              opacity: 0.6,
            }}
          >
            To Date:
            <Text style={{ color: "tomato" }}> {value1}</Text>
          </Text>

           <TouchableOpacity  onPress={() => setModalVisible1(true)} >
                <Text style={{position:'absolute',
                top:responsiveWidth(42.5),
                left:responsiveWidth(79),
                fontWeight:'400',borderRadius:4,backgroundColor:"#fff",
                padding:3,paddingHorizontal:7,shadowColor:'#000',shadowOpacity:0.5,shadowRadius:10,elevation:1,color:'tomato'}}
                >Clike</Text>
          </TouchableOpacity>

          <View style={{ top: responsiveHeight(25) }}>
            <View style={styles.centeredView}>
              <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible1}
                onRequestClose={() => {
                  Alert.alert("Modal has been closed.");
                  setModalVisible1(!modalVisible1);
                }}
              >
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                    <DateTimePicker
                      value={value1}
                      onValueChange={(date) => setValue1(date)}
                    />

                    <Pressable
                      style={[styles.button, styles.buttonClose]}
                      onPress={() => setModalVisible1(!modalVisible1)}
                    >
                      <Text style={styles.textStyle}>Close</Text>
                    </Pressable>
                  </View>
                </View>
              </Modal>
            </View>
          </View>
        </View>

        <View style={{}}>
          <Text
            style={{
              top: responsiveHeight(24),
              left: 23,
              fontSize: 15,
              fontWeight: "500",
              opacity: 0.6,
            }}
          >
            Role And Responsibility
          </Text>
          <View style={styles.inputView2}>
            <TextInput
              style={{ height: 100, color: "black", }}
              placeholder="Enter Role And Responsibility"
              placeholderTextColor="black"
              onChangeText={(text) =>
                setRoleAndResponsibility(text)
              }
              value={roleAndResponsibility}
              multiline={true}
              numberOfLines={4}
              maxLength={100}
            />

          </View>
        </View>

        <View style={{ top: 10 }}>
          <Text
            style={{
              top: responsiveHeight(24),
              left: 23,
              fontSize: 15,
              fontWeight: "500",
              opacity: 0.6,
            }}
          >
            Your Position
          </Text>
          <View style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              placeholder="Enter Your Position"
              placeholderTextColor="black"
              onChangeText={(text) => setPosition(text)}
              value={position}
            />
            <FontAwesome5Icon
              name="project-diagram"
              size={15}
              style={{ position: "absolute", left: 8, top: 18, opacity: 0.6 }}
              color={"#000"}
            />
          </View>
        </View>

        <View style={{ top: 10 }}>
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
              onChangeText={(text) => setLinkedinLink(text)}
              value={linkedinLink}
            />
            <FontAwesome5Icon
              name="linkedin"
              size={18}
              style={{ position: "absolute", left: 7, top: 18, opacity: 0.6 }}
              color={"#000"}
            />
          </View>
        </View>

        <View style={{ top: 10 }}>
          <Text
            style={{
              top: responsiveHeight(25),
              left: 23,
              fontSize: 15,
              fontWeight: "500",
              opacity: 0.6,
            }}
          >
            Add Github link
          </Text>
          <View style={styles.inputView1}>
            <TextInput
              style={styles.inputText}
              placeholder="Add Github link"
              placeholderTextColor="black"
              onChangeText={(text) => setGithubLink(text)}
              value={githubLink}
            />
            <FontAwesome5Icon
              name="github"
              size={18}
              style={{ position: "absolute", left: 7, top: 18, opacity: 0.6 }}
              color={"#000"}
            />
          </View>
        </View>

        <View style={{ top: 10 }}>
          <Text
            style={{
              top: responsiveHeight(25),
              left: 23,
              fontSize: 15,
              fontWeight: "500",
              opacity: 0.6,
            }}
          >
            Add Portfolio link
          </Text>
          <View style={styles.inputView1}>
            <TextInput
              style={styles.inputText}
              placeholder="Add Portfolio link"
              placeholderTextColor="black"
              onChangeText={(text) =>setPortfolioLink(text)}
              value={portfolioLink}
            />
            <FontAwesome5Icon
              name="address-card"
              size={18}
              style={{ position: "absolute", left: 7, top: 18, opacity: 0.6 }}
              color={"#000"}
            />
          </View>
        </View>

        <View style={{ top: 15 }}>
          <Text
            style={{
              top: responsiveHeight(24),
              left: 23,
              fontSize: 15,
              fontWeight: "500",
              opacity: 0.6,
            }}
          >
            Work Mode
          </Text>
          <View style={{ top: responsiveHeight(25), marginBottom: 13 }}>
            <SelectList
              setSelected={(text) => setWorkMode(text)}
              data={WorkMode}
              save="value"
              boxStyles={{
                marginLeft: responsiveWidth(5),
                marginRight: responsiveWidth(5),
              }}
              dropdownStyles={{
                marginLeft: responsiveWidth(5),
                marginRight: responsiveWidth(5),
              }}
              search={false}
            />
          </View>
        </View>

        <View style={{ top: 15 }}>
          <Text
            style={{
              top: responsiveHeight(25.5),
              left: 23,
              fontSize: 15,
              fontWeight: "500",
              opacity: 0.6,
            }}
          >
            Willingness To Travel
          </Text>
          <View style={{ top: responsiveHeight(21), right: 20 }}>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={isEnabled1 ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitchs}
              value={isEnabled1}
            />
          </View>
        </View>

        <View style={{}}>
          <Text
            style={{
              top: responsiveHeight(25.5),
              left: 23,
              fontSize: 15,
              fontWeight: "500",
              opacity: 0.6,
            }}
          >
            Willingness To Relocate
          </Text>
          <View style={{ top: responsiveHeight(21), right: 20 }}>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>
        </View>

        <View style={{}}>
          <Text
            style={{
              top: responsiveHeight(24),
              left: 23,
              fontSize: 15,
              fontWeight: "500",
              opacity: 0.6,
            }}
          >
            Expected Joining Date:
            <Text style={{ color: "tomato" }}> {value2}</Text>
          </Text>

             <TouchableOpacity onPress={() => setModalVisible2(true)} >
            <Text style={{
              position: 'absolute',
              top: responsiveWidth(40.5),
              left: responsiveWidth(79),
              fontWeight: '400', borderRadius: 4, backgroundColor: "#fff",
              padding: 3, paddingHorizontal: 7, shadowColor: '#000', shadowOpacity: 0.5, shadowRadius: 10, elevation: 1, color: 'tomato'
            }}

            >Clike</Text>
          </TouchableOpacity>


          <View style={{ top: responsiveHeight(25) }}>
            <View style={styles.centeredView}>
              <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible2}
                onRequestClose={() => {
                  Alert.alert("Modal has been closed.");
                  setModalVisible2(!modalVisible2);
                }}
              >
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                    <DateTimePicker
                      value={value2}
                      onValueChange={(date) => setValue2(date)}
                    />

                    <Pressable
                      style={[styles.button, styles.buttonClose]}
                      onPress={() => setModalVisible2(!modalVisible2)}
                    >
                      <Text style={styles.textStyle}>Hide Modal</Text>
                    </Pressable>
                  </View>
                </View>
              </Modal>
            </View>
          </View>
        </View>

        <View style={{}}>
          <Text
            style={{
              top: responsiveHeight(24),
              left: 23,
              fontSize: 15,
              fontWeight: "500",
              opacity: 0.6,
            }}
          >
            Enter References
          </Text>
          <View style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              placeholder="xyz@gmail.com"
              placeholderTextColor="black"
              onChangeText={(text) => setReferences(text)}
              value={references}
            />
            <FontAwesome5Icon
              name="user-check"
              size={16}
              style={{ position: "absolute", left: 8, top: 18, opacity: 0.6 }}
              color={"#000"}
            />
          </View>
        </View>
      </ScrollView>

      <View style={{ bottom: 50,left: responsiveWidth(21) }}>
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
        }} onPress={()=> navigation.navigate('Matrimonys',{data:Datasapi})}>
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


      <View style={{ bottom: 100, right: responsiveWidth(26) }}>
        <TouchableOpacity style={{
          width: "40%",
          borderWidth: 1,
          borderRadius: 5,
          height: 50,
          alignItems: "center",
          justifyContent: "center",
          top: responsiveHeight(10),

          alignSelf: "center",
          borderColor: "tomato",
        }} onPress={()=>navigation.navigate('Matrimonys')}>
          <Text style={{ color: "tomato", fontSize: 16, fontWeight: "500" }}>
            Skip
          </Text>

        </TouchableOpacity>
      </View>


    </View>
  );
};

export default JobsScreens;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffff",
    marginTop: responsiveHeight(25),
    marginHorizontal: 30,
  },
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
  inputView2: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 8,
    height: 100,

    top: responsiveHeight(25),
    opacity: 0.8,
    paddingLeft: 10,
    paddingRight: 20,

    left: 20,
    marginBottom: 15,
    opacity: 0.7,

    borderWidth: 1,
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
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
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
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
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
});
