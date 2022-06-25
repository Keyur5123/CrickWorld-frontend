// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCviXV_gtJgdfNUD-GdK-p81nbvqMF9eOo",
  authDomain: "live-ipl-score-11b61.firebaseapp.com",
  projectId: "live-ipl-score-11b61",
  storageBucket: "live-ipl-score-11b61.appspot.com",
  messagingSenderId: "524519788123",
  appId: "1:524519788123:web:b259efd6d3b09e317a797e",
  measurementId: "G-N8C7E1SV4Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);