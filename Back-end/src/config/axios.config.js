const axios = require('axios');
const apiConfig = require('./api.config');

const token = axios.create({
    baseURL: apiConfig.TOKEN_BASE_URL,
    headers: {
        'Authorization': 'Basic ' + Buffer.from(apiConfig.CLIENT_ID + ':' + apiConfig.CLIENT_SECRET).toString('base64'),
        'Content-Type': 'application/x-www-form-urlencoded'
    }
});

const user = axios.create({
    baseURL: apiConfig.BASE_URL,
})

module.exports = {token, user}