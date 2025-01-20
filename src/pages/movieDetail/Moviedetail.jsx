import React, { useState, useEffect } from "react";
import axios from "axios";
import MovieCard from "../../components/moviecard/MovieCard"; // Import the MovieCard component
import styles from "./Moviedetail.module.css";
import { Link, useParams } from "react-router-dom";
import SkeletonCard from "../../components/SkeletonCard";
import 'react-loading-skeleton/dist/skeleton.css'

const Moviedetail = () => {
  const {type} = useParams();
  const [movieList, setMovieList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiKey = "5b56297f4ee90e3b2ba01f59779e393b";
  const url = type != "bollywood" ? `https://api.themoviedb.org/3/movie/${type}?api_key=${apiKey}`:`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=hi-IN&region=IN&with_original_language=hi
`;

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
  }, []);

  useEffect(()=>{
    fetchData();
  },[type])

  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <div className={styles.headingArea}>
      <h2 className={styles.heading}>{type.toUpperCase()}</h2>
      </div>
      <div className={styles.movieGrid}>
      {loading ? <SkeletonCard cards={10}/> : movieList.map((movie) => (
        <Link to={`/movie/${movie.id}`}>
          <MovieCard key={movie.id} movie={movie} />
        </Link>
      ))}
    </div>
    </>
  );
};

export default Moviedetail;
