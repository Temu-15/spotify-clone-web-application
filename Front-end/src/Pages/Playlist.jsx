import React, { useEffect, useState } from "react";
import Sidebar from "../Components/Sidebar";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { FaCirclePlay } from "react-icons/fa6";
import { MdFavoriteBorder } from "react-icons/md";
import { FaDownload } from "react-icons/fa6";
import { SlOptions } from "react-icons/sl";
import { FaSearch } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa6";
import { IoMdTime } from "react-icons/io";
import "./playlist.css";
import { useStateProvider } from "../utils/StateProvider";
import { useParams, useLocation } from "react-router-dom";
import getPlaylist from "../ApiHandler/getPlaylist";

function Playlist() {
  const { id } = useParams();
  const location = useLocation();
  const {
    name,
    description,
    imageuri,
    primary_color,
    playlist_owner,
    total_songs,
  } = location.state || {};
  const [{ user, playlistTracks }, dispatch] = useStateProvider();
  const [error, setError] = useState(null);
  function convertMillisecondsToMinSec(milliseconds) {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    const formattedSeconds = seconds < 10 ? "0" + seconds : seconds;

    return minutes + ":" + formattedSeconds;
  }

  const trackClickHandler = (id, index) => {
    dispatch({
      type: "SET_CURRENT_TRACK",
      currentTrack: playlistTracks[id]?.[index].track,
    });
    console.log(playlistTracks[id][index].track);
  };
  useEffect(() => {
    const fetchPlaylist = async (retryCount = 0) => {
      if (!user) return;

      const cachedData = localStorage.getItem(`playlistTracks_${id}`);
      if (cachedData) {
        dispatch({
          type: "SET_PLAYLIST_TRACKS",
          playlistTracks: { ...playlistTracks, [id]: JSON.parse(cachedData) },
        });
        return;
      }

      try {
        const playlistData = await getPlaylist(id, 30);
        dispatch({
          type: "SET_PLAYLIST_TRACKS",
          playlistTracks: { ...playlistTracks, [id]: playlistData.data.items },
        });
        localStorage.setItem(
          `playlistTracks_${id}`,
          JSON.stringify(playlistData.data.items)
        );
        setError(null);
      } catch (error) {
        if (error.response?.status === 429 && retryCount < 5) {
          const waitTime = Math.pow(2, retryCount) * 1000;
          setTimeout(() => fetchPlaylist(retryCount + 1), waitTime);
        } else {
          setError("Failed to load playlist data. Please try again later.");
        }
      }
    };
    fetchPlaylist();
  }, []);
  console.log(playlistTracks);
  return (
    <div className="playlist-page">
      <div className="spotify__body">
        <Sidebar className="sidebar" />
        <div className="body">
          <Navbar searchEnabled={false} />
          <div className="body__contents playlist-container-playlist-page">
            <div className="playlist-header">
              <div className="playlist-header-image">
                <img src={imageuri} alt={name} />
              </div>
              <div className="playlist-header-info">
                <h4 className="playlist-owner">{playlist_owner}</h4>
                <h2 className="playlist-title">{name}</h2>
                <p className="playlist-description">
                  {description
                    ? description
                        .replace(/<[^>]*>?/gm, "")
                        .split(/\s+/)
                        .slice(0, 5)
                        .join(" ") + "..."
                    : ""}
                </p>
                <div className="playlist-header-stats">
                  <p>{total_songs} songs, 3000+ followers</p>
                </div>
              </div>
            </div>
            <div className="playlist-body-page">
              <div className="playlist-control-page">
                <div className="playlist-controls-left">
                  <FaCirclePlay className="playlist-icon-play" />
                  <MdFavoriteBorder className="playlist-icon-favorite" />
                  <FaDownload className="playlist-icon-download" />
                  <SlOptions className="playlist-icon-options" />
                </div>
                <div className="playlist-controls-right">
                  <FaSearch className="playlist-icon-search" />
                  <p className="order">custom order</p>
                  <FaChevronDown className="playlist-icon-chevron-down" />
                </div>
              </div>

              <div className="playlist-songs">
                <table>
                  <tr>
                    <th>#</th>
                    <th>Title</th>
                    <th>Album</th>
                    <th>Date Added</th>
                    <th>
                      <IoMdTime />
                    </th>
                  </tr>

                  {playlistTracks[id]?.map((track, index) => (
                    <tr
                      key={track.track.id}
                      onClick={() => trackClickHandler(id, index)}
                    >
                      <td>{index + 1}</td>
                      <td className="song-title">
                        <div className="song-image">
                          <img
                            src={track.track.album.images[0].url}
                            alt={track.track.name}
                          />
                        </div>
                        <div className="song-name-album">
                          <div className="song-name">{track.track.name}</div>
                          <div className="song-artist">
                            {track.track.artists[0].name}
                          </div>
                        </div>
                      </td>
                      <td className="song-album">{track.track.album.name}</td>
                      <td className="song-date-added">
                        {new Date(track.added_at).toDateString()}
                      </td>
                      <td className="song-duration">
                        {convertMillisecondsToMinSec(track.track.duration_ms)}
                      </td>
                    </tr>
                  ))}
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="spotify__footer">
        <Footer />
      </div>
    </div>
  );
}

export default Playlist;
