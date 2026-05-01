import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import {
  FaStar,
  FaPlay,
  FaFire,
  FaTv,
  FaFilm,
} from "react-icons/fa6";

import {
  HiSparkles,
  HiTrendingUp,
} from "react-icons/hi";

import { motion } from "framer-motion";

import MovieDetailRow from "../../components/moviedetailrow/MovieDetailRow";
import SkeletonCard from "../../components/SkeletonCard";
import { Config } from "../../config/Config";

const Home = () => {
  const [movieList, setMovieList] = useState([]);
  const [trending, setTrending] = useState([]);
  const [tvShows, setTvShows] = useState([]);
  const [loading, setLoading] = useState(true);

  const carouselRef = useRef(null);

  const apiKey = Config.apiKey;

  const popularMoviesUrl = useMemo(
    () =>
      `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`,
    [apiKey]
  );

  const trendingUrl = useMemo(
    () =>
      `https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}`,
    [apiKey]
  );

  const tvUrl = useMemo(
    () =>
      `https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}&language=en-US&page=1`,
    [apiKey]
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [popularRes, trendingRes, tvRes] = await Promise.all([
          axios.get(popularMoviesUrl),
          axios.get(trendingUrl),
          axios.get(tvUrl),
        ]);

        setMovieList(popularRes.data.results);
        setTrending(trendingRes.data.results);
        setTvShows(tvRes.data.results);

        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [popularMoviesUrl, trendingUrl, tvUrl]);

  // Disable desktop wheel
  useEffect(() => {
    const carousel = carouselRef.current;

    const handleWheel = (e) => {
      if (window.innerWidth <= 768) return;

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

  if (loading) return <SkeletonCard />;

  return (
    <div className="bg-black min-h-screen text-white overflow-hidden">
      {/* HERO SECTION */}
      <div
        ref={carouselRef}
        className="relative pt-16 md:pt-20"
      >
        <Carousel
          autoPlay
          infiniteLoop
          interval={5000}
          swipeable
          stopOnHover={false}
          showThumbs={false}
          showStatus={false}
          showIndicators={true}
          transitionTime={700}
        >
          {movieList.map((movie) => (
            <Link
              key={movie.id}
              to={`/movie/${movie.id}`}
            >
              <div className="relative h-[70vh] md:h-[85vh] w-full overflow-hidden">
                {/* BACKDROP */}
                <img
                  src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                  alt={movie.title}
                  className="w-full h-full object-cover scale-105 hover:scale-110 transition-all duration-700"
                />

                {/* OVERLAY */}
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20" />

                {/* CONTENT */}
                <div className="absolute bottom-8 md:bottom-16 left-4 md:left-14 max-w-3xl text-left z-20">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    {/* TAGS */}
                    <div className="flex flex-wrap gap-3 mb-5 ">
                      <span className="bg-red-600 px-10 py-1 rounded text-sm font-semibold flex items-center gap-2">
                        <FaFire />
                        Trending
                      </span>

                      <span className="bg-white/10 backdrop-blur-md px-4 py-1 rounded-full text-sm">
                        HD
                      </span>

                      <span className="bg-white/10 backdrop-blur-md px-4 py-1 rounded-full text-sm">
                        IMDb {movie.vote_average.toFixed(1)}
                      </span>
                    </div>

                    {/* TITLE */}
                    <h1 className="text-3xl sm:text-5xl md:text-7xl font-black leading-tight mb-4 drop-shadow-2xl">
                      {movie.title}
                    </h1>

                    {/* META */}
                    <div className="flex flex-wrap items-center gap-5 text-gray-300 mb-5 text-sm md:text-base">
                      <div className="flex items-center gap-2 text-yellow-400 font-semibold">
                        <FaStar />
                        {movie.vote_average.toFixed(1)}
                      </div>

                      <span>{movie.release_date}</span>

                      <span>Movie</span>
                    </div>

                    {/* DESCRIPTION */}
                    <p className="hidden md:block text-gray-300 text-base leading-relaxed mb-7 max-w-2xl">
                      {movie.overview?.slice(0, 220)}...
                    </p>

                    {/* BUTTONS */}
                    <div className="flex flex-wrap gap-4">
                      <button className="bg-red-600 hover:bg-red-700 transition-all duration-300 px-6 py-3 rounded-xl font-semibold flex items-center gap-2 shadow-lg shadow-red-700/30">
                        <FaPlay />
                        Watch Now
                      </button>

                      <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 transition-all duration-300 px-6 py-3 rounded-xl font-semibold">
                        More Info
                      </button>
                    </div>
                  </motion.div>
                </div>
              </div>
            </Link>
          ))}
        </Carousel>
      </div>

      {/* QUICK CATEGORIES */}
      <div className="px-4 md:px-10 mt-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            {
              title: "Trending",
              icon: <HiTrendingUp />,
              color: "from-red-600 to-orange-500",
            },
            {
              title: "TV Shows",
              icon: <FaTv />,
              color: "from-blue-600 to-cyan-500",
            },
            {
              title: "Movies",
              icon: <FaFilm />,
              color: "from-purple-600 to-pink-500",
            },
            {
              title: "New & Hot",
              icon: <HiSparkles />,
              color: "from-green-600 to-emerald-500",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className={`bg-gradient-to-r ${item.color} rounded-3xl p-5 cursor-pointer shadow-lg`}
            >
              <div className="text-2xl md:text-3xl mb-3">
                {item.icon}
              </div>

              <h3 className="text-lg md:text-xl font-bold">
                {item.title}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>

      {/* TRENDING MOVIES */}
      <section className="mt-14">

        <MovieDetailRow type={"popular"} />
      </section>

      {/* UPCOMING */}
      <section className="mt-12">
        <MovieDetailRow type={"upcoming"} />
      </section>

      {/* TOP RATED */}
      <section className="mt-12">

        <MovieDetailRow type={"top_rated"} />
      </section>

      {/* TV SHOWS */}
      <section className="mt-14 px-4 md:px-10">

        {/* <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">
          {tvShows.slice(0, 12).map((show) => (
            <Link
              key={show.id}
              to={`/tv/${show.id}`}
            >
              <motion.div
                whileHover={{ y: -8 }}
                className="group relative overflow-hidden rounded-2xl bg-zinc-900"
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
                  alt={show.name}
                  className="w-full h-[260px] object-cover group-hover:scale-105 transition-all duration-500"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-90" />

                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="font-bold text-sm md:text-base line-clamp-1">
                    {show.name}
                  </h3>

                  <div className="flex items-center gap-2 text-yellow-400 text-sm mt-1">
                    <FaStar />
                    {show.vote_average.toFixed(1)}
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div> */}

        <MovieDetailRow type={"tv"} />
      </section>

      {/* BOLLYWOOD */}
      <section className="mt-14 pb-14">
        <MovieDetailRow type={"bollywood"} />
      </section>
    </div>
  );
};

export default Home;