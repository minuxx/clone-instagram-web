import firebase from "firebase/compat/app";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCf9Myw6-fGy5yJ_Ql44T_FPQ7Eb7Xswms",
  authDomain: "instagram-494d4.firebaseapp.com",
  projectId: "instagram-494d4",
  storageBucket: "instagram-494d4.appspot.com",
  messagingSenderId: "904900364509",
  appId: "1:904900364509:web:248529d01689d2fe3db334",
};

firebase.initializeApp(firebaseConfig);

export default firebase;
