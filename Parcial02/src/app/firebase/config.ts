
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'; 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyDZEnuDd51vL1-Yh1EDDdcUWn7D2hztSHo",
  authDomain: "parcial02-e5949.firebaseapp.com",
  projectId: "parcial02-e5949",
  storageBucket: "parcial02-e5949.firebasestorage.app",
  messagingSenderId: "52616247923",
  appId: "1:52616247923:web:2abc24952b9446dcc28806",
  measurementId: "G-NDBV0WT0BK"
};

// 2. SE INICIALIZA LA APP BASE CON LA CONFIGURACIÓN
const app = initializeApp(firebaseConfig);

// 3. SE GENERAN LOS SERVICIOS DEPENDIENDO DE LA APP
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

// 4. SE EXPORTAN LAS INSTANCIAS UNIFICADAS
export { analytics, auth, db };