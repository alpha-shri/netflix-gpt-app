import { useState, useEffect } from "react";
import { useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import NETFLIX_BG_BANNER from "@/assets/NETFLIX_BG_BANNER.jpg";
import NETFLIX_USER_ICON from "@/assets/NETFLIX_USER_ICON.png";

import Header from "@/components/header/Header";
import { validateEmailAndPassword } from "@/utils/validation";
import {
  registerUserWithEmailAndPassword,
  signInUser,
  updateUserProfile,
} from "@/hooks/useAuth";
import { FIREBASE_AUTH_CREDENTIAL_CODE } from "@/utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "@/reducers/userSlice";
import { auth } from "@/firebase/firebaseConfig";

const Login = () => {
  const [isSignedIn, setIsSignedIn] = useState(true);

  const [errorMessage, setErrorMessage] = useState(null);

  const fullNameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  const appDispatch = useDispatch();

  useEffect(() => {
    if (user) {
      navigate("/browse");
    } else {
      navigate("/");
    }
  }, [user, navigate]);

  const toggleSignUp = () => {
    setIsSignedIn(!isSignedIn);
  };
  const handleUserLogin = async () => {
    const message = validateEmailAndPassword(
      emailRef.current.value,
      passwordRef.current.value
    );
    setErrorMessage(message);
    if (message) return;

    if (!isSignedIn) {
      try {
        const user = await registerUserWithEmailAndPassword(
          emailRef.current.value,
          passwordRef.current.value
        );
        if (user) {
          await updateUserProfile(fullNameRef.current.value, NETFLIX_USER_ICON);

          const { uid, email, displayName, photoURL } = auth.currentUser;
          const userInfo = {
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          };
          appDispatch(addUser(userInfo));
          navigate("/browse");
        }
      } catch (error) {
        console.log(error);
        if (error && error.code === FIREBASE_AUTH_CREDENTIAL_CODE) {
          setErrorMessage("Email/ password is incorrect, please try again.");
        } else {
          setErrorMessage(error.code);
        }
        console.log(error);
        return;
      }
    } else {
      try {
        await signInUser(emailRef.current.value, passwordRef.current.value);
        // Wait for onAuthStateChanged to update Redux, then redirect in Body.jsx
        const { uid, email, displayName, photoURL } = auth.currentUser;
        const userInfo = {
          uid: uid,
          email: email,
          displayName: displayName,
          photoURL: photoURL,
        };
        appDispatch(addUser(userInfo));
        navigate("/browse");
      } catch (error) {
        if (error && error.code === FIREBASE_AUTH_CREDENTIAL_CODE) {
          setErrorMessage("Email/ password is incorrect, please try again.");
        } else {
          setErrorMessage(error.code);
        }
        console.log(error);
        return;
      }
    }
  };

  return (
    <>
      <Header />
      <div className="absolute">
        <img src={NETFLIX_BG_BANNER} alt="bg-logo" />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="absolute w-3/12 p-12 bg-gradient-to-bl from-black my-36 mx-auto right-0 left-0 text-white backdrop-blur-sm bg-white/30
        shadow-md hover: shadow-2xl transform hover:-translate-y-1 transition-all duration-200 ease-linear"
      >
        <h1 className="text-3xl font-bold py-4">
          {isSignedIn ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignedIn && (
          <input
            className="p-2 m-2 w-full input input-neutral text-black"
            type="text"
            name="fullname"
            id="fullname"
            placeholder="Full Name"
            ref={fullNameRef}
          />
        )}
        <input
          className="p-2 m-2 w-full input input-neutral text-black"
          type="text"
          name="emailId"
          id="emailId"
          placeholder="Email Address"
          ref={emailRef}
        />
        <input
          className="p-2 m-2 w-full input input-neutral text-black"
          type="password"
          name="password"
          id="text"
          placeholder="Password"
          ref={passwordRef}
        />
        <p className="text-red-600 text-lg py-2">{errorMessage}</p>

        <button
          className="p-2 m-2 bg-red-700 hover:bg-red-600 rounded-sm w-full cursor-pointer"
          onClick={() => handleUserLogin()}
        >
          {!isSignedIn ? "Sign Up" : "Sign In"}
        </button>

        <p className="p-2 cursor-pointer link-hover" onClick={toggleSignUp}>
          {!isSignedIn
            ? "Already registered? Sign In Now."
            : "New to Netflix? Sign Up Now."}
        </p>
      </form>
    </>
  );
};

export default Login;
