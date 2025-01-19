import React, { useEffect, useState } from "react";
import styles from "./Home.module.css";
import { Link } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import axios from "axios";
import { FaStar } from "react-icons/fa6";
import MovieDetailRow from "../../components/moviedetailrow/MovieDetailRow";

const Home = () => {
  const [movieList, setMovieList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiKey = "5b56297f4ee90e3b2ba01f59779e393b";
  const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1&sort_by=popularity.desc`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        setMovieList(response.data.results); // Access the "results" array
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
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
        // emulateTouch={true}
      >
        {movieList.map((movie) => (
          <Link to={`/movie/${movie.id}`}>
            <div key={movie.id} className={styles.carouselItem}>
              <div className={styles.homeImage}>
                <img
                  src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                  alt={movie.original_title}
                />
              </div>
              <div className={styles.details}>
                <h2 className={styles.title}>{movie.title}</h2>
                <div className={styles.meta}>
                  <h3 className={styles.releaseDate}>{movie.release_date}</h3>
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
      <div>
      <MovieDetailRow type={'popular'}/>
      </div>
      <div>
        <MovieDetailRow type={'upcoming'}/>
      </div>
      <div>
        <MovieDetailRow type={'top_rated'}/>
      </div>
      <div>
        <MovieDetailRow type={'bollywood'}/>
      </div>
    </>
  );
};

export default Home;
