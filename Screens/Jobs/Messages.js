import React, { useState, useCallback, useEffect } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import { useRoute } from '@react-navigation/native'
import firebase from 'firebase/compat'
const Messages = () => {
    const [messages, setMessages] = useState([])
    const route = useRoute();

    useEffect(() => {
        const subscriber = firebase.firestore()
            .collection('Chats')
            .doc(route.params.id + route.params.data.userId).collection('messages')
            .orderBy("createdAt", "desc");
        subscriber.onSnapshot(querysnapshort => {
            const allmessages = querysnapshort.docs.map(item => {
                return { ...item.data, createAt: Date.parse(new Date()) }
            });
            setMessages(allmessages)
        });
        return ()=> subscriber()
    }, [])

    const onSend = useCallback(async (messages = []) => {
        const msg = messages[0];
        const myMsg = {
            ...msg, sendBy: route.params.id, sendTo: route.params.data.userId,
            createAt: Date.parse(msg.createAt)
        }
        setMessages(previousMessages =>
            GiftedChat.append(previousMessages, myMsg),
        );
        firebase.firestore().collection('chats').doc("" + route.params.id + route.params.data.userId)
            .collection('messages').add(myMsg)
        firebase.firestore().collection('chats').doc("" + route.params.data.userId + route.params.id)
            .collection('messages').add(myMsg)
    }, [])

    return (
        <GiftedChat
            messages={messages}
            onSend={messages => onSend(messages)}
            user={{
                _id: route.params.id,
            }}
        />
    )
}
export default Messages