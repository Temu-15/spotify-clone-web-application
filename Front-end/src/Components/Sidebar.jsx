import React from 'react';
import { MdMenu } from "react-icons/md";
import { GoHomeFill } from "react-icons/go";
import { FaSearch } from "react-icons/fa";
import { ImLibrary } from "react-icons/im";
import { MdPlaylistAdd } from "react-icons/md";
import { MdFavorite } from "react-icons/md";
import {Link} from 'react-router-dom';
import './Sidebar.css';

function Sidebar() {
  return (
    <div className="sidebar">
     <div className="top__links">
        <Link to="/" className="logo">
          <img
            src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_White.png"
            alt="spotify logo"
          />
        </Link>
        <ul className='sidebar-links'>
          <li>
            <Link to="/">
              <div><GoHomeFill className='sidebar_icons'/></div>
              <span>Home</span>
            </Link>
          </li>
          <li>
            <Link to="/search">
              <div>
                <FaSearch className='sidebar_icons'/>
              </div>
              <span>Search</span>
            </Link>
          </li>
          <li>
            <Link to="/library">
              <div>
                <ImLibrary className='sidebar_icons'/>
              </div>
              <span>Library</span>
            </Link>
          </li>
        </ul>
      </div>
      <div className="action_links">
      <ul className='sidebar-links'>
          <li >
            <Link to="/">
              <div>
                <MdPlaylistAdd className='sidebar_icons'/>
              </div>
              <span>Create Playlist</span>
            </Link>
          </li>
          <li>
            <Link to="/search">
              <div>
                <MdFavorite className='sidebar_icons'/>
              </div>
              <span>Liked Songs</span>
            </Link>
          </li>
          <li>
            <Link to="/library">
              <div>
                <ImLibrary className='sidebar_icons'/>
              </div>
              <span>your episodes</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Sidebar