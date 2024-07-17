import React from 'react';
import axios from 'axios';


const getCategoryPlaylists = async (category_id) => {
    try {
        const response = await axios.get(`http://localhost:3000/user/category/playlists`, {withCredentials: true});
        return response.data;
    } catch (error) {
        console.error('Error fetching profile data', error);
        throw error;
    }
}

export default getCategoryPlaylists