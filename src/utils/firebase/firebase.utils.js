import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDF0xNXnrKG_SzVmZ97O8O_wIJ0JZoJt40",
  authDomain: "crwn-clothing-db-f3a49.firebaseapp.com",
  projectId: "crwn-clothing-db-f3a49",
  storageBucket: "crwn-clothing-db-f3a49.appspot.com",
  messagingSenderId: "317777266930",
  appId: "1:317777266930:web:83b555895224930a38e86b",
};

// Initialize Firebase
const firebaseapp = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();

export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }
  return userDocRef;
};
