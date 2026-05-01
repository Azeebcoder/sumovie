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

  // disable wheel scroll on desktop
  useEffect(() => {
    const carousel = carouselRef.current;

    const handleWheel = (e) => {
      if (window.innerWidth <= 768) return;
      if (!e.ctrlKey) e.preventDefault();
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
    <div className="bg-black min-h-screen text-white overflow-x-hidden">

      {/* HERO */}
      <div ref={carouselRef} className="relative pt-14 sm:pt-16 md:pt-20">

        <Carousel
          autoPlay
          infiniteLoop
          interval={5000}
          swipeable
          emulateTouch
          stopOnHover={false}
          showThumbs={false}
          showStatus={false}
          showIndicators={false}   // ❌ REMOVED DOTS COMPLETELY
          transitionTime={700}
        >

          {movieList.map((movie) => (
            <Link key={movie.id} to={`/movie/${movie.id}`}>
              <div className="relative w-full h-[48vh] sm:h-[70vh] md:h-[85vh] overflow-hidden">

                {/* BACKDROP */}
                <img
                  src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                  alt={movie.title}
                  className="w-full h-full object-cover scale-105"
                />

                {/* OVERLAY */}
                <div className="absolute inset-0 bg-linear-to-r from-black/90 via-black/60 to-transparent" />
                <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-black/40" />

                {/* CONTENT */}
                <div className="absolute bottom-6 sm:bottom-10 md:bottom-16 left-4 sm:left-6 md:left-14 max-w-[92%] sm:max-w-2xl md:max-w-3xl z-20">

                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                  >

                    {/* TAGS */}
                    <div className="flex flex-wrap gap-2 sm:gap-3 mb-4">
                      <span className="bg-red-600 px-3 sm:px-6 py-1 rounded text-xs sm:text-sm font-semibold flex items-center gap-2">
                        <FaFire />
                        Trending
                      </span>

                      <span className="bg-white/10 px-3 py-1 rounded-full text-xs sm:text-sm">
                        HD
                      </span>

                      <span className="bg-white/10 px-3 py-1 rounded-full text-xs sm:text-sm">
                        IMDb {movie.vote_average?.toFixed(1)}
                      </span>
                    </div>

                    {/* TITLE */}
                    <h1 className="text-2xl sm:text-4xl md:text-7xl font-black leading-tight mb-3">
                      {movie.title}
                    </h1>

                    {/* META */}
                    <div className="flex flex-wrap items-center gap-3 sm:gap-5 text-gray-300 mb-4 text-xs sm:text-sm md:text-base">
                      <span className="text-yellow-400 flex items-center gap-1 font-semibold">
                        <FaStar />
                        {movie.vote_average?.toFixed(1)}
                      </span>

                      <span>{movie.release_date}</span>
                      <span>Movie</span>
                    </div>

                    {/* DESCRIPTION */}
                    <p className="hidden sm:block text-gray-300 text-sm md:text-base mb-5 max-w-xl md:max-w-2xl">
                      {movie.overview?.slice(0, 220)}...
                    </p>

                    {/* BUTTONS */}
                    <div className="flex flex-wrap gap-3">
                      <button className="bg-red-600 hover:bg-red-700 transition px-5 py-2 sm:px-6 sm:py-3 rounded-xl flex items-center gap-2 text-sm sm:text-base">
                        <FaPlay />
                        Watch Now
                      </button>

                      <button className="bg-white/10 hover:bg-white/20 transition px-5 py-2 sm:px-6 sm:py-3 rounded-xl text-sm sm:text-base">
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
      <div className="px-4 sm:px-6 md:px-10 mt-8 md:mt-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">

          {[
            { title: "Trending", icon: <HiTrendingUp />, color: "from-red-600 to-orange-500" },
            { title: "TV Shows", icon: <FaTv />, color: "from-blue-600 to-cyan-500" },
            { title: "Movies", icon: <FaFilm />, color: "from-purple-600 to-pink-500" },
            { title: "New & Hot", icon: <HiSparkles />, color: "from-green-600 to-emerald-500" },
          ].map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.03 }}
              className={`bg-linear-to-r ${item.color} rounded-2xl p-4`}
            >
              <div className="text-xl sm:text-2xl mb-2">{item.icon}</div>
              <h3 className="text-sm sm:text-lg font-bold">{item.title}</h3>
            </motion.div>
          ))}

        </div>
      </div>

      {/* SECTIONS */}
      <section className="mt-10 md:mt-14">
        <MovieDetailRow type={"popular"} />
      </section>

      <section className="mt-10 md:mt-12">
        <MovieDetailRow type={"upcoming"} />
      </section>

      <section className="mt-10 md:mt-12">
        <MovieDetailRow type={"top_rated"} />
      </section>

      <section className="mt-10 md:mt-14 px-2 sm:px-4 md:px-10">
        <MovieDetailRow type={"tv"} />
      </section>

      <section className="mt-10 md:mt-14 pb-14">
        <MovieDetailRow type={"bollywood"} />
      </section>

    </div>
  );
};

export default Home;