import React from 'react'
import Sidebar from './Sidebar';
import Login from './Login';
import Navbar from './Navbar';
import Footer from './Footer';
import Body from './Body';
import CuratedPlaylist from './CuratedPlaylist';
import Categories from './Categories';
import FeaturedPlaylists from './FeaturedPlaylists';
import Playlist from './Playlist';
import './Home.css';
function Home() {
  return (
  <div className='home'>
  <div className="spotify__body">
        <Sidebar className='sidebar'/>
        <div className="body">
          <Navbar searchEnabled={false}/>
          <div className="body__contents">
           <CuratedPlaylist />
           <FeaturedPlaylists/>
           <Categories/>
          </div>
        </div>
      </div>
      <div className="spotify__footer">
        <Footer />
      </div>
  </div>
  )
}

export default Home;