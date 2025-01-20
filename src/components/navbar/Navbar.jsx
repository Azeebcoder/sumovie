import React, { useState } from "react";
import styles from "./Navbar.module.css";
import { Link } from "react-router-dom";
import { IoIosMenu,IoIosClose  } from "react-icons/io";

const Navbar = () => {
  const [isOpen,setIsOpen] = useState(false);

  const handleNavOpen = () => {
    setIsOpen(!isOpen);
  }
  return (
    <div className={styles.navBar}>
      <ul className={styles.leftNav}>
        <Link to={"/"} className={styles.logo}>
          Sumyy
        </Link>
        <div className={isOpen?`${styles.categories} ${styles.navActive}`: `${styles.categories}`}>
          <Link to={"/"} onClick={handleNavOpen}>Home</Link>
          <Link to={"/movies/popular"} onClick={handleNavOpen}>Popular</Link>
          <Link to={"/movies/upcoming"} onClick={handleNavOpen}>Upcoming</Link>
          <Link to={"/movies/top_rated"} onClick={handleNavOpen}>Top Rated</Link>
          <Link to={"/movies/bollywood"} onClick={handleNavOpen}>Bollywood</Link>
        </div>
      </ul>
      <ul className={styles.rightNav}>
        <button className={styles.menu}  onClick={handleNavOpen}>{isOpen?<IoIosClose />:<IoIosMenu />}</button>
      </ul>
    </div>
  );
};

export default Navbar;
