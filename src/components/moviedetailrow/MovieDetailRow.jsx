import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import {
  FaArrowRight,
  FaFire,
  FaTv,
  FaFilm,
  FaStar,
} from "react-icons/fa6";

import MovieCard from "../moviecard/MovieCard";
import { Config } from "../../config/Config";

import "react-loading-skeleton/dist/skeleton.css";
import SkeletonCard from "../SkeletonCard";

const MovieDetailRow = ({ type }) => {
  const [movieList, setMovieList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const scrollContainerRef = useRef(null);

  const apiKey = Config.apiKey;

  const url =
    type === "bollywood"
      ? `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&region=IN&with_original_language=hi`
      : type === "tv"
        ? `https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}&language=en-US&page=1`
        : `https://api.themoviedb.org/3/movie/${type}?api_key=${apiKey}`;

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

    const scrollContainer = scrollContainerRef.current;

    if (!scrollContainer) return;

    const handleWheel = (event) => {
      if (window.innerWidth <= 768) return;

      if (!event.ctrlKey) return;

      event.preventDefault();

      scrollContainer.scrollLeft += event.deltaY;
    };

    scrollContainer.addEventListener("wheel", handleWheel, {
      passive: false,
    });

    return () => {
      scrollContainer.removeEventListener(
        "wheel",
        handleWheel
      );
    };
  }, []);

  if (error) {
    return (
      <p className="py-5 text-center text-red-500">
        Error: {error}
      </p>
    );
  }

  const getSectionData = () => {
    switch (type) {
      case "popular":
        return {
          title: "Popular Movies",
          icon: <FaFire />,
          color: "from-red-600 to-orange-500",
        };

      case "top_rated":
        return {
          title: "Top Rated",
          icon: <FaStar />,
          color: "from-yellow-500 to-amber-400",
        };

      case "upcoming":
        return {
          title: "Upcoming Movies",
          icon: <FaFilm />,
          color: "from-purple-600 to-pink-500",
        };

      case "tv":
        return {
          title: "TV Shows",
          icon: <FaTv />,
          color: "from-cyan-500 to-blue-500",
        };

      case "bollywood":
        return {
          title: "Bollywood Picks",
          icon: <FaFilm />,
          color: "from-pink-500 to-rose-500",
        };

      default:
        return {
          title: "Movies",
          icon: <FaFilm />,
          color: "from-red-500 to-orange-500",
        };
    }
  };

  const section = getSectionData();

  return (
    <section className="relative mt-10">
      {/* HEADER */}
      <div className="mb-5 flex items-center justify-between px-3 md:px-8">
        {/* LEFT */}
        <div className="flex items-center gap-3">
          <div
            className={`
              flex h-11 w-11 items-center justify-center
              rounded-2xl bg-linear-to-r ${section.color}
              text-lg text-white shadow-lg
            `}
          >
            {section.icon}
          </div>

          <div>
            <h2 className="text-xl md:text-3xl font-black text-white">
              {section.title}
            </h2>

            <p className="text-xs md:text-sm text-gray-400">
              Discover trending entertainment
            </p>
          </div>
        </div>

        {/* VIEW ALL BUTTON */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
        >
          <Link
            to={`/movies/${type}`}
            className="
              group
              relative
              overflow-hidden
              rounded-2xl
              border border-white/10
              bg-white/5
              px-4 md:px-5
              py-2.5
              backdrop-blur-xl
              transition-all duration-300
              hover:border-red-500/40
              hover:bg-red-500/10
              flex items-center gap-2
            "
          >
            {/* Glow */}
            <div
              className="
                absolute inset-0
                bg-linear-to-r from-red-500/0 via-red-500/10 to-red-500/0
                -translate-x-full
                group-hover:translate-x-full
                transition-transform duration-1000
              "
            />

            <span className="relative text-sm md:text-base font-semibold text-white">
              View All
            </span>

            <FaArrowRight
              className="
                relative
                text-xs md:text-sm
                text-red-400
                transition-transform duration-300
                group-hover:translate-x-1
              "
            />
          </Link>
        </motion.div>
      </div>

      {/* MOVIE ROW */}
      <div
        ref={scrollContainerRef}
        className="
          flex
          gap-3 md:gap-5
          overflow-x-auto
          px-2 md:px-8
          pt-2
          pb-2
          scroll-smooth
          scrollbar-hide
          select-none
        "
      >
        {loading ? (
          <SkeletonCard cards={10} />
        ) : (
          movieList.map((movie, index) => {
            const isTv = movie.first_air_date && !movie.release_date;

            return (
              <motion.div
                key={movie.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.04,
                }}
                className="shrink-0"
              >
                <Link to={`/${isTv ? "tv" : "movie"}/${movie.id}`}>
                  <MovieCard movie={movie} />
                </Link>
              </motion.div>
            );
          })
        )}
      </div>

      {/* FADE EFFECT */}
      <div className="pointer-events-none absolute right-0 top-0 h-full w-16 bg-linear-to-l from-black to-transparent" />
    </section>
  );
};

export default MovieDetailRow;