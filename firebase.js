import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


// Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
const firebaseConfig = {
  apiKey: "AIzaSyBpCr-rr3IGrC8w97mJJlExOs3yiZKfW4c",
  authDomain: "class-work-f8cec.firebaseapp.com",
  projectId: "class-work-f8cec",
  storageBucket: "class-work-f8cec.appspot.com",
  messagingSenderId: "818919614915",
  appId: "1:818919614915:web:09e36b71332af4489a7576",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
export const db = getFirestore(app);

// TODO: Initialize Cloud Firestore, Cloud Storage and get a reference to the service
