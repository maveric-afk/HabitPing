import { initializeApp } from "firebase/app";
import {getMessaging} from 'firebase/messaging'

const firebaseConfig = {
  apiKey: "AIzaSyDHdTc61IWw-Oo4X3c8eqa77w85oXzlPjY",
  authDomain: "habitping.firebaseapp.com",
  projectId: "habitping",
  storageBucket: "habitping.firebasestorage.app",
  messagingSenderId: "942686393756",
  appId: "1:942686393756:web:d2d24413957ef03f36a459",
  measurementId: "G-5DZS6J7W0Y"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const messaging=getMessaging(app);