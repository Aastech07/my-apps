import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SeeAll from "./Screens/SeeAll";
import SignUp from "./Screens/SignUp";
import Signin from "./Screens/Signin";
import HomeScreen from "./Screens/HomeScreen";
import BottomNav from "./Screens/BottomNav";
import EventsDetails from "./Screens/EventsDetails";
import SplashScreen from "./Screens/SplashScreen";
import Matrimony from "./Screens/Matrimony";
import Directory from "./Screens/Directory";
import Message from "./Screens/Message";
import Blog from "./Screens/Blog";
import JobsSeeAll from "./Screens/JobsSeeAll";
import MatrimonySeeAll from "./Screens/MatrimonySeeAll";
import ProfileScreen from "./Screens/ProfileScreen";
import Calendars from "./Screens/Calendars";
import OtpScreen from "./Screens/OtpScreen";
import Mymatchdata from "./Screens/Mymatchdata";
import Jobsfirstscreen from "./Screens/Jobsfirstscreen";
import Recruiter from "./Screens/Recruiter";
import Managepostdata from "./Screens/Jobs/Managepostdata";
import EditPost from "./Screens/Jobs/Edit.Post";
import Viewdata from "./Screens/Jobs/Viewdata";
import Chats from "./Screens/Jobs/Chats";
import Messages from "./Screens/Jobs/Messages";
import CreateProfile from "./Screens/CreateProfile";
import Directorys from "./Screens/Form/Directorys";
import Education from "./Screens/Form/Education";
import FamilyTree from "./Screens/Form/FamilyTree";
import JobsScreens from "./Screens/Form/JobsScreens";
import Matrimonys from "./Screens/Form/Matrimony";
import Profiles from "./Screens/Form/Profiles";
import Directroydata from "./Screens/Directroydata";
const Stack = createNativeStackNavigator();
import { StatusBar, View } from "react-native";
function App() {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar style="auto" barStyle="default" />
      <NavigationContainer>
        <Stack.Navigator>
      
    
    
        <Stack.Screen
            name="SplashScreen"
            options={{ headerShown: false }}
            component={SplashScreen}
          />

        <Stack.Screen
            name="SignUp"
            options={{ headerShown: false }}
            component={SignUp}
          />
       
    
       <Stack.Screen
            name="BottomNav"
            options={{ headerShown: false }}
            component={BottomNav}
          />

         <Stack.Screen
            name="CreateProfile"
            options={{ headerShown: false }}
            component={CreateProfile}
          />

       

          <Stack.Screen
            name="Signin"
            options={{ headerShown: false }}
            component={Signin}
          />

          <Stack.Screen
            name="HomeScreen"
            options={{ headerShown: false }}
            component={HomeScreen}
          />
          <Stack.Screen
            name="EventsDetails"
            options={{ headerShown: false }}
            component={EventsDetails}
          />
          <Stack.Screen
            name="SeeAll "
            options={{ headerShown: false }}
            component={SeeAll}
          />

          <Stack.Screen
            name="Directory"
            options={{ headerShown: false }}
            component={Directory}
          />
          <Stack.Screen
            name="Message"
            options={{ headerShown: false }}
            component={Message}
          />
          <Stack.Screen
            name="Blog"
            options={{ headerShown: false }}
            component={Blog}
          />
          <Stack.Screen
            name="JobsSeeAll"
            options={{ headerShown: false }}
            component={JobsSeeAll}
          />
          <Stack.Screen
            name="MatrimonySeeAll"
            options={{ headerShown: false }}
            component={MatrimonySeeAll}
          />
          <Stack.Screen
            name="ProfileScreen"
            options={{ headerShown: false }}
            component={ProfileScreen}
          />
          <Stack.Screen
            name="Calendars"
            options={{ headerShown: false }}
            component={Calendars}
          />
          <Stack.Screen
            name="Mymatchdata"
            options={{ headerShown: false }}
            component={Mymatchdata}
          />
          <Stack.Screen
            name="Matrimony"
            options={{ headerShown: false }}
            component={Matrimony}
          />
          <Stack.Screen
            name="Jobsfirstscreen"
            options={{ headerShown: false }}
            component={Jobsfirstscreen}
          />
          <Stack.Screen
            name="Recruiter"
            options={{ headerShown: false }}
            component={Recruiter}
          />
          <Stack.Screen
            name="Managepostdata"
            options={{ headerShown: false }}
            component={Managepostdata}
          />
          <Stack.Screen
            name="EditPost"
            options={{ headerShown: false }}
            component={EditPost}
          />
          <Stack.Screen
            name="Viewdata"
            options={{ headerShown: false }}
            component={Viewdata}
          />
          <Stack.Screen
            name="Chats"
            options={{ headerShown: false }}
            component={Chats}
          />
          <Stack.Screen
            name="Messages"
            options={{ headerShown: false }}
            component={Messages}
          />
             
          <Stack.Screen
            name="Education"
            options={{ headerShown: false }}
            component={Education}
          />
            <Stack.Screen
            name="FamilyTree"
            options={{ headerShown: false }}
            component={FamilyTree}
          />
     
        <Stack.Screen
            name="Matrimonys"
            options={{ headerShown: false }}
            component={Matrimonys}
          />

         <Stack.Screen
            name="Profiles"
            options={{ headerShown: false }}
            component={Profiles}
          />

        <Stack.Screen
            name="JobsScreens"
            options={{ headerShown: false }}
            component={JobsScreens}
          />

         <Stack.Screen
            name="Directorys"
            options={{ headerShown: false }}
            component={Directorys}
          />
          
        

          <Stack.Screen
            name="directroy"
         
            component={Directroydata}
          />
        
          <Stack.Screen name="Verification" component={OtpScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

export default App;
