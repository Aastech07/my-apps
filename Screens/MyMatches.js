import React, { useState, useMemo, useEffect } from "react";
import {
  ImageBackground,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import TinderCard from "react-tinder-card";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { useNavigation } from "@react-navigation/native";
import { api } from "./Api";
import axios from "axios";

const styles = {
  container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  header: {
    color: "#000",
    fontSize: 23,
    marginBottom: 30,
    right: 90,
    top: 15,
  },
  cardContainer: {
    width: "100%",
    maxWidth: 260,
    height: 300,
  },
  card: {
    position: "absolute",
    backgroundColor: "#fff",
    width: responsiveWidth(100),
    maxWidth: responsiveWidth(90),
    height: responsiveHeight(60),
    shadowColor: "black",
    shadowOpacity: 0.2,
    shadowRadius: 20,
    borderRadius: 20,
    resizeMode: "cover",
    alignSelf: "center",
    top: 10,
  },
  cardImage: {
    width: "100%",
    height: "100%",
    overflow: "hidden",
    borderRadius: 20,
  },
  cardTitle: {
    position: "absolute",
    bottom: 0,
    margin: 10,
    color: "#fff",
  },
  buttons: {
    zIndex: -100,
  },
  infoText: {
    height: 28,
    justifyContent: "center",
    display: "flex",
    zIndex: -100,
  },
};

const db = [
  {
    name: "Richard Hendricks",
    img: "https://assets.cntraveller.in/photos/60ba26c0bfe773a828a47146/4:3/w_1440,h_1080,c_limit/Burgers-Mumbai-Delivery.jpg  ",
  },
  {
    name: "Erlich Bachman",
    img: "https://assets.cntraveller.in/photos/60ba26c0bfe773a828a47146/4:3/w_1440,h_1080,c_limit/Burgers-Mumbai-Delivery.jpg  ",
  },
  {
    name: "Monica Hall",
    img: "https://assets.cntraveller.in/photos/60ba26c0bfe773a828a47146/4:3/w_1440,h_1080,c_limit/Burgers-Mumbai-Delivery.jpg  ",
  },
  {
    name: "Jared Dunn",
    img: "https://assets.cntraveller.in/photos/60ba26c0bfe773a828a47146/4:3/w_1440,h_1080,c_limit/Burgers-Mumbai-Delivery.jpg  ",
  },
  {
    name: "Dinesh Chugtai",
    img: "https://assets.cntraveller.in/photos/60ba26c0bfe773a828a47146/4:3/w_1440,h_1080,c_limit/Burgers-Mumbai-Delivery.jpg  ",
  },
];

const alreadyRemoved = [];
let charactersState = db; // This fixes issues with updating characters state forcing it to use the current state and not the state that was active when the card was created.

const MyMatches = () => {
  const [characters, setCharacters] = useState([]);
  const [lastDirection, setLastDirection] = useState();
  const navigation = useNavigation();
  const childRefs = useMemo(() => characters.map(() => React.createRef()), []);
  const Api = api;
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`${Api}/matrimonial/profiles`);
        setCharacters(data);
       
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const [showLikeIndicator, setShowLikeIndicator] = useState(false);
  const [showNoMatchIndicator, setShowNoMatchIndicator] = useState(false);
  const swiped = (direction, nameToDelete) => {
    if (direction === "left") {
      setShowNoMatchIndicator(true);
      setShowNoMatchIndicator(false);
    } else if (direction === "right") {
      setShowLikeIndicator(true);
      setShowLikeIndicator(false);
      console.warn(showLikeIndicator);
    }

    setLastDirection(direction);
  };
  const outOfFrame = (name) => {
    console.log(name + " left the screen!");
    setCharacters((prevCharacters) =>
      prevCharacters.filter((character) => character.name !== name)
    );
  };
  const swipe = (dir) => {
    const cardsLeft = characters.filter(
      (person) => !alreadyRemoved.includes(person.name)
    );

    if (cardsLeft.length) {
      const toBeRemoved = cardsLeft[cardsLeft.length - 1].name;
      const index = characters
        .map((person) => person.name)
        .indexOf(toBeRemoved);

      if (index > -1 && childRefs[index].current) {
        alreadyRemoved.push(toBeRemoved);
        childRefs[index].current.swipe(dir);
      }
    }
  };

  useEffect(() => {
    if (characters.length === 0) {
      setCharacters(characters);
      alreadyRemoved.length = 0;
    }
  }, [characters]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Nearby You</Text>

      <View
        style={{
          position: "absolute",
          top: responsiveHeight(1.5),
          left: responsiveWidth(95),
        }}
      >
        <TouchableOpacity
          style={{ position: "absolute" }}
          onPress={() => navigation.navigate("Search")}
        >
          <FontAwesome5
            name="filter"
            style={{
              right: 20,
              backgroundColor: "#fff",
              padding: 10,
              position: "absolute",
              borderRadius: 10,
              shadowColor: "#000",
              shadowOpacity: 0.6,
              shadowRadius: 10,
              elevation: 3,
            }}
            size={16}
            color={"blue"}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.cardContainer}>
        {characters.map((character, index) => (
          
          <TinderCard
            ref={childRefs[index]}
            key={character._id}
            onSwipe={(dir) => swiped(dir, character.profileId.firstName)}
            onCardLeftScreen={() => outOfFrame(character.profileId.firstName)}
          >
           
            <View style={styles.card}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Mymatchdata", { data: character })
                }
              >
                <ImageBackground
                  style={styles.cardImage}
                  source={{ uri: character.images[0]}}
                >
                  {showNoMatchIndicator && (
                    <Text
                      style={{
                        color: "green",
                        backgroundColor: "green",
                      }}
                    >
                      No Match
                    </Text>
                  )}
                  {showLikeIndicator && (
                    <Text
                      style={{
                        color: "green",
                        backgroundColor: "#fff",
                      }}
                    >
                      Like
                    </Text>
                  )}
                  <Text style={styles.cardTitle}>
                    {character.profileId.firstName}
                  </Text>
                </ImageBackground>
              </TouchableOpacity>
            </View>
          </TinderCard>
        ))}
      </View>
      <View
        style={{
          backgroundColor: "#fff",
          alignSelf: "center",
          borderRadius: 50,
          shadowColor: "#000",
          shadowOffset: 50,
          shadowOpacity: 0.9,
          shadowRadius: 50,
          elevation: 3,
          paddingHorizontal: 12,
          paddingVertical: 6,
          left: responsiveWidth(20),
          top: responsiveHeight(67),
          position: "absolute",
        }}
      >
        <TouchableOpacity onPress={() => swipe("left")}>
          <FontAwesome5 name="times" style={{}} size={30} color={"blue"} />
        </TouchableOpacity>
      </View>

      <View
        style={{
          backgroundColor: "#fff",
          alignSelf: "center",
          borderRadius: 50,
          shadowColor: "#000",
          shadowOffset: 50,
          shadowOpacity: 0.9,
          shadowRadius: 50,
          elevation: 3,
          paddingHorizontal: 12,
          paddingVertical: 11,
          left: responsiveWidth(70),
          top: responsiveHeight(67),
          position: "absolute",
        }}
      >
        <TouchableOpacity onPress={() => swipe("right")}>
          <FontAwesome5
            name="heart"
            style={{ alignSelf: "center" }}
            size={20}
            color={"red"}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MyMatches;
