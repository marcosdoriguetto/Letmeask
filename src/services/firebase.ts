import firebase from "firebase/app";

import 'firebase/auth'
import 'firebase/database'

const firebaseConfig = {
  apiKey: "AIzaSyCNj_uRNsCRaB6eKHx1PS66zoFXQnxV8Nw",
  authDomain: "letmeask-3afea.firebaseapp.com",
  databaseURL: "https://letmeask-3afea-default-rtdb.firebaseio.com",
  projectId: "letmeask-3afea",
  storageBucket: "letmeask-3afea.appspot.com",
  messagingSenderId: "682255148923",
  appId: "1:682255148923:web:445a7c724aa95181647fde"
};

firebase.initializeApp(firebaseConfig)

export const auth = firebase.auth();
export const database = firebase.database();