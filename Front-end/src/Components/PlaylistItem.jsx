import React from "react";
import "./playlistItem.css";
import { useNavigate } from "react-router-dom";
import { FaCirclePlay } from "react-icons/fa6";
import { FaPlay } from "react-icons/fa";
function PlaylistItem({ playlist }) {
  let navigate = useNavigate();
  const PlaylistClickHandler = () => {
    navigate(`/playlist/${playlist.id}`, {
      state: {
        name: playlist.name,
        description: playlist.description,
        imageuri: playlist.images[0].url,
        primary_color: playlist.primary_color,
        playlist_owner: playlist.owner.display_name,
        total_songs: playlist.tracks.total,
      },
    });
  };
  console.log(playlist);
  return (
    <div className="playlist-item" onClick={PlaylistClickHandler}>
      <div className="playlist-item-image">
        <img src={playlist.images[0]?.url} alt={playlist?.name} />
        <div className="play-icon">
          <FaPlay className="fa-play-playlist" />
        </div>
      </div>
      <div className="playlist-item-info">
        <h4>{playlist.name}</h4>
        <p>
          {playlist.description
            ? playlist.description
                .replace(/<[^>]*>?/gm, "")
                .split(/\s+/)
                .slice(0, 5)
                .join(" ") + "..."
            : ""}
        </p>
      </div>
    </div>
  );
}

export default PlaylistItem;
