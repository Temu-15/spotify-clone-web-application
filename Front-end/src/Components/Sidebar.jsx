import React from "react";
import { MdMenu } from "react-icons/md";
import { GoHomeFill } from "react-icons/go";
import { FaSearch } from "react-icons/fa";
import { ImLibrary } from "react-icons/im";
import { MdPlaylistAdd } from "react-icons/md";
import { MdFavorite } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useStateProvider } from "../utils/StateProvider";
import { MdFeaturedPlayList } from "react-icons/md";
import "./Sidebar.css";

function Sidebar() {
  const [{ userPlaylist }, dispatch] = useStateProvider();

  console.log(userPlaylist);
  return (
    <div className="sidebar">
      <div className="top__links">
        <Link to="/" className="logo">
          <img
            src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_White.png"
            alt="spotify logo"
          />
        </Link>
        <ul className="sidebar-links">
          <li>
            <Link to="/">
              <div>
                <GoHomeFill className="sidebar_icons" />
              </div>
              <span>Home</span>
            </Link>
          </li>
          <li>
            <Link to="/search">
              <div>
                <FaSearch className="sidebar_icons" />
              </div>
              <span>Search</span>
            </Link>
          </li>
          <li>
            <Link to="/library">
              <div>
                <ImLibrary className="sidebar_icons" />
              </div>
              <span>Library</span>
            </Link>
          </li>
        </ul>
      </div>
      <div className="action_links">
        <ul className="sidebar-links">
          <li>
            <Link to="/">
              <div>
                <MdPlaylistAdd className="sidebar_icons" />
              </div>
              <span>Create Playlist</span>
            </Link>
          </li>
          <li>
            <Link to="/search">
              <div>
                <MdFavorite className="sidebar_icons" />
              </div>
              <span>Liked Songs</span>
            </Link>
          </li>
        </ul>
      </div>
      <div className="my-playlists">
        <h4>
          Your Playlists{" "}
          <span>
            <MdFeaturedPlayList />
          </span>
        </h4>
        <ul className="lists-container">
          {userPlaylist?.items?.map((playlist) => (
            <Link
              to={`/playlist/${playlist.id}`}
              className="playlist__item"
              state={{
                name: playlist.name,
                description: playlist.description,
                imageuri: playlist.images[0].url,
                primary_color: playlist.primary_color,
                playlist_owner: playlist.owner.display_name,
                total_songs: playlist.tracks.total,
              }}
            >
              <img src={playlist.images[0].url} alt="album__image" />
              <li key={playlist.id}>{playlist.name}</li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
