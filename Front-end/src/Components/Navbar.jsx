import React from "react";
import { useState } from "react";
import { FaChevronRight } from "react-icons/fa6";
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronCircleDown } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { FaBackspace } from "react-icons/fa";
import { Link } from "react-router-dom";
import './Nabvar.css';
function Navbar({searchEnabled}) {
    const [activatedCollapsible, SetActivatedCollapsible] = useState(false);
    const chevronclickhandler = () => {
        SetActivatedCollapsible(!activatedCollapsible);
    }
  return (
    <div className="navbar">
        <div className="navbar-left">
            <div>
                <FaChevronLeft className="navbar-left-icon"/>
                <FaChevronRight className="navbar-right-icon"/>
            </div>
            {searchEnabled ?  <div className="header--search input-group has-left-icon has-right-icon can-delete">
                <FaSearch className="left-icon"/>
                <input type="text" id="search" name="search" className="input" placeholder="Enter your keyword" />
                <FaBackspace  className="right-icon clear--search lni lni-close"/>

            </div> : null}
           
        </div>
      
        <div className="navbar-right">
            <div className="navbar-right-profile">
                <img src="https://sm.ign.com/ign_ap/cover/a/avatar-gen/avatar-generations_hugw.jpg" alt="user profile" />

                <h3>Temesgen</h3>
                <div className="navbar-chevron" onClick={chevronclickhandler}>
                    <FaChevronDown className="icon"/>
                </div>
            </div>
            <ul className={`navbar-right-collapsible ${activatedCollapsible ? 'navbar-activated' : ''}`}>
                <li>
                    <Link to='/account' >Account</Link>
                </li>
                <li>
                    <Link to='/profile'>Profile</Link>
                </li>
                <li>
                    <Link to='/settings'>Settings</Link>
                </li>
                <li>
                    <Link to='/logout'>Logout</Link>
                </li>
            </ul>
        </div>
    </div>
  )
}

export default Navbar