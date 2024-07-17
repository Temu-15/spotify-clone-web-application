import React from 'react';
import axios from 'axios';


const featuredPlaylists = async () => {
    try {
        const response = await axios.get(`http://localhost:3000/user/featuredPlaylists`, {withCredentials: true});
        return response.data;
    } catch (error) {
        console.error('Error fetching profile data', error);
        throw error;
    }
}

export default featuredPlaylists