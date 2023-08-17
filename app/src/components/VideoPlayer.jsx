import React, { useState } from "react";
import ReactPlayer from "react-player";
import "./VideoPlayer.css";

const VideoPlayer = ({ play, setPlay }) => {
  const [player, setPlayer] = useState(null); 
  const [skipIntro, setSkipIntro] = useState(false);
  const [selectedQuality, setSelectedQuality] = useState("auto");

  const handlePlayerReady = (player) => {
    setPlayer(player);
  };

  const handleSkipIntro = () => {
    if (player) {
      const secondsToSkip = 6;
      player.seekTo(secondsToSkip, "seconds");
      setSkipIntro(true);
    }
  };

  const handleQualityChange = (event) => {
    setSelectedQuality(event.target.value);
  };

  const qualityOptions = ["auto", "HD"];

  return (
    <div className="video-player-container">
      <ReactPlayer
        url={"/assets/Trailer.mp4"}
        controls
        width="100%"
        height="auto"
        playing
        onEnded={() => setSkipIntro(false)}
        onReady={handlePlayerReady} 
        config={{
          file: {
            attributes: {
              controlsList: "nodownload", 
            },
          },
        }}
      />
      {skipIntro ? (
        <div className="skip-intro-message">Intro skipped!</div>
      ) : (
        <button onClick={handleSkipIntro} className="skip-intro-button">
          Skip Intro
        </button>
      )}

      <div className="quality-options">
        
        {play?
        <button
          style={{ backgroundColor: "#00000063" }}
          onClick={() => {
            setPlay(!play);
          }}
        >
          {"<"}
        </button>
        :null}
        <select
          value={selectedQuality}
          onChange={handleQualityChange}
          className="quality-select"
        >
          {qualityOptions.map((quality) => (
            <option key={quality} value={quality}>
              {quality}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default VideoPlayer;
