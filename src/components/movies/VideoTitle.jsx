import React from "react";

const VideoTitle = ({ title, overview }) => {
  return (
    <div className="pt-36 px-12">
      <h1 className="text-6xl font-bold">{title}</h1>
      <p className="py-6 text-lg w-1/4">{overview}</p>
      <div className="">
        <button className="focus:outline-none text-white bg-gray-500 hover:bg-gray-800 focus:ring-1 focus:ring-gray-200 font-medium rounded-lg me-2 mb-2 dark:bg-gray-400 dark:hover:bg-gray-500 dark:focus:ring-gray-900 mx-2 px-6 py-3 text-lg">
          Play
        </button>
        <button className="focus:outline-none text-white bg-gray-500 hover:bg-gray-800 focus:ring-1 focus:ring-gray-200 font-medium rounded-lg me-2 mb-2 dark:bg-gray-400 dark:hover:bg-gray-500 dark:focus:ring-gray-900 mx-2 px-6 py-3 text-lg">
          More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
