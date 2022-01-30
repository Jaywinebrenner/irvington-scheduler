import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const firebaseConfig = {
    // apiKey: "AIzaSyCgqZdlYZoIlskg0hYgAeA3whbUQ8YJxig",
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: "irvington-scheduler.firebaseapp.com",
    projectId: "irvington-scheduler",
    storageBucket: "irvington-scheduler.appspot.com",
    messagingSenderId: "825985535136",
    appId: "1:825985535136:web:e9ca4b583283da08620dc5",
    measurementId: "G-QTEPV88HFP"
  };

  firebase.initializeApp(firebaseConfig);

  export const db = firebase.firestore();

  // export const auth = firebase.auth();

  export default firebase;

