import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'


const firebaseConfig = {
  apiKey: "AIzaSyAENimfD-O0_-6lir04LOR1pFd9xDjD7og",
  authDomain: "signal-rn-5467d.firebaseapp.com",
  projectId: "signal-rn-5467d",
  storageBucket: "signal-rn-5467d.appspot.com",
  messagingSenderId: "380598248887",
  appId: "1:380598248887:web:2d2e32e7bbfd34bb307432"
};

// Initialize Firebase
let app;
if(firebase.apps.length===0){
    app=firebase.initializeApp(firebaseConfig)
}else
{
    app = firebase.app()
}
export const auth = firebase.auth()
export const db = firebase.firestore()

