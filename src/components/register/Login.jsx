import { useState } from "react";
import { NETFLIX_BG_BANNER } from "@/utils/constants";
import Header from "../header/Header";

const Login = () => {
  const [isSignedUp, setIsSignedUp] = useState(true);

  const toggleSignUp = () => {
    setIsSignedUp(!isSignedUp);
  };

  return (
    <div>
      <Header />
      <div className="absolute">
        <img src={NETFLIX_BG_BANNER} alt="bg-logo" />
      </div>
      <form
        className="absolute w-3/12 p-12 bg-gradient-to-bl from-black
       my-36 mx-auto right-0 left-0 text-white"
      >
        <h1 className="text-3xl font-bold py-4">
          {isSignedUp ? "Sign Up" : "Sign In"}
        </h1>
        {isSignedUp && (
          <input
            className="p-2 m-2 w-full input input-neutral text-black"
            type="text"
            name="fullname"
            id="fullname"
            placeholder="Full Name"
          />
        )}
        <input
          className="p-2 m-2 w-full input input-neutral text-black"
          type="email"
          name="emailId"
          id="emailId"
          placeholder="Email Address"
        />
        <input
          className="p-2 m-2 w-full input input-neutral text-black"
          type="password"
          name="password"
          id="password"
          placeholder="Password"
        />
        {isSignedUp && (
          <button className="p-2 m-2 bg-red-700 hover:bg-red-600 rounded-sm w-full cursor-pointer">
            Sign Up
          </button>
        )}

        {!isSignedUp && (
          <button className="p-2 m-2 bg-red-700 hover:bg-red-600 rounded-sm w-full cursor-pointer">
            Sign In
          </button>
        )}
        <p className="p-2 cursor-pointer" onClick={toggleSignUp}>
          {isSignedUp
            ? "Already registered? Sign In Now."
            : "New to Netflix? Sign Up Now."}
        </p>
      </form>
    </div>
  );
};

export default Login;
