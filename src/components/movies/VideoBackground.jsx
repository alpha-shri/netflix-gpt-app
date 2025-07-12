import axios from "@/api/axios";
import React from "react";
import { useEffect } from "react";

const VideoBackground = ({ movieId }) => {
  const fetchMovieTrailer = async () => {
    const response = await axios.get(`/movie/${movieId}/videos`);
    const filteredData =
      (await response?.data?.results?.filter(
        (video) => video.type === "Trailer"
      )) ?? [];

    const trailer = filteredData.length
      ? filteredData[0]
      : await response?.data?.results[0];

    console.log("Response fetchMovieTrailer: ", trailer);
  };

  useEffect(() => {
    fetchMovieTrailer();
  }, []);

  return (
    <div>
      <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/-G5XI61Y9ms?si=jbZf1f1MuVEZfG4G"
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
      ></iframe>
    </div>
  );
};

export default VideoBackground;
