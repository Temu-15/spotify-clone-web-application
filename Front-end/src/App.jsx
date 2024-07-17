import React, { useEffect } from 'react';
import userProfile from './ApiHandler/user';
import Login from './Components/Login';
import { useStateProvider } from './utils/StateProvider';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Components/Home'
import Sidebar from './Components/Sidebar';
import Search from './Pages/Search';

function App() {
    const [{ user }, dispatch] = useStateProvider();

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const profile = await userProfile();
                dispatch({
                    type: 'SET_USER',
                    user: profile
                });
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        };

        fetchUserProfile();
    }, []);

    return ( <BrowserRouter>
  <Routes>
    <Route path="/" element={ <div className="App">{user ? <Home /> : <Login />}</div>} />
    <Route path="/search" element={<Search />} />
  </Routes>
  </BrowserRouter> 
  
    );
}

export default App;
