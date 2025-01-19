import React from "react";
import styles from "./Navbar.module.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className={styles.navBar}>
      <ul className={styles.leftNav}>
        <Link to={"/"} className={styles.logo}>
          Sumyy
        </Link>
        <div className={styles.categories}>
          <Link to={"/movies/popular"}>Popular</Link>
          <Link to={"/movies/upcoming"}>Upcoming</Link>
          <Link to={"/movies/top_rated"}>Top Rated</Link>
          <Link to={"/movies/bollywood"}>Bollywood</Link>
        </div>
      </ul>
    </div>
  );
};

export default Navbar;
