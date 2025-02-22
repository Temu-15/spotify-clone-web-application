const {
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
} = require("../api/user.api");

const userProfile = async (req, res) => {
  console.log("abu userprofile");
  const access_token = req.cookies.access_token;
  const response = await getProfile(access_token);
  if (response.status == 200) {
    return res.json(response.data);
  }
};

const userPlaylist = async (req, res) => {
  console.log("abu userplaylists");
  const user_id = req.query.user_id;
  const limit = req.query.limit;
  const access_token = req.cookies.access_token;
  const response = await getPlaylist(access_token, user_id, limit);
  if (response.status == 200) {
    return res.json(response.data);
  }
};

const myPlaylists = async (req, res) => {
  console.log("abu myplaylists");
  const access_token = req.cookies.access_token;
  const response = await getMyPlaylist(access_token);
  if (response.status == 200) {
    setTimeout(() => {
      return res.json(response.data);
    }, 100);
  }
};

const BrowseCategories = async (req, res) => {
  const access_token = req.cookies.access_token;
  if (!access_token) {
    return res.status(401).send("Access token is missing");
  }
  const response = await getBrowseCategories(access_token);
  console.log(response.data.categories);
  if (response.status == 200) {
    const browseCategory = response.data?.categories.items?.map((item) => {
      return {
        id: item.id,
        name: item.name,
        href: item.href,
        icons: item.icons,
      };
    });
    if (browseCategory) {
      return res.json(browseCategory);
    }
  }
};

const getCategoriesAndPlaylists = async (req, res) => {
  try {
    console.log("started");
    const access_token = req.cookies.access_token;
    if (!access_token) {
      return res.status(401).send("Access token is missing");
    }

    const response = await getMyCategories(access_token);
    if (response.status === 200) {
      const categories = await response.data.categories;
      console.log(categories);
      const categoryPlaylistsPromises = categories.items?.map(
        async (category) => {
          const playlists = await getCategoryPlaylists(
            access_token,
            category.id
          );
          const playlistitems = playlists.playlists;

          return {
            icon: category.icons[0].url,
            category: category?.name,
            playlists: playlistitems.items,
          };
        }
      );
      const categoryPlaylists = await Promise.all(categoryPlaylistsPromises);
      if (categoryPlaylists) {
        return res.json(categoryPlaylists);
      }
    }
  } catch (error) {
    res.status(500).send("Error fetching categories and playlists");
  }
};

const userFeaturedPlaylists = async (req, res) => {
  console.log("abu userfeatured playlists");
  const access_token = req.cookies.access_token;

  const response = await getFeaturedPlaylists(access_token);
  if (response.status == 200) {
    return res.json(response.data);
  }
};

const getUserTopArtists = async (req, res) => {
  const access_token = req.cookies.access_token;
  const response = await getUserTopArtistsData(access_token);

  if (response?.status == 200) {
    return res.json(response.data);
  }
};

const getArtistTracks = async (req, res) => {
  console.log("temu");
  const access_token = req.cookies.access_token;
  const artist_id = req.query.artist_id;
  const response = await getArtistTopTracks(access_token, artist_id);
  if (response.status == 200) {
    return res.json(response.data);
  }
};

const getArtistRelatedArtists = async (req, res) => {
  console.log("temu arak");
  const access_token = req.cookies.access_token;
  const artist_id = req.query.artist_id;
  const response = await getArtistRelatedArtistsData(access_token, artist_id);
  if (response.status == 200) {
    return res.json(response.data);
  }
};

const getSearchResult = async (req, res) => {
  const access_token = req.cookies.access_token;
  const search_query = req.query.search_value;
  const response = await getSearchResultData(access_token, search_query);
  if (response.status == 200) {
    return res.json(response.data);
  }
};
module.exports = {
  userProfile,
  userPlaylist,
  myPlaylists,
  getCategoriesAndPlaylists,
  userFeaturedPlaylists,
  BrowseCategories,
  getUserTopArtists,
  getArtistTracks,
  getArtistRelatedArtists,
  getSearchResult,
};
