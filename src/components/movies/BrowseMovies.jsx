import useNowPlayingMovies from "@/hooks/useNowPlayingMovies";
import Header from "../header/Header";
import MainContainer from "./MainContainer";

const BrowseMovies = () => {
  useNowPlayingMovies();

  return (
    <>
      <Header />
      <MainContainer />
    </>
  );
};

export default BrowseMovies;
