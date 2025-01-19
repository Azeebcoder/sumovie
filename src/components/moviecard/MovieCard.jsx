import React from "react";
import styles from "./MovieCard.module.css";

const MovieCard = ({ movie }) => {
  return (
    <div className={styles.card}>
      <div className={styles.cardImage}>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.original_title}
        />
      </div>
      <div className={styles.cardDetails}>
        <h2 className={styles.title}>{movie.title}</h2>
        <div className={styles.meta}>
          <span className={styles.releaseDate}>{movie.release_date}</span>
          <span className={styles.rating}>{movie.vote_average.toFixed(1)} ⭐</span>
        </div>
        <p className={styles.overview}>{movie.overview}</p>
      </div>
    </div>
  );
};

export default MovieCard;
