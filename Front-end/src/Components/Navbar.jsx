import React from "react";
import { useState, useEffect } from "react";
import { FaChevronRight } from "react-icons/fa6";
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronCircleDown } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { FaBackspace } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import getSearchResults from "../ApiHandler/getSearchResults";
import "./Nabvar.css";
import { useStateProvider } from "../utils/StateProvider";
function Navbar({ searchEnabled }) {
  const [{ user, searchResults }, dispatch] = useStateProvider();
  const [searchQuery, setSearchQuery] = useState(null);
  const [activatedCollapsible, SetActivatedCollapsible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (searchQuery.length > 0) {
        try {
          const response = await getSearchResults(searchQuery);
          dispatch({
            type: "SET_SEARCH_RESULTS",
            searchResults: response,
          });
        } catch (error) {
          console.error("Error fetching search results", error);
        }
      } else {
        dispatch({
          type: "SET_SEARCH_RESULTS",
          searchResults: null,
        });
      }
    };

    const delayDebounceFn = setTimeout(() => {
      fetchSearchResults();
    }, 50);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, user.accessToken, dispatch]);

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
  };
  const forwardMoveHandler = () => {
    navigate(1);
  };
  const backwardMoveHandler = () => {
    navigate(-1);
  };

  const chevronclickhandler = () => {
    SetActivatedCollapsible(!activatedCollapsible);
  };
  console.log(searchQuery);
  return (
    <div className="navbar">
      <div className="navbar-left">
        <div>
          <FaChevronLeft
            className="navbar-left-icon"
            onClick={backwardMoveHandler}
          />
          <FaChevronRight
            className="navbar-right-icon"
            onClick={forwardMoveHandler}
          />
        </div>
        {searchEnabled ? (
          <div className="header--search input-group has-left-icon has-right-icon can-delete">
            <FaSearch className="left-icon" />
            <input
              type="text"
              id="search"
              name="search"
              className="input"
              placeholder="Enter your keyword"
              onChange={handleInputChange}
            />
            <FaBackspace className="right-icon clear--search lni lni-close" />
          </div>
        ) : null}
      </div>

      <div className="navbar-right">
        <div className="navbar-right-profile">
          <img src={user?.images[0].url} alt="user profile image" />

          <h3>{user?.display_name}</h3>
          <div className="navbar-chevron" onClick={chevronclickhandler}>
            <FaChevronDown className="icon" />
          </div>
        </div>
        <ul
          className={`navbar-right-collapsible ${
            activatedCollapsible ? "navbar-activated" : ""
          }`}
        >
          <li>
            <Link to="/account">Account</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link to="/settings">Settings</Link>
          </li>
          <li>
            <Link to="/logout">Logout</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
