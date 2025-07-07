import { useState } from "react";
import NETFLIX_BG_BANNER from "@/assets/NETFLIX_BG_BANNER.jpg";
import Header from "../header/Header";
import { validateEmailAndPassword } from "@/utils/validation";
import { useRef } from "react";
import { registerUserWithEmailAndPassword, signInUser } from "@/hooks/useAuth";

const Login = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  const [errorMessage, setErrorMessage] = useState(null);

  const toggleSignUp = () => {
    setIsSignedIn(!isSignedIn);
  };

  const fullNameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleUserLogin = async () => {
    const message = validateEmailAndPassword(
      emailRef.current.value,
      passwordRef.current.value
    );
    // shri.panda@gmail.com
    // Test@123
    setErrorMessage(message);

    // return if there is any errorMessage
    if (message) return;

    if (!isSignedIn) {
      //If user is not signed-Up, then create user in firebase
      await registerUserWithEmailAndPassword(
        emailRef.current.value,
        passwordRef.current.value
      );
    } else {
      // Sign-In logic
      //If user has already signed-Up, then sign-in user in firebase
      signInUser(emailRef.current.value, passwordRef.current.value);
    }
  };

  return (
    <div>
      <Header />
      <div className="absolute">
        <img src={NETFLIX_BG_BANNER} alt="bg-logo" />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="absolute w-3/12 p-12 bg-gradient-to-bl from-black
       my-36 mx-auto right-0 left-0 text-white"
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

        <p className="p-2 cursor-pointer" onClick={toggleSignUp}>
          {!isSignedIn
            ? "Already registered? Sign In Now."
            : "New to Netflix? Sign Up Now."}
        </p>
      </form>
    </div>
  );
};

export default Login;
