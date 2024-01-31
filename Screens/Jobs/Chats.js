import React, { useEffect, useState } from 'react'
import { View, Text, FlatList } from 'react-native'
import firebase from 'firebase/compat';
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Chats = () => {
  const navigation = useNavigation()
  const [datas, setData] = useState([])
  let id = ''
  const getData = async () => {
    const email = await AsyncStorage.getItem('email')
    const id = await AsyncStorage.getItem('userId')
  
  //  console.warn(id)
    firebase.firestore().collection('users').where('email', '!=', email).get()
    .then((res) => {
      let tempData = [];
      if (res.docs.length > 0) {
        res.docs.forEach(item => {
          tempData.push(item.data());
        });
        setData(tempData); // Update state with the fetched data
      }
    })
    .catch((error) => {
      console.log(error);
    });
  
  }
  useEffect(() => {
    getData()
  }, [])
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View style={{marginTop:100}}>
        <FlatList
          data={datas}
          renderItem={({ item, index }) => {
            return (
              <View style={{ backgroundColor: '#fff',paddingHorizontal:40,paddingVertical:20 }}>
                 
                <Text onPress={()=>navigation.navigate('Message',{data:item,id:id})}>{item.username}</Text>
              </View>
            );
          }}
          keyExtractor={(item, index) => index.toString()} // Added keyExtractor
        />
      </View>
    </View>
  )
}

export default Chats