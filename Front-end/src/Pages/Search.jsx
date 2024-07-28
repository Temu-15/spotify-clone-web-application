import React from "react";
import { FaPlay } from "react-icons/fa6";
import Sidebar from "../Components/Sidebar";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Login from "../Components/Login";
import Browse from "../Components/Browse";
import "./search.css";
import { useStateProvider } from "../utils/StateProvider";
import getBrowseCategories from "../ApiHandler/getBrowseCategories";
function Search() {
  const [{ user, searchResults }, dispatch] = useStateProvider();
  const navigate = useNavigate();

  const artistCardClickHandler = (
    artist_id,
    artist_images,
    artist_name,
    artist_genres,
    artist_followers
  ) => {
    navigate(`/artist/${artist_id}`, {
      state: {
        name: artist_name,
        images: artist_images,
        followers: artist_followers,
        genres: artist_genres,
      },
    });
  };

  const PlaylistClickHandler = (playlist) => {
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
  console.log(searchResults);
  if (!user) {
    return;
  }
  return (
    <div className="search">
      <div className="search-sidebar">
        <Sidebar className="sidebar" />
        <div className="search-body">
          <Navbar searchEnabled={true} />
          <div className="search-contents">
            {!searchResults ? (
              <Browse />
            ) : (
              <div className="search-body-contents">
                <div className="search-artists">
                  <h2>Artists</h2>
                  <div className="card-wrapper">
                    {searchResults.artists.items.slice(0, 5).map((artist) => (
                      <div
                        className="card"
                        key={artist.id}
                        onClick={() =>
                          artistCardClickHandler(
                            artist.id,
                            artist.images,
                            artist.name,
                            artist.genres,
                            artist.followers.total
                          )
                        }
                      >
                        <div className="cover artist">
                          <img src={artist.images[1].url} alt="cover image" />
                          <div className="play-icon">
                            <FaPlay className="fa-play" />
                          </div>
                        </div>
                        <div className="card-content">
                          <h4>{artist.name}</h4>
                          <p>Artist</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="search-playlist">
                  <h2>Playlists</h2>
                  <div className="search-playlist-container">
                    {searchResults.playlists.items
                      .slice(0, 6)
                      .map((playlist) => (
                        <div
                          className="playlist-item"
                          onClick={() => {
                            PlaylistClickHandler(playlist);
                          }}
                        >
                          <div className="playlist-item-image">
                            <img
                              src={playlist.images[0]?.url}
                              alt={playlist?.name}
                            />
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
                                : "Playlist"}
                            </p>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
                <div className="search-tracks"></div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="search-footer">
        <Footer />
      </div>
    </div>
  );
}

export default Search;
