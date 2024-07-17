import React from 'react'
import Sidebar from '../Components/Sidebar';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import Login from '../Components/Login'
import Browse from '../Components/Browse';
import './search.css';
import {useStateProvider} from '../utils/StateProvider'
import getBrowseCategories from '../ApiHandler/getBrowseCategories';
function Search() {
  const [{ user }, dispatch] = useStateProvider();
  if (!user){
    return 
  }
  return (
    <div className='search'>
      <div className="search-sidebar">
        <Sidebar className='sidebar' />
        <div className="search-body">
         <Navbar searchEnabled={true}/>
          <div className="search-contents">
            <Browse />
          </div>
        </div>
      
      </div>
      <div className="search-footer">
        <Footer />
      </div>
   </div>
       
    
  )
}

export default Search