import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from "./MovieInfo.module.css";

const MovieInfo = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [watchProviders, setWatchProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiKey = "5b56297f4ee90e3b2ba01f59779e393b";
  const movieUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`;
  const providerUrl = `https://api.themoviedb.org/3/movie/${id}/watch/providers?api_key=${apiKey}`;

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const [movieResponse, providerResponse] = await Promise.all([
          axios.get(movieUrl),
          axios.get(providerUrl),
        ]);

        setMovie(movieResponse.data);
        const providers = providerResponse.data.results.IN || {}; // Replace "IN" with your desired region
        setWatchProviders(providers.flatrate || []);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!movie) return null;

  return (
    <div className={styles.movieDetailContainer}>
      <div
        className={styles.banner}
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
        }}
      >
        <div className={styles.overlay}>
          <h1 className={styles.title}>{movie.title}</h1>
        </div>
      </div>

      <div className={styles.detailsSection}>
        <div className={styles.posterWrapper}>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className={styles.poster}
          />
        </div>

        <div className={styles.info}>
          <h2>Overview</h2>
          <p>{movie.overview}</p>
            <h3>Release Date</h3>
            <p>{movie.release_date}</p>
            <h3>Rating : </h3>
            <p>{movie.vote_average.toFixed(1)} ⭐ </p>
            <h3>Runtime : </h3>
            <p>{movie.runtime} min</p>

          <h3>Genres</h3>
          <div className={styles.genres}>
            {movie.genres.map((genre) => (
              <span key={genre.id}>{genre.name}</span>
            ))}
          </div>

          <h3>Where to Watch</h3>
          <div className={styles.watchProviders}>
            {watchProviders.length > 0 ? (
              watchProviders.map((provider) => (
                <div key={provider.provider_id} className={styles.provider}>
                  <img
                    src={`https://image.tmdb.org/t/p/w92${provider.logo_path}`}
                    alt={provider.provider_name}
                  />
                  <span>{provider.provider_name}</span>
                </div>
              ))
            ) : (
              <p>Not available for streaming in your region.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieInfo;
