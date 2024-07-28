import React, { useEffect } from "react";
import getUserTopArtists from "../ApiHandler/UserTopArtists";
import { useStateProvider } from "../utils/StateProvider";
import { FaPlay } from "react-icons/fa";
import "./topArtist.css";
import { Link, useNavigate } from "react-router-dom";
function TopArtists() {
  const [{ user, topArtists }, dispatch] = useStateProvider();
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
    console.log(
      artist_id,
      artist_images,
      artist_name,
      artist_followers,
      artist_genres
    );
  };
  useEffect(() => {
    if (!user) {
      return;
    }
    try {
      const fetchTopArtists = async () => {
        const response = await getUserTopArtists(user.id);
        dispatch({ type: "SET_TOP_ARTISTS", topArtists: response });
      };
      fetchTopArtists();
    } catch (error) {
      console.log("Error fetching top artists", error);
    }
  }, []);
  console.log(topArtists);
  return (
    <div className="top-artists">
      <h2>Top Artists</h2>
      <div className="card-wrapper">
        {topArtists?.items?.map((artist) => (
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
  );
}

export default TopArtists;
