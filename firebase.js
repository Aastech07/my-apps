import firebase from "firebase/compat/app"; // Import app instead of directly from "firebase/compat"
import "firebase/compat/auth";
import "firebase/compat/firestore";

export const firebaseConfig = {
  apiKey: "AIzaSyCtcxdOhUFo7AELt8IYWc2xa1Ud56t1WkU",
  authDomain: "community-61a39.firebaseapp.com",
  projectId: "community-61a39",
  storageBucket: "community-61a39.appspot.com",
  messagingSenderId: "129789864682",
  appId: "1:129789864682:web:f541c4d05e931863da8593"
};

// Check if Firebase is not already initialized
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // If already initialized, use that instance
}

const auth = firebase.auth();
const firestore = firebase.firestore(); // Initialize Firestore if needed

export { auth, firestore, firebase }; // Exporting firestore as well
