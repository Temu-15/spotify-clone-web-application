import React, { useState, useEffect } from "react";
import getPlaylist from "../ApiHandler/getPlaylist";
import { useStateProvider } from "../utils/StateProvider";
import { FaPlay } from "react-icons/fa";
import "./playlist.css";

function Playlist({ id, name }) {
  const [{ playlistWithTracks, user }, dispatch] = useStateProvider();
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlaylist = async (retryCount = 0) => {
      if (!user) return;

      const cachedData = localStorage.getItem(`playlist_${id}`);
      if (cachedData) {
        dispatch({
          type: "SET_PLAYLIST_WITH_TRACKS",
          playlistWithTracks: {
            ...playlistWithTracks,
            [id]: JSON.parse(cachedData),
          },
        });
        return;
      }

      try {
        const playlistData = await getPlaylist(id, 6);
        dispatch({
          type: "SET_PLAYLIST_WITH_TRACKS",
          playlistWithTracks: {
            ...playlistWithTracks,
            [id]: playlistData.data.items,
          },
        });
        localStorage.setItem(
          `playlist_${id}`,
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

  console.log(playlistWithTracks);

  return (
    <div className="playlist">
      <h2 className="playlist-title">{name}</h2>
      <div className="tracks-holder">
        {error && <p className="error-message">{error}</p>}
        {playlistWithTracks[id]?.slice(0, 5).map((track) => (
          <div key={track.track.id} className="track-card">
            <div className="track-image">
              <img
                src={track.track.album.images[0]?.url}
                alt={track.track.name}
              />
              <div className="play-icon">
                <FaPlay className="fa-play-playlist" />
              </div>
            </div>
            <div className="track-info">
              <h3>{track.track.name}</h3>
              <p>{track.track.album.artists[0]?.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Playlist;
