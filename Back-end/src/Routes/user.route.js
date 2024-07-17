const express = require('express');
const {userProfile, userPlaylist, myPlaylists, getCategoriesAndPlaylists, userFeaturedPlaylists, BrowseCategories} = require('../Controllers/user.controller');
const router = express.Router();



router.get('/profile', userProfile );
router.get('/playlist', userPlaylist);
router.get('/myplaylist', myPlaylists);
router.get('/mycategories', getCategoriesAndPlaylists);
router.get('/featuredPlaylists', userFeaturedPlaylists);
router.get('/browse', BrowseCategories);

module.exports = router;