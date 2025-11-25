'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from 'react';
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  type Auth,
  type User,
} from 'firebase/auth';
import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';

// ---
// Firebase App Initialization
// ---
const firebaseConfig = {
  projectId: "studio-8370019241-129f4",
  appId: "1:690117181082:web:00ba31fdf2a61f71af2923",
  apiKey: "AIzaSyDVrxU_Gr1a7YnU5gyfhRvfkP1Osrrax4M",
  authDomain: "studio-8370019241-129f4.firebaseapp.com",
  storageBucket: 'studio-8370019241-129f4.appspot.com',
  messagingSenderId: "690117181082",
};

let firebaseApp: FirebaseApp;
if (!getApps().length) {
  firebaseApp = initializeApp(firebaseConfig);
} else {
  firebaseApp = getApp();
}
const auth = getAuth(firebaseApp);

// ---
// Auth Context
// ---
interface AuthContextType {
  user: User | null;
  loading: boolean;
  signup: typeof createUserWithEmailAndPassword;
  login: typeof signInWithEmailAndPassword;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const value = {
    user,
    loading,
    signup: (email, password) =>
      createUserWithEmailAndPassword(auth, email, password),
    login: (email, password) =>
      signInWithEmailAndPassword(auth, email, password),
    logout: () => signOut(auth),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// ---
// Firebase General Context
// ---
interface FirebaseContextType {
  auth: Auth;
  app: FirebaseApp;
}

const FirebaseContext = createContext<FirebaseContextType | null>(null);

export function FirebaseProvider({ children }: { children: ReactNode }) {
  return (
    <FirebaseContext.Provider value={{ app: firebaseApp, auth }}>
      <AuthProvider>{children}</AuthProvider>
    </FirebaseContext.Provider>
  );
}

export const useFirebase = () => {
  const context = useContext(FirebaseContext);
  if (!context) {
    throw new Error('useFirebase must be used within a FirebaseProvider');
  }
  return context;
};
