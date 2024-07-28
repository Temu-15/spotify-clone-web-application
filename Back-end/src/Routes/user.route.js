const express = require("express");
const {
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
} = require("../Controllers/user.controller");
const router = express.Router();

router.get("/profile", userProfile);
router.get("/playlist", userPlaylist);
router.get("/myplaylist", myPlaylists);
router.get("/mycategories", getCategoriesAndPlaylists);
router.get("/featuredPlaylists", userFeaturedPlaylists);
router.get("/browse", BrowseCategories);
router.get("/topitems/artists", getUserTopArtists);
router.get("/artist/tracks", getArtistTracks);
router.get("/artist/relatedArtists", getArtistRelatedArtists);
router.get("/search", getSearchResult);

module.exports = router;
