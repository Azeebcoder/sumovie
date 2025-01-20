import React, { useState, useEffect } from "react";
import axios from "axios";
import MovieCard from "../../components/moviecard/MovieCard"; 
import styles from "./Moviedetail.module.css";
import { Link, useParams } from "react-router-dom";
import SkeletonCard from "../../components/SkeletonCard";

const Moviedetail = () => {
  const { type } = useParams();
  const [movieList, setMovieList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiKey = "5b56297f4ee90e3b2ba01f59779e393b";

  // Initialize currentPage from localStorage or default to 1
  const [currentPage, setCurrentPage] = useState(() => {
    const savedPage = localStorage.getItem("pageno");
    return savedPage ? parseInt(savedPage, 10) : 1;
  });

  const fetchData = async (page) => {
    try {
      setLoading(true);
      const url =
        type !== "bollywood"
          ? `https://api.themoviedb.org/3/movie/${type}?api_key=${apiKey}&page=${page}`
          : `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=hi-IN&region=IN&with_original_language=hi&page=${page}`;
      const response = await axios.get(url);
      setMovieList(response.data.results);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [type, currentPage]);

  // Save currentPage to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("pageno", currentPage);
  }, [currentPage]);

  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <div className={styles.headingArea}>
        <h2 className={styles.heading}>{type.toUpperCase()}</h2>
      </div>
      <div className={styles.movieGrid}>
        {loading ? (
          <SkeletonCard cards={10} />
        ) : (
          movieList.map((movie) => (
            <Link to={`/movie/${movie.id}`} key={movie.id}>
              <MovieCard movie={movie} />
            </Link>
          ))
        )}
      </div>
      <div className={styles.pagination}>
        <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
          Previous
        </button>
        <span>Page {currentPage}</span>
        <button onClick={() => setCurrentPage((prev) => prev + 1)}>Next</button>
      </div>
    </>
  );
};

export default Moviedetail;
