import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "@/firebase/firebaseConfig";

import { addUser, removeUser } from "@/reducers/userSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

export const registerUserWithEmailAndPassword = async (email, password) => {
  const userCredentials = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  // Signed up
  console.log("New created user: ", userCredentials?.user);

  return userCredentials?.user;
};

export const signInUser = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
  // Signed in
  console.log("Sign-In successful | User details: ", userCredential?.user);

  return userCredential?.user;
};

export const updateUserProfile = async (displayName, photoUrl) => {
  return updateProfile(auth.currentUser, {
    displayName: displayName ?? "Mr. Chandler Bing",
    photoURL:
      photoUrl ??
      "https://occ-0-4487-3662.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABfn5oPOIGVSlH36wxaH-5oL5d8wztZgxFQeRq_LSU9RKySbIUMGZ2118vOWyS6Xl3wkKoIHBIknKKSY7YjP3lhLbaaMR3u8.png?r=72f",
  });
};

// ?useOnAuthStateChanged
// export default function useOnAuthStateChanged() {
  export const useOnAuthStateChanged = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("🔥 Firebase auth state checked", currentUser);

      if (currentUser) {
        console.log(
          `✅  User signed-in: ${currentUser.uid}, ${currentUser.email}`
        );

        dispatch(
          addUser({
            uid: currentUser.uid,
            email: currentUser.email,
            displayName: currentUser.displayName ?? "Uncle Bob",
            photoUrl: currentUser.photoURL,
          })
        );
      } else {
        dispatch(removeUser());
        console.log("🚫 User is signed out");
      }
    });
    // 🔁 Clean up on unmount
    return () => unsubscribe();
  }, []);
}
