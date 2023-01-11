import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'

const config = {
   apiKey: "AIzaSyB8sVs11YYUx5_BJkqFZ3-24tCwbMLEvwM",
   authDomain: "jail-books.firebaseapp.com",
   databaseURL: "https://jail-books.firebaseio.com",
   projectId: "jail-books",
   storageBucket: "jail-books.appspot.com",
};

const firestore = firebase.initializeApp(config);
const db = firebase.firestore();
export default db;