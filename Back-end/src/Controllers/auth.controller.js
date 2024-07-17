const queryString = require('querystring');
const {getToken} = require('../api/auth.api');
const {CLIENT_ID,REDIRECT_URI,SCOPE,STATE_KEY} = require('../config/api.config');
const {generateRandomString} = require('../utils/helpers.util');

const auth = (req, res) => {
    console.log(CLIENT_ID);
    const state = generateRandomString(16);
    res.cookie(STATE_KEY, state);
   
    res.redirect('https://accounts.spotify.com/authorize?'+ queryString.stringify({
        response_type: 'code',
        client_id: CLIENT_ID,
        scope: SCOPE,
        redirect_uri: REDIRECT_URI,
        state: state,
        show_dialog: true,
    }))
}

const callback = async (req, res)=>{
    const milliSeconds = 1000;
    const one_week = 604800;
    const {error=null,
        code=null,
        state=null} = req.query;
    const storedState = req.cookies[STATE_KEY];
    if(error || state === null || state !== storedState){
        res.redirect('/login');
    } 
    else{
    res.clearCookie(STATE_KEY);
    const response = await getToken(code);
    if(response.status == 200){
        const {access_token, refresh_token,expires_in} = response.data;
        console.log(response);
        res.cookie('access_token', access_token,{maxAge: expires_in *1000});
        res.cookie('refresh_token', refresh_token,{maxAge: expires_in *604800});
        res.redirect('https://spotify-clone-web-application-front.vercel.app');
    }
    else{
        res.redirect('/login');
    }

}
}
module.exports = {auth, callback}