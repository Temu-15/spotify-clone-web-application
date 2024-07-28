import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useStateProvider } from "../utils/StateProvider";
import getArtistTopTracks from "../ApiHandler/getArtistTopTracks";
import getArtistRelatedArtists from "../ApiHandler/getArtistRelatedArtists";
import { FaCirclePlay, FaLinesLeaning, FaCirclePause } from "react-icons/fa6";
import { MdFavoriteBorder } from "react-icons/md";
import { FaDownload } from "react-icons/fa6";
import { convertMillisecondsToMinSec } from "../utils/helperFunctions.js";
import { FaPlay } from "react-icons/fa";
import { SlOptions } from "react-icons/sl";
import { MdVerified } from "react-icons/md";
import "./artist.css";
import Footer from "../Components/Footer";
import Sidebar from "../Components/Sidebar";
import "../Components/topArtist.css";

function Artist() {
  const { id } = useParams();
  const location = useLocation();
  const { name, images, followers, genres } = location.state || {};
  const [
    { user, artistTracks, relatedArtists, currentTrack, isPlaying },
    dispatch,
  ] = useStateProvider();
  const navigate = useNavigate();
  const [displayedTracks, setDisplayedTracks] = useState(5);
  const handleShowMore = () => {
    setDisplayedTracks(artistTracks.length);
  };

  const handleShowLess = () => {
    setDisplayedTracks(5);
  };

  const trackClickHandler = (index) => {
    dispatch({
      type: "SET_CURRENT_TRACK",
      currentTrack: artistTracks[index],
    });
  };

  const playIconHandler = () => {
    if (currentTrack === artistTracks[0]) {
      dispatch({ type: "SET_IS_PLAYING", isPlaying: false });
      return;
    }

    dispatch({
      type: "SET_CURRENT_TRACK",
      currentTrack: artistTracks[0],
    });
  };
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
  useEffect(() => {
    const fetchArtistTracks = async () => {
      if (!user) return;
      try {
        const response = await getArtistTopTracks(id);
        dispatch({ type: "SET_ARTIST_TRACKS", artistTracks: response.tracks });
      } catch (error) {
        console.log("Error fetching artist's top tracks", error);
      }
    };
    fetchArtistTracks();
  }, [id]);

  useEffect(() => {
    const fetchRelatedArtists = async () => {
      if (!user) return;
      try {
        const response = await getArtistRelatedArtists(id);
        dispatch({
          type: "SET_RELATED_ARTISTS",
          relatedArtists: response.artists,
        });
      } catch (error) {
        console.log("Error fetching related artists", error);
      }
    };
    fetchRelatedArtists();
  }, [id]);
  console.log(relatedArtists);
  return (
    <div className="artist-page">
      <div className="spotify__body">
        <Sidebar className="sidebar" />
        <div className="body">
          <Navbar />
          <div className="artist-top">
            <div className="artist-banner">
              <div className="artist-image">
                <img src={images[0].url} />
              </div>
              <div className="artist-info">
                <h4 className="banner-title">
                  <span>
                    <MdVerified className="verified-icon" />
                  </span>
                  Verified Artist
                </h4>
                <h1>{name}</h1>
                <p>{followers} followers</p>
              </div>
            </div>
          </div>
          <div className="artist-body">
            <div className="control-icons">
              {isPlaying ? (
                <FaCirclePause
                  className="play-icon-artist"
                  onClick={playIconHandler}
                />
              ) : (
                <FaCirclePlay
                  className="play-icon-artist"
                  onClick={playIconHandler}
                />
              )}

              <span className="artist-follow">Follow</span>
              <SlOptions className="options-icon-artist" />
            </div>
            <div className="track-wrapper">
              <h4 className="tracktitle">Popular</h4>
              <div className="trackslist">
                <table>
                  {artistTracks
                    .slice(0, displayedTracks)
                    .map((track, index) => (
                      <tr
                        key={track.id}
                        className="track-item"
                        onClick={() => trackClickHandler(index)}
                      >
                        <td>{index + 1}</td>
                        <td className="track-titles-holder">
                          <div className="track-song-image">
                            <img
                              src={track.album.images[0].url}
                              alt={track.name}
                            />
                          </div>
                          <div className="track-name-album">
                            <div className="track-name">{track.name}</div>
                          </div>
                        </td>
                        <td className="track-date-added">
                          {new Date(track.album.release_date).toDateString()}
                        </td>
                        <td className="track-duration">
                          {convertMillisecondsToMinSec(track.duration_ms)}
                        </td>
                      </tr>
                    ))}
                </table>

                {displayedTracks < artistTracks.length && (
                  <button className="show-more-button" onClick={handleShowMore}>
                    See More
                  </button>
                )}
                {displayedTracks === artistTracks.length && (
                  <button className="show-less-button" onClick={handleShowLess}>
                    See Less
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="related-artists">
            <h2>Related Artists</h2>
            <div className="card-wrapper">
              {relatedArtists.slice(0, 5).map((artist) => (
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
        </div>
      </div>
      <div className="spotify__footer">
        <Footer />
      </div>
    </div>
  );
}

export default Artist;
