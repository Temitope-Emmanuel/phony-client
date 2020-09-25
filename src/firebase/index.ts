// service firebase.storage {
//     match /b/{bucket}/o {
//       match /{allPaths=**} {
//         allow read, write: if request.auth != null;
//       }
//     }
//   }
import firebase from "firebase/app"
import "firebase/storage"

var firebaseConfig = {
    apiKey: "AIzaSyDSizo2G_F0PDgXmpi1HfBykEUJVKIoIt0",
    authDomain: "phonystore.firebaseapp.com",
    databaseURL: "https://phonystore.firebaseio.com",
    projectId: "phonystore",
    storageBucket: "phonystore.appspot.com",
    messagingSenderId: "663741230309",
    appId: "1:663741230309:web:105d55bfe4a16adf99380c",
    measurementId: "G-0TGXX4MDF8"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();

const storage = firebase.storage()

export {
    storage,firebase as default
}