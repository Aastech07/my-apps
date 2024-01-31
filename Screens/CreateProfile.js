import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Pressable,
} from "react-native";

import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { useEffect, useState } from "react";
import FamilyTree from "./Form/FamilyTree";
import Profiles from "./Form/Profiles";
import Education from "./Form/Education";
import Directorys from "./Form/Directorys";
import JobsScreens from "./Form/JobsScreens";
import Animated, { FadeInDown, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import Matrimonys from "./Form/Matrimony";
import { useRoute } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const CreateProfile = () => {
  const [selected, setSelected] = useState(1);
  const IDs = useRoute();
  const ids = IDs.params.Datas
 
 
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('my-key');
      if (value !== null) {
      }
    } catch (e) {
       console.log(e)
    }
  };

useEffect(()=>{
     getData()
},)




  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {selected == 1 ? (
        <Profiles id={ids} />
      ) : selected == 2 ? (
        <FamilyTree />
      ) : selected == 3 ? (
        <Education />
      ) : selected == 4 ? (
        <Directorys />
      ) : selected == 5 ? (
        <JobsScreens />
      ) :selected == 6 ?(
      <Matrimonys/>
      ):  null}

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

      </View>






    </View>
  );
};
export default CreateProfile;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
