import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged,
  type User 
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAG3CitDeRrjoMDUZCXO0ppym8T1GrJ_GA",
  authDomain: "mits-careerboost.firebaseapp.com",
  projectId: "mits-careerboost",
  storageBucket: "mits-careerboost.firebasestorage.app",
  messagingSenderId: "620529797748",
  appId: "1:620529797748:web:dd4ac290be44ffbf43df21",
  measurementId: "G-1RCL0037GE"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth
export const auth = getAuth(app);

// Configure Google Provider
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

export const signInWithGoogle = async (): Promise<User> => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error: any) {
    console.error('Firebase Google Sign-In Error:', error);
    throw error;
  }
};

export const logOut = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (error: any) {
    console.error('Firebase Sign-Out Error:', error);
    throw error;
  }
};

export { onAuthStateChanged, type User };
