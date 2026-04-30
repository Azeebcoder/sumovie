import React, { useEffect, useState, useRef } from "react";
import styles from "./Home.module.css";
import { Link } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import axios from "axios";
import { FaStar } from "react-icons/fa6";
import MovieDetailRow from "../../components/moviedetailrow/MovieDetailRow";
import SkeletonCard from "../../components/SkeletonCard";
import { Config } from "../../config/Config";

const Home = () => {
  const [movieList, setMovieList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const carouselRef = useRef(null);

  const apiKey = Config.apiKey;
  const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1&sort_by=popularity.desc`;

  useEffect(() => {
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

    fetchData();
  }, []);

  // Disable normal mouse wheel on desktop
  useEffect(() => {
    const carousel = carouselRef.current;

    const handleWheel = (e) => {
      // Allow touch/mobile normally
      if (window.innerWidth <= 768) return;

      // Only allow CTRL + wheel
      if (!e.ctrlKey) {
        e.preventDefault();
      }
    };

    if (carousel) {
      carousel.addEventListener("wheel", handleWheel, {
        passive: false,
      });
    }

    return () => {
      if (carousel) {
        carousel.removeEventListener("wheel", handleWheel);
      }
    };
  }, []);

  if (error) return <p>Error: {error}</p>;

  return (
    <>
      {loading ? (
        <SkeletonCard />
      ) : (
        <div ref={carouselRef} className={styles.carouselWrapper}>
          <Carousel
            autoPlay
            infiniteLoop
            interval={5000}
            swipeable
            stopOnHover={false}
            showThumbs={false}
            showStatus={false}
            showIndicators={false}
            transitionTime={700}
          >
            {movieList.map((movie) => (
              <Link key={`sumit-${movie.id}`} to={`/movie/${movie.id}`}>
                <div className={styles.carouselItem}>
                  <div className={styles.homeImage}>
                    <img
                      src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                      alt={movie.original_title}
                    />
                  </div>

                  <div className={styles.details}>
                    <h2 className={styles.title}>{movie.title}</h2>

                    <div className={styles.meta}>
                      <h3 className={styles.releaseDate}>
                        {movie.release_date}
                      </h3>

                      <h4 className={styles.rating}>
                        <span>
                          <FaStar />
                        </span>

                        {movie.vote_average.toFixed(1)}
                      </h4>
                    </div>

                    <div className={styles.overview}>
                      <p>{movie.overview}</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </Carousel>
        </div>
      )}

      <div>
        <MovieDetailRow type={"popular"} />
      </div>

      <div>
        <MovieDetailRow type={"upcoming"} />
      </div>

      <div>
        <MovieDetailRow type={"top_rated"} />
      </div>

      <div>
        <MovieDetailRow type={"bollywood"} />
      </div>
    </>
  );
};

export default Home;