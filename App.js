import React, { createContext, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SeeAll from "./Screens/SeeAll";
import SignUp from "./Screens/AuthFile/SignUp";
import Signin from "./Screens/AuthFile/Signin";
import HomeScreen from "./Screens/HomeScreen";
import BottomNav from "./Screens/BottomNav";
import EventsDetails from "./Screens/EventsDetails";
import SplashScreen from "./Screens/SplashScreen";
import Matrimony from "./Screens/Matrimony/Matrimony";
import Directory from "./Screens/Directory/Directory";
import Message from "./Screens/Message";
import Blog from "./Screens/Blogs/Blog";
import JobsSeeAll from "./Screens/JobsSeeAll";
import MatrimonySeeAll from "./Screens/Matrimony/MatrimonySeeAll";
import ProfileScreen from "./Screens/ProfileScreen";
import Calendars from "./Screens/Calendars";
import OtpScreen from "./Screens/AuthFile/OtpScreen";
import Mymatchdata from "./Screens/MemberSearch/MemberProfile";
import Jobsfirstscreen from "./Screens/Jobsfirstscreen";
import Recruiter from "./Screens/Recruiter";
import Managepostdata from "./Screens/Jobs/Managepostdata";
import EditPost from "./Screens/Jobs/Edit.Post";
import Viewdata from "./Screens/Jobs/Viewdata";
import CreateProfile from "./Screens/CreateProfile";
import Directorys from "./Screens/Form/Directorys";
import Education from "./Screens/Form/Education";
import FamilyTree from "./Screens/Form/FamilyTree";
import JobsScreens from "./Screens/Form/JobsScreens";
import Matrimonys from "./Screens/Form/Matrimony";
import Profiles from "./Screens/Form/Profiles";
import Directroydata from "./Screens/Directory/Directroydata";
import JobsDetails from "./Screens/JobsDetails";
import Announcement from "./Screens/Announcement/Announcement";
import AnnouncementDetails from "./Screens/Announcement/AnnouncementDetails";
import Gallery from "./Screens/Gallery/Gallery";
import Album from "./Screens/Gallery/Album";
import MemberSearch from "./Screens/MemberSearch/MemberSearch";
import MemberProfile from "./Screens/MemberSearch/MemberProfile";
import PropertyList from "./Screens/Propertylist/PropertyList";
import PropertyListDetails from "./Screens/Propertylist/PropertyListDetails";
import AddProperty from "./Screens/Propertylist/AddProperty";
import PropertylistNav from "./Screens/Propertylist/PropertylistNav";
import UpdatePropertyList from "./Screens/Propertylist/UpdatePropertyList";
const Stack = createNativeStackNavigator();
import { StatusBar, View } from "react-native";
export const MyContext = createContext();
import AsyncStorage from "@react-native-async-storage/async-storage";
import ByAndSellNav from "./Screens/By&Sell/ByAndSellNav";
import ByDetalis from "./Screens/By&Sell/ByDetalis";
import MemberProfilelist from "./Screens/MemberSearch/MemberProfilelist";
import CarDetails from "./Screens/By&Sell/SellDetails/CarDetails";
import MobileDetails from "./Screens/By&Sell/SellDetails/MobileDetails";
import BikeDetails from "./Screens/By&Sell/SellDetails/BikeDetails";
import ElectronicsDetails from "./Screens/By&Sell/SellDetails/ElectronicsDetails";
import BicycleDetails from "./Screens/By&Sell/SellDetails/BicycleDetails";
import Accessories from "./Screens/By&Sell/SellDetails/AccessoriesDetails";
import FashionDetails from "./Screens/By&Sell/SellDetails/FashionDetails";
import FurnitureDetail from "./Screens/By&Sell/SellDetails/FurnitureDetail";
import ManageViewDetails from "./Screens/Propertylist/ManageViewDetails";
import ManageViewDetail from "./Screens/By&Sell/ManageViewDetails";
import BlogDetails from "./Screens/Blogs/BlogDetails";
function App() {
  const [data, setData] = React.useState();
  useEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem("profileid");

        if (value !== null) {
          setData(value);
        }
      } catch (e) {
        console.log(e);
      }
    };
    getData();
  });

  return (
    <View style={{ flex: 1 }}>
      <StatusBar style="auto" barStyle="dark-content" />
      <MyContext.Provider value={data}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="BottomNav"
              options={{ headerShown: false }}
              component={BottomNav}
            />

            <Stack.Screen
              name="SplashScreen"
              options={{ headerShown: false }}
              component={SplashScreen}
            />

            <Stack.Screen
              name="AddProperty"
              options={{ headerShown: true }}
              component={AddProperty}
            />

            <Stack.Screen
              name="MemberSearch"
              options={{ headerShown: true }}
              component={MemberSearch}
            />

            <Stack.Screen
              name="FamilyTree"
              options={{ headerShown: false }}
              component={FamilyTree}
            />

            <Stack.Screen
              name="JobsScreens"
              options={{ headerShown: false }}
              component={JobsScreens}
            />

            <Stack.Screen
              name="Matrimonys"
              options={{ headerShown: false }}
              component={Matrimonys}
            />

            <Stack.Screen
              name="MemberProfile"
              options={{ headerShown: false }}
              component={MemberProfile}
            />

            <Stack.Screen
              name="Directorys"
              options={{ headerShown: false }}
              component={Directorys}
            />

            <Stack.Screen
              name="SignUp"
              options={{ headerShown: false }}
              component={SignUp}
            />

            <Stack.Screen
              name="Profiles"
              options={{ headerShown: false }}
              component={Profiles}
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
              options={{ headerShown: true }}
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
              name="details"
              options={{ headerShown: true }}
              component={Managepostdata}
            />
            <Stack.Screen
              name="Edit"
              options={{ headerShown: true }}
              component={EditPost}
            />
            <Stack.Screen
              name="Viewdata"
              options={{ headerShown: false }}
              component={Viewdata}
            />

            <Stack.Screen
              name="Education"
              options={{ headerShown: false }}
              component={Education}
            />

            <Stack.Screen
              name="JobsDetails"
              options={{ headerShown: true }}
              component={JobsDetails}
            />

            <Stack.Screen
              name="Announcement"
              options={{ headerShown: false }}
              component={Announcement}
            />

            <Stack.Screen
              name="AnnouncementDetails"
              options={{ headerShown: false }}
              component={AnnouncementDetails}
            />

            <Stack.Screen
              name="Gellary"
              options={{ headerShown: false }}
              component={Gallery}
            />

            <Stack.Screen
              name="Album"
              options={{ headerShown: false }}
              component={Album}
            />

            <Stack.Screen
              name="PropertyList"
              options={{ headerShown: true }}
              component={PropertyList}
            />

            <Stack.Screen
              name="Details"
              options={{ headerShown: true }}
              component={PropertyListDetails}
            />

            <Stack.Screen
              name="PropertylistNav"
              options={{ headerShown: true }}
              component={PropertylistNav}
            />

            <Stack.Screen
              name="List Update"
              options={{ headerShown: true }}
              component={UpdatePropertyList}
            />

            <Stack.Screen
              name="Buy&Sell"
              options={{ headerShown: true }}
              component={ByAndSellNav}
            />
            <Stack.Screen
              name="ByDetalis"
              options={{ headerShown: false }}
              component={ByDetalis}
            />
            <Stack.Screen
              name="MemberProfilelist"
              options={{ headerShown: false }}
              component={MemberProfilelist}
            />

            <Stack.Screen
              name="CarDetails"
              options={{ headerShown: true }}
              component={CarDetails}
            />

            <Stack.Screen
              name="MobileDetails"
              options={{ headerShown: true }}
              component={MobileDetails}
            />
            <Stack.Screen
              name="BikeDetails"
              options={{ headerShown: true }}
              component={BikeDetails}
            />

            <Stack.Screen
              name="ElectronicsDetails"
              options={{ headerShown: true }}
              component={ElectronicsDetails}
            />

            <Stack.Screen
              name="BicycleDetails"
              options={{ headerShown: true }}
              component={BicycleDetails}
            />

            <Stack.Screen
              name="AccessoriesDetails"
              options={{ headerShown: true }}
              component={Accessories}
            />

            <Stack.Screen
              name="FashionDetails"
              options={{ headerShown: true }}
              component={FashionDetails}
            />
            <Stack.Screen
              name="FurnitureDetail"
              options={{ headerShown: true }}
              component={FurnitureDetail}
            />

            <Stack.Screen
              name="ManageViewDetails"
              options={{ headerShown: true }}
              component={ManageViewDetails}
            />
            <Stack.Screen
              name="ManageViewDetail"
              options={{ headerShown: true }}
              component={ManageViewDetail}
            />

            <Stack.Screen
              name="Blogs"
              options={{ headerShown: true }}
              component={BlogDetails}
            />
            <Stack.Screen name="directroy" component={Directroydata} />

            <Stack.Screen name="Verification" component={OtpScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </MyContext.Provider>
    </View>
  );
}

export default App;
