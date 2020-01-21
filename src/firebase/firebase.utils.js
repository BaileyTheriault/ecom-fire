import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyAvFgwvZ2CXZKwVmlX9Q3Qf-B7PIWhu4hU",
    authDomain: "ecom-fire.firebaseapp.com",
    databaseURL: "https://ecom-fire.firebaseio.com",
    projectId: "ecom-fire",
    storageBucket: "ecom-fire.appspot.com",
    messagingSenderId: "883650701353",
    appId: "1:883650701353:web:8f8ccd5c055a151b18d438",
    measurementId: "G-0WGFETL25N"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
