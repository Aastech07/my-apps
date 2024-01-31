import React, { useMemo, useState } from "react";
import { ScrollView, View, Text, Switch } from "react-native";
import Slider from "@react-native-community/slider";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import {
  MultipleSelectList,
  SelectList,
} from "react-native-dropdown-select-list";
import RadioGroup from "react-native-radio-buttons-group";
const Search = () => {
  const [marital, setMarital] = useState("");
  const [religion, setReligion] = useState("");
  const [community, setCommunity] = useState("");
  const [mangglik, setMangglik] = useState("");
  const [country, setCountry] = useState("");
  const [countrys, setCountrys] = useState("");
  const [residency, setResidency] = useState("");
  const [photos, setPhotos] = useState("");
  const [mothertongue, SetMotherTongue] = useState("");
  const [stateliving, SetStateLiving] = useState("");
  const [qualification, setQualification] = useState("");
  const [educationarea, setEducationArea] = useState("");
  const [workingwith, setWorkingWith] = useState("");
  const [professionarea, setProfessionArea] = useState("");
  const [dite, setDite] = useState("");
  const [profilecreate, setProfilecreate] = useState("");
  const [show, setShow] = useState(false);

  const radioButtons = useMemo(
    () => [
      {
        id: "1",
        label: "Doesn't Matter",
        value: "option1",
      },
      {
        id: "2",
        label: "Specify an Inco",
        value: "option2",
      },
    ],
    []
  );

  const Marital = [
    { key: "1", value: "Doesn't Matter" },
    { key: "2", value: "Never Married" },
    { key: "3", value: "Divorced" },
    { key: "4", value: "Widowed" },
    { key: "5", value: "Awaiting Divorce" },
    { key: "6", value: "Diary Products" },
    { key: "7", value: "Annulled" },
  ];

  const Religion = [
    { key: "1", value: "Doesn't Matter" },
    { key: "2", value: "Hindu" },
    { key: "3", value: "Muslim" },
    { key: "4", value: "Christian" },
    { key: "5", value: "Sikh" },
    { key: "6", value: "Parsi" },
    { key: "7", value: "Jain" },
    { key: "8", value: "Buddhist" },
    { key: "9", value: "Jewish" },
    { key: "10", value: "No Religion" },
    { key: "11", value: "Spritual - not religious" },
    { key: "11", value: "Other" },
  ];

  const Community = [
    { key: "1", value: "Digambar" },
    { key: "2", value: "Shetamber" },
    { key: "3", value: "Vania" },
    { key: "4", value: "Porwal" },
  ];

  const Qualification = [
    { key: "1", value: "Doesn't Matter" },
    { key: "2", value: "Doctorate" },
    { key: "3", value: "Master" },
    { key: "4", value: "Bachelor / UnderGraduate" },
    { key: "5", value: "Associate / Diploma" },
    { key: "6", value: "High School and Below" },
  ];

  const Diet = [
    { key: "1", value: "Doesn't Matter" },
    { key: "2", value: "Veg" },
    { key: "3", value: "Jain" },
    { key: "4", value: "Vegan" },
    { key: "5", value: "Non-veg" },
    { key: "6", value: "Other" },
  ];

  const WorkingWith = [
    { key: "1", value: "Doesn't Matter" },
    { key: "2", value: "Private Company" },
    { key: "3", value: "Government / Public Sector" },
    { key: "4", value: "Defense / Civil Services" },
    { key: "5", value: "Business / Self Employed" },
    { key: "6", value: "Not Working" },
  ];

  const Mangglik = [
    { key: "1", value: "Doesn't Matter" },
    { key: "2", value: "Only Mangliks" },
    { key: "3", value: "No Mangliks" },
  ];

  const Country = [
    { key: "1", value: "Doesn't Matter" },
    { key: "2", value: "India" },
    { key: "3", value: "USA" },
    { key: "4", value: "Uk" },
    { key: "5", value: "UAE" },
    { key: "6", value: "Canada" },
    { key: "7", value: "Australia" },
    { key: "8", value: "New Zealand" },
    { key: "9", value: "Pakistan" },
    { key: "10", value: "Saudi Arabia" },
    { key: "11", value: "Kuwait" },
    { key: "11", value: "South Africa" },
  ];

  const Countrys = [
    { key: "1", value: "Doesn't Matter" },
    { key: "2", value: "India" },
    { key: "3", value: "USA" },
    { key: "4", value: "Uk" },
    { key: "5", value: "UAE" },
    { key: "6", value: "Canada" },
    { key: "7", value: "Australia" },
    { key: "8", value: "New Zealand" },
    { key: "9", value: "Pakistan" },
    { key: "10", value: "Saudi Arabia" },
    { key: "11", value: "Kuwait" },
    { key: "11", value: "South Africa" },
  ];

  const EducationArea = [
    { key: "1", value: "Doesn't Matter" },
    { key: "2", value: "Engineering" },
    { key: "3", value: "Arts / Desing" },
    { key: "4", value: "Finance / Commerce" },
    { key: "5", value: "Computers / IT" },
    { key: "6", value: "Science" },
    { key: "7", value: "Medicine" },
    { key: "8", value: "Managemant" },
    { key: "9", value: "Law" },
  ];

  const Profilecreate = [
    { key: "1", value: "Doesn't Matter" },
    { key: "2", value: "Self" },
    { key: "3", value: "Parent / Guardian" },
    { key: "4", value: "Sibling / Fiend / Other" },
  ];

  const Residency = [
    { key: "1", value: "Doesn't Matter" },
    { key: "2", value: "Work/Student Visa" },
    { key: "3", value: "Citizen/Permanent Resident" },
  ];

  const Photo = [
    { key: "1", value: "Doesn't Matter" },
    { key: "2", value: "Visible to all" },
    { key: "3", value: "Protected Photo" },
  ];

  const MotherTongue = [
    { key: "1", value: "Doesn't Matter" },
    { key: "2", value: "Assamese" },
    { key: "3", value: "Bengali" },
    { key: "4", value: "English" },
    { key: "5", value: "Gujarati" },
    { key: "6", value: "Hindi" },
    { key: "7", value: "Kannada" },
    { key: "8", value: "Konkani" },
    { key: "9", value: "Malayalam" },
    { key: "10", value: "Marathi" },
    { key: "11", value: "Marwari" },
    { key: "11", value: "Odia" },
    { key: "12", value: "Punjabi" },
    { key: "13", value: "Sindhi" },
    { key: "14", value: "Tamil" },
    { key: "15", value: "Telugu" },
    { key: "16", value: "Urdu" },
    { key: "17", value: "Aka" },
    { key: "18", value: "Arabic" },
    { key: "19", value: "Arunachali" },
    { key: "20", value: "Awadhi" },
    { key: "21", value: "Baluchi" },
    { key: "22", value: "Bhojpuri" },
    { key: "23", value: "Bhutia" },
    { key: "24", value: "Brahui" },
    { key: "25", value: "Brij" },
    { key: "26", value: "Burmese" },
    { key: "27", value: "Chattisgarhi" },
    { key: "28", value: "Chinese" },
    { key: "29", value: "Coorgi" },
    { key: "30", value: "Dogi" },
    { key: "31", value: "French" },
    { key: "32", value: "Garhwali" },
    { key: "33", value: "Garo" },
    { key: "34", value: "Haryanavi" },
    { key: "35", value: "Himachali/Pahari" },
    { key: "36", value: "Hindko" },
    { key: "37", value: "Kakbarak" },
    { key: "38", value: "Kanauji" },
    { key: "39", value: "Kashmiri" },
    { key: "40", value: "Khandesi" },
    { key: "41", value: "Khasi" },
    { key: "42", value: "Koshali" },
    { key: "43", value: "Kumaoni" },
    { key: "44", value: "Kutchi" },
    { key: "45", value: "Ladakhi" },
    { key: "46", value: "Lepcha" },
    { key: "47", value: "Magahi" },
    { key: "48", value: "Maithili" },
    { key: "49", value: "Malay" },
    { key: "50", value: "Manipuri" },
    { key: "51", value: "Miji" },
    { key: "52", value: "Mizo" },
    { key: "53", value: "Monpa" },
    { key: "54", value: "Nepali" },
    { key: "55", value: "Pashto" },
    { key: "56", value: "Persian" },
    { key: "57", value: "Rajasthani" },
    { key: "58", value: "Russian" },
    { key: "59", value: "Santhali" },
    { key: "60", value: "Seraiki" },
    { key: "61", value: "Sinhala" },
    { key: "62", value: "Sourashtra" },
    { key: "63", value: "Spanish" },
    { key: "64", value: "Swedish" },
    { key: "65", value: "Tagalog" },
    { key: "66", value: "Tulu" },
    { key: "67", value: "Other" },
  ];
  const Stateliving = [
    { key: "1", value: "Doesn't Matter" },
    { key: "2", value: "Andaman & Nicobar" },
    { key: "3", value: "Andhra Pradesh" },
    { key: "4", value: "Arunachal Pradesh" },
    { key: "5", value: "Assam" },
    { key: "6", value: "Bihar" },
    { key: "7", value: "Chandigarh" },
    { key: "8", value: "Chhattisgarh" },
    { key: "9", value: "Dadra & Nagar Haveli" },
    { key: "10", value: "Daman & Diu" },
    { key: "11", value: "Delhi-NCR" },
    { key: "12", value: "Goa" },
    { key: "13", value: "Gujarati" },
    { key: "14", value: "Haryana" },
    { key: "15", value: "Himachal Pradesh" },
    { key: "16", value: "Jammu & Kashmir" },
    { key: "17", value: "JharKhand" },
    { key: "18", value: "Karnataka" },
    { key: "19", value: "Kerala" },
    { key: "20", value: "Lakshadweep" },
    { key: "21", value: "Madhya Pradesh" },
    { key: "22", value: "Maharashtra" },
    { key: "23", value: "Manipur" },
    { key: "24", value: "Meghalaya" },
    { key: "25", value: "Mizoram" },
    { key: "26", value: "Nagaland" },
    { key: "27", value: "Orissa" },
    { key: "28", value: "Pondicherry" },
    { key: "29", value: "Punjab" },
    { key: "30", value: "Rajashan" },
    { key: "31", value: "Sikkim" },
    { key: "32", value: "Tamil Nadu" },
    { key: "33", value: "Telangana" },
    { key: "34", value: "Tripura" },
    { key: "35", value: "Uttar Pradesh" },
    { key: "36", value: "Uttaranchal" },
    { key: "37", value: "West Bengal" },
  ];

  const ProfessionArea = [
    { key: "1", value: "Doesn't Matter" },
    { key: "2", value: "Accounting, Banking & Finace" },
    { key: "3", value: "Administration & HR" },
    { key: "4", value: "Advertising, Media & Entertainment" },
    { key: "5", value: "Agriculture" },
    { key: "6", value: "Airline & Aviation" },
    { key: "7", value: "Architecture & Desing" },
    { key: "8", value: "Artists, Animators & Web Designers" },
    { key: "9", value: "BPO,KPO, & Customer Support" },
    { key: "10", value: "Beauty,Fashion & Jewellery Desiners" },
    { key: "11", value: "Civil Services/Law Enforcement" },
    { key: "12", value: "Corporate Professionals" },
    { key: "13", value: "Defense" },
    { key: "14", value: "Education & Training" },
    { key: "15", value: "Engineering" },
    { key: "16", value: "Hotel & Hospitality" },
    { key: "17", value: "IT & Software Engineering" },
    { key: "18", value: "Legal" },
    { key: "19", value: "Medical & Healthcare" },
    { key: "20", value: "Merchant Navy" },
    { key: "21", value: "Non Working" },
    { key: "22", value: "Others" },
    { key: "23", value: "Sales & Marketing" },
    { key: "24", value: "Science" },
  ];

  const [selectedId, setSelectedId] = useState();
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  return (
    <ScrollView
      style={{ flex: 1,backgroundColor:'#fff' }}
      contentContainerStyle={{ paddingBottom: responsiveHeight(40) }}
    >
      <Text
        style={{
          fontSize: 20,
          top: responsiveWidth(2),
          left: responsiveWidth(6),
          fontWeight: "500",
          textDecorationLine: "underline",
        }}
      >
        Search by Criteria
      </Text>
      <View
        style={{
          alignContent: "center",
          alignItems: "center",
          flex: 1,
          top: 20,
        }}
      >
        <Text style={{ right: responsiveWidth(40), fontSize: 12 }}>Age</Text>
        <Text style={{ right: responsiveWidth(34), fontSize: 15 }}>
          Min 18 yrs
        </Text>
        <Text
          style={{
            right: responsiveWidth(10),
            fontSize: 15,
            position: "absolute",
            top: 15,
          }}
        >
          Max 30 yrs
        </Text>
        <Slider
          style={{ width: responsiveWidth(95), height: 40 }}
          minimumValue={0}
          maximumValue={1}
          minimumTrackTintColor="blue"
          maximumTrackTintColor="#000000"
          vertical={true}
        />
      </View>
      <View
        style={{
          alignContent: "center",
          alignItems: "center",
          flex: 1,
          top: 30,
        }}
      >
        <Text style={{ right: responsiveWidth(37), fontSize: 12 }}>Height</Text>
        <Text style={{ right: responsiveWidth(34), fontSize: 15 }}>
          Min 4'11
        </Text>
        <Text
          style={{
            right: responsiveWidth(10),
            fontSize: 15,
            position: "absolute",
            top: 15,
          }}
        >
          Max 5'5
        </Text>
        <Slider
          style={{ width: responsiveWidth(95), height: 40 }}
          minimumValue={0}
          maximumValue={1}
          minimumTrackTintColor="blue"
          maximumTrackTintColor="#000000"
          vertical={true}
        />
      </View>
      <View style={{ top: responsiveHeight(5) }}>
        <Text
          style={{
            fontSize: responsiveFontSize(2),
            left: responsiveWidth(6),
            marginBottom: 2,
          }}
        >
          marital Status
        </Text>
        <SelectList
          setSelected={(val) => setMarital(val)}
          data={Marital}
          save="value"
          boxStyles={{
            marginLeft: responsiveWidth(5),
            marginRight: responsiveWidth(5),
          }}
          dropdownStyles={{
            marginLeft: responsiveWidth(5),
            marginRight: responsiveWidth(5),
          }}
        />
      </View>

      <View style={{ top: responsiveHeight(7) }}>
        <Text
          style={{
            fontSize: responsiveFontSize(2),
            left: responsiveWidth(6),
            marginBottom: 2,
          }}
        >
          Religion
        </Text>
        <SelectList
          setSelected={(val) => setReligion(val)}
          data={Religion}
          save="value"
          boxStyles={{
            marginLeft: responsiveWidth(5),
            marginRight: responsiveWidth(5),
          }}
          dropdownStyles={{
            marginLeft: responsiveWidth(5),
            marginRight: responsiveWidth(5),
          }}
        />
      </View>

      <View style={{ top: responsiveHeight(9) }}>
        <Text
          style={{
            fontSize: responsiveFontSize(2),
            left: responsiveWidth(6),
            marginBottom: 2,
          }}
        >
          Community
        </Text>
        <SelectList
          setSelected={(val) => setCommunity(val)}
          data={Community}
          save="value"
          boxStyles={{
            marginLeft: responsiveWidth(5),
            marginRight: responsiveWidth(5),
          }}
          dropdownStyles={{
            marginLeft: responsiveWidth(5),
            marginRight: responsiveWidth(5),
          }}
        />
      </View>

      <View style={{ top: responsiveHeight(11) }}>
        <Text
          style={{
            fontSize: responsiveFontSize(2),
            left: responsiveWidth(6),
            marginBottom: 2,
          }}
        >
          Mother Tongue
        </Text>
        <SelectList
          setSelected={(val) => SetMotherTongue(val)}
          data={MotherTongue}
          save="value"
          boxStyles={{
            marginLeft: responsiveWidth(5),
            marginRight: responsiveWidth(5),
          }}
          dropdownStyles={{
            marginLeft: responsiveWidth(5),
            marginRight: responsiveWidth(5),
          }}
        />
      </View>

      <View style={{ top: responsiveHeight(13) }}>
        <Text
          style={{
            fontSize: responsiveFontSize(2),
            left: responsiveWidth(6),
            marginBottom: 2,
          }}
        >
          Manglik / Chevvai Dosham
        </Text>
        <SelectList
          setSelected={(val) => setMangglik(val)}
          data={Mangglik}
          save="value"
          boxStyles={{
            marginLeft: responsiveWidth(5),
            marginRight: responsiveWidth(5),
          }}
          dropdownStyles={{
            marginLeft: responsiveWidth(5),
            marginRight: responsiveWidth(5),
          }}
        />
      </View>

      <View style={{ top: responsiveHeight(15) }}>
        <Text
          style={{
            fontSize: responsiveFontSize(2),
            left: responsiveWidth(6),
            marginBottom: 2,
          }}
        >
          Country living in
        </Text>
        <SelectList
          setSelected={(val) => setCountry(val)}
          data={Country}
          save="value"
          boxStyles={{
            marginLeft: responsiveWidth(5),
            marginRight: responsiveWidth(5),
          }}
          dropdownStyles={{
            marginLeft: responsiveWidth(5),
            marginRight: responsiveWidth(5),
          }}
        />
      </View>

      <View style={{ top: responsiveHeight(17) }}>
        <Text
          style={{
            fontSize: responsiveFontSize(2),
            left: responsiveWidth(6),
            marginBottom: 2,
          }}
        >
          State living in
        </Text>
        <SelectList
          setSelected={(val) => SetStateLiving(val)}
          data={Stateliving}
          save="value"
          boxStyles={{
            marginLeft: responsiveWidth(5),
            marginRight: responsiveWidth(5),
          }}
          dropdownStyles={{
            marginLeft: responsiveWidth(5),
            marginRight: responsiveWidth(5),
          }}
        />
      </View>

      <View style={{ top: responsiveHeight(19) }}>
        <Text
          style={{
            fontSize: responsiveFontSize(2),
            left: responsiveWidth(6),
            marginBottom: 2,
          }}
        >
          Country grew up in
        </Text>
        <SelectList
          setSelected={(val) => setCountrys(val)}
          data={Countrys}
          save="value"
          boxStyles={{
            marginLeft: responsiveWidth(5),
            marginRight: responsiveWidth(5),
          }}
          dropdownStyles={{
            marginLeft: responsiveWidth(5),
            marginRight: responsiveWidth(5),
          }}
        />
      </View>

      <View style={{ top: responsiveHeight(21) }}>
        <Text
          style={{
            fontSize: responsiveFontSize(2),
            left: responsiveWidth(6),
            marginBottom: 2,
          }}
        >
          Residency Status
        </Text>
        <SelectList
          setSelected={(val) => setResidency(val)}
          data={Residency}
          save="value"
          boxStyles={{
            marginLeft: responsiveWidth(5),
            marginRight: responsiveWidth(5),
          }}
          dropdownStyles={{
            marginLeft: responsiveWidth(5),
            marginRight: responsiveWidth(5),
          }}
        />
      </View>

      <View style={{ top: responsiveHeight(23) }}>
        <Text
          style={{
            fontSize: responsiveFontSize(2),
            left: responsiveWidth(6),
            marginBottom: 2,
          }}
        >
          Photo Setting
        </Text>
        <SelectList
          setSelected={(val) => setPhotos(val)}
          data={Photo}
          save="value"
          boxStyles={{
            marginLeft: responsiveWidth(5),
            marginRight: responsiveWidth(5),
          }}
          dropdownStyles={{
            marginLeft: responsiveWidth(5),
            marginRight: responsiveWidth(5),
          }}
        />
      </View>
      {show ? (
        <Text
          onPress={() => setShow(!show)}
          style={{
            textAlign: "center",
            top: responsiveHeight(23.5),
            left: -80,
            color: "blue",
            fontSize: 15,
            fontWeight: "500",
          }}
        >
          less Search Options▲
        </Text>
      ) : (
        <Text
          onPress={() => setShow(!show)}
          style={{
            textAlign: "center",
            top: responsiveHeight(23.5),
            left: -80,
            color: "blue",
            fontSize: 15,
            fontWeight: "500",
          }}
        >
          More Search Options▼
        </Text>
      )}

      {show ? (
        <>
          <Text
            style={{
              fontSize: responsiveFontSize(2.5),
              left: responsiveWidth(6),
              top: responsiveHeight(25),
              fontWeight: "500",
            }}
          >
            Education & Profession Details.
          </Text>
          <View style={{ top: responsiveHeight(25) }}>
            <Text
              style={{
                fontSize: responsiveFontSize(2),
                left: responsiveWidth(6),
                marginBottom: 2,
              }}
            >
              Qualification
            </Text>
            <SelectList
              setSelected={(val) => setQualification(val)}
              data={Qualification}
              save="value"
              boxStyles={{
                marginLeft: responsiveWidth(5),
                marginRight: responsiveWidth(5),
              }}
              dropdownStyles={{
                marginLeft: responsiveWidth(5),
                marginRight: responsiveWidth(5),
              }}
            />
          </View>
          <View style={{ top: responsiveHeight(27) }}>
            <Text
              style={{
                fontSize: responsiveFontSize(2),
                left: responsiveWidth(6),
                marginBottom: 2,
              }}
            >
              Education Area
            </Text>
            <SelectList
              setSelected={(val) => setEducationArea(val)}
              data={EducationArea}
              save="value"
              boxStyles={{
                marginLeft: responsiveWidth(5),
                marginRight: responsiveWidth(5),
              }}
              dropdownStyles={{
                marginLeft: responsiveWidth(5),
                marginRight: responsiveWidth(5),
              }}
            />
          </View>
          <View style={{ top: responsiveHeight(29) }}>
            <Text
              style={{
                fontSize: responsiveFontSize(2),
                left: responsiveWidth(6),
                marginBottom: 2,
              }}
            >
              Working With
            </Text>
            <SelectList
              setSelected={(val) => setWorkingWith(val)}
              data={WorkingWith}
              save="value"
              boxStyles={{
                marginLeft: responsiveWidth(5),
                marginRight: responsiveWidth(5),
              }}
              dropdownStyles={{
                marginLeft: responsiveWidth(5),
                marginRight: responsiveWidth(5),
              }}
            />
          </View>
          <View style={{ top: responsiveHeight(31) }}>
            <Text
              style={{
                fontSize: responsiveFontSize(2),
                left: responsiveWidth(6),
                marginBottom: 2,
              }}
            >
              Profession Area
            </Text>
            <SelectList
              setSelected={(val) => setProfessionArea(val)}
              data={ProfessionArea}
              save="value"
              boxStyles={{
                marginLeft: responsiveWidth(5),
                marginRight: responsiveWidth(5),
              }}
              dropdownStyles={{
                marginLeft: responsiveWidth(5),
                marginRight: responsiveWidth(5),
              }}
            />
          </View>
          <Text
            style={{
              fontSize: responsiveFontSize(2.5),
              left: responsiveWidth(6),
              top: responsiveHeight(31),
              fontWeight: "500",
            }}
          >
            Annual Income.
          </Text>
          <View
            style={{ top: responsiveHeight(33), right: responsiveWidth(28) }}
          >
            <RadioGroup
              radioButtons={radioButtons}
              onPress={setSelectedId}
              selectedId={selectedId}
              containerStyle={{}}
            />
          </View>
          <Text
            style={{
              fontSize: responsiveFontSize(2.5),
              left: responsiveWidth(6),
              top: responsiveHeight(34),
              fontWeight: "500",
            }}
          >
            Lifestyle & Apperance.
          </Text>
          <View style={{ top: responsiveHeight(35) }}>
            <Text
              style={{
                fontSize: responsiveFontSize(2),
                left: responsiveWidth(6),
                marginBottom: 2,
              }}
            >
              Diet
            </Text>
            <SelectList
              setSelected={(val) => setDite(val)}
              data={Diet}
              save="value"
              boxStyles={{
                marginLeft: responsiveWidth(5),
                marginRight: responsiveWidth(5),
              }}
              dropdownStyles={{
                marginLeft: responsiveWidth(5),
                marginRight: responsiveWidth(5),
              }}
            />
          </View>
          <Text
            style={{
              fontSize: responsiveFontSize(2.5),
              left: responsiveWidth(6),
              top: responsiveHeight(37),
              fontWeight: "500",
            }}
          >
            Other Details.
          </Text>
          <View style={{ top: responsiveHeight(38) }}>
            <Text
              style={{
                fontSize: responsiveFontSize(2),
                left: responsiveWidth(6),
                marginBottom: 2,
              }}
            >
              Profile Created by
            </Text>
            <SelectList
              setSelected={(val) => setProfilecreate(val)}
              data={Profilecreate}
              save="value"
              boxStyles={{
                marginLeft: responsiveWidth(5),
                marginRight: responsiveWidth(5),
              }}
              dropdownStyles={{
                marginLeft: responsiveWidth(5),
                marginRight: responsiveWidth(5),
              }}
            />
          </View>
        </>
      ) : null}
    </ScrollView>
  );
};

export default Search;
