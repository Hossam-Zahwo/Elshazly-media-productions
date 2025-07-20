// lib/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAYbS29TF1TrOzw10kA8rV69ZqljeeVTyE",
  authDomain: "portfolio-70e8c.firebaseapp.com",
  projectId: "portfolio-70e8c",
  storageBucket: "portfolio-70e8c.firebasestorage.app",
  messagingSenderId: "579268810565",
  appId: "1:579268810565:web:66d93a94bc1fc19821502c",
  measurementId: "G-WHCH0R6XYQ"
};

const app = initializeApp(firebaseConfig);

// Export Firestore database
const db = getFirestore(app);

export { db };
