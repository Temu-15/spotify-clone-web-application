import React, { useEffect } from "react";
import userProfile from "./ApiHandler/user";
import Login from "./Components/Login";
import { useStateProvider } from "./utils/StateProvider";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import Sidebar from "./Components/Sidebar";
import Search from "./Pages/Search";
import Playlist from "./Pages/Playlist";
import Artist from "./Pages/Artist";

function App() {
  const [{ user }, dispatch] = useStateProvider();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const profile = await userProfile();
        dispatch({
          type: "SET_USER",
          user: profile,
        });
      } catch (error) {
        console.log("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);
  console.log(user);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<div className="App">{user ? <Home /> : <Login />}</div>}
        />
        <Route path="/search" element={<Search />} />
        <Route path="/playlist/:id" element={<Playlist />} />
        <Route path="/artist/:id" element={<Artist />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
