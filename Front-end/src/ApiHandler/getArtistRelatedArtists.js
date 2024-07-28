import React from "react";
import axios from "axios";

const getArtistRelatedArtists = async (artist_id) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/user/artist/relatedArtists?artist_id=${artist_id}`,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching profile data", error);
    throw error;
  }
};

export default getArtistRelatedArtists;
