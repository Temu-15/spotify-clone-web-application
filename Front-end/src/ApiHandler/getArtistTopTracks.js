import axios from "axios";

const getArtistTopTracks = async (artist_id) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/user/artist/tracks?artist_id=${artist_id}`,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.log(error?.message, "error with get artist top tracks");
  }
};

export default getArtistTopTracks;
