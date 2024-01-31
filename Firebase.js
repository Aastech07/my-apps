
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

export const firebaseConfig = {
    apiKey: "AIzaSyD5MY9nBAi6-hbxVbrSjH4cN4fSgd2_DxI",
    authDomain: "communityapp-411107.firebaseapp.com",
    projectId: "communityapp-411107",
    storageBucket: "communityapp-411107.appspot.com",
    messagingSenderId: "977796051521",
    appId: "1:977796051521:web:97453b77d96fc3854f8cc0",
    measurementId: "G-E36H5WN342"
}

// Check if Firebase app is not already initialized
if (!firebase.apps.length) {
    // Initialize Firebase with the configuration object
    firebase.initializeApp(firebaseConfig);
}

// Export auth and firebase instances
const auth = firebase.auth();
export { auth, firebase };
