import React from 'react';
import axios from 'axios';


const getPlaylist = async (id,limit) => {
    try {
        const response = await axios.get(`http://localhost:3000/user/playlist?user_id=${id}&limit=${limit}`, {withCredentials: true});
        return response;
    } catch (error) {
        console.error('Error fetching profile data', error);
        throw error;
    }
}

export default getPlaylist