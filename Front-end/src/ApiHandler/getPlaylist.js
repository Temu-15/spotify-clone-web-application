import React from 'react';
import axios from 'axios';


const getPlaylist = async (id) => {
    try {
        const response = await axios.get(`http://localhost:3000/user/playlist?user_id=${id}`, {withCredentials: true});
        return response;
    } catch (error) {
        console.error('Error fetching profile data', error);
        throw error;
    }
}

export default getPlaylist