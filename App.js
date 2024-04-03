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
import Calendars from "./Screens/Calendars";
import OtpScreen from "./Screens/AuthFile/OtpScreen";
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
import MatrimonyData from "./Screens/Matrimony/MatrimonyData";
import Tablets from "./Screens/By&Sell/SellDetails/Tablets";
import ProfileEdits from "./Screens/Form/ProfileEdit/ProfileEdits";
import ProfileDetails from "./Screens/Form/ProfileEdit/ProfileDetails";
import EducationDetails from "./Screens/Form/ProfileEdit/EducationDetails";
import DirectoriesDetails from "./Screens/Form/ProfileEdit/DirectoriesDetails";
import MatrimonyDetails from "./Screens/Form/ProfileEdit/MatrimonyDetails";
import PropertyForm from "./Screens/Propertylist/PropertyForm";
import LandPlot from "./Screens/Propertylist/LandPlot";
import PgGuestHouse from "./Screens/Propertylist/PgGuestHouse";
import ShopOffice from "./Screens/Propertylist/ShopOffice";
import Notification from "./Screens/Notification/Notification";
import NotificationBlogs from "./Screens/Blogs/NotificationBlogs";
import Announcement from "./Screens/Announcement/Announcement";
import AnnouncementDetails from "./Screens/Announcement/AnnouncementDetails";
import BuySellSeeAll from "./Screens/By&Sell/Buy&SellSeeAll";
import PropertySeeAll from "./Screens/Propertylist/PropertySeeAll";
import FilteredResult from "./Screens/Matrimony/FilteredResult";
import { FilterDataProvider } from "./Screens/Matrimony/context/FilteredDataContext";
import Vehicle from "./Screens/By&Sell/Vehicle";
import Electronics from "./Screens/By&Sell/Electronics";
import JobsScreen from "./Screens/JobsScreen";
import ContactUsScreen from "./Screens/ContactUs";
import Settings from "./Screens/Settings";
import CV from "./Screens/Form/ProfileEdit/CV";
import MatrimonyFriends from "./Screens/Matrimony/MatrimonyFriends";
import MatrimonyProfileChats from "./Screens/Matrimony/MatrimonyProfileChats";
function App() {
  const [data, setData] = React.useState();
  useEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem("profileid");
        if (value !== null) {
          setData(value);
          console.warn(value);
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
          <FilterDataProvider>
            <Stack.Navigator>
              <Stack.Screen
                name="SplashScreen"
                options={{ headerShown: false }}
                component={SplashScreen}
              />

              <Stack.Screen
                name="BottomNav"
                options={{ headerShown: false }}
                component={BottomNav}
              />

              <Stack.Screen
                name="Education"
                options={{ headerShown: false }}
                component={Education}
              />

              <Stack.Screen
                name="Profiles"
                options={{ headerShown: false }}
                component={Profiles}
              />

              <Stack.Screen
                name="Matrimonys"
                options={{ headerShown: false }}
                component={Matrimonys}
              />

              <Stack.Screen
                name="FamilyTree"
                options={{ headerShown: false }}
                component={FamilyTree}
              />

              <Stack.Screen
                name="Directorys"
                options={{ headerShown: false }}
                component={Directorys}
              />

              <Stack.Screen
                name="Matrimony"
                options={{ headerShown: false }}
                component={Matrimony}
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
                name="JobsScreens"
                options={{ headerShown: true, title: "Job" }}
                component={JobsScreens}
              />

              <Stack.Screen
                name="MemberProfile"
                options={{ headerShown: false }}
                component={MemberProfile}
              />

              <Stack.Screen
                name="SignUp"
                options={{ headerShown: false }}
                component={SignUp}
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
                name="Events"
                options={{ headerShown: true }}
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
                name="jobs"
                options={{ headerShown: true }}
                component={JobsSeeAll}
              />
              <Stack.Screen
                name="matrimonys"
                options={{ headerShown: true }}
                component={MatrimonySeeAll}
              />
              <Stack.Screen
                name="Calendars"
                options={{ headerShown: false }}
                component={Calendars}
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
                options={{ headerShown: true, title: "Details" }}
                component={Viewdata}
              />

              <Stack.Screen
                name="JobsDetails"
                options={{ headerShown: true, title: "Details" }}
                component={JobsDetails}
              />

              <Stack.Screen
                name="Gallery"
                options={{ headerShown: true }}
                component={Gallery}
              />

              <Stack.Screen
                name="Album"
                options={{ headerShown: true }}
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
                options={{ headerShown: true, title: "Car" }}
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

              <Stack.Screen
                name="MatrimonyData"
                options={{ headerShown: false }}
                component={MatrimonyData}
              />

              <Stack.Screen
                name="Tablets"
                options={{ headerShown: true }}
                component={Tablets}
              />

              <Stack.Screen
                name="Profile"
                options={{
                  title: "Profile",
                }}
                component={ProfileEdits}
              />

              <Stack.Screen
                name="ProfileDetails"
                options={{
                  title: "Profile",
                }}
                component={ProfileDetails}
              />
              <Stack.Screen
                name="EducationDetails"
                options={{
                  title: "Education",
                }}
                component={EducationDetails}
              />

              <Stack.Screen
                name="DirectoriesDetails"
                options={{
                  title: "Directorie",
                }}
                component={DirectoriesDetails}
              />

              <Stack.Screen
                name="MatrimonyDetails"
                options={{
                  title: "Matrimony",
                }}
                component={MatrimonyDetails}
              />

              <Stack.Screen
                name="PropertyForm"
                options={{
                  title: "Property",
                }}
                component={PropertyForm}
              />

              <Stack.Screen
                name="LandPlot"
                options={{
                  title: "Lands & Plots",
                }}
                component={LandPlot}
              />

              <Stack.Screen
                name="PgGuestHouse"
                options={{
                  title: "PG & GuestHouse",
                }}
                component={PgGuestHouse}
              />

              <Stack.Screen
                name="ShopOffice"
                options={{
                  title: "Shop & Office",
                }}
                component={ShopOffice}
              />

              <Stack.Screen
                name="Notification"
                options={{
                  title: "Notification",
                }}
                component={Notification}
              />

              <Stack.Screen
                name="NotificationBlogs"
                options={{
                  title: "Blogs",
                }}
                component={NotificationBlogs}
              />

              <Stack.Screen
                name="Announcement"
                options={{
                  title: "Announcement",
                }}
                component={Announcement}
              />

              <Stack.Screen
                name="AnnouncementDetails"
                options={{
                  title: "Announcement",
                }}
                component={AnnouncementDetails}
              />

              <Stack.Screen
                name="BuySellSeeAll"
                options={{
                  title: "Buy & Sell",
                }}
                component={BuySellSeeAll}
              />

              <Stack.Screen
                name="PropertySeeAll"
                options={{
                  title: "Property",
                }}
                component={PropertySeeAll}
              />

              <Stack.Screen
                name="FilteredResult"
                options={{}}
                component={FilteredResult}
              />

              <Stack.Screen
                name="PropertylistNav"
                options={{
                  title: "Property",
                }}
                component={PropertylistNav}
              />

              <Stack.Screen
                name="Vehicle"
                options={{
                  title: "Vehicle",
                }}
                component={Vehicle}
              />

              <Stack.Screen
                name="Electronics"
                options={{
                  title: "Electronics",
                }}
                component={Electronics}
              />

              <Stack.Screen
                name="JobsScreen"
                options={{
                  headerShown: false,
                }}
                component={JobsScreen}
              />

              <Stack.Screen
                name="ContactUsScreen"
                options={{
                  title: "ContactUs",
                }}
                component={ContactUsScreen}
              />

              <Stack.Screen
                name="Settings"
                options={{
                  title: "Settings",
                }}
                component={Settings}
              />

              <Stack.Screen
                name="CV"
                options={{
                  title: "CV",
                }}
                component={CV}
              />

              <Stack.Screen
                name="MatrimonyFriends"
                options={{
                  title: "Friends",
                }}
                component={MatrimonyFriends}
              />

              <Stack.Screen
                name="MatrimonyProfileChats"
                options={{
                  headerShown: false,
                }}
                component={MatrimonyProfileChats}
              />

              <Stack.Screen name="directroy" component={Directroydata} />

              <Stack.Screen name="Verification" component={OtpScreen} />
            </Stack.Navigator>
          </FilterDataProvider>
        </NavigationContainer>
      </MyContext.Provider>
    </View>
  );
}

export default App;
