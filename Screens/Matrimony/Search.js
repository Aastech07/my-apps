import React, { useContext, useEffect, useState } from "react";
import { ScrollView, View, Text, StyleSheet } from "react-native";
import RangeSlider from "react-native-range-slider-expo";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { SelectList } from "react-native-dropdown-select-list";
import {
  Marital,
  Mangglik,
  Diet,
  Qualification,
  EducationArea,
} from "./Api";
import { TouchableOpacity } from "react-native";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import axios from "axios";
import { api } from "../Api";
import FilterDataContext from "./context/FilteredDataContext";
import { useNavigation } from "@react-navigation/native";
const Search = () => {
  const navigation = useNavigation();
  const [marital, setMarital] = useState("");
  const [mangglik, setMangglik] = useState("");
  const [countrys, setCountrys] = useState("");
  const [qualification, setQualification] = useState("");
  const [educationarea, setEducationArea] = useState("");
  const [dite, setDite] = useState("");
  const [fromValue, setFromValue] = useState(18);
  const [toValue, setToValue] = useState(70);
  const [fromHValue, setFromHValue] = useState(3);
  const [toHValue, setToHValue] = useState(7);
  const [data, setData] = useState();
  const { setFilteredData } = useContext(FilterDataContext);
  const [fetchCountrys, setFetchCountrys] = useState([]);
  const [fetchStates, setFetchState] = useState([]);
  const [fetchCitys, setFetchCity] = useState([]);
  const [states, setStates] = useState([]);
  const [Citys, setCitys] = useState([]);

  const convertToFeetInches = (cm) => {
    const totalInches = cm * 0.393701;
    const feet = Math.floor(totalInches / 12);
    const inches = Math.round(totalInches % 12);
    return `${feet}' ${inches}"`;
  };

  const obj = {
    marital,
    mangglik,
    countrys,
    qualification,
    educationarea,
    dite,
    Citys,
    states,
  };
  const convertAge = (string) => {
    // Parse the original date string
    const originalDateString = string;
    const originalDate = new Date(originalDateString);

    // Get current date
    const currentDate = new Date();

    // Calculate the difference in milliseconds
    const differenceInMilliseconds = currentDate - originalDate;

    // Convert milliseconds to years
    const millisecondsInYear = 1000 * 60 * 60 * 24 * 365.25; // Approximate milliseconds in a year (including leap years)
    const age = Math.floor(differenceInMilliseconds / millisecondsInYear);
    return age;
  };
  let keyPairObj = {
    mangglik: "astroDetails.manglikChevvaidosham",
    marital: "profileId.maritalStatus",
    qualification: "educationAndCareer.highestQualification",
    educationAdrea: "educationAndCareer.workingWit",
    HeightArr: "height",
    ageArr: "age",
    Citys: "profileId.address.city",
    states: "profileId.address.state",
    countrys: "profileId.address.country",
    dite: "lifestyle",
    educationarea: "educationAndCareer.workingAs",
  };
  const handleSubmit = () => {
    let ageArr = [];
    let HeightArr = [];
    const entries = Object.entries(obj);
    for (let i = fromHValue * 10; i < (toHValue + 1) * 10; i++) {
      HeightArr.push(i / 10);
    }
    for (let i = fromValue; i <= toValue; i++) {
      ageArr.push(i);
    }
    try {
      const nonEmpty = entries.filter((e) => {
        return e[1].length > 0;
      });

      let filters = nonEmpty.map((e) => {
        return [keyPairObj[e[0]], e[1]];
      });
  
      const applyFilter = (filters) => {
        const heightAgeFiltered = data.filter((ha) => {
          return ageArr.includes(convertAge(ha.profileId.dateOfBirth));
        });
        return heightAgeFiltered.filter((item) => {
          // Check if all filter criteria are satisfied
          return filters.every(([key, value]) => {
            // Extract nested properties if key contains dots
            const keys = key.split(".");
            const filteredValue = keys.reduce(
              (obj, k) => (obj && obj[k] ? obj[k] : null),
              item
            );
            // Compare filtered value with filter value
            return filteredValue === value;
          });
        });
      };
      let filteredData = applyFilter(filters);
      filteredData.filter((elem) => {
        return HeightArr.includes(elem.height);
      });
      setFilteredData(filteredData)
      navigation.navigate("FilteredResult");
    } catch (error) {
      console.log(error)
    }

  };


  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`${api}/matrimonial/profiles`);
        setData(data);
        // setFilteredData(data); // Initialize filtered data with all data
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.countrystatecity.in/v1/countries",
          {
            headers: {
              "X-CSCAPI-KEY":
                "YWdZbVBYYTRXNml4WEFuMGdvYlVZeEhmaUZoOHFWWm9oUXFiQm03Rw==",
            },
          }
        );
        let newArray = response.data.map((item) => {
          return { key: item.id, value: item.name };
        });
        setFetchCountrys(newArray);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const fetchState = async () => {
    try {
      const response = await axios.get(
        `https://api.countrystatecity.in/v1/countries/${
          countrys[0] + countrys[1]
        }/states`,
        {
          headers: {
            "X-CSCAPI-KEY":
              "YWdZbVBYYTRXNml4WEFuMGdvYlVZeEhmaUZoOHFWWm9oUXFiQm03Rw==",
          },
        }
      );
      console.log(response.data);
      setFetchState(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCity = async () => {
    try {
      const response = await axios.get(
        `https://api.countrystatecity.in/v1/countries/${
          countrys[0] + countrys[1]
        }/states/${states[0] + states[1]}/cities`,
        {
          headers: {
            "X-CSCAPI-KEY":
              "YWdZbVBYYTRXNml4WEFuMGdvYlVZeEhmaUZoOHFWWm9oUXFiQm03Rw==",
          },
        }
      );
      setFetchCity(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const stateNames = fetchStates.map((state) => {
    return {
      value: `${state.iso2} ${state.name}`,
      key: state.id,
    };
  });

  const cityNames = fetchCitys.map((city) => ({
    value: `${city.name}`,
    key: city.id,
  }));
  return (
    <>
      <ScrollView
        style={{ flex: 1, backgroundColor: "#fff" }}
        contentContainerStyle={{ paddingBottom: responsiveHeight(37) }}
      >
        <Text
          style={{
            fontSize: 20,
            top: responsiveWidth(2),
            left: responsiveWidth(6),
            fontWeight: "500",
            // textDecorationLine: "underline",
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
          <Text style={{ right: responsiveWidth(38), fontSize: 12 }}>Age</Text>
          <Text style={{ right: responsiveWidth(34), fontSize: 15, top: 10 }}>
            {fromValue} yrs
          </Text>

          <View>
            <RangeSlider
              min={18}
              max={70}
              fromValueOnChange={(value) => setFromValue(value)}
              toValueOnChange={(value) => setToValue(value)}
              initialFromValue={18}
              styleSize={"small"}
              barHeight={4}
              knobSize={24}
              inRangeBarColor={"tomato"}
            />
          </View>
          <Text
            style={{ left: responsiveWidth(34), fontSize: 15, bottom: 160 }}
          >
            {toValue} yrs
          </Text>
        </View>
        <View
          style={{
            alignContent: "center",
            alignItems: "center",
            flex: 1,
            top: 30,
          }}
        >
          <Text style={{ right: responsiveWidth(37), fontSize: 12 }}>
            Height
          </Text>
          <Text style={{ right: responsiveWidth(34), fontSize: 15, top: 10 }}>
            {/* {convertToFeetInches(centimeters)},ft */}
            {fromHValue},ft
          </Text>

          <View>
            <RangeSlider
              min={3}
              max={7}
              fromValueOnChange={(value) => setFromHValue(value)}
              toValueOnChange={(value) => setToHValue(value)}
              initialFromValue={5}
              step={0.1}
              styleSize={"small"}
              barHeight={4}
              knobSize={24}
              inRangeBarColor={"tomato"}
            />
          </View>
          <Text
            style={{ left: responsiveWidth(34), fontSize: 15, bottom: 160 }}
          >
            {toHValue},ft
          </Text>
        </View>

        <View style={{ top: responsiveHeight(5) }}>
          <Text
            style={{
              fontSize: responsiveFontSize(2),
              left: responsiveWidth(6),
              marginBottom: 2,
            }}
          >
            Marital Status
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

        <View style={{ top: responsiveHeight(9) }}>
          <Text
            style={{
              fontSize: responsiveFontSize(2),
              left: responsiveWidth(6),
              marginBottom: 2,
            }}
          >
            Country
          </Text>

          <SelectList
            setSelected={(val) => {
              setCountrys(val);
            }}
            data={fetchCountrys}
            save="value"
            boxStyles={{
              marginLeft: responsiveWidth(5),
              marginRight: responsiveWidth(5),

              // Check if countryError is truthy and country is "undefined"
            }}
            dropdownStyles={{
              marginLeft: responsiveWidth(5),
              marginRight: responsiveWidth(5),
            }}
            onSelect={fetchState}
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
            State Name
          </Text>
          <SelectList
            setSelected={(val) => setStates(val)}
            data={stateNames}
            save="value"
            boxStyles={{
              marginLeft: responsiveWidth(5),
              marginRight: responsiveWidth(5),
            }}
            dropdownStyles={{
              marginLeft: responsiveWidth(5),
              marginRight: responsiveWidth(5),
            }}
            onSelect={fetchCity}
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
            City Name
          </Text>
          <SelectList
            setSelected={(val) => setCitys(val)}
            data={cityNames}
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
              top: responsiveHeight(17),
              fontWeight: "500",
            }}
          >
            Education & Profession Details.
          </Text>
          <View style={{ top: responsiveHeight(19) }}>
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
          <View style={{ top: responsiveHeight(21) }}>
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
          <Text
            style={{
              fontSize: responsiveFontSize(2.5),
              left: responsiveWidth(6),
              top: responsiveHeight(24),
              fontWeight: "500",
            }}
          >
            Lifestyle & Apperance.
          </Text>
          <View style={{ top: responsiveHeight(26) }}>
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
      </ScrollView>
      <View style={{ paddingBottom: 30 }}>
        <TouchableOpacity style={styles.loginBtn} onPress={handleSubmit}>
          <Text style={{ color: "white", fontSize: 18, fontWeight: "500" }}>
            Search
          </Text>
          <FontAwesome5Icon
            name="arrow-right"
            style={{
              position: "absolute",
              left: 215,
              backgroundColor: "#3D56F0",
              padding: 12,
              borderRadius: 50,
              color: "#fff",
            }}
          />
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  loginBtn: {
    width: "88%",
    backgroundColor: "#3D50DF",
    borderRadius: 5,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 50,
    elevation: 3,
    alignSelf: "center",
    bottom: 60,
  },
});
export default Search;
