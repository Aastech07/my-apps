import React, { useState, useCallback, useEffect } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import { useRoute } from "@react-navigation/native";
import { firestore } from "../../firebase";
const Messages = () => {
  const [messages, setMessages] = useState([]);
  const route = useRoute();

  useEffect(() => {
    const subscriber = firestore
      .collection("matrimony")
      .doc(route.params.id + route.params.data._id)
      .collection("messages")
      .orderBy("createdAt", "desc")
      .onSnapshot((querySnapshot) => {
        const allMessages = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          console.warn(data);
          return {
            ...data,
            _id: doc.id,
            createdAt: data.createdAt.toDate(),
          };
        });
        setMessages(allMessages);
      });

    return () => subscriber();
  }, []);

  const onSend = useCallback(async (messages = []) => {
    const msg = messages[0];
    const myMsg = {
      ...msg,
      sendBy: route.params.id,
      sendTo: route.params.data._id,
      createAt: Date.parse(msg.createAt),
    };
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, myMsg)
    );

    firestore
      .collection("matrimony")
      .doc("" + route.params.id + route.params.data._id)
      .collection("messages")
      .add(myMsg);

    firestore
      .collection("matrimony")
      .doc("" + route.params.data._id + route.params.id)
      .collection("messages")
      .add(myMsg);
  }, []);

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: route.params.id,
      }}
    />
  );
};
export default Messages;
