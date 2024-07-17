const axiosConfig = require('../config/axios.config');
const apiConfig = require('../config/api.config');
const getToken = async function(code){
    try{
        const response = await axiosConfig.token.post('/token',{
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: apiConfig.REDIRECT_URI
        });
        return response;
    }
    catch(error){
        throw new error;
    }
}

module.exports = {getToken};