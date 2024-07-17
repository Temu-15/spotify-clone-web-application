const apiConfig = require('../config/api.config');


function generateRandomString(length){
    let randomString = '';
    const possibleLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
        randomString += possibleLetters.charAt(Math.floor(Math.random() * possibleLetters.length));
    }
    return randomString;

}
module.exports = {generateRandomString}