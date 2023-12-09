import React from "react";
import YouTube from "react-youtube";

const YouTubeVideo = ({ videoId }) => {
  const opts = {
    height: "315",
    width: "560",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    },
  };

  return <YouTube videoId={videoId} opts={opts} />;
};

export default YouTubeVideo;
