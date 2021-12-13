import firebase from "firebase/compat/app";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyASX0570V0l20Qq9_iw5QHpvOgKEtJrJDs",
  authDomain: "instagram-e3da1.firebaseapp.com",
  projectId: "instagram-e3da1",
  storageBucket: "instagram-e3da1.appspot.com",
  messagingSenderId: "395319405602",
  appId: "1:395319405602:web:257bf80c4ec002d675ee7b",
  measurementId: "G-L5SLQ15EQD",
};

firebase.initializeApp(firebaseConfig);

export default firebase;
