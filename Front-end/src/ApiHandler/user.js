import axios from 'axios';

const userProfile = async () => {
    try {
        const response = await axios.get('http://localhost:3000/user/profile', {withCredentials: true});
        return response;
    } catch (error) {
        console.error('Error fetching profile data', error);
        throw error;
    }
};

export default userProfile;
