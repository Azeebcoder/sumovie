import React, { useState } from "react";
import styles from "./Navbar.module.css";
import { Link } from "react-router-dom";
import { IoIosMenu, IoIosClose } from "react-icons/io";
import { IoSearchSharp } from "react-icons/io5";
import { useParams,useNavigate } from "react-router-dom";

const Navbar = () => {
  const {type} = useParams();
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false);

  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchToggle = () => {
    setIsSearchVisible((prevState) => !prevState); // Toggle search box visibility
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value); // Update the search query as the user types
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    type ? navigate(`/movies/${type}/${searchQuery}`):navigate(`movies/sumit/${searchQuery}`);
    setIsSearchVisible(!isSearchVisible)
    localStorage.removeItem("pageno")
    setSearchQuery("");    
  };

  const handleNavOpen = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className={styles.navBar}>
      <div className={styles.searchSection}>
        {isSearchVisible && <div className={styles.overlay}></div>}{" "}
        {/* Dark background overlay */}
        <button className={styles.searchButton} onClick={handleSearchToggle}>
        <IoSearchSharp />
        </button>
        {isSearchVisible && (
          <div className={styles.searchContainer}>
            <form onSubmit={handleSearchSubmit}>
              <input
                className={styles.searchInput}
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Enter movie name"
                autoFocus
              />
              <button className={styles.submitButton} type="submit">
                Search
              </button>
            </form>
          </div>
        )}
      </div>
      <ul className={styles.leftNav}>
        <Link to={"/"} className={styles.logo}>
          Sumyy
        </Link>
        <div
          className={
            isOpen
              ? `${styles.categories} ${styles.navActive}`
              : `${styles.categories}`
          }
        >
          <Link to={"/"} onClick={handleNavOpen}>
            Home
          </Link>
          <Link to={"/movies/popular"} onClick={handleNavOpen}>
            Popular
          </Link>
          <Link to={"/movies/upcoming"} onClick={handleNavOpen}>
            Upcoming
          </Link>
          <Link to={"/movies/top_rated"} onClick={handleNavOpen}>
            Top Rated
          </Link>
          <Link to={"/movies/bollywood"} onClick={handleNavOpen}>
            Bollywood
          </Link>
        </div>
      </ul>
      <ul className={styles.rightNav}>
        <button className={styles.menu} onClick={handleNavOpen}>
          {isOpen ? <IoIosClose /> : <IoIosMenu />}
        </button>
      </ul>
    </div>
  );
};

export default Navbar;
