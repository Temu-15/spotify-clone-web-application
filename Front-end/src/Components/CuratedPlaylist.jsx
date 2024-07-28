import React from "react";
import { useEffect } from "react";
import { useStateProvider } from "../utils/StateProvider";
import myPlaylist from "../ApiHandler/myPlaylist";
import { FaPlay } from "react-icons/fa";
import { FaCirclePlay } from "react-icons/fa6";
import "./curatedPlaylist.css";

import { useNavigate } from "react-router-dom";
function CuratedPlaylist() {
  let navigate = useNavigate();
  const [{ userPlaylist, user }, dispatch] = useStateProvider();
  useEffect(() => {
    const fetchCuratedPlaylist = async () => {
      if (!user) return;
      try {
        const playlistData = await myPlaylist();
        dispatch({
          type: "SET_MY_PLAYLIST",
          userPlaylist: playlistData,
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchCuratedPlaylist();
  }, []);

  const curatedPlaylistClickHandler = (item) => {
    navigate(`/playlist/${item?.id}`, {
      state: {
        name: item?.name,
        description: item?.description,
        imageuri: item.images[0].url,
        primary_color: item.primary_color,
        playlist_owner: item.owner.display_name,
        total_songs: item.tracks.total,
      },
    });
  };
  console.log(userPlaylist);
  return (
    <div className="curated-playlist">
      <h2>Good afternoon</h2>
      <div className="your_playlist">
        {userPlaylist?.items?.map((item, index) => (
          <div
            key={item?.id}
            className="playlist-container"
            onClick={() => curatedPlaylistClickHandler(item)}
          >
            <div className="playlist-image">
              <img src={item?.images[0].url} alt={item.name} />
            </div>
            <span className="playlist-name">{item?.name}</span>
            <FaCirclePlay className="curated-playlist-icon" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default CuratedPlaylist;
