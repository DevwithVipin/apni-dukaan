// import { getAnalytics } from "firebase/analytics";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB5ytuZ18oIGH1LDrs2VRLSBK6auhSIXh0",
  authDomain: "apna-store-e267f.firebaseapp.com",
  projectId: "apna-store-e267f",
  storageBucket: "apna-store-e267f.appspot.com",
  messagingSenderId: "55109993360",
  appId: "1:55109993360:web:c3fa578918d621b95fe915",
  measurementId: "G-WHLBWTFJ2J"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);


const db = app.firestore(); /// a real-time db in firebase

const auth = firebase.auth(); /// gives us a variable to handle the stuff like signIN

export { db, auth };

