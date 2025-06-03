import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCiV8Bjs6rifOwC2P_cpDb7jbIeI0sicRY",
  authDomain: "devapp-back.firebaseapp.com",
  projectId: "devapp-back",
  storageBucket: "devapp-back.firebasestorage.app",
  messagingSenderId: "240635796718",
  appId: "1:240635796718:web:66abccb978631c5297e7ff",
  measurementId: "G-57RDBZDQ8Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;



//REPOSITORY=firebase
//FIREBASE_API_KEY=AIzaSyCiV8Bjs6rifOwC2P_cpDb7jbIeI0sicRY
