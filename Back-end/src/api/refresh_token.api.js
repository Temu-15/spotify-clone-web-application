const axiosConfig = require('../config/axios.config');

const refreshToken = async function(refreshToken){
    try{
        const response = axiosConfig.token.post('/token',{
            grant_type:'refresh_token',
            refresh_token: refreshToken
        });
        return response;
    }
    catch(error){
        console.log(error);
    }
}

module.exports = {refreshToken};