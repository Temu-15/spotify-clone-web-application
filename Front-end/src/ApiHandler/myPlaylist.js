import React from 'react';
import axios from 'axios';


const myPlaylist = async () => {
    try {
        const response = await axios.get(`http://localhost:3000/user/myplaylist`, {withCredentials: true});
        return response.data;
    } catch (error) {
        console.error('Error fetching profile data', error);
        throw error;
    }
}

export default myPlaylist