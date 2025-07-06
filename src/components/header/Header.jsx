import { NETFLIX_LOGO } from "@/utils/constants";
const Header = () => {
  return (
    <div className="absolute px-8 py-2 ml-6 bg-gradient-to-b from-black z-10">
      <img className="w-60" src={NETFLIX_LOGO} alt="logo-netflix"></img>
    </div>
  );
};

export default Header;
