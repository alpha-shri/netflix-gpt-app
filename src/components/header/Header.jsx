import NETFLIX_LOGO from "@/assets/NETFLIX_LOGO.png";
import NETFLIX_USER_ICON from "@/assets/NETFLIX_USER_ICON.png";
import { auth } from "@/firebase/firebaseConfig";
import { removeUser } from "@/reducers/userSlice";
import { signOut } from "firebase/auth";
import { useDispatch } from "react-redux";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();

  console.log("Inside Header: ", user);

  async function handleSignOut() {
    try {
      signOut(auth).then(() => {
        console.log("Sign out successful");
        dispatch(removeUser());
        navigate("/");
      });
    } catch (error) {
      console.error("Sign out error:", error);
    }
  }

  return (
    <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between ">
      <img
        className="w-60 shadow-md hover: shadow-2xl transform hover:-translate-y-1 transition-all duration-200 ease-linear"
        src={NETFLIX_LOGO}
        alt="logo-netflix"
      />
      <div className="sign-out flex justify-around">
        {user && (
          <p className="font-bold p-4">
            Hi, {user?.displayName ?? "Uncle Bob"}
          </p>
        )}
        <img
          className="w-16 h-14 p-2 shadow-md hover: shadow-2xl transform hover:-translate-y-2 transition-all duration-300 delay-100 ease-linear"
          src={user?.photoUrl ?? `${NETFLIX_USER_ICON}`}
          alt="user-icon"
        />
        {user && (
          <button
            className="font-bold cursor-pointer p-4"
            onClick={handleSignOut}
          >
            <Link to="/">Sign out</Link>
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;
