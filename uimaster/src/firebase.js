import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyByGpuDyRZGKoLQPCXmbe1ml-hiqYmexnI",
  authDomain: "uimaster-164e7.firebaseapp.com",
  databaseURL: "https://uimaster-164e7-default-rtdb.firebaseio.com",
  projectId: "uimaster-164e7",
  storageBucket: "uimaster-164e7.appspot.com",
  messagingSenderId: "773639430835",
  appId: "1:773639430835:web:804ccce308569d8cf206c6",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export const imageDb = getStorage(firebaseApp);
export default db;
