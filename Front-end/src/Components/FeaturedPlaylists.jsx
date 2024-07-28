import React, { useState, useEffect } from "react";
import featuredPlaylists from "../ApiHandler/featuredPlaylists";
import { useStateProvider } from "../utils/StateProvider";
import "./featuredplaylist.css";
import Playlist from "./Playlist";

function FeaturedPlaylists() {
  const [{ featuredPlaylist, user }, dispatch] = useStateProvider();
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeaturedPlaylist = async (retryCount = 0) => {
      if (featuredPlaylist.length > 0) return;

      const cachedData = localStorage.getItem("featuredPlaylist");
      if (cachedData) {
        dispatch({
          type: "SET_FEATURED_PLAYLIST",
          featuredPlaylist: JSON.parse(cachedData),
        });
        return;
      }

      try {
        const featuredPlaylistData = await featuredPlaylists();
        dispatch({
          type: "SET_FEATURED_PLAYLIST",
          featuredPlaylist: featuredPlaylistData.playlists.items,
        });
        localStorage.setItem(
          "featuredPlaylist",
          JSON.stringify(featuredPlaylistData.playlists.items)
        );
        setError(null);
      } catch (error) {
        if (error.response?.status === 429 && retryCount < 5) {
          const waitTime = Math.pow(2, retryCount) * 1000;
          setTimeout(() => fetchFeaturedPlaylist(retryCount + 1), waitTime);
        } else {
          setError(
            "Failed to load featured playlists. Please try again later."
          );
        }
      }
    };

    fetchFeaturedPlaylist();
  }, []);
  console.log(featuredPlaylist);
  return (
    <div className="featured-playlist">
      {featuredPlaylist?.map((playlist) => (
        <Playlist key={playlist.id} id={playlist.id} name={playlist.name} />
      ))}
    </div>
  );
}

export default FeaturedPlaylists;
