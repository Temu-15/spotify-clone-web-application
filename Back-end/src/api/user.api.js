const axiosConfig = require("../config/axios.config");

const getProfile = async function (access_token) {
  try {
    const response = axiosConfig.user.get("/me", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    return response;
  } catch (error) {
    console.log(error?.message, "error with get profile");
  }
};

const getPlaylist = async function (access_token, user_id, limit) {
  console.log("fucked up");
  try {
    const response = axiosConfig.user.get(
      `/playlists/${user_id}/tracks?fields=items%28added_at%2C+track%2C+video_thumbnail%29&limit=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    return response;
  } catch (error) {
    if (error.response?.status === 429 && retryCount < 5) {
      const retryAfter = error.response.headers["retry-after"];
      const waitTime = retryAfter
        ? parseInt(retryAfter) * 1000
        : Math.pow(2, retryCount) * 1000;
      console.log(`Rate limit hit, retrying in ${waitTime / 1000} seconds...`);
      await new Promise((resolve) => setTimeout(resolve, waitTime));
      return getPlaylist(id, retryCount + 1);
    }
    throw error;
  }
};

const getMyPlaylist = async function (access_token) {
  try {
    const response = axiosConfig.user.get("/me/playlists?limit=8&offset=3", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    return response;
  } catch (error) {
    console.log(error.response, "error with get my playlist");
  }
};

const getMyCategories = async function (access_token) {
  try {
    const response = await axiosConfig.user.get("/browse/categories?limit=10", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    return response;
  } catch (error) {
    console.log(error, "error with get my categories");
  }
};

const getCategoryPlaylists = async function (access_token, category_id) {
  try {
    const response = await axiosConfig.user.get(
      `/browse/categories/${category_id}/playlists?limit=6`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error.response, "error with get my categories");
  }
};

const getFeaturedPlaylists = async function (access_token) {
  try {
    const response = axiosConfig.user.get(
      "/browse/featured-playlists?limit=10",
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    return response;
  } catch (error) {
    console.log(error.response, "error with get featured playlists");
  }
};

const getBrowseCategories = async function (access_token) {
  try {
    const response = await axiosConfig.user.get("/browse/categories?limit=30", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    return response;
  } catch (error) {
    console.log(error, "error with get recommended genres");
  }
};

const getUserTopArtistsData = async function (access_token) {
  try {
    const response = await axiosConfig.user.get("/me/top/artists?limit=5", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    return response;
  } catch (error) {
    console.log(error.response, "error with get user top artists");
  }
};

const getArtistTopTracks = async function (access_token, artist_id) {
  try {
    const response = await axiosConfig.user.get(
      `/artists/${artist_id}/top-tracks`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.log(error.response, "error with get artist top tracks");
  }
};

const getArtistRelatedArtistsData = async (access_token, artist_id) => {
  try {
    const response = await axiosConfig.user.get(
      `/artists/${artist_id}/related-artists`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.log(error.response, "error with get artist related artists");
  }
};

const getSearchResultData = async (access_token, search_query) => {
  try {
    const response = await axiosConfig.user.get(
      `/search?q=${search_query}&type=playlist%2Cartist%2Ctrack`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.log(error.response, "error with get search results");
  }
};
module.exports = {
  getProfile,
  getPlaylist,
  getMyPlaylist,
  getMyCategories,
  getFeaturedPlaylists,
  getCategoryPlaylists,
  getBrowseCategories,
  getUserTopArtistsData,
  getArtistTopTracks,
  getArtistRelatedArtistsData,
  getSearchResultData,
};
