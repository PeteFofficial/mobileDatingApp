import { initializeApp, getApps, getApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  // REPLACE THESE VALUES with the ones from your Firebase console
  // The error you're seeing is because these are placeholder values
  // Copy the firebaseConfig object from your Firebase project settings
  apiKey: "AIzaSyAU4mu-YXfw5XzyAFP8jVEDYzA5kchrGgo", // Replace this with your actual API key
  authDomain: "dating-app-743b5.firebaseapp.com",
  projectId: "dating-app-743b5",
  storageBucket: "dating-app-743b5.firebasestorage.app",
  messagingSenderId: "368416798575",
  appId: "1:368416798575:web:02f08601457a2e51349a9a",
  measurementId: "G-8TTQMY1XEL" // Optional
};

// Initialize Firebase only if it hasn't been initialized already
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Initialize Auth with AsyncStorage for persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

export { auth }; 