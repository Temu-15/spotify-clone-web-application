import React from "react";
import axios from "axios";

const getSearchResults = async (searchQuery) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/user/search?search_value=${searchQuery}`,
      { withCredentials: true }
    );
    console.log("Search results:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching profile data", error);
    throw error;
  }
};

export default getSearchResults;
