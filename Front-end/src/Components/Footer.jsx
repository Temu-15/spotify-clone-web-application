import { FaVolumeLow } from "react-icons/fa6";
import {
  FaPlay,
  FaPause,
  FaStepForward,
  FaStepBackward,
  FaCompress,
  FaDesktop,
} from "react-icons/fa";
import { FaShuffle } from "react-icons/fa6";
import { IoMdRefresh } from "react-icons/io";
import { CiHeart } from "react-icons/ci";
import { FiList } from "react-icons/fi";
import { IoPlayCircleSharp } from "react-icons/io5";
import { useEffect, useRef } from "react";
import "./Footer.css";

import React from "react";
import { useStateProvider } from "../utils/StateProvider";

function Footer() {
  const audioRef = useRef(null);
  const [{ currentTrack, isPlaying, currentTime, duration, volume }, dispatch] =
    useStateProvider();

  useEffect(() => {
    const audio = audioRef.current;
    if (!currentTrack) return;

    const updateCurrentTime = () => {
      dispatch({ type: "SET_CURRENT_TIME", currentTime: audio.currentTime });
    };
    const updateDuration = () => {
      dispatch({ type: "SET_DURATION", duration: audio.duration });
    };

    audio.addEventListener("timeupdate", updateCurrentTime);
    audio.addEventListener("loadedmetadata", updateDuration);

    return () => {
      audio.removeEventListener("timeupdate", updateCurrentTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
    };
  }, [currentTrack, dispatch]);

  useEffect(() => {
    const audio = audioRef.current;

    if (currentTrack) {
      audio.src = currentTrack.preview_url;
      audio.play();
      dispatch({ type: "SET_IS_PLAYING", isPlaying: true });
    }
  }, [currentTrack, dispatch]);

  useEffect(() => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.play();
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    audio.volume = volume / 100;
  }, [volume]);

  const togglePlayPause = () => {
    dispatch({ type: "SET_IS_PLAYING", isPlaying: !isPlaying });
  };

  const handleForward = () => {
    const audio = audioRef.current;
    audio.currentTime = Math.min(audio.currentTime + 10, duration);
  };

  const handleBackward = () => {
    const audio = audioRef.current;
    audio.currentTime = Math.max(audio.currentTime - 10, 0);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const volumeChangeHandler = (e) => {
    dispatch({ type: "SET_VOLUME", volume: e.target.value });
  };

  return (
    <div className="footer">
      <div className="song-bar">
        <div className="song-info">
          {currentTrack ? (
            <>
              <div className="song-image">
                <img
                  src={currentTrack.album.images[0].url}
                  alt={currentTrack.name}
                />
              </div>
              <div className="song-description">
                <p className="title">{currentTrack.name}</p>
                <p className="artist">{currentTrack.artists[0].name}</p>
              </div>
            </>
          ) : (
            <div className="song-description">
              <p className="title">No track selected</p>
            </div>
          )}
        </div>
        <div className="song-actions">
          <CiHeart />
          <FaCompress />
        </div>
      </div>
      <div className="progress-bar">
        <audio ref={audioRef}></audio>
        <div className="progress-control">
          <FaShuffle />
          <FaStepBackward onClick={handleBackward} />
          {!isPlaying ? (
            <IoPlayCircleSharp
              className="play-pause"
              onClick={togglePlayPause}
            />
          ) : (
            <FaPause className="play-pause" onClick={togglePlayPause} />
          )}
          <FaStepForward onClick={handleForward} />
          <IoMdRefresh />
        </div>
        <div className="progress-show">
          <span>{formatTime(currentTime)}</span>
          <div className="progress-handle">
            <div className="progress"></div>
          </div>
          <span>{formatTime(duration)}</span>
        </div>
      </div>
      <div className="controllers">
        <FiList />
        <FaDesktop />
        <div className="volume-bar">
          <FaVolumeLow />
          <input
            type="range"
            min="0"
            max="100"
            onChange={volumeChangeHandler}
          />
        </div>
      </div>
    </div>
  );
}

export default Footer;
