import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import styles from "./MovieInfo.module.css";
import { FaStar } from "react-icons/fa6";
import Moviedetail from "../movieDetail/Moviedetail.jsx";
import { useLocation } from "react-router-dom";
import Trailer from "../../components/trailer/Trailer.jsx";
import Cast from "../../components/cast/Cast.jsx";
import ScreenShots from "../../components/screenshots/ScreenShots.jsx";
import { Config } from "../../config/Config.js";

const MovieInfo = () => {
  const { id } = useParams();

  const [movie, setMovie] = useState(null);
  const [watchProviders, setWatchProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [is18Plus, setIs18Plus] = useState(false);

  const apiKey = Config.apiKey;

  const movieUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`;

  const providerUrl = `https://api.themoviedb.org/3/movie/${id}/watch/providers?api_key=${apiKey}`;

  const releaseDatesUrl = `https://api.themoviedb.org/3/movie/${id}/release_dates?api_key=${apiKey}`;

  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const [movieResponse, providerResponse, releaseDatesResponse] =
          await Promise.all([
            axios.get(movieUrl),
            axios.get(providerUrl),
            axios.get(releaseDatesUrl),
          ]);

        setMovie(movieResponse.data);

        const releaseDates = releaseDatesResponse.data.results || [];

        const eighteenPlusCertifications = [
          "18",
          "18+",
          "r",
          "x",
          "nc-17",
          "a",
          "adults-only",
          "r18+",
          "restricted",
        ];

        const is18PlusDetected = releaseDates.some((item) =>
          item.release_dates?.some((date) => {
            const certification =
              date.certification?.toLowerCase() || "";

            return eighteenPlusCertifications.includes(certification);
          })
        );

        setIs18Plus(is18PlusDetected);

        const providers = providerResponse.data.results.IN || {};

        setWatchProviders(providers.flatrate || []);

        setLoading(false);
      } catch (err) {
        console.error("Error fetching movie details:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    setLoading(true);

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
            src={`https://image.tmdb.org/t/p/w500${
              movie.belongs_to_collection
                ? Math.floor(Math.random() * 2) + 1 === 1
                  ? movie.belongs_to_collection.poster_path
                  : movie.poster_path
                : movie.poster_path
            }`}
            alt={movie.title}
            className={styles.poster}
          />
        </div>

        <div className={styles.info}>
          <div className={styles.movieName}>
            <h1>
              {is18Plus ? <span>(18+) </span> : null}
              {movie.title} ({movie.release_date.substring(0, 4)})
            </h1>
          </div>

          <Link className={styles.actionButtons} to={`/watch/${id}`}>
            <button className={styles.watchNowBtn} >
              ▶ Watch Now
            </button>
          </Link>

          <h2>Overview</h2>

          <p>{movie.overview}</p>

          <h3>Release Date</h3>

          <p>{movie.release_date}</p>

          <h3>Rating :</h3>

          <p className={styles.rating}>
            {movie.vote_average.toFixed(1)}

            <span>
              <FaStar />
            </span>
          </p>

          <h3>Runtime :</h3>

          <p>{movie.runtime} min</p>

          <h3>Status :</h3>

          <p>{movie.status}</p>

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
                <div
                  key={provider.provider_id}
                  className={styles.provider}
                >
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

      <div>
        <div className={styles.infoSection}>
          <h2>Trailer</h2>

          <Trailer id={id} />
        </div>

        <div className={styles.infoSection}>
          <div className={styles.sectionHeader}>
            <h2>Cast</h2>

            <button className={styles.viewMoreBtn}>
              View All
            </button>
          </div>

          <Cast id={id} limit={10} />
        </div>

        <div className={styles.infoSection}>
          <div className={styles.sectionHeader}>
            <h2>ScreenShots</h2>
          </div>

          <ScreenShots id={id} limit={5} />
        </div>

        <div>
          <Moviedetail similar={id} />
        </div>
      </div>
    </div>
  );
};

export default MovieInfo;