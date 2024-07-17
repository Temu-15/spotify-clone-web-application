require('dotenv').config()

const BASE_URL = "https://api.spotify.com/v1";
const TOKEN_BASE_URL = 'https://accounts.spotify.com/api';
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const SCOPE = process.env.SCOPE;

const STATE_KEY = 'spotify_auth_state';
const MARKET = 'US';
const LOW_LIMIT = 12;
const DEFAULT_LIMIT = 28;

module.exports = {BASE_URL,TOKEN_BASE_URL,CLIENT_ID,CLIENT_SECRET,REDIRECT_URI,SCOPE,STATE_KEY,MARKET,LOW_LIMIT,DEFAULT_LIMIT}