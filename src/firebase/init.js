import firebase from 'firebase'
import firestore from 'firebase/firestore'

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyA5bPbQUivOQIWGTnBBQ1NW4rr69RDdeXs",
    authDomain: "project-smoothies-vue.firebaseapp.com",
    databaseURL: "https://project-smoothies-vue.firebaseio.com",
    projectId: "project-smoothies-vue",
    storageBucket: "project-smoothies-vue.appspot.com",
    messagingSenderId: "260676684043",
    appId: "1:260676684043:web:e8f465b1a4a8917c"
};
// Initialize Firebase
const firebaseApp =  firebase.initializeApp(firebaseConfig);

//export firebase database
export default firebaseApp.firestore()