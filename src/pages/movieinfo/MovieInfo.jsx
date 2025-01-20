import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from "./MovieInfo.module.css";
import { FaStar } from "react-icons/fa6";
import Moviedetail from '../movieDetail/Moviedetail.jsx'

const MovieInfo = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [watchProviders, setWatchProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [is18Plus, setIs18Plus] = useState(false); // New state for 18+ check
  const [credits, setCredits] = useState(null);
  const [images, setImages] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [similar,setSimilar] = useState(null);

  const apiKey = "5b56297f4ee90e3b2ba01f59779e393b";
  const movieUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`;
  const providerUrl = `https://api.themoviedb.org/3/movie/${id}/watch/providers?api_key=${apiKey}`;
  const releaseDatesUrl = `https://api.themoviedb.org/3/movie/${id}/release_dates?api_key=${apiKey}`;
  const castUrl = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}`;
  const imagesUrl = `https://api.themoviedb.org/3/movie/${id}/images?api_key=${apiKey}`;
  const trailerUrl = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apiKey}`;

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

        // List of possible 18+ certifications
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

        // Detect if the movie is rated 18+ in any region
        const is18Plus = releaseDates.some((item) =>
          item.release_dates?.some((date) => {
            const certification = date.certification?.toLowerCase() || "";
            return eighteenPlusCertifications.includes(certification);
          })
        );

        setIs18Plus(is18Plus);

        const providers = providerResponse.data.results.IN || {}; // Adjust region as needed
        setWatchProviders(providers.flatrate || []);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching movie details:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const response = await axios.get(castUrl);
      const response1 = await axios.get(imagesUrl);
      const response2 = await axios.get(trailerUrl);
      setCredits(response.data.cast);
      setImages(response1.data.backdrops);
      setTrailer(response2.data.results[0].key);
    };

    fetchMovieDetails();
  }, [movie]);

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
                ? Math.floor(Math.random() * 2) + 1 == 1
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
      <div>
        <div>
        <h3>Trailer</h3>
        <div
          style={{
            position: "relative",
            paddingBottom: "56.25%", // Aspect ratio (16:9)
            height: 0,
            overflow: "hidden",
            width: "100%", // Set width to 100% of the parent container
          }}
        >
          <iframe
            src={`https://www.youtube.com/embed/${trailer}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%", // Make the iframe fill the width of the container
              height: "100%", // Make the iframe fill the height of the container
            }}
          ></iframe>
        </div>
        </div>
        <div>
          <h3>Cast</h3>
          <div className={styles.cast}>
            {credits ? (
              credits.map((credit, index) => (
                <div key={credit.id}>
                  <img
                    src={`https://image.tmdb.org/t/p/w200${credit.profile_path}`}
                    alt={credit.name}
                  />
                  <h3>{credit.name}</h3>
                  <h4>{credit.character}</h4>
                </div>
              ))
            ) : (
              <></>
            )}
          </div>
        </div>
        <div>
          <h3>ScreenShots</h3>
          <div className={styles.screenShots}>
            {images ? (
              images.map((image, index) => (
                <div key={`sumit-${index}`}>
                  <img
                    src={`https://image.tmdb.org/t/p/original${image.file_path}`}
                    alt=""
                  />
                </div>
              ))
            ) : (
              <></>
            )}
          </div>
        </div>
        <div>
          <Moviedetail similar={id}/>
        </div>
      </div>
    </div>
  );
};

export default MovieInfo;
