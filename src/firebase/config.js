import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCrhlz-76jpNJWbQi8qIqP89KOY5PnlsGE",
  authDomain: "myblog-react-68d0f.firebaseapp.com",
  projectId: "myblog-react-68d0f",
  storageBucket: "myblog-react-68d0f.appspot.com",
  messagingSenderId: "491255166331",
  appId: "1:491255166331:web:d5b47ad96f423a2c6679de",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
