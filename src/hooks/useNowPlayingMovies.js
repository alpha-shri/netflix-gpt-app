import { useEffect } from "react";

import { useDispatch } from "react-redux";
import { addNowPlayingMovies } from "@/reducers/movieSlice";
import api from "@/api/axios";

const useNowPlayingMovies = () => {
  const dispatch = useDispatch();

  const getNowPlayMovies = async () => {
    const response = await api.get("/movie/now_playing?language=en-US&page=1");
    console.log(response);
    dispatch(addNowPlayingMovies(response?.data?.results));
  };

  useEffect(() => {
    getNowPlayMovies();
  }, []);
};

export default useNowPlayingMovies;
