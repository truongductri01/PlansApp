import * as firebase from "firebase/app";
import "firebase/storage";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBzPM2CgsAa40t2_fCUTanFzo7y--UK-rs",
  authDomain: "plansapp123.firebaseapp.com",
  databaseURL: "https://plansapp123.firebaseio.com",
  projectId: "plansapp123",
  storageBucket: "plansapp123.appspot.com",
  messagingSenderId: "6604119711",
  appId: "1:6604119711:web:66b4e1654c38af12ae8caa",
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

// Create a timer to store time value when new elements is imported
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { db, timestamp };
