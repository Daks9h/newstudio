// IMPORTANT: Replace this with your actual Firebase config
import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import {
  getAuth,
  type Auth,
} from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';

const firebaseConfig = {
  projectId: "studio-8370019241-129f4",
  appId: "1:690117181082:web:00ba31fdf2a61f71af2923",
  apiKey: "AIzaSyDVrxU_Gr1a7YnU5gyfhRvfkP1Osrrax4M",
  authDomain: "studio-8370019241-129f4.firebaseapp.com",
  storageBucket: 'studio-8370019241-129f4.appspot.com',
  messagingSenderId: "690117181082",
};

// ---
// App + Services
// ---

function initializeFirebase(): {
  app: FirebaseApp;
  auth: Auth;
  firestore: Firestore;
} {
  const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const firestore = getFirestore(app);
  return { app, auth, firestore };
}

export { initializeFirebase };
export * from './provider';
