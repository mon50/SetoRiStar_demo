import {initializeApp} from 'firebase/app';
import {getAnalytics} from 'firebase/analytics';
import { EmailAuthProvider, GoogleAuthProvider, getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDV5QXPnaH5zDEoO4qcHy9YWiqltJdB0xw",
    authDomain: "liveinfoapp-421808.firebaseapp.com",
    projectId: "liveinfoapp-421808",
    storageBucket: "liveinfoapp-421808.appspot.com",
    messagingSenderId: "74554077688",
    appId: "1:74554077688:web:a2d764df62bf58a3e1a60d",
    measurementId: "G-BS2XZQ8C0P"
};

const app = initializeApp(firebaseConfig);
//const db = getFirestore(app);
const auth = getAuth(app);
const emailProvider = new EmailAuthProvider();
const googleProvider = new GoogleAuthProvider();


export { auth ,googleProvider,emailProvider};
//export { auth, provider, db ,cred};