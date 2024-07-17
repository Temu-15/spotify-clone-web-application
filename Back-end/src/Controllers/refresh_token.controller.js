const {refreshToken} = require('../api/refresh_token.api');

const refresh = async (req,res) =>{
    const milliSeconds = 1000;
    const response = await refreshToken(req.cookies.refresh_token);
    if(response.status == 200){
        const {access_token, expires_in} = response.data;
        res.cookie('access_token', access_token, {maxAge: expires_in * milliSeconds});
        res.redirect(req.query.redirect);
    }
    else{
        res.redirect('/login');
    }

}

module.exports = {refresh}