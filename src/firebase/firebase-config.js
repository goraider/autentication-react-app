import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';


const firebaseConfig = {
    apiKey: "AIzaSyCw7XHqL3ut4Fx6DXCKWUiTuY1uFQ8gLGc",
    authDomain: "react-app-curso-a105d.firebaseapp.com",
    projectId: "react-app-curso-a105d",
    storageBucket: "react-app-curso-a105d.appspot.com",
    messagingSenderId: "222664907586",
    appId: "1:222664907586:web:953ff3647febb0a52e86db"
};
  
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export {
    db,
    googleAuthProvider,
    firebase
}