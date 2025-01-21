import styles from './MovieDetailRow.module.css';
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import MovieCard from '../moviecard/MovieCard';
import { Config } from '../../config/Config';

import 'react-loading-skeleton/dist/skeleton.css'
import SkeletonCard from '../SkeletonCard';

const MovieDetailRow = ({ type }) => {
  const [movieList, setMovieList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const scrollContainerRef = useRef(null);

  const apiKey = Config.apiKey;
  const url =
    type !== "bollywood"
      ? `https://api.themoviedb.org/3/movie/${type}?api_key=${apiKey}`
      : `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&region=IN&with_original_language=hi`;

  const fetchData = async () => {
    try {
      const response = await axios.get(url);
      setMovieList(response.data.results);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();

    const scrollContainer = scrollContainerRef.current;

    if (!scrollContainer) return; // Ensure the ref exists

    const handleWheel = (event) => {
      event.preventDefault();
      scrollContainer.scrollLeft += event.deltaY;
    };

    scrollContainer.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      scrollContainer.removeEventListener("wheel", handleWheel);
    };
  }, []);

  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <div className={styles.headingArea}>
      <h1 className={styles.heading}>{type.toUpperCase()}</h1>
      <Link to={`/movies/${type}`}>View All</Link>
      </div>
      <div className={styles.movieGridRow} ref={scrollContainerRef}>
        {loading?<SkeletonCard cards={10}/>: movieList.map((movie) => (
          <Link key={movie.id} to={`/movie/${movie.id}`}>
            <MovieCard movie={movie} />
          </Link>
        ))}
      </div>
    </>
  );
};

export default MovieDetailRow;
